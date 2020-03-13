/**
 * @file 非移动端访问M站，跳转到www站
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
      let jumpUrl = []
      if (domain === 'm.onlinedown.net' || domain === 'mnews.onlinedown.net') { // 华军
        if (domain === 'm.onlinedown.net') {
          mprefix = 'https://m.onlinedown.net'
          wprefix = 'https://www.onlinedown.net'
        } else {
          mprefix = 'https://mnews.onlinedown.net'
          wprefix = 'https://news.onlinedown.net'
        }
        let list = '/sort/' + urls.split('sort/')[1]
        let zuanti = '/zt/' + urls.split('zt/')[1]
        let softDetail = '/soft/' + urls.split('soft/')[1]
        let appDetail = '/miniapp/' + urls.split('miniapp/')[1]
        let itDetail = '/it/' + urls.split('it/')[1]
        jumpUrl = [{ // 首页
          startUrl: 'https://m.onlinedown.net/',
          endUrl: 'https://www.onlinedown.net/'
        },
        { // 最近更新
          startUrl: 'https://m.onlinedown.net/new/',
          endUrl: 'https://www.onlinedown.net/new/'
        },
        { // 软件频道页
          startUrl: 'https://m.onlinedown.net/sort/',
          endUrl: 'https://www.onlinedown.net/sort/'
        },
        { // 专题频道页
          startUrl: 'https://m.onlinedown.net/new/zt/',
          endUrl: 'https://www.onlinedown.net/new/zt/'
        },
        { // 资讯频道页
          startUrl: 'https://mnews.onlinedown.net/',
          endUrl: 'https://news.onlinedown.net/'
        },
        { // 小程序频道页
          startUrl: 'https://m.onlinedown.net/miniapp/',
          endUrl: 'https://www.onlinedown.net/miniapp/'
        },
        { // 安卓手游频道页
          startUrl: 'https://m.onlinedown.net/game/',
          endUrl: 'https://www.onlinedown.net/game/'
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
        { // 小程序详情页
          startUrl: mprefix + appDetail,
          endUrl: wprefix + appDetail
        },
        { // 资讯详情页
          startUrl: mprefix + itDetail,
          endUrl: wprefix + itDetail
        }]
      } else if (domain === 'm.pcsoft.com.cn') { // pcsoft
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
        jumpUrl = [{ // 首页
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
        }]
      } else if (domain === 'm.188soft.com') { // 188soft
        mprefix = 'http://m.188soft.com/'
        wprefix = 'http://www.188soft.com/'
        let sort = urls.toString().split('sorts/')[1]
        let list = null
        if (sort !== 'game/' && sort !== '') {
          list = 'sorts/' + sort
        }
        let softDetail = 'soft/' + urls.split('soft/')[1]
        let infoDetail = 'info/' + urls.split('info/')[1]
        jumpUrl = [{ // 首页
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
      }
      jumpUrl.forEach((item) => { // 进行跳转
        if (urls === item.startUrl) {
          getData(item.startUrl, item.endUrl)
          window.location.href = item.endUrl
        }
      })
    }
    function getData (startUrl, endUrl) { // 跳转统计
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
