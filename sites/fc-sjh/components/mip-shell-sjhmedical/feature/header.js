/**
 * file: sjh medical shell header
 * author: lijia19@baidu.com
 */

class Header {
  constructor (rootEl) {
    this.header = document.querySelector('.mip-shell-header-wrapper')
  }

  setCustomHeader (homeUrl) {
    const headEle = this.header.querySelector('.mip-shell-header')
    const homeEle = document.createElement('a')
    const iconEle = document.createElement('i')
    const locationHref = window.location.href
    homeEle.appendChild(iconEle)
    homeEle.setAttribute('data-type', 'mip')
    iconEle.className = 'icon-home'
    homeEle.className = 'back-home'
    homeEle.href = homeUrl
    if (homeUrl.split('?')[0] !== locationHref.split('?')[0]) {
      headEle.appendChild(homeEle)
    }
  }
}

export default Header
