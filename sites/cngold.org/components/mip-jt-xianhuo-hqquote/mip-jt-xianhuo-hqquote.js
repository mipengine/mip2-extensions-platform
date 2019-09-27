export default class MIPJtXianhuoHqquote extends MIP.CustomElement {
  build () {
    let code = this.element.getAttribute('code')
    let pageSize = this.element.getAttribute('pageSize')
    let unit = this.element.getAttribute('unit') ? this.element.getAttribute('unit') : '--'

    let fetchUrl = `https://api.jijinhao.com/history/quote.htm?codes=${code}&pageSize=${pageSize}&style=3&currentPage=1`
    fetch(fetchUrl).then((res) => {
      return res.json()
    }).then((data) => {
      if (data && data.length > 0) {
        let html = ''
        let flag = 0// 判断添加表头的位置
        data.forEach(function (val, i) {
          let quoteData = val.data
          for (let j = 0; j < quoteData.length; j++) {
            let quote = quoteData[j].quote
            if (!quote) {
              continue
            }
            let tempCode = quote.q124
            if (tempCode !== code) {
              continue
            }

            if (flag === 0) {
              html += '<tr><th>规格</th>' +
                '<th>日期</th>' +
                '<th>报价</th>' +
                '<th>单位</th>' +
                '<th>产地</th>' +
                '<th>涨跌</th></tr>'
              flag = 1
            }
            html += '<tr>' +
              '<td>' + (quote.q68 ? quote.q68 : '--') + '</td>' +
              '<td class="num">' + (quote.q59 ? quote.q59.substring(0, 10) : '--') + '</td>' +
              '<td class="num">' + (quote.q63 ? Number(quote.q63).toFixed(2) : '--') + '</td>' +
              '<td>' + unit + '</td>' +
              '<td>全国</td>'
            let q80 = quote.q80
            if (q80 === undefined) {
              html += '<td><em>--</em></td>'
            } else if (q80 < 0) {
              html += '<td><em class="red">' + Number(-q80).toFixed(2) + '%</em></td>'
            } else if (q80 > 0) {
              html += '<td><em class="green">' + Number(q80).toFixed(2) + '%</em></td>'
            } else {
              html += '<td><em>' + Number(q80).toFixed(2) + '%</em></td>'
            }
            html += '</tr>'
          }
        })
        this.element.querySelector('#realtime_quote_asia').innerHTML = html
        // 当日价格
        this.element.querySelector('#recentQuotation').innerHTML = Number(data[0].data[0].quote.q63).toFixed(2)
        // 日期
        this.element.querySelector('#recentDate').innerHTML = data[0].data[0].quote.q59.substring(0, 10)
      } else {
        // 当日价格
        this.element.querySelector('#recentQuotation').innerHTML = '--'
        // 日期
        this.element.querySelector('#recentDate').innerHTML = '--'
      }
    })
  }
}
