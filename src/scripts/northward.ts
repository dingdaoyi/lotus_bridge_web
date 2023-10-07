import {
  exportConfigList,
  exportConfigDetail,
  exportConfigEidt,
  exportConfigCreate,
  exportConfigDelete,
  deviceGropList,
  pluginList,
  exportGroup,
  exportGroupStatus
} from '@/api/index';
export const rustapi = {
  exportConfigDetail,
  pluginList,
  exportGroup,
  exportConfigEidt,
  exportConfigCreate
};
export const queryParams = {
  inline: true,
  load: exportConfigList,
  items: [
    {
      name: 'name',
      eltype: 'select',
      visible: true,
      maxlength: '20',
      minlength: '1',
      placeholder: '请选择插件名称',
      className: '',
      load: pluginList,
      props: {
        label: 'name',
        value: 'id'
      },
      list: []
    },
    {
      name: 'plugin_id',
      eltype: 'input',
      maxlength: '20',
      minlength: '1',
      visible: true,
      placeholder: '请输入设备名称'
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
        },
        {
          type: 'primary',
          visible: true,
          text: '新增',
          icon: 'plus',
          className: ''
        }
      ]
    }
  ]
};

export const listParams = {
  images: setImgPath('../assets/image/device_1.png'),
  status: '',
  title: 'name',
  itemClassName: 'height-min90',
  items: [
    {
      label: '组:',
      value: 'groupNames'
    },
    {
      label: '使用插件:',
      value: 'name'
    },
    {
      label: '应用描述:',
      value: 'description'
    }
  ],
  list: [
    {
      type: 'primary',
      visible: true,
      rreq: {
        label: 'id'
      },
      text: '群组关联',
      load: exportGroupStatus,
      className: 'text-primary'
    },
    {
      type: 'primary',
      visible: true,
      params: '*',
      text: '编辑',
      className: 'text-primary'
    },
    {
      type: 'primary',
      visible: true,
      params: '*',
      text: '删除',
      rreq: {
        label: 'id'
      },
      load: exportConfigDelete,
      className: 'text-error'
    }
  ]
};
export const dialogParams = {
  inline: false,
  span: 12,
  datas: {},
  items: [
    {
      eltype: 'content',
      visible: true,
      placeholder: '基础信息',
      span: 24,
      className: 'font-26 font-weight'
    },
    {
      name: 'name',
      eltype: 'input',
      maxlength: '20',
      minlength: '1',
      required: true,
      label: '应用名称',
      visible: true,
      placeholder: '请输入应用名称'
    },
    {
      name: 'plugin_id',
      eltype: 'select',
      visible: true,
      maxlength: '20',
      required: true,
      type: 'text',
      label: '选择组',
      placeholder: '请选择组',
      className: '',
      load: deviceGropList,
      rreq: {
        label: 'id'
      },
      props: {
        label: 'name',
        value: 'id'
      },
      list: []
    },
    {
      name: 'protocolName',
      eltype: 'select',
      visible: true,
      maxlength: '20',
      required: true,
      type: 'text',
      label: '插件选择',
      placeholder: '请选插件选择',
      className: '',
      load: pluginList,
      dynamic: {
        request: 'formCustomization',
        name: 'configuration'
      },
      props: {
        label: 'name',
        value: 'name'
      },
      list: [],
      params: [
        {
          label: 'pluginType',
          static: true,
          value: 'DataOutput'
        }
      ]
    },

    {
      eltype: 'content',
      visible: true,
      placeholder: '协议设置',
      span: 24,
      className: 'font-26 font-weight',
      insert: true
    },

    {
      eltype: 'button',
      visible: true,
      span: 24,
      itemClassName: 'justify-center flex-row',
      list: [
        {
          type: 'primary',
          visible: true,
          plain: true,
          text: '取消',
          className: ''
        },
        {
          type: 'primary',
          visible: true,
          params: '*',
          text: '保存',
          className: '',
          loadType: 'or',
          nodekey: 'id',
          load: [
            {
              load: exportConfigCreate,
              params: '*'
            },
            {
              load: exportConfigEidt,
              params: '*',
              rreq: {
                label: 'id'
              }
            }
          ]
        }
      ]
    }
  ]
};
