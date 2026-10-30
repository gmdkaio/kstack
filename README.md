# kstack

A small workflow stack for Claude Code, inspired by the architecture of Lauren Tan's pstack.

- `brain`: the entry skill. A session hook points at it for work that is more than a small edit.
- `commit`: groups changes, writes messages in the project's style, asks what to do with them.
- `close`: updates handoff, log and decisions, humanizes the prose, then commits.
- `setup`: once per project. Permission rules, docs skeleton, CLAUDE.md pointer.
- `blindspots`: what an expert in the task would ask, what scope is missing, what they would notice first.
- `verify-create`, `verify-maintain`: build a project's own verify skill that drives the real app in a browser (two widths, console and network errors, empty and error states, keyboard basics), with a feature map, and keep it honest. Needs a browser driver such as Playwright.
- `reviewer`: an agent that reviews one finished commit, only for a new feature or a shared signature change. It reports and applies no fixes.
- principles: honest, lean, prove-it, outward-actions, prose, delegate.

```
/plugin marketplace add gmdkaio/kstack
/plugin install kstack@kstack
```

Then ask for `setup` in the project. It reads what is there first, asks before it writes, and never replaces a file you own.

## Using it

- `brain` picks the shape of the task (feature, bug, investigation) and follows its playbook. A project adds its own steps in `<docs>/playbooks/<shape>.md`, one line each: `after "<base step, quoted>": <what to do>`.
- Models and effort per role live in `~/.claude/kstack-models.md`, one line each, like `reviewer: opus @medium`. `setup` offers a starting file.
- `KSTACK_HOOK=off` in the `env` block of a settings file turns the session hook off.

The permission rules ask before `git commit`, `git push` and `gh pr`. They match the command text, so a variant such as `git -C . commit` is not caught. They are a guardrail, not a block.

## License

MIT.
