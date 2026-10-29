# kstack

A small workflow stack for Claude Code, inspired by the architecture of Lauren Tan's pstack.

- `brain`: the entry skill. A session hook points at it for work that is more than a small edit.
- `commit`: groups changes, writes messages in the project's style, asks what to do with them.
- `close`: updates handoff, log and decisions, humanizes the prose, then commits.
- `setup`: once per project. Permission rules, docs skeleton, CLAUDE.md pointer.
- `blindspots`: what an expert in the task would ask, what scope is missing, what they would notice first.
- principles: honest, lean, prove-it, outward-actions, prose, delegate.

```
/plugin marketplace add gmdkaio/kstack
/plugin install kstack@kstack
```

Then ask for `setup` in the project.

Layers: this repo is the generic core. Rules for an organization or a client live in local files outside it. A project keeps its own state in its docs folder.
