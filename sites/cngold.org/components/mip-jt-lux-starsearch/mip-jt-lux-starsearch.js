export default class MIPJtLuxStarsearch extends MIP.CustomElement {
  build () {
    let input = this.element.getAttribute('search-input')// 搜索框
    let list = this.element.getAttribute('search-list')// 搜索结果

    function $ (str) {
      return document.getElementById(str)
    }
    function search () {
      let name = $(input).value
      if (name.length === 0) {
        $(list).style.display = 'none'
      } else {
        name = encodeURI(name)
        let fetchUrl = 'https://m.cngold.org/lux/m_queryStar.html?queryName=' + name
        fetch(fetchUrl).then(function (res) {
          return res.json()
        }).then(function (data) {
          if (data.flag) {
            if (data.data === null || data.data.length === 0) {
              $(list).style.display = 'none'
            } else {
              $(list).innerHTML = data.data
              let lis = $(list).children
              for (let i = 0; i < lis.length; i++) {
                let temp = lis[i].children[0].getAttribute('href')
                lis[i].children[0].setAttribute('href', 'https://m.cngold.org' + temp)
              }
              $(list).style.display = 'block'
            }
          }
        })
      }
    }
    $(input).onkeyup = function () {
      search()
    }
    document.body.onclick = function () {
      $(input).value = ''
      $(list).style.display = 'none'
    }
  }
}
