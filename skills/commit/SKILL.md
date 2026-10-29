---
name: commit
description: Group the working tree into commits, write the messages in the project's style, and ask what to do with them (commit, push, PR, merge). Use whenever work is ready to commit.
---

# commit

nothing leaves the machine without the user saying so. the permission rules in `.claude/settings.json` are the hard stop, this skill is the menu.

1. `git status` and `git diff`. split the changes by concern. one commit per concern.
2. leave out files the project `CLAUDE.md` says belong to the user, and anything unrelated to the task. list what each commit will contain.
3. write each message in the project's style. read it from the `commits:` rules in the project `CLAUDE.md`. with no rule: lowercase, short, say what changed, no trailers.
4. ask which action to take, one question: commit only, commit and push, commit and push and open a PR, commit and push and merge. the user can name something else.
5. do exactly that, then report the hashes.

never force push. never skip hooks. a failed hook is fixed, not bypassed.
