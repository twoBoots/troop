import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

test('VitePress config file exists and contains required site structure', async () => {
  const configPath = path.join(repoRoot, 'docs', '.vitepress', 'config.mts');
  assert.ok(fs.existsSync(configPath), 'docs/.vitepress/config.mts must exist');

  const content = fs.readFileSync(configPath, 'utf8');
  assert.ok(content.includes(`title: 'Troop'`), 'config must set title to Troop');
  assert.ok(content.includes('Worktree Workflow'), 'config description must mention Worktree Workflow');
  assert.ok(content.includes('base:'), 'config must specify base URL');
  assert.ok(content.includes('/troop/'), 'base must include /troop/');
  assert.ok(content.includes('https://github.com/twoBoots/troop'), 'socialLinks must link to twoBoots/troop repository');
  assert.ok(content.includes('nav:'), 'themeConfig must define navigation bar');
  assert.ok(content.includes('sidebar:'), 'themeConfig must define sidebar');
});

