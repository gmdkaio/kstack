---
name: principle-lean
description: Keeps changes small. Use before adding tests, CI, comments, error handling, fallbacks, retries, config options, dependencies or abstractions, and when reviewing a diff that has more of any of these than the task needed.
user-invocable: false
---

# lean

do what was asked, verified, and nothing around it. every line traces to the request.

- smallest diff that solves the problem. subtract before you add.
- no speculative validators, parsers, guards, retries or fallbacks beyond what the spec demands. validate at the edges, trust the inside.
- if a value must exist and doesn't, fail loudly. a loud failure beats a silent wrong answer.
- no abstraction until it has two real users. no option nobody asked to vary.
- no new dependency when the stdlib or the framework already does it.
- no tests that recompute the code's own logic, test framework behavior, or mock our own modules. one test per behavior the user confirmed.
- no comments that say what the code does or defend a choice. later agents read a comment as fact and build on it. a comment is only for a why the code can't show, stated as a fact.
- no CI, linters or tooling unless asked.
- before finishing, list what was added beyond the request and delete what isn't needed.

a project can sharpen any of these in its own `CLAUDE.md`.
