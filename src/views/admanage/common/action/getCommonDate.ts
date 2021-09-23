/**
 * 广告管理-广告列表 通用获取
 * 1.公共站点，店铺
 * 2.列表型--配置数据指标列表, 保存数据指标
 * 后续 增加公共站点，店铺选择
 */
import { ElMessage } from 'element-plus'
import { HttpResponse } from '@/interface/interface'
import { getKeyArray } from '@/utils/utils'
import {
  getAmSiteAndStore,
  azGetFieldsByCode,
  azSaveUserField,
  getAmActivity,
  getAmActiviGroup
} from '@/api/admanage'

// 公共下拉
/**
 * 请求公共站点，店铺
 * @state 页面数据
 * @params 请求参数
 */
export const sendGetAmSiteAndStore = async (state: any, params: any) => {
  const res = (await getAmSiteAndStore(params)) as HttpResponse
  state.webSitAndStoreOptions = res.data || []
  if (res.data.length) {
    state.defaultWebSite = res.data[0].site
    state.defaultStore = res.data[0].storeId
  }
}
// 请求状态 公共下拉数据
export const getStatusOptions = async (state: any) => {
  const res = (await azGetFieldsByCode({ code: 'AD_AMZ_0015' })) as HttpResponse
  state.selectstateOptons = res.data || []
}
// 请求am 广告活动下拉
export const getAmActivityFn = async (state: any, params: any) => {
  const res = (await getAmActivity(params)) as HttpResponse
  state.activeOptions = res.data || []
  state.adGroupId = ''
}
// 通过上面活动id 获取活动的广告组下拉选项
export const getAmActiviGroupFn = async (state: any, params: any) => {
  const res = (await getAmActiviGroup(params)) as HttpResponse
  state.adGroupOptions = res.data || []
}

// 列表相关
const getselectArr = (arr:any []) => {
  if (arr.length == 0) return []
  return arr.filter((item, index) => {
    if (item.choose != 0) {
      return item
    }
  }).map((item, index) => {
    return item
  })
}
// 根据所有字段长度，修改每项的宽度
const getItemWidth = (arr: any[]) => {
  if (arr.length > 10) {
    return 120
  } else {
    const o: any = document.getElementsByClassName('yy-table-wrap')[0]
    const w = o.offsetWidth // 宽度
    // console.log('w: ', w)
    return ((w - 150) / (arr.length))
  }
}
/**
 * 请求表头配置指标列表
 * @state 页面数据
 * @params 请求参数
 * @callback 回调
 */
export const GetCollectAccountSelect = async (state: any, params: any, callback: any) => {
  const res = (await azGetFieldsByCode(params)) as HttpResponse
  if (res.code == 0) {
    // 选中
    state.metricList = getselectArr(res.data)
    // 全部
    state.metricListArr = res.data
    // 表头
    state.tableFields = state.metricList
    console.log('state.tableFields==', state.tableFields)
    // 请求数据table
    callback()
    // 计算表格宽度
    state.tableWidth = getItemWidth(state.tableFields)
  }
}
/**
 * 保存配置数据指标 并更新页面列表数据
 * @state 页面数据
 * @params 请求参数
 * @callback 回调
 */
export const onSaveUserField = async (state: any, params: any, callback: any) => {
  const curParams = {
    code: params.code,
    columns: getKeyArray('value', state.metricList)
  }
  const res = await azSaveUserField(curParams) as HttpResponse
  if (res.code == 0) {
    callback()
  }
}
