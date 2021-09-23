import { createStore, createLogger } from 'vuex'
import user from './modules/user'
import common from './modules/common'
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  modules: {
    user,
    common
  },
  plugins: debug ? [createLogger()] : [] // 调试vuex
})
