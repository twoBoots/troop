# Getting Started with Troop

[Troop](https://github.com/twoBoots/troop) brings structure to concurrent human and AI development by treating all contributors as a **troop of code monkeys working in trees**.

Instead of juggling stashes, dealing with dirty working directories, or causing merge conflicts on the main trunk, Troop leverages Git worktrees under `.worktrees/` to give every task an isolated, ephemeral workspace.

---

## Prerequisites

- **Git** 2.30+
- **Bash** or compatible POSIX shell
- **Node.js** 20+ (for documentation site development)

---

## Quick Installation

Install Troop into your target Git repository using the one-line installer:

```bash
curl -fsSL https://raw.githubusercontent.com/twoboots/troop/main/install.sh | bash
```

Alternatively, if running from a local clone:

```bash
/path/to/troop/install.sh /path/to/your-project
```

For full setup details and manual configuration instructions, see the [Installation Guide](../installation.md).

---

## Your First Monkey Tree in 3 Steps

### 1. Spawn an Isolated Tree
To start a new task without interrupting your current workspace or dirtying `main`:

```bash
git agent-start auth-login
```

This automatically:
- Fetches `origin/main` (if online).
- Spawns `.worktrees/auth-login`.
- Checks out a new branch `auth-login` rooted at `origin/main`.

### 2. Enter the Tree and Work
Navigate into the newly spawned worktree:

```bash
cd .worktrees/auth-login
```

From here, you or an AI agent can edit code, run test suites, commit changes, and push upstream. The main trunk directory remains completely untouched.

### 3. Review Active Trees
To view all monkeys currently working across the repository:

```bash
git troop
```

Output:
```text
/Users/developer/my-repo                     ba05d36 [main]
/Users/developer/my-repo/.worktrees/auth-login  6a07fe5 [auth-login]
```

---

## Merging and Teardown

Once your task has been reviewed and merged into `main`:

```bash
# Return to repository root
cd ../..

# Safely teardown worktree and delete the local branch
git agent-stop auth-login
```

This cleanly deletes `.worktrees/auth-login` and removes the local `auth-login` branch.

---

## AI Agent Integration

When Troop is installed, it injects minimal operational rules into your repository's `AGENTS.md` (or scaffolds it if missing):

```markdown
## Troop Worktree Guidelines
- **Always work in trees**: Always spawn a worktree via `git agent-start <task-name>` rather than modifying trunk directly.
- **Never pollute trunk**: Keep root workspace clean.
- **Tear down after merge**: Run `git agent-stop <task-name>` once the task PR is merged.
```

For higher-level governance, test-driven development (TDD), and living capability specifications, see how Troop powers the [Cooper SDD Integration](../cooper-integration.md).

---

## Next Steps

- Explore the complete [Workflow & Lifecycle](./workflow.md).
- Dive into the [Architecture Deep Dive](../architecture.md).
