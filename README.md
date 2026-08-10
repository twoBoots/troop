# Troop 🐒

Multi-agent worktree workflow for concurrent human and AI collaboration.

## Quick Start / One-Line Installation

To set up **Troop** in any Git project repository, navigate to your project folder and run:

```bash
curl -fsSL https://raw.githubusercontent.com/twoboots/troop/main/install.sh | bash
```

Alternatively, if you have this repository cloned locally:
```bash
/path/to/troop/install.sh /path/to/your-project
```

### What `install.sh` does:
1. Copies `.gitaliases` into the target project root and configures local Git `include.path`.
2. Appends `.worktrees/` to `.gitignore`.
3. Downloads the `TROOP.md` architecture specification into the project root.
4. Injects minimal agent rules into `AGENTS.md`.

## Workflow Overview

- **`git agent-start <task-name>`**: Spawns an isolated worktree at `.worktrees/<task-name>` on branch `<task-name>`.
- **`git troop`**: Lists all active agent worktrees across the repository.
- **`git agent-stop <task-name>`**: Removes the worktree and cleans up the local branch after merging.

See [TROOP.md](TROOP.md) for full architecture details.
