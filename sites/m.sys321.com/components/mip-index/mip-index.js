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
    // 分类
    let bannerPic = this.element.querySelectorAll('.bannerPic')
    let a = this.element.querySelectorAll('#sNav a')
    let main = this.element.querySelectorAll('.main dd')
    // 资讯详情评论
    let emojiBtn = this.element.querySelectorAll('.cmt-icon-emoji')[0]
    let emojiCont = this.element.querySelectorAll('.cmt-emoji-cont')[0]
    let bqLis = this.element.querySelectorAll('.cmt-emoji-list li mip-img')
    // 资讯
    let tabs = this.element.querySelectorAll('.elflList a')
    // 资讯tab切换
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].onclick = function () {
        tabs[i].index = i
        let siblings = this.parentNode.childNodes
        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i].nodeType === 1) {
            siblings[i].className = ''
            this.className = 'on'
          }
        }
      }
    }
    let as = this.element.querySelectorAll('.a')
    let ul = this.element.querySelectorAll('.Cont5 ul')
    for (let i = 0; i < as.length; i++) {
      as[i].onclick = function () {
        as[i].index = i
        let siblings = this.parentNode.childNodes
        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i].nodeType === 1) {
            siblings[i].className = 'a'
            this.className = 'a on'
            if (siblings[i].innerText === '') {
              siblings[i].className = 'tbg'
            }
          }
        }
        if (this.index === 0) {
          ul[0].className = 'open'
        } else {
          ul[0].className = ''
        }
        if (this.index === 1) {
          ul[1].className = 'open'
        } else {
          ul[1].className = ''
        }
        if (this.index === 2) {
          ul[2].className = 'open'
        } else {
          ul[2].className = ''
        }
      }
    }
    open.onclick = function () {
      css(menu, {left: '0px'})
      css(shadow, {display: 'block'})
    }
    close.onclick = function () {
      menu.style.left = '-270px'
      css(shadow, {display: 'none'})
    }
    for (let i = 0; i < bannerPic.length; i++) {
      bannerPic[i].onclick = function () {
        location.href = './down_xq.html'
      }
    }
    if (!a) {
      return
    } else {
      for (let i = 0; i < a.length; i++) {
        a[i].onclick = function () {
          a[i].index = i
          let siblings = this.parentNode.childNodes
          for (let i = 0; i < siblings.length; i++) {
            if (siblings[i].nodeType === 1) {
              siblings[i].className = ''
              this.className = 'b_cur'
            }
          }
          if (this.index === 0) {
            main[0].className = 'ton'
          } else {
            main[0].className = ''
          }
          if (this.index === 1) {
            main[1].className = 'ton'
          } else {
            main[1].className = ''
          }
        }
      }
    }
    // 显示隐藏表情
    if (!emojiBtn) {
      return
    } else {
      emojiBtn.onclick = function () {
        if (emojiCont.className.indexOf('none') > -1) {
          emojiCont.classList.remove('none')
        } else {
          emojiCont.classList.add('none')
        }
      }
    }
    let that = this
    let bjCont = this.element.querySelectorAll('#cmt-edit-reply')[0]
    let submitBtn = this.element.querySelectorAll('.cmt-btn')[0]
    // 点击添加表情
    for (let i = 0; i < bqLis.length; i++) {
      bqLis[i].onclick = function () {
        let src = this.childNodes[0].src
        let alt = this.childNodes[0].alt
        let str = '<mip-img contenteditable=\'false\' class=\'emojione mip-element mip-layout-container mip-img-loaded\' alt=' + alt + ' src=' + src + ' unselectable=\'on\' data-short=\':blush:\' mip-firstscreen-element></mip-img>'
        let content = bjCont.innerHTML.replace('&lrm;', '')
        content = content.replace(/<img[^>]+>/g, '')
        bjCont.innerHTML = content + str + '&lrm;'
        that.getStatus(bjCont, submitBtn)
      }
    }
    bjCont.onkeyup = function () {
      that.getStatus(bjCont, submitBtn)
    }
    // 加载更多评论
    let sohucs = this.element.querySelectorAll('#SOHUCS')[0]
    let plMore = this.element.querySelectorAll('#more-comment')[0]
    let plUl = this.element.querySelectorAll('.pl-c .cmt-reply')[0]
    this.comment_p = 0
    if (!plMore) {
      return false
    } else {
      plMore.onclick = function () {
        let sid = sohucs.getAttribute('sid')
        let formData = new FormData()
        formData.append('softid', sid)
        formData.append('p', this.comment_p)
        formData.append('api', 'commentData')
        let req = new Request('http://www.sys321.com/Api.php', {
          method: 'POST',
          body: formData
        })
        fetch(req).then(function (response) {
          return response.json()
        }).then(function (data) {
          if (data === '') {
            plMore.innerText = '加载完毕啦,么么哒~'
            css(plMore, {cursor: 'default'})
            return false
          } else {
            plMore.innerText = '加载中...'
            let khtml = ''
            let len = data.length
            for (let i = 0; i < len; i++) {
              let dt = data[i]
              dt.content = that.emoji(dt.content)
              khtml = document.createElement('li')
              khtml.innerHTML = '<div class=\'cmt-root-cont cmt-root-cl-cont\'><div class=\'cmt-root-top\'><div class=\'cmt-root-user\'><span class=\'cmt-root-user-name\'><span class=\'cmt-icon-s-stars\' data-score=' + dt.star_class + '><i class=\'cmt-icon-s-star\' style=\'width:' + dt.star + 'px\'' + '></i><i class=\'cmt-icon-s-star-empty\'></i></span></span></div><div class=\'cmt-root-message cmt-message\'><p>' + dt.content + '</p><div class=\'cmt-root-footer\'><span>' + dt.create_time + '</span></div></div><div class=\'clear\'></div></div></div>'
              plUl.appendChild(khtml)
            }
            if (len < 20) {
              plMore.innerText = '加载完毕啦,么么哒~'
              // css(plMore, {cursor: 'default'})
              css(plMore, {pointerEvents: 'none'})
            } else {
              css(plMore, {display: 'block'})
              css(plMore, {pointerEvents: 'inherit'})
            }
          }
        })
      }
    }
  }
  getStatus (cont, btn) {
    let content = cont.innerHTML.split('&nbsp;').join('').split(' ').join('')
    if (content === '') {
      btn.setAttribute('disabled', 'disabled')
      btn.classList.add('cmt-disabled')
    } else {
      btn.removeAttribute('disabled')
      btn.classList.remove('cmt-disabled')
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
