---
name: setup
description: One-time setup of a project for kstack. Writes the permission rules, creates the docs skeleton and the CLAUDE.md pointer. Use when the user asks to set up kstack in a project.
---

# setup

a plugin can't set permissions, so this does it once per project. ask before overwriting anything that exists.

1. **settings.** merge `templates/settings.json` into `.claude/settings.json`. it asks before `git commit`, `git push` and `gh pr`, and blanks the commit and PR attribution. show the merged result before writing. add `"env": {"KSTACK_HOOK": "off"}` only if the user wants the session hook off.
2. **docs.** create the folder from `templates/docs/` (`handoff.md`, `log.md`, `decisoes/`). the default is `docs/` in the repo.
3. **pointer.** add to the project `CLAUDE.md`, or create it, the lines from `templates/CLAUDE.md`: where the docs are and the commit style. never overwrite existing text.
4. report what was written.

## vault mode

only when the user asks for it. the same files go inside the Obsidian vault the user names, and the repo keeps only the `CLAUDE.md` pointer with `docs:` set to the vault path. then offer [Claudian](https://github.com/YishenTu/claudian) (an Obsidian plugin that runs Claude Code in the vault). pin that repo, similar names exist. download `main.js`, `manifest.json` and `styles.css` from its latest release into `<vault>/.obsidian/plugins/claudian/` and tell the user to enable it in Obsidian.

## not here

nothing about an organization or a client goes into a project from this skill. those rules are the user's local layer.
