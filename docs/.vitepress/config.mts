import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Troop',
  description: 'Multi-Agent Git Worktree Workflow for Concurrent Development',
  base: process.env.VITEPRESS_BASE || '/troop/',
  themeConfig: {
    siteTitle: 'Troop 🐒',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Workflow', link: '/guide/workflow' },
      { text: 'Architecture', link: '/architecture' },
      { text: 'Installation', link: '/installation' },
      { text: 'Cooper Integration', link: '/cooper-integration' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Workflow & Lifecycle', link: '/guide/workflow' },
          { text: 'Installation Guide', link: '/installation' }
        ]
      },
      {
        text: 'Deep Dive',
        items: [
          { text: 'Architecture (Monkeys & Trees)', link: '/architecture' },
          { text: 'Cooper SDD Integration', link: '/cooper-integration' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/twoBoots/troop' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 twoBoots'
    },
    search: {
      provider: 'local'
    }
  }
});

