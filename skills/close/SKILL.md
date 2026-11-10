---
name: close
description: Close out a task or session. Updates handoff, log and decisions, humanizes the prose, then hands the commit to `kstack:commit`. Use when work is done or the session is ending.
---

# close

the project's `CLAUDE.md` has a `docs:` line with the folder (a `docs/` in the repo, or a vault). write there.

1. **prove it.** state what was checked and how, per `kstack:principle-prove-it`. no check, no close.
2. **handoff.md**: current state, what is next in order, loose ends. rewrite it, don't append.
3. **log.md**: one dated line per change, newest last.
4. **decisoes/**: only when a choice was made. one file `YYYY-MM-DD-slug.md` with what was decided, the options left out and why.
5. **repo status.** a GitHub repo the user owns carries exactly one status topic: `wip`, `paused`, `finished` or `dropped`. read it with `gh repo view --json owner,repositoryTopics`. if it is missing, or the session changed it (shipped: `finished`; stopped for now: `paused`; given up: `dropped`), propose the tag. set it only after the user confirms, with `gh repo edit --add-topic <new> --remove-topic <old>` (`kstack:principle-outward-actions`). skip repos owned by someone else.
6. **prose.** run the humanizer on anything written for people, following `kstack:principle-prose`.
7. **memory.** if a saved memory is really a rule (a thing to always or never do), propose moving it to the strongest place that holds: a settings rule or hook first, then a lint or test, then the project `CLAUDE.md`. prose is the last resort. the user confirms.
8. **extras.** list what was added beyond the request (files, options, tests). delete what isn't needed.
9. run `kstack:commit`.
