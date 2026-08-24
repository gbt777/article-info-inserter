-- 让 article-info-inserter 追加文字的 HTML 格式在导出 DOCX 时保留
-- 1) 将 <strong>/<em> 原始 HTML 还原为 Strong/Emph（加粗/斜体）
-- 2) 将 <span style="color:..."> 转为带颜色的 DOCX run（openxml）
-- 用法：pandoc ... --lua-filter=aii-docx.lua

-- 将扁平的「RawInline(html) 开闭标签」还原为嵌套的 Strong/Emph
local function rebuild(inlines)
  local result = {}
  local stack = {}  -- {kind='Strong'|'Emph', content={}}
  local function push(node)
    if #stack > 0 then
      table.insert(stack[#stack].content, node)
    else
      table.insert(result, node)
    end
  end
  for _, inl in ipairs(inlines) do
    if inl.t == "RawInline" and inl.format == "html" then
      local t = inl.text
      if t == "<strong>" then
        table.insert(stack, {kind = "Strong", content = {}})
      elseif t == "</strong>" then
        if #stack > 0 and stack[#stack].kind == "Strong" then
          local n = table.remove(stack)
          push(pandoc.Strong(n.content))
        end
      elseif t == "<em>" then
        table.insert(stack, {kind = "Emph", content = {}})
      elseif t == "</em>" then
        if #stack > 0 and stack[#stack].kind == "Emph" then
          local n = table.remove(stack)
          push(pandoc.Emph(n.content))
        end
      else
        push(inl)
      end
    else
      push(inl)
    end
  end
  for _, n in ipairs(stack) do
    push(n.kind == "Strong" and pandoc.Strong(n.content) or pandoc.Emph(n.content))
  end
  return result
end

local NAMED = {
  red = "FF0000", green = "008000", blue = "0000FF", black = "000000",
  white = "FFFFFF", yellow = "FFFF00", orange = "FFA500", purple = "800080",
  gray = "808080", grey = "808080", brown = "A52A2A", pink = "FFC0CB",
  cyan = "00FFFF", magenta = "FF00FF",
}

local function toHex(c)
  c = c:match("^%s*(.-)%s*$")
  local low = c:lower()
  if NAMED[low] then return NAMED[low] end
  if c:sub(1, 1) == "#" then c = c:sub(2) end
  c = c:upper()
  if c:match("^[0-9A-Fa-f]+$") then return c end
  return nil
end

-- 提取文字与加粗/斜体标志
local function collect(inlines)
  local buf = {}
  local bold, italic = false, false
  local function walk(il)
    if il.t == "Str" then
      table.insert(buf, il.text)
    elseif il.t == "Space" then
      table.insert(buf, " ")
    elseif il.t == "Strong" then
      bold = true
      for _, c in ipairs(il.content) do walk(c) end
    elseif il.t == "Emph" then
      italic = true
      for _, c in ipairs(il.content) do walk(c) end
    elseif il.t == "Span" then
      for _, c in ipairs(il.content) do walk(c) end
    elseif il.text then
      table.insert(buf, il.text)
    end
  end
  for _, il in ipairs(inlines) do walk(il) end
  return table.concat(buf), bold, italic
end

local function escapeXml(s)
  s = s:gsub("&", "&amp;"):gsub("<", "&lt;"):gsub(">", "&gt;"):gsub('"', "&quot;")
  return s
end

-- 在段落级别：先把 raw html 还原成 Strong/Emph，再把彩色 span 转成 openxml 彩色 run
local function process(inlines)
  local rebuilt = rebuild(inlines)
  local out = {}
  for _, il in ipairs(rebuilt) do
    if il.t == "Span" and il.attributes and il.attributes.style
       and il.attributes.style:match("color:") then
      local color = il.attributes.style:match("color:%s*([^;!]+)")
      local hex = color and toHex(color)
      if hex then
        local inner = rebuild(il.content)
        local txt, bold, italic = collect(inner)
        local rPr = '<w:rPr><w:color w:val="' .. hex .. '"/>'
        if bold then rPr = rPr .. "<w:b/><w:bCs/>" end
        if italic then rPr = rPr .. "<w:i/><w:iCs/>" end
        rPr = rPr .. "</w:rPr>"
        local run = '<w:r>' .. rPr .. '<w:t xml:space="preserve">' .. escapeXml(txt) .. "</w:t></w:r>"
        table.insert(out, pandoc.RawInline("openxml", run))
      else
        for _, c in ipairs(il.content) do table.insert(out, c) end
      end
    else
      table.insert(out, il)
    end
  end
  return out
end

function Plain(plain)
  return pandoc.Plain(process(plain.content))
end

function Para(para)
  return pandoc.Para(process(para.content))
end

------------------------------------------------------------------------
-- 块级处理：把插件写入的 <div data-aii="marker">…</div> 还原为真实段落。
-- 否则 Pandoc 会把它当作 RawBlock(html)，docx 写出时不渲染裸 HTML 块，
-- 导致「字数/作者/日期」等文字信息行整段消失。
------------------------------------------------------------------------

-- 解码插件 escapeHtml 产生的实体（& < > " 及数字实体）
local function decodeEntities(s)
  s = s:gsub("&amp;", "&")
       :gsub("&lt;", "<")
       :gsub("&gt;", ">")
       :gsub("&quot;", '"')
       :gsub("&apos;", "'")
  s = s:gsub("&#x(%x+);", function(h) return utf8.char(tonumber(h, 16)) end)
  s = s:gsub("&#(%d+);", function(d) return utf8.char(tonumber(d)) end)
  return s
end

-- 把 marker div 内部 HTML 解析为 Pandoc inlines（Str / Strong / Emph / Span）
local function parseAiiInner(html)
  local pos = 1
  local n = #html
  local function parse(stack)
    local out = {}
    while pos <= n do
      local lt = html:find("<", pos)
      if not lt then
        local txt = html:sub(pos)
        if txt ~= "" then table.insert(out, pandoc.Str(decodeEntities(txt))) end
        pos = n + 1
        return out
      end
      if lt > pos then
        local txt = html:sub(pos, lt - 1)
        if txt ~= "" then table.insert(out, pandoc.Str(decodeEntities(txt))) end
      end
      local gt = html:find(">", lt)
      if not gt then
        local txt = html:sub(pos)
        if txt ~= "" then table.insert(out, pandoc.Str(decodeEntities(txt))) end
        pos = n + 1
        return out
      end
      local tag = html:sub(lt, gt)
      pos = gt + 1
      if tag:match("^</") then
        local name = tag:match("^</([%w]+)")
        if #stack > 0 and stack[#stack] == name then
          table.remove(stack)
          return out
        end
      elseif tag:match("^<strong") then
        table.insert(stack, "strong")
        local inner = parse(stack)
        table.insert(out, pandoc.Strong(inner))
      elseif tag:match("^<em") then
        table.insert(stack, "em")
        local inner = parse(stack)
        table.insert(out, pandoc.Emph(inner))
      elseif tag:match("^<span") then
        local style = tag:match('style="([^"]*)"')
        table.insert(stack, "span")
        local inner = parse(stack)
        if style then
          table.insert(out, pandoc.Span(inner, { style = style }))
        else
          for _, c in ipairs(inner) do table.insert(out, c) end
        end
      end
      -- 其他未知标签（如 <br/>）直接忽略
    end
    return out
  end
  return parse({})
end

-- 仅处理插件的 marker div；其余 RawBlock 保持 Pandoc 默认行为
function RawBlock(el)
  if el.format == "html" then
    local inner = el.text:match('<div[^>]*data%-aii="marker"[^>]*>(.-)</div>')
    if inner then
      local inlines = parseAiiInner(inner)
      -- 复用 process()：把彩色 span 转成 openxml 彩色 run（与 Para/Plain 行为一致）
      inlines = process(inlines)
      if #inlines == 0 then return pandoc.Para({}) end
      return pandoc.Para(inlines)
    end
  end
  return nil
end
