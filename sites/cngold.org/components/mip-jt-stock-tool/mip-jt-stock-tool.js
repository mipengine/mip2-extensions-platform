import './index.less'

export default class MIPJtStockTool extends MIP.CustomElement {
  build () {
    let name = this.element.getAttribute('type')
    if (name === 'gpmcsxf') {
      // 股票卖出手续费计算
      document.getElementById('TradeType').onchange = function () {
        change()
      }
      document.getElementById('tool_btn01').onclick = function () {
        calcTradeFee()
      }
      document.getElementById('reset').onclick = function () {
        resetForm()
      }
    } else if (name === 'gpsyl') {
      // 股票收益率计算器
      document.getElementById('calc_gpsyl').onclick = function () {
        calcRatio()
      }
      document.getElementById('reset_gpsyl').onclick = function () {
        resetForm()
      }
    } else if (name === 'gpsy') {
      // 股票收益计算器
      document.getElementById('stock_stockType').onchange = function () {
        changeRateStock()
      }
      document.getElementById('calc_gpsy').onclick = function () {
        execStock()
      }
      document.getElementById('reset_gpsy').onclick = function () {
        resetForm()
      }
    }

    // 股票印花税
    let STOCK_RATE = 0.001
    // 根据id获取元素
    function $ (str) {
      return document.getElementById(str)
    }
    // 重新计算
    function resetForm () {
      let inputText = document.getElementsByClassName('input_text')
      for (let i = 0; i < inputText.length; i++) {
        inputText[i].value = ''
      }
      let input = document.getElementsByClassName('input')
      for (let i = 0; i < input.length; i++) {
        input[i].value = ''
      }
    }
    // 弹窗提示
    function alert (msg) {
      $('tips_p').innerHTML = msg
      $('tips').style.display = 'block'
      document.body.classList.add('noscroll')
      setTimeout(function () {
        document.getElementById('tips').style.display = 'none'
        document.body.classList.remove('noscroll')
      }, 1500)
    }

    /**
     *股票计算器
     *@date 2009-9-16
     */

    function checkData () {
      if (!checkFN3($('edprice'), '请在股票价格中输入正数', false)) return false
      if (!checkFN3($('edone'), '请在企业每股税后利润中输入正数', false)) return false
      return true
    }
    function calcRatio () {
      if (!checkData()) {
        return false
      }
      let valprice = parseFloat($('edprice').value)
      let valone = parseFloat($('edone').value)

      let valresult = round(valprice / valone)
      $('edresult').value = valresult
    }

    /**
     *股票成交税费
     *@date 2009-9-16
     */
    function calcTradeFee () {
      if (!checkFN3($('edtradeprice'), '请在股票成交价格中输入正数', false, null, 4)) return false
      if (!checkPN($('edtradenum'), '请在成交量中输入正整数', false)) return false
      if (!checkFN3($('edtraderate'), '请在佣金比例中输入非负数', true)) return false
      let obj = ComputeTradeFee(parseInt($('TradeType').value))
      $('txt1').value = round(obj.r1)
      $('txt2').value = round(obj.r2)
      $('txt3').value = round(obj.r3)
      $('txttotal').value = round(obj.r1 + obj.r2 + obj.r3)
      if ($('lb_txt4').style.display === 'block') {
        $('txt4').value = round(obj.r4)
        $('txttotal').value = round(parseFloat($('txttotal').value) + obj.r4)
      }
    }
    function change () {
      let label = $('Lab3')
      switch ($('TradeType').value) {
        case '1':
        // 上A
        {
          label.innerHTML = '过户费：'
          $('lb_txt4').style.display = 'none'
          $('Lab4').style.display = 'none'
          break
        }
        case '3':
        // 深A
        {
          label.innerHTML = '监督管理和经手费：'
          $('lb_txt4').style.display = 'none'
          $('Lab4').style.display = 'none'
          break
        }
        case '2':
        // 上B
        {
          label.innerHTML = '结算费：'
          $('Lab4').innerHTML = '过户费：'
          $('lb_txt4').style.display = 'block'
          $('Lab4').style.display = 'block'

          break
        }
        case '4':
        // 深B
        {
          label.innerHTML = '交易规费：'
          $('Lab4').innerHTML = '结算费：'
          $('lb_txt4').style.display = 'block'
          $('Lab4').style.display = 'block'
          break
        }
      }
      $('txt1').value = '计算得出'
      $('txt2').value = '计算得出'
      $('txt3').value = '计算得出'
      $('txt4').value = '计算得出'
      $('txttotal').value = '计算得出'
    }
    function ComputeTradeFee (iType) {
      let tradenum = parseInt($('edtradenum').value)
      let tradeprice = parseFloat($('edtradeprice').value)
      let traderate = parseFloat($('edtraderate').value) / 100
      let tradesum = tradeprice * tradenum

      let obj = {}

      obj.r1 = tradesum * STOCK_RATE // 印花税
      obj.r2 = tradesum * traderate // 佣金
      switch (iType) {
        case 1:
        // 上A
        {
          obj.r3 = tradenum * 0.001 // 过户费
          if (obj.r3 < 1) { // aiai, 过户费最低为￥1.0
            obj.r3 = 1
          }
          if (obj.r2 < 5) { // aiai,佣金最低为￥5.0
            obj.r2 = 5
          }
          break
        }
        case 3:
        // 深A
        {
          obj.r3 = tradesum * 0.0001875 // 监督管理费和经手费
          if (obj.r2 < 5) { // aiai,佣金最低为￥5.0
            obj.r2 = 5
          }
          break
        }
        case 2:
        // 上B
        {
          obj.r3 = tradesum * 0.0005 // 结算费
          obj.r4 = tradenum * 0.001 // 交易过户费
          break
        }
        case 4:
        // 深B
        {
          obj.r3 = tradesum * 0.000341 // 交易规费
          obj.r4 = tradesum * 0.0005 // 结算费
          if (obj.r4 > 500) obj.r4 = 500
          break
        }
      }
      return obj
    }

    function trim (strSource) {
      return strSource.replace(/^\s*/, '').replace(/\s*$/, '')
    }

    let maxfn = 99999999.9
    let maxpn = 99999999
    let overerrormsg = '数值超过最大值99999999'

    // 功能： 校验一个正整数
    // 入口参数：
    // CheckCtl: 要校验的输入框
    // disptext: 出错显示的信息
    // IsCanZero : 是否可以为零
    function checkPN (CheckCtl, disptext, IsCanZero, page) {
      let s = trim(CheckCtl.value).toString()
      let temp = parseInt(s, 10)
      let result = true
      if ((isNaN(temp)) || (temp < 0) || (s.indexOf('.') >= 0) || (temp !== parseInt(s, 10))) {
        result = false
      } else if ((!IsCanZero) && (temp === 0)) {
        result = false
      }
      if (temp > maxpn) {
        result = false
        disptext = overerrormsg
      }
      if (!result) {
        dispMessage(CheckCtl, disptext)
        return false
      }
      return true
    }
    // 功能：校验一个合法的大于等于0的浮点数
    // 入口参数：
    // CheckCtl: 要校验的输入框
    // disptext: 出错显示的信息
    // floatcount: 小数的最高位数（如果没有该参数，则默认为2位）
    // 如果没有page参数，有floatcunt参数则：把page 置null
    // 如:   CheckFN(CheckCtl,"出错显示的信息",null,5)
    function checkFn (CheckCtl, disptext, page, floatcount) {
      let s = trim(CheckCtl.value).toString()
      let temp = parseFloat(s)
      let result = true
      if ((isNaN(temp)) || (temp < 0) || (temp !== parseFloat(s))) {
        result = false
      } else if (temp > maxfn) {
        result = false
        disptext = overerrormsg
      } else {
        let limitcount = floatcount || 2
        let array = s.split('.')
        let count
        if (array[1] === null || array[1] === undefined) {
          count = -1
        } else {
          let str = array[1].toString()
          count = str.length
        }
        if (count > limitcount) {
          alert('小数位数超过' + limitcount + '位')
          CheckCtl.select()
          CheckCtl.focus()
          return false
        }
      }
      if (!result) {
        dispMessage(CheckCtl, disptext)
        return false
      }
      return true
    }
    function checkFN3 (CheckCtl, disptext, IsCanZero, page, floatcount) {
      if (checkFn(CheckCtl, disptext, page, floatcount)) {
        if ((parseFloat(CheckCtl.value) === 0) && (!IsCanZero)) {
          dispMessage(CheckCtl, disptext)
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    }

    function dispMessage (CheckCtl, Msg) {
      if (Msg !== '') {
        alert(Msg)
        CheckCtl.select()
        CheckCtl.focus()
      }
    }

    // 取整函数
    // eg. Round(132.123456) 为 132.12
    // eg. Round(132.123456,4) 为 132.1234
    // eg. Round(132.123456,0) 为 132
    function round (i, digit) {
      let p
      if (digit === 0) {
        p = 1
      } else {
        if (digit) {
          p = Math.pow(10, digit)
        } else {
          p = 100
        }
      }
      return Math.round(i * p) / p
    }

    // 股票收益计算器
    let secTax = [{
      commision: 0.2,
      commisionLeast: 5,
      fjf: 0,
      ghf: 0.1,
      id: 1,
      name: '沪A股',
      stampTax: 0.3,
      type: 10,
      validity: false
    },
    {
      commision: 0.2,
      commisionLeast: 1,
      fjf: 0,
      ghf: 0.05,
      id: 2,
      name: '沪B股',
      stampTax: 0.3,
      type: 11,
      validity: false
    },
    {
      commision: 0.2,
      commisionLeast: 5,
      fjf: 0,
      ghf: 0,
      id: 3,
      name: '沪基金',
      stampTax: 0,
      type: 12,
      validity: false
    },
    {
      commision: 0.1,
      commisionLeast: 5,
      fjf: 0,
      ghf: 0,
      id: 4,
      name: '沪债券',
      stampTax: 0,
      type: 13,
      validity: false
    },
    {
      commision: 0.2,
      commisionLeast: 5,
      fjf: 0,
      ghf: 0,
      id: 5,
      name: '深A股',
      stampTax: 0.3,
      type: 0,
      validity: false
    },
    {
      commision: 0.2,
      commisionLeast: 5,
      fjf: 0,
      ghf: 0.05,
      id: 6,
      name: '深B股',
      stampTax: 0.3,
      type: 1,
      validity: false
    },
    {
      commision: 0.2,
      commisionLeast: 5,
      fjf: 0,
      ghf: 0,
      id: 7,
      name: '深基金',
      stampTax: 0,
      type: 2,
      validity: false
    },
    {
      commision: 0.1,
      commisionLeast: 5,
      fjf: 0,
      ghf: 0,
      id: 8,
      name: '深债券',
      stampTax: 0,
      type: 3,
      validity: false
    }]
    function changeRateStock () {
      let valueBox = document.getElementById('stock_stockType').value
      document.getElementById('stock_rate').value = secTax[valueBox].commision + secTax[valueBox].stampTax
    }

    // 买入交易额=买入价格*交易数量
    // 买入税费=买入价格*综合交易费率%*交易数量
    // 买入成本=买入交易额+买入税费=买入价格*(1+综合交易费率%)*交易数量
    // 卖出交易额=卖出价格*交易数量
    // 卖出税费=卖出价格*综合交易费率%*交易数量
    // 卖出金额=卖出交易额-卖出税费
    // 参考保本价=买入价格×(1＋综合交易费率％)÷(1－综合交易费率％)
    // 盈亏额=卖出金额－买入成本
    // 收益率＝盈亏额/买入成本
    function execStock () {
      let rate = document.getElementById('stock_rate').value / 100
      let tradeAmount = document.getElementById('stock_tradeAmount').value
      let buyPrice = document.getElementById('stock_buyPrice').value
      let sellPrice = document.getElementById('stock_sellPrice').value
      let strAlert = ''
      if (checkNumber(tradeAmount) === false) {
        strAlert = '--请输入交易数量，且必须为数字\r\n'
        alert(strAlert)
        return
      }
      if (checkNumber(buyPrice) === false) {
        strAlert = '--请输入买入价格，且必须为数字\r\n'
        alert(strAlert)
        return
      }
      if (checkNumber(sellPrice) === false) {
        strAlert = '--请输入卖出价格，且必须为数字'
        alert(strAlert)
        return
      }

      $('stock_buyTradeSum').value = formatFloat(buyPrice * tradeAmount, 2)
      $('stock_buyTax').value = formatFloat(buyPrice * rate * tradeAmount, 2)
      let tradeSum = $('stock_buyTradeSum').value
      let buyTax = $('stock_buyTax').value
      $('stock_buyCost').value = formatFloat(Number(tradeSum) + Number(buyTax), 2)

      $('stock_sellTradeSum').value = formatFloat(sellPrice * tradeAmount, 2)
      $('stock_sellTax').value = formatFloat(sellPrice * rate * tradeAmount, 2)
      let sellTradeSum = $('stock_sellTradeSum').value
      let sellTax = $('stock_sellTax').value
      $('stock_gainSum').value = formatFloat(Number(sellTradeSum) - Number(sellTax), 2)

      $('stock_reCapitalPrice').value = Math.round(100 * buyPrice * (1 + rate) / (1 - rate)) / 100
      $('stock_profitSum').value = Math.round(100 * (Number($('stock_gainSum').value) - Number($('stock_buyCost').value))) / 100
      $('stock_yield').value = Math.round(100 * $('stock_profitSum').value * 100 / $('stock_buyCost').value) / 100
    }

    // 验证一个值是否为数字,value：值
    function checkNumber (value) {
      let reNumber = /^[0-9]+.?[0-9]*$/
      if (!reNumber.test(value)) {
        return false
      }
      return true
    }
    // 格式化float类型，保留小数点若干位
    // param {Object} src
    // param {Object} pos
    function formatFloat (src, pos) {
      return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos)
    }
  }
}

