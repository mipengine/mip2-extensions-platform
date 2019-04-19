export default class MIPJtFuturesPosition extends MIP.CustomElement {
  build () {
    // 定义$函数
    function $ (str) {
      return document.getElementById(str)
    }
    // 选择条件的展开与收起
    let btns = document.getElementsByClassName('choose-btn')
    let cons = document.getElementsByClassName('jys-con')
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        for (let j = 0; j < cons.length; j++) {
          cons[j].classList.add('hide')
        }
        cons[i].classList.toggle('hide')
      })
    }
    // 选择交易所--选择后品种发生变化
    let exList = document.getElementsByClassName('ex-li')
    let kindList = document.getElementsByClassName('kind-li')
    for (let i = 0; i < exList.length; i++) {
      exList[i].addEventListener('click', function () {
        for (let j = 0; j < exList.length; j++) {
          exList[j].classList.remove('on')
        }
        this.classList.add('on')
        $('exchangeId').value = this.getAttribute('data-value')
        $('exText').innerHTML = this.innerHTML
        // 交易品种的显示
        $('kindText').innerHTML = ''
        let exId = this.getAttribute('data-value')
        for (let n = 0; n < kindList.length; n++) {
          if (kindList[n].getAttribute('data-exchangeId') === exId) {
            kindList[n].classList.remove('hide')
          } else {
            kindList[n].classList.add('hide')
          }
        }
      })
    }
    // 设置时间的最大选择范围--超过当天的日期不能选择
    let dateNow = new Date()
    let year = dateNow.getFullYear()
    let month = dateNow.getMonth() + 1 < 10 ? '0' + (dateNow.getMonth() + 1) : (dateNow.getMonth() + 1)
    let day = dateNow.getDate() < 10 ? '0' + dateNow.getDate() : dateNow.getDate()
    $('dateInput').setAttribute('max', year + '-' + month + '-' + day)
    // 选择时间
    $('dateInput').setAttribute('value', year + '-' + month + '-' + day)
    $('dateInput').oninput = function () {
      $('dateText').innerHTML = this.value
    }
    // 选择品种
    for (let i = 0; i < kindList.length; i++) {
      kindList[i].addEventListener('click', function () {
        for (let j = 0; j < kindList.length; j++) {
          kindList[j].classList.remove('on')
        }
        kindList[i].classList.add('on')
        $('kindText').innerHTML = kindList[i].innerHTML
        $('varietyId').value = kindList[i].getAttribute('data-value')
      })
    }
    // 弹窗
    function tips (val, msg) {
      let ele = document.getElementsByClassName('tips-alert')[0]
      if (val.length === 0) {
        ele.children[0].innerHTML = msg
        ele.style.display = 'block'
        setTimeout(function () {
          ele.style.display = 'none'
        }, 1500)
        return false
      } else {
        return true
      }
    }
    // 点击查询
    $('search').onclick = function () {
      let exchangeId = $('exchangeId').value
      let varietyId = $('varietyId').value
      let date = $('dateInput').value.replace(/-/g, '')
      // 判空处理
      if (tips(exchangeId, '请选择交易所') && tips(date, '请选择查询日期') && tips(varietyId, '请选择查询品种')) {
        let fetchUrl = 'https://m.cngold.org/futures/m_qhcc/e' + exchangeId +
          '_v' + varietyId + '_d' + date + '_verify.html'
        fetch(fetchUrl).then(function (res) {
          return res.json()
        }).then(function (data) {
          if (data.flag) {
            let newLink = 'https://m.cngold.org/futures/m_qhcc/e' +
              exchangeId + '_v' + varietyId + '_d' + date + '.html'
            MIP.viewer.open(newLink, { isMipLink: false, replace: false })
          } else {
            $('exText').innerHTML = ''
            $('kindText').innerHTML = ''
            $('dateText').innerHTML = ''
            $('dateInput').value = ''
            $('exchangeId').value = ''
            $('varietyId').value = ''

            document.getElementsByClassName('cover')[0].classList.remove('hide')
            document.getElementsByClassName('tips-box')[0].classList.remove('hide')
            setTimeout(function () {
              document.getElementsByClassName('cover')[0].classList.add('hide')
              document.getElementsByClassName('tips-box')[0].classList.add('hide')
            }, 1500)
          }
        })
      }
    }
  }
}
