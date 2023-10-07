import {
  deviceList,
  deviceDetail,
  deviceEidt,
  deviceCreate,
  deviceDelete,
  pluginList
} from '@/api/index';
export const rustapi = {
  deviceDetail,
  deviceEidt,
  deviceCreate,
  pluginList
};
export const queryParams = {
  inline: true,
  load: deviceList,
  params: '*',
  items: [
    {
      name: 'deviceType',
      eltype: 'select',
      visible: true,
      maxlength: '20',
      minlength: '1',
      placeholder: '请选择插件类型',
      load: pluginList,
      props: {
        label: 'name',
        value: 'id'
      },
      list: [],
      className: ''
    },
    {
      name: 'name',
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
  counts: [
    {
      label: '点位数',
      value: 'pointCount'
    },
    {
      label: '设备数',
      value: 'groupCount'
    }
  ],
  images: setImgPath('../assets/image/device_1.png'),
  status: '',
  title: 'name',
  items: [
    {
      label: '使用插件:',
      value: 'protocolName'
    }
  ],
  list: [
    {
      type: 'primary',
      visible: true,
      params: '*',
      text: '断开',
      load: '',
      rreq: {
        label: 'id'
      },
      className: 'text-primary'
    },
    {
      type: 'primary',
      visible: true,
      text: '编辑',
      className: 'text-primary'
    },
    {
      type: 'primary',
      visible: true,
      params: '*',
      text: '数据统计',
      path: '',
      className: 'text-primary'
    },
    {
      type: 'primary',
      visible: true,
      params: [
        {
          label: 'id',
          value: 'id'
        }
      ],
      path: '/group',
      text: '分组管理',
      className: 'text-primary'
    },
    {
      type: 'primary',
      visible: true,
      text: '删除',
      load: deviceDelete,
      rreq: {
        label: 'id'
      },
      className: 'text-error'
    }
  ]
};

export const dialogParams = {
  inline: false,
  items: [
    {
      eltype: 'content',
      visible: true,
      placeholder: '基础信息',
      className: 'font-26 font-weight'
    },
    {
      name: 'name',
      eltype: 'input',
      visible: true,
      maxlength: '20',
      required: true,
      label: '设备名称',
      placeholder: '请选择插件类型',
      className: ''
    },
    {
      name: 'deviceType',
      eltype: 'select',
      visible: true,
      maxlength: '20',
      minlength: '1',
      required: true,
      label: '设备类型',
      list: [
        {
          label: '网关',
          value: 'Gateway'
        },
        {
          label: '直连',
          value: 'Independent'
        }
      ],
      className: ''
    },

    {
      name: 'protocolName',
      eltype: 'select',
      visible: true,
      maxlength: '20',
      minlength: '1',
      required: true,
      label: '协议',
      load: pluginList,
      dynamic: {
        request: 'formCustomization',
        name: 'customData'
      },
      params: [
        {
          label: 'pluginType',
          static: true,
          value: 'Protocol'
        }
      ],
      props: {
        label: 'name',
        value: 'name'
      },
      list: [],
      className: ''
    },
    {
      eltype: 'content',
      visible: true,
      placeholder: '协议配置',
      className: 'font-26 font-weight',
      insert: true
    },
    {
      eltype: 'button',
      visible: true,
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
          loadType: 'or',
          nodekey: 'id',
          load: [
            {
              load: deviceCreate,
              params: '*'
            },
            {
              load: deviceEidt,
              params: '*',
              rreq: {
                label: 'id'
              }
            }
          ],
          text: '保存',
          className: '',
          rreq: {
            label: 'id'
          }
        }
      ]
    }
  ]
};
