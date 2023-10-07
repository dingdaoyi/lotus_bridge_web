import vue from '@vitejs/plugin-vue';
// 自动导入组件
import Components from 'unplugin-vue-components/vite';

// 自动导入插件
import AutoImport from 'unplugin-auto-import/vite';
// UI框架按需加载
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// 打包分析
import { visualizer } from 'rollup-plugin-visualizer';
// 压缩文件
import VitePluginCompression from 'vite-plugin-compression';

import { VitePWA } from 'vite-plugin-pwa';
// 按需导入样式
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import';
export default [
  vue(),
  visualizer({
    title: '项目分析情况',
    gzipSize: true
  }),
  createStyleImportPlugin({
    resolves: [ElementPlusResolve()],
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        resolveStyle(name) {
          return `element-plus/theme-chalk/${name}.css`;
        }
      }
    ]
  }),
  Components({
    resolvers: [ElementPlusResolver()]
  }),
  AutoImport({
    dirs: ['./src/common/*', './src/api/*', './src/store/*'],
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],
    imports: [
      'vue',
      'pinia',
      {
        pinia: ['createPinia', 'PiniaVuePlugin', 'defineStore'],
        axios: [
          // default imports
          ['default', 'axios'] // import { default as axios } from 'axios',
        ],
        'vue-router': [
          'createRouter',
          'createWebHistory',
          'useRoute',
          'useRouter'
        ]
      }
    ],
    resolvers: [ElementPlusResolver()]
  }),

  VitePluginCompression({
    deleteOriginFile: true,
    threshold: 10240,
    algorithm: 'gzip',
    ext: '.gz'
  }),
  VitePWA()
];
