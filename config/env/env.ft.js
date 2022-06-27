module.exports = {
  NEXT_APP_ENV: 'ft',

  // 请求基地址
  // NUXT_APP_BASE_API: 'http://16.163.143.182',

  // 代理
  NEXT_APP_BASE_API: '/api2',
  proxy: {
    target: 'http://16.163.143.182',
    pathRewrite: { '^/api2': '' },
  },

  // mock 请求基地址
  NEXT_APP_MOCK_API: 'http://yapi.smaloo.com/mock/60/api',
}
