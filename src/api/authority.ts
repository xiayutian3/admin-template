import request from '@/api/request'
// import qs from 'qs'

const serverUrl = {
  // 头部通用下拉列表
  dropList: '/rbac/merchant/common/drop-list',
  // 用户管理
  allList: '/rbac/merchant/user/search',
  search: '/rbac/merchant/user/search',
  userDel: '/rbac/merchant/user/del',
  userInviteDel: '/rbac/merchant/user/invite/del',
  userInvite: '/rbac/merchant/user/invite',
  againInviteUser: '/rbac/merchant/user/invite/email',
  // userEdit: '/rbac/merchant/user/edit',

  // 角色管理
  roleSearch: '/rbac/merchant/role/search',
  roleList: '/rbac/merchant/role/list',
  roleEdit: '/rbac/merchant/role/edit',
  roleAdd: '/rbac/merchant/role/add',
  roleDel: '/rbac/merchant/role/del',
  roleMenu: '/rbac/merchant/menu/search', // 所有的页面权限
  authSearch: '/rbac/merchant/role/auth/search', // 查询用户已有的功能权限
  authSave: '/rbac/merchant/role/auth/save',
  roleAuthSearch: '/rbac/merchant/role/auth/search',
  dataAuthor_list: '/yy-advertisement/advertisementAccount/channel/all', // 数据权限
  // 用户组管理
  groupRoleSearch: '/rbac/merchant/group/role/search',
  useAllList: '/rbac/merchant/user/all-list',
  userList: '/rbac/merchant/user/group/user-list',
  groupRoleSave: '/rbac/merchant/group/role/save',
  groupRoleEdit: '/rbac/merchant/group/role/edit',
  groupRoleDel: '/rbac/merchant/group/role/del',
  groupUserSave: '/rbac/merchant/user/group/save',
  groupUserDel: '/rbac/merchant/user/group/del',
  getUserGroupNum: '/rbac/merchant/group/bind-user/count'

}

// export const getSendemailcode = (params:any) => {
//   return request.get(serverUrl.allList + '?' + qs.stringify(params))
// }
// export const register = (params:any) => {
//   return request.post(serverUrl.allList, params)
// }
export const dropList = (params:any) => {
  return request.post(serverUrl.dropList, params)
}
export const allList = (params?:any) => {
  return request.post(serverUrl.allList, params)
}
export const userDel = (params:any) => {
  return request.post(serverUrl.userDel, params)
}
export const againInviteUser = (params:any) => {
  return request.post(serverUrl.againInviteUser, params)
}
// export const userEdit = (params:any) => {
//   return request.post(serverUrl.userEdit, params)
// }

export const roleSearch = (params:any) => {
  return request.post(serverUrl.roleSearch, params)
}
export const roleList = (params:any) => {
  return request.post(serverUrl.roleList, params)
}
export const roleEdit = (params:any) => {
  return request.post(serverUrl.roleEdit, params)
}
export const roleAdd = (params:any) => {
  return request.post(serverUrl.roleAdd, params)
}
export const roleDel = (params:any) => {
  return request.post(serverUrl.roleDel, params)
}
export const userInviteDel = (params:any) => {
  return request.post(serverUrl.userInviteDel, params)
}
export const roleMenu = (params:any) => {
  return request.post(serverUrl.roleMenu, params)
}
export const userInvite = (params:any) => {
  return request.post(serverUrl.userInvite, params)
}
export const authSave = (params:any) => {
  return request.post(serverUrl.authSave, params)
}
export const roleAuthSearch = (params:any) => {
  return request.post(serverUrl.roleAuthSearch, params)
}
export const dataAuthorList = (params:any) => {
  return request.get(serverUrl.dataAuthor_list, params)
}

export const search = (params:any) => {
  return request.post(serverUrl.search, params)
}
export const groupRoleSearch = (params:any) => {
  return request.post(serverUrl.groupRoleSearch, params)
}
export const useAllList = (params:any) => {
  return request.post(serverUrl.useAllList, params)
}
export const userList = (params:any) => {
  return request.post(serverUrl.userList, params)
}
export const groupRoleSave = (params:any) => {
  return request.post(serverUrl.groupRoleSave, params)
}
export const groupRoleEdit = (params:any) => {
  return request.post(serverUrl.groupRoleEdit, params)
}
export const groupRoleDel = (params:any) => {
  return request.post(serverUrl.groupRoleDel, params)
}
export const groupUserSave = (params:any) => {
  return request.post(serverUrl.groupUserSave, params)
}
export const groupUserDel = (params:any) => {
  return request.post(serverUrl.groupUserDel, params)
}
export const getUserGroupNum = (params:any) => {
  return request.post(serverUrl.getUserGroupNum, params)
}
