/**
 * @file mip-muzhi-scriptadd 组件
 * @author liuzhaooo@outlook.com
 */

const { util } = MIP
const CODE_LINK = 'https://ss0.bdstatic.com/5aAHeD3nKgkZitOb8IqT0jB-xx1xbK/static/mip-qb/open-baidu-app.js'
const ORIGIN_URL = util.getOriginalUrl()

export default class MIPMuzhiScriptadd extends MIP.CustomElement {
  build () {
    if (/^https:\/\/muzhi\.baidu\.com/.test(ORIGIN_URL)) {
      let script = document.createElement('script')
      script.src = CODE_LINK
      this.element.appendChild(script)
    }
  }
}
