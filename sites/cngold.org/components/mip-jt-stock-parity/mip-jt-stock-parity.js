import './index.less'

export default class MIPJtStockParity extends MIP.CustomElement {
  build () {
    let listNum = this.element.getAttribute('list-num')
    let listId = this.element.getAttribute('list-id')
    let tableId = this.element.getAttribute('table-id')
    let currentPage = 1
    let fetchUrl = 'https://m.cngold.org/stock/m_quote_compare_list_t' + listNum + '_p' + currentPage + '.html'

    try {
      fetch(fetchUrl).then(function (res) {
        return res.text()
      }).then(function (text) {
        let data = JSON.parse(text)
        if (data.flag) {
          let stockHtmlStr = ''
          let quoteHtmlStr = ''
          let codes = ''
          if (data.data && data.data.length > 0) {
            if (listNum === '3') { // AH股比价
              for (let i = 0; i < data.data.length; i++) {
                stockHtmlStr += '<a href="https://m.cngold.org/stock/m_' +  data.data[i].astockCode + '.html" class="blue '
                if (i % 2 === 1) {
                  stockHtmlStr += 'bj_gray'
                }
                stockHtmlStr += '"><p>' + data.data[i].astockName + '</p></a>'
                quoteHtmlStr += '<tr'
                if (i % 2 === 1) {
                  quoteHtmlStr += 'bj_gray'
                }
                quoteHtmlStr += '>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_' + data.data[i].astockCode + '.html">' + data.data[i].astockCode + '</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_' + data.data[i].astockCode + '.html" class="' + data.data[i].astockQuoCode + '_q63">--</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_' + data.data[i].astockCode + '.html" class="' + data.data[i].astockQuoCode + '_q80">--</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/hkstock/m_' + data.data[i].hstockCode + '.html">' + data.data[i].hstockCode + '</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/hkstock/m_' + data.data[i].hstockCode + '.html" class="' + data.data[i].hstockQuoCode + '_q63">--</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/hkstock/m_' + data.data[i].hstockCode + '.html" class="' + data.data[i].hstockQuoCode + '_q80">--</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/hkstock/m_' + data.data[i].hstockCode + '.html" class="' + data.data[i].hstockQuoCode + '_bj">--</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/hkstock/m_' + data.data[i].hstockCode + '.html" class="' + data.data[i].hstockQuoCode + '_yj">--</a></td>'
                  + '</tr>'
                codes += data.data[i].astockQuoCode
                  + ','
                  + data.data[i].hstockQuoCode
                  + ','
              }
            } else {
              for (let i = 0; i < data.data.length; i++) {
                stockHtmlStr += '<a href="https://m.cngold.org/stock/m_' +  data.data[i].astockCode + '.html" class="blue '
                if (i % 2 === 1) {
                  stockHtmlStr += 'bj_gray'
                }
                stockHtmlStr += '"><p>' + data.data[i].astockName + '<b>' + data.data[i].astockCode + '</b></p></a>'
                quoteHtmlStr += '<tr'
                if (i % 2 === 1) {
                  quoteHtmlStr += 'bj_gray'
                }
                quoteHtmlStr += '>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_' + data.data[i].astockCode + '.html" class="' + data.data[i].astockQuoCode + '_q63">--</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_' + data.data[i].astockCode + '.html" class="' + data.data[i].astockQuoCode + '_q80">--</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_' + data.data[i].bstockCode + '.html"><p class="blue">' + data.data[i].bstockName + '</p><p>' + data.data[i].bstockCode + '</p></a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_' + data.data[i].bstockCode + '.html" class="' + data.data[i].bstockQuoCode + '_q63">--</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_' + data.data[i].bstockCode + '.html" class="' + data.data[i].bstockQuoCode + '_q80">--</a></td>'
                  + '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_' + data.data[i].bstockCode + '.html" class="' + data.data[i].bstockQuoCode + '_bj">--</a></td>'
                  + '</tr>'
                codes += data.data[i].astockQuoCode
                  + ','
                  + data.data[i].bstockQuoCode
                  + ','
              }
            }
            if (listNum === '3') { // AH股比价
              document.getElementById(listId).innerHTML = '<span>名称</span>' + stockHtmlStr
            } else {
              document.getElementById(listId).innerHTML = '<span>A股名称</span>' + stockHtmlStr
            }
            document.getElementById(tableId).innerHTML = quoteHtmlStr

            let rateCode = 'JO_56303' // 港币人民币汇率--深证AB股比价、AH股比价使用
            if (listNum === '1') {
              rateCode = 'JO_56305' // 美元人民币汇率--上证AB股比价使用
            }
            codes += rateCode

            let codeUrl = 'https://api.jijinhao.net/quoteCenter/realTime.htm?codes=' + codes + '&dataType=json'
            fetch(codeUrl).then(function (res) {
              return res.text()
            }).then(function (text) {
              let codeData = JSON.parse(text)
              let quoteData = codeData[rateCode]
              let codeArr = codes.split(',')

              for (let i = 0; i < codeArr.length - 1; i++) {
                let data = codeData[codeArr[i]]
                document.getElementsByClassName(codeArr[i] + '_q63')[0].innerHTML = Number(data.q63).toFixed(2)
                document.getElementsByClassName(codeArr[i] + '_q80')[0].innerHTML = Number(data.q80).toFixed(2) + '%'
                if (Number(data.q80).toFixed(2) > 0) {
                  document.getElementsByClassName(codeArr[i] + '_q63')[0].classList.add('red')
                  document.getElementsByClassName(codeArr[i] + '_q80')[0].classList.add('red')
                } else if (Number(data.q80).toFixed(2) < 0) {
                  document.getElementsByClassName(codeArr[i] + '_q63')[0].classList.add('green')
                  document.getElementsByClassName(codeArr[i] + '_q80')[0].classList.add('green')
                }
                if (i % 2 === 1) {
                  let preData = codeData[codeArr[i-1]]
                  if (Number(data.q63) === 0) {
                    document.getElementsByClassName(codeArr[i] + '_bj')[0].innerHTML = '--'
                  } else {
                    document.getElementsByClassName(codeArr[i] + '_bj')[0].innerHTML = (Number(preData.q63) / (Number(data.q63) * Number(quoteData.q63))).toFixed(2)
                  }
                  if (listNum === '3') { // AH股比价--溢价
                    document.getElementsByClassName(codeArr[i] + '_yj')[0].innerHTML = (Number(preData.q63) - (Number(data.q63) * Number(quoteData.q63))).toFixed(2)
                  }
                }
              }
            })
          }
        }
      })
    } catch (e) {
      console.error('获取数据错误异常' + e)
      return
    }
  }
}
