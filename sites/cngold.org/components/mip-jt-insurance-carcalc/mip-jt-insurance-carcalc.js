// 格式化数据
function formatCurrency (a) {
  a = a.toString().replace(/\$|,/g, '')
  if (isNaN(a)) {
    a = '0'
  }

  let sign = parseInt(a) === (a = Math.abs(a))
  a = Math.floor(a * 100 + 0.50000000001)
  a = Math.floor(a / 100).toString()
  for (let b = 0; b < Math.floor((a.length - (1 + b)) / 3); b++) {
    a = a.substring(0, a.length - (4 * b + 3)) + ',' + a.substring(a.length - (4 * b + 3))
  }
  return (sign ? '' : '-') + a
}

export default class MIPJtInsuranceCarcalc extends MIP.CustomElement {
  build () {
    this.element.querySelector('#txt-money').addEventListener('input', () => {
      this.calcAll()
    })
    let calcInputs = document.getElementsByClassName('calc-input')
    for (let i = 0; i < calcInputs.length; i++) {
      calcInputs[i].addEventListener('click', () => {
        this.calcAll()
      })
    }
  }
  // 常规保险合计
  calcCommonTotal () {
    let a = 0
    if (this.element.querySelector('#chk-third').checked) {
      a += parseFloat(this.element.querySelector('#txt-third').value)
    }
    if (this.element.querySelector('#chk-car-damage').checked) {
      a += parseFloat(this.element.querySelector('#txt-car-damage').value)
    }
    if (this.element.querySelector('#chk-car-theft').checked) {
      a += parseFloat(this.element.querySelector('#txt-car-theft').value)
    }
    if (this.element.querySelector('#chk-breakage-of-glass').checked) {
      a += parseFloat(this.element.querySelector('#txt-breakage-of-glass').value)
    }
    if (this.element.querySelector('#chk-selfignite').checked) {
      a += parseFloat(this.element.querySelector('#txt-selfignite').value)
    }
    if (this.element.querySelector('#chk-abatement').checked) {
      a += parseFloat(this.element.querySelector('#txt-abatement').value)
    }
    if (this.element.querySelector('#chk-blameless').checked) {
      a += parseFloat(this.element.querySelector('#txt-blameless').value)
    }
    if (this.element.querySelector('#chk-limit-of-passenger').checked) {
      a += parseFloat(this.element.querySelector('#txt-limit-of-passenger').value)
    }
    if (this.element.querySelector('#chk-car-damage-dw').checked) {
      a += parseFloat(this.element.querySelector('#txt-car-damage-dw').value)
    }
    this.element.querySelector('#txt-common-total').value = Math.round(a)
  }
  // 车身划痕险
  calcCarDamageDW () {
    let txtCarDamageDw = this.element.querySelector('#txt-car-damage-dw')
    if (this.element.querySelector('#chk-car-damage').checked && this.element.querySelector('#chk-car-damage-dw').checked) {
      txtCarDamageDw.className = ''
      let a = document.getElementsByClassName('rdo-dw')
      if (this.element.querySelector('#txt-money').value < 3E5) {
        if (a[0].checked) {
          txtCarDamageDw.value = '400'
        }
        if (a[1].checked) {
          txtCarDamageDw.value = '570'
        }
        if (a[2].checked) {
          txtCarDamageDw.value = '760'
        }
        if (a[3].checked) {
          txtCarDamageDw.value = '1140'
        }
      } else if (this.element.querySelector('#txt-money').value > 5E5) {
        if (a[0].checked) {
          txtCarDamageDw.value = '850'
        }
        if (a[1].checked) {
          txtCarDamageDw.value = '1100'
        }
        if (a[2].checked) {
          txtCarDamageDw.value = '1500'
        }
        if (a[3].checked) {
          txtCarDamageDw.value = '2250'
        }
      } else {
        if (a[0].checked) {
          txtCarDamageDw.value = '585'
        }
        if (a[1].checked) {
          txtCarDamageDw.value = '900'
        }
        if (a[2].checked) {
          txtCarDamageDw.value = '1170'
        }
        if (a[3].checked) {
          txtCarDamageDw.value = '1780'
        }
      }
    } else {
      this.element.querySelector('#chk-car-damage-dw').checked = false
      txtCarDamageDw.value = ''
      txtCarDamageDw.className = 'disablebox'
    }
  }
  // 车上责任险
  calcLimitofPassenger () {
    let txtLimitOfPassenger = this.element.querySelector('#txt-limit-of-passenger')
    if (this.element.querySelector('#chk-limit-of-passenger').checked) {
      txtLimitOfPassenger.className = ''
      if (txtLimitOfPassenger.value === '0' || txtLimitOfPassenger.value === '') {
        txtLimitOfPassenger.value = '50'
      } else if (txtLimitOfPassenger.value % 50 !== 0) {
        this.alertTips('车上责任险的缴费额 = 每人的保费50元 * 车辆的实际座位数')
        txtLimitOfPassenger.value = '50'
      }
    } else {
      txtLimitOfPassenger.value = ''
      txtLimitOfPassenger.className = 'disablebox'
    }
  }
  // 无过责任险
  calcBlameless () {
    let txtBlameless = this.element.querySelector('#txt-blameless')
    if (this.element.querySelector('#chk-third').checked && this.element.querySelector('#chk-blameless').checked) {
      txtBlameless.className = ''
      txtBlameless.value = Math.round(this.element.querySelector('#txt-third').value * 0.2)
    } else {
      this.element.querySelector('#chk-blameless').checked = false
      txtBlameless.value = ''
      txtBlameless.className = 'disablebox'
    }
  }
  // 不计免赔特约险
  calcAbatement () {
    let chkAbatement = this.element.querySelector('#chk-abatement')
    let txtAbatement = this.element.querySelector('#txt-abatement')
    if (this.element.querySelector('#chk-car-damage').checked && this.element.querySelector('#chk-third').checked && chkAbatement.checked) {
      txtAbatement.className = ''
      let a = parseInt(this.element.querySelector('#txt-car-damage').value) + parseInt(this.element.querySelector('#txt-third').value)
      txtAbatement.value = Math.round(a * 0.2)
    } else {
      chkAbatement.checked = false
      txtAbatement.value = ''
      txtAbatement.className = 'disablebox'
    }
  }
  // 自燃损失险
  calcSelfignite () {
    let txtSelfignite = this.element.querySelector('#txt-selfignite')
    if (this.element.querySelector('#chk-selfignite').checked) {
      txtSelfignite.className = ''
      txtSelfignite.value = Math.round(this.element.querySelector('#txt-money').value * 0.0015)
    } else {
      txtSelfignite.value = ''
      txtSelfignite.className = 'disablebox'
    }
  }
  // 玻璃单独破碎险
  calcBreakageOfGlass () {
    let txtBreakageOfGlass = this.element.querySelector('#txt-breakage-of-glass')
    if (this.element.querySelector('#chk-breakage-of-glass').checked) {
      txtBreakageOfGlass.className = ''
      let a = document.getElementsByClassName('rdo-glass')
      if (a[0].checked) {
        txtBreakageOfGlass.value = Math.round(this.element.querySelector('#txt-money').value * 0.0025)
      }
      if (a[1].checked) {
        txtBreakageOfGlass.value = Math.round(this.element.querySelector('#txt-money').value * 0.0015)
      }
    } else {
      txtBreakageOfGlass.value = ''
      txtBreakageOfGlass.className = 'disablebox'
    }
  }
  // 全车盗抢险
  calcCarTheft () {
    let txtCarTheft = this.element.querySelector('#txt-car-theft')
    if (this.element.querySelector('#chk-car-theft').checked && this.element.querySelector('#chk-car-damage').checked) {
      txtCarTheft.className = ''
      txtCarTheft.value = Math.round(this.element.querySelector('#txt-money').value * 0.01)
    } else {
      this.element.querySelector('#chk-car-theft').checked = false
      txtCarTheft.value = ''
      txtCarTheft.className = 'disablebox'
    }
  }
  // 车辆损失险
  calcCarDamage () {
    let txtCarDamage = this.element.querySelector('#txt-car-damage')
    if (this.element.querySelector('#chk-car-damage').checked) {
      txtCarDamage.className = ''
      txtCarDamage.value = Math.round(this.element.querySelector('#txt-money').value * 0.012)
    } else {
      txtCarDamage.value = ''
      txtCarDamage.className = 'disablebox'
    }
  }
  // 第三者责任险
  calcThirdDuty () {
    let txtThird = this.element.querySelector('#txt-third')
    let a = document.getElementsByClassName('rdo-force')
    if ((a[0].checked || a[1].checked) && this.element.querySelector('#chk-third').checked) {
      txtThird.className = ''
      let b = document.getElementsByClassName('rdo-tpl')
      if (a[0].checked) {
        if (b[0].checked) {
          txtThird.value = '801'
        }
        if (b[1].checked) {
          txtThird.value = '971'
        }
        if (b[2].checked) {
          txtThird.value = '1120'
        }
        if (b[3].checked) {
          txtThird.value = '1293'
        }
        if (b[4].checked) {
          txtThird.value = '1412'
        }
      } else if (a[1].checked) {
        if (b[0].checked) {
          txtThird.value = '685'
        }
        if (b[1].checked) {
          txtThird.value = '831'
        }
        if (b[2].checked) {
          txtThird.value = '958'
        }
        if (b[3].checked) {
          txtThird.value = '1106'
        }
        if (b[4].checked) {
          txtThird.value = '1208'
        }
      }
    } else {
      txtThird.value = ''
      txtThird.className = 'disablebox'
    }
  }
  // 交强险
  calcCompulsory () {
    let a = document.getElementsByClassName('rdo-force')
    for (let i = 0; i < a.length; i++) {
      if (a[i].checked) {
        this.element.querySelector('#txt-compulsory').value = a[i].value
        break
      }
    }
  }
  // 弹窗提示
  alertTips (msg) {
    let calcTips = this.element.querySelector('#calc-tips')
    if (msg) {
      calcTips.innerHTML = msg
      calcTips.style.display = 'block'
      setTimeout(() => {
        calcTips.style.display = 'none'
      }, 2000)
    }
  }
  // 计算
  calcAll () {
    if (!this.checkMoneyValidation()) {
      return false
    }

    if (this.element.querySelector('#txt-money').value === '0' || this.element.querySelector('#txt-money').value === '') {
      this.element.querySelector('#txt-compulsory').value = 0
      this.element.querySelector('#txt-common-total').value = 0
      this.element.querySelector('#txt-third').value = 0
      this.element.querySelector('#txt-car-damage').value = 0
      this.element.querySelector('#txt-third').value = 0
      this.element.querySelector('#txt-car-theft').value = 0
      this.element.querySelector('#txt-breakage-of-glass').value = 0
      this.element.querySelector('#txt-selfignite').value = 0
      this.element.querySelector('#txt-abatement').value = 0
      this.element.querySelector('#txt-blameless').value = 0
      this.element.querySelector('#txt-car-damage-dw').value = 0
      this.element.querySelector('#txt-limit-of-passenger').value = 0
      // 公司报价=3+12
      this.calcCompany()
      // 市场报价=13*0.77
      this.calcMarket()

      return
    }

    if (this.element.querySelector('#txt-money').value !== '0') {
      // 交强险
      this.calcCompulsory()
      // 第三者责任险
      this.calcThirdDuty()
      // 车辆损失险
      this.calcCarDamage()
      // 全车盗抢险
      this.calcCarTheft()
      // 玻璃单独破碎险
      this.calcBreakageOfGlass()
      // 自燃损失险
      this.calcSelfignite()
      // 不计免赔特约险
      this.calcAbatement()
      // 无过责任险
      this.calcBlameless()
      // 车上责任险
      this.calcLimitofPassenger()
      // 车身划痕险
      this.calcCarDamageDW()
      // 常规保险合计
      this.calcCommonTotal()
      // 公司报价=3+12
      this.calcCompany()
      // 市场报价=13*0.77
      this.calcMarket()
    }
  }
  // 公司报价
  calcCompany () {
    let companyTotal = formatCurrency(parseFloat(this.element.querySelector('#txt-compulsory').value) + parseFloat(this.element.querySelector('#txt-common-total').value))
    this.element.querySelector('#span-top-company').innerHTML = companyTotal
  }
  // 市场价
  calcMarket () {
    let marketTotal = formatCurrency(parseInt((parseFloat(this.element.querySelector('#txt-compulsory').value) + parseFloat(this.element.querySelector('#txt-common-total').value)) * 0.77))
    this.element.querySelector('#span-top-market').innerHTML = marketTotal
  }
  // 检查输入框
  checkMoneyValidation () {
    let txtMoney = this.element.querySelector('#txt-money')
    let divErrorInfo = this.element.querySelector('#div-error-info')
    let divCalcInfo = this.element.querySelector('#div-calc-info')
    if (isNaN(txtMoney.value)) {
      this.alertTips('请输入数字!')
      txtMoney.value = ''
      txtMoney.focus()
      return false
    }
    if (txtMoney.value === '0' || txtMoney.value === '') {
      divErrorInfo.style.display = ''
      divCalcInfo.style.display = 'none'
    } else {
      divErrorInfo.style.display = 'none'
      divCalcInfo.style.display = ''
    }
    return true
  }
}
