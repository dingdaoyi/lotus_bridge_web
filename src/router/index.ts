import routes from './indexRouter';
window.onresize = () => setAppVersion(getPlatform());
const router: any = createRouter({
  history: createWebHistory(),
  strict: true,
  routes
});
router.beforeEach((to: any, from: any, next: Function) => {
  setAppVersion(getPlatform());
  next();
});

export default router;
