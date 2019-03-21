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
    let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)")
    let arr = document.cookie.match(reg)
    if (arr) {
        return parseInt(unescape(arr[2]))
    } else {
        return null;
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
}
