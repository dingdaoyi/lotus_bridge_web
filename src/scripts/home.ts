export default {
  inline: false,
  span: 12,
  labelWidth: '100px',
  reload: {
    params: [
      {
        label: '',
        value: ''
      }
    ],
    load: {
      url: '/district/v1/getchildren',
      type: 'get',
      prefix: '/ws',
      request: 'result'
    }
  },
  datas: {},
  items: [
    {
      name: 'name',
      eltype: 'input',
      label: '姓名',
      placeholder: '输入框姓名',
      className: '',
      visible: true
    },
    {
      name: 'date',
      eltype: 'date',
      label: '日期',
      placeholder: '日期',
      className: '',
      visible: true
    },
    {
      name: 'rate',
      eltype: 'rate',
      label: '评价',
      dataType: 'm',
      placeholder: '评价',
      className: '',
      visible: true
    },
    {
      name: 'switch',
      eltype: 'switch',
      label: '状态',
      placeholder: '状态',
      className: '',
      visible: true
    },
    {
      name: 'radio',
      eltype: 'radio',
      label: '性别',
      placeholder: '性别',
      className: '',
      visible: true,
      list: [
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '2'
        }
      ]
    },

    {
      name: 'tree',
      eltype: 'tree',
      label: '行政区',
      placeholder: '输入框',
      className: '',
      visible: true,
      lazy: true,
      nodeKey: 'id',
      props: {
        label: 'name'
      },
      load: {
        url: '/district/v1/getchildren',
        type: 'get',
        prefix: '/ws',
        request: 'result'
      }
    },
    {
      name: 'select',
      eltype: 'select',
      label: '选择框',
      placeholder: '输入框',
      className: '',
      visible: false,
      params: [
        {
          label: 'key',
          static: true,
          value: 'LNABZ-UXM6G-SDNQK-IE6KK-T44VE-SCFUE'
        }
      ],
      load: {
        url: '/district/v1/getchildren',
        type: 'get',
        prefix: '/ws',
        request: 'result'
      },
      props: {
        label: 'fullname',
        value: 'id'
      },
      list: []
    },

    {
      name: 'checkbox',
      eltype: 'checkbox',
      label: '类型',
      className: '',
      visible: true,
      dataType: 'a',
      list: [
        {
          label: '语文',
          value: '1'
        },
        {
          label: '数学',
          value: '2'
        },
        {
          label: '历史',
          value: '3'
        }
      ]
    },
    {
      name: 'color',
      eltype: 'color',
      label: '颜色',
      className: '',
      visible: true
    },
    {
      name: 'time',
      eltype: 'time',
      label: '时间',
      placeholder: '输入框',
      className: '',
      visible: true
    },
    {
      name: 'upload',
      eltype: 'upload',
      listType: 'text',
      label: '图片',
      fileType: /vue|json/,
      fileSize: 100,
      placeholder: '输入框',
      className: '',
      visible: true
    },
    {
      eltype: 'button',
      visible: true,
      span: 24,
      list: [
        {
          visible: true,
          type: 'primary',
          text: '提交',
          className: ''
        }
      ]
    }
  ]
};
