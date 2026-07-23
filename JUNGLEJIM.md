# JungleJim Architecture (Worktrees & Code Monkeys)

## Overview

**JungleJim** is a worktree-based workflow designed for high-concurrency development where human developers and autonomous AI agents collaborate without stepping on each other's toes.

In the JungleJim paradigm:
* **The Repository** is the jungle.
* **Worktrees** are the trees in the jungle.
* **Code Monkeys** refer collectively to human developers and AI agents.
* **Shoresys** represents human developers operating in the root workspace or standard checkout.
* **Jims** (Jim 1, Jim 2, etc.) refers to individual AI coding agents operating in isolated worktrees.

---

## Workspace Structure

Worktrees for Jims are isolated in a hidden `.worktrees/` directory at the project root.

```text
my-project/
├── .git/                 # Core Git metadata
├── .worktrees/           # Hidden jungle tree canopy for Jims
│   ├── Jim-1-auth/       # Isolated worktree for Jim 1
│   └── Jim-2-billing/    # Isolated worktree for Jim 2
├── src/                  # Main application source code
├── .gitaliases           # Shared Git aliases for JungleJim
├── .gitignore            # Ignores .worktrees/
├── README.md             # Project quick start
├── AGENTS.md             # Guidelines for AI agents
└── JUNGLEJIM.md          # Architecture specification
```

---

## The JungleJim Lifecycle

### 1. Initializing Aliases
To initialize JungleJim in your repository:
```bash
curl -fsSL https://raw.githubusercontent.com/twoboots/junglejim/main/install.sh | bash
```

### 2. Spawning a Jim (`agent-start`)
When a new task is assigned to a Jim:
```bash
git agent-start <task-name>
```
What this does under the hood:
1. Fetches `origin/main` (if a remote exists).
2. Spawns a worktree at `.worktrees/<task-name>`.
3. Creates branch `feature/<task-name>` off `origin/main` (falling back to local `main` if offline).

### 3. Listing Active Jims (`jims`)
To see all Jims actively working in trees across the jungle:
```bash
git jims
```

### 4. Execution & Isolation
* A Jim navigates to its assigned worktree (`.worktrees/<task-name>`).
* Shoresy (human developer) can continue working in the root workspace on `main` or another branch without interference.

### 5. Teardown (`agent-stop`)
Once a Jim's work is committed, pushed, and merged:
```bash
git agent-stop <task-name>
```
What this does:
1. Removes the `.worktrees/<task-name>` directory.
2. Deletes the local `feature/<task-name>` branch.
