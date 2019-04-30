export default class MIPJtUsstockSearch extends MIP.CustomElement {
  build () {
    let inputId = this.element.getAttribute('input-id')
    let listId = this.element.getAttribute('list-id')

    function getList (keyword) {
      let html = ''
      let fetchUrl = 'https://m.cngold.org/usstock/m_quote_ajax_search.html'
      fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'keyword=' + keyword
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        if (data.flag && data.data) {
          let list = data.data
          for (let i = 0; i < list.length; i++) {
            let code = ''
            if (list[i].code !== null && list[i].code !== '') {
              code = list[i].code.toLocaleLowerCase()
            }
            html += '<li><a href="https://m.cngold.org/usstock/m_' +
              code + '.html"><span class="code">' + list[i].code +
              '</span><span class="jian">' + list[i].name +
              '</span><span class="jian"></a></li>'
          }
          document.getElementById(listId).parentNode.style.display = 'block'
          document.getElementById(listId).innerHTML = html
        } else {
          if (html === '') {
            html = '<li><span class="empty">没有查到关键词是:“  ' + keyword + '   ”的相关公司</span></li>'
          }
          document.getElementById(listId).parentNode.style.display = 'block'
          document.getElementById(listId).innerHTML = html
        }
      })
    }
    document.getElementById(inputId).onkeyup = function () {
      if (this.value !== '' && this.value !== ' ') {
        getList(this.value)
      }
    }
  }
}
