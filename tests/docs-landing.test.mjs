import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

test('Landing page docs/index.md exists with required layout and sections', () => {
  const indexPath = path.join(repoRoot, 'docs', 'index.md');
  assert.ok(fs.existsSync(indexPath), 'docs/index.md must exist');

  const content = fs.readFileSync(indexPath, 'utf8');

  // Home layout & hero
  assert.ok(content.includes('layout: home'), 'docs/index.md frontmatter must declare layout: home');
  assert.ok(content.includes('name: Troop'), 'hero must specify name: Troop');
  assert.ok(content.includes('tagline:'), 'hero must specify tagline');

  // Quickstart command
  assert.ok(content.includes('curl -fsSL') || content.includes('install.sh'), 'landing page must contain quickstart install command');

  // Core pillars
  assert.ok(content.includes('Monkeys') || content.includes('The Troop'), 'must feature Code Monkeys / The Troop');
  assert.ok(content.includes('https://github.com/twoBoots/troop'), 'must link Troop to https://github.com/twoBoots/troop');
  assert.ok(
    content.includes('https://twoboots.github.io/cooper') || content.includes('https://github.com/twoBoots/cooper'),
    'must link Cooper to https://twoboots.github.io/cooper/ or https://github.com/twoBoots/cooper'
  );
  assert.ok(content.includes('agent-start'), 'must highlight agent-start');
  assert.ok(content.includes('agent-stop'), 'must highlight agent-stop');
  assert.ok(content.includes('git troop'), 'must highlight git troop');

  // Workflow section
  assert.ok(content.includes('Lifecycle') || content.includes('Workflow'), 'must include workflow or lifecycle section');
});

