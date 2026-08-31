# v2.0.3

修复设置页「效果预览」与正文实际写入结果在图片计数上不一致的问题。

---

## 修复：设置页预览与正文图片计数不一致

**现象**：同一篇笔记，正文 marker 显示「图片共 6 张 / 网络图片 1 张」，而设置页「效果预览」却显示「图片共 7 张 / 网络图片 2 张」——预览比实际多算了一张网络图。

**根因**：设置页预览在读取当前活动笔记正文后，直接调用了 `calculateStats` 做统计，但**没有走 `removeOldMarker` 去重**。而真正执行「更新文章信息」时，会把正文中与已配置的 `link_image_*` 追加项重复出现的那张网络图（/链接）删掉。预览少了这一步，于是把正文里又出现一次的重复网络图也算了进去。

**修复**：在 `refreshPreview()` 中，读取活动笔记正文并去除 frontmatter 与本插件旧标记后，先调用 `removeOldMarker(body, activeFile, previewInsertedMap)` 做与执行路径完全一致地去重，再交给 `calculateStats`。预览现在与正文 marker 完全对齐。

- 验证方式：mock 当前活动文件为测试笔记并实例化设置页调 `refreshPreview`，解析渲染文本，得到
  `图片共 6 张｜本地图片 5 张｜网络图片 1 张`，与 `processContent` 实际执行结果（6 / 5 / 1）完全一致。
- `vm-audit.js` 端到端仿真：三个设置 tab 与预览全部渲染通过，无空白风险。

---

## 升级说明

- 直接覆盖安装即可，无需手动删除 2.0.x 的标记。
- 若刚从 1.0 升级而来，仍需先按 2.0.0 说明手动删除 1.0 版本的 `*[ ]*` 标记
  （1.0 与 2.0 的标记方式不兼容）。
- 升级后进入插件设置页，打开任一篇已插入信息的笔记，「效果预览」应与正文 marker 数值一致；
  切换「链接数不计入图片链接」等开关，预览会实时变化。

---

## Bug fixes (English)

### Fixed: preview vs. actual image count mismatch
The settings live-preview counted one more network image than the note's actual inserted
result. Cause: the preview read the active note's body and called `calculateStats` directly,
but skipped the `removeOldMarker` de-duplication that the real "update" run performs — so a
network image that also appears as a configured `link_image_*` append item was counted twice
in the preview. Fix: run `removeOldMarker` on the preview body exactly like the execution
path does, before counting. The preview now matches the note's marker (verified 6 / 5 / 1).

### Upgrading
Overwrite to install. If upgrading from 1.0, first delete the old `*[ ]*` markers as noted in
the 2.0.0 release. After upgrading, the settings preview and the note's marker should show the
same numbers for any note with inserted info.
