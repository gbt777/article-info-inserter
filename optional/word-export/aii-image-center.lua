-- aii-image-center.lua
-- 强制所有「含图片的段落」在 Word(docx) 中水平居中，并清除首行/左缩进，
-- 使图片真正居中，不受所套段落样式（如 Body Text / Normal）影响。
-- 仅作用于图片段落，正文文字段落完全不受影响。
--
-- 用法：
--   pandoc input.md --reference-doc="template_标题不编号-列表第二行顶格.docx" \
--        --lua-filter=aii-image-center.lua -o output.docx
--
-- 原理：Pandoc 对 docx 支持 `custom-style` 属性——给块打上该属性，
-- Pandoc 会套用 reference-doc 中同名样式。这里把含图片的段落用
-- Div(custom-style="Figure") 包裹，统一套用模板里的 `Figure` 样式
-- （已设为 jc=center 居中、firstLineChars=0 无首行缩进）。
-- 带图注的图片在 Pandoc AST 中是 `Figure` 块（非 `Para`），已由模板的
-- CaptionedFigure 样式居中，本过滤器只处理无图注的 `Para` 内图片。

local IMAGE_STYLE = "Figure"

function Para(el)
  for _, v in ipairs(el.content) do
    if v.t == "Image" then
      return pandoc.Div(el, { ["custom-style"] = IMAGE_STYLE })
    end
  end
  return el
end

-- 兜底：部分情况下图片可能落在 Plain 块（docx 中同样转为段落）
function Plain(el)
  for _, v in ipairs(el.content) do
    if v.t == "Image" then
      return pandoc.Div(el, { ["custom-style"] = IMAGE_STYLE })
    end
  end
  return el
end
