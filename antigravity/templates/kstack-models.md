# kstack models (Antigravity)

One line per role: `role: model`.
Valid Antigravity `invoke_subagent` tiers are `inherit`, `flash_lite`, `flash`, and `pro` (Antigravity does not take a separate effort parameter).
Missing file or missing line: use `inherit`.

explorer: flash
builder: inherit
reviewer: pro
t3-reviewer: claude-opus-5-5 @high
writer: flash

# notes
# - explorer: read-only codebase research (`research` subagent).
# - builder: bounded implementation (`self` subagent, `Workspace: "share"` for parallel edits).
# - reviewer: keep `pro` (`reviewer` subagent); its value is the reasoning in its feedback.
# - t3-reviewer: the reviewer when T3 Code sends it to Claude. a model id from orchestrator_capabilities.
# - writer: handoff and docs (`self` subagent).
