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

test('VitePress custom theme styles feature card links', () => {
  const cssPath = path.join(repoRoot, 'docs', '.vitepress', 'theme', 'custom.css');
  assert.ok(fs.existsSync(cssPath), 'docs/.vitepress/theme/custom.css must exist');

  const content = fs.readFileSync(cssPath, 'utf8');
  assert.ok(content.includes('.VPFeature .details a'), 'custom.css must style .VPFeature .details a');
  assert.ok(content.includes('color: var(--vp-c-brand-1)'), 'must use brand color for feature links');
});

test('VitePress custom theme defines responsive lifecycle flow diagrams', () => {
  const cssPath = path.join(repoRoot, 'docs', '.vitepress', 'theme', 'custom.css');
  assert.ok(fs.existsSync(cssPath), 'docs/.vitepress/theme/custom.css must exist');

  const content = fs.readFileSync(cssPath, 'utf8');
  assert.ok(content.includes('.lifecycle-flow'), 'custom.css must define .lifecycle-flow');
  assert.ok(content.includes('.lifecycle-card'), 'custom.css must define .lifecycle-card');
  assert.ok(content.includes('@media (max-width: 640px)'), 'custom.css must define mobile responsive breakpoint');
});

