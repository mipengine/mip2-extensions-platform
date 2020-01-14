/**
 * @file 评论模块
 * @author fl
 */

const { CustomElement, util } = MIP
const { css } = util
export default class MIP56Comment extends CustomElement {
  build () {
    let open = this.element.querySelectorAll('#open')[0]
    let close = this.element.querySelectorAll('#close')[0]
    let menu = this.element.querySelectorAll('#menu')[0]
    let shadow = this.element.querySelectorAll('#shadow')[0]
    open.onclick = function () {
      css(menu, {left: '0px'})
      css(shadow, {display: 'block'})
    }
    close.onclick = function () {
      menu.style.left = '-270px'
      css(shadow, {display: 'none'})
    }
    shadow.onclick = function () {
      menu.style.left = '-270px'
      css(shadow, {display: 'none'})
    }
    let that = this
    let zRank = this.element.querySelectorAll('#zRank')[0]
    let fRank = this.element.querySelectorAll('#fRank')[0]
    that.tabRank(zRank, fRank)
    that.tabRank(fRank, zRank)
    // 点击切换列表和图标
    let lisTab = this.element.querySelectorAll('.xxk li')
    let lisCont = this.element.querySelectorAll('.soft-list2 .list')
    let iconList = this.element.querySelectorAll('.top-list-body .list-hd')
    for (let i = 0; i < lisTab.length; i++) {
      lisTab[i].onclick = function () {
        lisTab[i].index = i
        let siblings = this.parentNode.childNodes
        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i].nodeType === 1) {
            siblings[i].className = ''
            this.className = 'on'
          }
        }
        if (this.index === 0) {
          lisCont[0].className = 'list show'
          iconList[0].className = 'list-hd show'
        } else {
          lisCont[0].className = 'list'
          iconList[0].className = 'list-hd'
        }
        if (this.index === 1) {
          lisCont[1].className = 'list show'
          iconList[1].className = 'list-hd show'
        } else {
          lisCont[1].className = 'list'
          iconList[1].className = 'list-hd'
        }
        if (this.index === 2) {
          lisCont[2].className = 'list show'
          iconList[2].className = 'list-hd show'
        } else {
          lisCont[2].className = 'list'
          iconList[2].className = 'list-hd'
        }
      }
    }
  }
  tabRank (clickBtn, siblingCls) {
    clickBtn.onclick = function () {
      siblingCls.className = 'dropdown'
      let cn = clickBtn.className
      if (cn === 'dropdown') {
        clickBtn.className = 'dropdown open'
      } else {
        clickBtn.className = 'dropdown'
      }
    }
  }
}
