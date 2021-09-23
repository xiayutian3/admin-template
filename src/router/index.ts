import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '@/store'
import { getLocalStorage } from '@/utils/localStorage'
import config from '@/config'
// import { isEmptyObject } from '@/utils/utils'
import Home from '../views/Home.vue'
// 引入模块路由
import adManage from './module/adManage'
import systemManage from './module/systemManage'
import toolCenter from './module/toolCenter'
import dataInsight from './module/dataInsight'

const Login = () => import(/* webpackChunkName: "login" */ '@/views/user/Login.vue')
const Register = () => import('@/views/user/Register.vue')
const Reset = () => import('@/views/user/Reset.vue')
// 工具中心

// 数据洞察

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      // 广告账户管理
      ...adManage,
      // 系统管理
      ...systemManage,
      // 工具中心
      ...toolCenter,
      // 数据洞察
      ...dataInsight
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/reset',
    name: 'Reset',
    component: Reset
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

// console.log('bashurl', process.env.BASE_URL)
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(123)
  // 同步vuex用户信息
  if (!(store as any).state.user.loginuserInfo.userName) {
    const getUser = getLocalStorage('loginUserInfo')

    if (getUser) {
      store.dispatch('user/setloginuserinfo', JSON.parse(getUser))
      next()
    } else {
      if (config.whitelists.includes(to.path)) {
        next()
      } else {
      // 没有登录跳转登录页
        // console.log('跳转登录页')
        if (to.name !== 'Login') {
          next({ name: 'Login' })
        } else {
          next()
        }
      }
    }
    // next()
  } else {
    // console.log('已登陆')
    next()
  }
})

export default router
