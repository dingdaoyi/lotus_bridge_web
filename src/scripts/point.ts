import {
  pointList,
  pointDetail,
  pointEidt,
  pointCreate,
  pointDelete,
  pluginList
} from '@/api/index';
export const rustapi = {
  pointDetail,
  pluginList,
  pointEidt,
  pointCreate
};
export const queryParams = {
  inline: true,
  load: pointList,
  params: [
    {
      label: 'groupId',
      value: 'groupId'
    },
    {
      label: 'page',
      value: 'page'
    },
    {
      label: 'limit',
      value: 'limit'
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
      label: '点位名称',
      visible: true,
      name: 'name'
    },
    {
      label: '节点编号',
      visible: true,
      name: ''
    },
    {
      label: '类型',
      visible: true,
      name: 'interval'
    },
    {
      label: '属性',
      visible: true,
      name: 'name'
    },
    {
      label: '精度',
      visible: true,
      name: ''
    },
    {
      label: '描述',
      visible: true,
      name: 'interval'
    },

    {
      label: '操作',
      visible: true,
      eltype: 'button',
      list: [
        {
          text: '编辑',
          visible: true
        },
        {
          text: '删除',
          load: pointDelete,
          rreq: { label: 'id' },
          visible: true
        }
      ]
    }
  ]
};
export const dialogParams = {
  inline: false,
  datas: { device_id: '' },
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
          load: deviceCreate,
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
