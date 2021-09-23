/*
 * @Description:
 * @Author: XYT
 * @Date: 2021-06-18
 * @LastEditors: XYT
 * @LastEditTime: 2021-06-18
 */

import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import { createI18n } from 'vue-i18n' // import from runtime only

// 获取本地保存的语言
// import { getLanguage } from '@/utils/cookies'

// import Keys from '@/constant/key'
// import Cookies from 'js-cookie'
// export const getSidebarStatus = () => Cookies.get(Keys.sidebarStatusKey)
// export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(Keys.sidebarStatusKey, sidebarStatus)
// export const getLanguage = () => Cookies.get(Keys.languageKey)
// export const setLanguage = (language: string) => Cookies.set(Keys.languageKey, language)

import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'

// User defined lang
import enLocale from './en'
import zhLocale from './zh-cn'

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale
  }
}

const getLocale = () => {
  // const cookieLanguage = getLanguage()
  // if (cookieLanguage) {
  //   return cookieLanguage
  // }

  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is english
  return 'en'
}
// console.log('默认语言', getLocale())
const i18n = createI18n({
  locale: getLocale(),
  messages: messages
})

// export default (app:any) => {
//   app.use(ElementPlus, {
//     i18n: i18n.global.t
//   })
//   app.use(i18n)
// }
export { i18n, ElementPlus }
