/**
 * @file 下载自定义
 * @author fl
 */
import './index.less'
const { util } = MIP
const { platform, css } = util

export default class MIPMstaoqDown extends MIP.CustomElement {
  data() {
    let platAndroid = document.getElementById('plat_Android')
    let platiPhone = document.getElementById('plat_iPhone')
    let dataJson = {}
    if (platAndroid) {
      dataJson.platAndroidId = platAndroid.getAttribute('platid')
      dataJson.platAndroidAddress = platAndroid.getAttribute('Address')
      dataJson.platAndroidResName = platAndroid.getAttribute('ResName')
      dataJson.platAndroidCid = platAndroid.getAttribute('cid')
      dataJson.platAndroidRid = platAndroid.getAttribute('rid')
    }
    if (platiPhone) {
      dataJson.platIPhoneId = platiPhone.getAttribute('platid')
      dataJson.platIPhoneAddress = platiPhone.getAttribute('Address')
      dataJson.platIPhoneResName = platiPhone.getAttribute('ResName')
      dataJson.platIPhoneCid = platiPhone.getAttribute('cid')
      dataJson.platIPhoneRid = platiPhone.getAttribute('rid')
    }
    return dataJson
  }
  build() {
    this.difDownFlatform()
    this.domShow()
    this.removeEmpty()
    this.alterFooterHref()
  }
  /**
   * 区分下载平台
   */
  difDownFlatform() {
    let bxz = document.getElementById('tabNav').getElementsByClassName('bxz')[0]
    let h1 = document.getElementById('game-detail').getElementsByTagName('h1')[0]
    if (platform.isAndroid() && void 0 !== this.data().platAndroidAddress) {
      bxz.setAttribute('href', '/down.asp?id=' + this.data().platAndroidId)
      h1.innerHTML = this.data().platAndroidResName
    } else if (platform.isIos() && void 0 !== this.data().platIPhoneAddress) {
      bxz.setAttribute('href', '/down.asp?id=' + this.data().platIPhoneId)
      h1.innerHTML = this.data().platIPhoneResName
    }
  }
  /**
   * 显示对应内容
   */
  domShow() {
    let span = document.getElementById('tabNav').getElementsByTagName('span')

    function spanClick(index) {
      // 回到顶部
      if (document.getElementById('tabNav').getElementsByClassName('mip-semi-fixed')[0].classList.contains('info_fixed')) {
        document.body.scrollTop = document.documentElement.scrollTop = 0
      }
      // 选中
      for (let i = 0; i < span.length; i++) {
        span[i].classList.remove('active')
      }
      span[index].classList.add('active')
    }
    let imgFocus = document.getElementById('img-focus')
    let introMain = document.getElementById('intro-main')
    let tagsk = document.getElementById('tagsk')
    let xgxz = document.getElementById('xgxz')
    let gameRec = document.getElementById('gameRec')
    let keywordList = document.getElementById('keywordList')
    let commentWrap = document.getElementById('new-comment-wrap')
    // 详情
    span[0].onclick = () => {
      spanClick(0)
      css(imgFocus, 'display', 'block')
      css(introMain, 'display', 'block')
      css(tagsk, 'display', 'block')
      css(xgxz, 'display', 'block')
      css(gameRec, 'display', 'block')
      css(keywordList, 'display', 'block')
      css(commentWrap, 'display', 'block')
    }
    // 评论
    span[1].onclick = () => {
      spanClick(1)
      css(imgFocus, 'display', 'none')
      css(introMain, 'display', 'none')
      css(tagsk, 'display', 'none')
      css(xgxz, 'display', 'none')
      css(gameRec, 'display', 'none')
      css(keywordList, 'display', 'none')
      css(commentWrap, 'display', 'block')
      css(document.getElementById('new-cmtForm').getElementsByTagName('fieldset')[0], 'display', 'block')
      css(commentWrap.getElementsByClassName('fb')[0], 'display', 'none')
    }
    // 推荐
    span[2].onclick = () => {
      spanClick(2)
      css(imgFocus, 'display', 'none')
      css(introMain, 'display', 'none')
      css(tagsk, 'display', 'none')
      css(xgxz, 'display', 'block')
      css(gameRec, 'display', 'block')
      css(keywordList, 'display', 'block')
      css(commentWrap, 'display', 'none')
    }
  }
  /**
   * 移出空dom
   */
  removeEmpty() {
    // 相关标签
    if (!document.getElementById('tagsk').getElementsByTagName('a').length) {
      document.getElementById('tagsk').parentNode.removeChild(document.getElementById('tagsk'))
    }
    // 同厂商软件
    if (!document.getElementById('xgxz').getElementsByTagName('li').length) {
      document.getElementById('xgxz').parentNode.removeChild(document.getElementById('xgxz'))
    }
    // 编辑推荐
    if (!document.getElementById('gameRec').getElementsByTagName('li').length) {
      document.getElementById('gameRec').parentNode.removeChild(document.getElementById('gameRec'))
    }
    // 关键字列表
    if (!document.getElementById('keywordList').getElementsByTagName('li').length) {
      document.getElementById('keywordList').parentNode.removeChild(document.getElementById('keywordList'))
    }
  }
  /**
   * 根据终端修改底部连接
   */
  alterFooterHref() {
    if (platform.isIos()) {
      let footer = document.getElementsByClassName('foot-nav')[0].getElementsByTagName('li')
      footer[2].getElementsByTagName('a')[0].setAttribute('href', '/x/Rootid/13/0/')
      footer[3].getElementsByTagName('a')[0].setAttribute('href', '/x/Rootid/14/0/')
      footer[1].getElementsByTagName('a')[0].setAttribute('href', '/top/14/')
    }
  }
}
