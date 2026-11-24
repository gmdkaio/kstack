# kstack

A small workflow stack for Claude Code and Antigravity, inspired by Lauren Tan's pstack.

- `brain`: the entry skill. Always-on rules point at it for work that is more than a small edit.
- `commit`: groups changes, writes messages in the project's style, asks what to do with them.
- `close`: updates handoff, log and decisions, checks the repo's status topic, humanizes the prose, then commits.
- `setup`: once per project. Permission rules (Claude Code), docs skeleton, and the `AGENTS.md` / `CLAUDE.md` pointer.
- `blindspots`: what an expert in the task would ask, what scope is missing, what they would notice first.
- `shape`: for a new project or a rough idea. Interviews you in rounds with a recommended answer for each question, settles scope and stack, writes a one-page `design.md` and builds nothing until you approve it. Inspired by superpowers' brainstorming and the grill-me skills.
- `verify-create`, `verify-maintain`: build a project's own verify skill that drives the real app in a browser (two widths, console and network errors, empty and error states, keyboard basics), with a feature map, and keep it honest. Needs a browser driver such as Playwright.
- `reviewer`: an agent that reviews one finished commit, only for a new feature or a shared signature change. It gives feedback with its reasoning plus any bug or excess it can reproduce, applies no fixes, and the builder works through the report.
- principles: honest, lean, prove-it, outward-actions, prose, delegate.

## Claude Code

```
/plugin marketplace add gmdkaio/kstack
/plugin install kstack@kstack
```

Then ask for `setup` in the project. It reads what is there first, asks before it writes, and never replaces a file you own.

## Antigravity

```
node scripts/install-agy.mjs
```

Installs `kstack` globally in `~/.gemini/config/plugins/kstack/` so its rules, skills and reviewer apply across every project. Turn it on or off from the Customizations page. Rerun the script after pulling changes.

If a repo uses both tools, keep the `## kstack` block in `AGENTS.md` and put `@AGENTS.md` in `CLAUDE.md` so you only maintain one file.

## Using it

- `brain` picks the shape of the task (new project, feature, bug, investigation) and follows its playbook. A project adds its own steps in `<docs>/playbooks/<shape>.md`, one line each: `after "<base step, quoted>": <what to do>`.
- Models per role live in `~/.claude/kstack-models.md` (`reviewer: opus @medium`) for Claude Code and `~/.gemini/config/kstack-models.md` (`reviewer: pro`) for Antigravity.
- `branches:` in the project instructions is `feature` (default: a new feature gets its own branch, everything else commits where you are) or `main` (never branch).
- To turn the always-on rules off: set `KSTACK_HOOK=off` in a Claude Code settings file, or disable `kstack` in Antigravity's Customizations page.

In Claude Code, `setup` adds permission rules that ask before `git commit`, `git push` and `gh pr`. They match the command text, so a variant such as `git -C . commit` is not caught. They are a guardrail, not a block. In Antigravity, command approvals are handled by Antigravity's own Settings and the outward-actions rule.

## License

MIT.
