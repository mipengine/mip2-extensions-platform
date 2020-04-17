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
    let d = new Date()
    d.setTime(d.getTime() + 60 * 2000)
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + d.toGMTString()
  }
  /*
   *读取cookies
   *@param {String} [name] [cookie key]
   */
  static getCookie (name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return parseInt(decodeURIComponent(arr[2]), 10)
    }
  }
  /*
   *提示
   *@param {String} [msg] [提示语]
   */
  static cAlert (msg) {
    if (document.getElementById('alert_tips')) {
      document.getElementById('alert_tips').parentNode.removeChild(document.getElementById('alert_tips'))
    }
    let cTips = dom.create(`<mip-fixed type="top" id="alert_tips" class="animated fadeIn">${msg}</mip-fixed>`)
    document.body.appendChild(cTips)
    setTimeout(() => {
      if (document.getElementById('alert_tips')) {
        document.getElementById('alert_tips').parentNode.removeChild(document.getElementById('alert_tips'))
      }
    }, 3000)
  }
}
