// 数据格式化
function formatNum (myFloat) {
  return Math.round(myFloat * 100) / 100
}

export default class MIPJtInsuranceTool extends MIP.CustomElement {
  build () {
    let type = this.element.getAttribute('type')

    if (type === 'houseFund' || type === 'pension' || type === 'lostjob') { // 住房公积金、养老保险、失业保险
      this.element.querySelector('#btnCalc').addEventListener('click', () => {
        this.shareRisks()
      })
    } else if (type === 'injury' || type === 'birth') { // 工伤保险、生育保险
      this.element.querySelector('#btnCalc').addEventListener('click', () => {
        this.singleRisks()
      })
    } else if (type === 'medical') { // 医疗保险
      this.element.querySelector('#btnCalc').addEventListener('click', () => {
        this.medical()
      })
    } else if (type === 'retire') { // 养老退休金
      this.element.querySelector('#btnCalc').addEventListener('click', () => {
        this.retire()
      })
    }
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
  //  住房公积金计算器、养老保险计算器、失业保险计算器(公司、个人都缴费)
  shareRisks () {
    if (!this.checkElem(this.element.querySelector('#wages'), '您的月工资')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#avg_wages'), '本市职工上年月平均工资')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#unit_rate'), '单位缴存比例')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#person_rate'), '个人缴存比例')) {
      return
    }

    let wages = parseFloat(this.element.querySelector('#wages').value)
    let avgWages = parseFloat(this.element.querySelector('#avg_wages').value)
    if (wages < avgWages * 0.6) {
      wages = Math.round(avgWages * 0.6)
    }
    if (wages > avgWages * 3) {
      wages = Math.round(avgWages * 3)
    }

    this.element.querySelector('#total_fund').value = formatNum(wages * (parseFloat(this.element.querySelector('#unit_rate').value) + parseFloat(this.element.querySelector('#person_rate').value)) / 100)
    this.element.querySelector('#unit_fund').value = formatNum(wages * parseFloat(this.element.querySelector('#unit_rate').value) / 100)
    this.element.querySelector('#person_fund').value = formatNum(wages * parseFloat(this.element.querySelector('#person_rate').value) / 100)
  }
  // 工伤保险计算器、生育保险计算器(仅公司缴费)
  singleRisks () {
    if (!this.checkElem(this.element.querySelector('#wages'), '您的月工资')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#avg_wages'), '本市职工上年月平均工资')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#unit_rate'), '单位缴存比例')) {
      return
    }

    let wages = parseFloat(this.element.querySelector('#wages').value)
    let avgWages = parseFloat(this.element.querySelector('#avg_wages').value)
    if (wages < avgWages * 0.6) {
      wages = Math.round(avgWages * 0.6)
    }
    if (wages > avgWages * 3) {
      wages = Math.round(avgWages * 3)
    }

    this.element.querySelector('#total_fund').value = formatNum(wages * parseFloat(this.element.querySelector('#unit_rate').value) / 100)
  }
  // 医疗保险计算器
  medical () {
    if (!this.checkElem(this.element.querySelector('#wages'), '您的月工资')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#avg_wages'), '本市职工上年月平均工资')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#unit_rate_base'), '单位缴存比例')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#person_rate_base'), '个人缴存比例')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#unit_rate'), '单位缴存比例')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#person_rate'), '个人缴存金额')) {
      return
    }

    let wages = parseFloat(this.element.querySelector('#wages').value)
    let avgWages = parseFloat(this.element.querySelector('#avg_wages').value)
    if (wages < avgWages * 0.6) {
      wages = Math.round(avgWages * 0.6)
    }
    if (wages > avgWages * 3) {
      wages = Math.round(avgWages * 3)
    }

    this.element.querySelector('#total_fund').value = formatNum(wages * (parseFloat(this.element.querySelector('#unit_rate_base').value) + parseFloat(this.element.querySelector('#person_rate_base').value) + parseFloat(this.element.querySelector('#unit_rate').value)) / 100 + parseFloat(this.element.querySelector('#person_rate').value))
    // 基本单位缴存
    this.element.querySelector('#unit_fund_base').value = formatNum(parseFloat(wages * parseFloat(parseFloat(this.element.querySelector('#unit_rate_base').value))) / 100)
    // 基本个人缴存
    this.element.querySelector('#person_fund_base').value = formatNum(parseFloat(wages * parseFloat(parseFloat(this.element.querySelector('#person_rate_base').value))) / 100)
    // 大额单位缴存
    this.element.querySelector('#unit_fund').value = formatNum(parseFloat(wages * parseFloat(parseFloat(this.element.querySelector('#unit_rate').value))) / 100)
    // 大额个人缴存
    this.element.querySelector('#person_fund').value = formatNum(parseFloat(this.element.querySelector('#person_rate').value))
  }
  // 养老退休金保险计算器
  retire () {
    if (!this.checkElem(this.element.querySelector('#wages'), '您的月工资')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#avg_wages'), '本市职工上年月平均工资')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#now_age'), '现在年龄')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#retire_age'), '您打算退休时年龄')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#now_money'), '现在您帐户累积的养老金额')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#person_rate'), '默认个人工资增长率')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#unit_rate'), '默认职工工资增长率')) {
      return
    }
    if (!this.checkElem(this.element.querySelector('#wish_level'), '您期望退休后每月的生活水平')) {
      return
    }

    let wages = parseFloat(this.element.querySelector('#wages').value)
    let avgWages = parseFloat(this.element.querySelector('#avg_wages').value)
    if (wages < avgWages * 0.6) {
      wages = Math.round(avgWages * 0.6)
    }
    if (wages > avgWages * 3) {
      wages = Math.round(avgWages * 3)
    }

    let baseNum = avgWages * (1 + (parseFloat(this.element.querySelector('#retire_age').value) - parseFloat(this.element.querySelector('#now_age').value)) * parseFloat(this.element.querySelector('#unit_rate').value) / 100) * 0.2
    let totalNum = parseFloat(this.element.querySelector('#now_money').value) + wages * 0.08 * 12 * (Math.pow(1 + (parseFloat(this.element.querySelector('#person_rate').value) / 100), parseFloat(this.element.querySelector('#retire_age').value) - parseFloat(this.element.querySelector('#now_age').value)) - 1) / (parseFloat(this.element.querySelector('#person_rate').value) / 100)

    this.element.querySelector('#now_age_1').value = this.element.querySelector('#now_age').value
    this.element.querySelector('#retire_age_1').value = this.element.querySelector('#retire_age').value
    this.element.querySelector('#total_fund').value = formatNum(baseNum + totalNum / 120)

    let totalFund = parseFloat(this.element.querySelector('#total_fund').value)
    let level = parseFloat(this.element.querySelector('#wish_level').value)
    let temp = ''
    if (totalFund < level) {
      let tempNum = formatNum((level - totalFund) * 10 / (parseFloat(this.element.querySelector('#retire_age').value) - parseFloat(this.element.querySelector('#now_age').value)))
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
