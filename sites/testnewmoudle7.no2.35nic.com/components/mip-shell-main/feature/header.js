/**
 * @file: moblie footer menu
 * @author: 1450052652@qq.com
 */
/**
 * 函数描述setCustomFooter
 *
 * @param {string} footermenuUrl 首页链接
 * @param {string} nmlinkUrl 各个页面链接
 */
export default class Header {
  constructor (rootEl) {
    this.header = document.querySelector('.mip-shell-header-wrapper')
  }
  // 首页链接 栏目链接
  setCustomHeader (homeUrl, nmsorttitleUrl) {
    fetch(nmsorttitleUrl).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('nmsortlist went wrong!')
      }
    }).then(nmsortlist => {
      const headEle = this.header.querySelector('.mip-shell-header')
      const homeEle = document.createElement('a')
      const iconEle = document.createElement('i')
      const titEle = this.header.querySelector('.mip-shell-header-logo-title span')
      homeEle.appendChild(iconEle)
      homeEle.setAttribute('data-type', 'mip')
      iconEle.className = 'icon-home'
      homeEle.className = 'back-home'
      titEle.className = 'toptit'
      homeEle.href = homeUrl
      headEle.appendChild(homeEle)
      const toptitEle = this.header.querySelector('.toptit')
      const toptitEleparent = toptitEle.parentNode

      toptitEle.setAttribute('on', 'tap:mip-toggle-sorttit.toggle')
      const toggleSortEle = document.createElement('mip-toggle')
      toggleSortEle.setAttribute('id', 'mip-toggle-sorttit')
      toggleSortEle.setAttribute('hidetimeout', '500')
      toggleSortEle.setAttribute('enterclass', 'sort-toggle-enter')
      toptitEleparent.insertBefore(toggleSortEle, toptitEle) // 在第一个子节点toptitEle之前插入toggleSortEle，父节点是toptitEleparent

      const arrsorttit = nmsortlist.data.items
      if (arrsorttit.length > 0) {
        toptitEle.className += ' hadsorttit'
      }

      arrsorttit.forEach(function (value, index, array) {
        const sortBoxItemEle = document.createElement('a')
        sortBoxItemEle.className = 'sortBoxItem'
        sortBoxItemEle.setAttribute('data-title', array[index].sortName)
        sortBoxItemEle.innerHTML = array[index].sortName
        toggleSortEle.appendChild(sortBoxItemEle)
      })
    })
  }
}
