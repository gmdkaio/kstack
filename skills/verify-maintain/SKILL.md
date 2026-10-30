---
name: verify-maintain
description: Keep a project's verify skill and feature map honest. Use when the app changed, a verify run failed, features were added or removed, or the user asks to audit the verification.
---

# verify-maintain

the map is the project's record of what the UI does and how to prove it. keep it true. never edit product code.

1. find the project's `verify-<app>` skill. none: run `kstack:verify-create`.
2. **index.** every feature file is listed in `features/README.md` and every listed file exists. a feature in the app with no file is a gap.
3. **compare to the source.** check each feature file against the routes, labels and flows in the code. with more than three features, use one read-only subagent per file (`kstack:principle-delegate`). each reports stale lines with `file:line` evidence.
4. **live pass.** run doctor, then drive every feature with the ux checks in the generated skill. evidence survives cleanup.
5. **triage** each difference:
   - doc drift: the map is wrong. fix the map.
   - harness gap: the script can't drive it. fix the script.
   - product gap: the app is wrong. report it and leave it.
6. edits stay inside the verify skill's folder. end with one word: **clean**, **changed** (list the files) or **blocked** (say why).
