export default class MIPJtInsuranceCarcalc extends MIP.CustomElement {
  build () {
    // 定义$函数
    function $ (str) {
      return document.getElementById(str)
    }
    // 弹窗提示
    function alertTips (msg) {
      if (msg) {
        $('calc_tips').innerHTML = msg
        $('calc_tips').style.display = 'block'
        setTimeout(function () {
          $('calc_tips').style.display = 'none'
        }, 2000)
      }
    }

    function calcAll () {
      if (!checkMoneyValidation()) {
        return false
      }

      if ($('txtMoney').value === '0' || $('txtMoney').value === '') {
        $('txtCompulsory').value = 0
        $('txtCommonTotal').value = 0
        $('txtTPL').value = 0
        $('txtCarDamage').value = 0
        $('txtTPL').value = 0
        $('txtCarTheft').value = 0
        $('txtBreakageOfGlass').value = 0
        $('txtSelfignite').value = 0
        $('txtAbatement').value = 0
        $('txtBlameless').value = 0
        $('txtCarDamageDW').value = 0
        $('txtLimitOfPassenger').value = 0
        // 公司报价=3+12
        calcCompany()
        // 市场报价=13*0.77
        calcMarket()

        return
      }

      if ($('txtMoney').value !== '0') {
        // 交强险
        calcCompulsory()
        // 第三者责任险
        calcTPL()
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
      let companyTotal = formatCurrency(parseFloat($('txtCompulsory').value) + parseFloat($('txtCommonTotal').value))
      setSpanValueByBrowerType('spanTopCompany', companyTotal)
    }

    function calcMarket () {
      let MarketTotal = formatCurrency(parseInt((parseFloat($('txtCompulsory').value) + parseFloat($('txtCommonTotal').value)) * 0.77))
      setSpanValueByBrowerType('spanTopMarket', MarketTotal)
    }

    function setSpanValueByBrowerType (a, b) {
      $(a).innerHTML = b
    }

    function checkMoneyValidation () {
      if (isNaN($('txtMoney').value)) {
        alertTips('请输入数字!')
        $('txtMoney').value = ''
        $('txtMoney').focus()
        return false
      }
      if ($('txtMoney').value === '0' || $('txtMoney').value === '') {
        $('divErrorInfo').style.display = ''
        $('divCalcInfo').style.display = 'none'
      } else {
        $('divErrorInfo').style.display = 'none'
        $('divCalcInfo').style.display = ''
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
      let a = document.getElementsByClassName('rdoForce')
      for (let i = 0; i < a.length; i++) {
        if (a[i].checked) {
          $('txtCompulsory').value = a[i].value
          break
        }
      }
    }
    // 第三者责任险
    function calcTPL () {
      let a = document.getElementsByClassName('rdoForce')
      if ((a[0].checked || a[1].checked) && $('chkTPL').checked) {
        $('txtTPL').className = ''
        let b = document.getElementsByClassName('rdoTPL')
        if (a[0].checked) {
          if (b[0].checked) {
            $('txtTPL').value = '801'
          }
          if (b[1].checked) {
            $('txtTPL').value = '971'
          }
          if (b[2].checked) {
            $('txtTPL').value = '1120'
          }
          if (b[3].checked) {
            $('txtTPL').value = '1293'
          }
          if (b[4].checked) {
            $('txtTPL').value = '1412'
          }
        } else if (a[1].checked) {
          if (b[0].checked) {
            $('txtTPL').value = '685'
          }
          if (b[1].checked) {
            $('txtTPL').value = '831'
          }
          if (b[2].checked) {
            $('txtTPL').value = '958'
          }
          if (b[3].checked) {
            $('txtTPL').value = '1106'
          }
          if (b[4].checked) {
            $('txtTPL').value = '1208'
          }
        }
      } else {
        $('txtTPL').value = ''
        $('txtTPL').className = 'disablebox'
      }
    }
    // 车辆损失险
    function calcCarDamage () {
      if ($('chkCarDamage').checked) {
        $('txtCarDamage').className = ''
        $('txtCarDamage').value = Math.round($('txtMoney').value * 0.012)
      } else {
        $('txtCarDamage').value = ''
        $('txtCarDamage').className = 'disablebox'
      }
    }
    // 全车盗抢险
    function calcCarTheft () {
      if ($('chkCarTheft').checked && $('chkCarDamage').checked) {
        $('txtCarTheft').className = ''
        $('txtCarTheft').value = Math.round($('txtMoney').value * 0.01)
      } else {
        $('chkCarTheft').checked = false
        $('txtCarTheft').value = ''
        $('txtCarTheft').className = 'disablebox'
      }
    }
    // 玻璃单独破碎险
    function calcBreakageOfGlass () {
      if ($('chkBreakageOfGlass').checked) {
        $('txtBreakageOfGlass').className = ''
        let a = document.getElementsByClassName('rdoGlass')
        if (a[0].checked) {
          $('txtBreakageOfGlass').value = Math.round($('txtMoney').value * 0.0025)
        }
        if (a[1].checked) {
          $('txtBreakageOfGlass').value = Math.round($('txtMoney').value * 0.0015)
        }
      } else {
        $('txtBreakageOfGlass').value = ''
        $('txtBreakageOfGlass').className = 'disablebox'
      }
    }
    // 自燃损失险
    function calcSelfignite () {
      if ($('chkSelfignite').checked) {
        $('txtSelfignite').className = ''
        $('txtSelfignite').value = Math.round($('txtMoney').value * 0.0015)
      } else {
        $('txtSelfignite').value = ''
        $('txtSelfignite').className = 'disablebox'
      }
    }
    // 不计免赔特约险
    function calcAbatement () {
      if ($('chkCarDamage').checked && $('chkTPL').checked && $('chkAbatement').checked) {
        $('txtAbatement').className = ''
        let a = parseInt($('txtCarDamage').value) + parseInt($('txtTPL').value)
        $('txtAbatement').value = Math.round(a * 0.2)
      } else {
        $('chkAbatement').checked = false
        $('txtAbatement').value = ''
        $('txtAbatement').className = 'disablebox'
      }
    }
    // 无过责任险
    function calcBlameless () {
      if ($('chkTPL').checked && $('chkBlameless').checked) {
        $('txtBlameless').className = ''
        $('txtBlameless').value = Math.round($('txtTPL').value * 0.2)
      } else {
        $('chkBlameless').checked = false
        $('txtBlameless').value = ''
        $('txtBlameless').className = 'disablebox'
      }
    }
    // 车上责任险
    function calcLimitofPassenger () {
      if ($('chkLimitofPassenger').checked) {
        $('txtLimitOfPassenger').className = ''
        if ($('txtLimitOfPassenger').value === '0' || $('txtLimitOfPassenger').value === '') {
          $('txtLimitOfPassenger').value = '50'
        } else if ($('txtLimitOfPassenger').value % 50 !== 0) {
          alertTips('车上责任险的缴费额 = 每人的保费50元 * 车辆的实际座位数')
          $('txtLimitOfPassenger').value = '50'
        }
      } else {
        $('txtLimitOfPassenger').value = ''
        $('txtLimitOfPassenger').className = 'disablebox'
      }
    }
    // 车身划痕险
    function calcCarDamageDW () {
      if ($('chkCarDamage').checked && $('chkCarDamageDW').checked) {
        $('txtCarDamageDW').className = ''
        let a = document.getElementsByClassName('rdoDw')
        if ($('txtMoney').value < 3E5) {
          if (a[0].checked) {
            $('txtCarDamageDW').value = '400'
          }
          if (a[1].checked) {
            $('txtCarDamageDW').value = '570'
          }
          if (a[2].checked) {
            $('txtCarDamageDW').value = '760'
          }
          if (a[3].checked) {
            $('txtCarDamageDW').value = '1140'
          }
        } else if ($('txtMoney').value > 5E5) {
          if (a[0].checked) {
            $('txtCarDamageDW').value = '850'
          }
          if (a[1].checked) {
            $('txtCarDamageDW').value = '1100'
          }
          if (a[2].checked) {
            $('txtCarDamageDW').value = '1500'
          }
          if (a[3].checked) {
            $('txtCarDamageDW').value = '2250'
          }
        } else {
          if (a[0].checked) {
            $('txtCarDamageDW').value = '585'
          }
          if (a[1].checked) {
            $('txtCarDamageDW').value = '900'
          }
          if (a[2].checked) {
            $('txtCarDamageDW').value = '1170'
          }
          if (a[3].checked) {
            $('txtCarDamageDW').value = '1780'
          }
        }
      } else {
        $('chkCarDamageDW').checked = false
        $('txtCarDamageDW').value = ''
        $('txtCarDamageDW').className = 'disablebox'
      }
    }
    // 常规保险合计
    function calcCommonTotal () {
      let a = 0
      if ($('chkTPL').checked) {
        a += parseFloat($('txtTPL').value)
      }
      if ($('chkCarDamage').checked) {
        a += parseFloat($('txtCarDamage').value)
      }
      if ($('chkCarTheft').checked) {
        a += parseFloat($('txtCarTheft').value)
      }
      if ($('chkBreakageOfGlass').checked) {
        a += parseFloat($('txtBreakageOfGlass').value)
      }
      if ($('chkSelfignite').checked) {
        a += parseFloat($('txtSelfignite').value)
      }
      if ($('chkAbatement').checked) {
        a += parseFloat($('txtAbatement').value)
      }
      if ($('chkBlameless').checked) {
        a += parseFloat($('txtBlameless').value)
      }
      if ($('chkLimitofPassenger').checked) {
        a += parseFloat($('txtLimitOfPassenger').value)
      }
      if ($('chkCarDamageDW').checked) {
        a += parseFloat($('txtCarDamageDW').value)
      }
      $('txtCommonTotal').value = Math.round(a)
    }

    $('txtMoney').addEventListener('input', function () {
      calcAll()
    })
    let calcInputs = document.getElementsByClassName('calc_input')
    for (let i = 0; i < calcInputs.length; i++) {
      calcInputs[i].addEventListener('click', function () {
        calcAll()
      })
    }
  }
}
