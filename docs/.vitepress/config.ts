import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'PineVue 官方文档',
  description: '自定义UI框架', 
  outDir: '../doc',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/template/index' }
    ],

    sidebar: [
      {
        text: '组件',
        items: [
          { text: '表格', link: '/template/table' },
          { text: '表单', link: '/template/form' }
        ]
      },
      {
        text: '规范',
        items: [
          { text: 'ts', link: '/norm/ts' },
          { text: 'scss', link: '/norm/scss' },
          { text: 'vue', link: '/norm/vue' }
        ]
      },
      {
        text: '公共',
        items: [
          { text: 'ts', link: '/common/ts' },
          { text: 'scss', link: '/common/scs' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/byzhyt/pine_vue.git' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    }
  }
});
