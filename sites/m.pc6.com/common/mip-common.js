/**
 * @file 公用
 * @author fl
 */
const { util } = MIP
const { dom } = util

export default class MIPCommon {
  /*
   *设置cookies
   */
  static setCookie (name, value) {
    let d = new Date()
    d.setTime(d.getTime() + 60 * 2000)
    document.cookie = name + '=' + escape(value) + ';expires=' + d.toGMTString()
  }
  /*
   *读取cookies
   */
  static getCookie (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return parseInt(unescape(arr[2]))
    } else {
      return null
    }
  }
  /*
   *时间函数
   */
  static time (d) {
    let result = ''
    result += [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('/')
    return result.replace(/(-|:)(\d[^\d])/g, '$1' + '0$2')
  }
  /*
   *提示
   */
  static cAlert (msg) {
    if (document.getElementById('alert_tips')) {
      document.getElementById('alert_tips').parentNode.removeChild(document.getElementById('alert_tips'))
    }
    let cTips = dom.create(`<div id="alert_tips" class="animated fadeIn">${msg}</div>`)
    document.body.appendChild(cTips)
    setTimeout(() => {
      if (document.getElementById('alert_tips')) {
        document.getElementById('alert_tips').parentNode.removeChild(document.getElementById('alert_tips'))
      }
    }, 3000)
  }
  /*
   *自定义统计
   */
  static statCustom () {
    let dateTime = document.getElementById('down-href').getAttribute('dateTime')
    let username = document.getElementById('down-href').getAttribute('username')
    let n = document.querySelector('script[type="application/json"]')
    if (n) {
      let a = jsonParse(n.textContent.toString().replace(/[\s\b\t]/g, ''))
      if (dateTime !== void 0 && username !== '' && a) {
        let r = ''
        if (a[0][username]) {
          if (a[0][username].xtime) {
            let o = new Date(a[0][username].xtime)
            let s = new Date(dateTime)
            if (o.getTime() < s.getTime()) {
              r = a[0][username].hmToken
            }
          } else { r = a[0][username].hmToken }
          if (r !== '') {
            let stat = dom.create(`<mip-stats-baidu token="${r}"></mip-stats-baidu>`)
            this.element.appendChild(stat)
          }
        }
      }
    }
  }
}
