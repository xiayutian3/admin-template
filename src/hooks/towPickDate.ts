import { ref } from 'vue'
import {
  getWeekStartDate,
  getWeekEndDate,
  getLastWeekStartDate,
  getLastWeekEndDate,
  getMonthStartDate,
  getMonthEndDate,
  getLastMonthStartDate,
  getLastMonthEndDate,
  formatDate
} from '@/utils/dates'
/**
 * 日期： 获取昨天、今天、上周、本周、前7天、前30天、本月、上个月
*/
function towPickDate () {
  const datePick = ref([
    formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)),
    formatDate(new Date(new Date().getTime() - 3600 * 1000 * 24 * 1))
  ])
  const datePick2 = ref([])

  const shortcutOptions = ref([{
    text: '昨天',
    value: () => {
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
      return [start, start]
    }
  }, {
    text: '今天',
    value: () => {
      const end = new Date()
      return [end, end]
    }
  }, {
    text: '上周',
    value: () => {
      return [getLastWeekStartDate(), getLastWeekEndDate()]
    }
  }, {
    text: '本周',
    value: () => {
      return [getWeekStartDate(), getWeekEndDate()]
    }
  }, {
    text: '前7天',
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  }, {
    text: '前30天',
    value: () => {
      const end = new Date()
      const start = new Date()
      end.setTime(end.getTime() - 3600 * 1000 * 24 * 1)
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  }, {
    text: '本月',
    value: () => {
      return [getMonthStartDate(), getMonthEndDate()]
    }
  }, {
    text: '上一个月',
    value: () => {
      return [getLastMonthStartDate(), getLastMonthEndDate()]
    }
  }])

  return { datePick, datePick2, shortcutOptions }
}

export default towPickDate
