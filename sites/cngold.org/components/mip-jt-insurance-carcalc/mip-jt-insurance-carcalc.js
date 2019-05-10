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
    this.element.querySelector('#txtMoney').addEventListener('input', () => {
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
    if (this.element.querySelector('#chkTPL').checked) {
      a += parseFloat(this.element.querySelector('#txtTPL').value)
    }
    if (this.element.querySelector('#chkCarDamage').checked) {
      a += parseFloat(this.element.querySelector('#txtCarDamage').value)
    }
    if (this.element.querySelector('#chkCarTheft').checked) {
      a += parseFloat(this.element.querySelector('#txtCarTheft').value)
    }
    if (this.element.querySelector('#chkBreakageOfGlass').checked) {
      a += parseFloat(this.element.querySelector('#txtBreakageOfGlass').value)
    }
    if (this.element.querySelector('#chkSelfignite').checked) {
      a += parseFloat(this.element.querySelector('#txtSelfignite').value)
    }
    if (this.element.querySelector('#chkAbatement').checked) {
      a += parseFloat(this.element.querySelector('#txtAbatement').value)
    }
    if (this.element.querySelector('#chkBlameless').checked) {
      a += parseFloat(this.element.querySelector('#txtBlameless').value)
    }
    if (this.element.querySelector('#chkLimitofPassenger').checked) {
      a += parseFloat(this.element.querySelector('#txtLimitOfPassenger').value)
    }
    if (this.element.querySelector('#chkCarDamageDW').checked) {
      a += parseFloat(this.element.querySelector('#txtCarDamageDW').value)
    }
    this.element.querySelector('#txtCommonTotal').value = Math.round(a)
  }
  // 车身划痕险
  calcCarDamageDW () {
    if (this.element.querySelector('#chkCarDamage').checked && this.element.querySelector('#chkCarDamageDW').checked) {
      this.element.querySelector('#txtCarDamageDW').className = ''
      let a = document.getElementsByClassName('rdo-dw')
      if (this.element.querySelector('#txtMoney').value < 3E5) {
        if (a[0].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '400'
        }
        if (a[1].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '570'
        }
        if (a[2].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '760'
        }
        if (a[3].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '1140'
        }
      } else if (this.element.querySelector('#txtMoney').value > 5E5) {
        if (a[0].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '850'
        }
        if (a[1].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '1100'
        }
        if (a[2].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '1500'
        }
        if (a[3].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '2250'
        }
      } else {
        if (a[0].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '585'
        }
        if (a[1].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '900'
        }
        if (a[2].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '1170'
        }
        if (a[3].checked) {
          this.element.querySelector('#txtCarDamageDW').value = '1780'
        }
      }
    } else {
      this.element.querySelector('#chkCarDamageDW').checked = false
      this.element.querySelector('#txtCarDamageDW').value = ''
      this.element.querySelector('#txtCarDamageDW').className = 'disablebox'
    }
  }
  // 车上责任险
  calcLimitofPassenger () {
    if (this.element.querySelector('#chkLimitofPassenger').checked) {
      this.element.querySelector('#txtLimitOfPassenger').className = ''
      if (this.element.querySelector('#txtLimitOfPassenger').value === '0' || this.element.querySelector('#txtLimitOfPassenger').value === '') {
        this.element.querySelector('#txtLimitOfPassenger').value = '50'
      } else if (this.element.querySelector('#txtLimitOfPassenger').value % 50 !== 0) {
        this.alertTips('车上责任险的缴费额 = 每人的保费50元 * 车辆的实际座位数')
        this.element.querySelector('#txtLimitOfPassenger').value = '50'
      }
    } else {
      this.element.querySelector('#txtLimitOfPassenger').value = ''
      this.element.querySelector('#txtLimitOfPassenger').className = 'disablebox'
    }
  }
  // 无过责任险
  calcBlameless () {
    if (this.element.querySelector('#chkTPL').checked && this.element.querySelector('#chkBlameless').checked) {
      this.element.querySelector('#txtBlameless').className = ''
      this.element.querySelector('#txtBlameless').value = Math.round(this.element.querySelector('#txtTPL').value * 0.2)
    } else {
      this.element.querySelector('#chkBlameless').checked = false
      this.element.querySelector('#txtBlameless').value = ''
      this.element.querySelector('#txtBlameless').className = 'disablebox'
    }
  }
  // 不计免赔特约险
  calcAbatement () {
    if (this.element.querySelector('#chkCarDamage').checked && this.element.querySelector('#chkTPL').checked && this.element.querySelector('#chkAbatement').checked) {
      this.element.querySelector('#txtAbatement').className = ''
      let a = parseInt(this.element.querySelector('#txtCarDamage').value) + parseInt(this.element.querySelector('#txtTPL').value)
      this.element.querySelector('#txtAbatement').value = Math.round(a * 0.2)
    } else {
      this.element.querySelector('#chkAbatement').checked = false
      this.element.querySelector('#txtAbatement').value = ''
      this.element.querySelector('#txtAbatement').className = 'disablebox'
    }
  }
  // 自燃损失险
  calcSelfignite () {
    if (this.element.querySelector('#chkSelfignite').checked) {
      this.element.querySelector('#txtSelfignite').className = ''
      this.element.querySelector('#txtSelfignite').value = Math.round(this.element.querySelector('#txtMoney').value * 0.0015)
    } else {
      this.element.querySelector('#txtSelfignite').value = ''
      this.element.querySelector('#txtSelfignite').className = 'disablebox'
    }
  }
  // 玻璃单独破碎险
  calcBreakageOfGlass () {
    if (this.element.querySelector('#chkBreakageOfGlass').checked) {
      this.element.querySelector('#txtBreakageOfGlass').className = ''
      let a = document.getElementsByClassName('rdo-glass')
      if (a[0].checked) {
        this.element.querySelector('#txtBreakageOfGlass').value = Math.round(this.element.querySelector('#txtMoney').value * 0.0025)
      }
      if (a[1].checked) {
        this.element.querySelector('#txtBreakageOfGlass').value = Math.round(this.element.querySelector('#txtMoney').value * 0.0015)
      }
    } else {
      this.element.querySelector('#txtBreakageOfGlass').value = ''
      this.element.querySelector('#txtBreakageOfGlass').className = 'disablebox'
    }
  }
  // 全车盗抢险
  calcCarTheft () {
    if (this.element.querySelector('#chkCarTheft').checked && this.element.querySelector('#chkCarDamage').checked) {
      this.element.querySelector('#txtCarTheft').className = ''
      this.element.querySelector('#txtCarTheft').value = Math.round(this.element.querySelector('#txtMoney').value * 0.01)
    } else {
      this.element.querySelector('#chkCarTheft').checked = false
      this.element.querySelector('#txtCarTheft').value = ''
      this.element.querySelector('#txtCarTheft').className = 'disablebox'
    }
  }
  // 车辆损失险
  calcCarDamage () {
    if (this.element.querySelector('#chkCarDamage').checked) {
      this.element.querySelector('#txtCarDamage').className = ''
      this.element.querySelector('#txtCarDamage').value = Math.round(this.element.querySelector('#txtMoney').value * 0.012)
    } else {
      this.element.querySelector('#txtCarDamage').value = ''
      this.element.querySelector('#txtCarDamage').className = 'disablebox'
    }
  }
  // 第三者责任险
  calcThirdDuty () {
    let a = document.getElementsByClassName('rdo-force')
    if ((a[0].checked || a[1].checked) && this.element.querySelector('#chkTPL').checked) {
      this.element.querySelector('#txtTPL').className = ''
      let b = document.getElementsByClassName('rdo-tpl')
      if (a[0].checked) {
        if (b[0].checked) {
          this.element.querySelector('#txtTPL').value = '801'
        }
        if (b[1].checked) {
          this.element.querySelector('#txtTPL').value = '971'
        }
        if (b[2].checked) {
          this.element.querySelector('#txtTPL').value = '1120'
        }
        if (b[3].checked) {
          this.element.querySelector('#txtTPL').value = '1293'
        }
        if (b[4].checked) {
          this.element.querySelector('#txtTPL').value = '1412'
        }
      } else if (a[1].checked) {
        if (b[0].checked) {
          this.element.querySelector('#txtTPL').value = '685'
        }
        if (b[1].checked) {
          this.element.querySelector('#txtTPL').value = '831'
        }
        if (b[2].checked) {
          this.element.querySelector('#txtTPL').value = '958'
        }
        if (b[3].checked) {
          this.element.querySelector('#txtTPL').value = '1106'
        }
        if (b[4].checked) {
          this.element.querySelector('#txtTPL').value = '1208'
        }
      }
    } else {
      this.element.querySelector('#txtTPL').value = ''
      this.element.querySelector('#txtTPL').className = 'disablebox'
    }
  }
  // 交强险
  calcCompulsory () {
    let a = document.getElementsByClassName('rdo-force')
    for (let i = 0; i < a.length; i++) {
      if (a[i].checked) {
        this.element.querySelector('#txtCompulsory').value = a[i].value
        break
      }
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
  // 计算
  calcAll () {
    if (!this.checkMoneyValidation()) {
      return false
    }

    if (this.element.querySelector('#txtMoney').value === '0' || this.element.querySelector('#txtMoney').value === '') {
      this.element.querySelector('#txtCompulsory').value = 0
      this.element.querySelector('#txtCommonTotal').value = 0
      this.element.querySelector('#txtTPL').value = 0
      this.element.querySelector('#txtCarDamage').value = 0
      this.element.querySelector('#txtTPL').value = 0
      this.element.querySelector('#txtCarTheft').value = 0
      this.element.querySelector('#txtBreakageOfGlass').value = 0
      this.element.querySelector('#txtSelfignite').value = 0
      this.element.querySelector('#txtAbatement').value = 0
      this.element.querySelector('#txtBlameless').value = 0
      this.element.querySelector('#txtCarDamageDW').value = 0
      this.element.querySelector('#txtLimitOfPassenger').value = 0
      // 公司报价=3+12
      this.calcCompany()
      // 市场报价=13*0.77
      this.calcMarket()

      return
    }

    if (this.element.querySelector('#txtMoney').value !== '0') {
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
    let companyTotal = formatCurrency(parseFloat(this.element.querySelector('#txtCompulsory').value) + parseFloat(this.element.querySelector('#txtCommonTotal').value))
    this.element.querySelector('#spanTopCompany').innerHTML = companyTotal
  }
  // 市场价
  calcMarket () {
    let marketTotal = formatCurrency(parseInt((parseFloat(this.element.querySelector('#txtCompulsory').value) + parseFloat(this.element.querySelector('#txtCommonTotal').value)) * 0.77))
    this.element.querySelector('#spanTopMarket').innerHTML = marketTotal
  }
  // 检查输入框
  checkMoneyValidation () {
    if (isNaN(this.element.querySelector('#txtMoney').value)) {
      this.alertTips('请输入数字!')
      this.element.querySelector('#txtMoney').value = ''
      this.element.querySelector('#txtMoney').focus()
      return false
    }
    if (this.element.querySelector('#txtMoney').value === '0' || this.element.querySelector('#txtMoney').value === '') {
      this.element.querySelector('#divErrorInfo').style.display = ''
      this.element.querySelector('#divCalcInfo').style.display = 'none'
    } else {
      this.element.querySelector('#divErrorInfo').style.display = 'none'
      this.element.querySelector('#divCalcInfo').style.display = ''
    }
    return true
  }
}
