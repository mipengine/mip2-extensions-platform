import './index.less'
const { CustomElement, util } = MIP
const { jsonParse, dom } = util
export default class MIPStatistics extends CustomElement {
  data () {
    return {
      dateTime: document.getElementById('down-href').getAttribute('dateTime'),
      username: document.getElementById('down-href').getAttribute('username')
    }
  }
  build () {
    let n = document.querySelector('script[type="application/json"]')
    if (n) {
      let a = jsonParse(n.textContent.toString().replace(/[\s\b\t]/g, ''))
      if (void 0 !== this.data().dateTime && '' != this.data().username && a) {
        let r = ''
        if (a[0][this.data().username]) {
          if (a[0][this.data().username].xtime) {
            let o = new Date(a[0][this.data().username].xtime)
            let s = new Date(this.data().dateTime)
            if (o.getTime() < s.getTime()) {
              r = a[0][this.data().username].hmToken
            }
          } else { r = a[0][this.data().username].hmToken }
          if ('' != r) {
            let stat = dom.create(`<mip-stats-baidu token="${r}"></mip-stats-baidu>`)
            this.element.appendChild(stat)
          }
        }
      }
    }
  }
}
