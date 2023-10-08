// 登录
export const userLogin = {
  url: '/login',
  type: 'post',
  loading: '登录中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};
// 设备管理
export const deviceList = {
  url: '/device',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};

export const deviceDetail = {
  url: '/device/rreq',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};

export const deviceEidt = {
  url: '/device/rreq',
  type: 'put',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};
export const deviceDelete = {
  url: '/device/rreq',
  type: 'delete',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};
export const deviceCreate = {
  url: '/device',
  type: 'post',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};


export const exportGroup = {
  url: '/export-group',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};
export const exportGroupStatus = {
  url: '/export-group/rreq',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};

// 设备组管理
export const deviceGropList = {
  url: '/device-group/list',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};

export const deviceGropDetail = {
  url: '/device-group/rreq',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};

export const deviceGropEidt = {
  url: '/device-group/rreq',
  type: 'put',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};
export const deviceGropDelete = {
  url: '/device-group/rreq',
  type: 'delete',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};
export const deviceGropCreate = {
  url: '/device-group',
  type: 'post',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};

// 点位管理
export const pointList = {
  url: '/point/page',
  type: 'post',
  prefix: '/rustapi',
  request: 'data'
};
export const pointValue = {
  url: '/point/value/rreq',

  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};
export const pointSetValue = {
  url: '/point/value/rreq',

  type: 'post',
  prefix: '/rustapi',
  request: 'data'
};
export const pointDelete = {
  url: '/point/rreq',

  type: 'delete',
  prefix: '/rustapi',
  request: 'data'
};
export const pointDetail = {
  url: '/point/rreq',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};

export const pointEidt = {
  url: '/point/rreq',
  type: 'put',
  rreq: {
    label: 'id'
  },
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};

export const pointCreate = {
  url: '/point',
  type: 'post',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};

//导出配置管理


export const exportConfigList = {
  url: '/export-config/list',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};

export const exportConfigDetail = {
  url: '/export-config/rreq',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};
export const exportConfigDelete = {
  url: '/export-config/rreq',
  type: 'delete',
  prefix: '/rustapi',
  request: 'data'
};
export const exportConfigEidt = {
  url: '/export-config/rreq',
  type: 'put',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};

export const exportConfigCreate = {
  url: '/export-config',
  type: 'post',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};

//插件管理
export const pluginList = {
  url: '/plugin/list',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};

export const pluginDetail = {
  url: '/plugin/rreq',
  type: 'get',
  prefix: '/rustapi',
  request: 'data'
};
export const pluginDelete = {
  url: '/plugin/rreq',
  type: 'delete',
  prefix: '/rustapi',
  request: 'data'
};
export const pluginEidt = {
  url: '/plugin/rreq',
  type: 'put',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};

export const pluginCreate = {
  url: '/plugin',
  type: 'post',
  loading: '数据保存中...',
  showMessage: true,
  prefix: '/rustapi',
  request: 'data'
};
