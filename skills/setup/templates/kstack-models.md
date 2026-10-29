# kstack models

one line per role: `role: model @effort`. models are haiku, sonnet, opus. efforts are low, medium, high, xhigh, max. the lead reads this at spawn and passes both. missing file or missing line: use the session model.

explorer: haiku @medium
builder: sonnet @medium
reviewer: opus @medium
writer: sonnet @low

# notes
# - builder: use high for a harder or longer piece.
# - reviewer: use high for a new feature or a shared signature change. avoid max.
# - avoid xhigh and max on builder and explorer. sonnet at max starts its own review rounds.
# - haiku at low skips searches and checks in long prompts.
# - CLAUDE_CODE_EFFORT_LEVEL in the environment overrides every effort here.
# - these are starting points from vendor guidance, not measured on this user's work.
