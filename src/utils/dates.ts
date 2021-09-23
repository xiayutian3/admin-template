/**
 * 获取本周、本季度、本月、上月的开始日期、结束日期
 */
const now: Date = new Date() // 当前日期
const nowDayOfWeek = now.getDay() // 今天本周的第几天
const nowDay = now.getDate() // 当前日
const nowMonth = now.getMonth() // 当前月
const nowYear = now.getFullYear() // 当前年
const lastMonthDate = new Date() // 上月日期
lastMonthDate.setDate(1)
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1)
const lastYear = lastMonthDate.getFullYear()
const lastMonth = lastMonthDate.getMonth()
// 格式化日期：yyyy-MM-dd
export const formatDate = function (date:any) {
  const myyear = date.getFullYear()
  let mymonth = date.getMonth() + 1
  let myweekday = date.getDate()
  if (mymonth < 10) {
    mymonth = '0' + mymonth
  }
  if (myweekday < 10) {
    myweekday = '0' + myweekday
  }
  return myyear + '-' + mymonth + '-' + myweekday
}
// 获得某月的天数
function getMonthDays (myMonth: any) {
  const monthStartDate = new Date(nowYear, myMonth, 1) as any
  const monthEndDate = new Date(nowYear, myMonth + 1, 1) as any
  const days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
  return days
}
// 获得本季度的开始月份
function getQuarterStartMonth () {
  let quarterStartMonth = 0
  if (nowMonth < 3) {
    quarterStartMonth = 0
  }
  if (nowMonth > 2 && nowMonth < 6) {
    quarterStartMonth = 3
  }
  if (nowMonth > 5 && nowMonth < 9) {
    quarterStartMonth = 6
  }
  if (nowMonth > 8) {
    quarterStartMonth = 9
  }
  return quarterStartMonth
}
// 获得本周的开始日期
export const getWeekStartDate = function () {
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)
  return formatDate(weekStartDate)
}
// 获得本周的结束日期
export const getWeekEndDate = function () {
  const weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek))
  return formatDate(weekEndDate)
}
// 获得上周的开始日期
export const getLastWeekStartDate = function () {
  const weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6)
  return formatDate(weekStartDate)
}
// 获得上周的结束日期
export const getLastWeekEndDate = function () {
  const weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek)
  return formatDate(weekEndDate)
}
// 获得本月的开始日期
export const getMonthStartDate = function () {
  const monthStartDate = new Date(nowYear, nowMonth, 1)
  return formatDate(monthStartDate)
}
// 获得本月的结束日期
export const getMonthEndDate = function () {
  const monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth))
  return formatDate(monthEndDate)
}
// 获得上月开始时间
export const getLastMonthStartDate = function () {
  const lastMonthStartDate = new Date(nowYear, lastMonth, 1)
  return formatDate(lastMonthStartDate)
}
// 获得上月结束时间
export const getLastMonthEndDate = function () {
  const lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth))
  return formatDate(lastMonthEndDate)
}
// 获得本季度的开始日期
export const getQuarterStartDate = function () {
  const quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1)
  return formatDate(quarterStartDate)
}
// 获得本季度的结束日期
export const getQuarterEndDate = function () {
  const quarterEndMonth = getQuarterStartMonth() + 2
  const quarterStartDate = new Date(
    nowYear,
    quarterEndMonth,
    getMonthDays(quarterEndMonth)
  )
  return formatDate(quarterStartDate)
}
