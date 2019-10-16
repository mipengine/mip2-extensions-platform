let calendar = {
  // 农历数据
  LunarCal: [
    new TagLunarCal(38, 0, 0, 38, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1), /* 1940 */
    new TagLunarCal(26, 6, 2, 44, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0),
    new TagLunarCal(45, 0, 3, 49, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0),
    new TagLunarCal(35, 0, 4, 54, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(24, 4, 5, 59, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1), /* 1944 */
    new TagLunarCal(43, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1),
    new TagLunarCal(32, 0, 1, 10, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1),
    new TagLunarCal(21, 2, 2, 15, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1),
    new TagLunarCal(40, 0, 3, 20, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1), /* 1948 */
    new TagLunarCal(28, 7, 5, 26, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(47, 0, 6, 31, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(36, 0, 0, 36, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0),
    new TagLunarCal(26, 5, 1, 41, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1), /* 1952 */
    new TagLunarCal(44, 0, 3, 47, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1),
    new TagLunarCal(33, 0, 4, 52, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0),
    new TagLunarCal(23, 3, 5, 57, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1),
    new TagLunarCal(42, 0, 6, 2, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1), /* 1956 */
    new TagLunarCal(30, 8, 1, 8, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0),
    new TagLunarCal(48, 0, 2, 13, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0),
    new TagLunarCal(38, 0, 3, 18, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(27, 6, 4, 23, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0), /* 1960 */
    new TagLunarCal(45, 0, 6, 29, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0),
    new TagLunarCal(35, 0, 0, 34, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1),
    new TagLunarCal(24, 4, 1, 39, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0),
    new TagLunarCal(43, 0, 2, 44, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0), /* 1964 */
    new TagLunarCal(32, 0, 4, 50, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1),
    new TagLunarCal(20, 3, 5, 55, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0),
    new TagLunarCal(39, 0, 6, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0),
    new TagLunarCal(29, 7, 0, 5, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1), /* 1968 */
    new TagLunarCal(47, 0, 2, 11, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(36, 0, 3, 16, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0),
    new TagLunarCal(26, 5, 4, 21, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1),
    new TagLunarCal(45, 0, 5, 26, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1), /* 1972 */
    new TagLunarCal(33, 0, 0, 32, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1),
    new TagLunarCal(22, 4, 1, 37, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1),
    new TagLunarCal(41, 0, 2, 42, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1),
    new TagLunarCal(30, 8, 3, 47, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1), /* 1976 */
    new TagLunarCal(48, 0, 5, 53, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1),
    new TagLunarCal(37, 0, 6, 58, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(27, 6, 0, 3, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0),
    new TagLunarCal(46, 0, 1, 8, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0), /* 1980 */
    new TagLunarCal(35, 0, 3, 14, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1),
    new TagLunarCal(24, 4, 4, 19, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1),
    new TagLunarCal(43, 0, 5, 24, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1),
    new TagLunarCal(32, 10, 6, 29, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1), /* 1984 */
    new TagLunarCal(50, 0, 1, 35, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0),
    new TagLunarCal(39, 0, 2, 40, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1),
    new TagLunarCal(28, 6, 3, 45, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0),
    new TagLunarCal(47, 0, 4, 50, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1), /* 1988 */
    new TagLunarCal(36, 0, 6, 56, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0),
    new TagLunarCal(26, 5, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1),
    new TagLunarCal(45, 0, 1, 6, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0),
    new TagLunarCal(34, 0, 2, 11, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0), /* 1992 */
    new TagLunarCal(22, 3, 4, 17, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0),
    new TagLunarCal(40, 0, 5, 22, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0),
    new TagLunarCal(30, 8, 6, 27, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1),
    new TagLunarCal(49, 0, 0, 32, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1), /* 1996 */
    new TagLunarCal(37, 0, 2, 38, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1),
    new TagLunarCal(27, 5, 3, 43, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1),
    new TagLunarCal(46, 0, 4, 48, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1), /* 1999 */
    new TagLunarCal(35, 0, 5, 53, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1), /* 2000 */
    new TagLunarCal(23, 4, 0, 59, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(42, 0, 1, 4, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(31, 0, 2, 9, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0),
    new TagLunarCal(21, 2, 3, 14, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1), /* 2004 */
    new TagLunarCal(39, 0, 5, 20, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(28, 7, 6, 25, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1),
    new TagLunarCal(48, 0, 0, 30, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1),
    new TagLunarCal(37, 0, 1, 35, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1), /* 2008 */
    new TagLunarCal(25, 5, 3, 41, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1),
    new TagLunarCal(44, 0, 4, 46, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1),
    new TagLunarCal(33, 0, 5, 51, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(22, 4, 6, 56, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0), /* 2012 */
    new TagLunarCal(40, 0, 1, 2, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0),
    new TagLunarCal(30, 9, 2, 7, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1),
    new TagLunarCal(49, 0, 3, 12, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1),
    new TagLunarCal(38, 0, 4, 17, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0), /* 2016 */
    new TagLunarCal(27, 6, 6, 23, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1),
    new TagLunarCal(46, 0, 0, 28, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0),
    new TagLunarCal(35, 0, 1, 33, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0),
    new TagLunarCal(24, 4, 2, 38, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1), /* 2020 */
    new TagLunarCal(42, 0, 4, 44, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1),
    new TagLunarCal(31, 0, 5, 49, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0),
    new TagLunarCal(21, 2, 6, 54, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1),
    new TagLunarCal(40, 0, 0, 59, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1), /* 2024 */
    new TagLunarCal(28, 6, 2, 5, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0),
    new TagLunarCal(47, 0, 3, 10, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1),
    new TagLunarCal(36, 0, 4, 15, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1),
    new TagLunarCal(25, 5, 5, 20, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0), /* 2028 */
    new TagLunarCal(43, 0, 0, 26, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1),
    new TagLunarCal(32, 0, 1, 31, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0)
  ],
  // 求月份最大天数
  calcDays: function (type, minY, year, month) {
    // 农历查询数据
    if (type === 1) {
      if (this.LunarCal[year].MonthDays[month]) {
        return 30
      } else {
        return 29
      }
    } else {
      year += minY
      if (month === 1) {
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0 && year % 4000 !== 0)) {
          return 29
        } else {
          return 28
        }
      } else {
        if (month === 3 || month === 5 || month === 8 || month === 10) {
          return 30
        } else {
          return 31
        }
      }
    }
  },
  // 中文转换,type:rm闰月，mm月份，dd日期，num值
  getChinese: function (type, num) {
    let rmArr = ['闰正月', '闰二月', '闰三月', '闰四月', '闰五月', '闰六月', '闰七月', '闰八月', '闰九月', '闰十月', '闰冬月', '闰腊月']
    let mmArr = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    let ddArr = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '三十一']
    let hhArr = ['0子', '1丑', '2丑', '3寅', '4寅', '5卯', '6卯', '7辰', '8辰', '9巳', '10巳', '11午', '12午', '13未', '14未', '15申', '16申', '17酉', '18酉', '19戌', '20戌', '21亥', '22亥', '23子']
    if (type === 'rm') return rmArr[num - 1]
    if (type === 'mm') return mmArr[num - 1]
    if (type === 'dd') return ddArr[num - 1]
    if (type === 'hh') return hhArr[num]
  },
  /**
   *
   * @param {string} M =0公历到农历,M=1农历到公历
   * @param {string} dateYY 年
   * @param {string} dateMM 月，闰月为 负数
   * @param {string} dateDD 日
   */
  calendarConvert: function (M, dateYY, dateMM, dateDD) {
    let SolarYear = parseInt(dateYY)
    let SolarMonth = parseInt(dateMM)
    let SolarDate = parseInt(dateDD)
    let LunarYear = parseInt(dateYY)
    let LunarMonth = parseInt(dateMM)
    let LunarDate = parseInt(dateDD)

    let FIRSTYEAR = 1940// 最小年份
    // let LASTYEAR = 2030// 最大年份

    // 西曆年每月之日數
    // let SolarCal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    // 西曆年每月之累積日數, 平年與閏年
    let SolarDays = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365, 396, 0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366, 397]
    let i
    // 公历转农历
    if (M === 0) {
      let sm = SolarMonth - 1

      let leap = this.GetLeap(SolarYear)

      // let d = (sm === 1) ? leap + 28 : SolarCal[sm]

      let y = SolarYear - FIRSTYEAR
      let acc = SolarDays[leap * 14 + sm] + SolarDate
      let kc = acc + this.LunarCal[y].BaseKanChih
      let Age = kc % 60
      Age = (Age < 22) ? 22 - Age : 82 - Age

      Age = Age + 3
      if (Age < 10) Age = Age + 60

      if (acc <= this.LunarCal[y].BaseDays) {
        y--
        LunarYear = SolarYear - 1
        leap = this.GetLeap(LunarYear)
        sm += 12
        acc = SolarDays[leap * 14 + sm] + SolarDate
      } else {
        LunarYear = SolarYear
      }
      let l1 = this.LunarCal[y].BaseDays
      for (i = 0; i < 13; i++) {
        let l2 = l1 + this.LunarCal[y].MonthDays[i] + 29
        if (acc <= l2) break
        l1 = l2
      }
      let LunarMonth = i + 1
      let LunarDate = acc - l1
      let im = this.LunarCal[y].Intercalation
      if (im !== 0 && LunarMonth > im) {
        LunarMonth--
        if (LunarMonth === im) LunarMonth = -im
      }
      if (LunarMonth > 12) LunarMonth -= 12

      return {yy: LunarYear, mm: LunarMonth, dd: LunarDate}
    } else {
      /* 农历转公历 */
      let y = LunarYear - FIRSTYEAR
      let im = this.LunarCal[y].Intercalation
      let lm = LunarMonth

      if (im !== 0) {
        if (lm > im) {
          lm++
        } else if (lm === -im) {
          lm = im + 1
        }
      }
      lm--

      let acc = 0
      for (i = 0; i < lm; i++) {
        acc += this.LunarCal[y].MonthDays[i] + 29
      }

      acc += this.LunarCal[y].BaseDays + LunarDate

      let leap = this.GetLeap(LunarYear)

      for (i = 13; i >= 0; i--) {
        if (acc > SolarDays[leap * 14 + i]) break
      }
      SolarDate = acc - SolarDays[leap * 14 + i]
      if (i <= 11) {
        SolarYear = LunarYear
        SolarMonth = i + 1
      } else {
        SolarYear = LunarYear + 1
        SolarMonth = i - 11
      }
      // return SolarYear + "-" + SolarMonth + "-" + SolarDate;
      return {yy: SolarYear, mm: SolarMonth, dd: SolarDate}
    }
  },
  /* 闰年, 返回 0 平年, 1 闰年 */
  GetLeap: function (year) {
    if (year % 400 === 0) { return 1 } else if (year % 100 === 0) { return 0 } else if (year % 4 === 0) { return 1 } else { return 0 }
  }
}

// 农历对象数据处理
function TagLunarCal (d, i, w, k, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13) {
  this.BaseDays = d /* 1 月 1 日到正月初一的累计日 */
  this.Intercalation = i /* 闰月月份. 0==此年沒有闰月 */
  this.BaseWeekday = w /* 此年 1 月 1 日为星期减 1 */
  this.BaseKanChih = k /* 此年 1 月 1 日之干支序号减 1 */
  this.MonthDays = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13] /* 此农历年每月之大小, 0==小月(29日), 1==大月(30日) */
}
export default calendar
