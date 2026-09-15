# Cooper SDD Integration

[Troop](https://github.com/twoBoots/troop) provides worktree isolation for [Cooper](https://twoboots.github.io/cooper/), an autonomous Spec-Driven Development (SDD) framework.

---

## Why Cooper Relies on Troop

Cooper pairs two mechanisms to prevent agent drift and corruption:
1. **Living Capability Specifications** (`.cooper/specs/`): Eliminates requirement drift via explicit Spec Deltas.
2. **Troop Worktree Isolation** (`.worktrees/`): Eliminates trunk corruption by isolating each track in its own worktree.

---

## Architecture Synergy

<div class="lifecycle-flow">
  <div class="lifecycle-card">
    <span class="lifecycle-badge">Framework</span>
    <div class="lifecycle-step">Cooper SDD</div>
    <div class="lifecycle-sub">Living Specs &amp; Spec Deltas</div>
  </div>
  <div class="lifecycle-arrow">→</div>
  <div class="lifecycle-card">
    <span class="lifecycle-badge">Execution Layer</span>
    <div class="lifecycle-step">Troop Trees</div>
    <div class="lifecycle-sub">Isolated .worktrees/&lt;track_id&gt;</div>
  </div>
</div>

---

## How Cooper Installs Troop

When Cooper is installed via its one-line installer:

```bash
curl -fsSL https://raw.githubusercontent.com/twoBoots/cooper/main/install.sh | bash
```

The installer runs Troop's installation pipeline:
1. Executes Troop's installer to configure `.gitaliases` (`git agent-start`, `git agent-stop`, `git troop`).
2. Configures `.gitignore` to ignore the `.worktrees/` directory.
3. Moves `TROOP.md` into `.cooper/TROOP.md` to keep the project root clean.
4. Extends `AGENTS.md` with guidelines instructing AI agents to always operate inside Troop worktrees.

---

## Workflow Integration

When working on a Cooper track, agent skills map directly onto Troop commands:

| Cooper Phase | Agent Skill | Troop Command | Description |
| :--- | :--- | :--- | :--- |
| **Track Initialization** | `cooper-new-track` | `git agent-start <track_id>` | Creates isolated tree at `.worktrees/<track_id>` and checks out `<track_id>` |
| **Implementation** | `cooper-implement` | `cd .worktrees/<track_id>` | Executes TDD loop and Git Notes metadata inside the isolated worktree |
| **Status Overview** | `cooper-status` | `git troop` | Lists all active tracks and monkeys across trees |
| **Review & Archival** | `cooper-review` | `git agent-stop <track_id>` | Archives track into `.cooper/archive/<track_id>/` and cleanly deletes worktree |

---

## References

- [Cooper Repository](https://github.com/twoBoots/cooper)
- [Cooper Documentation](https://twoboots.github.io/cooper/)
- [Troop Repository](https://github.com/twoBoots/troop)
- [Troop Workflow Guide](./guide/workflow.md)
