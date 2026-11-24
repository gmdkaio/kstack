# kstack models (Antigravity)

One line per role: `role: model`.
Valid Antigravity `invoke_subagent` tiers are `inherit`, `flash_lite`, `flash`, and `pro` (Antigravity does not take a separate effort parameter).
Missing file or missing line: use `inherit`.

explorer: flash
builder: inherit
reviewer: pro
writer: flash

# notes
# - explorer: read-only codebase research (`research` subagent).
# - builder: bounded implementation (`self` subagent, `Workspace: "share"` for parallel edits).
# - reviewer: keep `pro` (`reviewer` subagent); its value is the reasoning in its feedback.
# - writer: handoff and docs (`self` subagent).
