// 广告账户管理
import { RouteRecordRaw } from 'vue-router'

const dashboard = () => import('@/views/dataInsight/dashboard/index.vue')
const amDataOverview = () => import('@/views/dataInsight/amazon/dataOverview.vue')

const router :Array<RouteRecordRaw> = [
  {
    path: 'dashboard',
    name: 'DataInsightDashboard',
    component: dashboard
  },
  {
    path: 'amDataOverview',
    name: 'AmDataOverview',
    component: amDataOverview
  }
]

export default router
