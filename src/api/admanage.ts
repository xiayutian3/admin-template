// 广告管理 google facebook amazon
import request from '@/api/request'
import qs from 'qs'

export const serverUrl = {
  // 通用 广告列表
  commonAdList: '/yy-advertisement/advertisementReport/list',
  commonHandleSwitch: '/yy-advertisement/advertisementReport/handleSwitch',
  commonAccountSelect: '/yy-advertisement/advertisementAccount/accountSelect', // 查询广告列表账号下拉框接口
  commonStoreSelect: '/yy-advertisement/advertisementAccount/shopSelect', // 查询广告列表店铺账号下拉框接口
  commonPubilshUser: '/yy-advertisement/advertisementTask/user/list', // 获取广告发布人
  commonBatchHandleSwitch: '/yy-advertisement/advertisementReport/batchHandleSwitch',
  commonBatchHandleBudget: '/yy-advertisement/advertisementReport/batchHandleBudget',
  commonBatchHandleDel: '/yy-advertisement/advertisementReport/batchHandleDel',
  commonExportReportCampaign: '/yy-advertisement/advertisementReport/exportReportCampaign',
  // v1.5 2021.09版本
  // 获取亚马逊 店铺及站点、广告活动、活动下广告组
  getAmSiteAndStore: '/yy-advertisement-aws/amz-account-site/sp/querySiteAndStore',
  getAmActivity: '/yy-advertisement-aws/amzCampaignReport/getCurrentGroupForCampaign',
  getAmActiviGroup: '/yy-advertisement-aws/amzAdgroupReport/getAdGroupByCampaign',
  // 广告任务
  commonAdvertisementTaskList: '/yy-advertisement/advertisementTask/list',
  commonAdvertisementTaskDelete: '/yy-advertisement/advertisementTask/delete',
  commonAdvertisementTaskCreateUser: '/yy-advertisement/advertisementTask/xxx',

  // google steps
  // 搜索广告
  ggSearchInfo: '/yy-advertisement/google/search/info/addOrUpd',
  ggSearchCampaign: '/yy-advertisement/google/search/campaign/addOrUpd',
  ggSearchAdset: '/yy-advertisement/google/search/adset/addOrUpd',
  ggSearchAds: '/yy-advertisement/google/search/ads/addOrUpd',
  ggGeographicalPosition: '/yy-advertisement/geographicalPosition/list',
  ggLanguageCode: '/yy-advertisement/languageCode/list',
  ggAudienList: '/yy-advertisement/audienceCode/list',
  ggAudienListClassify: '/yy-advertisement/audienceCode/listClassify',
  ggSearchDetail: '/yy-advertisement/google/search/detail',
  // 购物广告
  ggShopInfo: '/yy-advertisement/google/shopping/info/addOrUpd',
  ggShopCampaign: '/yy-advertisement/google/shopping/campaign/addOrUpd',
  ggShopAdset: '/yy-advertisement/google/shopping/adset/addOrUpd',
  ggShopMerchantCenter: '/yy-advertisement/google/merchantCenter/list',
  ggShopCountryCode: '/yy-advertisement/countryCode/list',
  ggShopDetail: '/yy-advertisement/google/shopping/detail',

  // facebook
  fbRegions: '/yy-advertisement/facebook/basicInfo/countryOrRegions',
  fbInfoAddOrUpd: '/yy-advertisement/facebook/task/info/addOrUpd',
  fbGetAdCampaign: '/yy-advertisement/facebook/task/getAdvertisementCampaign',
  fbCampaignAddOrUpd: '/yy-advertisement/facebook/task/campaign/addOrUpd',
  fbAdset: '/yy-advertisement/facebook/task/adset/addOrUpd',
  fbgetAdAdset: '/yy-advertisement/facebook/task/getAdvertisementAdset',
  fbGetIncludeAudience: '/yy-advertisement/facebook/task/getIncludeAudience',
  fbinterestOrBehaviors: '/yy-advertisement/facebook/basicInfo/interestOrBehaviors',
  fbadsAddOrUpd: '/yy-advertisement/facebook/task/ads/addOrUpd',
  fbtaskDetail: '/yy-advertisement/facebook/task/detail',
  fbGetPageList: '/yy-advertisement/facebookAccount/getPageList',
  fbGetPixelList: '/yy-advertisement/facebookAccount/getPixelList',
  fbGetInstagramList: '/yy-advertisement/facebookAccount/getInstagramList',
  fbGetCampaignDetail: '/yy-advertisement/facebook/task/getCampaignDetail',
  fbGetAdsetDetail: '/yy-advertisement/facebook/task/getAdsetDetail',

  // **********************************************************************
  // amazon V1.1 2021.9版本
  // 列表数据配置项
  azGetFieldsByCode: '/yy-advertisement-aws/userCustomField/getFieldsByCode', // 获取用户的表格自定义列
  azSaveUserField: '/yy-advertisement-aws/userCustomField/saveUserField', // 保存用户的表格自定义列

  // sp广告活动列表
  azAdActive: '/yy-advertisement-aws/amzCampaignReport/list',
  azAdActiveExport: '/yy-advertisement-aws/amzCampaignReport/exportReportCampaign',
  azbatchMoveToCompose: '/yy-advertisement-aws/amzCampaignReport/batchMoveToCompose',
  azbatchHandleBudget: '/yy-advertisement-aws/amzCampaignReport/batchHandleBudget',
  azbatchHandleSwitch: '/yy-advertisement-aws/amzCampaignReport/batchHandleSwitch',
  azadactiveedit: '/yy-advertisement-aws/amzCampaignReport/edit',

  // sp广告组列表
  azGroupList: '/yy-advertisement-aws/amzAdgroupReport/list',
  azReportAdgroup: '/yy-advertisement-aws/amzAdgroupReport/exportReportAdgroup',
  azbatchHandleBid: '/yy-advertisement-aws/amzAdgroupReport/batchHandleBid',
  azAdgroupBatchSwitch: '/yy-advertisement-aws/amzAdgroupReport/batchHandleSwitch',
  azamzAdgroupedit: '/yy-advertisement-aws/amzAdgroupReport/edit',

  // sp广告新增
  azCampaign: '/yy-advertisement-aws/amz/sp/campaign',
  azAdgroupTarget: '/yy-advertisement-aws/amz/sp/adgroupTarget',
  azProducts: '/yy-advertisement-aws/amz/sp/products',
  azSelfProducts: '/yy-advertisement-aws/amz/sp/selfProducts',

  // sp-投放-关键字
  sp_put_keyWrod_list: '/yy-advertisement-aws/amz-keyword-report/list',
  sp_put_keyWrod_export: '/yy-advertisement-aws/amz-keyword-report/export',
  sp_put_keyWrod_insert: '/yy-advertisement-aws/amz-keyword-report/insert',
  sp_put_keyWrod_updateState: '/yy-advertisement-aws/amz-keyword-report/updateState',
  sp_put_keyWrod_updateBid: '/yy-advertisement-aws/amz-keyword-report/updateBid',

  // sp-广告-列表
  sp_ad_list: '/yy-advertisement-aws/amz-ad-report/list',
  sp_ad_list_export: '/yy-advertisement-aws/amz-ad-report/export',
  sp_ad_updateState: '/yy-advertisement-aws/amz-ad-report/updateState',
  //  ************************************************************************************

  // 广告类型(adType) 1 Facebook广告 2 Google 搜索广告 3 购物广告 4 Amazon sp广告 5 sb广告 6 sd广告 7广告组合
  azInfo: '/yy-advertisement/amazon/info/addOrUpd',
  azSdCommodity: '/yy-advertisement/amazon/commodity/list', // Asin sku 产品名称查询商品
  azAudienceList: '/yy-advertisement/amazon/audience/list',

  // sp广告
  azSpCampaign: '/yy-advertisement/amazon/sp/campaign/addOrUpd',
  azSpAdset: '/yy-advertisement/amazon/sp/adset/addOrUpd',
  azSpDetail: '/yy-advertisement/amazon/sp/detail',

  // sb广告
  azSbCampaign: '/yy-advertisement/amazon/sb/campaign/addOrUpd',
  azSbFormat: '/yy-advertisement/amazon/sb/format/addOrUpd',
  azSbDetail: '/yy-advertisement/amazon/sb/detail',

  // sd广告
  azSdCampaign: '/yy-advertisement/amazon/sd/campaign/addOrUpd',
  azSdAdset: '/yy-advertisement/amazon/sd/adset/addOrUpd',
  azSdDetail: '/yy-advertisement/amazon/sd/detail',

  // 广告组合
  azCpCompose: '/yy-advertisement/amazon/cp/compose/addOrUpd',
  azCpDetail: '/yy-advertisement/amazon/cp/detail',

  // 广告账户授权
  adCcount_author: '/yy-advertisement/advertisementAuthorization/sendRedirect',
  adCcount_amazonSales_author: '/yy-advertisement-aws/spapi/auth/getAuthorizationUrl',
  amazonalesAuthor_callback: '/yy-advertisement-aws/spapi/auth/saveAuthInfo',
  adCcount_list: '/yy-advertisement/advertisementAccount/list', // 2.0版本 只适合google 和 Facebook用
  adCcount_amazon_list: '/yy-advertisement/adAmzAccount/list', // 2.0版本 amazon版
  adCcount_del: '/yy-advertisement/advertisementAccount/batchHandleDel', // 2.0版本 只适合google 和 Facebook用
  adCcount_amazon_del: '/yy-advertisement/adAmzAccount/batchHandleDel' // 2.0版本 只适合google 和 Facebook用

}
/**
 * 统一导出 方法
 * @http: 请求地址
 * @param: 请求参数
 * @exportName： 导出名字
 */
const EXPORTEXCEL = async (http:string, params:any, exportName: string) => {
  const res:any = await request.post(http, params, { responseType: 'blob' })
  const link = document.createElement('a')
  const blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=utf-8' })
  link.style.display = 'none'
  link.download = exportName + '.xlsx'
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
// 共同 广告列表
export const commonAdList = (params:any) => {
  return request.post(`${serverUrl.commonAdList}/${params.channelId}`, params)
}
export const commonHandleSwitch = (params:any) => {
  return request.post(`${serverUrl.commonHandleSwitch}/${params.channelId}`, params)
}
export const commonAccountSelect = (params:any) => {
  return request.get(serverUrl.commonAccountSelect + '?' + qs.stringify(params))
}
export const commonPubilshUser = (params:any) => {
  return request.get(serverUrl.commonPubilshUser + '?' + qs.stringify(params))
}
export const commonStoreSelect = () => {
  return request.get(serverUrl.commonStoreSelect)
}

export const commonBatchHandleSwitch = (params:any) => {
  return request.post(`${serverUrl.commonBatchHandleSwitch}/${params.channelId}`, params)
}
export const commonBatchHandleBudget = (params:any) => {
  return request.post(`${serverUrl.commonBatchHandleBudget}/${params.channelId}`, params)
}
export const commonBatchHandleDel = (params:any) => {
  return request.post(`${serverUrl.commonBatchHandleDel}/${params.channelId}`, params)
}
// 文件下载
export const commonExportReportCampaign = async (params:any) => {
  const res:any = await request.post(`${serverUrl.commonExportReportCampaign}/${params.channelId}`, params, { responseType: 'blob' })
  const link = document.createElement('a')
  const blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=utf-8' })
  link.style.display = 'none'
  link.download = '广告列表导出.xlsx'
  link.href = URL.createObjectURL(blob)
  // console.log('link.href: ', link.href)
  // link.download = res.headers['content-disposition'] // 下载后文件名
  // const name = link.download.split('=')[1]
  // link.download = name // 下载的文件名
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
export const getAmSiteAndStore = (params:any) => {
  return request.post(serverUrl.getAmSiteAndStore, params)
}
export const getAmActivity = (params:any) => {
  return request.post(serverUrl.getAmActivity, params)
}
export const getAmActiviGroup = (params:any) => {
  return request.post(serverUrl.getAmActiviGroup, params)
}
//  //广告任务
export const commonAdvertisementTaskList = (params:any) => {
  return request.post(`${serverUrl.commonAdvertisementTaskList}/${params.channelId}`, params)
}
export const commonAdvertisementTaskDelete = (params:any) => {
  return request.post(serverUrl.commonAdvertisementTaskDelete, params)
}
export const commonAdvertisementTaskCreateUser = (params:any) => {
  return request.get(serverUrl.commonAdvertisementTaskCreateUser + '?' + qs.stringify(params))
}

// google
// search
export const ggSearchInfo = (params:any) => {
  return request.post(serverUrl.ggSearchInfo, params)
}
export const ggSearchCampaign = (params:any) => {
  return request.post(serverUrl.ggSearchCampaign, params)
}
export const ggSearchAdset = (params:any) => {
  return request.post(serverUrl.ggSearchAdset, params)
}
export const ggSearchAds = (params:any) => {
  return request.post(serverUrl.ggSearchAds, params)
}
export const ggSearchDetail = (params:any) => {
  return request.get(serverUrl.ggSearchDetail + '?' + qs.stringify(params))
}
// 地理位置远程输入框
export const ggGeographicalPosition = (params:any) => {
  return request.get(serverUrl.ggGeographicalPosition + '?' + qs.stringify(params))
}
export const ggLanguageCode = (params:any) => {
  return request.get(serverUrl.ggLanguageCode + '?' + qs.stringify(params))
}
export const ggAudienList = (params:any) => {
  return request.get(serverUrl.ggAudienList + '?' + qs.stringify(params))
}
export const ggAudienListClassify = (params:any) => {
  return request.get(serverUrl.ggAudienListClassify + '?' + qs.stringify(params))
}
// 购物广告
export const ggShopInfo = (params:any) => {
  return request.post(serverUrl.ggShopInfo, params)
}
export const ggShopCampaign = (params:any) => {
  return request.post(serverUrl.ggShopCampaign, params)
}
export const ggShopAdset = (params:any) => {
  return request.post(serverUrl.ggShopAdset, params)
}
export const ggShopMerchantCenter = (params:any) => {
  return request.get(serverUrl.ggShopMerchantCenter + '?' + qs.stringify(params))
}
export const ggShopCountryCode = (params:any) => {
  return request.get(serverUrl.ggShopCountryCode + '?' + qs.stringify(params))
}
export const ggShopDetail = (params:any) => {
  return request.get(serverUrl.ggShopDetail + '?' + qs.stringify(params))
}

// facebook
export const fbRegions = (params:any) => {
  return request.get(serverUrl.fbRegions + '?' + qs.stringify(params))
}
export const fbInfoAddOrUpd = (params:any) => {
  return request.post(serverUrl.fbInfoAddOrUpd, params)
}
export const fbGetAdCampaign = (params:any) => {
  return request.get(serverUrl.fbGetAdCampaign + '?' + qs.stringify(params))
}
export const fbCampaignAddOrUpd = (params:any) => {
  return request.post(serverUrl.fbCampaignAddOrUpd, params)
}
export const fbAdset = (params:any) => {
  return request.post(serverUrl.fbAdset, params)
}
export const fbgetAdAdset = (params:any) => {
  return request.get(serverUrl.fbgetAdAdset + '?' + qs.stringify(params))
}
export const fbGetIncludeAudience = (params:any) => {
  return request.get(serverUrl.fbGetIncludeAudience + '?' + qs.stringify(params))
}
export const fbinterestOrBehaviors = (params:any) => {
  return request.get(serverUrl.fbinterestOrBehaviors + '?' + qs.stringify(params))
}
export const fbadsAddOrUpd = (params:any) => {
  return request.post(serverUrl.fbadsAddOrUpd, params)
}
export const fbtaskDetail = (params:any) => {
  return request.get(serverUrl.fbtaskDetail + '?' + qs.stringify(params))
}
export const fbGetPageList = (params:any) => {
  return request.get(serverUrl.fbGetPageList + '?' + qs.stringify(params))
}
export const fbGetPixelList = (params:any) => {
  return request.get(serverUrl.fbGetPixelList + '?' + qs.stringify(params))
}
export const fbGetInstagramList = (params:any) => {
  return request.get(serverUrl.fbGetInstagramList + '?' + qs.stringify(params))
}
export const fbGetCampaignDetail = (params:any) => {
  return request.get(serverUrl.fbGetCampaignDetail + '?' + qs.stringify(params))
}
export const fbGetAdsetDetail = (params:any) => {
  return request.get(serverUrl.fbGetAdsetDetail + '?' + qs.stringify(params))
}

// amazon
export const azInfo = (params:any) => {
  return request.post(`${serverUrl.azInfo}/${params.adType}`, params)
}
export const azAudienceList = (params:any) => {
  return request.post(serverUrl.azAudienceList, params)
}

// sp广告
export const azSpCampaign = (params:any) => {
  return request.post(serverUrl.azSpCampaign, params)
}
export const azSpAdset = (params:any) => {
  return request.post(serverUrl.azSpAdset, params)
}
export const azSpDetail = (params:any) => {
  return request.get(serverUrl.azSpDetail + '?' + qs.stringify(params))
}

//  sd广告
export const azSdCampaign = (params:any) => {
  return request.post(serverUrl.azSdCampaign, params)
}
export const azSdAdset = (params:any) => {
  return request.post(serverUrl.azSdAdset, params)
}
export const azSdCommodity = (params:any) => {
  return request.post(serverUrl.azSdCommodity, params)
}
export const azSdDetail = (params:any) => {
  return request.get(serverUrl.azSdDetail + '?' + qs.stringify(params))
}

// 广告组合
export const azCpCompose = (params:any) => {
  return request.post(serverUrl.azCpCompose, params)
}
export const azCpDetail = (params:any) => {
  return request.get(serverUrl.azCpDetail + '?' + qs.stringify(params))
}

// 广告账户授权
export const adCcountAuthor = (params:any) => {
  return request.get(serverUrl.adCcount_author + '?' + qs.stringify(params))
}
export const adCcountList = (params:any) => {
  return request.post(serverUrl.adCcount_list, params)
}
export const adCcountAmazonSalesAuthor = (params:any) => {
  return request.post(serverUrl.adCcount_amazonSales_author, params)
}
export const amazonSalesAuthorCallback = (params:any) => {
  return request.get(serverUrl.amazonalesAuthor_callback, params)
}
export const adCcountAmazonList = (params:any) => {
  return request.post(serverUrl.adCcount_amazon_list, params)
}
export const adCcountDel = (params:any) => {
  return request.post(serverUrl.adCcount_del, params)
}
export const adCcountAmazonDel = (params:any) => {
  return request.post(serverUrl.adCcount_amazon_del, params)
}

// amzn 新增
export const azGetFieldsByCode = (params:any) => {
  return request.get(serverUrl.azGetFieldsByCode + '?' + qs.stringify(params))
}
export const azSaveUserField = (params:any) => {
  return request.post(serverUrl.azSaveUserField, params)
}

// sp广告活动
export const azAdActive = (params:any) => {
  return request.post(serverUrl.azAdActive, params)
}
export const azAdActiveExport = async (params:any) => {
  // return request.post(serverUrl.azAdActiveExport, params)
  const res:any = await request.post(serverUrl.azAdActiveExport, params, { responseType: 'blob' })
  const link = document.createElement('a')
  const blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=utf-8' })
  link.style.display = 'none'
  link.download = '广告活动列表导出.xlsx'
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
export const azbatchMoveToCompose = (params:any) => {
  return request.post(serverUrl.azbatchMoveToCompose, params)
}
export const azbatchHandleBudget = (params:any) => {
  return request.post(serverUrl.azbatchHandleBudget, params)
}
export const azbatchHandleSwitch = (params:any) => {
  return request.post(serverUrl.azbatchHandleSwitch, params)
}
export const azadactiveedit = (params:any) => {
  return request.post(serverUrl.azadactiveedit, params)
}

// sp广告组列表
export const azGroupList = (params:any) => {
  return request.post(serverUrl.azGroupList, params)
}
export const azReportAdgroup = async (params:any) => {
  const res:any = await request.post(serverUrl.azReportAdgroup, params, { responseType: 'blob' })
  const link = document.createElement('a')
  const blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=utf-8' })
  link.style.display = 'none'
  link.download = '广告组列表导出.xlsx'
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
export const azbatchHandleBid = (params:any) => {
  return request.post(serverUrl.azbatchHandleBid, params)
}
export const azAdgroupBatchSwitch = (params:any) => {
  return request.post(serverUrl.azAdgroupBatchSwitch, params)
}
export const azamzAdgroupedit = (params:any) => {
  return request.post(serverUrl.azamzAdgroupedit, params)
}

// sp广告新增
export const azCampaign = (params:any) => {
  return request.post(serverUrl.azCampaign, params)
}
export const azAdgroupTarget = (params:any) => {
  return request.post(serverUrl.azAdgroupTarget, params)
}
export const azProducts = (params:any) => {
  return request.get(serverUrl.azProducts + '?' + qs.stringify(params))
}
export const azSelfProducts = (params:any) => {
  return request.get(serverUrl.azSelfProducts + '?' + qs.stringify(params))
}
export const spPutKeyWrodList = (params:any) => {
  return request.post(serverUrl.sp_put_keyWrod_list, params)
}
export const spPutKeyWrodUpdateState = (params:any) => {
  return request.post(serverUrl.sp_put_keyWrod_updateState, params)
}
export const spPutKeyWrodUpdateBid = (params:any) => {
  return request.post(serverUrl.sp_put_keyWrod_updateBid, params)
}

export const spPutKeyWrodExport = (params:any) => {
  EXPORTEXCEL(serverUrl.sp_put_keyWrod_export, params, 'Amazon广告投放关键词列表导出')
}

export const spAdList = (params:any) => {
  return request.post(serverUrl.sp_ad_list, params)
}
export const spAdUpdateState = (params:any) => {
  return request.post(serverUrl.sp_ad_updateState, params)
}
export const spAdListExport = (params:any) => {
  EXPORTEXCEL(serverUrl.sp_ad_list_export, params, 'Amazon广告明细列表导出')
}
