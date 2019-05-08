export default class MIPJtInsuranceCarcalc extends MIP.CustomElement {
  build () {
    let that = this

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

    function calcAll () {
      if (!checkMoneyValidation()) {
        return false
      }

      if (that.element.querySelector('#txtMoney').value === '0' || that.element.querySelector('#txtMoney').value === '') {
        that.element.querySelector('#txtCompulsory').value = 0
        that.element.querySelector('#txtCommonTotal').value = 0
        that.element.querySelector('#txtTPL').value = 0
        that.element.querySelector('#txtCarDamage').value = 0
        that.element.querySelector('#txtTPL').value = 0
        that.element.querySelector('#txtCarTheft').value = 0
        that.element.querySelector('#txtBreakageOfGlass').value = 0
        that.element.querySelector('#txtSelfignite').value = 0
        that.element.querySelector('#txtAbatement').value = 0
        that.element.querySelector('#txtBlameless').value = 0
        that.element.querySelector('#txtCarDamageDW').value = 0
        that.element.querySelector('#txtLimitOfPassenger').value = 0
        // 公司报价=3+12
        calcCompany()
        // 市场报价=13*0.77
        calcMarket()

        return
      }

      if (that.element.querySelector('#txtMoney').value !== '0') {
        // 交强险
        calcCompulsory()
        // 第三者责任险
        calcThirdDuty()
        // 车辆损失险
        calcCarDamage()
        // 全车盗抢险
        calcCarTheft()
        // 玻璃单独破碎险
        calcBreakageOfGlass()
        // 自燃损失险
        calcSelfignite()
        // 不计免赔特约险
        calcAbatement()
        // 无过责任险
        calcBlameless()
        // 车上责任险
        calcLimitofPassenger()
        // 车身划痕险
        calcCarDamageDW()
        // 常规保险合计
        calcCommonTotal()
        // 公司报价=3+12
        calcCompany()
        // 市场报价=13*0.77
        calcMarket()
      }
    }

    function calcCompany () {
      // debugger;
      let companyTotal = formatCurrency(parseFloat(that.element.querySelector('#txtCompulsory').value) + parseFloat(that.element.querySelector('#txtCommonTotal').value))
      setSpanValueByBrowerType('spanTopCompany', companyTotal)
    }

    function calcMarket () {
      let MarketTotal = formatCurrency(parseInt((parseFloat(that.element.querySelector('#txtCompulsory').value) + parseFloat(that.element.querySelector('#txtCommonTotal').value)) * 0.77))
      setSpanValueByBrowerType('spanTopMarket', MarketTotal)
    }

    function setSpanValueByBrowerType (a, b) {
      that.element.querySelector('#' + a).innerHTML = b
    }

    function checkMoneyValidation () {
      if (isNaN(that.element.querySelector('#txtMoney').value)) {
        alertTips('请输入数字!')
        that.element.querySelector('#txtMoney').value = ''
        that.element.querySelector('#txtMoney').focus()
        return false
      }
      if (that.element.querySelector('#txtMoney').value === '0' || that.element.querySelector('#txtMoney').value === '') {
        that.element.querySelector('#divErrorInfo').style.display = ''
        that.element.querySelector('#divCalcInfo').style.display = 'none'
      } else {
        that.element.querySelector('#divErrorInfo').style.display = 'none'
        that.element.querySelector('#divCalcInfo').style.display = ''
      }
      return true
    }
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
    // 交强险
    function calcCompulsory () {
      let a = document.getElementsByClassName('rdo-force')
      for (let i = 0; i < a.length; i++) {
        if (a[i].checked) {
          that.element.querySelector('#txtCompulsory').value = a[i].value
          break
        }
      }
    }
    // 第三者责任险
    function calcThirdDuty () {
      let a = document.getElementsByClassName('rdo-force')
      if ((a[0].checked || a[1].checked) && that.element.querySelector('#chkTPL').checked) {
        that.element.querySelector('#txtTPL').className = ''
        let b = document.getElementsByClassName('rdo-tpl')
        if (a[0].checked) {
          if (b[0].checked) {
            that.element.querySelector('#txtTPL').value = '801'
          }
          if (b[1].checked) {
            that.element.querySelector('#txtTPL').value = '971'
          }
          if (b[2].checked) {
            that.element.querySelector('#txtTPL').value = '1120'
          }
          if (b[3].checked) {
            that.element.querySelector('#txtTPL').value = '1293'
          }
          if (b[4].checked) {
            that.element.querySelector('#txtTPL').value = '1412'
          }
        } else if (a[1].checked) {
          if (b[0].checked) {
            that.element.querySelector('#txtTPL').value = '685'
          }
          if (b[1].checked) {
            that.element.querySelector('#txtTPL').value = '831'
          }
          if (b[2].checked) {
            that.element.querySelector('#txtTPL').value = '958'
          }
          if (b[3].checked) {
            that.element.querySelector('#txtTPL').value = '1106'
          }
          if (b[4].checked) {
            that.element.querySelector('#txtTPL').value = '1208'
          }
        }
      } else {
        that.element.querySelector('#txtTPL').value = ''
        that.element.querySelector('#txtTPL').className = 'disablebox'
      }
    }
    // 车辆损失险
    function calcCarDamage () {
      if (that.element.querySelector('#chkCarDamage').checked) {
        that.element.querySelector('#txtCarDamage').className = ''
        that.element.querySelector('#txtCarDamage').value = Math.round(that.element.querySelector('#txtMoney').value * 0.012)
      } else {
        that.element.querySelector('#txtCarDamage').value = ''
        that.element.querySelector('#txtCarDamage').className = 'disablebox'
      }
    }
    // 全车盗抢险
    function calcCarTheft () {
      if (that.element.querySelector('#chkCarTheft').checked && that.element.querySelector('#chkCarDamage').checked) {
        that.element.querySelector('#txtCarTheft').className = ''
        that.element.querySelector('#txtCarTheft').value = Math.round(that.element.querySelector('#txtMoney').value * 0.01)
      } else {
        that.element.querySelector('#chkCarTheft').checked = false
        that.element.querySelector('#txtCarTheft').value = ''
        that.element.querySelector('#txtCarTheft').className = 'disablebox'
      }
    }
    // 玻璃单独破碎险
    function calcBreakageOfGlass () {
      if (that.element.querySelector('#chkBreakageOfGlass').checked) {
        that.element.querySelector('#txtBreakageOfGlass').className = ''
        let a = document.getElementsByClassName('rdo-glass')
        if (a[0].checked) {
          that.element.querySelector('#txtBreakageOfGlass').value = Math.round(that.element.querySelector('#txtMoney').value * 0.0025)
        }
        if (a[1].checked) {
          that.element.querySelector('#txtBreakageOfGlass').value = Math.round(that.element.querySelector('#txtMoney').value * 0.0015)
        }
      } else {
        that.element.querySelector('#txtBreakageOfGlass').value = ''
        that.element.querySelector('#txtBreakageOfGlass').className = 'disablebox'
      }
    }
    // 自燃损失险
    function calcSelfignite () {
      if (that.element.querySelector('#chkSelfignite').checked) {
        that.element.querySelector('#txtSelfignite').className = ''
        that.element.querySelector('#txtSelfignite').value = Math.round(that.element.querySelector('#txtMoney').value * 0.0015)
      } else {
        that.element.querySelector('#txtSelfignite').value = ''
        that.element.querySelector('#txtSelfignite').className = 'disablebox'
      }
    }
    // 不计免赔特约险
    function calcAbatement () {
      if (that.element.querySelector('#chkCarDamage').checked && that.element.querySelector('#chkTPL').checked && that.element.querySelector('#chkAbatement').checked) {
        that.element.querySelector('#txtAbatement').className = ''
        let a = parseInt(that.element.querySelector('#txtCarDamage').value) + parseInt(that.element.querySelector('#txtTPL').value)
        that.element.querySelector('#txtAbatement').value = Math.round(a * 0.2)
      } else {
        that.element.querySelector('#chkAbatement').checked = false
        that.element.querySelector('#txtAbatement').value = ''
        that.element.querySelector('#txtAbatement').className = 'disablebox'
      }
    }
    // 无过责任险
    function calcBlameless () {
      if (that.element.querySelector('#chkTPL').checked && that.element.querySelector('#chkBlameless').checked) {
        that.element.querySelector('#txtBlameless').className = ''
        that.element.querySelector('#txtBlameless').value = Math.round(that.element.querySelector('#txtTPL').value * 0.2)
      } else {
        that.element.querySelector('#chkBlameless').checked = false
        that.element.querySelector('#txtBlameless').value = ''
        that.element.querySelector('#txtBlameless').className = 'disablebox'
      }
    }
    // 车上责任险
    function calcLimitofPassenger () {
      if (that.element.querySelector('#chkLimitofPassenger').checked) {
        that.element.querySelector('#txtLimitOfPassenger').className = ''
        if (that.element.querySelector('#txtLimitOfPassenger').value === '0' || that.element.querySelector('#txtLimitOfPassenger').value === '') {
          that.element.querySelector('#txtLimitOfPassenger').value = '50'
        } else if (that.element.querySelector('#txtLimitOfPassenger').value % 50 !== 0) {
          alertTips('车上责任险的缴费额 = 每人的保费50元 * 车辆的实际座位数')
          that.element.querySelector('#txtLimitOfPassenger').value = '50'
        }
      } else {
        that.element.querySelector('#txtLimitOfPassenger').value = ''
        that.element.querySelector('#txtLimitOfPassenger').className = 'disablebox'
      }
    }
    // 车身划痕险
    function calcCarDamageDW () {
      if (that.element.querySelector('#chkCarDamage').checked && that.element.querySelector('#chkCarDamageDW').checked) {
        that.element.querySelector('#txtCarDamageDW').className = ''
        let a = document.getElementsByClassName('rdo-dw')
        if (that.element.querySelector('#txtMoney').value < 3E5) {
          if (a[0].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '400'
          }
          if (a[1].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '570'
          }
          if (a[2].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '760'
          }
          if (a[3].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '1140'
          }
        } else if (that.element.querySelector('#txtMoney').value > 5E5) {
          if (a[0].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '850'
          }
          if (a[1].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '1100'
          }
          if (a[2].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '1500'
          }
          if (a[3].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '2250'
          }
        } else {
          if (a[0].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '585'
          }
          if (a[1].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '900'
          }
          if (a[2].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '1170'
          }
          if (a[3].checked) {
            that.element.querySelector('#txtCarDamageDW').value = '1780'
          }
        }
      } else {
        that.element.querySelector('#chkCarDamageDW').checked = false
        that.element.querySelector('#txtCarDamageDW').value = ''
        that.element.querySelector('#txtCarDamageDW').className = 'disablebox'
      }
    }
    // 常规保险合计
    function calcCommonTotal () {
      let a = 0
      if (that.element.querySelector('#chkTPL').checked) {
        a += parseFloat(that.element.querySelector('#txtTPL').value)
      }
      if (that.element.querySelector('#chkCarDamage').checked) {
        a += parseFloat(that.element.querySelector('#txtCarDamage').value)
      }
      if (that.element.querySelector('#chkCarTheft').checked) {
        a += parseFloat(that.element.querySelector('#txtCarTheft').value)
      }
      if (that.element.querySelector('#chkBreakageOfGlass').checked) {
        a += parseFloat(that.element.querySelector('#txtBreakageOfGlass').value)
      }
      if (that.element.querySelector('#chkSelfignite').checked) {
        a += parseFloat(that.element.querySelector('#txtSelfignite').value)
      }
      if (that.element.querySelector('#chkAbatement').checked) {
        a += parseFloat(that.element.querySelector('#txtAbatement').value)
      }
      if (that.element.querySelector('#chkBlameless').checked) {
        a += parseFloat(that.element.querySelector('#txtBlameless').value)
      }
      if (that.element.querySelector('#chkLimitofPassenger').checked) {
        a += parseFloat(that.element.querySelector('#txtLimitOfPassenger').value)
      }
      if (that.element.querySelector('#chkCarDamageDW').checked) {
        a += parseFloat(that.element.querySelector('#txtCarDamageDW').value)
      }
      that.element.querySelector('#txtCommonTotal').value = Math.round(a)
    }

    that.element.querySelector('#txtMoney').addEventListener('input', function () {
      calcAll()
    })
    let calcInputs = document.getElementsByClassName('calc-input')
    for (let i = 0; i < calcInputs.length; i++) {
      calcInputs[i].addEventListener('click', function () {
        calcAll()
      })
    }
  }
}
