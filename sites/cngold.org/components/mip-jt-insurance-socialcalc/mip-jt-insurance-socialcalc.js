import RateData from './data/rate'

let rateJson = new RateData().str

export default class MIPJtInsuranceSocialcalc extends MIP.CustomElement {
  build () {
    // 城市列表的展示
    this.element.querySelector('#city_input').onclick = () => {
      this.element.querySelector('#citySelect').style.display = 'block'
      if (this.element.querySelector('#city_input').value === '请选择地区') {
        this.element.querySelector('#city_input').value = ''
      }
    }

    // 城市列表的点击事件
    let cityLis = document.querySelectorAll('ul#city_ul li')
    for (let i = 0; i < cityLis.length; i++) {
      cityLis[i].addEventListener('click', () => {
        this.inputArea(cityLis[i])
      })
    }

    // 计算按钮的点击事件
    this.element.querySelector('#calc_btn').addEventListener('click', () => {
      this.calc()
    })
  }
  // 弹窗提示
  alertTips (msg) {
    if (msg) {
      this.element.querySelector('#calc_tips').innerHTML = msg
      this.element.querySelector('#calc_tips').style.display = 'block'
      setTimeout(() => {
        this.element.querySelector('#calc_tips').style.display = 'none'
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
    this.element.querySelector('#city_input').value = selectArea
    this.element.querySelector('#citySelect').style.display = 'none'

    // 社保最低和最高的显示
    let c = rateJson[selectArea]
    if (c === undefined) {
      return
    }
    // 设置个人比例
    let rateInputs = document.querySelectorAll('input[id$="rate"]')
    for (let i = 0; i < rateInputs.length; i++) {
      let obId = rateInputs[i].getAttribute('id')
      let obIdSub = obId.replace('_rate', '')
      rateInputs[i].value = c[obIdSub + '_spread']
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
    let mins = [c.pension_min, c.unemployment_min, c.medical_min, c.injury_min, c.fertility_min]
    let minTemp = 100000
    let maxs = [c.pension_max, c.unemployment_max, c.medical_max, c.injury_max, c.fertility_max]
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
    this.element.querySelector('#pension_min').innerHTML = minTemp
    this.element.querySelector('#pension_max').innerHTML = maxTemp

    this.changeBase()
  }
  // 设置公积金基数和社保基数
  changeBase () {
    // 设置社保基数
    let income1 = this.element.querySelector('#pretax_income').value
    if (income1 === '') {
      income1 = 0
    }
    if (income1 < parseFloat(this.element.querySelector('#pension_min').innerHTML)) {
      income1 = parseFloat(this.element.querySelector('#pension_min').innerHTML)
    } else {
      if (income1 > parseFloat(this.element.querySelector('#pension_max').innerHTML)) {
        income1 = parseFloat(this.element.querySelector('#pension_max').innerHTML)
      }
    }
    this.element.querySelector('#social_security_base').value = income1

    // 设置公积金基数
    let income2 = this.element.querySelector('#pretax_income').value
    if (income2 === '') {
      income2 = 0
    }
    if (income2 < parseFloat(this.element.querySelector('#provident_fund_min').innerHTML)) {
      income2 = parseFloat(this.element.querySelector('#provident_fund_min').innerHTML)
    } else {
      if (income2 > parseFloat(this.element.querySelector('#provident_fund_max').innerHTML)) {
        income2 = parseFloat(this.element.querySelector('#provident_fund_max').innerHTML)
      }
    }
    this.element.querySelector('#provident_fund_base').value = income2
  }
  // 计算
  calc () {
    // 表单数据检查
    if (this.element.querySelector('#city_input').value === '' || this.element.querySelector('#city_input').value === '请选择地区') {
      this.alertTips('请选择地区')
      return
    } else {
      let val = this.element.querySelector('#city_input').value
      if (rateJson[val] === undefined) {
        this.alertTips('地区有误请重新选择!')
        return
      }
    }
    if (!this.checkElem(this.element.querySelector('#pretax_income'), '税前收入')) {
      return
    }

    this.changeBase()
    // 计算各保险的单位缴费和个人缴费
    let areaId = this.element.querySelector('#city_input').value
    let rate = rateJson[areaId]
    let fees = {}
    let income = this.element.querySelector('#social_security_base').value
    let rateInputs = document.querySelectorAll('input[id$="rate"]')
    for (let i = 0; i < rateInputs.length; i++) {
      let obId = rateInputs[i].getAttribute('id')
      let feeName = obId.replace('_rate', '')
      let baseIncome = 0
      let baseFeeName = feeName.replace('_company', '')
      if (baseFeeName === 'provident_fund') {
        baseIncome = this.element.querySelector('#provident_fund_base').value
      } else {
        baseIncome = income
      }
      if (baseIncome < rate[baseFeeName + '_min']) {
        baseIncome = rate[baseFeeName + '_min']
      }
      if (baseIncome > rate[baseFeeName + '_max']) {
        baseIncome = rate[baseFeeName + '_max']
      }
      fees[feeName] = (baseIncome * rateInputs[i].value / 100).toFixed(2)
    }

    for (let i in fees) {
      let feeEle = this.element.querySelector('#' + i + '_fee')
      if (feeEle) {
        if (feeEle.nodeName.toLowerCase() === 'input') {
          feeEle.value = fees[i]
        } else {
          feeEle.innerHTML = fees[i]
        }
      }
    }

    // 计算个人缴费总额
    this.element.querySelector('#personal_fee_total').innerHTML = (parseInt(fees['pension']) + parseInt(fees['medical']) + parseInt(fees['unemployment']) + parseInt(fees['injury']) + parseInt(fees['fertility']) + parseInt(fees['provident_fund'])).toFixed(2)
    // 计算单位缴费总额
    this.element.querySelector('#company_fee_total').innerHTML = (parseInt(fees['pension_company']) + parseInt(fees['medical_company']) + parseInt(fees['unemployment_company']) + parseInt(fees['injury_company']) + parseInt(fees['fertility_company']) + parseInt(fees['provident_fund_company'])).toFixed(2)
  }
}
