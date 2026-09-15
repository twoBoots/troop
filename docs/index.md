---
layout: home

hero:
  name: Troop 🐒
  text: Multi-Agent Git Worktree Workflow
  tagline: Concurrent human and AI development with isolated trees, zero trunk drift, and instant teardown.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/twoBoots/troop

features:
  - icon: 🐒
    title: The Troop & Monkeys
    details: All developers, human or AI, are code monkeys collaborating in parallel without stepping on each others workspaces.
  - icon: 🌲
    title: Isolated Trees (Worktrees)
    details: Ephemeral Git worktrees (`.worktrees/`) give each monkey an independent branch and working directory.
  - icon: ⚡
    title: Fast One-Line Setup
    details: Install into any repository via curl, configuring Git aliases and agent rules instantly.
  - icon: ⚙️
    title: Cooper SDD Bedrock
    details: Powers [Cooper](https://github.com/twoBoots/cooper) Spec-Driven Development as its core worktree isolation layer.
---

## Quickstart

Install Troop into any Git repository with a single command:

```bash
curl -fsSL https://raw.githubusercontent.com/twoboots/troop/main/install.sh | bash
```

---

## Core Git Commands

Troop provides three core Git aliases:

| Command | Purpose |
| :--- | :--- |
| `git agent-start <task-name>` | Spawns an isolated tree in `.worktrees/<task-name>` on branch `<task-name>` |
| `git troop` | Lists all active monkeys working in trees across the repository |
| `git agent-stop <task-name>` | Safely tears down the worktree and deletes the local branch after merge |

---

## The Troop Lifecycle

```text
  ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
  │   Main Trunk    │ ────> │  Isolated Tree  │ ────> │ Feature Branch  │ ────> │ Worktree Remove │
  │     (main)      │       │  agent-start    │       │ Commit & Push   │       │   agent-stop    │
  └─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

---

## Learn More

- [Getting Started Guide](./guide/getting-started.md)
- [Workflow & Lifecycle Details](./guide/workflow.md)
- [Architecture Deep Dive](./architecture.md)
- [Installation Guide](./installation.md)
- [Cooper SDD Integration](./cooper-integration.md)
