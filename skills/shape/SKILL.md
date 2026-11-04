---
name: shape
description: Turn a rough idea into a plan before anything is built. Interviews the user in rounds, settles scope and stack, writes a short design doc and waits for approval. Use for a new project, an initial idea, a stack choice, or when the user says shape, grill or stress-test this.
---

# shape

the user has an idea, not a plan yet. find out what they want and why, settle the open decisions, write it down small, and build nothing until they approve it.

skip it when the request is complete (everything that changes what gets built is already said). do it and say what you did.

## 1. look first

read what exists before the first message: files the user pointed at, notes or specs they pasted, and whatever is in the folder. a new project usually has no `CLAUDE.md`, no handoff and no docs, often an empty folder or no git repo. that is normal: say it is a blank start in one line and go on. don't hunt for docs or ask about them. if a `CLAUDE.md`, `handoff.md` or repo does exist, read it. never ask what these already answer, and never reopen what is decided.

## 2. why first

the first message is one open question in the user's own terms: why they want this, or what someone does with it. no options attached, their words carry the intent. say what the answer would change. if they already told you why, skip to rounds.

## 3. rounds

work the open decisions as a tree. the **frontier** is every decision whose prerequisites are settled. ask the whole frontier in one round, then wait.

```
**Q1 <title>:** <question, with the real choices named and what each trades off>
-> <your recommended answer, and why>
```

- number each question and give a recommendation. word it so "yes" accepts the recommendation.
- a question that depends on another open question in the round waits for the next round.
- the answers reshape the tree. recompute the frontier each round.
- each question is specific to this project and builds on their last answer or on something you found. no generic checklists.
- facts are your job: look them up (code, docs, the web, a subagent for a long search). decisions are the user's.

ground to cover, as territory and not a script:

- what it is, who it is for, and what success looks like
- goals, non-goals, and anti-goals (what would make it a failure even if it works)
- prior art: what they have seen, loved or hated
- the smallest first version that is worth having, and what is out of it
- data: what it holds, where it comes from, what already exists
- stack, hosting, cost to run, who maintains it
- how it will be checked, and what breaks first

**stack.** read from how they talk whether they want to choose. if they raise it or ask about trade-offs, lay out two or three real options in a message of their own, with what each costs, and recommend one. if they talk outcomes, make the call and state it in a line, as your call and not as something they agreed to. an existing project keeps its stack.

**honest.** if the idea has a real flaw (it exists already, the scope is two projects, the stack fights the goal), say so in the round it shows up, before the questions (`kstack:principle-honest`). if it is several independent projects, say so, agree an order, shape the first.

**spike.** when a throwaway build would answer a question faster than talking, offer one. it is labeled throwaway, gets no tests, and keeping it is a new request that comes back through step 6.

## 4. play it back

when a part is clear (what it is for, how one piece behaves), describe it in a short paragraph, then return to questions about the next part. only what they said goes in as theirs. what you filled in goes in as your proposal, with the reason. end with what is wrong or missing. if the part is something they will look at, put a few lines of text sketch next to it.

## 5. the design doc

when the frontier is empty, write `design.md`. where: the `docs:` path from the project `CLAUDE.md` if there is one, otherwise `docs/design.md` in the current folder (create the folder), or wherever the user names. don't run `git init` or add any other file yet. one page, plain, so a builder could start from it without asking again:

- **idea and why:** two or three lines, in their terms
- **goals, non-goals, anti-goals**
- **stack and hosting:** each choice with the reason, marked decided or my call
- **approaches:** the options that were weighed, which won, why
- **first version:** the smallest slice worth having, and what is out
- **plan:** the build order as a short numbered list, each step something that can be checked
- **open:** what is left unknown and the cheapest check that would settle it

say which items are your calls so they can check those while reading. no filler (`kstack:principle-prose`).

## 6. the gate

nothing is built until the user approves `design.md`. building means product code, scaffolding, installing dependencies and creating the project. reading and exploring are fine.

- a change they ask for goes into the doc first, then back for approval.
- if they opt out ("just build it"): say in one line the stack call you are making, then go on through the `feature` playbook. this skill is done.
- once approved, run `kstack:setup` if the project has no `## kstack` section (the usual case here). `design.md` stays where it is and setup builds the rest of the docs skeleton around it. then follow the `feature` playbook from its branch step, with the first version as the scope and the plan as the build order. steps 1 to 3 are done.

## rules

- ask only what changes what gets built. a default you state is better than a question with an obvious answer.
- plain language, pitched a little above where the user is. match their words.
- do not read this skill out to the user.
- the user's `CLAUDE.md` wins over anything here.
