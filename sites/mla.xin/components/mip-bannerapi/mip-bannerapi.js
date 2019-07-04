const { util } = MIP
const { dom } = util
export default class MIPBannerapi extends MIP.CustomElement {
  build () {
    let me = this
    let url = this.element.getAttribute('url')
    let width = this.element.getAttribute('bwidth') ? this.element.getAttribute('bwidth') : 1920
    let height = this.element.getAttribute('bheight') ? this.element.getAttribute('bheight') : 500
    let defer = this.element.getAttribute('defer') ? this.element.getAttribute('defer') : 5000
    let carousel = dom.create(`<mip-carousel  autoplay indicator layout="responsive" buttonController indicatorId="mip-carousel-yd" width="${width}" height="${height}" defer="${defer}"></mip-carousel>`)
    let dot = dom.create(`<div class="mip-carousel-indicator-wrapper"></div>`)
    let objHtml = ''
    let dotHtml = ''
    window.fetchJsonp(url, {
      jsonpCallback: 'callback',
      jsonpCallbackFunction: 'yd'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      let oData = JSON.parse(data)
      for (let i = 0; i < oData.length; i++) {
        objHtml = objHtml + `<a href="` + oData[i].redirecturl + `"><mip-img src="` + oData[i].litpic + `" alt="banner"></mip-img></a>`
        if (i === 0) {
          dotHtml += `<div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>`
        } else {
          dotHtml += `<div class="mip-carousel-indecator-item"></div>`
        }
      }
      dotHtml = `<div class="mip-carousel-indicatorDot" id="mip-carousel-yd">` + dotHtml + `</div>`
      carousel.innerHTML = objHtml
      dot.innerHTML = dotHtml
      me.element.appendChild(carousel)
      me.element.appendChild(dot)
    })
  }
}
