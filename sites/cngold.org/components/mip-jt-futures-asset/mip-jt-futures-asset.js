export default class MIPJtFuturesAsset extends MIP.CustomElement {
  build () {
    let codes = this.element.getAttribute('codes')
    let codeArr = codes.split(',')
    let ids = this.element.getAttribute('ids')
    let idsArr = ids.split(',')
    let repeatIds = this.element.getAttribute('repeat-ids')
    let repArr = repeatIds.split(';')

    loadData(codes)
    function loadData (codes) {
      let fetchUrl = 'https://api.jijinhao.com/history/quote.htm?codes=' + codes + '&pageSize=10&style=3'
      fetch(fetchUrl).then(function (res) {
        return res.json()
      }).then(function (data) {
        if (data[0] && data[0].data && data[0].data[0] && data[0].data[0].quote) {
          let quote = data[0].data[0].quote
          if (quote.q63 !== undefined && quote.q63 !== null && quote.q63 !== '') {
            for (let i = 0; i < codeArr.length; i++) {
              for (let j = 0; j < idsArr.length; j++) {
                if (idsArr[j] === 'q59') { // 时间截取
                  document.getElementById(codeArr[i] + '_' + idsArr[j]).innerHTML = quote.q59.substring(0, 10)
                } else if (idsArr[j] === 'q67' || idsArr[j] === 'q68' || idsArr[j] === 'q124') {
                  document.getElementById(codeArr[i] + '_' + idsArr[j]).innerHTML = quote[idsArr[j]]
                } else {
                  document.getElementById(codeArr[i] + '_' + idsArr[j]).innerHTML = Math.round(quote[idsArr[j]] * 100) / 100
                }
              }
            }
            if (repArr.length > 0) {
              for (let i = 0; i < repArr.length; i++) {
                let repId = repArr[i].split(',')[0]
                let repData = repArr[i].split(',')[1]
                let num
                if (repData === 'q59') {
                  num = quote.q59.substring(0, 10)
                } else if (repData === 'q67' || repData === 'q68' || repData === 'q124') {
                  num = quote[repData]
                } else {
                  num = Math.round(quote[repData] * 100) / 100
                }
                document.getElementById(repId).innerHTML = num
              }
            }
          }
        }
      })
    }
  }
}
