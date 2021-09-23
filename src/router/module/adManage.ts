// 广告账户管理
import { RouteRecordRaw } from 'vue-router'

const GgListad = () => import('@/views/admanage/google/Listad.vue')
const GgSearchad = () => import('@/views/admanage/google/Searchad.vue')
const GgShopad = () => import('@/views/admanage/google/Shopad.vue')
const GgTaskad = () => import('@/views/admanage/google/Taskad.vue')
const FbListad = () => import('@/views/admanage/facebook/Listad.vue')
const FbTaskad = () => import('@/views/admanage/facebook/Taskad.vue')
const FbPublic = () => import('@/views/admanage/facebook/Public.vue')
const AmznListad = () => import('@/views/admanage/amazon/Listad.vue')
const AmznSpListDetail = () => import('@/views/admanage/amazon/sp-detail-list.vue')
// const AmznTaskad = () => import('@/views/admanage/amazon/Taskad.vue')
const AmznAdcomposition = () => import('@/views/admanage/amazon/Adcomposition.vue')
const AmznSbad = () => import('@/views/admanage/amazon/Sbad.vue')
const AmznSdad = () => import('@/views/admanage/amazon/Sdad.vue')
const AmznSpad = () => import('@/views/admanage/amazon/Spad.vue')

const router :Array<RouteRecordRaw> = [
  {
    path: 'gglistad',
    name: 'GgListad',
    component: GgListad
  },
  {
    path: 'ggsearchad',
    name: 'GgSearchad',
    component: GgSearchad
  },
  {
    path: 'ggshopad',
    name: 'GgShopad',
    component: GgShopad
  },
  {
    path: 'ggtaskad',
    name: 'GgTaskad',
    component: GgTaskad
  },
  {
    path: 'fblistad',
    name: 'FbListad',
    component: FbListad
  },
  {
    path: 'fbtaskad',
    name: 'FbTaskad',
    component: FbTaskad
  },
  {
    path: 'fbpublic',
    name: 'FbPublic',
    component: FbPublic
  },
  {
    path: 'amznlistad',
    name: 'AmznListad',
    component: AmznListad
  },
  {
    path: 'amznSpListDetail',
    name: 'AmznSpListDetail',
    component: AmznSpListDetail
  },
  // {
  //   path: 'amzntaskad',
  //   name: 'AmznTaskad',
  //   component: AmznTaskad
  // },
  {
    path: 'amznadcomposition',
    name: 'AmznAdcomposition',
    component: AmznAdcomposition
  },
  {
    path: 'amznsbad',
    name: 'AmznSbad',
    component: AmznSbad
  },
  {
    path: 'amznsdad',
    name: 'AmznSdad',
    component: AmznSdad
  },
  {
    path: 'amznspad',
    name: 'AmznSpad',
    component: AmznSpad
  }
]

export default router
