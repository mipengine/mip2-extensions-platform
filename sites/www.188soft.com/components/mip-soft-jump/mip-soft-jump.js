/**
 * @file 188soft网站js判断非移动端访问M站，跳转到www站
 * @author wangying (wangying@njxzwh.com)
 * @update 2020-3-13 js中过多if-else优化
 */
import './index.less'

export default class MIPExample extends MIP.CustomElement {
  connectedCallback () {
    let urls = window.location.href.toString()
    let domain = urls.split('/')
    if (domain[2]) {
      domain = domain[2]
    }
    // 移动平台不跳，非移动平台就跳转
    if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      let mprefix = null
      let wprefix = null
      if (domain === 'm.188soft.com') { // 188soft
        mprefix = 'http://m.188soft.com/'
        wprefix = 'http://www.188soft.com/'
        let sort = urls.split('sorts/')[1]
        let list = null
        if (sort !== 'game/' && sort !== '') { // 聚合页（列表）处理
          list = 'sorts/' + sort
        }
        let softDetail = 'soft/' + urls.split('soft/')[1]
        let infoDetail = 'info/' + urls.split('info/')[1]
        let jumpUrl = [{ // 首页
          startUrl: 'http://m.188soft.com/',
          endUrl: 'http://www.188soft.com/'
        },
        { // 最近更新
          startUrl: 'http://m.188soft.com/new/',
          endUrl: 'http://www.188soft.com/new/'
        },
        { // 软件频道页
          startUrl: 'http://m.188soft.com/sorts/',
          endUrl: 'http://www.188soft.com/sorts/'
        },
        { // 资讯频道页
          startUrl: 'http://m.188soft.com/news/',
          endUrl: 'http://www.188soft.com/news/'
        },
        { // 安卓手游频道页
          startUrl: 'http://m.188soft.com/sorts/game/',
          endUrl: 'http://www.188soft.com/sorts/game/'
        },
        { // 聚合页（列表）
          startUrl: mprefix + list,
          endUrl: wprefix + list
        },
        { // 软件详情页
          startUrl: mprefix + softDetail,
          endUrl: wprefix + softDetail
        },
        { // 资讯详情页
          startUrl: mprefix + infoDetail,
          endUrl: wprefix + infoDetail
        }]
        jumpUrl.forEach((item) => {  // 进行跳转
          if (urls === item.startUrl) {
            getData(item.startUrl, item.endUrl)
            window.location.href = item.endUrl
          }
        })
      }
    }
    function getData (startUrl, endUrl) { // 跳转统计接口
      fetch('https://mip.js.xzstatic.com/collect', {
        method: 'POST',
        body: 'startUrl=' + startUrl + '&endUrl=' + endUrl,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    }
  }
}
