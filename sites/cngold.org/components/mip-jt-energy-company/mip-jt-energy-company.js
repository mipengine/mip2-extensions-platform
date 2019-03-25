import './index.less'

export default class MIPJtEnergyCompany extends MIP.CustomElement {
  build () {
    let btnId = this.element.getAttribute('btn-id')
    let listId = this.element.getAttribute('list-id')
    let isInit = this.element.getAttribute('is-init')
    let currentPage = 0
    if (btnId) {
      document.getElementById(btnId).addEventListener('click', function () {
        changeCom()
      })
    }
    if (isInit === '1') {
      changeCom()
    }

    function changeCom () {
      currentPage += 1
      let fetchUrl = 'https://m.cngold.org/energy/m_shgs_p' + currentPage + '.html'
      fetch(fetchUrl).then(function (res) {
        return res.json()
      }).then(function (data) {
        if (data.flag) {
          let htmlStr = ''
          for (let i = 0; i < data.data.length; i++) {
            let id = ''
            if (data.data[i].id) {
              id = data.data[i].id
            }
            let shortName = ''
            if (data.data[i].shortName) {
              shortName = data.data[i].shortName
            }
            let adress = ''
            if (data.data[i].adress) {
              adress = data.data[i].adress
            }
            htmlStr += '<dl class="clearfix">' +
              '<dt><a href="https://m.cngold.org/energy/m_shgs' + id + '.html" target="_self" title=' + shortName + '">' + shortName + '</a>' +
              '<p>' + adress + '</p></dt>' +
              '<dd class="icon"></dd>' +
              '<dd class="view_detail">' +
              '<a href="https://m.cngold.org/energy/m_shgs' + id + '.html" target="_self" title="' + shortName + '">查看详情</a>' +
              '</dd></dl>'
          }
          document.getElementById(listId).innerHTML = htmlStr
        }
      })
    }
  }
}
