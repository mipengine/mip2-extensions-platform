/**
 * @file pcsoft网站js判断非移动端访问M站，跳转到www站
 * @author wangying (wangying@njxzwh.com)
 * @update 2020-3-13 js中过多if-else优化
 */
import './index.less'

export default class MIPExample extends MIP.CustomElement {
  connectedCallback () {
    let urls = window.location.href.toString()
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
        let android = urls.split('android/game/')[1]
        let anGame = null
        let sort = null
        if (android !== undefined && android.indexOf('html') !== -1) { // 安卓游戏详情页
          anGame = android
        } else { // 聚合页（列表）
          sort = android
        }
        let list = '/android/game/' + sort
        let angDetail = '/android/game/' + anGame
        let softDetail = '/soft/' + urls.split('soft/')[1]
        let zuanti = '/zhuanti/' + urls.split('zhuanti/')[1]
        let articleDetail = '/article/' + urls.split('article/')[1]
        let ansDetail = '/android/soft/' + urls.split('android/soft/')[1]
        let iosgDetail = '/ios/game/' + urls.split('ios/game/')[1]
        let iossDetail = '/ios/soft/' + urls.split('ios/soft/')[1]
        let jumpUrl = [{ // 首页
            startUrl: 'https://m.pcsoft.com.cn/',
            endUrl: 'https://www.pcsoft.com.cn/'
          },
          { // 最近更新
            startUrl: 'https://m.pcsoft.com.cn/soft/newlist.html',
            endUrl: 'https://www.pcsoft.com.cn/soft/newlist.html'
          },
          { // 专题频道页
            startUrl: 'https://m.pcsoft.com.cn/zhuanti/',
            endUrl: 'https://www.pcsoft.com.cn/zhuanti/'
          },
          { // 软件频道页
            startUrl: 'https://m.pcsoft.com.cn/android/soft',
            endUrl: 'https://www.pcsoft.com.cn/android/soft'
          },
          { // 安卓频道页
            startUrl: 'https://m.pcsoft.com.cn/android/',
            endUrl: 'https://www.pcsoft.com.cn/android/'
          },
          { // 苹果频道页
            startUrl: 'https://m.pcsoft.com.cn/ios/',
            endUrl: 'https://www.pcsoft.com.cn/ios/'
          },
          { // 资讯频道页
            startUrl: 'https://m.pcsoft.com.cn/wap_article/',
            endUrl: 'https://www.pcsoft.com.cn/wap_article/'
          },
          { // 聚合页（列表）
            startUrl: mprefix + list,
            endUrl: wprefix + list
          },
          { // 专题详情页
            startUrl: mprefix + zuanti,
            endUrl: wprefix + zuanti
          },
          { // 软件详情页
            startUrl: mprefix + softDetail,
            endUrl: wprefix + softDetail
          },
          { // 安卓软件详情页
            startUrl: mprefix + ansDetail,
            endUrl: wprefix + ansDetail
          },
          { // 安卓游戏详情页
            startUrl: mprefix + angDetail,
            endUrl: wprefix + angDetail
          },
          { // 苹果游戏详情页
            startUrl: mprefix + iosgDetail,
            endUrl: wprefix + iosgDetail
          },
          { // 苹果软件详情页
            startUrl: mprefix + iossDetail,
            endUrl: wprefix + iossDetail
          },
          { // 资讯详情页
            startUrl: mprefix + articleDetail,
            endUrl: wprefix + articleDetail
          }
        ]
        jumpUrl.forEach((item) => {
          if (urls === item.startUrl) {
            getData(item.startUr, item.endUrl)
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
