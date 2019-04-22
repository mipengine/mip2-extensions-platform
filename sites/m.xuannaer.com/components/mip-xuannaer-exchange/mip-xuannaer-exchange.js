import './index.less'
const {
  util
} = MIP
const {
  fetchJsonp
} = window
export default class MIPXuannaerExchange extends MIP.CustomElement {
  build () {
    this.exchange = document.querySelector('.intro-but')
    this.showThat = document.querySelector('.m-base-info-detail')
    this.bg = document.querySelectorAll('.m-product-base-info')
    // 需要控制的div
    this.completionPrice = document.querySelector('.completion_price')
    this.floorPrice = document.querySelector('.completion_floor_price')
    this.landPrice = document.querySelector('.land_price')
    this.premiumRate = document.querySelector('.premium_rate')
    // 处理数据的显示和单位的转化
    this.dataArr = this.getData()
    this.nowStatus()
    this.showThat.addEventListener('click', () => {
      this.getStatus()
    }, false)
    this.exchange.addEventListener('click', () => {
      this.exchangeStatus()
    }, false)
  }
  nowStatus () {
    fetchJsonp(`${this.dataArr['hostUrl']}Mipplugin/recruitPrice/id/${this.dataArr['detailId']}`).then(res => {
      return res.json()
    }).then(result => {
      if (result) {
        this.bg.forEach(function (evt) {
          evt.classList.remove('m-background')
        })
        util.css(this.showThat, 'display', 'none')
        if (result[0]) {
          this.completionPrice.innerHTML = `${result[0]}万元`
        } else {
          this.completionPrice.innerHTML = '暂无数据'
        }
        if (result[1]) {
          this.floorPrice.innerHTML = `<span class="exchange-show">${result[1]}元/㎡</span><span class="exchange-hide">${(result[1] * 666.667 / 10000).toFixed(2)}万元/亩</span>`
        } else {
          this.floorPrice.innerHTML = '暂无数据'
        }
        if (result[2]) {
          this.landPrice.innerHTML = `<span class="exchange-show">${result[2]}元/㎡</span><span class="exchange-hide">${(result[2] * 666.6667 / 10000).toFixed(2)}万元/亩</span>`
        } else {
          this.landPrice.innerHTML = '暂无数据'
        }
        if (result[3]) {
          this.premiumRate.innerHTML = `${result[3]}万元`
        } else {
          this.premiumRate.innerHTML = '暂无数据'
        }
      }
    })
  }
  getStatus () {
    fetchJsonp(`${this.dataArr['hostUrl']}Mipplugin/recruitClickPrice/id/${this.dataArr['detailId']}`).then(res => {
      return res.json()
    }).then(result => {
      if (result && result['code'] === 1) {
        window.location.href = `${this.dataArr['imsUrl']}/user/login/login_tab`
      }
      if (result && result['code'] === 500) {
        this.tipModal(result['msg'])
      }
      if (result && result['code'] === 200) {
        this.bg.forEach(function (evt) {
          evt.classList.remove('m-background')
        })
        util.css(this.showThat, 'display', 'none')
        if (result[0]) {
          this.completionPrice.innerHTML = `${result[0]}万元`
        } else {
          this.completionPrice.innerHTML = '暂无数据'
        }
        if (result[1]) {
          this.floorPrice.innerHTML = `<span class="exchange-show">${result[1]}元/㎡</span><span class="exchange-hide"> (${(result[1] * 666.667 / 10000).toFixed(2)}万元/亩</span>`
        } else {
          this.floorPrice.innerHTML = '暂无数据'
        }
        if (result[2]) {
          this.landPrice.innerHTML = `<span class="exchange-show">${result[2]}元/㎡</span><span class="exchange-hide">${(result[2] * 666.6667 / 10000).toFixed(2)}万元/亩</span>`
        } else {
          this.landPrice.innerHTML = '暂无数据'
        }
        if (result[3]) {
          this.premiumRate.innerHTML = `${result[3]}万元`
        } else {
          this.premiumRate.innerHTML = '暂无数据'
        }
      }
    })
  }
  getData () {
    let params = {
      'imsUrl': '',
      'imgUrl': '',
      'hostUrl': '',
      'detailId': ''
    }
    let script = this.element.querySelector('script[type="application/json"]')
    if (script) {
      return Object.assign(params, util.jsonParse(script.textContent.toString()))
    }
    return params
  }
  exchangeStatus () {
    this.needHide = document.querySelectorAll('.exchange-hide')
    this.needShow = document.querySelectorAll('.exchange-show')
    if (this.exchange.classList.contains('exchagearea')) {
      this.needShow.forEach(function (evt) {
        util.css(evt, 'display', 'block')
      })
      this.needHide.forEach(function (evt) {
        util.css(evt, 'display', 'none')
      })
      this.exchange.innerHTML = '切换面积为(亩)'
      this.exchange.classList.remove('exchagearea')
    } else {
      this.needShow.forEach(function (evt) {
        util.css(evt, 'display', 'none')
      })
      this.needHide.forEach(function (evt) {
        util.css(evt, 'display', 'block')
      })
      this.exchange.innerHTML = '切换面积为(㎡)'
      this.exchange.classList.add('exchagearea')
    }
  }
}
