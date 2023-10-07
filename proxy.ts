export default {
  '/rustapi': {
    target: 'http://139.155.178.78:8000',
    changeOrigin: true,
    ws: true,
    rewrite: (path: string) => path.replace(/^\/rustapi/, '')
  }
};
