/**
 * 工具中心相关Api
*/
import request from '@/api/request'
// import qs from 'qs'
const baseUrl = '/material' //
const serverUrl = {
  // 文件目录
  materialCatalog_create: baseUrl + '/materialCatalog/create',
  materialCatalog_del: baseUrl + '/materialCatalog/del',
  materialCatalog_list: baseUrl + '/materialCatalog/list',
  materialCatalog_move: baseUrl + '/materialCatalog/move', //  暂时未用到
  // 文件资源
  material_upload: baseUrl + '/materialFile/upload',
  material_del: baseUrl + '/materialFile/del',
  material_list: baseUrl + '/materialFile/search',
  material_download: baseUrl + '/materialFile/get',
  material_movePlace: baseUrl + '/materialFile/batchMove'
}
export const materialCatalogList = () => {
  return request.get(serverUrl.materialCatalog_list)
}
export const materialCatalogCreate = (params:any) => {
  return request.post(serverUrl.materialCatalog_create, params)
}
export const materialCatalogDel = (params:any) => {
  return request.post(serverUrl.materialCatalog_del, params)
}
export const materialList = (params:any) => {
  return request.post(serverUrl.material_list, params)
}
export const materialDel = (params:any) => {
  return request.post(serverUrl.material_del, params)
}
export const materialUpload = (params:any) => {
  return request.post(serverUrl.material_upload, params)
}
export const materialDownload = async (params: any) => {
  const res:any = request.get(serverUrl.material_download, params, { responseType: 'blob' })
  console.log('materialDownload，下载--', res)
  const content = res
  const blob = new Blob([content])
  const fileName = 'aa.jpg' // 后端必须返回 文件名.类型
  if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}
export const materialMovePlace = (params:any) => {
  return request.post(serverUrl.material_movePlace, params)
}
