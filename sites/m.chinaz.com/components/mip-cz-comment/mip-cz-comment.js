/**
 * @file 评论模块
 * @author fl
 */
import './index.less'
import '../../common/mip-common.less'
import MIPCommon from '../../common/mip-common'
const { CustomElement, util } = MIP
const { jsonParse, dom, css } = util

export default class MIPMczComment extends CustomElement {
  data () {
    return {
      id: this.element.getAttribute('cid'),
      url: this.element.getAttribute('url'),
      hasReply: this.element.getAttribute('hasReply')
    }
  }

  build () {
    const wrapper = dom.create(`
     <section class='cont p10' id='comment'>
       <mip-form method='post' url='${
         this.data().url
       }' id='submit' class='post'>
         <fieldset class='w-text'><textarea id='cTextarea'></textarea></fieldset>
           <fieldset class='w-button'>
           <input id='verify' class='button disable' type='button' value='提交跟贴' hidefocus='true'/>
           <span id='cancel' class='button'>取消</span>
         </fieldset>
         <input type='hidden' id='app-id' value='${this.data().id}' />
       </mip-form>
       <div id='view-comment' class='reviews'>
         <div class='post'>
           <header><span class='fb'>我要跟贴</span></header>
           <div class='tit' id='tit'>最新评论：</div>
           <ul id='comment-list'></ul>
           <footer class='button-status-complete'><input type='button' value='更多评论' class='more-comment button'></footer>
         </div>
       </div>
     </section>
     `)
    this.element.appendChild(wrapper)
    if (this.data().hasReply) {
      document.getElementById('comment').classList.add('new')
    }
    // 显示
    this.showComment()
    // 读取评论
    this.readComment()
    // 更多评论
    document
      .getElementById('view-comment')
      .getElementsByClassName('button')[0].onclick = () => {
        this.readComment()
      }
    // 写入评论
    document.getElementById('verify').onclick = () => {
      this.writeComment()
    }
    // 评论输入正则
    this.inputComment()
  }

  /*
   *显示评论
   */
  showComment () {
    const hasReply = this.data().hasReply
    const cfb = document.getElementsByClassName('fb')[0]
    const cform = document.getElementById('submit')
    const ctit = document.getElementById('tit')
    const clist = document.getElementById('comment-list')
    const cbutton = document.getElementsByClassName('button-status-complete')[0]
    cfb.onclick = () => {
      clickEvent()
    }
    if (hasReply) {
      const gocomment = document.getElementById('gocomment')
      gocomment.onclick = () => {
        clickEvent()
      }
    }

    function clickEvent () {
      if (!hasReply) {
        css(clist, {
          display: 'none'
        })
        css(ctit, {
          display: 'none'
        })
        css(cbutton, {
          display: 'none'
        })
      } else {
        const del = document
          .getElementById('comment-list')
          .getElementsByClassName('post')
        for (let j = 0; j < del.length; j++) {
          dom.closest(del[j], 'li').removeChild(del[j])
        }
      }
      css(cfb, {
        display: 'none'
      })
      css(cform, {
        display: 'block'
      })
    }
    document.getElementById('cancel').onclick = () => {
      const ul = document.getElementById('comment-list')
      const oli = ul.getElementsByTagName('li')
      css(cform, {
        display: 'none'
      })
      css(cfb, {
        display: 'block'
      })
      if (oli.length) {
        css(cbutton, {
          display: 'block'
        })
      }
      css(clist, {
        display: 'block'
      })
      css(ctit, {
        display: 'block'
      })
    }
  }

  /*
   *评论输入正则
   */
  inputComment () {
    const textarea = document.getElementById('cTextarea')
    const verify = document.getElementById('verify')
    textarea.onkeyup = function () {
      const len = this.value.length
      if (len < 5) {
        verify.classList.add('disable')
      } else {
        verify.classList.remove('disable')
      }
    }
  }

  /*
   *读取评论
   */
  readComment () {
    const ul = document.getElementById('comment-list')
    const oli = ul.getElementsByTagName('li')
    const p = Math.floor(oli.length / 5 + 1)
    fetch(
      `${this.data().url}/api/MCommnet/getmlist?action=0&id=${
        this.data().id
      }&page=${p}&CommentTpye=0`,
      {
        method: 'GET'
      }
    )
      .then((responseText) => {
        return responseText.text()
      })
      .then((responseRes) => {
        let html = ''
        const data = jsonParse(responseRes)
        const userName = data.sUserName
        const userData = data.sDateAndTime
        const userText = data.sContent
        // 查看更多按钮显示
        const btnStatusC = document
          .getElementById('view-comment')
          .getElementsByClassName('button-status-complete')[0]
        if (data.RecordCount > 5) {
          css(btnStatusC, {
            display: 'block'
          })
        }
        if (p >= data.PageCount) {
          btnStatusC.removeChild(
            document
              .getElementById('view-comment')
              .getElementsByClassName('button')[0]
          )
          btnStatusC.innerHTML =
            '<input type="button" value="没有更多评论了！" class="more-comment button">'
        }

        for (let i = 0; i < userName.length; i++) {
          html +=
            '<li><p class="user">' +
            userName[i] +
            '<time>' +
            userData[i] +
            '</time></p><p>' +
            decodeURIComponent(userText[i]) +
            '</p></li>'
        }
        oli.length === 0
          ? (ul.innerHTML = html)
          : (ul.innerHTML = ul.innerHTML + html)
        if (this.data().hasReply) {
          this.replyComment()
        }
      })
  }

  /*
   *写入评论
   */
  writeComment (quoteid) {
    let content
    const verify = document.getElementById('verify')
    const ul = document.getElementById('comment-list')
    if (quoteid) {
      content =
        '[quote]' +
        quoteid +
        '[/quote]' +
        ul
          .getElementsByClassName('w-text')[0]
          .getElementsByTagName('textarea')[0].value
    } else {
      content = document
        .getElementById('submit')
        .getElementsByClassName('w-text')[0]
        .getElementsByTagName('textarea')[0].value
    }
    // 校验
    if (
      (!quoteid && verify.classList.contains('disable')) ||
      (quoteid && verify.classList.contains('disable'))
    ) {
      MIPCommon.cAlert('您评论写的太短啦！')
      return false
    } else if (MIPCommon.getCookie('oldTime' + this.data().id) === 1) {
      MIPCommon.cAlert('您评论次数太频繁啦！')
      return false
    }
    fetch(
      `${
        this.data().url
      }api/MCommnet/savemdata?type=POST&content=${content}&id=${
        this.data().id
      }&Action=2&CommentTpye=0`,
      {
        method: 'GET'
      }
    )
      .then((responseText) => {
        return responseText.text()
      })
      .then((responseRes) => {
        MIPCommon.cAlert('您的评论已提交，请等待审核！')
        css(document.getElementById('submit'), {
          display: 'none'
        })
        css(document.getElementsByClassName('fb')[0], {
          display: 'block'
        })
        css(document.getElementsByClassName('button-status-complete')[0], {
          display: 'block'
        })
        css(ul, {
          display: 'block'
        })
        if (this.data().hasReply) {
          const del = ul.getElementsByClassName('post')
          for (let j = 0; j < del.length; j++) {
            dom.closest(del[j], 'li').removeChild(del[j])
          }
        }
        document
          .getElementsByClassName('w-text')[0]
          .getElementsByTagName('textarea')[0].value = ''
        MIPCommon.setCookie('oldTime' + this.data().id, '1')
      })
  }

  /*
   *回复评论
   */
  replyComment () {
    const _this = this
    const rps = document.getElementsByClassName('rps')
    for (let i = 0; i < rps.length; i++) {
      const isBind = rps[i].getAttribute('is_bind')
      if (isBind !== 1) {
        rps[i].setAttribute('is_bind', 1)
        rps[i].onclick = function () {
          const len = dom.closest(this, 'li').getElementsByClassName('post')
            .length
          const del = document
            .getElementById('comment-list')
            .getElementsByClassName('post')
          for (let j = 0; j < del.length; j++) {
            dom.closest(del[j], 'li').removeChild(del[j])
          }
          if (len === 0) {
            const post = document.createElement('div')
            post.classList.add('post')
            post.innerHTML =
              '<fieldset class="w-text"><textarea id="cTextarea"></textarea></fieldset><fieldset class="w-button"><input id="verify" class="button disable" type="submit" value="点击发言" hidefocus="true"></fieldset><input type="hidden" id="app-id" value="' +
              _this.data().id +
              '"></input>'
            dom.closest(this, 'li').appendChild(post)
            _this.inputComment()
            css(document.getElementsByClassName('fb')[0], {
              display: 'block'
            })
            css(document.getElementById('submit'), {
              display: 'none'
            })
            document.getElementById('verify').onclick = function () {
              _this.writeComment(
                dom
                  .closest(this, 'li')
                  .getElementsByClassName('ctrl')[0]
                  .getElementsByClassName('rps')[0]
                  .getAttribute('rpid')
              )
            }
          }
        }
      }
    }
  }
}
