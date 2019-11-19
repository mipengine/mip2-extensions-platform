export default class MIPJxwlClickTj extends MIP.CustomElement {
  build () {
    let el = this.element
    let az = document.getElementById('android')
    let ios = document.getElementById('ios')
    let furl = el.getAttribute('fetch-url')
    az.addEventListener('click', e => {
      fetch(furl).then(function (res) {
        return res.json()
      }).then(function (data) {
        let url = data.url
        url = url.replace(/#\*LOOKWHATLOOK/g, '%u')
        window.location.href = unescape(url)
      })
    })
    ios.addEventListener('click', e => {
      fetch(furl).then(function (res) {
        return res.json()
      }).then(function (data) {
        let url = data.iosdownurl
        url = url.replace(/#\*LOOKWHATLOOK/g, '%u')
        window.location.href = unescape(url)
      })
    })
  }
}
