/**
 * @file 公用
 * @author fl
 */
const { util } = MIP
const { dom } = util
export default class MIPCommon {
  /*
   *设置cookies
   *@param {String} [name] [cookie key]
   *@param {String} [value] [cookie 值]
   */
  static setCookie (name, value) {
    const d = new Date()
    d.setTime(d.getTime() + 60 * 2000)
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toGMTString()
  }

  /*
   *读取cookies
   *@param {String} [name] [cookie key]
   */
  static getCookie (name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)
    if (arr) {
      return parseInt(decodeURIComponent(arr[2]), 10)
    }
  }

  /*
   *时间格式转换
   *@param {Time} [d] [时间戳]
   */
  static time (d) {
    let result = ''
    result += [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('/')
    return result.replace(/(-|:)(\d[^\d])/g, '$1' + '0$2')
  }

  /*
   *提示
   *@param {String} [msg] [提示语]
   */
  static cAlert (msg) {
    if (document.getElementById('alert_tips')) {
      document.getElementById('alert_tips').parentNode.removeChild(document.getElementById('alert_tips'))
    }
    const cTips = dom.create(`<mip-fixed type="top" id="alert_tips" class="animated fadeIn">${msg}</mip-fixed>`)
    document.body.appendChild(cTips)
    setTimeout(() => {
      if (document.getElementById('alert_tips')) {
        document.getElementById('alert_tips').parentNode.removeChild(document.getElementById('alert_tips'))
      }
    }, 5000)
  }
}
