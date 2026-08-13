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

The Release and its artifact attestations are produced by the CI workflow
`.github/workflows/release.yml` (triggered by a tag push), **not** by a manual
`gh release create`. The workflow builds nothing (this plugin ships `main.js`
directly) but it creates the Release with `main.js` + `manifest.json` and attaches
GitHub artifact attestations (build provenance) so users can verify origin.

1. Update `main.js` if needed, bump `manifest.json` `"version"` (e.g. `1.0.2`).
2. Add a line to `versions.json`, e.g. `"1.0.2": "1.0.0"`.
3. Commit the changes to `main` (the Git Data API is used in this environment
   because `github.com:443` git protocol is blocked). The commit must include
   `.github/workflows/release.yml` so the workflow exists at the tagged commit.
4. Create a lightweight tag equal to `manifest.json` version (e.g. `1.0.2`). The
   tag push triggers the Release workflow automatically.
   - If the tag push does not auto-trigger, run the workflow manually:
     `gh workflow run release.yml -f tag=1.0.2 -R gbt777/article-info-inserter`
5. Verify on GitHub: Release `1.0.2` exists with assets `main.js` + `manifest.json`,
   and each asset has an associated attestation (Release page → "Attestations").
6. Users get the update via **Settings → Community plugins → Check for updates**.

> The previous manual review recommendation ("Missing GitHub artifact
> attestations for release assets") is resolved by this workflow. No manual
> `gh release create` should be used, or it would produce an unattested release.

## Pre-submit checklist

- [ ] Repo is Public; `id` matches the repo name; `version` is `x.y.z`.
- [ ] `manifest.json` has no `repo` field; `description` ends with `.`/`!`/`?` and contains no "Obsidian".
- [ ] Release tag = `manifest.json` version.
- [ ] Release assets contain only `manifest.json` + `main.js`.
- [ ] `main` HEAD `manifest.json` is the latest.
- [ ] Submitted on community.obsidian.md and in review.
