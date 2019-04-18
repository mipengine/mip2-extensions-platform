export default class MIPJtXianhuoQuote extends MIP.CustomElement {
  build () {
    let codes = this.element.getAttribute('codes')

    let fetchUrl = 'https://api.jijinhao.com/realtime/quote.htm?codes=' + codes + '&currentPage=1&pageSize=1'
    let number = 2
    let isArrows = false
    let suffix = ''
    let style = ''

    let tableArray = ['q67', 'q69', 'q63', 'q60', 'q61', 'q70', 'q80', 'q1', 'q2', 'q3', 'q4', 'q73', 'q74', 'q76', 'q77', 'q59']
    // 定义$函数
    function $ (str) {
      return document.getElementsByClassName(str)
    }
    // 内容填充
    function textWrite (eles, html) {
      for (let i = 0; i < eles.length; i++) {
        eles[i].innerHTML = html
      }
    }
    // 类名处理
    function classWrite (eles, method) {
      if (method === 'add') {
        for (let i = 0; i < eles.length; i++) {
          eles[i].classList.add(...arguments[2])
        }
      } else if (method === 'remove') {
        for (let i = 0; i < eles.length; i++) {
          eles[i].classList.remove(...arguments[2])
        }
      }
    }

    // 处理行情代码
    function escapeChar (code) {
      if (code.indexOf('.')) {
        code = code.replace(/\./g, '\\.')
      }
      if (code.indexOf('+')) {
        code = code.replace(/\+/g, '\\+')
      }
      if (code.indexOf(')')) {
        code = code.replace(/\)/g, '\\)')
      }
      if (code.indexOf('(')) {
        code = code.replace(/\(/g, '\\(')
      }
      return code
    }
    // 格式化数据
    function format (s, n) {
      n = n > 0 && n <= 20 ? n : 2
      s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
      let l = s.split('.')[0].split('').reverse()
      let r = s.split('.')[1]
      let t = ''
      for (let i = 0; i < l.length; i++) {
        t += l[i]
      }
      return t.split('').reverse().join('') + '.' + r
    }
    // 加载数据
    fetch(fetchUrl).then(function (result) {
      return result.json()
    }).then(function (res) {
      if (res !== undefined && res !== '') {
        for (let i = 0; i < res.length; i++) {
          let data = res[i].data
          for (let d = 0; d < data.length; d++) {
            if ('quote' in data[d]) {
              let quote = data[d].quote
              let code
              if ('q124' in quote) {
                code = escapeChar(quote.q124)
                let info = data[d].info
                for (let v = 0; v < info.length; v++) {
                  for (let o in info[v]) {
                    let okey = code + '_' + o
                    if ($(okey)) {
                      textWrite($(okey), info[v][o].value)
                    }
                  }
                }

                for (let a = 0; a < tableArray.length; a++) {
                  let uniqueId = code + '_' + tableArray[a] + suffix
                  let value = quote[tableArray[a]]
                  if (tableArray[a] === 'q61') {
                    value = (value / 10000).toFixed(2)
                  }
                  if (tableArray[a] === 'q59') { // 时间处理
                    if (value === undefined || value === '' || value === 0) {
                      if ($(uniqueId)) {
                        textWrite($(uniqueId), '--')
                      }
                      continue
                    }
                    let yyyy = value.substring(0, 4)
                    let mth = value.substring(5, 7)
                    let dd = value.substring(8, 10)
                    if ($(uniqueId)) {
                      textWrite($(uniqueId), yyyy + '-' + mth + '-' + dd)
                    }
                    continue
                  }

                  let upDown = quote.q70
                  let v = '--'
                  if (style !== undefined && style !== '') {
                    if (value === undefined || value === '' || value === 0) {
                      v = '--'
                    } else if (style.indexOf(tableArray[a]) >= 0 && upDown > 0) {
                      if (isArrows && tableArray[a] === 'q70') {
                        if (number !== 0) {
                          v = '<font color="red">' + format(value, number) + '↑</font>'
                        } else {
                          v = '<font color="red">' + parseInt(value, 10) + '↑</font>'
                        }
                      } else {
                        if (number !== 0) {
                          v = '<font color="red">' + format(value, number) + '</font>'
                        } else {
                          v = '<font color="red">' + parseInt(value, 10) + '</font>'
                        }
                      }
                    } else if (style.indexOf(tableArray[a]) >= 0 && upDown < 0) {
                      if (isArrows && tableArray[a] === 'q70') {
                        if (number !== 0) {
                          v = '<font color="green">' + format(value, number) + '↓</font>'
                        } else {
                          v = '<font color="green">' + parseInt(value, 10) + '↓</font>'
                        }
                      } else {
                        if (number !== 0) {
                          v = '<font color="red">' + format(value, number) + '</font>'
                        } else {
                          v = '<font color="red">' + parseInt(value, 10) + '</font>'
                        }
                      }
                    } else {
                      if (number !== 0) {
                        v = format(value, number)
                        v = parseFloat(value)
                        if (v === undefined || v === '' || v === 0) {
                          v = '--'
                        }
                      } else {
                        v = parseInt(value, 10)
                      }
                    }
                  } else {
                    if (v === undefined || v === '' || v === 0) {
                      v = '--'
                    } else {
                      if (number !== 0) {
                        v = format(value, number)
                        v = parseFloat(value)
                        if (v === undefined || v === '' || v === 0) {
                          v = '--'
                        }
                      } else {
                        v = parseInt(value, 10)
                      }
                    }
                  }

                  let vt = v
                  if (v === undefined || v === '' || v === 0) {
                    v = '--'
                    vt = 0
                  }
                  if (vt === '--') {
                    vt = 0
                  }
                  if (tableArray[a] === 'q80' && v !== '--') {
                    v = v + '%'
                  }
                  if ($(uniqueId)) {
                    textWrite($(uniqueId), v)
                  }
                  if ((tableArray[a] === 'q80' || tableArray[a] === 'q70') && $(uniqueId)) {
                    if (Number(vt) < 0) {
                      classWrite($(uniqueId), 'remove', ['red', 'per-red'])
                      classWrite($(uniqueId), 'add', ['green', 'per-green'])
                    } else {
                      classWrite($(uniqueId), 'add', ['red', 'per-red'])
                      classWrite($(uniqueId), 'remove', ['green', 'per-green'])
                    }
                  }
                }
              } else {
                continue
              }
            } else {
              continue
            }
          }
        }
      }
    })
  }
}
