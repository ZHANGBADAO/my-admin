import dayjs from 'dayjs'
import type { ManipulateType } from 'dayjs'

export function beforeDay(day: number, format = 'YYYY-MM-DD'): string {
  return dayjs().subtract(day, 'day').format(format)
}

export function beforeMonth(month: number, format = 'YYYY-MM-DD'): string {
  return dayjs().subtract(month, 'month').format(format)
}

export function beforeYear(year: number, format = 'YYYY-MM-DD'): string {
  return dayjs().subtract(year, 'year').format(format)
}

export function afterDay(day: number, format = 'YYYY-MM-DD'): string {
  return dayjs().add(day, 'day').format(format)
}

export function afterMonth(month: number, format = 'YYYY-MM-DD'): string {
  return dayjs().add(month, 'month').format(format)
}

export function afterYear(year: number, format = 'YYYY-MM-DD'): string {
  return dayjs().add(year, 'year').format(format)
}

// 判断选择的日期是否在当前日期的前N个月之外
export function isBeforeOutMonth(
  date: Date,
  count = 2,
  unit: ManipulateType = 'month',
): boolean {
  const beforeDate = dayjs(new Date()).subtract(count, unit).toDate().getTime()
  const now = new Date().getTime()
  return date.getTime() < beforeDate || date.getTime() > now
}

export function isBeforeNow(date: Date): boolean {
  const beforeDate = dayjs(new Date()).subtract(1, 'day').toDate().getTime()
  return date.getTime() <= beforeDate
}

export function now(format = 'YYYY-MM-DD'): string {
  return dayjs(new Date()).format(format)
}

export function format(date: string | Date, format: string): string {
  return dayjs(date).format(format)
}

export function currentEndMonth(format = 'YYYY-MM-DD'): string {
  return dayjs().set('date', dayjs(new Date()).daysInMonth()).format(format)
}

// 根据时间范围计算出两个日期之间包含的日期数组
export function covertDateRange(range: Array<string>): Array<string> {
  if (!range.length || range.length < 2) return []
  const item: Array<string> = []
  const days = dayjs(range[1]).diff(range[0], 'days')
  for (let i = 0; i <= days; i++) {
    if (i === 0) {
      item.push(dayjs(range[0]).format('YYYY-MM-DD'))
      continue
    }
    item.push(dayjs(range[0]).add(i, 'days').format('YYYY-MM-DD'))
  }
  return item
}
// 根据时间范围计算出两个日期之间包含的日期数组(并且过滤掉不是指定周几的日期)
export function covertDateRangeByWeeks(
  range: Array<string>,
  weeks: Array<number>,
): Array<string> {
  const dateArray = covertDateRange(range)
  if (!dateArray.length) return dateArray
  let item: Array<string> = []
  item = dateArray.filter((d) => {
    const w = dayjs(d).day()
    return weeks.includes(w)
  })
  return item
}

// 根据时间范围计算出两个日期之间包含的日期数组(并且过滤掉不是指定某日的日期)
export function covertDateRangeByDay(
  range: Array<string>,
  days: Array<number>,
): Array<string> {
  const dateArray = covertDateRange(range)
  if (!dateArray.length) return dateArray
  let item: Array<string> = []
  item = dateArray.filter((d) => {
    const w = dayjs(d).date()
    return days.includes(w)
  })
  return item
}

export const shortcuts: Common.TimeShortcuts[] = [
  {
    text: '近一周',
    value: () => {
      return [dayjs(beforeDay(7)).toDate(), dayjs(now()).toDate()]
    },
  },
  {
    text: '近一个月',
    value: () => {
      return [dayjs(beforeMonth(1)).toDate(), dayjs(now()).toDate()]
    },
  },
  {
    text: '近三个月',
    value: () => {
      return [dayjs(beforeMonth(3)).toDate(), dayjs(now()).toDate()]
    },
  },
]
