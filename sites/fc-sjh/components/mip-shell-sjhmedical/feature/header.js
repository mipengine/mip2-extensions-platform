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
    homeEle.appendChild(iconEle)
    iconEle.className = 'icon-home'
    homeEle.className = 'back-home'
    homeEle.href = homeUrl
    headEle.appendChild(homeEle)
  }
}

export default Header
