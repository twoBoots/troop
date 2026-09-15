# Troop Architecture (Monkeys & Trees)

[Troop](https://github.com/twoBoots/troop) structures software repositories for high-concurrency human and AI development using the **Monkeys & Trees** paradigm.

---

## The Mental Model

| Concept | Role in Troop | Git Representation |
| :--- | :--- | :--- |
| **The Troop** | The collective developer cohort (humans & AI agents) | Contributor network & active worktrees |
| **Code Monkeys** | Individual workers assigned specific tasks | Autonomous agents or human developers |
| **Trees** | Ephemeral, isolated workspaces | Git worktrees (`.worktrees/<task-name>`) |
| **The Canopy** | The hidden forest canopy holding all trees | The `.worktrees/` directory (gitignored) |
| **The Main Trunk** | Shared, stable baseline of the codebase | The `main` branch and root workspace |

---

## Repository Structure

When Troop is initialised, the project root contains:

```text
my-project/
├── .git/                 # Central Git metadata & object store
├── .worktrees/           # Hidden canopy holding isolated monkey trees
│   ├── monkey-1-auth/    # Isolated worktree for monkey 1
│   └── monkey-2-billing/ # Isolated worktree for monkey 2
├── src/                  # Primary source code in main trunk
├── .gitaliases           # Shared Troop Git aliases
├── .gitignore            # Excludes .worktrees/ from tracking
├── README.md             # Project overview
├── AGENTS.md             # Operational directives for AI agents
└── TROOP.md              # Architecture specification
```

---

## Git Worktree Mechanics

Git worktrees link multiple working directories to a single repository:

1. **Shared Object Database**: All trees share `.git/objects`. Commits, blobs, and trees created in one worktree are immediately accessible everywhere with zero disk duplication.
2. **Dedicated `HEAD` & Index**: Each tree maintains its own `.git` link file pointing into `.git/worktrees/<name>/`. This provides an isolated `HEAD`, staging index, and working copy.
3. **Instant Creation & Teardown**: Spawning a worktree is instantaneous because history is shared rather than copied.

---

## Anatomy of `.gitaliases`

Troop defines three Git aliases in `.gitaliases`:

```ini
[alias]
    # Spawns an isolated tree in .worktrees/<name> on branch <name>
    agent-start = "!f() { git fetch origin main 2>/dev/null || true; BASE=$({ git rev-parse --verify origin/main 2>/dev/null || git rev-parse --verify main; }); git worktree add .worktrees/$1 -b $1 $BASE; }; f"

    # Removes the worktree in .worktrees/$1 and deletes the local $1 branch
    agent-stop = "!f() { git worktree remove .worktrees/$1 && git branch -d $1; }; f"

    # List active monkeys working in trees across the troop
    troop = worktree list
```

### `agent-start <task-name>`
- Attempts to run `git fetch origin main 2>/dev/null || true` to pull the latest remote trunk state.
- Falls back to the local `main` revision if offline or origin is unreachable.
- Runs `git worktree add .worktrees/$1 -b $1 $BASE` to create the tree directory and switch branch in one atomic operation.

### `agent-stop <task-name>`
- Runs `git worktree remove .worktrees/$1` to unregister and delete the tree directory.
- Runs `git branch -d $1` to delete the local task branch. Git's safe `-d` flag protects against accidental data loss if the branch has unmerged changes.

### `troop`
- Aliases `git worktree list`, reporting all active trees, their file paths, commit SHAs, and checked-out branch names.

---

## Upstream Integration with Cooper

Troop works standalone in any Git project and provides the worktree isolation foundation for [Cooper](https://twoboots.github.io/cooper/).
