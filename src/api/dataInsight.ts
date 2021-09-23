/**
 * 数据洞察相关Api
*/
import request from '@/api/request'
// import qs from 'qs'

const serverUrl = {
  // '仪表盘'
  dashboard_data_pool: '/yy-advertisement/advertisementAnalytics',
  dashboard_data_barAndLine: '/yy-advertisement/advertisementAnalytics/getChannelReportDetails',
  dashboard_data_export: '/yy-advertisement/advertisementAnalytics/excel',
  // 获取用户渠道
  getUser_channel: '/yy-advertisement/channels'
}
export const getUserChannel = () => {
  return request.get(serverUrl.getUser_channel)
}
export const dashboarDataPool = (params:any) => {
  return request.get(serverUrl.dashboard_data_pool, params)
}
export const dashboardDataBarAndLine = (params:any) => {
  return request.get(serverUrl.dashboard_data_barAndLine, params)
}
export const dashboardDataExport = async (params:any) => {
  const res:any = await request.get(serverUrl.dashboard_data_export, params, { responseType: 'blob' })
  const link = document.createElement('a')
  const blob = new Blob([res], { type: 'application/vnd.ms-excel;charset=utf-8' })
  link.style.display = 'none'
  link.href = URL.createObjectURL(blob)
  link.download = '仪表盘数据导出.xlsx'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
