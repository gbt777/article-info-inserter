# Extra Info Inserter

**Extra Info Inserter** — automatically counts the characters, images, and estimated reading time of the current Markdown note, then inserts the stats at the top of the note and optionally writes them to the Frontmatter. Built for writers and WeChat-public-account editors who want to grasp length and image scale before drafting.

自动统计 Obsidian 笔记的**字数、图片数量和阅读用时**，并把统计结果插入到文章开头正文，同时可选写入 Frontmatter 属性。适合写作者、公众号排版者在动笔前快速掌握篇幅与配图规模。

## 功能特性

- **字数统计**：中文按字符计、英文/数字按词计，自动剔除图片语法、代码块、行内代码、HTML、链接、双链等干扰项。
- **图片数量统计**：同时识别 Wiki 双链图片 `![[x.png]]` 与标准 Markdown 图片 `![](url)`，并兼容微信 `wx_fmt` 图床链接。
- **阅读用时**：按可配置「每分钟阅读字数」（默认 300）估算。
- **正文标记**：在文章开头插入一行 `*[全文共: 1234字，图片共: 3张]*` 样式的统计（可自定义前缀、单位、分隔符）。
- **Frontmatter 策略**：`char_count` / `reading_time` / `image_count` 三个字段可分别设为「写入 / 删除 / 清空」。
- **手动触发**：点击左侧栏图标或运行命令「更新字数与图片统计」，不会在打开文件时自动改写，安全可控。

## 安装

### 方式一：社区插件市场（已上架后）
1. 打开 Obsidian → 设置 → 第三方插件 → 关闭安全模式
2. 浏览 → 搜索「文章附加信息添加」或 `extra-info-inserter` → 安装并启用

### 方式二：BRAT（测试版）
1. 安装并启用 BRAT 插件
2. BRAT 设置 → Add Beta plugin → 粘贴仓库地址 `gbt777/extra-info-inserter`
3. 启用插件