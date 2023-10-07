export const useConfig: any = defineStore({
  id: 'config',
  state() {
    return {
      appVersion: 'pc' as string,
      theme: {
        status: 'Sunny'
      }
    };
  },
  getters: {
    getAppTheme(state) {
      return state.theme;
    },
    getAppVersion(state) {
      return state.appVersion;
    }
  },
  actions: {
    setAppTheme(data: any) {
      this.theme = data;
    },
    setAppVersion(data: string) {
      this.appVersion = data;
    }
  }
});

export const useToken: any = defineStore({
  id: 'token',
  state() {
    return {
      token: '' as string
    };
  },
  getters: {
    getToken(state) {
      return state.token;
    }
  },
  actions: {
    setToken(data: string = '') {
      this.token = data;
    }
  }
});

export const useUserInfo: any = defineStore({
  id: 'userInfo',
  state() {
    return {
      userInfo: {} as object
    };
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    }
  },
  actions: {
    setUserInfo(datas: Object = {}) {
      this.userInfo = datas;
    }
  }
});

// 快速获取
export const setUserInfo = (data: any) => useUserInfo().setUserInfo(data);
export const setToken = (data: string) => useToken().setToken(data);
export const setAppVersion = (data: any) => useConfig().setAppVersion(data);
export const setAppTheme = (data: any) => useConfig().setAppTheme(data);
export const getUserInfo = () => useUserInfo().getUserInfo;
export const getAppTheme = () => useConfig().getAppTheme;
export const getAppVersion = () => useConfig().getAppVersion;
export const getToken = () => useToken().getToken;
