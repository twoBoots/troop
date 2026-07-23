# JungleJim Agent Rules

1. **Isolation Protocol**: Always work inside `.worktrees/<task-name>`. Do NOT modify code in the repository root directly unless explicitly instructed by Shoresy.
2. **Branching Strategy**: Base branches off `origin/main` (or `main`) using `git agent-start <task-name>`.
3. **Execution & Cleanup**: List active trees with `git jims`. Teardown completed worktrees with `git agent-stop <task-name>`.

See [JUNGLEJIM.md](JUNGLEJIM.md) for full context.
