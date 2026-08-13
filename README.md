# Article Info Inserter

**Article Info Inserter** automatically counts the characters, images, and estimated reading time of the current Markdown note, then inserts the stats at the top of the note and optionally writes them to the Frontmatter. Built for writers and WeChat-public-account editors who want to grasp length and image scale before drafting.

自动统计 Markdown 笔记的**字数、图片数量和阅读用时**，并把统计结果插入到文章开头正文，同时可选写入 Frontmatter 属性。适合写作者、公众号排版者在动笔前快速掌握篇幅与配图规模。

## Features

- **Word count**: counts Chinese by character and English/numbers by word, automatically stripping images, code blocks, inline code, HTML, links, and wikilinks.
- **Image count**: recognizes both `![[x.png]]` wikilink images and standard `![](url)` Markdown images, including WeChat `wx_fmt` image links.
- **Reading time**: estimated from a configurable words-per-minute rate (default 300).
- **Body marker**: inserts a line like `*[全文共: 1234字，图片共: 3张]*` at the top of the note (prefix, units, and separators are customizable).
- **Frontmatter strategy**: `char_count` / `reading_time` / `image_count` can each be set to write / delete / clear.
- **Manual trigger**: click the ribbon icon or run the command "更新字数与图片统计". It never rewrites on file open, so it is safe and predictable.

## Installation

1. In Obsidian, open **Settings → Community plugins** and turn off Safe mode.
2. Browse, search for `Article Info Inserter` (or `article-info-inserter`), then install and enable.

### Beta via BRAT
1. Install and enable the BRAT plugin.
2. BRAT settings → Add Beta plugin → paste `gbt777/article-info-inserter`.
3. Enable the plugin.

## Usage

1. Open any Markdown note.
2. Click the ribbon icon, or run the command **更新字数与图片统计** (Update word & image stats).
3. The plugin inserts a stats line at the top of the note and updates the Frontmatter per your settings.

> Each run first removes the previously inserted stats line before rewriting, so it never stacks duplicates.

## Settings

| Group | Option | Description |
|---|---|---|
| Body display | Show word count / Show image count / Show reading time | Controls which metrics appear in the body marker line |
| Body display | Words per minute | Used to compute reading time; always adjustable |
| Frontmatter | Enable Frontmatter writing | Master switch |
| Frontmatter | char_count / reading_time / image_count | Each set to write / delete / clear |
| Text | Prefix / unit / separator | Customize output text |

## Compatibility

- Relies on Obsidian core APIs; **mobile-compatible** (`isDesktopOnly: false`).
- Requires Obsidian `1.0.0` or later.

## Changelog

### 1.0.1
- Fixed the settings preview not refreshing when editing prefix/unit fields — the effect preview now updates live.

### 1.0.0
- Initial release: word / image / reading-time stats, body marker + Frontmatter strategy.

## License

[MIT](./LICENSE) © 2026 gbt777
