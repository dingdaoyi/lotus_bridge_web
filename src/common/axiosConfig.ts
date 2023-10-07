import router from '@/router';
let tempLoading: any = null,
  configRequest: any = null;
export const httpRequest: any = axios.create();
// 请求前处理函数
export const configRequestFunction = (config: any) => {
  if (config.once && !configRequest) {
    config.once -= 1;
    configRequest = config;
  } else {
    configRequest = null;
  }
  if (config.loading) {
    tempLoading = Loading({
      text: config.loading,
      background: 'rgba(0,0,0,.8)'
    });
  }
  config.headers = Object.assign(
    {},
    {
      'Content-Type': 'application/json'
    },
    config.headers
  );
  if (getToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`;
  }
  return config;
};
// 请求成功处理
export const httptResponseFunction = async (response: object) => {
  const { config, data, status, statusText }: any = response;
  if (!isObject(data)) {
    return Promise.resolve(data);
  }
  let result: any = {
    code: data[config.code ?? 'code'] ?? status,
    data: data[config.request ?? 'data'],
    message: data[config.message ?? 'msg'] ?? statusText
  };

  const statusCode = ['1', '200'].includes(String(result.code));
  // 数据响应提示
  config.showMessage &&
    MessageBox({
      type: statusCode ? 'success' : 'error',
      duration: 5000,
      message: result.message
    });
  // 关闭loading
  tempLoading && tempLoading.close();
  return statusCode ? Promise.resolve(result) : Promise.reject(result);
};

// 请求失败处理函数
export const httpErrorFunction = async (error: object) => {
  const { message, config, status } = JSON.parse(JSON.stringify(error));

  if (status == 401) {
    router.push('/login');
    return false;
  }
  await MessageBox({
    type: 'error',
    duration: 50000,
    message: statusError(status) ?? message
  });
  // 关闭loading
  tempLoading && tempLoading.close();
  // 重新请求
  if (config && config.once && configRequest) {
    httpRequest.request(config);
  }
  return Promise.reject(error);
};
