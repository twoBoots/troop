# JungleJim 🌴

Multi-agent worktree workflow for high-concurrency human and AI collaboration.

## Quick Start / One-Line Installation

To set up **JungleJim** in any Git project repository, navigate to your project folder and run:

```bash
curl -fsSL https://raw.githubusercontent.com/twoboots/junglejim/main/install.sh | bash
```

Alternatively, if you have this repository cloned locally:
```bash
/path/to/junglejim/install.sh /path/to/your-project
```

### What `install.sh` does:
1. Copies `.gitaliases` into the target project root and configures local Git `include.path`.
2. Appends `.worktrees/` to `.gitignore`.
3. Downloads the `JUNGLEJIM.md` architecture specification into the project root.
4. Injects minimal agent rules into `AGENTS.md`.

## Workflow Overview

- **`git agent-start <task-name>`**: Spawns an isolated worktree at `.worktrees/<task-name>` on branch `feature/<task-name>`.
- **`git jims`**: Lists all active agent worktrees across the repository.
- **`git agent-stop <task-name>`**: Removes the worktree and cleans up the local feature branch after merging.

See [JUNGLEJIM.md](JUNGLEJIM.md) for full architecture details.
