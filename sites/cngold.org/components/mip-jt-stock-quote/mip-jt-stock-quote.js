import './index.less'

export default class MIPJtStockQuote extends MIP.CustomElement {
  build () {
    let codes = this.element.getAttribute('codes')
    let codeArray = codes.split(',')
    let fetchUrl = 'https://api.jijinhao.net/realtime/quote.htm?codes=' + codes + '&_=' + new Date().getTime()
    let ids = this.element.getAttribute('ids')
    let idArray = ids.split(',')

    let bg = this.element.getAttribute('bg')

    if (document.getElementById('reLoad')) { // 刷新行情
      document.getElementById('reLoad').addEventListener('onclick', loadQuote)
    }
    // 获取数据
    loadQuote()

    // 用于判断类名
    let specalColorMap = {
      'q70': ['q63', 'q2'],
      'q80': ['q63', 'q2']
    }
    let colorSet = {
      'q1': true,
      'q3': true,
      'q4': true,
      'q63': true,
      'q5': true,
      'q6': true,
      'q9': true,
      'q10': true,
      'q13': true,
      'q14': true,
      'q17': true,
      'q18': true,
      'q21': true,
      'q22': true,
      'q27': true,
      'q28': true,
      'q73': true,
      'q74': true,
      'q83': true,
      'q84': true,
      'q85': true,
      'q86': true,
      'q2': true
    }

    // 基本用法
    function loadQuote () {
      fetch(fetchUrl).then(function (res) {
        return res.text()
      }).then(function (text) {
        let data = JSON.parse(text)[0]
        if (data.data) {
          for (let i = 0; i < data.data.length; i++) {
            for (let j = 0; j < idArray.length; j++) {
              let id = codeArray[i] + '_' + idArray[j]
              let digits = 2
              let type = idArray[j]
              let jsonData = data.data[i].quote
              let valueStr
              let textColor

              if (type === 'q59' || type === 'q67') {
                valueStr = jsonData[type]
                if (type === 'q59' && bg === '1' && jsonData[type].indexOf('14:59:') > 0) { // 是否显示已收盘
                  document.getElementById('sp').style.display = 'block'
                }
              } else {
                if (colorSet[type]) {
                  textColor = getColor(type, 'q2', jsonData)
                } else if (specalColorMap[type] !== undefined) {
                  textColor = getColor('q63', 'q2', jsonData)
                }

                if (colorSet[type]) {
                  valueStr = format(jsonData[type], digits)
                } else if (type === 'q70') {
                  valueStr = format(jsonData.q70, digits)
                } else if (type === 'q80') {
                  valueStr = format(jsonData.q80, 2) + '%'
                } else {
                  valueStr = parseFloat(jsonData[type]).toFixed(2)
                }
              }

              if (bg !== '1') {
                document.getElementById(id).classList.add(textColor)
              }
              document.getElementById(id).innerHTML = valueStr
            }
          }
          // 需要背景色
          if (data.data.length === 1 && bg === '1') {
            if (Number(data.data[0].quote.q80) > 0) {
              document.getElementById('showBg').classList.remove('bg_green')
              document.getElementById('showBg').classList.add('bg_red')
            }
          }
        }
      })
    }

    // 格式化数据--保留小数位数
    function format (s, n) {
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
        return 'red'
      } else if (value < preClose) {
        return 'green'
      }
    }
  }
}
