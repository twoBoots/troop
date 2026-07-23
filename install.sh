#!/usr/bin/env bash
set -e

# JungleJim Remote/Local Installer Script
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/twoboots/junglejim/main/install.sh | bash
#   or: ./install.sh [target_directory]

RAW_BASE_URL="https://raw.githubusercontent.com/twoboots/junglejim/main"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}" 2>/dev/null)" && pwd || true)"
TARGET_DIR="${1:-$(pwd)}"

cd "$TARGET_DIR"

if [ ! -d ".git" ] && ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "Error: Target directory '$TARGET_DIR' is not a Git repository."
    echo "Please initialize git first using 'git init'."
    exit 1
fi

echo "🌴 Installing JungleJim into $(pwd)..."

# Helper function to fetch or copy a file
get_file() {
    local filename="$1"
    if [ -n "$SCRIPT_DIR" ] && [ -f "$SCRIPT_DIR/$filename" ]; then
        cp "$SCRIPT_DIR/$filename" "$filename"
    elif command -v curl >/dev/null 2>&1; then
        curl -fsSL "$RAW_BASE_URL/$filename" -o "$filename"
    elif command -v wget >/dev/null 2>&1; then
        wget -qO "$filename" "$RAW_BASE_URL/$filename"
    else
        echo "Error: Neither curl nor wget found, and local $filename is missing."
        exit 1
    fi
}

# 1. Fetch .gitaliases and configure Git include path
get_file ".gitaliases"
git config include.path ../.gitaliases
echo "  [✓] Copied .gitaliases and updated local Git config"

# 2. Ensure .worktrees/ is in .gitignore
if [ -f ".gitignore" ]; then
    if ! grep -qs "^\.worktrees/" .gitignore; then
        echo -e "\n# JungleJim Worktrees\n.worktrees/" >> .gitignore
        echo "  [✓] Appended .worktrees/ to existing .gitignore"
    else
        echo "  [✓] .worktrees/ already present in .gitignore"
    fi
else
    echo -e "# JungleJim Worktrees\n.worktrees/" > .gitignore
    echo "  [✓] Created .gitignore with .worktrees/"
fi

# 3. Fetch JUNGLEJIM.md specification
get_file "JUNGLEJIM.md"
echo "  [✓] Installed JUNGLEJIM.md specification"

# 4. Setup AGENTS.md
if [ -f "AGENTS.md" ]; then
    if ! grep -qs "JungleJim" AGENTS.md; then
        TMP_TEMPLATE="$(mktemp)"
        if [ -n "$SCRIPT_DIR" ] && [ -f "$SCRIPT_DIR/AGENTS.template.md" ]; then
            cp "$SCRIPT_DIR/AGENTS.template.md" "$TMP_TEMPLATE"
        elif command -v curl >/dev/null 2>&1; then
            curl -fsSL "$RAW_BASE_URL/AGENTS.template.md" -o "$TMP_TEMPLATE"
        elif command -v wget >/dev/null 2>&1; then
            wget -qO "$TMP_TEMPLATE" "$RAW_BASE_URL/AGENTS.template.md"
        fi
        
        echo "" >> AGENTS.md
        cat "$TMP_TEMPLATE" >> AGENTS.md
        rm -f "$TMP_TEMPLATE"
        echo "  [✓] Appended JungleJim rules to existing AGENTS.md"
    else
        echo "  [✓] JungleJim rules already present in AGENTS.md"
    fi
else
    get_file "AGENTS.template.md"
    mv AGENTS.template.md AGENTS.md
    echo "  [✓] Created AGENTS.md from template"
fi

echo ""
echo "🌴 JungleJim successfully installed!"
echo "Available Git commands:"
echo "  git agent-start <task-name>  - Spawn an isolated worktree in .worktrees/<task-name>"
echo "  git jims                     - List active worktrees in the jungle"
echo "  git agent-stop <task-name>   - Remove worktree and delete local branch"
