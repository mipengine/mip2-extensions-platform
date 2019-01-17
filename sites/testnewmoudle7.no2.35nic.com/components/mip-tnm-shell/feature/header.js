/**
 * @file: moblie footer menu
 * @author: 1450052652@qq.com
 */
/**
 * 函数描述setCustomFooter
 *
 * @param {string} homeUrl 首页页面链接
 * @param {string} nmsorttitleUrl 标题分类接口
 */
import { getUrlParams } from '../../../common/js/getparam'
export default class Header {
  constructor (rootEl) {
    this.header = document.querySelector('.mip-shell-header-wrapper')
  }
  // 首页链接 栏目链接
  setCustomHeader (homeUrl, nmsorttitleUrl) {
    fetch(nmsorttitleUrl + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&parentId=' + getUrlParams().parentId).then(response => {
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
      titEle.className = 'top-tit'
      homeEle.href = homeUrl
      headEle.appendChild(homeEle)
      const toptitEle = this.header.querySelector('.top-tit')
      const toptitEleparent = toptitEle.parentNode

      toptitEle.setAttribute('on', 'tap:mip-toggle-sorttit.toggle')
      const toggleSortEle = document.createElement('mip-toggle')
      toggleSortEle.setAttribute('id', 'mip-toggle-sorttit')
      toggleSortEle.className = 'mip-toggle-title'
      toggleSortEle.setAttribute('hidetimeout', '500')
      toggleSortEle.setAttribute('enterclass', 'sort-toggle-enter')
      toptitEleparent.insertBefore(toggleSortEle, toptitEle) // 在第一个子节点toptitEle之前插入toggleSortEle，父节点是toptitEleparent

      const arrsorttit = nmsortlist.data.items
      if (arrsorttit.length > 0) {
        toptitEle.className += ' had-sort-tit'
      }

      arrsorttit.forEach(function (value, index, array) {
        const sortBoxItemEle = document.createElement('a')
        sortBoxItemEle.className = 'sort-box-item'
        sortBoxItemEle.setAttribute('data-title', array[index].sortName)
        let url = window.location.href.toString()
        let x = url.split('/')
        let y = x[x.length - 1].split('.')[0]
        if (y.indexOf('mip-tnm-shell') > -1) {
          sortBoxItemEle.setAttribute('href', '/mip/templates/default/downs.html?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&sortId=0_' + array[index].mnSortId + '&intSta=0&intNum=' + getUrlParams().intNum)
        } else if (y.indexOf('products') > -1) {
          sortBoxItemEle.setAttribute('href', '/mip/templates/default/products.html?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&sortId=0_' + array[index].mnSortId + '&intSta=0&intNum=' + getUrlParams().intNum)
        } else if (y.indexOf('news') > -1) {
          sortBoxItemEle.setAttribute('href', '/mip/templates/default/news.html?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&sortId=0_' + array[index].mnSortId + '&intSta=0&intNum=' + getUrlParams().intNum)
        } else if (y.indexOf('jobs') > -1) {
          sortBoxItemEle.setAttribute('href', '/mip/templates/default/jobs.html?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&sortId=0_' + array[index].mnSortId + '&intSta=0&intNum=' + getUrlParams().intNum)
        } else if (y.indexOf('videos') > -1) {
          sortBoxItemEle.setAttribute('href', '/mip/templates/default/videos.html?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&sortId=0_' + array[index].mnSortId + '&intSta=0&intNum=' + getUrlParams().intNum)
        }
        sortBoxItemEle.innerHTML = array[index].sortName
        toggleSortEle.appendChild(sortBoxItemEle)
      })
    })
  }
}
