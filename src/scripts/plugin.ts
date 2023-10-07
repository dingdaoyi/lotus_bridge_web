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
export const tabslist = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '向北输入',
    value: 'Protocol'
  },
  {
    label: '向南输入',
    value: 'DataOutput'
  }
];
export const queryParams = {
  inline: true,
  load: pluginList,
  items: [
    {
      name: 'name',
      eltype: 'select',
      visible: true,
      maxlength: '20',
      minlength: '1',
      type: 'text',
      placeholder: '请选择协议类型',
      className: ''
    },
    {
      name: 'deviceType',
      eltype: 'input',
      maxlength: '20',
      minlength: '1',
      visible: true,
      placeholder: '请输入协议名称'
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
      text: '编辑',
      className: 'text-primary'
    },

    {
      type: 'primary',
      visible: true,
      rreq: {
        label: 'id'
      },
      text: '启用',
      load: '',
      className: 'text-primary'
    },

    {
      type: 'primary',
      visible: true,
      params: '*',
      text: '删除',
      load: pluginDelete,
      rreq: {
        label: 'id'
      },
      className: 'text-error'
    }
  ]
};

export const dialogParams = {
  inline: false,
  labelWidth: '130px',
  items: [
    {
      name: 'name',
      eltype: 'input',
      maxlength: '20',
      minlength: '1',
      required: true,
      label: '协议名称',
      visible: true,
      placeholder: '请输入协议名称'
    },
    {
      name: 'description',
      eltype: 'input',
      type: 'textarea',
      required: true,
      label: '协议描述',
      visible: true,
      placeholder: '请输入描述'
    },
    {
      name: 'formCustomization',
      eltype: 'input',
      type: 'textarea',
      required: true,
      label: '自定义表单属性',
      visible: true,
      placeholder: '请输入自定义表单属性'
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
          text: '保存',
          className: '',
          loadType: 'or',
          nodekey: 'id',
          load: [
            {
              load: pluginCreate,
              params: '*'
            },
            {
              load: pluginEidt,
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
