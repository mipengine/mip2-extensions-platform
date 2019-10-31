// 数据格式化
function formatNum (myFloat) {
  return Math.round(myFloat * 100) / 100
}

export default class MIPJtInsuranceTool extends MIP.CustomElement {
  build () {
    let type = this.element.getAttribute('type')

    if (type === 'houseFund' || type === 'pension' || type === 'lostjob') { // 住房公积金、养老保险、失业保险
      this.element.querySelector('#btn-calc').addEventListener('click', () => {
        this.shareRisks()
      })
    } else if (type === 'injury' || type === 'birth') { // 工伤保险、生育保险
      this.element.querySelector('#btn-calc').addEventListener('click', () => {
        this.singleRisks()
      })
    } else if (type === 'medical') { // 医疗保险
      this.element.querySelector('#btn-calc').addEventListener('click', () => {
        this.medical()
      })
    } else if (type === 'retire') { // 养老退休金
      this.element.querySelector('#btn-calc').addEventListener('click', () => {
        this.retire()
      })
    }
  }
  // 弹窗提示
  alertTips (msg) {
    if (msg) {
      this.element.querySelector('#calc-tips').innerHTML = msg
      this.element.querySelector('#calc-tips').style.display = 'block'
      setTimeout(() => {
        this.element.querySelector('#calc-tips').style.display = 'none'
      }, 2000)
    }
  }
  // 检查元素值是否为空值
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
  // 住房公积金计算器、养老保险计算器、失业保险计算器(公司、个人都缴费)
  shareRisks () {
    let wages = this.element.querySelector('#wages')
    let avgWages = this.element.querySelector('#avg-wages')
    let unitRate = this.element.querySelector('#unit-rate')
    let personRate = this.element.querySelector('#person-rate')

    if (!this.checkElem(wages, '您的月工资')) {
      return
    }
    if (!this.checkElem(avgWages, '本市职工上年月平均工资')) {
      return
    }
    if (!this.checkElem(unitRate, '单位缴存比例')) {
      return
    }
    if (!this.checkElem(personRate, '个人缴存比例')) {
      return
    }

    let wageTemp = parseFloat(wages.value)
    let avgTemp = parseFloat(avgWages.value)
    if (wageTemp < avgTemp * 0.6) {
      wageTemp = Math.round(avgTemp * 0.6)
    }
    if (wageTemp > avgTemp * 3) {
      wageTemp = Math.round(avgTemp * 3)
    }

    this.element.querySelector('#total-fund').value = formatNum(wageTemp * (parseFloat(unitRate.value) + parseFloat(personRate.value)) / 100)
    this.element.querySelector('#unit-fund').value = formatNum(wageTemp * parseFloat(unitRate.value) / 100)
    this.element.querySelector('#person-fund').value = formatNum(wageTemp * parseFloat(personRate.value) / 100)
  }
  // 工伤保险计算器、生育保险计算器(仅公司缴费)
  singleRisks () {
    let wages = this.element.querySelector('#wages')
    let avgWages = this.element.querySelector('#avg-wages')
    let unitRate = this.element.querySelector('#unit-rate')
    if (!this.checkElem(wages, '您的月工资')) {
      return
    }
    if (!this.checkElem(avgWages, '本市职工上年月平均工资')) {
      return
    }
    if (!this.checkElem(unitRate, '单位缴存比例')) {
      return
    }

    let wageTemp = parseFloat(wages.value)
    let avgTemp = parseFloat(avgWages.value)
    if (wageTemp < avgTemp * 0.6) {
      wageTemp = Math.round(avgTemp * 0.6)
    }
    if (wageTemp > avgTemp * 3) {
      wageTemp = Math.round(avgTemp * 3)
    }

    this.element.querySelector('#total-fund').value = formatNum(wageTemp * parseFloat(unitRate.value) / 100)
  }
  // 医疗保险计算器
  medical () {
    let wages = this.element.querySelector('#wages')
    let avgWages = this.element.querySelector('#avg-wages')
    let unitRateBase = this.element.querySelector('#unit-rate-base')
    let personRateBase = this.element.querySelector('#person-rate-base')
    let unitRate = this.element.querySelector('#unit-rate')
    let personRate = this.element.querySelector('#person-rate')

    if (!this.checkElem(wages, '您的月工资')) {
      return
    }
    if (!this.checkElem(avgWages, '本市职工上年月平均工资')) {
      return
    }
    if (!this.checkElem(unitRateBase, '单位缴存比例')) {
      return
    }
    if (!this.checkElem(personRateBase, '个人缴存比例')) {
      return
    }
    if (!this.checkElem(unitRate, '单位缴存比例')) {
      return
    }
    if (!this.checkElem(personRate, '个人缴存金额')) {
      return
    }

    let wageTemp = parseFloat(wages.value)
    let avgTemp = parseFloat(avgWages.value)
    if (wageTemp < avgTemp * 0.6) {
      wageTemp = Math.round(avgTemp * 0.6)
    }
    if (wageTemp > avgTemp * 3) {
      wageTemp = Math.round(avgTemp * 3)
    }

    this.element.querySelector('#total-fund').value = formatNum(wageTemp * (parseFloat(unitRateBase.value) + parseFloat(personRateBase.value) + parseFloat(unitRate.value)) / 100 + parseFloat(personRate.value))
    // 基本单位缴存
    this.element.querySelector('#unit-fund-base').value = formatNum(parseFloat(wageTemp * parseFloat(parseFloat(unitRateBase.value))) / 100)
    // 基本个人缴存
    this.element.querySelector('#person-fund-base').value = formatNum(parseFloat(wageTemp * parseFloat(parseFloat(personRateBase.value))) / 100)
    // 大额单位缴存
    this.element.querySelector('#unit-fund').value = formatNum(parseFloat(wageTemp * parseFloat(parseFloat(unitRate.value))) / 100)
    // 大额个人缴存
    this.element.querySelector('#person-fund').value = formatNum(parseFloat(personRate.value))
  }
  // 养老退休金保险计算器
  retire () {
    let wages = this.element.querySelector('#wages')
    let avgWages = this.element.querySelector('#avg-wages')
    let nowAge = this.element.querySelector('#now-age')
    let retireAge = this.element.querySelector('#retire-age')
    let nowMoney = this.element.querySelector('#now-money')
    let personRate = this.element.querySelector('#person-rate')
    let unitRate = this.element.querySelector('#unit-rate')
    let wishLevel = this.element.querySelector('#wish-level')

    if (!this.checkElem(wages, '您的月工资')) {
      return
    }
    if (!this.checkElem(avgWages, '本市职工上年月平均工资')) {
      return
    }
    if (!this.checkElem(nowAge, '现在年龄')) {
      return
    }
    if (!this.checkElem(retireAge, '您打算退休时年龄')) {
      return
    }
    if (!this.checkElem(nowMoney, '现在您帐户累积的养老金额')) {
      return
    }
    if (!this.checkElem(personRate, '默认个人工资增长率')) {
      return
    }
    if (!this.checkElem(unitRate, '默认职工工资增长率')) {
      return
    }
    if (!this.checkElem(wishLevel, '您期望退休后每月的生活水平')) {
      return
    }

    let wageTemp = parseFloat(wages.value)
    let avgTemp = parseFloat(avgWages.value)
    if (wageTemp < avgTemp * 0.6) {
      wageTemp = Math.round(avgTemp * 0.6)
    }
    if (wageTemp > avgTemp * 3) {
      wageTemp = Math.round(avgTemp * 3)
    }

    let baseNum = avgTemp * (1 + (parseFloat(retireAge.value) - parseFloat(nowAge.value)) * parseFloat(unitRate.value) / 100) * 0.2
    let totalNum = parseFloat(nowMoney.value) + wageTemp * 0.08 * 12 * (Math.pow(1 + (parseFloat(personRate.value) / 100), parseFloat(retireAge.value) - parseFloat(nowAge.value)) - 1) / (parseFloat(personRate.value) / 100)

    this.element.querySelector('#now-age-1').value = nowAge.value
    this.element.querySelector('#retire-age-1').value = retireAge.value
    this.element.querySelector('#total-fund').value = formatNum(baseNum + totalNum / 120)

    let totalFund = parseFloat(this.element.querySelector('#total-fund').value)
    let level = parseFloat(this.element.querySelector('#wish-level').value)
    let temp = ''
    if (totalFund < level) {
      let tempNum = formatNum((level - totalFund) * 10 / (parseFloat(retireAge.value) - parseFloat(nowAge.value)))
      temp += `按您目前的工资，不能満足您期望的退休后生活水平,您需要逐步提高你的工资待遇或者每月额外增加养老金<strong>${tempNum}</strong>元。`
    } else {
      temp += '您目前的工资水平一直保持下去的话，完全可以満足您期望的退休后生活水平。'
      if (totalFund > level) {
        let tempNum = formatNum(totalFund - level)
        temp += `您可以把每月赢余的<strong>${tempNum}</strong>元进行其他投资，以获取更高的回报。`
      }
    }
    this.element.querySelector('#result').innerHTML = temp
  }
}
