import Visitor from '../../common/utils/visitorLog'
import pageLog from '../../common/utils/pageLog'

const { getData } = MIP

export default class MIP5ikangConfig extends MIP.CustomElement {
  build () {
    let element = this.element
    Visitor.setClientId() // 设置放着标识cookie
    let ks = getData('ks')
    let pid = getData('pid')
    pageLog.sendPv(ks, pid) // 发送网站统计

    let billboardJs = document.createElement('script')
    billboardJs.setAttribute('type', 'text/javascript')
    billboardJs.setAttribute('charset', 'UTF-8')
    billboardJs.setAttribute('src', `https://a-sp.5ikang.com/ad_module/content_load.js`)
    element.appendChild(billboardJs)
    billboardJs.onload = billboardJs.onerror = function () {
      let config = getData('adConfig')
      let pageConfig = {
        pageWord: pageLog.keyword, // 页面关键词
        pageUrl: pageLog.url, // 页面url
        clientId: pageLog.clientId, // 访客标识
        pageRef: pageLog.ref // 页面ref
      }
      if (config) {
        let adStr = config.slice(0, config.length - 1)
        let adObj = {}
        adObj['ad_key'] = adStr
        adObj['pageConfig'] = pageConfig
        let func = document.createElement('script')
        func.innerHTML = `renderAd(${JSON.stringify(adObj)})`
        element.appendChild(func)
      }
    }
  }
}
