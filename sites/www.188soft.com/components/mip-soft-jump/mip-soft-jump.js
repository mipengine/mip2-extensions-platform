/**
 * @file 188soft网站js判断非移动端访问M站，跳转到www站
 * @author wangying (wangying@njxzwh.com)
 */
import './index.less'

export default class MIPExample extends MIP.CustomElement {
  connectedCallback () {
    let urls = window.location.href
    // 获取域名
    let domain = urls.split('/')
    if (domain[2]) {
      domain = domain[2]
    }
    // 移动平台不跳，非移动平台就跳转
    if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      let mprefix = null
      let wprefix = null
      if (domain === 'm.188soft.com') { // 188soft
        mprefix = 'http://m.188soft.com'
        wprefix = 'http://www.188soft.com'
        let soft = urls.toString().split('soft/')[1]
        let sort = urls.toString().split('sorts/')[1]
        let info = urls.toString().split('info/')[1]
        let list = null
        if (sort !== 'game/' && sort !== '') {
          list = '/sorts/' + sort
        }
        let softDetail = '/soft/' + soft
        let infoDetail = '/info/' + info
        if (urls === mprefix + list && sort !== '') { // 聚合页（列表）
          getData(mprefix + list, wprefix + list)
          window.location.href = wprefix + list
        } else if (urls === mprefix + softDetail && soft !== '') { // 软件详情页
          getData(mprefix + softDetail, wprefix + softDetail)
          window.location.href = wprefix + softDetail
        } else if (urls === mprefix + infoDetail && info !== '') { // 资讯情页
          getData(mprefix + infoDetail, wprefix + infoDetail)
          window.location.href = wprefix + infoDetail
        }
        switch (urls) {
          case 'http://m.188soft.com/': // 首页
            getData('http://m.188soft.com/', 'http://www.188soft.com/')
            window.location.href = 'http://www.188soft.com/'
            break
          case 'http://m.188soft.com/new/': // 最近更新
            getData('http://m.188soft.com/new/', 'http://www.188soft.com/new/')
            window.location.href = 'http://www.188soft.com/new/'
            break
          case 'http://m.188soft.com/sorts/': // 软件频道页
            getData('http://m.188soft.com/sorts/', 'http://www.188soft.com/sorts/')
            window.location.href = 'http://www.188soft.com/sorts/'
            break
          case 'http://m.188soft.com/news/': // 资讯页
            getData('http://m.188soft.com/news/', 'http://www.188soft.com/news/')
            window.location.href = 'http://www.188soft.com/news/'
            break
          case 'http://m.188soft.com/sorts/game/': // 安卓手游频道页
            getData('http://m.188soft.com/game/', 'http://www.188soft.com/game/')
            window.location.href = 'http://www.188soft.com/game/'
            break
          default:
        }
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
