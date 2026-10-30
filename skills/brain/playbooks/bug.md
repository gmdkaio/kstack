# bug

1. reproduce it first. keep the command or input.
2. find the cause with evidence. label it measured, inferred or guess. do not fix a guess.
   after two fixes fail on the same assumption, write the assumption down and test it before a third fix.
3. make the smallest fix.
4. rerun the reproduction, then the checks around it.
5. keep the reproduction as a test only if the project already tests that area.
6. close (`kstack:close`).
