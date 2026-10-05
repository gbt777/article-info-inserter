# v3.0.0

**新功能：文章结构思维导图**——把笔记大纲自动画成一张 SVG 思维导图并插入正文，可自定义布局与样式，大纲变化后一键刷新。

---

## 新增：文章结构图（Article structure mind map）

从此不必再用思维导图插件生成、手动截图、粘贴：

- 在「追加内容设置」里新增一个 **文章结构图** 标签位，把它放到你想插入的位置；
- 插件解析笔记标题层级，绘制思维导图，生成 **SVG** 存入附件文件夹，并把图片链接插入正文；
- 文件名带内容指纹（`toc-<id>-<md5前8位>.svg`），内容一变文件名随之变化，避免 Obsidian 图片缓存导致不刷新；
- 再次执行「更新文章信息」即**就地刷新**，不会重复插入。

### 三种布局

- **横向**：标题自左向右逐级展开，章节多、层级深的长文最稳；
- **纵向**：各级标题自上而下排布，文章不长时更省空间；
- **放射状**：文章标题居中，各章节向四周伸出，并带一套角度系统（起始角 / 相邻偏移角）；放不下时优先撑开角度，其次才增大半径。

### 样式（全局样式 + 层级自定义）

- **全局样式**统一设置，改动**无条件覆盖**所有层级；随后可在「自定义样式」矩阵中按层级微调。
- **底纹**：单色、暖橙/紫蓝/蓝灰/浅灰渐变，或自定义渐变。
- **下级连线**：线型（弧形 / 直角 / 直线）、粗细、弧度；颜色支持 **7 种变色方案**（单色、深浅渐变、邻近色环、互补对照、反差色、三角色环、彩虹色轮）× 维度（按层级 / 按章节）× 强度（0–10）× 方向（正 / 反）。
- **节点框**：胶囊、圆角矩形、矩形、下划线、无底纹；底色 / 描边色 / 描边粗细 / 对齐位置（连线上方、贴线、下方）/ 等宽或按字数 / 连接点样式与大小 / 避让次级 / 自动序号。
- **文字**：全局文字与**表头名称**各自独立的字体、粗斜、字号、颜色与行数控制。
- **行数控制**：按字数限定每行宽度，或按行数把标签拆成 N 行。

---

## 安全性与性能

- **标记去重更安全**：插入块（`<div data-aii="marker">…</div>`）的识别改为**代码围栏感知 + 单行完整匹配**。
  - 代码块 / 教程里引用的示例不再被误删；
  - 「有开无闭」的半个标签不再跨行吞掉中间正文；
  - 设置页预览与正文写入共用同一套规则（此前预览更宽松）。
- **旧结构图清理改为「命中即停」三级策略**：上次记录的路径（校验内容 MD5）→ 文件名家族匹配 → 全附件夹 MD5 扫描兜底。不再每次刷新都遍历整个附件夹并逐个读文件。
- **审核合规**：移除 Web Storage 用法（界面语言改由官方 API 探测）；Node `fs` 的使用收敛到唯一一处（读取 vault 之外的图片路径），并已在 manifest 声明 `isDesktopOnly: true`。

## 界面与文案

- 设置页重排：「底纹 → 下级连线 → 节点框 → 文字」分组，全局行与「自定义样式」矩阵逐项对应；
- 中文 / 英文界面文案补全并清理冗余条目；
- 行配置的加粗 / 斜体提示改为走词典（英文界面不再出现中文提示）。

---

## 升级说明

- 直接覆盖安装即可，**无需手动删除 2.0.x 的标记**。
- 若仍在使用 **1.0 版本**的 `*[ ]*` 行内标记，请先按 2.0.0 的说明手动删除——1.0 与 2.0+ 的标记方式不兼容。
- 3.0.0 为**桌面端专用**（`isDesktopOnly: true`），不支持移动端 Obsidian。

---

## English

### New: article structure mind map

Add the new **Article structure** slot wherever you want it, and the plugin renders
the note's outline as an **SVG** mind map into your attachment folder and inserts
the image link. Re-running *Update article info* refreshes it in place.

- **Three layouts** — horizontal, vertical, and radial (with a start angle and a
  per-sibling offset angle; the plugin widens angles before the radius).
- **Global style + per-level overrides** — global changes apply to all levels
  unconditionally; fine-tune individual levels afterwards.
- **Colour schemes** — solid, shade ramp, analogous, complementary, contrast,
  triadic, and rainbow, with dimension (by level / by chapter), strength (0–10),
  and direction.
- **Node boxes** — capsule, rounded, rectangle, underline, or none, with fill,
  stroke, width, alignment, equal-width columns, joint dots, and optional
  auto-numbering.
- **Text** — separate styling for node text and for the header label.
- Content-fingerprinted filenames (`toc-<id>-<md5>.svg`) keep Obsidian from
  serving a stale cached image.

### Safety and performance

- Marker de-duplication is now **code-fence aware** and matches a **single complete
  line**: examples quoted inside code blocks are left alone, and an unclosed tag can
  no longer swallow the paragraphs below it. The settings preview and the real write
  path now share the same rules.
- Cleaning up the previous structure diagram uses a **three-tier "hit and stop"
  strategy** (recorded path with MD5 verification → filename family → full-folder
  MD5 scan) instead of scanning every attachment on every run.
- Review compliance: no Web Storage usage (UI language comes from official APIs),
  and Node `fs` is confined to the single place that must read images from outside
  the vault (`isDesktopOnly: true`).

### Upgrading

Overwrite to install — 2.0.x markers need no manual cleanup. Notes still carrying
1.0-style `*[ ]*` markers must have them deleted by hand first (the two formats are
incompatible). 3.0.0 is desktop-only.
