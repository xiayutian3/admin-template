// 广告账户管理
import { RouteRecordRaw } from 'vue-router'

const adAccountManage = () => import('@/views/systemManage/adAccountManage/index.vue')
const UserManage = () => import('@/views/systemManage/UserManage.vue')
const RoleManage = () => import('@/views/systemManage/RoleManage.vue')
const GroupManage = () => import('@/views/systemManage/GroupManage.vue')

const router :Array<RouteRecordRaw> = [
  {
    path: 'adAccountManage',
    name: 'AdAccountManage',
    component: adAccountManage
  },
  {
    path: 'usermg',
    name: 'UserManage',
    component: UserManage
  },
  {
    path: 'rolemg',
    name: 'RoleManage',
    component: RoleManage
  },
  {
    path: 'groupmg',
    name: 'GroupManage',
    component: GroupManage
  }
]

export default router
