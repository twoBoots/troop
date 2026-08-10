# Troop Agent Rules

1. **Isolation Protocol**: Always work inside `.worktrees/<task-name>`. Do NOT modify code in the repository root directly unless explicitly instructed.
2. **Branching Strategy**: Base branches off `origin/main` (or `main`) using `git agent-start <task-name>`.
3. **Execution & Cleanup**: List active trees with `git troop`. Teardown completed worktrees with `git agent-stop <task-name>`.

See [TROOP.md](TROOP.md) for full context.
