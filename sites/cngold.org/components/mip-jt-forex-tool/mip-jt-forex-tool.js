import './index.less'

export default class MIPJtForexTool extends MIP.CustomElement {
  build () {
    let apiUrl = 'https://api.jijinhao.com'
    let type = this.element.getAttribute('type')
    // 结汇使用
    let mapCode = { 'codes': [
      { 'key': 'GBP', 'value': 'JO_190' },
      { 'key': 'HKD', 'value': 'JO_191' },
      { 'key': 'USD', 'value': 'JO_192' },
      { 'key': 'CHF', 'value': 'JO_193' },
      { 'key': 'SGD', 'value': 'JO_194' },
      { 'key': 'SEK', 'value': 'JO_195' },
      { 'key': 'DKK', 'value': 'JO_196' },
      { 'key': 'NOK', 'value': 'JO_197' },
      { 'key': 'JPY', 'value': 'JO_198' },
      { 'key': 'CAD', 'value': 'JO_199' },
      { 'key': 'AUD', 'value': 'JO_200' },
      { 'key': 'EUR', 'value': 'JO_201' },
      { 'key': 'MOP', 'value': 'JO_202' },
      { 'key': 'PHP', 'value': 'JO_203' },
      { 'key': 'THB', 'value': 'JO_204' },
      { 'key': 'NZD', 'value': 'JO_205' },
      { 'key': 'KRW', 'value': 'JO_206' },
      { 'key': 'RUB', 'value': 'JO_207' }
    ] }

    if (type === 'whdz') { // 外汇点值计算器
      initData()
      let length = document.getElementsByClassName('whdz_input').length
      for (let i = 0; i < length; i++) {
        document.getElementsByClassName('whdz_input')[i].addEventListener('change', function () {
          lotCalc()
        })
      }
    } else if (type === 'whlr') { // 外汇利润计算器
      $('selHbd').addEventListener('change', function () {
        getNew()
        profitCalc()
      })
      let length = document.getElementsByClassName('whlr_input').length
      for (let i = 0; i < length; i++) {
        document.getElementsByClassName('whlr_input')[i].addEventListener('change', function () {
          profitCalc()
        })
      }
    } else if (type === 'whbzj') { // 外汇保证金计算器
      $('selHbd').addEventListener('change', function () {
        getNew()
      })
      let length = document.getElementsByClassName('whbzj_input').length
      for (let i = 0; i < length; i++) {
        document.getElementsByClassName('whbzj_input')[i].addEventListener('change', function () {
          bondCalc()
        })
      }
    } else if (type === 'whmm') { // 外汇买卖计算器
      getResult($('moneytype').value, $('moneytypeTo').value, 'rate', 5)
      $('moneytype').addEventListener('change', function () {
        getResult($('moneytype').value, $('moneytypeTo').value, 'rate', 5)
      })
      $('moneytypeTo').addEventListener('change', function () {
        getResult($('moneytype').value, $('moneytypeTo').value, 'rate', 5)
      })
      let length = document.getElementsByClassName('whmm_input').length
      for (let i = 0; i < length; i++) {
        document.getElementsByClassName('whmm_input')[i].addEventListener('change', function () {
          dealCalc()
        })
      }
    } else if (type === 'gouhui') { // 购汇
      getResult($('fxType1').value, 'CNY', 'exRate1', 4)
      $('fxType1').addEventListener('change', function () {
        getResult($('fxType1').value, 'CNY', 'exRate1', 4)
      })
      $('buyAmt').addEventListener('change', function () {
        buyCalc()
      })
      $('exRate1').addEventListener('change', function () {
        buyCalc()
      })
    } else if (type === 'jiehui') { // 结汇
      let length = document.getElementsByClassName('jiehui_select').length
      for (let i = 0; i < length; i++) {
        document.getElementsByClassName('jiehui_select')[i].addEventListener('change', function () {
          getRate()
        })
      }
      getRate() // 初始化汇率数据
      $('exRate').addEventListener('change', function () {
        sumCalc()
      })
      $('sellAmt').addEventListener('change', function () {
        sumCalc()
      })
    }

    // ===============common==============
    // 定义$函数
    function $ (str) {
      return document.getElementById(str)
    }
    // 获取货币对对应的价格
    function getResult (c1, c2, id, size) {
      let from = c1
      let to = c2
      let param = 'from_tkc=' + from + '&to_tkc=' + to + '&amount=' + 1
      if (type === 'gouhui') {
        param = 'from_tkc=' + from + '&to_tkc=' + to + '&amount=' + 100
      }
      let url = apiUrl + '/plus/convert.htm?' + param
      fetch(url).then(function (res) {
        return res.text()
      }).then(function (text) {
        if (text.indexOf('=') !== '-1') {
          let num = text.split('=')[1].split('\'')[1]
          $(id).value = parseFloat(num).toFixed(size)
          if (id === 'txt_usdcad') {
            setTimeout(lotCalc, 50)
          }
          if (type === 'whbzj') {
            bondCalc()
          } else if (type === 'whmm') {
            dealCalc()
          } else if (type === 'gouhui') {
            buyCalc()
          }
        }
      })
    }
    // 弹窗提示
    function alertTips (str) {
      $('tool_tips').style.display = 'block'
      $('tool_tips_p').innerHTML = str
      setTimeout(function () {
        $('tool_tips').style.display = 'none'
      }, 1500)
    }

    // ===============外汇点值计算器==============
    // 初始化价格
    function initData () {
      getResult('EUR', 'USD', 'txt_eurusd', 4)
      getResult('GBP', 'USD', 'txt_gbpusd', 4)
      getResult('AUD', 'USD', 'txt_audusd', 4)
      getResult('USD', 'JPY', 'txt_usdjpy', 4)
      getResult('USD', 'CHF', 'txt_usdchf', 4)
      getResult('USD', 'CAD', 'txt_usdcad', 4)
    }
    // 点值计算
    function lotCalc () {
      let size = $('txtsize').value
      $('lot_eurusd').value = size / 10000
      $('lot_gbpusd').value = size / 10000
      $('lot_audusd').value = size / 10000
      let usdjpy = $('txt_usdjpy').value
      $('lot_usdjpy').value = parseFloat(size / usdjpy / 100).toFixed(4)
      let usdchf = $('txt_usdchf').value
      $('lot_usdchf').value = parseFloat(size / usdchf / 10000).toFixed(4)
      let usdcad = $('txt_usdcad').value
      $('lot_usdcad').value = parseFloat(size / usdcad / 10000).toFixed(4)
    }

    // ==============外汇利润计算器================
    // 货币对选择--利润计算器和保证金计算器共用
    function getNew () {
      let code = $('selHbd').value
      if (code !== '') {
        if (type === 'whlr') {
          let c1 = code.split('/')[0]
          let c2 = code.split('/')[1]
          $('nowtxt').innerHTML = '(' + c2 + '/USD)'
          $('jytxt').innerHTML = '(' + c1 + '/' + c2 + ')'

          getResult(c2, 'USD', 'txtNewPrice', 5)
          getResult(c1, c2, 'txtPc', 5)
          getResult(c1, c2, 'txtTrade', 5)
        } else if (type === 'whbzj') {
          $('nowtxt').innerHTML = '(' + code + '/USD)'
          getResult(code, 'USD', 'txtNewPrice', 5)
        }
      }
    }
    // 利润计算
    function profitCalc () {
      let kcl = $('txtKcl').value
      let regNum = /^\d+$/
      if (kcl === '' || !regNum.test(kcl)) {
        return
      }
      let cur = $('txtNewPrice').value
      if (cur !== '') {
        let pc = $('txtPc').value
        let trade = $('txtTrade').value
        let fx = $('selFx').value
        $('txtRes').innerHTML = parseFloat((pc - trade) * cur * kcl * fx).toFixed(2)
      }
    }

    // ==============外汇保证金计算器================
    // 保证金计算
    function bondCalc () {
      let kcl = $('txtKcl').value
      let regNum = /^\d+$/
      if (kcl === '' || !regNum.test(kcl)) {
        return
      }
      let gg = $('selGg').value
      let cur = $('txtNewPrice').value
      if (cur !== '') {
        $('txtRes').innerHTML = parseFloat(cur * kcl / gg).toFixed(2)
      }
    }

    // ==============外汇买卖计算器================
    // 外汇买卖计算
    function dealCalc () {
      let money = $('money').value
      let rate = $('rate').value
      if (money === '' || rate === '' || isNaN(money) || isNaN(rate) || money < 0 || rate < 0) {
      } else {
        money = money * 1
        $('total').innerHTML = (money * rate).toFixed(3)
      }
    }

    // ==============购汇================
    // 检查输入是否为正数
    function checkElem (curObj, msg) {
      if (checkEmpty(curObj, msg)) return false
      let re = /^([1-9]\d*((.\d+)*))|^(0\.\d*[1-9]\d*)/
      if (!re.test(curObj.value)) {
        alertTips(msg + '必须为正数')
        curObj.focus()
        curObj.select()
        return false
      }
      return true
    }
    // 输出保留两位小数
    function format (myFloat) {
      return Math.round(myFloat * Math.pow(10, 2)) / Math.pow(10, 2)
    }
    // 检查是否为空，是否为非数字
    function checkEmpty (curObj, msg) {
      let re = /[^0-9|.]/
      if (msg === null) msg = ''
      if (curObj.value === '') {
        curObj.focus()
        curObj.select()
        return true
      } else if (re.test(curObj.value)) {
        alertTips(msg + '不是数字')
        curObj.focus()
        curObj.select()
        return true
      }
    }
    // 购汇计算
    function buyCalc () {
      if (!checkElem($('buyAmt'), '您要买入的外币')) return false
      let a = parseFloat($('buyAmt').value)
      let r = parseFloat($('exRate1').value)
      $('pay').innerHTML = format(a * r / 100)
    }

    // ==============结汇================
    // 设置当前汇率值
    function getRate () {
      let codeMap = $('fxType2').value
      let code = ''
      let jsonArr = mapCode['codes']
      for (let i = 0; i < jsonArr.length; i++) {
        let temp = jsonArr[i]
        if (temp.key === codeMap) {
          code = temp.value
          break
        }
      }
      let type = $('typename').value
      getData(code, 'exRate', type)
    }
    // 获取汇率
    function getData (code, id, type) {
      let url = apiUrl + '/realtime/quote.htm?codes=' + code
      fetch(url).then(function (res) {
        return res.json()
      }).then(function (json) {
        if (json && json[0] && json[0].data && json[0].data[0] && json[0].data[0].quote && json[0].data[0].quote.q63) {
          let quote = json[0].data[0].quote
          let value = 0
          if (type === '1') {
            value = quote.q85
          } else if (type === '2') {
            value = quote.q83
          }
          $(id).value = parseFloat(value * 100.00).toFixed(2)
          sumCalc()
        }
      })
    }
    // 结汇计算
    function sumCalc () {
      if (!checkElem($('sellAmt'), '您要卖出的外币')) {
        return false
      }
      let a = parseFloat($('sellAmt').value)
      let r = parseFloat($('exRate').value)
      $('get').innerHTML = format(a * r / 100)
    }
  }
}
