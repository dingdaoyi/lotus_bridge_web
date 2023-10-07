import {
  deviceGropDetail,
  deviceGropEidt,
  deviceGropCreate,
  deviceGropDelete,
  pluginList
} from '@/api/index';
export const rustapi = {
  deviceGropDetail,
  pluginList,
  deviceGropEidt,
  deviceGropCreate
};
export const queryParams = {
  inline: true,
  load: deviceGropList,
  params: [
    {
      label: 'device_id',
      value: 'id'
    }
  ],
  items: [
    {
      eltype: 'button',
      visible: true,
      list: [
        {
          type: 'primary',
          visible: true,
          text: '新增',
          icon: 'plus',
          className: ''
        },
        {
          type: 'primary',
          visible: true,
          params: '*',
          text: '导入',
          icon: 'Download',
          className: ''
        },
        {
          type: 'primary',
          visible: true,
          params: '*',
          text: '导出',
          icon: 'Upload',
          className: ''
        }
      ]
    }
  ]
};

export const listParams = {
  items: [
    {
      label: '组名称',
      visible: true,
      name: 'name'
    },
    {
      label: '点位数',
      visible: true,
      name: ''
    },
    {
      label: '间隔',
      visible: true,
      name: 'interval'
    },

    {
      label: '操作',
      visible: true,
      eltype: 'button',
      list: [
        {
          text: '点位列表',
          path: '/point',
          visible: true,
          params: [
            {
              label: 'id',
              value: 'id'
            }
          ]
        },
        {
          text: '编辑',
          visible: true
        },
        {
          text: '删除',
          load: deviceGropDelete,
          rreq: { label: 'id' },
          visible: true
        }
      ]
    }
  ]
};
export const dialogParams = {
  inline: false,
  items: [
    {
      name: 'name',
      eltype: 'input',
      visible: true,
      maxlength: '20',
      required: true,
      label: '组名称',
      placeholder: '请输入组名称',
      className: ''
    },
    {
      name: 'interval',
      eltype: 'input',
      visible: true,
      maxlength: '20',
      required: true,
      minlength: '1',
      label: '间隔时间',
      placeholder: '请输入间隔时间',
      className: ''
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
              load: deviceGropCreate,
              params: '*'
            },
            {
              load: deviceGropEidt,
              params: '*',
              rreq: {
                label: 'id'
              }
            }
          ],
          text: '保存',
          className: ''
        }
      ]
    }
  ]
};
