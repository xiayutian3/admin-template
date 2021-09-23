import request from '@/api/request'
import qs from 'qs'

const serverUrl = {
  // 注册相关
  register: '/rbac/merchant/register/',
  existsemail: '/rbac/merchant/register/existsemail',
  existsusername: '/rbac/merchant/register/existsusername',
  resetpassword: '/rbac/merchant/register/resetpassword',
  sendemailcode: '/rbac/merchant/register/sendemailcode',
  // 登录控制器
  login: '/rbac/merchant/login/',
  // 激活
  receiveInvite: '/rbac/merchant/user/receive/invite'
}
export const register = (params:any) => {
  return request.post(serverUrl.register, params)
}
export const getExistsemail = (params:any) => {
  // qs.stringify(params)
  return request.get(serverUrl.existsemail + '?' + qs.stringify(params))
}
export const getExistsusername = (params:any) => {
  return request.get(serverUrl.existsusername + '?' + params)
}
export const resetpassword = (params:any) => {
  return request.post(serverUrl.resetpassword, params)
}
export const getSendemailcode = (params:any) => {
  return request.get(serverUrl.sendemailcode + '?' + qs.stringify(params))
}

export const login = (params:any) => {
  return request.post(serverUrl.login, params)
}
export const receiveInvite = (params:any) => {
  return request.post(serverUrl.receiveInvite, params)
}

// -------------------------注解----------------------------

// import axios from '@/api/request'
// import { HttpResponse } from '@/interface/interface'

// console.log('axios: ', axios)
// axios.get('/api/getdata').then((res: HttpResponse) => {
//   console.log('res: ', res)
// })
// const res = await axios.get('/getdata')
// console.log('res: ', res)
