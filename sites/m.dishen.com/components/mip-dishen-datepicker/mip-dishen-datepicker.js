import './style/index.less'
import calendar from './calendar'
import DateScroll from './DateScroll'
class RuiDatepicker {
  constructor (config) {
    let date = new Date()
    this.dateObj = {
      yy: date.getYear() + 1900 - this.minY,
      mm: date.getMonth(),
      dd: date.getDate() - 1,
      hh: 0,
      min: 0
    }
    this.gearDate = null
    this.minY = 1940
    this.minM = 4
    this.minD = 1
    this.maxY = date.getYear() + 1901
    this.maxM = 12
    this.maxD = 31
    this.type = 0
  }
  init (el, mipEl) {
    this.mipEl = mipEl
    this.trigger = el
    this.type = parseInt(el.getAttribute('data-type'))

    // 判断移动端
    let isMove = false
    let startTime = 0
    let that = this
    if ('ontouchstart' in window) {
      // 判断移动的点击事件tap操作
      this.trigger.addEventListener('touchstart', function (e) {
        startTime = Date.now()
      })
      this.trigger.addEventListener('touchmove', function (e) {
        isMove = true
      })
      this.trigger.addEventListener('touchend', function (e) {
        /* 判读  是否满足tap 的要求  一般要求tap的响应时间150 */
        if (!isMove && (Date.now() - startTime) < 150) {
          e.preventDefault()
          that.popupDate()
        }
        /* 重置 参数 */
        isMove = false
        startTime = 0
      })
    } else {
      this.trigger.addEventListener('click', function () {
        that.popupDate()
      })
    }
    this.initTriger()
  }

  // 初始化年月日默认值
  initTriger () {
    let date = new Date()
    let dateArr = {
      yy: date.getYear() + 1900,
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      hh: 0,
      min: 0
    }
    if (this.trigger.getAttribute('data-toid-date')) {
      if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(this.trigger.getAttribute('data-date'))) {
        let rs = this.trigger.getAttribute('data-date').match(/(^|-)\d{1,4}/g)
        dateArr.yy = rs[0]
        dateArr.mm = rs[1].replace(/-/g, '')
        dateArr.dd = rs[2].replace(/-/g, '')
      }
      // 判断有时辰
      let hourVal = -1
      if (this.trigger.getAttribute('data-hour') && this.trigger.getAttribute('data-hour') >= 0) {
        hourVal = parseInt(Math.round(this.trigger.getAttribute('data-hour')))
        this.dateObj.hh = hourVal
      }
      // 默认农历或公历
      if (parseInt(this.trigger.getAttribute('data-type'))) {
        let objDate = calendar.calendarConvert(0, dateArr.yy, dateArr.mm, dateArr.dd) // 返回转换对象
        this.dateObj.yy = objDate.yy - this.minY
        this.dateObj.mm = objDate.mm - 1
        this.dateObj.dd = objDate.dd - 1
        this.trigger.value = objDate.yy + '年' + calendar.getChinese('mm', objDate.mm) + calendar.getChinese('dd', objDate.dd) + (hourVal === -1 ? '' : ' ' + calendar.getChinese('hh', hourVal) + '时')
      } else {
        this.dateObj.yy = dateArr.yy - this.minY
        this.dateObj.mm = dateArr.mm - 1
        this.dateObj.dd = dateArr.dd - 1
        this.trigger.value = dateArr.yy + '年' + dateArr.mm + '月' + dateArr.dd + '日' + (hourVal === -1 ? '' : ' ' + hourVal + '时')
      }
    } else if (this.trigger.getAttribute('data-hour') || this.trigger.getAttribute('data-min')) {
      let hour = this.trigger.getAttribute('data-hour')
      let min = this.trigger.getAttribute('data-min')
      let hourStr = hour ? hour + '时' : ''
      let minStr = min ? min + '分' : ''
      this.trigger.value = hourStr + minStr
      this.dateObj.hh = hour
      this.dateObj.min = min
    }
  }
  // 呼出日期插件
  popupDate (e) {
    // 阻止获得焦点
    // document.activeElement.blur();
    this.gearDate = document.createElement('div')
    this.gearDate.className = 'mip-dishen-geardate'
    let dateId = this.trigger.getAttribute('data-toid-date')
    let hourId = this.trigger.getAttribute('data-toid-hour')
    let minId = this.trigger.getAttribute('data-toid-min')
    let fixed = this.trigger.getAttribute('data-fixed') === 'true'// 选择公历/农历
    let colNum = 0
    let _self = this
    dateId && (colNum += 3)
    hourId && (colNum += 1)
    minId && (colNum += 1)
    let dateHtml = '<div  class="dateYY" data-datetype="dateYY">' +
        '<div class="date_grid">' +
        '</div>' +
        '</div>' +
        '<div class="dateMM" data-datetype="dateMM">' +
        '<div class="date_grid">' +
        '</div>' +
        '</div>' +
        '<div class="dateDD" data-datetype="dateDD">' +
        '<div class="date_grid">' +
        '</div>' +
        '</div>'
    let hourHtml = '<div class="dateHH" data-datetype="dateHH">' +
        '<div class="date_grid">' +
        '</div>' +
        '</div>'
    let minHtml = '<div class="dateMin" data-datetype="dateMin">' +
        '<div class="date_grid">' +
        '</div>' +
        '</div>'
    let changeTypeHtml =
    '<div class="date_class_box">' +
    '<div class="date_class lcalendar_gongli"><span></span>公历</div>' +
    '<div class="date_class lcalendar_nongli"><span></span>农历</div>' +
    '</div>'
    this.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
        '<div class="date_info_box lcalendar_info">' +
        '</div>' +
        '<div class="date_btn_box">' +
        '<div class="date_btn lcalendar_finish">完成</div>' +
        '<div class="date_btn lcalendar_cancel">取消</div>' +
        '</div>' +
        '<div class="date_choice_wrap">' +
        '<div class="date_roll_mask">' +
        '<div class="date_roll date_roll_col' + colNum + '">' +
        (dateId ? dateHtml : '') +
        (hourId ? hourHtml : '') +
        (minId ? minHtml : '') +
        '</div>' +
        '</div>' +
        (fixed ? '' : changeTypeHtml) +
        '</div>' +
        '<div class="date_confirm_wrap">' +
        '<div class="confirm_tit">请确认输入的时间是否正确</div>' +
        '<div class="confirm_p">公历：<b class="confirm_gongli"></b></div>' +
        '<div class="confirm_p">农历：<b class="confirm_nongli"></b></div>' +
        '</div>' +
        '</div>'
    document.body.appendChild(this.gearDate)
    let hasTouch = 'ontouchstart' in window
    let lcalendarCancel = this.gearDate.querySelector('.lcalendar_cancel')
    lcalendarCancel.addEventListener(hasTouch ? 'touchstart' : 'click', function (e) { _self.closeMobileCalendar(e) })
    let lcalendarFinish = this.gearDate.querySelector('.lcalendar_finish')
    lcalendarFinish.addEventListener(hasTouch ? 'touchstart' : 'click', function (e) { _self.finishMobileDate(e) })
    if (!fixed) {
      let lcalendarGongli = this.gearDate.querySelector('.lcalendar_gongli')
      let lcalendarNongli = this.gearDate.querySelector('.lcalendar_nongli')
      let _self = this
      lcalendarGongli.addEventListener(hasTouch ? 'touchstart' : 'click', function () { _self.convertTap('gongli') }, false)
      lcalendarNongli.addEventListener(hasTouch ? 'touchstart' : 'click', function () { _self.convertTap('nongli') }, false)
    }
    this.renderScroll()
    // 阻止透视滑动
    this.gearDate.addEventListener('touchmove', function (e) { e.preventDefault() })
  }
  // 公历农历选择
  convertTap (type) {
    let nongli = this.gearDate.querySelector('.lcalendar_nongli')
    let gongli = this.gearDate.querySelector('.lcalendar_gongli')
    let changeOn = 0
    if (type === 'nongli' && this.type !== 1) {
      nongli.className = nongli.className.replace(/active/, '').replace(/(^\s*)|(\s*$)/g, '') + ' active'
      gongli.className = gongli.className.replace(/active/, '')
      this.type = 1
      changeOn = 1
    } else if (type === 'gongli' && this.type !== 0) {
      nongli.className = nongli.className.replace(/active/, '')
      gongli.className = gongli.className.replace(/active/, '').replace(/(^\s*)|(\s*$)/g, '') + ' active'
      this.type = 0
      changeOn = 1
    }
    // 判断是否切换
    if (changeOn) {
      let passY = this.maxY - this.minY + 1
      let valYY = parseInt(Math.round(this.gearDate.querySelector('.dateYY').getAttribute('val')))
      let dateMM = parseInt(Math.round(this.gearDate.querySelector('.dateMM').getAttribute('val'))) + 1
      let dateDD = parseInt(Math.round(this.gearDate.querySelector('.dateDD').getAttribute('val'))) + 1
      let dateYY = valYY % passY + this.minY
      let type = this.type ? 0 : 1
      // 农历转公历前判断是否有闰月
      let rmNum = calendar.LunarCal[valYY].Intercalation ? calendar.LunarCal[valYY].Intercalation : 0
      if (!this.type && rmNum) {
        if (rmNum === (dateMM - 1)) {
          dateMM = -(dateMM - 1)
        } else if (rmNum < (dateMM - 1)) {
          dateMM = dateMM - 1
        }
      }
      let objDate = calendar.calendarConvert(type, dateYY, dateMM, dateDD)// 返回转换对象
      // 公历转农历后判断是否有闰月
      let rmTip = calendar.LunarCal[objDate.yy - this.minY].Intercalation ? calendar.LunarCal[objDate.yy - this.minY].Intercalation : 0
      if (rmTip && this.type) {
        if (objDate.mm < 0) {
          objDate.mm = -objDate.mm + 1
        } else if (objDate.mm > rmTip) {
          objDate.mm = objDate.mm + 1
        }
      }
      this.dateObj.yy = objDate.yy - this.minY
      this.dateObj.mm = objDate.mm - 1
      this.dateObj.dd = objDate.dd - 1

      this.renderScroll()
    }
  }
  // 渲染scroll
  renderScroll (render) {
    let dateYY = this.gearDate.querySelector('.dateYY')
    let dateMM = this.gearDate.querySelector('.dateMM')
    let dateDD = this.gearDate.querySelector('.dateDD')
    let dateHH = this.gearDate.querySelector('.dateHH')
    let dateMin = this.gearDate.querySelector('.dateMin')
    let _self = this
    // 判断有日期
    if (dateYY) {
      // 默认农历或公历
      if (this.type === 1) {
        if (this.trigger.getAttribute('data-fixed') === 'false') {
          let nongli = this.gearDate.querySelector('.lcalendar_nongli')
          nongli.className = nongli.className.replace(/active/, '').replace(/(^\s*)|(\s*$)/g, '') + ' active'
        }
        let passY = this.maxY - this.minY + 1
        let dateYY = this.dateObj.yy % passY + this.minY
        let dateMM = this.dateObj.mm + 1
        let dateDD = this.dateObj.dd + 1
        let objDate = calendar.calendarConvert(0, dateYY, dateMM, dateDD)// 返回转换对象
        let isRm = calendar.LunarCal[objDate.yy - this.minY].Intercalation ? calendar.LunarCal[objDate.yy - this.minY].Intercalation : 0// 判断是不是闰年
        if (objDate.mm < 0) {
          objDate.mm = -objDate.mm + 1// 返回的负数为 闰年
        } else {
          // 闰年月份+1重复选择，位置才正确
          if (isRm && (objDate.mm - 1) >= isRm) objDate.mm = objDate.mm + 1
        }
        objDate.yy = objDate.yy - this.minY
        objDate.mm = objDate.mm - 1
        objDate.dd = objDate.dd - 1
      } else {
        if (this.trigger.getAttribute('data-fixed') === 'false') {
          let gongli = this.gearDate.querySelector('.lcalendar_gongli')
          gongli.className = gongli.className.replace(/active/, '').replace(/(^\s*)|(\s*$)/g, '') + ' active'
        }
      }
      let passY = this.maxY - this.minY
      if (!render || render.yy) {
        this.yyScroll = new DateScroll({
          element: dateYY,
          index: this.dateObj.yy,
          callback: function (val) {
            _self.dateObj.yy = val
            _self.renderScroll({mm: true, dd: true})
          },
          max: passY,
          getHtml: function (i) {
            return "<div class='tooth'>" + (_self.minY + i) + '</div>'
          }
        })
      }
      if (!render || render.mm) {
        let minM = 0
        let maxM
        // 判断否有闰月
        let rmNum = calendar.LunarCal[this.dateObj.yy].Intercalation ? calendar.LunarCal[this.dateObj.yy].Intercalation : 0
        if (rmNum && this.type) {
          maxM = 12
        } else {
          maxM = 11
        }
        // 当年份到达最大值
        if (this.dateObj.yy === passY - 1) {
          if (this.type) {
            maxM = this.maxM - 1
          } else {
            maxM = this.maxM - 1
          }
        }
        // 当年份到达最小值
        if (this.dateObj.yy === 0) {
          if (this.type) {
            minM = this.minM - 1
          } else {
            minM = this.minM
          }
        }
        this.mmScroll = new DateScroll({
          element: dateMM,
          index: this.dateObj.mm,
          max: maxM - minM + 1,
          callback: function (val) {
            _self.dateObj.mm = val
            _self.renderScroll({dd: true})
          },
          getHtml: function (i) {
            let strVal = minM + i + 1
            // 农历
            if (_self.type) {
              // 闰月
              if (rmNum && rmNum === i) {
                strVal = calendar.getChinese('rm', strVal - 1)
              } else if (rmNum && rmNum < i) {
                strVal = calendar.getChinese('mm', strVal - 1)
              } else {
                strVal = calendar.getChinese('mm', strVal)
              }
            }
            return "<div class='tooth'>" + strVal + '</div>'
          }
        })
      }
      if (!render || render.dd) {
        // 返回月份的天数
        let maxMonthDays = calendar.calcDays(this.type, this.minY, this.dateObj.yy, this.dateObj.mm)
        // p 当前节点前后需要展示的节点个数
        let maxD = maxMonthDays - 1
        let minD = 0
        // 当年份月份到达最大值
        if (this.dateObj.yy === passY - 1 && this.dateObj.mm + 1 === 12) {
          if (this.type) {
            maxD = this.maxD - 15
          } else {
            maxD = this.maxD - 1
          }
        }
        // 当年、月到达最小值
        if (this.dateObj.yy === 0 && this.dateObj.mm + 1 === 2) {
          if (this.type) {
            minD = this.minD - 1
          } else {
            minD = this.minD + 6
          }
        }
        if (this.dateObj.dd > maxD) { this.dateObj.dd = maxD }
        if (this.dateObj.dd < minD) { this.dateObj.dd = minD }
        this.ddScroll = new DateScroll({
          element: dateDD,
          index: this.dateObj.dd,
          max: maxD - minD + 1,
          callback: function (val) {
            _self.dateObj.dd = val
          },
          getHtml: function (i) {
            let strVal = _self.type ? calendar.getChinese('dd', minD + i + 1) : (minD + i + 1)
            return "<div class='tooth'>" + strVal + '</div>'
          }
        })
      }
    }
    // 判断有时辰
    if (dateHH) {
      this.hhScroll = new DateScroll({
        element: dateHH,
        index: _self.dateObj.hh,
        max: 24,
        callback: function (val) {
          _self.dateObj.hh = val
        },
        getHtml: function (i) {
          let strVal = _self.type ? calendar.getChinese('hh', i) : (i < 10 ? '0' + i : i)
          return "<div class='tooth'>" + strVal + '时</div>'
        }
      })
    }
    // 判断有分钟
    if (dateMin) {
      this.minScroll = new DateScroll({
        element: dateMin,
        index: _self.dateObj.min,
        max: 60,
        callback: function (val) {
          _self.dateObj.min = val
        },
        getHtml: function (i) {
          let strVal = (i < 10 ? '0' + i : i)
          return "<div class='tooth'>" + strVal + '分</div>'
        }
      })
    }
  }
  // 补零
  addZero (i) {
    return i < 10 ? '0' + i : '' + i
  }
  // 取消 type 判断是不是点击完成后调用
  closeMobileCalendar (e, type) {
    let btnFinish = this.gearDate.querySelector('.lcalendar_finish')
    let btnCancel = this.gearDate.querySelector('.lcalendar_cancel')
    e.preventDefault()
    // 判断是否在等待确认状态
    if (btnFinish.getAttribute('data-isconfirm') - 0 && !type) {
      // 设置日期
      this.getCalendarDate()
      btnFinish.setAttribute('data-isconfirm', 0)
      this.gearDate.querySelector('.date_choice_wrap').style.display = 'block'
      this.gearDate.querySelector('.date_confirm_wrap').style.display = 'none'
      // 设置文案
      btnFinish.innerHTML = '完成'
      btnCancel.innerHTML = '取消'
      return false
    }
    if (typeof window.CustomEvent === 'function') {
      let evt = new CustomEvent('input')
      this.trigger.dispatchEvent(evt)
    }
    document.body.removeChild(this.gearDate)
    // _self.trigger.parentElement.removeChild(_self.gearDate);
  }
  // 日期确认
  finishMobileDate (e) {
    let d = this.getCalendarDate()
    let btnFinish = this.gearDate.querySelector('.lcalendar_finish')
    let btnCancel = this.gearDate.querySelector('.lcalendar_cancel')
    // 判断是否在等待确认状态
    if (!(btnFinish.getAttribute('data-isconfirm') - 0) && this.trigger.getAttribute('data-confirm') === 'true') {
      let topInfo = this.gearDate.querySelector('.lcalendar_info')
      let confirmNongli = this.gearDate.querySelector('.confirm_nongli')
      let confirmGongli = this.gearDate.querySelector('.confirm_gongli')
      this.gearDate.querySelector('.date_choice_wrap').style.display = 'none'
      this.gearDate.querySelector('.date_confirm_wrap').style.display = 'block'
      btnFinish.setAttribute('data-isconfirm', 1)
      // 设置文案
      topInfo.innerHTML = '确认日期'
      btnFinish.innerHTML = '确认'
      btnCancel.innerHTML = '返回修改'
      // 时辰
      let nongliHourStr = ''
      let gongliHourStr = ''
      if (d.hh) {
        if (d.hh < 0) {
          nongliHourStr = '时辰未知'
          gongliHourStr = '时辰未知'
        } else {
          gongliHourStr = d.hh + '时'
          nongliHourStr = calendar.getChinese('hh', d.hh) + '时'
        }
      }
      // 设置公历选择时间
      confirmGongli.innerHTML = d.yy + '年' + d.mm + '月' + d.dd + '日 ' + gongliHourStr
      // 设置农历选择时间
      let mmChina = d._mm < 0 ? calendar.getChinese('rm', -d._mm) : calendar.getChinese('mm', d._mm)
      confirmNongli.innerHTML = d._yy + '年' + mmChina + '' + calendar.getChinese('dd', d._dd) + ' ' + nongliHourStr
      return false
    }
    let dateId = this.trigger.getAttribute('data-toid-date')
    let hourId = this.trigger.getAttribute('data-toid-hour')
    let minId = this.trigger.getAttribute('data-toid-min')
    let typeId = this.trigger.getAttribute('data-toid-type')
    if (dateId) {
      let dateEl = document.getElementById(dateId)
      this.trigger.setAttribute('data-date', d.yy + '-' + d.mm + '-' + d.dd)
      dateEl.value = d.yy + '-' + d.mm + '-' + d.dd
      // 触发MIP事件
      MIP.viewer.eventAction.execute('change', dateEl, {value: dateEl.value, date2: this.addZero(d.mm) + this.addZero(d.dd)})
    }
    if (hourId) {
      let hourEl = document.getElementById(hourId)
      let strVal = (d.hh < 10 ? '0' + d.hh : d.hh)
      hourEl.value = strVal
      this.trigger.setAttribute('data-hour', strVal)
      // 触发MIP事件
      MIP.viewer.eventAction.execute('change', hourEl, {value: hourEl.value})
    }
    if (minId) {
      let minEl = document.getElementById(minId)
      let strVal = (d.min < 10 ? '0' + d.min : d.min)
      minEl.value = strVal
      this.trigger.setAttribute('data-min', strVal)
      // 触发MIP事件
      MIP.viewer.eventAction.execute('change', minEl, {value: minEl.value})
    }
    if (typeId) { document.getElementById(typeId).value = this.type }
    if (dateId) {
      let hourStr = ''
      if (this.type) {
        let mmChina = d._mm < 0 ? calendar.getChinese('rm', -d._mm) : calendar.getChinese('mm', d._mm)
        if (hourId) {
          hourStr = calendar.getChinese('hh', d.hh) + '时'
        }
        this.trigger.value = d._yy + '年' + mmChina + '' + calendar.getChinese('dd', d._dd) + ' ' + hourStr
      } else {
        if (hourId) {
          hourStr = d.hh + '时'
        }
        this.trigger.value = d.yy + '年' + d.mm + '月' + d.dd + '日 ' + hourStr
      }
    } else {
      let hourStr = ''
      let minStr = ''
      if (hourId) {
        hourStr = d.hh + '时'
      }
      if (minId) {
        minStr = d.min + '分'
      }
      this.trigger.value = hourStr + minStr
    }
    // 触发MIP事件
    MIP.viewer.eventAction.execute('change', this.mipEl)
    this.closeMobileCalendar(e, 'finish')
  }
  // 设置顶部日期+设置确认框数据+返回对象 _yy 农历年  yy公历年
  getCalendarDate () {
    // 判断是否启用日期
    let dateOn = this.gearDate.querySelector('.dateYY') ? 1 : 0
    // 判断是否启用时辰
    let hourOn = this.gearDate.querySelector('.dateHH') ? 1 : 0
    // 判断是否启用分钟
    let minOn = this.gearDate.querySelector('.dateMin') ? 1 : 0
    if (dateOn) {
      let passY = this.maxY - this.minY + 1
      let valYY = parseInt(Math.round(this.gearDate.querySelector('.dateYY').getAttribute('val')))
      let dateYY = valYY % passY + this.minY
      let dateMM = parseInt(Math.round(this.gearDate.querySelector('.dateMM').getAttribute('val'))) + 1
      let dateDD = parseInt(Math.round(this.gearDate.querySelector('.dateDD').getAttribute('val'))) + 1
      let dateHH = ''
      if (hourOn) {
        dateHH = parseInt(Math.round(this.gearDate.querySelector('.dateHH').getAttribute('val')))
      }
      // 判断否有闰月
      let rmNum = calendar.LunarCal[valYY].Intercalation ? calendar.LunarCal[valYY].Intercalation : 0
      if (this.type && rmNum) {
        if (rmNum === (dateMM - 1)) {
          dateMM = -(dateMM - 1)
        } else if (rmNum < (dateMM - 1)) {
          dateMM = dateMM - 1
        }
      }
      let objDate = calendar.calendarConvert(this.type, dateYY, dateMM, dateDD)
      let info = this.gearDate.querySelector('.lcalendar_info')
      if (this.type) {
        this.trigger.setAttribute('data-type', 1)
        let mmChina = dateMM < 0 ? calendar.getChinese('rm', -dateMM) : calendar.getChinese('mm', dateMM)
        let hhStr = ''
        if (hourOn) {
          if (dateHH < 0) {
            hhStr = '时辰未知'
          } else {
            hhStr = calendar.getChinese('hh', dateHH) + '时'
          }
        }
        info.innerHTML = dateYY + '年' + mmChina + '' + calendar.getChinese('dd', dateDD) + ' ' + hhStr
        return {
          yy: objDate.yy,
          mm: objDate.mm,
          dd: objDate.dd,
          _yy: dateYY,
          _mm: dateMM,
          _dd: dateDD,
          hh: dateHH
        }
      } else {
        this.trigger.setAttribute('data-type', 0)
        let hhStr = ''
        if (hourOn) {
          if (dateHH < 0) {
            hhStr = '时辰未知'
          } else {
            hhStr = dateHH + '时'
          }
        }
        info.innerHTML = dateYY + '年' + dateMM + '月' + dateDD + '日' + ' ' + hhStr
        return {
          _yy: objDate.yy,
          _mm: objDate.mm,
          _dd: objDate.dd,
          yy: dateYY,
          mm: dateMM,
          dd: dateDD,
          hh: dateHH
        }
      }
    } else {
      let dateHH = ''
      let dateMin = ''
      if (hourOn) {
        dateHH = parseInt(Math.round(this.gearDate.querySelector('.dateHH').getAttribute('val')))
      }
      if (minOn) {
        dateMin = parseInt(Math.round(this.gearDate.querySelector('.dateMin').getAttribute('val')))
      }
      return {
        _yy: '',
        _mm: '',
        _dd: '',
        yy: '',
        mm: '',
        dd: '',
        hh: dateHH,
        min: dateMin
      }
    }
  }
}

export default class MIPDishenDatepicker extends MIP.CustomElement {
  connectedCallback () {
    let el = this.element
    let wrapper = document.createElement('div')
    let date = el.getAttribute('data-date') || ''
    let hour = el.getAttribute('data-hour') || ''
    let min = el.getAttribute('data-min') || ''
    let type = el.getAttribute('data-type') || '0'
    let dateId = el.getAttribute('data-toid-date') || ''
    let hourId = el.getAttribute('data-toid-hour') || ''
    let minId = el.getAttribute('data-toid-min') || ''
    let typeId = el.getAttribute('data-toid-type') || ''
    let confirm = el.getAttribute('data-confirm') || 'true'
    let fixed = el.getAttribute('data-fixed') || 'false'
    let placeholder = el.getAttribute('placeholder') || ''
    wrapper.classList.add('datepicker-wrapper')
    wrapper.innerHTML =
    '<input  class="form-time" data-toid-date="' + dateId + '" data-toid-hour="' + hourId + '" data-toid-min="' + minId + '" data-toid-type="' + typeId + '" data-type="' + type + '" data-fixed="' + fixed + '"  data-confirm="' + confirm + '"' +
      'value="" placeholder="' + placeholder + '" readonly="readonly" autocomplete="off" id="birthday" data-date="' + date + '" data-hour="' + hour + '" data-min="' + min + '">'

    let datepicker = new RuiDatepicker()
    datepicker.init(wrapper.children[0], el)
    this.element.appendChild(wrapper)
  }
}
