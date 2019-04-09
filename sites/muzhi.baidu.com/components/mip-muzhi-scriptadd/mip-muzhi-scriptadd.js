/**
 * @file mip-muzhi-scriptadd 组件
 * @author liuzhaooo@outlook.com
 */

const { util } = MIP
const codeLink = 'https://ss0.bdstatic.com/5aAHeD3nKgkZitOb8IqT0jB-xx1xbK/static/mip-qb/open-baidu-app.js'
const originUrl = util.getOriginalUrl()

export default class MIPMuzhiScriptadd extends MIP.CustomElement {
  build () {
    if (/^https:\/\/muzhi\.baidu\.com/.test(originUrl)) {
      let script = document.createElement('script')
      script.src = codeLink
      this.element.appendChild(script)
    }
  }
}
