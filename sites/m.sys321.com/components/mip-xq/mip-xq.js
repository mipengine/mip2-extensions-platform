/**
 * @file 评论模块
 * @author fl
 */

const { CustomElement, util } = MIP
const { css } = util

export default class MIPMsysComment extends CustomElement {
  build () {
    let that = this
    let open = this.element.querySelectorAll('#open')[0]
    let close = this.element.querySelectorAll('#close')[0]
    let menu = this.element.querySelectorAll('#menu')[0]
    let shadow = this.element.querySelectorAll('#shadow')[0]
    let moreBtn = this.element.querySelectorAll('#show-more')[0]
    let describe = this.element.querySelectorAll('#describe')[0]
    let showMore = this.element.querySelectorAll('.show-more')[0]
    let liA = this.element.querySelectorAll('.cmt-tabs li a')
    let pjC = this.element.querySelectorAll('.pj-c')[0]
    let plC = this.element.querySelectorAll('.pl-c')[0]
    let pjbjCont = this.element.querySelectorAll('.pj-c .cmt-edit-reply')[0]
    let plbjCont = this.element.querySelectorAll('.pl-c .cmt-edit-reply')[0]
    let plemojiBtn = this.element.querySelectorAll('.pl-c .cmt-btn-emoji')[0]
    let pjemojiBtn = this.element.querySelectorAll('.pj-c .cmt-btn-emoji')[0]
    let plemojiCont = this.element.querySelectorAll('.pl-c .cmt-emoji-cont')[0]
    let pjemojiCont = this.element.querySelectorAll('.pj-c .cmt-emoji-cont')[0]
    let star = this.element.querySelectorAll('.cmt-icon-b-stars i')
    let pjbqLis = this.element.querySelectorAll('.pj-c .cmt-emoji-list li mip-img')
    let plbqLis = this.element.querySelectorAll('.pl-c .cmt-emoji-list li mip-img')
    let pjsubmitBtn = this.element.querySelectorAll('.pj-c .cmt-btn')[0]
    let plsubmitBtn = this.element.querySelectorAll('.pl-c .cmt-btn')[0]
    // 显示隐藏左边栏
    open.onclick = function () {
      css(menu, {left: '0px'})
      css(shadow, {display: 'block'})
    }
    close.onclick = function () {
      menu.style.left = '-270px'
      css(shadow, {display: 'none'})
    }
    // 点击更多按钮
    moreBtn.onclick = function () {
      css(describe, {
        maxHeight: 'none',
        height: 'auto'
      })
      css(showMore, {display: 'none'})
    }
    // 评论评价切换显示
    for (let i = 0; i < liA.length; i++) {
      liA[i].onclick = function () {
        for (let j = 0; j < liA.length; j++) {
          liA[j].className = ''
        }
        this.className = 'on'
        if (this.innerHTML === '评论') {
          css(pjC, {display: 'none'})
          css(plC, {display: 'block'})
        } else {
          css(plC, {display: 'none'})
          css(pjC, {display: 'block'})
        }
      }
    }
    that.pjTab(pjemojiBtn, pjemojiCont)
    that.pjTab(plemojiBtn, plemojiCont)
    that.addEmoji(pjbqLis, pjbjCont)
    that.addEmoji(plbqLis, plbjCont)
    pjbjCont.onkeyup = function () {
      that.getStatus(pjbjCont, pjsubmitBtn)
    }
    plbjCont.onkeyup = function () {
      that.getStatus(plbjCont, plsubmitBtn)
    }
    // 点亮星星
    for (let i = 0; i < star.length; i++) {
      star[i].onclick = function () {
        if (this.className !== 'cmt-icon-b-star') {
          this.className = 'cmt-icon-b-star'
        } else {
          this.className = 'cmt-icon-b-star-empty'
        }
      }
    }
    // 加载更多评价
    let pjMore = this.element.querySelectorAll('#more-score')[0]
    this.scoreP = 0
    that.loadMore(pjMore, 'scoreData', 'pj')
    // 加载更多评论
    let plMore = this.element.querySelectorAll('#more-comment')[0]
    this.commentP = 0
    that.loadMore(plMore, 'commentData', 'pl')
  }
  // 显示隐藏表情
  pjTab (clickYS, contBox) {
    clickYS.onclick = function () {
      if (contBox.className.indexOf('none') > -1) {
        contBox.classList.remove('none')
      } else {
        contBox.classList.add('none')
      }
    }
  }
  // 添加表情
  addEmoji (lis, cont) {
    let that = this
    let pjbjCont = this.element.querySelectorAll('.pj-c .cmt-edit-reply')[0]
    let plbjCont = this.element.querySelectorAll('.pl-c .cmt-edit-reply')[0]
    let pjsubmitBtn = this.element.querySelectorAll('.pj-c .cmt-btn')[0]
    let plsubmitBtn = this.element.querySelectorAll('.pl-c .cmt-btn')[0]
    for (let i = 0; i < lis.length; i++) {
      lis[i].onclick = function () {
        let src = this.childNodes[0].src
        let alt = this.childNodes[0].alt
        let str = '<mip-img contenteditable=\'false\' class=\'emojione mip-element mip-layout-container mip-img-loaded\' alt=' + alt + ' src=' + src + ' unselectable=\'on\' data-short=\':blush:\' mip-firstscreen-element></mip-img>'
        let content = cont.innerHTML.replace('&lrm;', '')
        content = content.replace(/<img[^>]+>/g, '')
        cont.innerHTML = content + str + '&lrm;'
        that.getStatus(pjbjCont, pjsubmitBtn)
        that.getStatus(plbjCont, plsubmitBtn)
      }
    }
  }
  getStatus (bjCont, submitBtn) {
    let content = bjCont.innerHTML.split('&nbsp;').join('').split(' ').join('')
    if (content === '') {
      submitBtn.setAttribute('disabled', 'disabled')
      submitBtn.classList.add('cmt-disabled')
    } else {
      submitBtn.removeAttribute('disabled')
      submitBtn.classList.remove('cmt-disabled')
    }
  }
  // 加载更多评价、评论
  loadMore (clickYS, apiV, type) {
    let that = this
    clickYS.onclick = function () {
      let sohucs = that.element.querySelectorAll('#SOHUCS')[0]
      let sId = sohucs.getAttribute('sid')
      let formData = new FormData()
      formData.append('softid', sId)
      if (type === 'pj') {
        formData.append('p', that.scoreP)
      } else {
        formData.append('p', that.commentP)
      }
      formData.append('api', apiV)
      let req = new Request('http://www.sys321.com/Api.php', {
        method: 'POST',
        body: formData
      })
      fetch(req).then(function (response) {
        return response.json()
      }).then(function (data) {
        if (data === '') {
          clickYS.innerText = '加载完毕啦,么么哒~'
          css(clickYS, {cursor: 'default'})
        } else {
          that.pjFun(clickYS, data, type)
        }
      })
    }
  }
  pjFun (clickYS, data, type) {
    let pjUl = this.element.querySelectorAll('.pj-c .cmt-reply')[0]
    let plUl = this.element.querySelectorAll('.pl-c .cmt-reply')[0]
    if (data === '') {
      clickYS.innerText = '加载完毕啦,么么哒~'
      css(clickYS, {cursor: 'default'})
    } else {
      clickYS.innerText = '加载中...'
      let khtml = ''
      let len = data.length
      for (let i = 0; i < len; i++) {
        let dt = data[i]
        dt.content = this.emoji(dt.content)
        khtml = document.createElement('li')
        if (type === 'pj') {
          khtml.innerHTML = '<div class=\'cmt-root-cont cmt-root-cl-cont\'><div class=\'cmt-root-top\'><div class=\'cmt-root-user\'><span class=\'cmt-root-user-name\'><span class=\'cmt-icon-s-stars\' data-score=' + dt.star_class + '><i class=\'cmt-icon-s-star\' style=\'width:' + dt.star + 'px\'' + '></i><i class=\'cmt-icon-s-star-empty\'></i></span></span></div><div class=\'cmt-root-message cmt-message\'><p>' + dt.content + '</p><div class=\'cmt-root-footer\'><span>' + dt.create_time + '</span></div></div><div class=\'clear\'></div></div></div>'
        } else {
          khtml.innerHTML = '<div class=\'cmt-root-cont cmt-root-cl-cont\'><div class=\'cmt-root-top\'><div class=\'cmt-root-message cmt-message\'><p>' + dt.content + '</p><div class=\'cmt-root-footer\'><span>' + dt.create_time + '</span></div></div><div class=\'clear\'></div></div></div>'
        }
      }
      if (len < 20) {
        clickYS.innerText = '加载完毕啦,么么哒~'
        css(clickYS, {pointerEvents: 'none'})
      } else {
        css(clickYS, {display: 'block'})
        css(clickYS, {pointerEvents: 'inherit'})
      }
      if (type === 'pj') {
        pjUl.appendChild(khtml)
        this.scoreP = this.scoreP + 20
      } else {
        plUl.appendChild(khtml)
        this.commentP = this.commentP + 20
      }
    }
  }
  emoji (content) {
    content = content.replace(/:blush:/g, '<mip-img class=\'emojione\' src=\'http://m.sys321.com/m-static/picture/1f60a.png\'></mip-img>')
    content = content.replace(/:joy:/g, '<mip-img class=\'emojione\' src=\'http://m.sys321.com/m-static/picture/1f602.png\'></mip-img>')
    content = content.replace(/:heart:/g, '<mip-img class=\'emojione\' src=\'http://m.sys321.com/m-static/picture/2764.png\'></mip-img>')
    content = content.replace(/:sob:/g, '<mip-img class=\'emojione\' src=\'http://m.sys321.com/m-static/picture/1f62d.png\'></mip-img>')
    content = content.replace(/:heart_eyes:/g, '<mip-img class=\'emojione\' src=\'http://m.sys321.com/m-static/picture/1f60d.png\'></mip-img>')
    content = content.replace(/:kissing_heart:/g, '<mip-img class=\'emojione\' src=\'http://m.sys321.com/m-static/picture/1f618.png\'></mip-img>')
    content = content.replace(/:rolling_eyes:/g, '<mip-img class=\'emojione\' src=\'http://m.sys321.com/m-static/picture/1f644.png\'></mip-img>')
    content = content.replace(/:skull:/g, '<mip-img class=\'emojione\' src=\'http://m.sys321.com/m-static/picture/1f480.png\'></mip-img>')
    content = content.replace(/:tired_face:/g, '<mip-img class=\'emojione\' src=\'http://m.sys321.com/m-static/picture/1f62b.png\'></mip-img>')
    content = content.replace(/:thinking:/g, '<mip-img class=\'emojione\' src=\'http://m.sys321.com/m-static/picture/1f914.png\'></mip-img>')
    return content
  }
}
