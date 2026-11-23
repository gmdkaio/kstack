---
name: commit
description: Group the working tree into commits, write the messages in the project's style, and ask what to do with them (commit, push, PR, merge). Use whenever work is ready to commit.
---

# commit

nothing leaves the machine without the user saying so. in Claude Code, the permission rules in `.claude/settings.json` are the hard stop; in Antigravity, Antigravity's own command permissions and the outward-actions rule apply. this skill is the menu.

1. `git status` and `git diff`. split the changes by concern. one commit per concern.
2. leave out files the project instructions (`AGENTS.md`, `GEMINI.md`, or `CLAUDE.md`) say belong to the user, and anything unrelated to the task. list what each commit will contain.
3. write each message in the project's style. read it from the `commits:` rules in the project instructions. with no rule: lowercase, short, say what changed, no trailers.
4. **state.** if the project instructions have a `docs:` line, keep the state current at this boundary: add one dated line per commit to `log.md` (newest last), and rewrite the state and next sections of `handoff.md`. if the docs are in the repo, the change goes in the commit it describes. if they live outside the repo, write them there and commit nothing for them. no `docs:` line, or `close` just wrote them, skip this step.
5. **branch.** read `branches:` in the project instructions. `main`: commit where you are, never ask about a branch. `feature` (the default when the line is missing): only a new feature gets its own branch. a fix, tweak, docs change or refactor commits on the current branch, no question. if a new feature is in the tree and you are on the default branch, ask once whether to move it to a `feat/<short-name>` branch before committing. the project's PR title and merge rules apply to every action below.
6. ask which action to take, one question: commit only, commit and push, commit and push and open a PR, commit and push and merge. the user can name something else.
7. do exactly that, then report the hashes.

never force push. never skip hooks. a failed hook is fixed, not bypassed.
