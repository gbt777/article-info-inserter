# Extra Info Inserter

自动统计当前 Markdown 笔记的字数、图片数量与预计阅读用时，并把统计结果插入文章开头的正文；同时可将结果写入 Frontmatter 属性区，便于检索与展示。

Extra Info Inserter automatically counts the words, images, and estimated reading time of the active Markdown note, inserts the stats at the top of the note, and can also write them into the Frontmatter properties.

## Features

- 统计字数、图片数量、阅读用时 / Counts words, images, and reading time
- 自定义插入文案与格式 / Customizable label and format
- 支持写入 Frontmatter 字段 / Writes Frontmatter properties
- 一键刷新当前笔记统计 / One-click refresh

## Installation

1. Open **Settings → Community plugins** in Obsidian.
2. Turn off **Restricted mode** if it is on.
3. Click **Browse** and search for "Extra Info Inserter".
4. Click **Install**, then **Enable**.

Alternatively, download `main.js` and `manifest.json` from the latest GitHub release and place them in `.obsidian/plugins/extra-info-inserter/`.

## Usage

1. Open any Markdown note.
2. Run the command **Extra Info Inserter: Insert stats** (or click the ribbon icon).
3. The plugin inserts a stats block at the top of the note and updates the Frontmatter properties.
4. Run the command again to refresh the stats.

## License

MIT
