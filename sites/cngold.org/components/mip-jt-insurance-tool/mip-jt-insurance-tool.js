export default class MIPJtInsuranceTool extends MIP.CustomElement {
  build () {
    let type = this.element.getAttribute('type')
    let that = this

    if (type === 'houseFund' || type === 'pension' || type === 'lostjob') { // 住房公积金、养老保险、失业保险
      that.element.querySelector('#btnCalc').addEventListener('click', function () {
        shareRisks()
      })
    } else if (type === 'injury' || type === 'birth') { // 工伤保险、生育保险
      that.element.querySelector('#btnCalc').addEventListener('click', function () {
        singleRisks()
      })
    } else if (type === 'medical') { // 医疗保险
      that.element.querySelector('#btnCalc').addEventListener('click', function () {
        medical()
      })
    } else if (type === 'retire') { // 养老退休金
      that.element.querySelector('#btnCalc').addEventListener('click', function () {
        retire()
      })
    }

    // 弹窗提示
    function alertTips (msg) {
      if (msg) {
        that.element.querySelector('#calc_tips').innerHTML = msg
        that.element.querySelector('#calc_tips').style.display = 'block'
        setTimeout(function () {
          that.element.querySelector('#calc_tips').style.display = 'none'
        }, 2000)
      }
    }
    // 检查元素值是否为空值
    function checkElem (ele, msg) {
      if (ele.value === '') {
        alertTips(msg + '不可为空!')
        ele.focus()
        return false
      } else if (isNaN(ele.value)) {
        alertTips(msg + '必须为数字!')
        ele.focus()
        return false
      } else {
        return true
      }
    }
    // 数据格式化
    function formatNum (myFloat) {
      return Math.round(myFloat * 100) / 100
    }
    // 基数范围
    function baseScope (wages, avgWages) {
      if (wages < avgWages * 0.6) {
        wages = Math.round(avgWages * 0.6)
      }
      if (wages > avgWages * 3) {
        wages = Math.round(avgWages * 3)
      }
    }

    // ==========住房公积金计算器、养老保险计算器、失业保险计算器(公司、个人都缴费)=========
    function shareRisks () {
      if (!checkElem(that.element.querySelector('#wages'), '您的月工资')) {
        return
      }
      if (!checkElem(that.element.querySelector('#avg_wages'), '本市职工上年月平均工资')) {
        return
      }
      if (!checkElem(that.element.querySelector('#unit_rate'), '单位缴存比例')) {
        return
      }
      if (!checkElem(that.element.querySelector('#person_rate'), '个人缴存比例')) {
        return
      }

      let wages = parseFloat(that.element.querySelector('#wages').value)
      let avgWages = parseFloat(that.element.querySelector('#avg_wages').value)
      baseScope(wages, avgWages)

      that.element.querySelector('#total_fund').value = formatNum(wages * (parseFloat(that.element.querySelector('#unit_rate').value) + parseFloat(that.element.querySelector('#person_rate').value)) / 100)
      that.element.querySelector('#unit_fund').value = formatNum(wages * parseFloat(that.element.querySelector('#unit_rate').value) / 100)
      that.element.querySelector('#person_fund').value = formatNum(wages * parseFloat(that.element.querySelector('#person_rate').value) / 100)
    }

    // ==========工伤保险计算器、生育保险计算器(仅公司缴费)=========
    function singleRisks () {
      if (!checkElem(that.element.querySelector('#wages'), '您的月工资')) {
        return
      }
      if (!checkElem(that.element.querySelector('#avg_wages'), '本市职工上年月平均工资')) {
        return
      }
      if (!checkElem(that.element.querySelector('#unit_rate'), '单位缴存比例')) {
        return
      }

      let wages = parseFloat(that.element.querySelector('#wages').value)
      let avgWages = parseFloat(that.element.querySelector('#avg_wages').value)
      baseScope(wages, avgWages)

      that.element.querySelector('#total_fund').value = formatNum(wages * parseFloat(that.element.querySelector('#unit_rate').value) / 100)
    }

    // ==========医疗保险计算器=========
    function medical () {
      if (!checkElem(that.element.querySelector('#wages'), '您的月工资')) {
        return
      }
      if (!checkElem(that.element.querySelector('#avg_wages'), '本市职工上年月平均工资')) {
        return
      }
      if (!checkElem(that.element.querySelector('#unit_rate_base'), '单位缴存比例')) {
        return
      }
      if (!checkElem(that.element.querySelector('#person_rate_base'), '个人缴存比例')) {
        return
      }
      if (!checkElem(that.element.querySelector('#unit_rate'), '单位缴存比例')) {
        return
      }
      if (!checkElem(that.element.querySelector('#person_rate'), '个人缴存金额')) {
        return
      }

      let wages = parseFloat(that.element.querySelector('#wages').value)
      let avgWages = parseFloat(that.element.querySelector('#avg_wages').value)
      baseScope(wages, avgWages)

      that.element.querySelector('#total_fund').value = formatNum(wages * (parseFloat(that.element.querySelector('#unit_rate_base').value) + parseFloat(that.element.querySelector('#person_rate_base').value) + parseFloat(that.element.querySelector('#unit_rate').value)) / 100 + parseFloat(that.element.querySelector('#person_rate').value))
      // 基本单位缴存
      that.element.querySelector('#unit_fund_base').value = formatNum(parseFloat(wages * parseFloat(parseFloat(that.element.querySelector('#unit_rate_base').value))) / 100)
      // 基本个人缴存
      that.element.querySelector('#person_fund_base').value = formatNum(parseFloat(wages * parseFloat(parseFloat(that.element.querySelector('#person_rate_base').value))) / 100)
      // 大额单位缴存
      that.element.querySelector('#unit_fund').value = formatNum(parseFloat(wages * parseFloat(parseFloat(that.element.querySelector('#unit_rate').value))) / 100)
      // 大额个人缴存
      that.element.querySelector('#person_fund').value = formatNum(parseFloat(that.element.querySelector('#person_rate').value))
    }

    // ==========养老退休金保险计算器=========
    function retire () {
      if (!checkElem(that.element.querySelector('#wages'), '您的月工资')) {
        return
      }
      if (!checkElem(that.element.querySelector('#avg_wages'), '本市职工上年月平均工资')) {
        return
      }
      if (!checkElem(that.element.querySelector('#now_age'), '现在年龄')) {
        return
      }
      if (!checkElem(that.element.querySelector('#retire_age'), '您打算退休时年龄')) {
        return
      }
      if (!checkElem(that.element.querySelector('#now_money'), '现在您帐户累积的养老金额')) {
        return
      }
      if (!checkElem(that.element.querySelector('#person_rate'), '默认个人工资增长率')) {
        return
      }
      if (!checkElem(that.element.querySelector('#unit_rate'), '默认职工工资增长率')) {
        return
      }
      if (!checkElem(that.element.querySelector('#wish_level'), '您期望退休后每月的生活水平')) {
        return
      }

      let wages = parseFloat(that.element.querySelector('#wages').value)
      let avgWages = parseFloat(that.element.querySelector('#avg_wages').value)
      baseScope(wages, avgWages)

      let baseNum = avgWages * (1 + (parseFloat(that.element.querySelector('#retire_age').value) - parseFloat(that.element.querySelector('#now_age').value)) * parseFloat(that.element.querySelector('#unit_rate').value) / 100) * 0.2
      let totalNum = parseFloat(that.element.querySelector('#now_money').value) + wages * 0.08 * 12 * (Math.pow(1 + (parseFloat(that.element.querySelector('#person_rate').value) / 100), parseFloat(that.element.querySelector('#retire_age').value) - parseFloat(that.element.querySelector('#now_age').value)) - 1) / (parseFloat(that.element.querySelector('#person_rate').value) / 100)

      that.element.querySelector('#now_age_1').value = that.element.querySelector('#now_age').value
      that.element.querySelector('#retire_age_1').value = that.element.querySelector('#retire_age').value
      that.element.querySelector('#total_fund').value = formatNum(baseNum + totalNum / 120)

      let totalFund = parseFloat(that.element.querySelector('#total_fund').value)
      let level = parseFloat(that.element.querySelector('#wish_level').value)
      let temp = ''
      if (totalFund < level) {
        let tempNum = formatNum((level - totalFund) * 10 / (parseFloat(that.element.querySelector('#retire_age').value) - parseFloat(that.element.querySelector('#now_age').value)))
        temp += `按您目前的工资，不能満足您期望的退休后生活水平,您需要逐步提高你的工资待遇或者每月额外增加养老金<strong>${tempNum}</strong>元。`
      } else {
        temp += '您目前的工资水平一直保持下去的话，完全可以満足您期望的退休后生活水平。'
        if (totalFund > level) {
          let tempNum = formatNum(totalFund - level)
          temp += `您可以把每月赢余的<strong>${tempNum}</strong>元进行其他投资，以获取更高的回报。`
        }
      }
      that.element.querySelector('#result').innerHTML = temp
    }
  }
}
