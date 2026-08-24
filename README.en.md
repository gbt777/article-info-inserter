# Article Info Inserter

> [中文文档 / Chinese Documentation](./README.md)

**Brief:** An Obsidian plugin that automatically appends an "article info" block to your notes — word count, reading time, image count, created/modified time, custom links & images, with Frontmatter composition and flexible layout.

---

## 1. Overview

Article Info Inserter is an Obsidian community plugin that automatically generates and maintains an "article info" section in your Markdown notes. Think of it as automatically attaching an info footer to every article:

- Counts **words, characters, reading time, pages, images (local/network), embeds, footnotes, code lines, links**, and more;
- Reads and displays specified **Frontmatter** fields (title, category, tags, etc.);
- Inserts one or more info lines at the **beginning or end** of the note using configurable "slots";
- Supports **custom display content, alignment, indentation, link/image embedding**;
- One-click "Update article info" after each edit — the plugin auto-deduplicates and incrementally updates without inserting duplicates.

The plugin writes info lines as HTML blocks tagged with `data-aii="marker"`. On update it only replaces that block, never touching your body content.

## 2. Core Features

| Feature | Description |
|---------|-------------|
| **Multi-metric stats** | 13+ metrics: words, characters, reading time, pages, images (local/network), embeds, footnotes, code, links |
| **Frontmatter composition** | Freely combine body slots with Frontmatter properties in one view |
| **Flexible layout** | Separate start/end row config; alignment (left/center/right/justify) & indentation |
| **Links & images** | Insert custom links or network/local images with auto-dedup & path normalization |
| **One-click update** | Command "Update article info" auto-detects and replaces old markers, no duplicates |
| **Bilingual UI** | Full Chinese/English settings, switch by system or manually |
| **Desktop only** | Depends on Node `crypto`/`fs`; desktop Obsidian only (`isDesktopOnly: true`) |

## 3. Installation

### Option A: Community plugin store (after review)
1. Obsidian Settings → Community plugins → Browse;
2. Search **Article Info Inserter**;
3. Install and enable.

### Option B: Manual (BRAT or manual placement)
1. Download `main.js` and `manifest.json` from [GitHub Releases](https://github.com/gbt777/article-info-inserter/releases);
2. Place them in your vault's `.obsidian/plugins/article-info-inserter/` folder;
3. Enable in "Community plugins" (restart Obsidian if not listed).

## 4. Usage

1. After enabling, open any Markdown note;
2. Open command palette (Ctrl/Cmd+P) and run **"Update article info"**;
3. The plugin inserts info lines at the note's start/end;
4. Go to Settings to adjust: stats rules, display content, alignment, indentation, links/images;
5. Re-run "Update article info" to refresh after changes.

## 5. Settings

- **Stats rules**: count punctuation, reading speed (words/min), include spaces/line breaks, etc.
- **Display customization**: which metrics to show, ordering, per-line alignment & indentation.
- **Append content**: configure start/end slots, Frontmatter strategy (write/delete/clear/none), links & images.

## 6. ⚠️ 1.0 → 2.0 Upgrade Notice (Important)

**Version 1.0 used `*[...]` inline markers** to delimit the info region. Due to Obsidian's style-rendering limitations, this approach was error-prone (e.g., themes rendering `***` as multicolored text, markers misrecognized).

**Version 2.0 switches to `<div data-aii="marker">` HTML blocks** — more stable and compatible.

> ⚠️ **Incompatibility notice**: 2.0 and 1.0 markers are **completely incompatible**. If you used 1.0 before:
> - You **must manually delete the old `*[...]` marker lines**; 2.0 will not recognize or clean them up;
> - After removing old markers, re-run "Update article info" to generate the new `div`-format info lines.

## 7. 🔧 Optional: Word / DOCX Export Enhancement (Advanced)

The plugin writes HTML blocks tagged `data-aii="marker"`. To export to **Word/DOCX via Pandoc** while keeping the appended text's **bold, italic, and color** styles, use the optional Lua filter pack (see repo `optional/word-export/` — includes `aii-docx.lua` and `aii-image-center.lua` with usage docs).

> Note: **Exporting to PDF has no such issue** — Pandoc's PDF (LaTeX) path natively supports inline HTML styles, no extra filter needed. Only DOCX output requires this optional pack.

See: [Optional pack docs](./optional/word-export/README.md)

## 8. FAQ

**Q: Why desktop-only?**
A: The plugin uses Node `crypto` (image MD5 dedup) and `fs` (file ops), unavailable in mobile Obsidian, hence `isDesktopOnly: true`.

**Q: Will info lines break my body content?**
A: No. The plugin writes an independent HTML block; updates only replace that block, leaving body text intact.

**Q: How to fully remove inserted info?**
A: Before "Update article info", manually delete the `<div data-aii="marker">…</div>` block; or disable the plugin and clean up.

## 8. Screenshots

| Settings (Chinese) | Settings (English) | Body info lines | Word export |
|---|---|---|---|
| ![settings-zh](images/settings-zh.png) | ![settings-en](images/settings-en.png) | ![body-marker](images/body-marker.png) | ![word-export](images/word-export.png) |

## 9. License

MIT
