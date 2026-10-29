---
name: brain
description: Entry point for real work. Use when a task touches more than one file, changes a shared signature, needs a design choice, or has an unknown cause. Skip it for small tasks.
---

# brain

pick the shape of the task, do it small, prove it, close it.

1. restate the goal in one line. read the project `CLAUDE.md` and the `handoff.md` it points to (the `docs:` line says where).
2. pick the shape:
   - **feature**: run `kstack:blindspots` when the scope isn't settled, plan the smallest version, build it, verify it.
   - **bug**: reproduce it first. find the cause with evidence. make the smallest fix. rerun the reproduction.
   - **investigation**: read only. cite files. label every claim measured, inferred or guess. no edits.
3. a task with several independent pieces, or one that needs a fresh pair of eyes, is delegated. follow `kstack:principle-delegate`.
4. before saying done, follow `kstack:principle-prove-it`. then run `kstack:close`.

the user's `CLAUDE.md` wins over anything here. no is an acceptable answer to a request that doesn't hold up.
