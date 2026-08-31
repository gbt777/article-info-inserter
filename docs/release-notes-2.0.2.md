# v2.0.2

修复 2.0.1 引入的设置页面空白问题，并对计数逻辑做了一次整体审查与重构。

---

## 修复：设置页面空白（严重）

2.0.1 中「效果预览」改为调用真实统计函数时，存在一处变量在声明前被使用（TDZ），
导致每次打开插件设置都会抛出 `Cannot access 'previewInsertedMap' before initialization`，
整个设置面板渲染中断、页面空白。

- 修正预览函数的变量声明顺序；
- 同时在设置加载阶段规范化「行 / 槽位」配置（补全 6 行 × 5 槽位及字段缺省值），
  避免历史数据或手工编辑造成的残缺配置再次让设置页整体崩溃——
  这类问题一旦发生，用户将无法再进入设置界面自行修复。

## 修复：链接计数

- 重构链接统计：Markdown 链接、Wiki 链接、裸 URL 分别统计，
  并统一剥离链接结构后再统计裸 URL，避免 `[https://a.com](https://a.com)` 这类
  别名本身是 URL 的链接被重复计成两条。
- **修复「链接数不计入图片链接」开关对 `![](url)` / `![](<url>)` 无效**：
  裸 URL 正则会连同 Markdown 图片语法末尾的 `)` / `>` 一起捕获，导致 `isImageUrl`
  识别失败，开关永远关不掉这些图片链接。现先在 `linkFreeText` 中剥离 Markdown
  图片结构，释放干净 URL 后再判断。
- **两个开关现在各自独立生效**：
  - 「链接数不计入图片链接」——决定图片 URL 是否算作一条链接；
  - 「排除链接不可见部分」——按其文案定位为**字数统计**规则
    （外部链接排除 URL、内部链接只保留别名），不再干扰链接个数统计。

  此前两者相互耦合，导致「链接数不计入图片链接」在某些组合下看不出效果。

## 修复：图片计数

- 增强网络图片识别：除扩展名与 `wx_fmt=` 外，补充识别 `?tp=webp` 等参数形式
  与微信图片域名（`mmbiz.qpic.cn` / `mmbiz.weixin.cn`），解决部分微信图片漏计。
- 尖括号写法 `![](<./assets/x.png>)` 已在上一版修复（剥离尖括号后再判断），本版保持。

## 修复：统计项口径一致性

- 「排除脚注」此前会把**脚注数**一并清零，与「排除注释」（注释数仍如实统计）等
  其它开关的行为矛盾。现统一约定：`exclude*` 类开关只影响字数统计，不把统计项清零
  （唯一例外是「本插件追加的图片不计数」，其文案本就明确为「不计数」）。
- 嵌入数增加非负保护，避免出现负数。

## 修复：设置页预览与实际不一致

- 设置页顶部的效果预览此前使用硬编码的示例文本，预览数值固定（如图片 2 / 链接 2），
  与当前笔记的实际运行结果无关。
- 现改为**优先读取当前活动笔记的真实正文**（去掉 frontmatter 与本插件旧标记）作为预览文本；
  没有活动笔记时才回退到内置示例。开关 toggles 后，预览会实时反映当前笔记的统计结果。

## 其他

- 修正插件内部版本常量：`DEFAULT_SETTINGS.version` 此前停留在 `2.0.0`，导致写入 `data.json` 的版本戳与 `manifest.json` 的 `2.0.2` 不一致。现统一为 `2.0.2`。

---

## 升级说明

- 直接覆盖安装即可，无需手动删除 2.0.x 的标记。
- 若刚从 1.0 升级而来，仍需按 2.0.0 的说明手动删除 1.0 版本的 `*[ ]*` 标记
  （1.0 与 2.0 的标记方式不兼容）。
- 本次修正了「排除脚注」的统计口径：开启该开关后，`footnote_count` 将如实统计脚注数量
  （此前恒为 0）。

---

## Bug fixes (English)

### Fixed: blank settings panel (critical)
A variable was used before its declaration when the live-preview was reworked in 2.0.1,
throwing on every settings-page render and leaving the panel empty. Also hardened
settings loading so incomplete row/slot data can no longer blank out the whole panel.

### Fixed: link counting
Markdown links, wiki links and bare URLs are now counted separately after stripping link
syntax, so a link whose label is itself a URL is no longer double-counted. Fixed the
"exclude image links from link count" toggle being ignored for `![](url)` and `![](<url>)`
image URLs: the bare-URL regex was capturing the trailing `)` / `>` from Markdown image
syntax, so `isImageUrl` failed and the image URLs were always counted as links. The toggle
and the "exclude non-visible link parts" toggle are now independent: the former controls
whether image URLs count as links, the latter is a word-count rule only.

### Fixed: image counting
Network image detection now also recognises `?tp=webp`-style parameters and WeChat image
hosts (`mmbiz.qpic.cn`, `mmbiz.weixin.cn`), fixing missed WeChat images without a file
extension.

### Fixed: statistics consistency
"Exclude footnotes" used to zero out `footnote_count`, inconsistent with the other
`exclude*` options. Those options now only affect word counting and never zero a counter
(the only exception remains "exclude appended images", whose label states it explicitly).

### Fixed: preview vs. actual result
The settings preview used a hard-coded sample text, so its numbers were fixed and unrelated
to the current note. It now prefers the body of the active note (minus frontmatter and old
markers) as the preview text, falling back to the built-in sample only when no note is
active. Toggling options updates the preview to reflect the current note's actual stats.

### Upgrading
Overwrite to install. If you are coming from 1.0, delete the old `*[ ]*` markers manually
as described in the 2.0.0 notes (1.0 and 2.0 markers are not compatible).
