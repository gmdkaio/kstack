---
name: setup
description: One-time setup of a project for kstack. Writes the permission rules, creates the docs skeleton and the CLAUDE.md pointer. Use when the user asks to set up kstack in a project.
---

# setup

a plugin can't set permissions, so this does it once per project. ask before overwriting anything that exists. never edit a file the user already owns (`CLAUDE.md`, `README.md`, `.gitignore`) beyond the lines listed here, and show those lines before writing them.

## 0. look first

read before writing anything:

- the project `CLAUDE.md`. a `## kstack` section means this is a re-run: report what exists, change only what is missing.
- the `docs:` line, if there is one, and what is at that path.
- a vault: a mention of Obsidian or a vault path in `CLAUDE.md`, or an `.obsidian` folder at the docs path. if the project already keeps `handoff.md` and `log.md` somewhere, that is where state lives.
- whether the docs folder is ignored: `git check-ignore -v <docs>/handoff.md`.

then say what was found, in a few lines, before step 1.

## 1. settings

merge `templates/settings.json` into `.claude/settings.json`. it asks before `git commit`, `git push` and `gh pr`, and blanks the commit and PR attribution. the ask rules match the command text, so a variant like `git -C . commit` is not caught: tell the user it is a guardrail, not a block. show the merged result before writing. add `"env": {"KSTACK_HOOK": "off"}` only if the user wants the session hook off.

## 2. where state lives

- no vault found: the default is `docs/` in the repo.
- a vault found: ask once, docs in the repo or in the vault. the vault is the likely answer when it already holds `handoff.md` and `log.md`. see vault mode.
- the docs folder is gitignored: say so and offer the options, state in the vault, or the user removes the ignore line. do not edit `.gitignore`.

create only what is missing from `templates/docs/` (`handoff.md`, `log.md`, `decisoes/`). never replace an existing file.

## 3. pointer

add the lines from `templates/CLAUDE.md` to the end of the project `CLAUDE.md`, or create the file: where the docs are, and the commit style. the user's existing text stays as it is. if a commit style is already written there, drop that line from the addition and keep theirs. show the lines and ask before writing.

## 4. models

if `~/.claude/kstack-models.md` doesn't exist, offer to copy `templates/kstack-models.md` there. it is the user's global file, so ask first and never overwrite it.

## 5. report

list each file written, each file left alone, and anything found that needs the user's decision.

## vault mode

only when the user chooses it. the same files go inside the Obsidian vault the user names, and the repo keeps only the `CLAUDE.md` pointer with `docs:` set to the vault path. then offer [Claudian](https://github.com/YishenTu/claudian) (an Obsidian plugin that runs Claude Code in the vault), unless `.obsidian/plugins/claudian/` is already there. pin that repo, similar names exist. download `main.js`, `manifest.json` and `styles.css` from its latest release into `<vault>/.obsidian/plugins/claudian/` and tell the user to enable it in Obsidian.

## not here

nothing about an organization or a client goes into a project from this skill. those rules are the user's local layer.
