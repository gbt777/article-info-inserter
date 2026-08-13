# 发布与上架指南

> 文章附加信息添加（Extra Info Inserter）插件上架流程说明。

## ⚠️ 当前官方提交流程

旧文档里的「fork `obsidian-releases` + 改 `community-plugins.json` + 提 PR」**已失效**——
官方仓库 `obsidianmd/obsidian-releases` 已**禁用 Pull Requests**（`has_pull_requests:false`）。

现在的官方流程（见 <https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin>）：
**在 community.obsidian.md 网页目录里提交**，由机器人读取仓库默认分支 HEAD 的 `manifest.json` 自动校验并写入市场。

---

## 前置条件

1. 一个 **Obsidian 账号**（免费，<https://obsidian.md> 注册）
2. 你的 GitHub 账号 `gbt777` 已登录、且本插件仓库 `gbt777/extra-info-inserter` 为 **Public**
3. 仓库默认分支 `main` 的 HEAD 含最新的 `manifest.json`；Release `1.0.0` 已打、附件含 `manifest.json` + `main.js`

---

## GitHub 仓库

- 仓库 `gbt777/extra-info-inserter` 已建好并公开
- `main` 分支已推送，含 `manifest.json` / `main.js` / `versions.json` / `LICENSE` / `README.md`

## GitHub Release `1.0.0`

- Tag `1.0.0` = manifest `version` = `1.0.0`
- 附件：`manifest.json` + `main.js`
- 地址：<https://github.com/gbt777/extra-info-inserter/releases/tag/1.0.0>

## 网页端提交到社区目录

1. 打开 <https://community.obsidian.md> ，用 **Obsidian 账号**登录
2. 在个人资料里 **关联 GitHub 账号**（用于验证你拥有该仓库）
3. 选择 **添加插件（Add your plugin）**
4. 按提示填写 / 确认：
   - 仓库：`gbt777/extra-info-inserter`（或授权后从列表选）
   - 目录会读取 `main` 分支 HEAD 的 `manifest.json`，自动带出 id / name / author / description
5. 提交后进入**机器人自动校验 + 官方人工审核**：
   - 机器人检查：id 唯一且不含量 `obsidian`；manifest 的 id/name/author 一致；description ≤250 字且句尾句号、sentence case；Release 含 `main.js`+`manifest.json`；版本 `x.y.z`
   - 校验通过会打 `Ready for review` 标签；人工合并后即在社区市场可搜到
6. 审核期间可在详情页跟踪状态（官方团队较小，耗时可能数天，请耐心）

> 提交入口可参考官方文档：<https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin>

---

## 后续更新到 2.0（无需再走提交流程）

首次上架后，版本更新**完全自动**：Obsidian 会直接从你的 GitHub Release 拉取，不再需要 PR / 网页重提。

1. 放好新 `main.js`，改 `manifest.json` 的 `"version": "2.0.0"`
2. `versions.json` 增加一行 `"2.0.0": "1.0.0"`（表示 2.0.0 需要 Obsidian ≥ 1.0.0）
3. 提交并打新 Release（tag 必须 = `2.0.0`）：
   ```bash
   git add -A && git commit -m "Release 2.0.0" && git push
   gh release create 2.0.0 --title "2.0.0" --notes "..." manifest.json main.js
   ```
4. 用户端 Obsidian「第三方插件 → 检查更新」即可收到 2.0.0

---

## 自检清单（提交前确认）

- [x] 仓库 Public，`id` 与仓库名一致，`version` 三段式 `x.y.z`
- [x] Release tag = manifest `version` = `1.0.0`
- [x] Release 附件含 `manifest.json` + `main.js`
- [x] `main` 分支 HEAD 的 `manifest.json` 已是最新（描述带句尾句号）
- [ ] 你已在 community.obsidian.md 登录 Obsidian 账号并关联 GitHub
- [ ] 已在网页目录提交插件并进入审核