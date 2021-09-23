// 广告账户管理
import { RouteRecordRaw } from 'vue-router'

const materialManage = () => import('@/views/toolCenter/material/index.vue')

const router :Array<RouteRecordRaw> = [
  {
    path: 'materialManage',
    name: 'MaterialManneg',
    component: materialManage
  }
]

export default router
