# 可选功能包：Word / DOCX 导出增强

本目录包含用于 **Pandoc 导出 Word (.docx)** 时，保留 Article Info Inserter 追加文字的**加粗、斜体、颜色**等样式的 Lua 过滤器。

> ⚠️ **仅 DOCX 需要本包。导出 PDF 无此问题** —— Pandoc 的 PDF（LaTeX）路径原生支持 HTML 行内样式（`<strong>`/`<em>`/`<span color>`），无需任何额外过滤器。以下说明仅针对 Word/DOCX 输出。

---

## 一、为什么需要它

Article Info Inserter 在笔记正文写入的信息行是带 `data-aii="marker"` 的 HTML 块，内部可能包含：

- `<strong>加粗</strong>`
- `<em>斜体</em>`
- `<span style="color:red !important;">红色文字</span>`

Pandoc 默认转换规则：

| 内容 | 默认 DOCX 行为 | 本包行为 |
|------|---------------|----------|
| `<strong>`/`<em>` | ✅ 正常转加粗/斜体 | ✅ 同（保底） |
| `<span style="color:">` | ❌ **颜色丢失**（变黑色） | ✅ 保留指定颜色 |
| `data-aii="marker"` 整块 | ❌ **整段文字消失**（裸 HTML 块不渲染） | ✅ 还原为真实段落 |

若不用本包，导出的 Word 里**信息行颜色会变成黑色、甚至可能整段不显示**。

---

## 二、包含两个过滤器

| 文件 | 作用 |
|------|------|
| `aii-docx.lua` | 将 marker 信息行还原为真实段落，并把加粗/斜体/彩色 span 转为 DOCX 原生格式 |
| `aii-image-center.lua` | 强制所有"含图片的段落"在 Word 中水平居中并清除缩进（防止模板样式把图片推偏） |

两个可叠加使用，互不影响。

---

## 三、使用方法

### 前提
已安装 [Pandoc](https://pandoc.org/installing.html)（3.x 推荐）。

### 方式 A：命令行手动导出

```bash
pandoc 你的笔记.md \
  --lua-filter=aii-docx.lua \
  --lua-filter=aii-image-center.lua \
  -o 输出.docx
```

如需指定 Word 模板（保持标题/列表样式），加 `--reference-doc=你的模板.docx`：

```bash
pandoc 你的笔记.md \
  --reference-doc="template_标题不编号-列表第二行顶格.docx" \
  --lua-filter=aii-docx.lua \
  --lua-filter=aii-image-center.lua \
  -o 输出.docx
```

### 方式 B：配合 Obsidian 插件「Enhancing Export」

1. 安装 Obsidian 社区插件 **Enhancing Export**；
2. 在其导出设置中找到「Word (.docx)」项（或新建）；
3. 在「自定义参数 / Custom Arguments」中追加：

   ```
   --lua-filter=路径/aii-docx.lua --lua-filter=路径/aii-image-center.lua
   ```

   > 路径建议用绝对路径，或把两个 `.lua` 放到 Pandoc 的 `--data-dir`（通常是 `C:\Users\<你>\AppData\Local\Pandoc\`，放入后可直接写 `--lua-filter=aii-docx.lua` 无需路径）。

4. 保存设置，之后右键笔记 → Enhancing Export → Word(.docx) 即自动套用。

---

## 四、验证是否生效

导出后用 Word 打开，检查：

- 信息行的**颜色**是否与你 Obsidian 中设置的一致；
- 加粗、斜体是否正常；
- 图片是否居中、不偏左；
- 信息行文字是否完整显示（未整段丢失）。

---

## 五、常见问题

**Q：报错 `Cannot find filter aii-docx.lua`？**
A：过滤器路径不对。用绝对路径，或把 lua 放到 Pandoc data-dir 后只写文件名。

**Q：颜色还是没生效？**
A：确认插件写入的是 `<span style="color:...">` 格式（2.0 默认）。若你改过插件代码改变了样式写法，需相应调整 lua 中的 `color:` 匹配逻辑。

**Q：PDF 导出为什么不用？**
A：Pandoc 转 PDF 走 LaTeX，原生支持 HTML 行内样式，颜色/加粗/斜体直接保留，无需本包。

**Q：两个 lua 都必须用吗？**
A：只关心文字颜色用 `aii-docx.lua` 即可；若你的 Word 模板导致图片不居中，再加 `aii-image-center.lua`。

---

## 六、文件清单

- `aii-docx.lua` —— 文字样式 + marker 段落还原
- `aii-image-center.lua` —— 图片居中
- `README.md` —— 本说明
