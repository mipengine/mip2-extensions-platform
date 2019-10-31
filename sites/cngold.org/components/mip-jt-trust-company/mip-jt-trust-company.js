export default class MIPJtTrustCompany extends MIP.CustomElement {
  build () {
    let page = 1
    let region = 0
    let stock = 0
    let money = 0

    // 选择条件的展开与收起
    let btns = this.element.querySelectorAll('.select-text p')
    let conts = this.element.querySelectorAll('.select-box .down-box')
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', () => {
        for (let j = 0; j < conts.length; j++) {
          if (i === j) {
            if (conts[i].style.display === 'block') {
              conts[i].style.display = 'none'
            } else {
              conts[i].style.display = 'block'
            }
          } else {
            conts[j].style.display = 'none'
          }
        }
      })
    }
    // 点击选择
    let spans = this.element.querySelectorAll('.select-box .down-box span')
    for (let i = 0; i < spans.length; i++) {
      spans[i].addEventListener('click', () => {
        let id = spans[i].getAttribute('id')
        if (id.split('-')[0] === 'r') {
          region = id.split('-')[1]
        } else if (id.split('-')[0] === 's') {
          stock = id.split('-')[1]
        } else if (id.split('-')[0] === 'm') {
          money = id.split('-')[1]
        }
        this.loadData(page, region, stock, money)
        for (let j = 0; j < conts.length; j++) {
          conts[j].style.display = 'none'
        }
      })
    }
  }
  // 根据条件加载数据
  loadData (page, region, stock, money) {
    let fetchUrl = 'https://m.cngold.org/trust/m_loadMore.html'
    fetch(fetchUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'page=' + page + '&region=' + region + '&stock=' + stock + '&money=' + money
    }).then((res) => {
      return res.json()
    }).then((data) => {
      let html = ''
      if (data.flag && data.data.models.page && data.data.models.page.result) {
        let result = data.data.models.page.result
        // 条件处内容改变
        let moneySearch = this.element.querySelector('#money-search')
        let stockSearch = this.element.querySelector('#stock-search')
        let regionSearch = this.element.querySelector('#region-search')
        if (data.data.models.money === 0) {
          moneySearch.innerHTML = '不限注册资本<i></i>'
        } else {
          moneySearch.innerHTML = data.data.models.moneyValue + '<i></i>'
        }
        if (data.data.models.stock === 0) {
          stockSearch.innerHTML = '不限股东<i></i>'
        } else {
          stockSearch.innerHTML = data.data.models.stockValue + '<i></i>'
        }
        if (data.data.models.region === 0) {
          regionSearch.innerHTML = '不限地区<i></i>'
        } else {
          regionSearch.innerHTML = data.data.models.regionValue + '<i></i>'
        }
        // 未查询到相关信息
        if (result.length === 0) {
          html = '<dl class="company_dl mglr30 pdT20 tuijian_dl">没有查询到符合条件的信托公司</dl>'
          this.element.querySelector('#company-list').innerHTML = html
          return
        }
        for (let i = 0; i < result.length; i++) {
          let temp = result[i]
          let companyShortName = ''
          if (temp.companyShortName) {
            companyShortName = temp.companyShortName
          }
          let smallLogo = ''
          if (temp.smallLogo) {
            smallLogo = temp.smallLogo
          }
          let id = 0
          if (temp.id) {
            id = temp.id
          }
          let regionVal = ''
          if (temp.region) {
            regionVal = temp.region
          }
          let productNum = 0
          if (temp.productNum) {
            productNum = temp.productNum
          }
          let formatTime = ''
          if (temp.formatTime) {
            formatTime = temp.formatTime
          }
          let registerMoney = 0
          if (temp.registerMoney) {
            registerMoney = temp.registerMoney
          }
          let stockHolderBgValue = ''
          if (temp.stockHolderBgValue) {
            stockHolderBgValue = temp.stockHolderBgValue
          }

          html += '<dl class="company_dl mglr30 pdT20 tuijian_dl">' +
            '<dt class="clearfix">' +
            '<div class="fl company_dt_1">' +
            '<a href="https://m.cngold.org/trust/m_company_' + id + '.html" class="clearfix">' +
            '<i class="img_i">' +
            '<mip-img layout="responsive" width="70" height="50" src="https://res.cngoldres.com' + smallLogo + '"></mip-img></i>' +
            '<span>' + companyShortName + '<br><i class="stock_i">股东背景：' + stockHolderBgValue +
            '</i></span></a></div>' + '<a href="https://m.cngold.org/trust/m_company_' + id +
            '.html" class="fr yywd"><span class="windowopen03">了解详情</span></a>' +
            '</dt><dd class="num clearfix"><span class="gray w1"><b><em class="red red_f0">' + registerMoney +
            '亿</em></b>注册资本</span><span class="gray w2"><b><em class="red">' + formatTime + '</em></b>成立时间' +
            '</span><span class="gray w3"><b><em class="red">' + regionVal + '</em></b>所在地' +
            '</span><span class="gray w4 br0"><b><em class="red">' + productNum + '只</em></b>旗下产品' +
            '</span></dd></dl>'
        }

        this.element.querySelector('#company-list').innerHTML = html
      }
    })
  }
}
