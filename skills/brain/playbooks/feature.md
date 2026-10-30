# feature

1. restate the goal in one line.
2. settle the scope. run `kstack:blindspots` if it isn't settled.
3. plan the smallest version. write down what is out.
4. branch. if the project's `branches:` rule is `feature` (the default) and you are on the default branch, ask once: start a `feat/<short-name>` branch for this? skip it for `branches: main`.
5. build.
6. verify the real thing (`kstack:principle-prove-it`). a feature with a UI runs the project's verify skill and its ux checks.
7. lean pass: list what was added beyond the request and delete what isn't needed.
8. review. a new feature or a shared signature change gets `kstack:reviewer` on the final commit (`kstack:principle-delegate`). anything smaller does not. the builder works through the feedback and reports what it took and what it declined.
9. close (`kstack:close`).
