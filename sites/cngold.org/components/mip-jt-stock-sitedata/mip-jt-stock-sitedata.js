import './index.less'

export default class MIPJtStockSitedata extends MIP.CustomElement {
  build () {
    let cityName = this.element.getAttribute('city-name')
    let containerId = this.element.getAttribute('container-id')
    loadData(cityName, containerId)

    // 加载指定城市的网点数据
    function loadData (city, id) {
      let fetchUrl = 'https://m.cngold.org/stock/m_location_data.html?cityName=' + city
      fetch(fetchUrl).then(function (res) {
        return res.text()
      }).then(function (text) {
        let data = JSON.parse(text)
        console.log(data)
        let list = data.data.list
        if (list !== null && list.length > 0) {
          let addHtml = ''
          for (let i = 0; i < 10; i++) {
            addHtml += '<li class="clearfix mglr30">'
            addHtml += '<a href="https://m.cngold.org/stock/m_wangdian' + list[i].id + '.html" class="khPic fl">'
            addHtml += '<span><mip-img layout="responsive" width="178" height="138" src="https://res.cngoldres.com/' + list[i].companyBrandLogo + '" alt="' + list[i].companyShortName + '"></mip-img></span>'
            addHtml += '</a>'
            addHtml += '<a href="https://m.cngold.org/stock/m_wangdian' + list[i].id + '.html" class="khdetail fl">'
            addHtml += '<span class="detail01">' + list[i].name + '</span>'
            addHtml += '<span class="detail02">地址：' + list[i].adress + '</span>'
            addHtml += '<span class="khbtn">了解详情</span>'
            addHtml += '</a>'
            addHtml += '</li>'
          }
          document.getElementById(id).innerHTML = addHtml
        }
      })
    }
  }
}
