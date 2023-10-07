import { userLogin } from '@/api/index';
export default {
  rules: {
    username: [
      { required: true, message: '输入的用户名格式有误', pattern: /\S{2,10}/ }
    ],
    password: [
      {
        required: true,
        message: '输入的登录密码格式有误',
        pattern: /\S{2,20}/
      }
    ]
  },
  items: [
    {
      eltype: 'content',
      placeholder: '登录，物联网管理系统',
      className: 'font-30 font-weight text-primary text-center flex',
      visible: true,
      align: 'center'
    },
    {
      name: 'username',
      eltype: 'input',
      visible: true,
      maxlength: '20',
      minlength: '1',
      type: 'text',
      required: true,
      prefixIcon: 'el-icon-user',
      placeholder: '请输入手机号',
      className: ''
    },
    {
      name: 'password',
      eltype: 'input',
      type: 'password',
      maxlength: '20',
      minlength: '1',
      visible: true,
      required: true,
      prefixIcon: 'el-icon-lock',
      placeholder: '请输入密码'
    },
    {
      required: true,
      visible: false,
      name: 'code',
      append: true,
      eltype: 'authCode',
      request: 'data.image',
      maxlength: '6',
      minlength: '1',
      placeholder: '请输入验证码'
    },
    {
      eltype: 'button',
      visible: true,
      list: [
        {
          type: 'primary',
          path: '/',
          visible: true,
          params: '*',
          load: userLogin,
          pinia: setToken,
          text: '登录',
          className: 'width-full button-primary'
        }
      ]
    }
  ]
};
