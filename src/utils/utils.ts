import router from '@/router'
import store from '@/store'
import { clearLocalStorage } from '@/utils/localStorage'

// 获取url上的请求参数
export const getQueryString = (name:string) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return decodeURIComponent(r[2])
  }
  return null
}

// 判断空对象
export const isEmptyObject = (obj:any):boolean => {
  const arr = Object.keys(obj)
  return arr.length === 0
}

// 过滤对象字段为空的字段
export const filterObjEmptyField = (obj:any) => {
  if (typeof obj != 'object') { return false }
  const arrKeys = Object.keys(obj)
  if (arrKeys.length === 0) return
  arrKeys.forEach(key => {
    if (typeof obj[key] != 'number' && !obj[key]) {
      delete obj[key]
    }
  })
  return obj
}

// // 数组里的对象之间的字段映射  字段的长度的值是相等的 keys == tokeys，keys是originArr中的每个item的key的集合

export const mapArrObject = (originArr:any[], keys:string[], tokeys:string[]) => {
  const res:any[] = []
  originArr.forEach(item => {
    const resObj: typeof item = {}
    keys.forEach((key, index) => {
      // console.log(item, key, item[key])
      const property = tokeys[index]
      if (property) {
        resObj[property] = item[key]
      }
    })
    res.push(resObj)
  })
  return res
}
// 循环生成假数据 total: 默认20条

export const cycleMockData = (list:any[], total = 20) => {
  if (list.length === 0) {
    return
  }
  const res: any[] = []
  for (let i = 0; i < total; i++) {
    res.push(...list)
  }
  return res
}

/**
 *
 * @param arr Array
 * @returns newArr  Array
 * role 角色权限授权需要使用到
 */
export const format = (arr: any[], newIdsArr: any[]) => {
  if (arr.length === 0) return []
  const newArr: any[] = [] // 改变后的数组
  // const newIdsArr: any[] = [] // 除功能外的菜单ids

  arr.forEach(item => {
    // newIdsArr.push(item.id)
    if (item.isShow == 1) {
      newIdsArr.push(item.id)
    }

    if (!item.list) return
    if (item.list.length > 0 && item.isShow == 1) {
      format(item.list, newIdsArr)
    }

    if (item.frontRoute && item.isShow == 1) { // 页面
      const temp = item.list
      item.auth = temp
      item.list = null
      // return
    }

    newArr.push(item)
  })
  // console.log('除功能newIdsArr', newIdsArr)
  return {
    newIdsArr,
    newArr
  }
}

/**
 * 推出登录
 */
export const handleloginOut = () => {
  store.dispatch('user/setloginuserinfo', {})
  clearLocalStorage()
  router.push('/login')
}

/**
 *
 * @param key  字段
 * @param Array 原数组
 * @returns 返回某个字段的一维数组
 */
export const getKeyArray = (key:string, array:any[]) => {
  if (!array || array.length === 0) return []
  return array.map((item) => {
    return item[key]
  })
}

// 以逗号分割字符串
export const splitStrToArr = (sign:any, str:string) => {
  if (!str) return []
  const res = str.split(sign)
  return res
}
// 以逗号分割字符串,再已“ - ”分割时间,返回二维数组
export const splitStrTimeToArr = (sign:any, str:string) => {
  if (!str) return []
  let res = str.split(sign)
  res = res.map((item:any) => {
    item = item.split('-')
    return item
  })
  return res
}

/**
 *
 * @param keyArr 对象中的key数组
 * @param state 对象
 * @returns flag 是否可以通过
 */
// 判断各个步骤要填写的关键字是否已填,没填返回true
export const validateKeyValFn = (keyArr:any[], state:any) => {
  let flag = false
  keyArr.forEach(key => {
    if (state[key] && Array.isArray(state[key])) {
      if (state[key].length == 0) {
        flag = true
        return flag
      }
    } else {
      if (typeof state[key] == 'number') {

      } else {
        if (!state[key]) {
          flag = true
          return flag
        }
      }
    }
  })
  return flag
}

/**
 * 目录全路径转换 树状结构
 */
export const getYyTreeDTO = (array: any[]) => {
  const treeDTO: any[] = []
  array.map((item) => {
    const key = item // key is the full path
    const nodeArray = key.catalog.split('/') // split the full path with '/'
    // 递归
    let children = treeDTO
    // 构建根节点
    if (children.length == 0) {
      const root: any = {
        label: nodeArray[0],
        ...key
      }
      if (nodeArray.length > 1) {
        root.children = []
      }
      children.push(root)
    } else {
    // 循环构建子节点
      for (const i in nodeArray) {
        const node: any = {
          label: nodeArray[i],
          ...key
        }

        if (i != nodeArray.length) {
          node.children = []
        }

        if (children.length == 0) {
          children.push(node)
        }

        let isExist = false

        for (const j in children) {
          if (children[j].label == node.label) {
            if (i as any != nodeArray.length - 1 && !children[j].children) {
              children[j].children = []
            }
            children = (i as any == nodeArray.length - 1 ? children : children[j].children)

            isExist = true
            break
          }
        }

        if (!isExist) {
          children.push(node)
          if ((i as any) != nodeArray.length - 1 && !children[children.length - 1].children) {
            children[children.length - 1].children = []
          }
          children = ((i as any) == nodeArray.length - 1 ? children : children[children.length - 1].children)
        }
      }
    }
  })
  // console.log('树形结构--', treeDTO)
  return treeDTO
}

/**
 * @param arr 数组，每一项都是对象
 * @param field 对象中的字段
 * @returns  数组
 */
// 数组唯一（去重）
export const uniqueArray = (arr:any[], field:string) => {
  if (arr.length == 0 || !field) return
  const newJson = []
  for (const item1 of arr) { // 循环json数组对象的内容
    let flag = true // 建立标记，判断数据是否重复，true为不重复
    for (const item2 of newJson) { // 循环新数组的内容
      if (item1[field] == item2[field]) { // 让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
        flag = false
      }
    }
    if (flag) { // 判断是否重复
      newJson.push(item1) // 不重复的放入新数组。  新数组的内容会继续进行上边的循环。
    }
  }
  return newJson
}

/**
 *
 * @param arr 要扩展的数字对象
 * @param key 扩展的字段名
 * @param val 扩展的字段值
 * @returns 数组
 */
// 往数组中对象添加某一字段，并设置初始值
export const addFieldtoObjectArr = (arr: any[], key: string, val:any) => {
  if (arr.length === 0) return []
  return arr.map(item => {
    item[key] = val
  })
}

/**
 * 页面回到顶部
 */
export const backTop = () => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}
