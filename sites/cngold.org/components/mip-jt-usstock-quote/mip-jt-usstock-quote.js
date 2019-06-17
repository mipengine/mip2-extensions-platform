export default class MIPJtUsstockQuote extends MIP.CustomElement {
  build () {
    let code = this.element.getAttribute('code')
    let ids = this.element.getAttribute('ids')
    let fetchUrl = 'https://api.jijinhao.com/quoteCenter/realTime.htm?codes=' + code

    // 定义$函数
    function $ (str) {
      return document.getElementById(str)
    }
    // 格式化数据--保留小数位数
    function format (s, n) {
      if (s !== null || s !== undefined) {
        if (n === 0) {
          let temp = Math.round(s)
          if (temp === 'NaN.undefined') {
            temp = s
          }
          return temp
        } else {
          n = n >= 0 && n <= 20 ? n : 2
          s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
          let l = s.split('.')[0].split('').reverse()
          let r = s.split('.')[1]
          let t = ''
          for (let i = 0; i < l.length; i++) {
            t += l[i]
          }
          return t.split('').reverse().join('') + '.' + r
        }
      } else {
        return '-'
      }
    }
    // 格式化日期
    function formatTime (time, fmt) {
      time = new Date(time)
      let o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        'S': time.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
    // 获取类名
    function getColor (valueType, preCloseType, data) {
      let value = data[valueType]
      let preClose = data[preCloseType]
      value = parseFloat(value)
      preClose = parseFloat(preClose)
      if (value === undefined || preClose === undefined || isNaN(value) || isNaN(preClose)) {
        return ''
      }
      if (value > preClose) {
        return 'up'
      } else if (value < preClose) {
        return 'down'
      }
    }

    let idsArr = ids.split(',')
    // 获取行情数据
    fetch(fetchUrl).then(function (res) {
      return res.text()
    }).then(function (result) {
      if (result) {
        let data = JSON.parse(result.split('=')[1])[code]
        if (data !== undefined) {
          for (let i = 0; i < idsArr.length; i++) {
            let type = idsArr[i]
            let id = code + '_' + type
            let valueStr = ''
            let textColor = ''

            if (type === 'q80') {
              valueStr = format(data[type], 2) + '%'
              if (data[type] > 0) {
                textColor = 'up'
              } else {
                textColor = 'down'
              }
              if (textColor) {
                $(code + '_q63').classList.add(textColor)
                $(code + '_q70').classList.add(textColor)
              }
            }
            if (type === 'q63') {
              valueStr = data[type]
            }
            if (type === 'q70' || type === 'q2') {
              valueStr = format(data[type], 2)
            }
            if (type === 'q1' || type === 'q3' || type === 'q4') {
              valueStr = format(data[type], 2)
              textColor = getColor(type, 'q2', data)
            }
            if (type === 'time') {
              valueStr = '更新时间：' + formatTime(data.time, 'yyyy-MM-dd hh:mm:ss')
            }
            $(id).innerHTML = valueStr
            if (textColor) {
              $(id).classList.add(textColor)
            }
          }
        }
      }
    })
  }
}
