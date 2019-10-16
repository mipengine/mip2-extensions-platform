import './style/index.less'
import calendar from './calendar'
import DateScroll from './DateScroll'
class RuiDatepicker {
  constructor (config) {
    this.gearDate = null
    this.minY = 1940
    this.minM = 1
    this.minD = 1
    this.maxY = 2020
    this.maxM = 12
    this.maxD = 31
    this.type = 1
  }
  init (el, mipEl) {
    this.mipEl = mipEl
    this.trigger = el
    this.bindEvent('date')
  }
  bindEvent (type) {
    let _self = this

    // 初始化年月日默认值
    function initTriger () {
      if (_self.trigger.getAttribute('data-date')) {
        let date = new Date()
        let dateArr = {
          yy: date.getYear(),
          mm: date.getMonth(),
          dd: date.getDate() - 1
        }
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(_self.trigger.getAttribute('data-date'))) {
          let rs = _self.trigger.getAttribute('data-date').match(/(^|-)\d{1,4}/g)
          dateArr.yy = rs[0]
          dateArr.mm = rs[1].replace(/-/g, '')
          dateArr.dd = rs[2].replace(/-/g, '')
        }
        // 判断有时辰
        let hourVal = -1
        if (_self.trigger.getAttribute('data-hour') && _self.trigger.getAttribute('data-hour') >= 0) {
          hourVal = parseInt(Math.round(_self.trigger.getAttribute('data-hour')))
        }
        // 默认农历或公历
        if (parseInt(_self.trigger.getAttribute('data-type'))) {
          let dateYY = dateArr.yy
          let dateMM = dateArr.mm
          let dateDD = dateArr.dd
          let objDate = calendar.calendarConvert(0, dateYY, dateMM, dateDD)// 返回转换对象
          _self.trigger.value = objDate.yy + '年' + calendar.getChinese('mm', objDate.mm) + calendar.getChinese('dd', objDate.dd) + (hourVal === -1 ? '' : ' ' + calendar.getChinese('hh', hourVal) + '时')
        } else {
          _self.trigger.value = dateArr.yy + '年' + dateArr.mm + '月' + dateArr.dd + '日' + (hourVal === -1 ? '' : ' ' + hourVal + '时')
        }
      } else if (_self.trigger.getAttribute('data-hour') || _self.trigger.getAttribute('data-min')) {
        let hour = _self.trigger.getAttribute('data-hour')
        let min = _self.trigger.getAttribute('data-min')
        let hourStr = hour ? hour + '时' : ''
        let minStr = min ? min + '分' : ''
        _self.trigger.value = hourStr + minStr
      }
    }
    // 呼出日期插件
    function popupDate (e) {
      // 阻止获得焦点
      // document.activeElement.blur();
      _self.gearDate = document.createElement('div')
      _self.gearDate.className = 'mip-dishen-geardate'
      let dateId = _self.trigger.getAttribute('data-toid-date')
      let hourId = _self.trigger.getAttribute('data-toid-hour')
      let minId = _self.trigger.getAttribute('data-toid-min')
      let fixed = _self.trigger.getAttribute('data-fixed') === 'true'// 选择公历/农历
      let colNum = 0
      dateId && (colNum += 3)
      hourId && (colNum += 1)
      minId && (colNum += 1)
      let dateHtml = '<div>' +
          '<div class="gear dateYY" data-datetype="dateYY"></div>' +
          '<div class="date_grid">' +
          '</div>' +
          '</div>' +
          '<div>' +
          '<div class="gear dateMM" data-datetype="dateMM"></div>' +
          '<div class="date_grid">' +
          '</div>' +
          '</div>' +
          '<div>' +
          '<div class="gear dateDD" data-datetype="dateDD"></div>' +
          '<div class="date_grid">' +
          '</div>' +
          '</div>'
      let hourHtml = '<div>' +
          '<div class="gear dateHH" data-datetype="dateHH"></div>' +
          '<div class="date_grid">' +
          '</div>' +
          '</div>'
      let minHtml = '<div>' +
          '<div class="gear dateMin" data-datetype="dateMin"></div>' +
          '<div class="date_grid">' +
          '</div>' +
          '</div>'
      let changeTypeHtml =
      '<div class="date_class_box">' +
      '<div class="date_class lcalendar_gongli"><span></span>公历</div>' +
      '<div class="date_class lcalendar_nongli"><span></span>农历</div>' +
      '</div>'
      _self.gearDate.innerHTML = '<div class="date_ctrl slideInUp">' +
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
      document.body.appendChild(_self.gearDate)
      // _self.trigger.parentElement.appendChild(_self.gearDate);
      dateCtrlInit()
      let hasTouch = 'ontouchstart' in window
      let lcalendarCancel = _self.gearDate.querySelector('.lcalendar_cancel')
      lcalendarCancel.addEventListener(hasTouch ? 'touchstart' : 'click', closeMobileCalendar)
      let lcalendarFinish = _self.gearDate.querySelector('.lcalendar_finish')
      lcalendarFinish.addEventListener(hasTouch ? 'touchstart' : 'click', finishMobileDate)
      if (!fixed) {
        let lcalendarGongli = _self.gearDate.querySelector('.lcalendar_gongli')
        let lcalendarNongli = _self.gearDate.querySelector('.lcalendar_nongli')
        lcalendarGongli.addEventListener(hasTouch ? 'touchstart' : 'click', function () { convertTap('gongli') }, false)
        lcalendarNongli.addEventListener(hasTouch ? 'touchstart' : 'click', function () { convertTap('nongli') }, false)
      }
      let dateYY = _self.gearDate.querySelector('.dateYY')
      let dateMM = _self.gearDate.querySelector('.dateMM')
      let dateDD = _self.gearDate.querySelector('.dateDD')
      let dateHH = _self.gearDate.querySelector('.dateHH')
      let dateMin = _self.gearDate.querySelector('.dateMin')

      if (dateYY) { _self.yyScroll = new DateScroll(dateYY.getAttribute('val')).init(dateYY) }
      if (dateMM) { _self.mmScroll = new DateScroll(dateMM.getAttribute('val')).init(dateMM) }
      if (dateDD) { _self.ddScroll = new DateScroll(dateDD.getAttribute('val')).init(dateDD) }
      if (dateHH) { _self.hhScroll = new DateScroll(dateHH.getAttribute('val')).init(dateHH) }
      if (dateMin) { _self.minScroll = new DateScroll(dateMin.getAttribute('val')).init(dateMin) }
      // 阻止透视滑动
      _self.gearDate.addEventListener('touchmove', function (e) { e.preventDefault() })
    }
    // 公历农历选择
    function convertTap (type) {
      let nongli = _self.gearDate.querySelector('.lcalendar_nongli')
      let gongli = _self.gearDate.querySelector('.lcalendar_gongli')
      let changeOn = 0
      if (type === 'nongli' && _self.type !== 1) {
        nongli.className = nongli.className.replace(/active/, '').replace(/(^\s*)|(\s*$)/g, '') + ' active'
        gongli.className = gongli.className.replace(/active/, '')
        _self.type = 1
        changeOn = 1
      } else if (type === 'gongli' && _self.type !== 0) {
        nongli.className = nongli.className.replace(/active/, '')
        gongli.className = gongli.className.replace(/active/, '').replace(/(^\s*)|(\s*$)/g, '') + ' active'
        _self.type = 0
        changeOn = 1
      }
      // 判断是否切换
      if (changeOn) {
        let passY = _self.maxY - _self.minY + 1
        let valYY = parseInt(Math.round(_self.gearDate.querySelector('.dateYY').getAttribute('val')))
        let dateMM = parseInt(Math.round(_self.gearDate.querySelector('.dateMM').getAttribute('val'))) + 1
        let dateDD = parseInt(Math.round(_self.gearDate.querySelector('.dateDD').getAttribute('val'))) + 1
        let dateYY = valYY % passY + _self.minY
        let type = _self.type ? 0 : 1
        // 农历转公历前判断是否有闰月
        let rmNum = calendar.LunarCal[valYY].Intercalation ? calendar.LunarCal[valYY].Intercalation : 0
        if (!_self.type && rmNum) {
          if (rmNum === (dateMM - 1)) {
            dateMM = -(dateMM - 1)
          } else if (rmNum < (dateMM - 1)) {
            dateMM = dateMM - 1
          }
        }
        let objDate = calendar.calendarConvert(type, dateYY, dateMM, dateDD)// 返回转换对象
        // 公历转农历后判断是否有闰月
        let rmTip = calendar.LunarCal[objDate.yy - _self.minY].Intercalation ? calendar.LunarCal[objDate.yy - _self.minY].Intercalation : 0
        if (rmTip && _self.type) {
          if (objDate.mm < 0) {
            objDate.mm = -objDate.mm + 1
          } else if (objDate.mm > rmTip) {
            objDate.mm = objDate.mm + 1
          }
        }
        _self.gearDate.querySelector('.dateYY').setAttribute('val', objDate.yy - _self.minY)
        _self.gearDate.querySelector('.dateMM').setAttribute('val', objDate.mm - 1)
        _self.gearDate.querySelector('.dateDD').setAttribute('val', objDate.dd - 1)
        _self.gearDate.querySelector('.dateYY').setAttribute('top', '')
        setDateGearTooth(true)
      }
    }
    // 初始化年月日插件默认值
    function dateCtrlInit () {
      let date = new Date()
      let dateArr = {
        yy: date.getYear(),
        mm: date.getMonth(),
        dd: date.getDate() - 1
      }
      // 判断有日期
      if (_self.gearDate.querySelector('.dateYY')) {
        if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(_self.trigger.getAttribute('data-date'))) {
          let rs = _self.trigger.getAttribute('data-date').match(/(^|-)\d{1,4}/g)
          dateArr.yy = rs[0] - _self.minY
          dateArr.mm = rs[1].replace(/-/g, '') - 1
          dateArr.dd = rs[2].replace(/-/g, '') - 1
        } else {
          dateArr.yy = dateArr.yy + 1900 - _self.minY
        };
        _self.gearDate.querySelector('.dateYY').setAttribute('val', dateArr.yy)
        _self.gearDate.querySelector('.dateMM').setAttribute('val', dateArr.mm)
        _self.gearDate.querySelector('.dateDD').setAttribute('val', dateArr.dd)
      }
      // 判断有时辰
      if (_self.gearDate.querySelector('.dateHH')) {
        let hourVal = _self.trigger.getAttribute('data-hour') || 0
        hourVal = parseInt(Math.round(hourVal))
        _self.gearDate.querySelector('.dateHH').setAttribute('val', hourVal)
      }
      // 判断有分钟
      if (_self.gearDate.querySelector('.dateMin')) {
        let minVal = _self.trigger.getAttribute('data-min') || 0
        minVal = parseInt(Math.round(minVal))
        _self.gearDate.querySelector('.dateMin').setAttribute('val', minVal)
      }
      // 默认农历或公历
      if (parseInt(_self.trigger.getAttribute('data-type'))) {
        _self.type = 1
        if (_self.trigger.getAttribute('data-fixed') === 'false') {
          let nongli = _self.gearDate.querySelector('.lcalendar_nongli')
          nongli.className = nongli.className.replace(/active/, '').replace(/(^\s*)|(\s*$)/g, '') + ' active'
        }
        let passY = _self.maxY - _self.minY + 1
        let dateYY = dateArr.yy % passY + _self.minY
        let dateMM = dateArr.mm + 1
        let dateDD = dateArr.dd + 1
        let objDate = calendar.calendarConvert(0, dateYY, dateMM, dateDD)// 返回转换对象
        let isRm = calendar.LunarCal[objDate.yy - _self.minY].Intercalation ? calendar.LunarCal[objDate.yy - _self.minY].Intercalation : 0// 判断是不是闰年
        if (objDate.mm < 0) {
          objDate.mm = -objDate.mm + 1// 返回的负数为 闰年
        } else {
          // 闰年月份+1重复选择，位置才正确
          if (isRm && (objDate.mm - 1) >= isRm) objDate.mm = objDate.mm + 1
        }
        // console.log(objDate.yy - _self.minY+'_'+isRm+'_'+objDate.mm);
        _self.gearDate.querySelector('.dateYY').setAttribute('val', objDate.yy - _self.minY)
        _self.gearDate.querySelector('.dateMM').setAttribute('val', objDate.mm - 1)
        _self.gearDate.querySelector('.dateDD').setAttribute('val', objDate.dd - 1)
      } else {
        _self.type = 0
        if (_self.trigger.getAttribute('data-fixed') === 'false') {
          let gongli = _self.gearDate.querySelector('.lcalendar_gongli')
          gongli.className = gongli.className.replace(/active/, '').replace(/(^\s*)|(\s*$)/g, '') + ' active'
        }
      }
      setDateGearTooth()
    }
    // 重置日期节点个数+设置日期
    function setDateGearTooth (isUpdate) {
      let passY = _self.maxY - _self.minY + 1
      let dateYY = _self.gearDate.querySelector('.dateYY')
      let yyVal = ''
      let itemStr = ''
      if (dateYY && dateYY.getAttribute('val')) {
        // 得到年份的值
        yyVal = parseInt(dateYY.getAttribute('val'))
        // p 当前节点前后需要展示的节点个数
        for (let p = 0; p <= passY - 1; p++) {
          itemStr += "<div class='tooth'>" + (_self.minY + p) + '</div>'
        }
        dateYY.innerHTML = itemStr
        if (isUpdate) {
          _self.yyScroll.update()
        }
      }
      let dateMM = _self.gearDate.querySelector('.dateMM')
      let maxM
      let mmVal
      if (dateMM && dateMM.getAttribute('val')) {
        itemStr = ''
        // 得到月份的值
        mmVal = parseInt(dateMM.getAttribute('val'))
        // 判断否有闰月
        let rmNum = calendar.LunarCal[yyVal].Intercalation ? calendar.LunarCal[yyVal].Intercalation : 0
        if (rmNum && _self.type) {
          maxM = 12
        } else {
          maxM = 11
        }
        let minM = 0
        // 当年份到达最大值
        if (yyVal === passY - 1) {
          if (_self.type) {
            maxM = _self.maxM - 1
          } else {
            maxM = _self.maxM - 1
          }
        }
        // 当年份到达最小值
        if (yyVal === 0) {
          if (_self.type) {
            minM = _self.minM - 1
          } else {
            minM = _self.minM
          }
        }
        // p 当前节点前后需要展示的节点个数
        for (let p = 0; p < maxM - minM + 1; p++) {
          let strVal = minM + p + 1
          // 农历
          if (_self.type) {
            // 闰月
            if (rmNum && rmNum === p) {
              strVal = calendar.getChinese('rm', strVal - 1)
            } else if (rmNum && rmNum < p) {
              strVal = calendar.getChinese('mm', strVal - 1)
            } else {
              strVal = calendar.getChinese('mm', strVal)
            }
          }
          itemStr += "<div class='tooth'>" + strVal + '</div>'
        }
        dateMM.innerHTML = itemStr
        if (mmVal > maxM) {
          mmVal = maxM
          dateMM.setAttribute('val', mmVal)
        } else if (mmVal < minM) {
          mmVal = maxM
          dateMM.setAttribute('val', mmVal)
        }

        if (isUpdate) {
          _self.mmScroll.update()
        }
      }
      let dateDD = _self.gearDate.querySelector('.dateDD')
      if (dateDD && dateDD.getAttribute('val')) {
        itemStr = ''
        // 得到日期的值
        let ddVal = parseInt(dateDD.getAttribute('val'))
        // 返回月份的天数
        let maxMonthDays = calendar.calcDays(_self.type, _self.minY, yyVal, mmVal)
        // p 当前节点前后需要展示的节点个数
        let maxD = maxMonthDays - 1
        let minD = 0
        // 当年份月份到达最大值
        if (yyVal === passY - 1 && mmVal + 1 === 12) {
          if (_self.type) {
            maxD = _self.maxD - 15
          } else {
            maxD = _self.maxD - 1
          }
        }
        // 当年、月到达最小值
        if (yyVal === 0 && mmVal + 1 === 2) {
          if (_self.type) {
            minD = _self.minD - 1
          } else {
            minD = _self.minD + 6
          }
        }
        for (let p = 0; p < maxD - minD + 1; p++) {
          let strVal = _self.type ? calendar.getChinese('dd', minD + p + 1) : (minD + p + 1)
          itemStr += "<div class='tooth'>" + strVal + '</div>'
        }
        dateDD.innerHTML = itemStr
        if (ddVal > maxD) {
          ddVal = maxD
          dateDD.setAttribute('val', ddVal)
        } else if (ddVal < minD) {
          ddVal = minD
          dateDD.setAttribute('val', ddVal)
        }
        if (isUpdate) {
          _self.ddScroll.update()
        }
      }

      let dateHH = _self.gearDate.querySelector('.dateHH')
      if (dateHH && dateHH.getAttribute('val')) {
        itemStr = ''
        for (let p = 0; p < 24; p++) {
          let strVal = _self.type ? calendar.getChinese('hh', p) : (p < 10 ? '0' + p : p)
          itemStr += "<div class='tooth'>" + strVal + '时</div>'
        }
        dateHH.innerHTML = itemStr
        if (isUpdate) {
          _self.hhScroll.update()
        }
      }

      let dateMin = _self.gearDate.querySelector('.dateMin')
      if (dateMin && dateMin.getAttribute('val')) {
        itemStr = ''
        for (let p = 0; p < 60; p++) {
          let strVal = (p < 10 ? '0' + p : p)
          itemStr += "<div class='tooth'>" + strVal + '分</div>'
        }
        dateMin.innerHTML = itemStr
        if (isUpdate) {
          _self.minScroll.update()
        }
      }
      getCalendarDate()// 设置日期
    }
    // 补零
    function addZero (i) {
      return i < 10 ? '0' + i : '' + i
    }
    // 取消 type 判断是不是点击完成后调用
    function closeMobileCalendar (e, type) {
      let btnFinish = _self.gearDate.querySelector('.lcalendar_finish')
      let btnCancel = _self.gearDate.querySelector('.lcalendar_cancel')
      e.preventDefault()
      // 判断是否在等待确认状态
      if (btnFinish.getAttribute('data-isconfirm') - 0 && !type) {
        // 设置日期
        getCalendarDate()
        btnFinish.setAttribute('data-isconfirm', 0)
        _self.gearDate.querySelector('.date_choice_wrap').style.display = 'block'
        _self.gearDate.querySelector('.date_confirm_wrap').style.display = 'none'
        // 设置文案
        btnFinish.innerHTML = '完成'
        btnCancel.innerHTML = '取消'
        return false
      }
      if (typeof window.CustomEvent === 'function') {
        let evt = new CustomEvent('input')
        _self.trigger.dispatchEvent(evt)
      }
      document.body.removeChild(_self.gearDate)
      // _self.trigger.parentElement.removeChild(_self.gearDate);
    }
    // 日期确认
    function finishMobileDate (e) {
      let d = getCalendarDate()
      let btnFinish = _self.gearDate.querySelector('.lcalendar_finish')
      let btnCancel = _self.gearDate.querySelector('.lcalendar_cancel')
      // 判断是否在等待确认状态
      if (!(btnFinish.getAttribute('data-isconfirm') - 0) && _self.trigger.getAttribute('data-confirm') === 'true') {
        let topInfo = _self.gearDate.querySelector('.lcalendar_info')
        let confirmNongli = _self.gearDate.querySelector('.confirm_nongli')
        let confirmGongli = _self.gearDate.querySelector('.confirm_gongli')
        _self.gearDate.querySelector('.date_choice_wrap').style.display = 'none'
        _self.gearDate.querySelector('.date_confirm_wrap').style.display = 'block'
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
      let dateId = _self.trigger.getAttribute('data-toid-date')
      let hourId = _self.trigger.getAttribute('data-toid-hour')
      let minId = _self.trigger.getAttribute('data-toid-min')
      let typeId = _self.trigger.getAttribute('data-toid-type')
      if (dateId) {
        let dateEl = document.getElementById(dateId)
        _self.trigger.setAttribute('data-date', d.yy + '-' + d.mm + '-' + d.dd)
        dateEl.value = d.yy + '-' + d.mm + '-' + d.dd
        // 触发MIP事件
        MIP.viewer.eventAction.execute('change', dateEl, {value: dateEl.value, date2: addZero(d.mm) + addZero(d.dd)})
      }
      if (hourId) {
        let hourEl = document.getElementById(hourId)
        let strVal = (d.hh < 10 ? '0' + d.hh : d.hh)
        hourEl.value = strVal
        _self.trigger.setAttribute('data-hour', strVal)
        // 触发MIP事件
        MIP.viewer.eventAction.execute('change', hourEl, {value: hourEl.value})
      }
      if (minId) {
        let minEl = document.getElementById(minId)
        let strVal = (d.min < 10 ? '0' + d.min : d.min)
        minEl.value = strVal
        _self.trigger.setAttribute('data-min', strVal)
        // 触发MIP事件
        MIP.viewer.eventAction.execute('change', minEl, {value: minEl.value})
      }
      if (typeId) { document.getElementById(typeId).value = _self.type }
      if (dateId) {
        let hourStr = ''
        if (_self.type) {
          let mmChina = d._mm < 0 ? calendar.getChinese('rm', -d._mm) : calendar.getChinese('mm', d._mm)
          if (hourId) {
            hourStr = calendar.getChinese('hh', d.hh) + '时'
          }
          _self.trigger.value = d._yy + '年' + mmChina + '' + calendar.getChinese('dd', d._dd) + ' ' + hourStr
        } else {
          if (hourId) {
            hourStr = d.hh + '时'
          }
          _self.trigger.value = d.yy + '年' + d.mm + '月' + d.dd + '日 ' + hourStr
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
        _self.trigger.value = hourStr + minStr
      }
      // 触发MIP事件
      MIP.viewer.eventAction.execute('change', _self.mipEl)
      closeMobileCalendar(e, 'finish')
    }
    // 设置顶部日期+设置确认框数据+返回对象 _yy 农历年  yy公历年
    function getCalendarDate () {
      // 判断是否启用日期
      let dateOn = _self.gearDate.querySelector('.dateYY') ? 1 : 0
      // 判断是否启用时辰
      let hourOn = _self.gearDate.querySelector('.dateHH') ? 1 : 0
      // 判断是否启用分钟
      let minOn = _self.gearDate.querySelector('.dateMin') ? 1 : 0
      if (dateOn) {
        let passY = _self.maxY - _self.minY + 1
        let valYY = parseInt(Math.round(_self.gearDate.querySelector('.dateYY').getAttribute('val')))
        let dateYY = valYY % passY + _self.minY
        let dateMM = parseInt(Math.round(_self.gearDate.querySelector('.dateMM').getAttribute('val'))) + 1
        let dateDD = parseInt(Math.round(_self.gearDate.querySelector('.dateDD').getAttribute('val'))) + 1
        let dateHH = ''
        if (hourOn) {
          dateHH = parseInt(Math.round(_self.gearDate.querySelector('.dateHH').getAttribute('val')))
        }
        // 判断否有闰月
        let rmNum = calendar.LunarCal[valYY].Intercalation ? calendar.LunarCal[valYY].Intercalation : 0
        if (_self.type && rmNum) {
          if (rmNum === (dateMM - 1)) {
            dateMM = -(dateMM - 1)
          } else if (rmNum < (dateMM - 1)) {
            dateMM = dateMM - 1
          }
        }
        let objDate = calendar.calendarConvert(_self.type, dateYY, dateMM, dateDD)
        let info = _self.gearDate.querySelector('.lcalendar_info')
        if (_self.type) {
          _self.trigger.setAttribute('data-type', 1)
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
          _self.trigger.setAttribute('data-type', 0)
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
          dateHH = parseInt(Math.round(_self.gearDate.querySelector('.dateHH').getAttribute('val')))
        }
        if (minOn) {
          dateMin = parseInt(Math.round(_self.gearDate.querySelector('.dateMin').getAttribute('val')))
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
    // 判断移动端
    let isMove = false
    let startTime = 0
    if ('ontouchstart' in window) {
      // 判断移动的点击事件tap操作
      _self.trigger.addEventListener('touchstart', function (e) {
        startTime = Date.now()
      })
      _self.trigger.addEventListener('touchmove', function (e) {
        isMove = true
      })
      _self.trigger.addEventListener('touchend', function (e) {
        /* 判读  是否满足tap 的要求  一般要求tap的响应时间150 */
        if (!isMove && (Date.now() - startTime) < 150) {
          e.preventDefault()
          popupDate()
        }
        /* 重置 参数 */
        isMove = false
        startTime = 0
      })
    } else {
      _self.trigger.addEventListener('click', function () {
        popupDate()
      })
    }
    initTriger()
  }
}

export default class MIPExample extends MIP.CustomElement {
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
