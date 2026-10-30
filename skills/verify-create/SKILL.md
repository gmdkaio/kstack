---
name: verify-create
description: Build a project's own verify skill that launches the real app, drives each user-facing feature in a real browser, and keeps a feature map. Use when a project has a UI or front end and no scripted way to prove it works, or when the user asks for a verification skill.
---

# verify-create

writes `.claude/skills/verify-<app>/` into the project. that generated skill is how the project proves its UI works. one that was never run is a draft, so run it once before calling it done.

1. **look first, don't ask.** read the repo for what a person would ask: how it starts (dev command, port, seed data), the user-facing surfaces (pages, forms, flows), the browser tooling it already has (Playwright or Cypress specs). ask the user only what the repo can't answer. run `git check-ignore .claude/skills`: if it is ignored, say so and ask where the skill should live. writes under `.claude/` always ask the user for approval, so say that before the first write. the session-wide choice in that prompt covers the whole run. a session that can't ask (headless) can't write there.
2. **pick the driver.** the project's own browser tests first. else Playwright: the python package if the project is python and it imports, else node. say which and why. no new dependency without asking.
3. **write `SKILL.md`** in that folder with five sections:
   - **launch**: the command, how to know it is ready, a port that won't clash.
   - **doctor**: one command that checks the app, the data and the browser are usable before driving.
   - **drive**: how to run the check for one feature.
   - **evidence**: where screenshots and logs go, outside the repo. default to `<system temp>/verify-<app>/<feature>/` as a script option with that default, never a hardcoded path from this session.
   - **cleanup**: stop what you started, keep the evidence.
4. **seed the map.** `features/README.md` is the index. one file per user-facing feature, the top 3 to 5 first. each file has four headings: **sub-features**, **how to get there** (from the user's side: login, clicks), **driving it** (the saved, rerunnable script or steps), **gotchas**.
5. **ux checks.** the generated drive step applies the checks in `ux-checks.md`, in this skill's folder, to every feature. copy the list into the generated skill, trimmed to what the app has.
6. **prove it.** run the generated skill once on one feature: launch, doctor, drive, collect evidence, clean up, then confirm every file the evidence section names exists and is still there. fix what breaks, including a file the skill names but never produces. report the evidence paths and what the checks found.
7. point the user to `kstack:verify-maintain`.

rules:
- test accounts only. no secrets or real client data in the map or the scripts.
- read only against anything that isn't local.
- the map says what the user sees, not how the code is built.
