import RateData from './data/rate'

let rateJson = new RateData().str

export default class MIPJtInsuranceSocialcalc extends MIP.CustomElement {
  build () {
    // 城市列表的展示
    let cityInput = this.element.querySelector('#city-input')
    cityInput.onclick = () => {
      this.element.querySelector('#city-select').style.display = 'block'
      if (cityInput.value === '请选择地区') {
        cityInput.value = ''
      }
    }

    // 城市列表的点击事件
    let cityLis = document.querySelectorAll('ul#city-ul li')
    for (let i = 0; i < cityLis.length; i++) {
      cityLis[i].addEventListener('click', () => {
        this.inputArea(cityLis[i])
      })
    }

    // 计算按钮的点击事件
    this.element.querySelector('#calc-btn').addEventListener('click', () => {
      this.calc()
    })
  }
  // 弹窗提示
  alertTips (msg) {
    if (msg) {
      let calcTips = this.element.querySelector('#calc-tips')
      calcTips.innerHTML = msg
      calcTips.style.display = 'block'
      setTimeout(() => {
        calcTips.style.display = 'none'
      }, 2000)
    }
  }
  // 检查元素
  checkElem (ele, msg) {
    if (ele.value === '') {
      this.alertTips(msg + '不可为空!')
      ele.focus()
      return false
    } else if (isNaN(ele.value)) {
      this.alertTips(msg + '必须为数字!')
      ele.focus()
      return false
    } else {
      return true
    }
  }
  // 点击城市之后比例随之变化
  inputArea (ele) {
    let selectArea = ele.innerHTML
    this.element.querySelector('#city-input').value = selectArea
    this.element.querySelector('#city-select').style.display = 'none'

    // 社保最低和最高的显示
    let c = rateJson[selectArea]
    if (c === undefined) {
      return
    }
    // 设置个人比例
    let rateInputs = document.querySelectorAll('input[id$="rate"]')
    for (let i = 0; i < rateInputs.length; i++) {
      let obId = rateInputs[i].getAttribute('id')
      let obIdSub = obId.replace('-rate', '')
      rateInputs[i].value = c[obIdSub + '-spread']
    }
    // 设置最小值
    let minEles = document.querySelectorAll('[id$="min"]')
    for (let i = 0; i < minEles.length; i++) {
      let obId = minEles[i].getAttribute('id')
      if (minEles[i].nodeName.toLowerCase() === 'input') {
        minEles[i].value = c[obId]
      } else {
        minEles[i].innerHTML = c[obId]
      }
    }
    // 设置最大值
    let maxEles = document.querySelectorAll('[id$="max"]')
    for (let i = 0; i < maxEles.length; i++) {
      let obId = maxEles[i].getAttribute('id')
      if (maxEles[i].nodeName.toLowerCase() === 'input') {
        maxEles[i].value = c[obId]
      } else {
        maxEles[i].innerHTML = c[obId]
      }
    }
    // 设置社保最大和最小
    let mins = [c['pension-min'], c['unemployment-min'], c['medical-min'], c['injury-min'], c['fertility-min']]
    let minTemp = 100000
    let maxs = [c['pension-max'], c['unemployment-max'], c['medical-max'], c['injury-max'], c['fertility-max']]
    let maxTemp = 0
    mins.forEach(function (v) {
      if (minTemp > v) {
        minTemp = v
      }
    })
    maxs.forEach(function (v) {
      if (maxTemp < v) {
        maxTemp = v
      }
    })
    this.element.querySelector('#pension-min').innerHTML = minTemp
    this.element.querySelector('#pension-max').innerHTML = maxTemp

    this.changeBase()
  }
  // 设置公积金基数和社保基数
  changeBase () {
    // 设置社保基数
    let income1 = this.element.querySelector('#pretax-income').value
    if (income1 === '') {
      income1 = 0
    }
    if (income1 < parseFloat(this.element.querySelector('#pension-min').innerHTML)) {
      income1 = parseFloat(this.element.querySelector('#pension-min').innerHTML)
    } else {
      if (income1 > parseFloat(this.element.querySelector('#pension-max').innerHTML)) {
        income1 = parseFloat(this.element.querySelector('#pension-max').innerHTML)
      }
    }
    this.element.querySelector('#social-security-base').value = income1

    // 设置公积金基数
    let income2 = this.element.querySelector('#pretax-income').value
    if (income2 === '') {
      income2 = 0
    }
    if (income2 < parseFloat(this.element.querySelector('#provident-fund-min').innerHTML)) {
      income2 = parseFloat(this.element.querySelector('#provident-fund-min').innerHTML)
    } else {
      if (income2 > parseFloat(this.element.querySelector('#provident-fund-max').innerHTML)) {
        income2 = parseFloat(this.element.querySelector('#provident-fund-max').innerHTML)
      }
    }
    this.element.querySelector('#provident-fund-base').value = income2
  }
  // 计算
  calc () {
    // 表单数据检查
    if (this.element.querySelector('#city-input').value === '' || this.element.querySelector('#city-input').value === '请选择地区') {
      this.alertTips('请选择地区')
      return
    } else {
      let val = this.element.querySelector('#city-input').value
      if (rateJson[val] === undefined) {
        this.alertTips('地区有误请重新选择!')
        return
      }
    }
    if (!this.checkElem(this.element.querySelector('#pretax-income'), '税前收入')) {
      return
    }

    this.changeBase()
    // 计算各保险的单位缴费和个人缴费
    let areaId = this.element.querySelector('#city-input').value
    let rate = rateJson[areaId]
    let fees = {}
    let income = this.element.querySelector('#social-security-base').value
    let rateInputs = document.querySelectorAll('input[id$="rate"]')
    for (let i = 0; i < rateInputs.length; i++) {
      let obId = rateInputs[i].getAttribute('id')
      let feeName = obId.replace('-rate', '')
      let baseIncome = 0
      let baseFeeName = feeName.replace('-company', '')
      if (baseFeeName === 'provident-fund') {
        baseIncome = this.element.querySelector('#provident-fund-base').value
      } else {
        baseIncome = income
      }
      if (baseIncome < rate[baseFeeName + '-min']) {
        baseIncome = rate[baseFeeName + '-min']
      }
      if (baseIncome > rate[baseFeeName + '-max']) {
        baseIncome = rate[baseFeeName + '-max']
      }
      fees[feeName] = (baseIncome * rateInputs[i].value / 100).toFixed(2)
    }

    for (let i in fees) {
      let feeEle = this.element.querySelector('#' + i + '-fee')
      if (feeEle) {
        if (feeEle.nodeName.toLowerCase() === 'input') {
          feeEle.value = fees[i]
        } else {
          feeEle.innerHTML = fees[i]
        }
      }
    }

    // 计算个人缴费总额
    this.element.querySelector('#personal-fee-total').innerHTML = (parseInt(fees['pension']) + parseInt(fees['medical']) + parseInt(fees['unemployment']) + parseInt(fees['injury']) + parseInt(fees['fertility']) + parseInt(fees['provident-fund'])).toFixed(2)
    // 计算单位缴费总额
    this.element.querySelector('#company-fee-total').innerHTML = (parseInt(fees['pension-company']) + parseInt(fees['medical-company']) + parseInt(fees['unemployment-company']) + parseInt(fees['injury-company']) + parseInt(fees['fertility-company']) + parseInt(fees['provident-fund-company'])).toFixed(2)
  }
}
