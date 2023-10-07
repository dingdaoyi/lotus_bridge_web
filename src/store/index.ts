const store = createPinia();

import { storePlugin } from 'pinia-plugin-store';
const plugin = storePlugin({
  stores: ['token', 'userInfo', 'config'],
  storage: localStorage
});
store.use(plugin);
export default store;
