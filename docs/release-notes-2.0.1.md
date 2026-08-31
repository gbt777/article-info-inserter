# v2.0.1 Release Notes

> 2.0.1 是 2.0.0 的维护补丁：修复图片计数 Bug，并回应 Obsidian 社区插件目录的审查意见。

## 中文

### 🐛 修复
- **图片计数错误（尖括号语法）**：当笔记使用 Obsidian 推荐的尖括号图片写法 `![](<path/to/image.png>)` 时，插件先前会把 URL 末尾的 `>` 误判为非图片，导致「图片共 0 张」。现已在统计路径正确剥离尖括号，本地图片与网络图片均能正确计数。

### 📋 审查意见修正（来自 Obsidian 社区插件目录自动审查）
- **README 英文说明**：充实了 `README.md` 顶部的英文 Overview 段落（功能、安装、用法），满足目录对英文文档的要求。
- **Direct Filesystem Access 说明**：在 README 中补充「为何需要 Node `fs`」一节，明确 `fs` 仅用于图片复制到 vault、图片 MD5 去重、读取本插件自身 `data.json`，不会访问或修改 vault 外的用户文件。

### ⚠️ 升级提示（沿用 2.0.0）
- 2.0 与 1.0 的标记方式**不兼容**：1.0 使用 `*[...]` 框定，2.0 使用 `data-aii="marker"` 的 div 方式。
- 从 1.0 升级到 2.0 时，请**手动删除旧的 `*[...]` 标记**，再运行「Update article info」，否则会出现重复信息行。

---

## English

> 2.0.1 is a maintenance patch for 2.0.0: it fixes an image-counting bug and addresses the Obsidian community plugin directory review feedback.

### 🐛 Fixes
- **Image count bug (angle-bracket syntax)**: When notes used Obsidian's recommended angle-bracket image syntax `![](<path/to/image.png>)`, the plugin previously misread the trailing `>` as a non-image, resulting in "0 images". Angle brackets are now correctly stripped, so both local and network images are counted properly.

### 📋 Review feedback (Obsidian community plugin directory)
- **English README**: Expanded the English Overview section at the top of `README.md` (features, installation, usage) to satisfy the directory's English-documentation requirement.
- **Direct Filesystem Access**: Added a "Why the plugin needs Node `fs`" section explaining that `fs` is used only for copying images into the vault, MD5 deduplication, and reading this plugin's own `data.json` — it never touches user files outside the vault.

### ⚠️ Upgrade note (carried from 2.0.0)
- 2.0 is **not compatible** with 1.0's marker style: 1.0 used `*[...]` wrappers, while 2.0 uses a `data-aii="marker"` div.
- When upgrading from 1.0, **manually remove the old `*[...]` markers** before running "Update article info", otherwise duplicate info lines will appear.
