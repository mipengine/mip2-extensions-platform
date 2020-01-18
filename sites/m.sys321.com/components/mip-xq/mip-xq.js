/**
 * @file 评论模块
 * @author fl
 */
import api from '../../common/config.api'
const { CustomElement, util } = MIP
const { css } = util
export default class MIPMsysComment extends CustomElement {
  build () {
    let that = this
    let open = this.element.querySelectorAll('#open')[0]
    let close = this.element.querySelectorAll('#close')[0]
    let menu = this.element.querySelectorAll('#menu')[0]
    let shadow = this.element.querySelectorAll('#shadow')[0]
    // 显示隐藏左边栏
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
    let moreBtn = this.element.querySelectorAll('#show-more')[0]
    let describe = this.element.querySelectorAll('#describe')[0]
    let showMore = this.element.querySelectorAll('.show-more')[0]
    // 点击更多按钮
    moreBtn.onclick = function () {
      css(describe, {
        maxHeight: 'none',
        height: 'auto'
      })
      css(showMore, {display: 'none'})
    }
    let liA = this.element.querySelectorAll('.cmt-tabs li a')
    let pjC = this.element.querySelectorAll('.pj-c')[0]
    let plC = this.element.querySelectorAll('.pl-c')[0]
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
    // 显示隐藏表情
    let plemojiBtn = this.element.querySelectorAll('.pl-c .cmt-btn-emoji')[0]
    let pjemojiBtn = this.element.querySelectorAll('.pj-c .cmt-btn-emoji')[0]
    let plemojiCont = this.element.querySelectorAll('.pl-c .cmt-emoji-cont')[0]
    let pjemojiCont = this.element.querySelectorAll('.pj-c .cmt-emoji-cont')[0]
    that.pjTab(pjemojiBtn, pjemojiCont)
    that.pjTab(plemojiBtn, plemojiCont)
    // 点击添加表情
    let pjbqLis = this.element.querySelectorAll('.pj-c .cmt-emoji-list li mip-img')
    let plbqLis = this.element.querySelectorAll('.pl-c .cmt-emoji-list li mip-img')
    let pjbjCont = this.element.querySelectorAll('.pj-c .cmt-edit-reply')[0]
    let plbjCont = this.element.querySelectorAll('.pl-c .cmt-edit-reply')[0]
    that.addEmoji(pjbqLis, pjbjCont)
    that.addEmoji(plbqLis, plbjCont)
    // 判断输入框是否有值
    let pjsubmitBtn = this.element.querySelectorAll('.pj-c .cmt-btn')[0]
    let plsubmitBtn = this.element.querySelectorAll('.pl-c .cmt-btn')[0]
    pjbjCont.onkeyup = function () {
      that.getStatus(pjbjCont, pjsubmitBtn)
    }
    plbjCont.onkeyup = function () {
      that.getStatus(plbjCont, plsubmitBtn)
    }
    // 点亮星星
    let star = this.element.querySelectorAll('.cmt-icon-b-stars i')
    for (let i = 0; i < star.length; i++) {
      star[i].onclick = function () {
        if (this.className !== 'cmt-icon-b-star') {
          this.className = 'cmt-icon-b-star'
        } else {
          this.className = 'cmt-icon-b-star-empty'
        }
      }
    }
    // 点击提交评价评论
    let pjP = that.element.querySelectorAll('.pj-c .alert p')[0]
    pjsubmitBtn.onclick = function () {
      let pjStar = that.element.querySelectorAll('.pj-c .cmt-icon-b-star').length
      let pjAlert = that.element.querySelectorAll('.pj-c .alert')[0]
      let timer = null
      if (timer != null) {
        clearInterval(timer)
      }
      if (pjStar === 0) {
        css(pjAlert, {display: 'block'})
        timer = setInterval(function () {
          css(pjAlert, {display: 'none'})
        }, 4000)
      } else {
        that.request('pj', api.basePJUrl + '/Api.php', pjP)
      }
    }
    let plP = that.element.querySelectorAll('.pl-c .alert p')[0]
    plsubmitBtn.onclick = function () {
      that.request('pl', api.basePJUrl + '/Api.php', plP)
    }
    // 初次加载评价内容
    let pjMore = this.element.querySelectorAll('#more-score')[0]
    // let nopjData = this.element.querySelectorAll('#no-pj-data')[0]
    // that.loadData(pjMore, nopjData, 'scoreData', 'pj')
    // 加载更多评价
    this.scoreP = 0
    that.loadMore(pjMore, 'scoreData', 'pj')
    // 初次加载评价内容
    let plMore = this.element.querySelectorAll('#more-comment')[0]
    // let noplData = this.element.querySelectorAll('#no-pj-data')[0]
    // that.loadData(plMore, noplData, 'commentData', 'pl')
    // 加载更多评论
    this.commentP = 0
    that.loadMore(plMore, 'commentData', 'pl')
  }
  // 提交评价或评论内容
  request (type, url, p) {
    let that = this
    let pjCont = that.element.querySelectorAll('.pj-c .cmt-edit-reply')[0].innerText
    let plCont = that.element.querySelectorAll('.pl-c .cmt-edit-reply')[0].innerText
    let sId = that.element.querySelectorAll('#SOHUCS')[0].getAttribute('sid')
    let pjStar = that.element.querySelectorAll('.pj-c .cmt-icon-b-star').length
    let pjAlert = that.element.querySelectorAll('.pj-c .alert')[0]
    let plAlert = that.element.querySelectorAll('.pl-c .alert')[0]
    let formData = new FormData()
    formData.append('softid', sId)
    formData.append('type', 1)
    if (type === 'pj') {
      formData.append('comment', pjCont)
      formData.append('star_class', pjStar)
      formData.append('api', 'scoreSubmit')
    } else {
      formData.append('comment', plCont)
      formData.append('api', 'commentSubmit')
    }
    let req = new Request(url, {
      method: 'POST',
      body: formData
    })
    fetch(req).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (type === 'pj') {
        p.innerText = '您的评价发表成功，需要审核才能显示~'
        css(pjAlert, {display: 'block'})
        let timer = null
        if (timer != null) {
          clearInterval(timer)
        }
        timer = setInterval(function () {
          css(pjAlert, {display: 'none'})
          that.element.querySelectorAll('.pj-c .cmt-edit-reply')[0].innerText = ''
        }, 4000)
      } else {
        css(plAlert, {display: 'block'})
        let timer = null
        if (timer != null) {
          clearInterval(timer)
        }
        timer = setInterval(function () {
          css(plAlert, {display: 'none'})
          that.element.querySelectorAll('.pl-c .cmt-edit-reply')[0].innerText = ''
        }, 4000)
      }
    })
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
  // 页面初次加载评价、评论
  loadData (clickYS, noData, apiV, type) {
    let that = this
    let sohucs = that.element.querySelectorAll('#SOHUCS')[0]
    let sId = sohucs.getAttribute('sid')
    let formData = new FormData()
    formData.append('softid', sId)
    if (type === 'pj') {
      formData.append('p', that.scoreP)
      formData.append('api', 'scoreData')
    } else {
      formData.append('p', that.commentP)
      formData.append('api', 'commentData')
    }
    let req = new Request(api.basePJUrl + '/Api.php', {
      method: 'POST',
      body: formData
    })
    fetch(req).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data.length === 2) {
        css(noData, {display: 'block'})
        return false
      } else {
        that.pjFun(clickYS, data, type)
      }
    })
  }
  // 点击加载更多评价、评论
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
      let req = new Request(api.basePJUrl + '/Api.php', {
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
