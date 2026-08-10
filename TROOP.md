# Troop Architecture (Worktrees & Code Monkeys)

## Overview

**Troop** is a worktree-based workflow for concurrent development where human developers and autonomous AI agents collaborate without stepping on each other's toes.

In the Troop paradigm:
* **The Repository** is the troop's home base.
* **Worktrees** are isolated environments for parallel development tasks.
* **Code Monkeys** refer collectively to all developers, human developers and AI agents alike.
* **Troop Members** work concurrently across separate worktrees or the main workspace.

---

## Workspace Structure

Worktrees for agents are isolated in a hidden `.worktrees/` directory at the project root.

```text
my-project/
├── .git/                 # Core Git metadata
├── .worktrees/           # Hidden worktree directory for agents
│   ├── agent-1-auth/     # Isolated worktree for task 1
│   └── agent-2-billing/  # Isolated worktree for task 2
├── src/                  # Main application source code
├── .gitaliases           # Shared Git aliases for Troop
├── .gitignore            # Ignores .worktrees/
├── README.md             # Project quick start
├── AGENTS.md             # Guidelines for AI agents
└── TROOP.md              # Architecture specification
```

---

## The Troop Lifecycle

### 1. Initializing Aliases
To initialize Troop in your repository:
```bash
curl -fsSL https://raw.githubusercontent.com/twoboots/troop/main/install.sh | bash
```

### 2. Spawning an Agent (`agent-start`)
When a new task is assigned:
```bash
git agent-start <task-name>
```
What this does under the hood:
1. Fetches `origin/main` (if a remote exists).
2. Spawns a worktree at `.worktrees/<task-name>`.
3. Creates branch `<task-name>` off `origin/main` (falling back to local `main` if offline).

### 3. Listing Active Troop Worktrees (`troop`)
To see all active worktrees across the troop:
```bash
git troop
```

### 4. Execution & Isolation
* An agent or code monkey navigates to its assigned worktree (`.worktrees/<task-name>`).
* Human code monkeys can continue working in the root workspace on `main` or another branch without interference.

### 5. Teardown (`agent-stop`)
Once work is committed, pushed, and merged:
```bash
git agent-stop <task-name>
```
What this does:
1. Removes the `.worktrees/<task-name>` directory.
2. Deletes the local `<task-name>` branch.
