import MIPCommon from '../../common/mip-common'
import './index.less'
import '../../common/mip-common.less'
const { CustomElement, util } = MIP
const { dom, css } = util

export default class MIPMpc6NewsCustom extends CustomElement {
  data () {
    return {
      id: this.element.getAttribute('cid'),
      url: this.element.getAttribute('url')
    }
  }
  build () {
    // 文章动态增加链接
    MIPCommon.alterNewUrl(document.getElementsByClassName('xgwz')[0].getElementsByClassName('dtit')[0], this.data().id, ['手游', '应用'], this.data().url)
    // 文章分页效果
    this.newsPage()
    // 当前分类
    this.setCate()
    // 移除空内容
    this.emptyRemove()
    // 排行榜
    MIPCommon.rank(this.data().id)
    // 自定义统计
    MIPCommon.statCustom()
  }
  /*
   *当前分类
   */
  setCate () {
    let cataid = parseInt(document.getElementsByClassName('wtitle')[0].getAttribute('cataid'))
    let catalogname = document.getElementById('cataName')
    if (cataid === 120275 || cataid === 120278 || cataid === 120282 || cataid === 120285 || cataid === 120275) {
      catalogname.innerHTML = '手游攻略'
      catalogname.setAttribute('href', `${this.data().url}/article.html`)
    } else if (cataid === 120250 || cataid === 120252 || cataid === 120254 || cataid === 120256 || cataid === 120267 || cataid === 120280 || cataid === 120281) {
      catalogname.innerHTML = '手机教程'
      catalogname.setAttribute('href', `${this.data().url}/jiaocheng.html`)
    } else if (cataid === 10022 || cataid === 10024 || cataid === 120276 || cataid === 120255 || cataid === 120267 || cataid === 120280 || cataid === 120281) {
      catalogname.innerHTML = '手机评测'
      catalogname.setAttribute('href', `${this.data().url}/pingce.html`)
    } else if (cataid === 120269) {
      catalogname.innerHTML = 'IOS新闻'
      catalogname.setAttribute('href', `${this.data().url}/news.html`)
    } else if (cataid === 120270) {
      catalogname.innerHTML = '使用技巧'
      catalogname.setAttribute('href', `${this.data().url}/syjq.html`)
    } else if (cataid === 120271) {
      catalogname.innerHTML = '软件教程'
      catalogname.setAttribute('href', `${this.data().url}/jc.html`)
    } else if (cataid === 120272) {
      catalogname.innerHTML = '新手入门'
      catalogname.setAttribute('href', `${this.data().url}/xsrm.html`)
    } else if (cataid === 120273) {
      catalogname.innerHTML = '游戏攻略'
      catalogname.setAttribute('href', `${this.data().url}/article.html`)
    } else if (cataid === 120016) {
      catalogname.innerHTML = '小说'
      catalogname.setAttribute('href', `${this.data().url}/w/Catalogid/120016/0/`)
    } else {
      catalogname.html('pc资讯')
      catalogname.setAttribute('href', `${this.data().url}/pc.html`)
    }
  }
  /*
  * 文章分页效果
   */
  newsPage () {
    let pageObj = document.getElementById('cms_showpage')
    if (pageObj) {
      let li = pageObj.getElementsByTagName('ul')[0].getElementsByTagName('li')
      if (li.length > 10) {
        let htmlnode = dom.create('<span id="morefy">更多页数+</span>')
        pageObj.appendChild(htmlnode)
        for (let i = 0; i < li.length; i++) {
          if (i >= 10) {
            css(li[i], { display: 'none' })
          } else {
            css(li[i], { display: 'block' })
          }
        }
        let morefy = document.getElementById('morefy')
        morefy.onclick = () => {
          let num = 0
          for (let j = 0; j < li.length; j++) {
            if (css(li[j], 'display') !== 'none') {
              num++
            }
          }
          num = num + 5
          if (parseInt(num) >= li.length) {
            morefy.parentNode.removeChild(morefy)
          }
          for (let j = 0; j < li.length; j++) {
            if (j < num) {
              css(li[j], { display: 'block' })
            }
          }
        }
      }
    }
  }
  /*
  * 移出空内容
   */
  emptyRemove () {
    // 历史版本
    if (document.getElementsByClassName('historyver')[0].getElementsByTagName('p').length === 0) {
      this.element.removeChild(document.getElementsByClassName('historyver')[0])
    } else if (document.getElementsByClassName('historyver')[0].getElementsByTagName('p').length <= 3) {
      document.getElementsByClassName('historyver')[0].removeChild(document.getElementsByClassName('historyver')[0].getElementsByClassName('lookmore')[0])
    }
    // 相关文章
    if (document.getElementsByClassName('xgwz')[0].getElementsByTagName('li').length === 0) {
      this.element.removeChild(document.getElementsByClassName('xgwz')[0])
    } else {
      // 修改下一页链接
      if (document.getElementById('newsnext')) {
        document.getElementById('newsnext').getElementsByTagName('a')[0].setAttribute('href', document.getElementsByClassName('xgwz')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0].getAttribute('href'))
      }
    }
    // 热门推荐
    if (document.getElementsByClassName('tjyxph')[0].getElementsByClassName('dcatetory')[0].getElementsByTagName('a').length === 0) {
      this.element.removeChild(document.getElementsByClassName('tjyxph')[0])
    }
  }
}
