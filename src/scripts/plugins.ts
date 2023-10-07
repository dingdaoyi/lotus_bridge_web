import {
  pluginList,
  pluginDetail,
  pluginEidt,
  pluginCreate,
  pluginDelete
} from '@/api/index';
export const rustapi = {
  pluginDetail,
  pluginEidt,
  pluginCreate
};
export const queryParams = {
  inline: true,
  load: pluginList,
  items: [
    {
      name: 'deviceType',
      eltype: 'input',
      maxlength: '20',
      minlength: '1',
      visible: true,
      placeholder: '请输入插件'
    },

    {
      eltype: 'button',
      visible: true,
      list: [
        {
          type: 'primary',
          visible: true,
          params: '*',
          text: '查询',
          icon: 'search',
          className: ''
        }
      ]
    }
  ]
};

export const listParams = {
  images: {
    1: '',
    2: '',
    3: ''
  },
  status: '',
  title: 'name',
  items: [
    {
      label: '协议类型:',
      value: 'pluginType'
    }
  ],
  list: [
    {
      type: 'primary',
      visible: true,
      rreq: {
        label: 'id'
      },
      text: '安装',
      load: '',
      className: 'text-primary'
    },

    {
      type: 'primary',
      visible: true,
      rreq: {
        label: 'id'
      },
      path: '/group',
      text: '详情',
      className: 'text-primary'
    }
  ]
};
