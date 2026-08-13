# Release guide: from publish to update

> Release workflow for the Article Info Inserter plugin (`gbt777/article-info-inserter`).

## Submit to the community directory

Obsidian plugins are submitted through the web directory at <https://community.obsidian.md>, not via a pull request to `obsidian-releases` (PRs are disabled there). The bot reads the `manifest.json` at the default branch HEAD and validates it automatically.

### Prerequisites
1. An Obsidian account (free, <https://obsidian.md>).
2. GitHub account `gbt777` signed in; repo `gbt777/article-info-inserter` is Public.
3. Default branch `main` HEAD contains the latest `manifest.json`; a Release exists with `manifest.json` + `main.js` as assets.

### Steps
1. Open <https://community.obsidian.md> and sign in with your Obsidian account.
2. Link your GitHub account in your profile.
3. Choose **Add your plugin**.
4. Confirm the repo `gbt777/article-info-inserter`; the directory reads `manifest.json` from `main` HEAD and auto-fills id / name / author / description.
5. After submission: automated bot validation runs immediately (typically within minutes). On pass, the plugin becomes searchable in the community market within ~24h. Use **Request review** only when you believe a scan result is a false positive.

## Publish a new version

Version updates are automatic after the first listing — Obsidian pulls from your GitHub Release, no resubmission needed.

1. Place the new `main.js`, bump `manifest.json` `"version"` (e.g. `1.0.1`).
2. Add a line to `versions.json`, e.g. `"1.0.1": "1.0.0"`.
3. Commit and create a new Release (tag must equal `manifest.json` version):
   ```bash
   git add -A && git commit -m "Release 1.0.1" && git push
   gh release create 1.0.1 --title "1.0.1" --notes "..." manifest.json main.js
   ```
4. Users get the update via **Settings → Community plugins → Check for updates**.

## Pre-submit checklist

- [ ] Repo is Public; `id` matches the repo name; `version` is `x.y.z`.
- [ ] `manifest.json` has no `repo` field; `description` ends with `.`/`!`/`?` and contains no "Obsidian".
- [ ] Release tag = `manifest.json` version.
- [ ] Release assets contain only `manifest.json` + `main.js`.
- [ ] `main` HEAD `manifest.json` is the latest.
- [ ] Submitted on community.obsidian.md and in review.
