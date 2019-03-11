import './index.less'

export default class MIPJtStockBillboard extends MIP.CustomElement {
  build () {
    loadBillboard(0, 'all', 1, '', '') // 全部龙虎榜
    loadBillboard(1, 'hushi', 1, '', '') // 沪市龙虎榜
    loadBillboard(2, 'shenshi', 1, '', '') // 深市龙虎榜

    // 获取榜单数据
    function loadBillboard (arg, tagId, pageNo, startDate, endDate) {
      let cont = ''
      if (startDate === 0) {
        startDate = ''
      }
      if (endDate === 0) {
        endDate = ''
      }

      if (startDate !== null && startDate !== 0 && startDate !== '') {
        cont = cont + 'T' + startDate
      } else {
        cont = cont + 'T' + 0
      }

      if (endDate !== null && endDate !== 0 && endDate !== '') {
        cont = cont + 'T' + endDate
      } else {
        cont = cont + 'T' + 0
      }
      cont = cont + 'T' + arg + 'T' + pageNo

      let fetchUrl = 'https://m.cngold.org/stock/m_info_lhbd_ajax_' + cont + '.htm'
      fetch(fetchUrl).then(function (res) {
        return res.text()
      }).then(function (text) {
        let data = JSON.parse(text)
        if (data.flag) {
          let stockName = '<span>股票名称</span>'
          let html = ''

          // 先清空
          document.getElementById(tagId + '1').innerHTML = ''
          document.getElementById(tagId + '2').innerHTML = ''
          if (data.data.result !== null && data.data.result.length > 0) {
            for (let i = 0; i < data.data.result.length; i++) {
              stockName += objGpmc(i, data.data.result[i]) // 股票名称
              html += objGpsj(i, data.data.result[i]) // 龙虎榜数据
            }
          }
          document.getElementById(tagId + '1').innerHTML = stockName
          document.getElementById(tagId + '2').innerHTML = html
        }
      })
    }

    // 股票名称处理
    function objGpmc (index, obj) {
      let detailUrl = ''
      if (obj.stockCode !== null || obj.stockCode !== '') {
        detailUrl = 'https://m.cngold.org/stock/m_' + obj.stockCode + '.html'
      }

      let html = '<a class="blue'
      if (index % 2 === 1) {
        html += ' bj_gray'
      }
      html += '" href="' + detailUrl + '"><p>' + obj.stockName + '<b>' + obj.stockCode + '</b></p></a>'
      return html
    }

    // 榜单数据处理
    function objGpsj (index, obj) {
      let html = ''
      html += '<tr'
      if (index % 2 === 1) {
        html += 'class="bj_gray"'
      }
      html += '>' +
        '<td align="center" valign="middle" class="sjhq_td1"><p class="jd">' + obj.unscramble + '</p></td>' +
        '<td align="center" valign="middle" class="sjhq_td1">' + obj.closePrice + '</td>' +
        '<td align="center" valign="middle" class="sjhq_td1"><font color="'
      if (Number(obj.chgPercent) >= 0) {
        html += 'red">'
      } else {
        html += 'green">'
      }
      html += obj.chgPercent + '%</font></td>' +
        '<td align="center" valign="middle" class="sjhq_td1"><font color="'
      if (Number(obj.netPurchaseAmount) >= 0) {
        html += 'red">'
      } else {
        html += 'green">'
      }
      html += (Number(obj.netPurchaseAmount) / Number(10000)).toFixed(2) + '</font></td>' +
        '<td align="center" valign="middle" class="sjhq_td1">' + (Number(obj.sellAmount) / Number(10000)).toFixed(2) + '</td>' +
        '<td align="center" valign="middle" class="sjhq_td1">' + (Number(obj.dealAmount) / Number(10000)).toFixed(2) + '</td>' +
        '<td align="center" valign="middle" class="sjhq_td1">' + (Number(obj.totalDealAmount) / Number(10000)).toFixed(2) + '</td>' +
        '<td align="center" valign="middle" class="sjhq_td1"><font color="'
      if (Number(obj.netPurchasePercent) >= 0) {
        html += 'red">'
      } else {
        html += 'green">'
      }

      html += obj.netPurchasePercent + '%</font></td>' +
        '<td align="center" valign="middle" class="sjhq_td1">' + obj.dealAmountPercent + '%</td>' +
        '<td align="center" valign="middle" class="sjhq_td1">' + obj.trunoverRate + '%</td>' +
        '<td align="center" valign="middle" class="sjhq_td1">' + (Number(obj.marketValue) / Number(100000000)).toFixed(0) + '</td></tr>'

      return html
    }
  }
}
