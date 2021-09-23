// 广告管理-广告列表，  广告任务 通用的api 业务代码
import { ElMessage } from 'element-plus'
import {
  commonAccountSelect,
  commonPubilshUser,
  commonStoreSelect,
  commonAdList,
  commonBatchHandleBudget,
  commonBatchHandleDel,
  commonBatchHandleSwitch,
  commonExportReportCampaign,
  commonHandleSwitch,
  commonAdvertisementTaskList,
  commonAdvertisementTaskDelete,
  azSdCommodity,
  azAudienceList,
  azSelfProducts
} from '@/api/admanage'
import { HttpResponse } from '@/interface/interface'
import { getKeyArray } from '@/utils/utils'

// 广告列表
// -------------------------------------------------------------------------------------------------------------------

/**
 *
 * @param obj 获取表格的头部字段
 * @returns 数组
 */
// 所有kes
export const getObjKeys = (obj: any) => {
  if (!obj) return []
  return Object.keys(obj)
    .map((key) => {
      // field          // 字段名字
      let isShow = false // true 已选中/已显示
      let disabled = false // 配置时不可勾选
      let name = '' // 名字
      let width: any // 单元格宽度
      switch (key) {
        case 'taskName':
          name = '任务名称'
          disabled = true
          isShow = true
          break
        case 'campaignName':
          name = '广告系列名称'
          disabled = true
          isShow = true
          break
        case 'adsetName':
          name = '广告组名称'
          disabled = true
          isShow = true
          break
        case 'composeName':
          name = '广告组合名称'
          disabled = true
          isShow = true
          break
        case 'adsName':
          name = '广告名称'
          disabled = true
          isShow = true
          break
        case 'launchStatus':
          name = '状态'
          isShow = true
          disabled = true
          break
        case 'dailyBudget':
          name = '预算'
          break
        case 'spend':
          name = '花费'
          break
        case 'purchaseRoas':
          name = 'ROAS'
          isShow = true
          break
        case 'impressions':
          name = '展示数'
          isShow = true
          break
        case 'reach':
          name = '触达用户数'
          // isShow = true
          break
        case 'clicks':
          name = '点击数'
          isShow = true
          break
        case 'cpc':
          name = 'CPC'
          break
        case 'ctr':
          name = '点击率'
          isShow = true
          break
        case 'cpm':
          name = 'CPM'
          break
        case 'conversions':
          name = '转化数'
          break
        case 'conversionValues':
          name = '转化金额'
          break
        case 'costPerConversion':
          name = 'CPA '
          break
        case 'bounceRate':
          name = '跳出率'
          isShow = true
          break
        case 'conversionRate':
          name = '转化率'
          isShow = true
          break
        case 'engagements':
          name = '参与次数'
          break
        case 'acos':
          name = 'ACOS'
          break
      }
      if (name) {
        return {
          name,
          field: key,
          disabled,
          isShow,
          width
        }
      }
    })
    .filter((item) => item)
}

// 搜索广告下拉列表
export const collectGetAccountSelect = async (state:any) => {
  const params = {
    channelId: state.channelId
  }
  const res = (await commonAccountSelect(params)) as HttpResponse
  console.log('res: ', res)
  if (res.code == 0) {
    state.selOptionsAd = res.data
  }
}

// 获取发布人下拉
export const collectGetPubilshUser = async (state:any) => {
  const params = {
    channelId: state.channelId
  }
  const res = (await commonPubilshUser(params)) as HttpResponse
  console.log('res发布人--: ', res)
  if (res.code == 0) {
    state.selOptionsMan = res.data || []
  }
}

// 请求table数据
export const collectGetData = async (state:any) => {
  const params = {
    channelId: state.channelId,
    businessType: state.businessType,
    size: state.pageSize,
    current: state.currentPage,
    // 搜索条件
    keyword: state.input,
    accountId: state.selectvalad ? [state.selectvalad] : [],
    shopAccount: state.selstore ? [state.selstore] : [],
    runBeginTime: state.runtime ? state.runtime[0] : '',
    runEndTime: state.runtime ? state.runtime[1] : '',
    beginTime: state.onlinetime ? state.onlinetime[0] : '',
    endTime: state.onlinetime ? state.onlinetime[1] : '',
    launchStatus: state.selstatus,
    spendMin: state.spendVal1,
    spendMax: state.spendVal2,
    dailyBudgetMin: state.budget1,
    dailyBudgetMax: state.budget2,
    purchaseRoasMin: state.ROASval1,
    purchaseRoasMax: state.ROASval2,
    isTask: state.selectad
  }
  const res = (await commonAdList(params)) as HttpResponse
  // console.log('res: ', res)
  if (res.code == 0) {
    if (!res.data.records) return
    if (res.data.records.length == 0) {
      // 表头字段
      if (state.channelId == 3) {
        if (state.businessType == 1) {
          state.tableFields = [
            // {
            //   name: '开关',
            //   field: 'launchStatus',
            //   width: 120
            // },
            {
              name: '任务名称',
              field: 'taskName'
            },
            {
              name: '广告系列名称',
              field: 'campaignName'
            },
            {
              name: '状态',
              field: 'launchStatus'
            },
            // {
            //   name: 'ROAS',
            //   field: 'purchaseRoas'
            // },
            {
              name: '预算',
              field: 'dailyBudget'
            },
            {
              name: '曝光量',
              field: 'impressions'
            },
            {
              name: '点击数',
              field: 'clicks'
            },
            // {
            //   name: '点击率',
            //   field: 'ctr'
            // },
            {
              name: 'CTR',
              field: 'ctr'
            },
            {
              name: 'CPC',
              field: 'cpc'
            },
            {
              name: 'ACOS',
              field: 'impressions'
            }
          ]
        } else {
          state.tableFields = [
            {
              name: '开关',
              field: 'launchStatus',
              width: 120
            },
            {
              name: '任务名称',
              field: 'taskName'
            },
            {
              name: '广告系列名称',
              field: 'campaignName'
            },
            {
              name: '状态',
              field: 'launchStatus'
            },
            // {
            //   name: 'ROAS',
            //   field: 'purchaseRoas'
            // },
            {
              name: '预算',
              field: 'dailyBudget'
            },
            {
              name: '曝光量',
              field: 'impressions'
            },
            {
              name: '点击数',
              field: 'clicks'
            },
            // {
            //   name: '点击率',
            //   field: 'ctr'
            // },
            {
              name: 'CTR',
              field: 'ctr'
            },
            {
              name: 'CPC',
              field: 'cpc'
            },
            {
              name: 'ACOS',
              field: 'impressions'
            }
          ]
        }
      }

      // state.tableFields =
      // console.log('tableFields1', state.tableFields)
      state.tableData = res.data.records
      state.metricListArr = []
      state.metricList = []
      return
    }

    let resArr: any
    let varArr: any[]
    state.tableData = res.data.records
    state.total = res.data.total
    // table列表的每个字段，配置数据
    const newArr: any[] = getObjKeys(res.data.records[0])
    // console.log('newArr: ', newArr)
    if (state.businessType == 1) {
      varArr = newArr.filter((item) => {
        if (item.name !== '广告系列名称' && item.name !== '广告名称' && item.name !== '广告组名称') {
          return item
        }
      })
      state.metricListArr = varArr
      // if (state.channelId == 1) {
      //   // facebook
      //   varArr.forEach((item:any) => {
      //     if (item.name == 'CPM') {
      //       item.isShow = true
      //     }
      //   })
      // }
      if (state.channelId == 3) {
        // amzn
        varArr.forEach((item:any) => {
          if (item.name == 'ACOS') {
            item.isShow = true
          }
          if (item.name == 'ROAS') {
            item.isShow = false
          }
        })
      }
      resArr = varArr.filter((item) => item.isShow)
    } else if (state.businessType == 2) {
      varArr = newArr.filter((item) => {
        if (item.name !== '广告组名称' && item.name !== '广告名称' && item.name !== '广告组合名称') {
          return item
        }
      })
      state.metricListArr = varArr
      if (state.channelId == 1) {
        // facebook
        varArr.forEach((item:any) => {
          if (item.name == 'CPM') {
            item.isShow = true
          }
        })
      }
      // if (state.channelId == 3) {
      //   // amzn
      //   varArr.forEach((item:any) => {
      //     if (item.name == 'ACOS') {
      //       item.isShow = true
      //     }
      //     if (item.name == 'ROAS') {
      //       item.isShow = false
      //     }
      //   })
      // }
      resArr = varArr.filter((item) => item.isShow)
    } else if (state.businessType == 3) {
      varArr = newArr.filter((item) => {
        if (item.name !== '广告系列名称' && item.name !== '广告名称' && item.name !== '广告组合名称') {
          return item
        }
      })
      state.metricListArr = varArr
      if (state.channelId == 1) {
        // facebook
        varArr.forEach((item:any) => {
          if (item.name == 'CPM') {
            item.isShow = true
          }
        })
      }
      // if (state.channelId == 3) {
      //   // amzn
      //   varArr.forEach((item:any) => {
      //     if (item.name == 'ACOS') {
      //       item.isShow = true
      //     }
      //     if (item.name == 'ROAS') {
      //       item.isShow = false
      //     }
      //   })
      // }
      resArr = varArr.filter((item) => item.isShow)
    } else if (state.businessType == 4) {
      varArr = newArr.filter((item) => {
        if (item.name !== '广告组名称' && item.name !== '广告系列名称' && item.name !== '广告组合名称') {
          return item
        }
      })
      state.metricListArr = varArr
      if (state.channelId == 1) {
        // facebook
        varArr.forEach((item:any) => {
          if (item.name == 'CPM') {
            item.isShow = true
          }
        })
      }
      // if (state.channelId == 3) {
      //   // amzn
      //   varArr.forEach((item:any) => {
      //     if (item.name == 'ACOS') {
      //       item.isShow = true
      //     }
      //     if (item.name == 'ROAS') {
      //       item.isShow = false
      //     }
      //   })
      // }
      resArr = varArr.filter((item) => item.isShow)
    }
    // 配置数据(已经选择的)
    state.metricList = resArr
    // JSON.parse(JSON.stringify(resArr))

    // amzn 广告组合不需要开关
    // console.log('resArr', resArr)
    if (state.channelId != 3 || state.businessType != 1) {
      resArr.unshift({
        name: '开关',
        field: 'launchStatus',
        width: 100,
        isShow: true,
        disabled: false
      })
    }

    // 之前选择的字段
    // console.log('state.tableFields: ', state.tableFields.length)
    const newFields = state.tableFields.slice(10) || []

    // 表头字段
    state.tableFields = resArr.concat(newFields)
    // console.log('state.tableFields:123456 ', state.tableFields)
  }
}

// 导出数据
export const collectExportReportCampaign = async (state:any) => {
  const params = {
    channelId: state.channelId,
    businessType: state.businessType,
    size: state.pageSize,
    current: state.currentPage,
    isExport: 1,
    // 搜索条件
    campaignName: state.input,
    accountId: state.selectvalad ? [state.selectvalad] : [],
    runBeginTime: state.runtime[0],
    runEndTime: state.runtime[1],
    beginTime: state.onlinetime[0],
    endTime: state.onlinetime[1],
    launchStatus: state.selstatus,
    spendMin: state.spendVal1,
    spendMax: state.spendVal2,
    dailyBudgetMin: state.budget1,
    dailyBudgetMax: state.budget2,
    purchaseRoasMin: state.ROASval1,
    purchaseRoasMax: state.ROASval2,
    isTask: state.selectad
  }
  // const res =
  await commonExportReportCampaign(params)
}

// 操作类型(操作类型1-广告组合 2-广告系列 3-广告组 4-广告)
export const collectChangeBusinessType = async (state:any, val:number) => {
  state.businessType = val
  state.currentPage = 1
}

// 表格单个切换 开关
export const collectHandleSwitch = async (state:any, val:any) => {
  const params = {
    channelId: state.channelId,
    businessType: state.businessType,
    ...val
  }
  const res = await commonHandleSwitch(params) as HttpResponse
  if (res.code == 0) {
    collectGetData(state)
  }
}

// 批量操作api 批量开关 批量调整预算 批量删除
// 批量开关
export const collectBatchHandleSwitch = async (state:any, val:any) => {
  const params = {
    channelId: state.channelId,
    businessType: state.businessType,
    handleType: val.handleType,
    ids: getKeyArray('id', state.multipleSelection)
  }
  const res = await commonBatchHandleSwitch(params) as HttpResponse
  if (res.code == 0) {
    ElMessage({
      type: 'success',
      message: '批量开关成功'
    })
    collectGetData(state)
  }
}

// 批量调整预算
export const collectBatchHandleBudget = async (state:any, val:any) => {
  const params = {
    channelId: state.channelId,
    businessType: state.businessType,
    handleType: val.handleType,
    ids: getKeyArray('id', state.multipleSelection),
    budget: val.budget
  }
  const res = await commonBatchHandleBudget(params)as HttpResponse
  if (res.code == 0) {
    ElMessage({
      type: 'success',
      message: '批量调整预算'
    })
    collectGetData(state)
  }
}
// 批量删除
export const collectBatchHandleDel = async (state:any) => {
  const params = {
    channelId: state.channelId,
    businessType: state.businessType,
    ids: getKeyArray('id', state.multipleSelection)
  }
  const res = await commonBatchHandleDel(params) as HttpResponse
  if (res.code == 0) {
    ElMessage({
      type: 'success',
      message: '批量删除成功'
    })
    collectGetData(state)
  }
}

// 搜索 条件清空(广告列表部分)
export const collectResetSearchFn = async (state:any) => {
  // 搜索条件
  state.selectval = ''
  state.input = ''
  state.selectvalad = ''
  state.runtime = []
  state.onlinetime = []
  state.selstatus = ''
  state.spendVal1 = ''
  state.spendVal2 = ''
  state.budget1 = ''
  state.budget2 = ''
  state.ROASval1 = ''
  state.ROASval2 = ''
  state.ACOSval1 = ''
  state.ACOSval2 = ''
  state.selectad = ''
}

// 广告任务
// -------------------------------------------------------------------------------------------------------------------

// item状态
export const collectTaskFormatStatus = (status:number) => {
  let statusName
  switch (status) {
    case 1:
      statusName = '发布成功'
      break
    case 2:
      statusName = '发布失败'
      break
    case 3:
      statusName = '草稿 '
      break
    case 4:
      statusName = '发布中 '
      break
  }
  return statusName
}
// 列表
export const collectGetTaskDtate = async (state:any) => {
//
  const params = {
    channelId: state.channelId,
    current: state.currentPage,
    size: state.pageSize,
    taskName: state.input,
    createUser: state.selectMan,
    accountId: state.selectAdAcount,
    // createUserName: state.selectMan,
    taskStatus: state.selectAdState,
    releaseBeginTime: state.opentime ? state.opentime[0] : '',
    releaseEndTime: state.opentime ? state.opentime[1] : '',
    statusUpdateBeginTime: state.statetime ? state.statetime[0] : '',
    statusUpdateEndTime: state.statetime ? state.statetime[1] : ''
  }
  const res = await commonAdvertisementTaskList(params) as HttpResponse
  console.log('res: ', res)
  if (res.code == 0) {
    state.tableData = res.data.records
    state.currentPage = res.data.pageNum
    state.pageSize = res.data.size
    state.total = res.data.total
  }
}

// 搜索重置
export const collectTaskResetSearchFn = async (state:any) => {
  state.input = ''
  state.selectAdAcount = ''
  state.selectMan = ''
  state.selectAdState = ''
  state.opentime = []
  state.statetime = []
}

// 删除table某一项
export const collectTaskRemove = async (id:string) => {
  const params = {
    id
  }
  const res = await commonAdvertisementTaskDelete(params) as HttpResponse
  if (res.code == 0) {
    ElMessage({
      type: 'success',
      message: '删除成功!'
    })
    // collectGetTaskDtate(state)
  }
}

// Amazon 广告根据Asin sku 产品名称查询商品
export const collectAzSdCommodity = async (state:any, num?:number) => {
  // 无搜索内容，不翻页
  if (!state.commodityInp) return
  let temp = {}
  if (state.commodity == 'asins') {
    temp = {
      keyword: state.commodityInp
    }
  }
  if (state.commodity == 'sku') {
    temp = {
      sku: state.commodityInp
    }
  }
  if (state.commodity == 'searchStr') {
    temp = {
      searchStr: state.commodityInp
    }
  }
  // 页码数 上一页或下一页
  if (num == 1) {
    if (state.dyCurrent == 1) return
    state.dyCurrent--
  } else if (num == 2) {
    state.dyCurrent++
  }

  const params = {
    ...temp,
    storeId: state.storeId,
    profileId: state.profileId,
    // shopAccount: state.selstoreItem.shopAccount,
    pageIndex: state.dyCurrent
  }
  // const res = await azSdCommodity(params) as HttpResponse
  const res = await azSelfProducts(params) as HttpResponse
  console.log('res: ', res)
  if (res.code == 0) {
    state.commoditySearchList = res.data.productMetadataList
  }
}

// Amazon 搜索受众
export const collectAzAudienceList = async (state:any, num?:number) => {
  // 无搜索内容，不翻页
  if (!state.audienceInp) return

  // 页码数 上一页或下一页
  if (num == 1) {
    if (state.audiencedyCurrent == 1) return
    state.audiencedyCurrent--
  } else if (num == 2) {
    state.audiencedyCurrent++
  }
  const params = {
    shopAccount: state.selstoreItem.shopAccount,
    filterType: state.selAudience,
    filterValue: state.audienceInp,
    pageIndex: state.audiencedyCurrent
  }
  const res = await azAudienceList(params) as HttpResponse
  console.log('res: ', res)
  if (res.code == 0) {
    state.searchAudienceList = res.data.audiences
  }
}

// Amazon 基础信息配置 * 店铺名称
export const collectAzStoreSelecList = async (state:any) => {
  // const params = {
  //   channelId: state.channelId
  // }
  // const res = (await commonStoreSelect(params)) as HttpResponse
  const res = await commonStoreSelect() as HttpResponse
  // console.log('res: ', res)
  if (res.code == 0) {
    state.storeOptions = res.data
  }
}
