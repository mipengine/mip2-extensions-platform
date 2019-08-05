export default class MIPJtCangQuote extends MIP.CustomElement {
  build () {
    let codes = this.element.getAttribute('codes')
    let isMore = this.element.getAttribute('is-more')

    // 定义$函数--通过类名获取元素
    function $ (str) {
      return document.getElementsByClassName(str)
    }
    // 通过id名获取元素
    function idEle (str) {
      return document.getElementById(str)
    }

    if (!isMore) {
      getQuote(codes)
    } else {
      let firstLi = idEle('type_ul').children[0]
      moreQuote(firstLi.innerHTML, firstLi.getAttribute('data-value'))

      idEle('quote_more').addEventListener('click', function () {
        if (idEle('type_ul').style.display === 'none') {
          idEle('type_ul').style.display = 'block'
        } else {
          idEle('type_ul').style.display = 'none'
        }
      })
      idEle('type_ul').addEventListener('click', function (e) {
        let target = e.target || e.srcElement
        if (target.nodeName.toLowerCase() === 'li') {
          moreQuote(target.innerHTML, target.getAttribute('data-value'))
        }
      })
    }

    // 内容填充
    function textWrite (eles, html) {
      if (eles) {
        for (let i = 0; i < eles.length; i++) {
          eles[i].innerHTML = html
        }
      }
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
    // 类名处理
    function classWrite (eles, method, className) {
      if (method === 'add') {
        for (let i = 0; i < eles.length; i++) {
          eles[i].classList.add(className)
        }
      } else if (method === 'remove') {
        for (let i = 0; i < eles.length; i++) {
          eles[i].classList.remove(className)
        }
      }
    }
    // 获取行情数据
    function getQuote (codes) {
      let fetchUrl = 'https://api.jijinhao.net/quoteCenter/realTime.htm?codes=' + codes
      fetch(fetchUrl).then(function (res) {
        return res.text()
      }).then(function (result) {
        result = JSON.parse(result.split('=')[1])
        let codeArr = codes.split(',')
        if (result) {
          for (let i = 0; i < codeArr.length; i++) {
            let data = result[codeArr[i]]
            let flag = false// 用于判断添加什么类名
            if (data.q80 !== undefined && !isNaN(data.q80)) {
              textWrite($(codeArr[i] + '_' + 'q80'), format(data.q80, 2) + '%')
              if (data.q80 > 0) {
                flag = true
              }
            } else {
              textWrite($(codeArr[i] + '_' + 'q80'), '-')
            }

            if (data.q2 !== undefined) {
              textWrite($(codeArr[i] + '_' + 'q2'), format(data.q2, 2))
              if (data.q1 !== undefined) {
                textWrite($(codeArr[i] + '_' + 'q1'), format(data.q1, 2))
                if (data.q1 * 1000 > data.q2 * 1000) {
                  classWrite($(codeArr[i] + '_' + 'q1'), 'add', 'red')
                } else if (data.q1 * 1000 < data.q2 * 1000) {
                  classWrite($(codeArr[i] + '_' + 'q1'), 'add', 'green')
                }
              } else {
                textWrite($(codeArr[i] + '_' + 'q1'), '-')
              }

              if (data.q3 !== undefined) {
                textWrite($(codeArr[i] + '_' + 'q3'), format(data.q3, 2))
                if (data.q3 * 1000 > data.q2 * 1000) {
                  classWrite($(codeArr[i] + '_' + 'q3'), 'add', 'red')
                } else if (data.q3 * 1000 < data.q2 * 1000) {
                  classWrite($(codeArr[i] + '_' + 'q3'), 'add', 'green')
                }
              } else {
                textWrite($(codeArr[i] + '_' + 'q3'), '-')
              }

              if (data.q4 !== undefined) {
                textWrite($(codeArr[i] + '_' + 'q4'), format(data.q4, 2))
                if (data.q4 * 1000 > data.q2 * 1000) {
                  classWrite($(codeArr[i] + '_' + 'q4'), 'add', 'red')
                } else if (data.q4 * 1000 < data.q2 * 1000) {
                  classWrite($(codeArr[i] + '_' + 'q4'), 'add', 'green')
                }
              } else {
                textWrite($(codeArr[i] + '_' + 'q4'), '-')
              }
            } else {
              textWrite($(codeArr[i] + '_' + 'q2'), '-')
              if (data.q1 !== undefined) {
                textWrite($(codeArr[i] + '_' + 'q1'), format(data.q1, 2))
              } else {
                textWrite($(codeArr[i] + '_' + 'q1'), '-')
              }

              if (data.q3 !== undefined) {
                textWrite($(codeArr[i] + '_' + 'q3'), format(data.q3, 2))
              } else {
                textWrite($(codeArr[i] + '_' + 'q3'), '-')
              }

              if (data.q4 !== undefined) {
                textWrite($(codeArr[i] + '_' + 'q4'), format(data.q4, 2))
              } else {
                textWrite($(codeArr[i] + '_' + 'q4'), '-')
              }
            }

            if (data.q60 !== undefined) {
              textWrite($(codeArr[i] + '_' + 'q60'), parseInt(data.q60, 10))
            } else {
              textWrite($(codeArr[i] + '_' + 'q60'), '-')
            }
            if (data.q61 !== undefined) {
              textWrite($(codeArr[i] + '_' + 'q61'), parseInt(data.q61, 10))
            } else {
              textWrite($(codeArr[i] + '_' + 'q61'), '-')
            }
            if (data.q63 !== undefined) {
              textWrite($(codeArr[i] + '_' + 'q63'), parseInt(data.q63, 10))
            } else {
              textWrite($(codeArr[i] + '_' + 'q63'), '-')
            }
            if (data.q70 !== undefined) {
              textWrite($(codeArr[i] + '_' + 'q70'), format(data.q70, 2))
            } else {
              textWrite($(codeArr[i] + '_' + 'q70'), '-')
            }
            if (data.q59 !== undefined) {
              textWrite($(codeArr[i] + '_' + 'q59'), data.q59.split(0, 10))
            } else {
              textWrite($(codeArr[i] + '_' + 'q59'), '-')
            }

            if (flag) {
              classWrite($(codeArr[i] + '_' + 'q63'), 'add', 'red')
              classWrite($(codeArr[i] + '_' + 'q70'), 'add', 'red')
              classWrite($(codeArr[i] + '_' + 'q80'), 'add', 'red')
            } else {
              classWrite($(codeArr[i] + '_' + 'q63'), 'add', 'green')
              classWrite($(codeArr[i] + '_' + 'q70'), 'add', 'green')
              classWrite($(codeArr[i] + '_' + 'q80'), 'add', 'green')
            }
          }
        }
      })
    }

    function moreQuote (name, code) {
      let fetchUrl = 'https://api.jijinhao.net/quoteCenter/realTime.htm?codes=' + code
      fetch(fetchUrl).then(function (res) {
        return res.text()
      }).then(function (result) {
        result = JSON.parse(result.split('=')[1])
        if (result) {
          let data = result[code]
          if (data !== undefined) {
            idEle('quote_code').innerHTML = data.showCode
            idEle('quote_q1').innerHTML = data.q1
            idEle('quote_q2').innerHTML = data.q2
            idEle('quote_q3').innerHTML = data.q3
            idEle('quote_q4').innerHTML = data.q4
            idEle('quote_q60').innerHTML = data.q60
            idEle('quote_q61').innerHTML = data.q61

            if (data.q2 !== undefined) {
              textWrite(idEle('quote_q2'), format(data.q2, 2))
              if (data.q1 !== undefined) {
                textWrite(idEle('quote_q1'), format(data.q1, 2))
                if (data.q1 * 1000 > data.q2 * 1000) {
                  classWrite(idEle('quote_q1'), 'add', 'red')
                } else if (data.q1 * 1000 < data.q2 * 1000) {
                  classWrite(idEle('quote_q1'), 'add', 'green')
                }
              } else {
                textWrite(idEle('quote_q1'), '-')
              }

              if (data.q3 !== undefined) {
                textWrite(idEle('quote_q3'), format(data.q3, 2))
                if (data.q3 * 1000 > data.q2 * 1000) {
                  classWrite(idEle('quote_q3'), 'add', 'red')
                } else if (data.q3 * 1000 < data.q2 * 1000) {
                  classWrite(idEle('quote_q3'), 'add', 'green')
                }
              } else {
                textWrite(idEle('quote_q3'), '-')
              }

              if (data.q4 !== undefined) {
                textWrite(idEle('quote_q4'), format(data.q4, 2))
                if (data.q4 * 1000 > data.q2 * 1000) {
                  classWrite(idEle('quote_q4'), 'add', 'red')
                } else if (data.q4 * 1000 < data.q2 * 1000) {
                  classWrite(idEle('quote_q4'), 'add', 'green')
                }
              } else {
                textWrite(idEle('quote_q4'), '-')
              }
            } else {
              textWrite(idEle('quote_q2'), '-')
              if (data.q1 !== undefined) {
                textWrite(idEle('quote_q1'), format(data.q1, 2))
              } else {
                textWrite(idEle('quote_q1'), '-')
              }

              if (data.q3 !== undefined) {
                textWrite(idEle('quote_q3'), format(data.q3, 2))
              } else {
                textWrite(idEle('quote_q3'), '-')
              }

              if (data.q4 !== undefined) {
                textWrite(idEle('quote_q4'), format(data.q4, 2))
              } else {
                textWrite(idEle('quote_q4'), '-')
              }
            }

            idEle('quote_name').innerHTML = name
            idEle('type_ul').style.display = 'none'
          }
        }
      })
    }
  }
}
