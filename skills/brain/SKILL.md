---
name: brain
description: Entry point for real work. Use when a task touches more than one file, changes a shared signature, needs a design choice, or has an unknown cause. Skip it for small tasks.
---

# brain

pick the shape of the task, do it small, prove it, close it.

1. restate the goal in one line. read the project `CLAUDE.md` and the `handoff.md` it points to (the `docs:` line says where).
2. pick the shape, then read its playbook from this skill's `playbooks/` folder: `feature.md`, `bug.md` or `investigation.md`. follow its steps in order. a step you skip is said as skipped, with the reason.
   - **project override.** if `<docs>/playbooks/<shape>.md` exists (`docs:` from the project `CLAUDE.md`), read it too. each line is `after "<base step, quoted exactly>": <what to do>` or `before "<base step>": <what to do>`. do that at that point. a quote that matches no base step is a broken override: say so and carry on with the base steps.
3. a task with several independent pieces, or one that needs a fresh pair of eyes, is delegated. follow `kstack:principle-delegate`.
4. before saying done, follow `kstack:principle-prove-it`. then run `kstack:close`.

the user's `CLAUDE.md` wins over anything here. no is an acceptable answer to a request that doesn't hold up.
