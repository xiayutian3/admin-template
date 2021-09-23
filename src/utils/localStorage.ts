// localStorage存储

import Storage from 'web-storage-cache'
const localStorage = new Storage()

export function setLocalStorage (key:string, value:any) {
  return localStorage.set(key, value)
}
export function getLocalStorage (key:string) {
  return localStorage.get(key)
}
export function removeLocalStorage (key:string) {
  return localStorage.delete(key)
}
export function clearLocalStorage () {
  return localStorage.clear()
}

// localStorage设置存储时间
export function TimelinessSet (key:string, value:any) {
  const curTime = new Date().getTime()
  window.localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }))
}
/**
 *
 * @param {*} key
 * @param {*} exp  天数
 * @returns
 */
export function TimelinessGet (key:string, exp:number) {
  const expTime = exp * 30 * 24 * 60 * 60 * 1000
  const data:any = window.localStorage.getItem(key)
  if (!data) return
  const dataObj = JSON.parse(data)
  if (new Date().getTime() - dataObj.time > expTime) {
    console.log('已过期')
    return ''
  } else {
    console.log('未过期')
    const dataObjDatatoJson = dataObj.data
    return dataObjDatatoJson
  }
}
