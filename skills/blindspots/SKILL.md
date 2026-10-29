---
name: blindspots
description: Find what the user isn't asking. Names the expert for the task and lists what that expert would ask, what scope is missing, and what they would notice first. Use before building a feature, settling a design, starting a plan, or whenever the user asks what they are missing.
---

# blindspots

the user knows what they asked. this finds what they didn't know to ask.

1. **name the expert.** the specific one for this task: a payments engineer, a migration DBA, an accessibility lead. not "an expert".
2. **look up what can be looked up.** read the code, the docs and the project state first. a question the repo answers is not a question for the user.
3. **write what that expert would say.** three lists, each item one line:
   - **asks:** questions they would ask before starting that the user hasn't answered.
   - **scope:** parts of the work nobody has mentioned (failure cases, data that already exists, permissions, rollback, who maintains it, what it costs to run, how it is checked).
   - **notices:** things they would spot at once in what the user wrote, the plan or the code. contradictions, missing constraints, a decision that is really two.
4. **rank by consequence.** what is expensive to fix later goes first. cut anything that wouldn't change what gets built.
5. **label each item** measured, inferred or guess. say what a wrong guess would cost.
6. **end with the top three** decisions that the user must settle, each with a recommended answer. everything else is a short list below.

rules:
- raise gaps, don't build them. the user decides what enters the scope.
- no padding. ten sharp items beat thirty generic ones. if the scope is sound, say so.
- follow `kstack:principle-honest`. if the plan has a real flaw, it goes first.
