/**
 * @file pcsoft网站js判断非移动端访问M站，跳转到www站
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
      if (domain === 'm.pcsoft.com.cn') { // pcsoft
        mprefix = 'https://m.pcsoft.com.cn'
        wprefix = 'https://www.pcsoft.com.cn'
        let anGame = null
        let sort = null
        let zt = urls.toString().split('zhuanti/')[1]
        let article = urls.toString().split('article/')[1]
        let anSoft = urls.toString().split('android/soft/')[1]
        let iosGame = urls.toString().split('ios/game/')[1]
        let iosSoft = urls.toString().split('ios/soft/')[1]
        let soft = urls.toString().split('soft/')[1]
        let android = urls.toString().split('android/game/')[1]
        if (android !== undefined && android.indexOf('html') !== -1) { // 安卓游戏详情页
          anGame = android
        } else { // 聚合页（列表）
          sort = android
        }
        let list = '/android/game/' + sort
        let softDetail = '/soft/' + soft
        let zuanti = '/zhuanti/' + zt
        let articleDetail = '/article/' + article
        let angDetail = '/android/game/' + anGame
        let ansDetail = '/android/soft/' + anSoft
        let iosgDetail = '/ios/game/' + iosGame
        let iossDetail = '/ios/soft/' + iosSoft
        if (urls === mprefix + list && sort !== '') { // 聚合页（列表）
          getData(mprefix + list, wprefix + list)
          window.location.href = wprefix + list
        } else if (urls === mprefix + softDetail && soft !== '') { // 软件详情页
          getData(mprefix + softDetail, wprefix + softDetail)
          window.location.href = wprefix + softDetail
        } else if (urls === mprefix + zuanti && zt !== '') { // 专题详情页
          getData(mprefix + zuanti, wprefix + zuanti)
          window.location.href = wprefix + zuanti
        } else if (urls === mprefix + articleDetail && article !== '') { // 资讯详情页
          getData(mprefix + articleDetail, wprefix + articleDetail)
          window.location.href = wprefix + articleDetail
        } else if (urls === mprefix + iossDetail && iosSoft !== '') { // 苹果软件详情页
          getData(mprefix + iossDetail, wprefix + iossDetail)
          window.location.href = wprefix + iossDetail
        } else if (urls === mprefix + iosgDetail && iosGame !== '') { // 苹果游戏详情页
          getData(mprefix + iosgDetail, wprefix + iosgDetail)
          window.location.href = wprefix + iosgDetail
        } else if (urls === mprefix + ansDetail && anSoft !== '') { // 安卓软件详情页
          getData(mprefix + ansDetail, wprefix + ansDetail)
          window.location.href = wprefix + ansDetail
        } else if (urls === mprefix + angDetail && anGame !== '') { // 安卓游戏详情页
          getData(mprefix + angDetail, wprefix + angDetail)
          window.location.href = wprefix + angDetail
        }
        switch (urls) {
          case 'https://m.pcsoft.com.cn/': // 首页
            getData('https://m.pcsoft.com.cn/', 'https://www.pcsoft.com.cn/')
            window.location.href = 'https://www.pcsoft.com.cn/'
            break
          case 'https://m.pcsoft.com.cn/soft/newlist.html': // 最近更新
            getData('https://m.pcsoft.com.cn/soft/newlist.html', 'https://www.pcsoft.com.cn/soft/newlist.html')
            window.location.href = 'https://www.pcsoft.com.cn/soft/newlist.html'
            break
          case 'https://m.pcsoft.com.cn/zhuanti/': // 专题频道页
            getData('https://m.pcsoft.com.cn/zhuanti/', 'https://www.pcsoft.com.cn/zhuanti/')
            window.location.href = 'https://www.pcsoft.com.cn/zhuanti/'
            break
          case 'https://m.pcsoft.com.cn/android/soft/': // 软件频道页
            getData('https://m.pcsoft.com.cn/android/soft/', 'https://www.pcsoft.com.cn/android/soft/')
            window.location.href = 'https://www.pcsoft.com.cn/android/soft/'
            break
          case 'https://m.pcsoft.com.cn/android/': // 安卓频道页
            getData('https://m.pcsoft.com.cn/android/', 'https://www.pcsoft.com.cn/android/')
            window.location.href = 'https://www.pcsoft.com.cn/android/'
            break
          case 'https://m.pcsoft.com.cn/ios/': // 苹果频道页
            getData('https://m.pcsoft.com.cn/ios/', 'https://www.pcsoft.com.cn/ios/')
            window.location.href = 'https://www.pcsoft.com.cn/ios/'
            break
          case 'https://m.pcsoft.com.cn/wap_article/': // 资讯频道页
            getData('https://m.pcsoft.com.cn/wap_article/', 'https://www.pcsoft.com.cn/wap_article/')
            window.location.href = 'https://www.pcsoft.com.cn/wap_article/'
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
