---
name: no_coauthor_in_commits
description: Do not add Claude as co-author in git commits for this project
type: feedback
---

Never add "Co-Authored-By: Claude..." to git commit messages.

**Why:** User explicitly requested this — they don't want Claude listed as a co-author.

**How to apply:** Every time a commit is created in this project, omit the Co-Authored-By trailer entirely.
