export default {
  baseUrl: {
    // nodejs服务
    // test:'http://192.168.2.213:8849'
    dev: '/api',
    pro: 'https://api.yignite.io' // test
    // pro: 'https://api.dyo.com' //production

  },
  // 定义请求头不需要添加token的路径
  publicPath: [/^\/public/, /^\/login/],
  // 前端路由白名单
  whitelists: ['/login', '/register', '/reset'],
  isProduction: process.env.NODE_ENV === 'production'
}
