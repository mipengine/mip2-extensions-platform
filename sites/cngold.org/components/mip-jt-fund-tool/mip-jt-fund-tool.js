function round (num, precision) {
  return Math.round(num * Math.pow(10, precision)) / (Math.pow(10, precision))
}

export default class MIPJtFundTool extends MIP.CustomElement {
  build () {
    let type = this.element.getAttribute('type')
    // 重置计算器
    this.element.querySelector('#clean-btn').addEventListener('click', () => {
      this.clearCalc()
    })
    this.element.querySelector('#calc-btn').addEventListener('click', () => {
      switch (type) {
        case 'fundIncome': // 基金收益计算器
          this.fundIncome()
          break
        case 'fundRedeem': // 基金赎回费用计算器
          this.fundRedeem()
          break
        case 'fundHoldday': // 基金持有期计算器
          this.fundHoldday()
          break
        case 'fundPurchase': // 基金申购费用计算器
          this.fundPurchase()
          break
      }
    })
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
  // 检查元素
  checkEle (ele, msg) {
    if (ele === '' || isNaN(ele) || ele === '0') {
      this.alertTips(msg)
      return false
    }
    return true
  }
  // 清空计算器
  clearCalc () {
    let inputs = this.element.querySelectorAll('.calc-input')
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].nodeName.toLowerCase() === 'input') {
        inputs[i].value = ''
      } else {
        inputs[i].innerHTML = ''
      }
    }
  }
  // 基金收益计算器
  fundIncome () {
    let invest = this.element.querySelector('#invest').value // 投入本金
    let recovery = this.element.querySelector('#recovery').value // 收回本金
    let holdday = this.element.querySelector('#holdday').value // 持有期限
    if (this.checkEle(invest, '请填写正确的投入本金') && this.checkEle(recovery, '请填写正确的收回金额') && this.checkEle(holdday, '请填写正确的持有期限')) {
      let totalRate = 100 * (recovery - invest) / invest
      let yearRate = (totalRate / holdday * 365).toFixed(2)

      this.element.querySelector('#total-rate').innerHTML = totalRate.toFixed(2)
      this.element.querySelector('#year-rate').innerHTML = yearRate
    }
  }
  // 基金赎回费用计算器
  fundRedeem () {
    let redeemNum = this.element.querySelector('#redeem-num').value // 赎回份额
    let netWorth = this.element.querySelector('#net-worth').value // 单位净值
    let redeemRate = this.element.querySelector('#redeem-rate').value // 赎回费率
    if (this.checkEle(redeemNum, '请填写正确的赎回份额') && this.checkEle(netWorth, '请填写正确的单位基金净值') && this.checkEle(redeemRate, '请填写正确的赎回费率')) {
      redeemRate = redeemRate / 100
      let serviceFee = (redeemNum * netWorth * redeemRate).toFixed(2)
      let confirmFee = (redeemNum * netWorth * (1 - redeemRate)).toFixed(2)

      this.element.querySelector('#service-fee').innerHTML = serviceFee
      this.element.querySelector('#confirm-fee').innerHTML = confirmFee
    }
  }
  // 基金持有期计算器
  fundHoldday () {
    let startTime = this.element.querySelector('#start-time').value
    let endTime = this.element.querySelector('#end-time').value
    if (startTime === '') {
      this.alertTips('请选择起始日期！')
      return
    }
    if (endTime === '') {
      this.alertTips('请选择起始日期！')
      return
    }
    let start = new Date(startTime)
    let end = new Date(endTime)
    if (end <= start) {
      this.alertTips('终止日期不能小于起始日期！')
    } else {
      let diff = parseInt(end - start) / 1000 / 60 / 60 / 24
      this.element.querySelector('#diff-day').innerHTML = diff
    }
  }
  // 基金申购费用计算器
  fundPurchase () {
    let buyMoney = this.element.querySelector('#buy-money').value
    let netWorth = this.element.querySelector('#net-worth').value
    let buyRate = this.element.querySelector('#buy-rate').value

    if (this.checkEle(buyMoney, '请填写正确的申（认）购金额') && this.checkEle(netWorth, '请填写正确的单位基金净值') && this.checkEle(buyRate, '请填写正确的申（认）购费率')) {
      let temp = buyRate * buyMoney / 100
      this.element.querySelector('#service-fee').innerHTML = round(temp / (1 + buyRate / 100), 2)
      this.element.querySelector('#trade-num').innerHTML = round((buyMoney - temp / (1 + buyRate / 100)) / netWorth, 2)
    }
  }
}
