export default class MIPJtCreditSearch extends MIP.CustomElement {
  build () {
    let inputId = this.element.getAttribute('input-id')
    let resId = this.element.getAttribute('res-id')
    let resetId = this.element.getAttribute('reset-id')
    let fetchUrl = this.element.getAttribute('fetch-url')
    // 用于存放城市数据
    let cityList = ''
    // 定义$函数
    function $ (str) {
      return document.getElementById(str)
    }
    // 取消搜索
    function cancelInput () {
      $(inputId).value = '中文/首字母'
      $(resId).style.display = 'none'
    }

    // 初始化
    fetch(fetchUrl).then(function (res) {
      return res.text()
    }).then(function (data) {
      cityList = data
      let e = []
      let cityArr = cityList.split('@')
      for (let i = 0; i < cityArr.length; i++) {
        e.push(cityArr[i].split('|'))
      }
      // 初始化城市列表
      for (let i = 0; i < e.length; i++) {
        if (e[i][2]) {
          let first = e[i][2][0]
          let newEle = document.createElement('a')
          newEle.setAttribute('href', 'https://m.cngold.org/credit/m_banli_' + e[i][0] + '.html')
          newEle.setAttribute('title', e[i][1])
          newEle.innerHTML = e[i][1]
          $('dd_' + first).appendChild(newEle)
        }
      }
      $(inputId).addEventListener('click', function () {
        this.value = ''
      })
      $(inputId).addEventListener('input', function () {
        let key = this.value
        if (key) {
          let html = '<dl>'
          for (let i = 0; i < e.length; i++) {
            if (e[i][2] && e[i][1] && (e[i][2].indexOf(key) > -1 || e[i][1].indexOf(key) > -1)) {
              html += '<dt><a href="https://m.cngold.org/credit/m_banli_' + e[i][0] + '.html">' + e[i][1] + '</a></dt>'
            }
          }
          html += '</dl>'
          $(resId).innerHTML = html
          $(resId).style.display = 'block'
        } else {
          $(resId).innerHTML = ''
          $(resId).style.display = 'none'
        }
      })
      $(resetId).addEventListener('click', function () {
        cancelInput()
      })
    })
  }
}
