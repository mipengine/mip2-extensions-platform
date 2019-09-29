/**
 * @file 评论模块
 * @author fl
 */
import './index.less'
import '../../common/mip-common.less'
import MIPCommon from '../../common/mip-common'
const { CustomElement, util } = MIP
const { jsonParse, dom, css } = util

export default class MIPMpc6Comment extends CustomElement {
  data () {
    return {
      id: this.element.getAttribute('cid'),
      url: this.element.getAttribute('url'),
      hasReply: this.element.getAttribute('hasReply')
    }
  }
  build () {
    let wrapper = dom.create(`
    <section class="cont p10" id="comment">
      <div class="d_title"><em>网友评论</em></div>
      <div id="view-comment" class="reviews">
        <div class="post">
          <ul id="comment-list"></ul>
          <footer class="button-status-complete"><input type="button" value="更多评论" class="button"></footer>
          <header><span class="fb">我要跟贴</span></header>
        </div>
      </div>
      <mip-form method="post" url="https://m.pc6.com/" id="submit" class="post">
        <fieldset class="w-text"><textarea id="cTextarea"></textarea></fieldset>
        <fieldset class="w-button">
          <input id="verify" class="button disable" type="button" value="提交跟贴" hidefocus="true"/>
          <span id="cancel" class="button">取消</span>
        </fieldset>
        <input type="hidden" id="app-id" value="${this.data().id}" />
      </mip-form>
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
    document.getElementById('view-comment').getElementsByClassName('button')[0].onclick = () => {
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
    let cfb = document.getElementsByClassName('fb')[0]
    let cform = document.getElementById('submit')
    let clist = document.getElementById('comment-list')
    let cbutton = document.getElementsByClassName('button-status-complete')[0]
    cfb.onclick = () => {
      if (!this.data().hasReply) {
        css(clist, { display: 'none' })
        css(cbutton, { display: 'none' })
      } else {
        let del = document.getElementById('comment-list').getElementsByClassName('post')
        for (let j = 0; j < del.length; j++) {
          dom.closest(del[j], 'li').removeChild(del[j])
        }
      }
      css(cfb, { display: 'none' })
      css(cform, { display: 'block' })
    }
    document.getElementById('cancel').onclick = () => {
      let ul = document.getElementById('comment-list')
      let oli = ul.getElementsByTagName('li')
      css(cform, { display: 'none' })
      css(cfb, { display: 'block' })
      if (oli.length) {
        css(cbutton, { display: 'block' })
      }
      css(clist, { display: 'block' })
    }
  }
  /*
   *评论输入正则
   */
  inputComment () {
    let textarea = document.getElementById('cTextarea')
    let verify = document.getElementById('verify')
    textarea.onkeyup = function () {
      let len = this.value.length
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
    let ul = document.getElementById('comment-list')
    let oli = ul.getElementsByTagName('li')
    let p = Math.floor(oli.length / 5 + 1)
    fetch(`${this.data().url}/sajax.asp?action=0&id=${this.data().id}&page=${p}&CommentTpye=0`, {
      method: 'GET'
    }).then((responseText) => {
      return responseText.text()
    }).then((responseRes) => {
      let html = ''
      let data = jsonParse(responseRes)
      let userName = data.sUserName
      let userForm = data.sUserForm
      let userData = data.sDateAndTime
      let userText = data.sContent
      let urId = data.sId
      let urDing = data.sReTopic
      // 查看更多按钮显示
      let btnStatusC = document.getElementById('view-comment').getElementsByClassName('button-status-complete')[0]
      if (data.RecordCount > 5) {
        css(btnStatusC, { display: 'block' })
      }
      if (p >= data.PageCount) {
        btnStatusC.removeChild(document.getElementById('view-comment').getElementsByClassName('button')[0])
        btnStatusC.innerHTML = '<input type="button" value="没有更多评论了！" class="button">'
      };
      if (this.data().hasReply) {
        for (let i = 0; i < userName.length; i++) {
          // 处理特殊字符bug
          let tt1 = decodeURIComponent(userText[i])
          if (tt1.indexOf('+') > -1) {
            tt1 = tt1.replace(/\+/g, ' ')
          }
          let headnum = 1
          if ((urId[i] + Number(String(userData[i]).split(' ')[0].split('/')[2])) % 2 === 0) {
            headnum = 2
          }
          if (urDing[i] !== 0) {
            html += '<li><img src="/public/img/cmthead' + headnum + '.png" /><time>' + String(userData[i]).split(' ')[0] + '</time><p class="ctrl"><a class="zanC" href="javascript:"><span>' + urDing[i] + '</span></a><s rpid="' + urId[i] + '" class="rps">回复</s></p><div class="cmt"><p class="user">' + userForm[i] + userName[i] + '</p><p>' + tt1 + '</p></div></li>'
          } else {
            html += '<li><img src="/public/img/cmthead' + headnum + '.png" /><time>' + String(userData[i]).split(' ')[0] + '</time><p class="ctrl"><a class="zanC" href="javascript:" class="txt"><span>赞</span></a><s rpid="' + urId[i] + '" class="rps">回复</s></p><div class="cmt"><p class="user">' + userForm[i] + userName[i] + '</p><p>' + tt1 + '</p></div></li>'
          }
        }
      } else {
        for (let i = 0; i < userName.length; i++) {
          html += '<li><p class="user">' + userForm[i] + userName[i] + '<time>' + userData[i] + '</time></p><p>' + decodeURIComponent(userText[i]) + '</p></li>'
        };
      }
      oli.length === 0 ? ul.innerHTML = html : ul.innerHTML = ul.innerHTML + html
      if (this.data().hasReply) {
        this.replyComment()
        this.zanComment()
      }
    })
  }
  /*
   *写入评论
   */
  writeComment (quoteid) {
    let content
    let verify = document.getElementById('verify')
    let ul = document.getElementById('comment-list')
    if (quoteid) {
      content = '[quote]' + quoteid + '[/quote]' + ul.getElementsByClassName('w-text')[0].getElementsByTagName('textarea')[0].value
    } else {
      content = document.getElementById('submit').getElementsByClassName('w-text')[0].getElementsByTagName('textarea')[0].value
    }
    // 校验
    if ((!quoteid && verify.classList.contains('disable')) || (quoteid && verify.classList.contains('disable'))) {
      MIPCommon.cAlert('您评论写的太短啦！')
      return false
    } else if (MIPCommon.getCookie('oldTime' + this.data().id) === 1) {
      MIPCommon.cAlert('您评论次数太频繁啦！')
      return false
    }
    fetch(`${this.data().url}/ajax.asp?type=POST&content=${content}&SoftID=${this.data().id}&Action=2&CommentTpye=0`, {
      method: 'GET'
    }).then((responseText) => {
      return responseText.text()
    }).then((responseRes) => {
      MIPCommon.cAlert('您的评论已提交，请等待审核！')
      css(document.getElementById('submit'), { display: 'none' })
      css(document.getElementsByClassName('fb')[0], { display: 'block' })
      css(document.getElementsByClassName('button-status-complete')[0], { display: 'block' })
      css(ul, { display: 'block' })
      if (this.data().hasReply) {
        let del = ul.getElementsByClassName('post')
        for (let j = 0; j < del.length; j++) {
          dom.closest(del[j], 'li').removeChild(del[j])
        }
      }
      document.getElementsByClassName('w-text')[0].getElementsByTagName('textarea')[0].value = ''
      MIPCommon.setCookie('oldTime' + this.data().id, '1')
    })
  }
  /*
   *回复评论
   */
  replyComment () {
    let _this = this
    let rps = document.getElementsByClassName('rps')
    for (let i = 0; i < rps.length; i++) {
      let isBind = rps[i].getAttribute('is_bind')
      if (isBind !== 1) {
        rps[i].setAttribute('is_bind', 1)
        rps[i].onclick = function () {
          let len = dom.closest(this, 'li').getElementsByClassName('post').length
          let del = document.getElementById('comment-list').getElementsByClassName('post')
          for (let j = 0; j < del.length; j++) {
            dom.closest(del[j], 'li').removeChild(del[j])
          }
          if (len === 0) {
            let post = document.createElement('div')
            post.classList.add('post')
            post.innerHTML = '<fieldset class="w-text"><textarea id="cTextarea"></textarea></fieldset><fieldset class="w-button"><input id="verify" class="button disable" type="submit" value="点击发言" hidefocus="true"></fieldset><input type="hidden" id="app-id" value="' + _this.data().id + '"></input>'
            dom.closest(this, 'li').appendChild(post)
            _this.inputComment()
            css(document.getElementsByClassName('fb')[0], { display: 'block' })
            css(document.getElementById('submit'), { display: 'none' })
            document.getElementById('verify').onclick = function () {
              _this.writeComment(dom.closest(this, 'li').getElementsByClassName('ctrl')[0].getElementsByClassName('rps')[0].getAttribute('rpid'))
            }
          }
        }
      }
    }
  }
  /*
   *赞评论
   */
  zanComment () {
    let _this = this
    let ctrl = document.getElementsByClassName('zanC')
    for (let i = 0; i < ctrl.length; i++) {
      let isBind = ctrl[i].getAttribute('is_bind')
      if (isBind !== 1) {
        ctrl[i].setAttribute('is_bind', 1)
        ctrl[i].onclick = function () {
          if (this.classList.contains('is_ding')) {
            MIPCommon.cAlert('您已经顶过了！')
          } else {
            this.classList.add('is_ding')
            let num
            if (this.getElementsByTagName('span')[0].innerText === '赞') {
              this.classList.remove('txt')
              num = 0
            } else {
              num = Number(this.getElementsByTagName('span')[0].innerText)
            }
            this.getElementsByTagName('span')[0].innerText = num + 1
            fetch(`${_this.data().url}/ajax.asp?type=POST&id=${dom.closest(this, 'li').getElementsByClassName('ctrl')[0].getElementsByClassName('rps')[0].getAttribute('rpid')}&Action=19`, {
              method: 'GET'
            }).then((responseText) => {
              return responseText.text()
            }).then((responseRes) => {
            })
          }
        }
      }
    }
  }
}
