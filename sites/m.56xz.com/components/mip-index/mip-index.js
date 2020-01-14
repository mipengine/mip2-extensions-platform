/**
 * @file 评论模块
 * @author fl
 */
import api from '../../common/config.api'
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
    // 分类
    let bannerPic = this.element.querySelectorAll('.bannerPic')
    let a = this.element.querySelectorAll('#sNav a')
    let main = this.element.querySelectorAll('.main dd')
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
    // 游戏软件
    let url = window.location.pathname
    let typeA = this.element.querySelectorAll('.type a')
    let softListMore = this.element.querySelectorAll('#softListMore')[0]
    let cut, typeid
    let pagedata = this.element.querySelectorAll('#pagedata')[0]
    let softlistP = 24
    // 游戏软件加载更多
    if (softListMore !== undefined) {
      cut = softListMore.getAttribute('data-cut')
      typeid = softListMore.getAttribute('data-typeid')
      softListMore.onclick = function () {
        let req = new Request(api.baseUrl + 'softListMore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cut: cut,
            typeid: typeid,
            p: softlistP
          })
        })
        fetch(req).then(function (response) {
          return response.json()
        }).then(function (data) {
          if (data === '') {
            softListMore.innerText = '加载完毕啦,么么哒~'
            css(softListMore, {pointerEvents: 'none'})
            return false
          } else {
            softListMore.innerText = '加载中...'
            let khtml = ''
            let len = data.length
            for (let i = 0; i < len; i++) {
              let dt = data[i]
              khtml = document.createElement('li')
              khtml.innerHTML = '<a title=' + '\'' + dt.title + '\'' + 'href=' + dt.url + '><dt><mip-img alt=' + '\'' + dt.title + '\'' + 'class=\'lazy\' data-original=' + dt.litpic + ' src=' + dt.litpic + '></mip-img></dt><dd class=\'d1\'>' + dt.title + '</dd><dd class=\'d3\'><div class=\'stars\'><span class=\'score\' title=' + dt.title + '评级' + dt.score + '></span><span class=\'star\'>' + dt.score + '</span></div></dd></a>'
              pagedata.appendChild(khtml)
            }
            if (len < 20) {
              softListMore.innerText = '加载完毕啦,么么哒~'
              css(softListMore, {pointerEvents: 'none'})
            } else {
              softListMore.innerText = '点击有惊喜,萌萌哒~'
            }
            softlistP = softlistP + 24
          }
        })
      }
    }
    if (typeA !== undefined) {
      for (let i = 0; i < typeA.length; i++) {
        typeA[i].onclick = function () {
          if (url.indexOf('soft') === -1) {
            location.href = '../../gameType.html?index=' + i + '&id=' + typeid
          } else {
            location.href = '../../softType.html?index=' + i + '&id=' + typeid
          }
        }
      }
    }
    // 专题加载更多
    let specLoadMore = this.element.querySelectorAll('#specLoadMore')[0]
    let specP = 12
    if (specLoadMore !== undefined) {
      specLoadMore.onclick = function () {
        let req = new Request(api.baseUrl + 'specIndexMore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            p: specP
          })
        })
        fetch(req).then(function (response) {
          return response.json()
        }).then(function (data) {
          if (data === '') {
            specLoadMore.innerText = '加载完毕啦,么么哒~'
            css(specLoadMore, {pointerEvents: 'none'})
            return false
          } else {
            specLoadMore.innerText = '加载中...'
            let khtml = ''
            let len = data.length
            for (let i = 0; i < len; i++) {
              let dt = data[i]
              khtml = document.createElement('li')
              khtml.innerHTML = '<a href=\'/zhuanti/' + dt.filename + '_1.html\'><div class=\'topic-bg\'><div class=\'topic-bg-degault\'><div class=\'lazygb_topic\' style=\'background-image:url(' + dt.litpic + '\'' + ')></div></div><div class=\'topic-tips\'><div class=\'topic-tip-name\'>' + dt.title + '</div></div></div></a>'
              pagedata.appendChild(khtml)
            }
            if (len < 20) {
              specLoadMore.innerText = '加载完毕啦,么么哒~'
              css(specLoadMore, {pointerEvents: 'none'})
            } else {
              specLoadMore.innerText = '点击有惊喜,萌萌哒~'
            }
            specP = specP + 20
          }
        })
      }
    }
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
    // 资讯加载更多
    let articleListMore = this.element.querySelectorAll('#articleListMore')[0]
    let articleListP = 15
    if (articleListMore !== undefined) {
      let zxTypeid = articleListMore.getAttribute('data-typeid')
      articleListMore.onclick = function () {
        let req = new Request(api.baseUrl + 'articleListMore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            typeid: zxTypeid,
            p: articleListP
          })
        })
        fetch(req).then(function (response) {
          return response.json()
        }).then(function (data) {
          if (data === '') {
            articleListMore.innerText = '加载完毕啦,么么哒~'
            css(articleListMore, {pointerEvents: 'none'})
            return false
          } else {
            articleListMore.innerText = '加载中...'
            let khtml = ''
            let len = data.length
            for (let i = 0; i < len; i++) {
              let dt = data[i]
              khtml = document.createElement('dl')
              khtml.innerHTML = '<dt><div class=\'user-card block size80\'><a href=\'/zixun/' + dt.id + '.html\' class=\'avatar\'><mip-img alt=\'56下载站\' style=\'width: 40px; height: 40px;\' src=\'http://56xz.com/p-static/images/avatar.png\' lazy=\'loaded\'></a> <h4><a href=\'/zixun/' + dt.id + '.html\'>56下载站</a></h4> <div class=\'retweet\'>' + dt.pubdate + '<span><span> 推荐</span> </span></div></div></dt><dd><a href=\'/zixun/' + dt.id + '.html\' class=\'pic\'><mip-img alt=' + dt.title + ' src=' + dt.litpic + ' lazy=\'loaded\'></a><section><h3 class=\'title\'><a href=\'/zixun/' + dt.id + '.html\'>' + dt.title + '</a></h3> <summary class=\'desc\'>' + dt.description + '</summary></section> <footer class=\'meta\'><div class=\'actions\'><span class=\'like-views\'><i class=\'icon i-like\'></i><sup>' + dt.like + '</sup></span> <a href=\'/zixun/' + dt.id + '.html#comment\' class=\'btn-comment\'><i class=\'icon i-comment\'></i><sup>' + dt.comment_count + '</sup></a></div></footer></dd>'
              pagedata.appendChild(khtml)
            }
            if (len < 15) {
              articleListMore.innerText = '加载完毕啦,么么哒~'
              css(articleListMore, {pointerEvents: 'none'})
            } else {
              articleListMore.innerText = '点击有惊喜,萌萌哒~'
            }
            articleListP = articleListP + 15
          }
        })
      }
    }
    // 资讯点赞
    let sId
    let like = this.element.querySelectorAll('#like')[0]
    let sohucs = this.element.querySelectorAll('#SOHUCS')[0]
    if (sohucs) {
      sId = sohucs.value
    }
    let num = this.element.querySelectorAll('#like sup')[0]
    let icon = this.element.querySelectorAll('#like .icon')[0]
    if (!like) {
      return false
    } else {
      like.onclick = function () {
        let req = new Request(api.baseUrl + 'articleLike', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: sId
          })
        })
        fetch(req).then(function (response) {
          return response.json()
        }).then(function (data) {
          let likes = parseInt(num.innerText) + 1
          num.innerText = likes
          like.classList.add('selected')
          css(icon, {backgroundImage: 'url(\'http://56xz.com/p-static/images/like-hover.png\')'})
        })
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
    // 资讯评论
    submitBtn.onclick = function () {
      let plCont = that.element.querySelectorAll('.pl-c #cmt-edit-reply')[0].innerText
      let plAlert = that.element.querySelectorAll('.pl-c .alert')[0]
      let req = new Request(api.baseUrl + 'comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comment: (plCont),
          softid: sId,
          type: 2
        })
      })
      fetch(req).then(function (response) {
        return response.json()
      }).then(function (data) {
        css(plAlert, {display: 'block'})
        let timer = null
        if (timer != null) {
          clearInterval(timer)
        }
        timer = setInterval(function () {
          css(plAlert, {display: 'none'})
          that.element.querySelectorAll('.pl-c #cmt-edit-reply')[0].innerText = ''
        }, 4000)
      })
    }
    // 评论
    let plMore = this.element.querySelectorAll('#more-comment')[0]
    this.commentP = 0
    // 页面初次加载评论
    // let noData = this.element.querySelectorAll('#no-pl-data')[0]
    // that.loadData(function (data) {
    //   if (data.length == 2) {
    //     css(noData, {display: 'block'})
    //     return
    //   } else {
    //     that.plFun(plMore, data)
    //   }
    // })
    // 点击加载更多评论
    if (!plMore) {
      return false
    } else {
      plMore.onclick = function () {
        that.loadData(function (data) {
          if (data === '') {
            plMore.innerText = '加载完毕啦,么么哒~'
            css(plMore, {cursor: 'default'})
          } else {
            that.plFun(plMore, data)
          }
        })
      }
    }
  }
  // 加载评论
  loadData (callback) {
    let that = this
    let sId = that.element.querySelectorAll('#SOHUCS')[0].value
    let formData = new FormData()
    formData.append('softid', sId)
    formData.append('p', that.commentP)
    let req = new Request(api.baseUrl + 'articleCommentData', {
      method: 'POST',
      body: formData
    })
    fetch(req).then(function (response) {
      return response.json()
    }).then(function (data) {
      callback(data)
    })
  }
  plFun (clickYS, data) {
    let plUl = this.element.querySelectorAll('.pl-c .cmt-reply')[0]
    let that = this
    if (data === '') {
      clickYS.innerText = '加载完毕啦,么么哒~'
      css(clickYS, {cursor: 'default'})
      return false
    } else {
      clickYS.innerText = '加载中...'
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
        clickYS.innerText = '加载完毕啦,么么哒~'
        css(clickYS, {pointerEvents: 'none'})
      } else {
        css(clickYS, {display: 'block'})
        css(clickYS, {pointerEvents: 'inherit'})
      }
    }
  }
  // 判断是否有值
  getStatus (cont, btn) {
    let content = cont.innerHTML.split('&nbsp;').join('').split(' ').join('')
    if (content === '') {
      btn.setAttribute('disabled', 'disabled')
      btn.classList.add('cmt-disabled')
      cont.classList.add('background')
    } else {
      btn.removeAttribute('disabled')
      btn.classList.remove('cmt-disabled')
      cont.classList.remove('background')
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
