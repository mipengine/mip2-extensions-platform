export default class MIPMuzhiScriptadd extends MIP.CustomElement {
  build () {
    let originUrl = MIP.util.getOriginalUrl()
    let codeLink = 'https://ss0.bdstatic.com/5aAHeD3nKgkZitOb8IqT0jB-xx1xbK/static/mip-qb/open-baidu-app.js'
    if (/^https:\/\/muzhi\.baidu\.com/.test(originUrl)) {
      let script = document.createElement('script')
      script.src = codeLink
      this.element.appendChild(script)
    }
  }
}
