import './index.less'

export default class MIPJtForexSavecalc extends MIP.CustomElement {
  build () {
    $('ccfxType').onchange = function () {
      choseCoin(this.value)
    }
    $('ccfxTime').onchange = function () {
      choseKind(this.value)
      saveCalc()
    }
    let length = document.getElementsByClassName('whcx_input').length
    for (let i = 0; i < length; i++) {
      document.getElementsByClassName('whcx_input')[i].addEventListener('blur', function () {
        saveCalc()
      })
    }

    // 定义$函数
    function $ (id) {
      return document.getElementById(id)
    }
    // 弹窗提示
    function alertTips (str) {
      $('tool_tips').style.display = 'block'
      $('tool_tips_p').innerHTML = str
      setTimeout(function () {
        $('tool_tips').style.display = 'none'
      }, 1500)
    }
    // 检查元素是否为正数
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
    // 检查元素是否为空
    function checkEmpty (curObj, msg) {
      if (msg === null) msg = ''
      if (curObj.value === '') {
        curObj.focus()
        curObj.select()
        return true
      }
    }
    // 格式化数据
    function format (myFloat) {
      return Math.round(myFloat * Math.pow(10, 2)) / Math.pow(10, 2)
    }

    // 币种选择
    function choseCoin (val) {
      let str = $('ccfxType')[val].innerHTML
      $('ccunit1').innerHTML = str
      $('ccunit2').innerHTML = str
    }
    // 存款期限种类选择
    function choseKind (n) {
      $('ccrd').value = n
      if (n <= 7) {
        $('saveTr').style.display = 'block'
      } else {
        $('saveTr').style.display = 'none'
      }
    }
    // 获取两个日期相差的天数
    function getDiffDay (firstDate, secondDate) {
      let date1 = new Date(firstDate)
      let date2 = new Date(secondDate)
      let diff = Math.abs(date1.getTime() - date2.getTime())
      let result = parseInt(diff / (1000 * 60 * 60 * 24), 10)
      return result
    }
    // 计算
    function saveCalc () {
      if (!checkElem($('ccsaveAmt'), '存款金额')) return false
      if (!checkElem($('ccyearRate'), '存款年利率')) return false
      let date1 = $('ccsaveDate').value
      let date2 = $('ccfetchDate').value
      let A = parseFloat($('ccsaveAmt').value)
      let R = parseFloat($('ccyearRate').value) / 360 / 100
      let N = parseInt($('ccrd').value)
      let diff = getDiffDay(date1, date2)
      let SUM = 0
      let intAmt = 0
      let IR = 0 // 利息税

      if ($('ccrd').value <= 7) {
        if (checkEmpty($('ccsaveDate'), '存款日期')) return false
        if (checkEmpty($('ccfetchDate'), '取款日期')) return false
        intAmt = A * (diff + N) * R * (1 - IR)
        SUM = A + intAmt
      } else {
        intAmt = A * N * R * (1 - IR)
        SUM = A + intAmt
      }
      $('ccintAmt').innerHTML = format(intAmt)
      $('ccsum').innerHTML = format(SUM)
    }
  }
}
