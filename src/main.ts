import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import i18nFn from '@/lang'
import { i18n, ElementPlus } from '@/lang/index'
import registerDirectives from '@/directives/index'
import '@/assets/css/neat.css'
// import '@/plugin/element-variables.scss'
import './thems/index.css'
import '@/assets/iconfont/iconfontline.css'
// 引入 谷歌 roboto 字体授权需要
import '@/assets/font.css'
// console.log('store', (store.state as any))

const app = createApp(App)
// i18nFn(app)
// 注册自定义指令
registerDirectives(app)
app.use(ElementPlus, {
  i18n: i18n.global.t
})
app.use(i18n)
app.use(store).use(router).mount('#app')
