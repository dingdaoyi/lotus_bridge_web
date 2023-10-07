import { defineConfig } from 'vite';
import plugins from './plugin';
import proxy from './proxy';
import { fileURLToPath } from 'url';
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', 'vue', 'scss']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/scss/variables.scss';`
      }
    }
  },
  plugins,
  preview: {
    port: 9230,
    proxy
  },
  server: {
    strictPort: true,
    port: 1029,
    proxy
  },
  build: {
    manifest: true
  }
});
