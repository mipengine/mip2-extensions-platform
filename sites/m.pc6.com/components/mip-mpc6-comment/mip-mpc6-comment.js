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
      url: this.element.getAttribute('url')
    }
  }
  build () {
    let wrapper = dom.create(`
    <section class="cont p10" id="comment">
      <div class="d_title"><em>网友评论</em></div>
      <div id="view-comment" class="reviews">
        <div class="post">
          <header><span class="fb">我要跟贴</span></header>
          <ul id="comment-list"></ul>
          <footer class="button-status-complete"><input type="button" value="更多评论" class="button"></footer>
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
    // 显示
    this.showComment()
    // 读取评论
    this.readComment()
    // 更多评论
    document.getElementById('view-comment').getElementsByClassName('button')[0].onclick = () => {
      this.readComment()
    }
    // 写入评论
    this.writeComment()
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
      css(cfb, { display: 'none' })
      css(cbutton, { display: 'none' })
      css(clist, { display: 'none' })
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
      if (data.sUserName) {
        for (let i = 0; i < data.sUserName.length; i++) {
          html += '<li><p class="user">' + data.sUserForm[i] + data.sUserName[i] + '<time>' + data.sDateAndTime[i] + '</time></p><p>' + decodeURIComponent(data.sContent[i]) + '</p></li>'
        };
        let btnStatusC = document.getElementById('view-comment').getElementsByClassName('button-status-complete')[0]
        if (data.RecordCount > 5) {
          css(btnStatusC, { display: 'block' })
        };
        if (p >= data.PageCount) {
          btnStatusC.removeChild(document.getElementById('view-comment').getElementsByClassName('button')[0])
          btnStatusC.innerHTML = '<input type="button" value="没有更多评论了！" class="button">'
        };
        oli.length === 0 ? ul.innerHTML = html : ul.innerHTML = ul.innerHTML + html
      }
    })
  }
  /*
   *写入评论
   */
  writeComment () {
    let verify = document.getElementById('verify')
    verify.onclick = () => {
      let cfb = document.getElementsByClassName('fb')[0]
      let cform = document.getElementById('submit')
      let clist = document.getElementById('comment-list')
      let cbutton = document.getElementsByClassName('button-status-complete')[0]
      let ul = document.getElementById('comment-list')
      let oli = ul.getElementsByTagName('li')
      let content = document.getElementsByClassName('w-text')[0].getElementsByTagName('textarea')[0].value
      let classIn = 0
      for (let i = 0; i < verify.classList.length; i++) {
        if (verify.classList[i] === 'disable') {
          classIn = 1
        }
      }
      if (classIn === 1) {
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
        let html = '<li><p class="user">您发表的跟贴<time><font color="red"> ' + MIPCommon.time(new Date()) + '</font></time></p><p>' + document.getElementsByClassName('w-text')[0].getElementsByTagName('textarea')[0].value + '<p></li>'
        oli.length === 0 ? ul.innerHTML = html : ul.innerHTML = html + ul.innerHTML
        css(cform, { display: 'none' })
        css(cfb, { display: 'block' })
        css(cbutton, { display: 'block' })
        css(clist, { display: 'block' })
        document.getElementsByClassName('w-text')[0].getElementsByTagName('textarea')[0].value = ''
        MIPCommon.setCookie('oldTime' + this.data().id, '1')
      })
    }
  }
}
