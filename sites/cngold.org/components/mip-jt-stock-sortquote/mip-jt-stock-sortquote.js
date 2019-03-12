import './index.less'

export default class MIPJtStockSortquote extends MIP.CustomElement {
  build () {
    let categoryId = this.element.getAttribute('category-id')
    let containerId = this.element.getAttribute('container-id')
    let listId = this.element.getAttribute('list-id')
    let pageSize = this.element.getAttribute('page-size')
    let type = this.element.getAttribute('type')

    let ids = this.element.getAttribute('ids')
    let idArray = ids.split(',')

    let fetchUrl = 'https://api.jijinhao.net/sortQuote/categorySort.htm?categoryIds=' + categoryId + '&currentPage=1&pageSize=' + pageSize
    if (categoryId.indexOf(',') === -1) { // 单独查询
      fetchUrl = 'https://api.jijinhao.net/sortQuote/categorySort.htm?categoryId=' + categoryId + '&currentPage=1&pageSize=' + pageSize
    }

    if (type === 'list') {
      tableData()
    } else if (type === 'index' || type === 'detail') {
      divData()
    }

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

    // 获取首页、详情页数据
    function divData () {
      fetch(fetchUrl).then(function (res) {
        return res.text()
      }).then(function (text) {
        let data = JSON.parse(text)[0]
        if (data.data) {
          let html = ''
          for (let i = 0; i < data.data.length; i++) {
            let quote = data.data[i].quote
            if (type === 'detail') { // 详情页名称下显示相应股票代码
              html += '<dl class="clearfix">' +
                '<dd class="first"><a href="https://m.cngold.org/stock/m_zs' +
                quote.q68 + '.html" title="' +
                quote.q67 + '">' +
                '<p>' + quote.q67 + '</p><em>' +
                quote.q68 + '</em></a></dd>'
            } else {
              if (categoryId === '442') { // 沪深指数
                html += '<dl class="clearfix mglr30">' +
                  '<dd class="w26"><a href="https://m.cngold.org/stock/m_zs' +
                  quote.q68 + '.html" title="' +
                  quote.q67 + '" class="blue mc">' +
                  quote.q67 + '</a></dd>'
              } else {
                html += '<dl class="clearfix mglr30">' +
                  '<dd class="w26"><a href="https://m.cngold.org/stock/m_' +
                  quote.q68 + '.html" title="' +
                  quote.q67 + '" class="blue mc">' +
                  quote.q67 + '</a></dd>'
              }
            }

            for (let j = 0; j < idArray.length; j++) {
              let digits = 2
              let type = idArray[j]
              let jsonData = data.data[i].quote
              let valueStr
              let textColor

              if (type === 'q59') {
                valueStr = jsonData.q59
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
              html += '<dd class="' + textColor + '">' + valueStr + '</dd>'
            }
            html += '</dl>'
          }
          document.getElementById(containerId).innerHTML = html
        }
      })
    }

    // 获取列表页数据
    function tableData () {
      fetch(fetchUrl).then(function (res) {
        return res.text()
      }).then(function (text) {
        let data = JSON.parse(text)[0]
        let stockHtmlStr = ''
        let quoteHtmlStr = ''
        if (data.data) {
          for (let i = 0; i < data.data.length; i++) {
            let quote = data.data[i].quote
            if (categoryId === '442') { // 沪深指数
              stockHtmlStr += '<a href="https://m.cngold.org/stock/m_zs' + quote.q68 + '.html" class="blue '
            } else {
              stockHtmlStr += '<a href="https://m.cngold.org/stock/m_' + quote.q68 + '.html" class="blue '
            }
            if (i % 2 === 1) {
              stockHtmlStr += 'bj_gray'
              quoteHtmlStr += '<tr class="bj_gray">'
            } else {
              quoteHtmlStr += '<tr>'
            }
            stockHtmlStr += '"><p>' + quote.q67 + '<b>' + quote.q68 + '</b></p></a>'

            for (let j = 0; j < idArray.length; j++) {
              let digits = 2
              let type = idArray[j]
              let jsonData = data.data[i].quote
              let valueStr
              let textColor

              if (type === 'q59') {
                valueStr = jsonData.q59
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

              if (categoryId === '442') { // 沪深指数
                quoteHtmlStr += '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_zs' +
                  quote.q68 + '.html" class="' + textColor + '">' + valueStr + '</a></td>'
              } else {
                quoteHtmlStr += '<td align="center" valign="middle" class="sjhq_td1"><a href="https://m.cngold.org/stock/m_' +
                  quote.q68 + '.html" class="' + textColor + '">' + valueStr + '</a></td>'
              }
            }
            quoteHtmlStr += '</tr>'
          }
          document.getElementById(listId).innerHTML = '<span>股票名称</span>' + stockHtmlStr
          document.getElementById(containerId).innerHTML = quoteHtmlStr
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
