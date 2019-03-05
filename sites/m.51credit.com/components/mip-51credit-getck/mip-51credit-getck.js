import './index.less'

export default class MIP51creditGetck extends MIP.CustomElement {
  build () {
    function getCookie (name) {
      let arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'))
      if (arr != null) return decodeURIComponent(arr[2]); return ''
    }
    let hrUrl = this.element.getAttribute('data-url')
    if (hrUrl.indexOf('?') > -1 && getCookie('Hm_lvt_e06f837c19a278d81816c90560e0d82d')) {
      hrUrl += '&bd_c=' + encodeURIComponent(getCookie('Hm_lvt_e06f837c19a278d81816c90560e0d82d'))
    }
    this.element.addEventListener('click', function () {
      // MIP页会在百度搜索结果页以iframe内嵌形式打开，跳转建议使用 window.top.location.href
      window.top.location.href = hrUrl
    })
  }
}
