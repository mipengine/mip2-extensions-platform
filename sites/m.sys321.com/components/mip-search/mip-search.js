/**
 * @file 评论模块
 * @author fl
 */
const { CustomElement, util } = MIP
const { css } = util
export default class MIPMsysComment extends CustomElement {
  build () {
    let open = this.element.querySelectorAll('#open')[0]
    let close = this.element.querySelectorAll('#close')[0]
    let menu = this.element.querySelectorAll('#menu')[0]
    let shadow = this.element.querySelectorAll('#shadow')[0]
    let searchBtn = this.element.querySelectorAll('.search-button')[0]
    let searchInp = this.element.querySelectorAll('.so .query')[0]
    let alert = this.element.querySelectorAll('.alert')[0]
    open.onclick = function () {
      css(menu, {left: '0px'})
      css(shadow, {display: 'block'})
    }
    close.onclick = function () {
      menu.style.left = '-270px'
      css(shadow, {display: 'none'})
    }
    let timer = null
    if (!searchBtn) {
      return
    } else {
      searchBtn.onclick = function () {
        if (searchInp.value.length !== 0) {
          css(alert, {display: 'none'})
          location.href = '../../searchResult.html?q=' + searchInp.value
        } else {
          if (timer != null) {
            clearInterval(timer)
          }
          css(alert, {display: 'block'})
          timer = setInterval(function () {
            css(alert, {display: 'none'})
          }, 4000)
        }
      }
    }
    let empty = this.element.querySelectorAll('.search-empty')[0]
    let lis = this.element.querySelectorAll('.search-res li')
    if (lis.length === 0) {
      css(empty, {display: 'block'})
    } else {
      css(empty, {display: 'none'})
    }
    let listUl = this.element.querySelectorAll('.search-res')
    let listAs = this.element.querySelectorAll('.search-tabs li')
    for (let i = 0; i < listAs.length; i++) {
      listAs[i].onclick = function () {
        listAs[i].index = i
        let siblings = this.parentNode.childNodes
        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i].nodeType === 1) {
            console.log(this.children)
            siblings[i].className = ''
            this.className = 'on'
          }
        }
        if (this.index === 0) {
          listUl[0].className = 'open'
        } else {
          listUl[0].className = ''
        }
        if (this.index === 1) {
          listUl[1].className = 'open'
        } else {
          listUl[1].className = ''
        }
      }
    }
  }
}
