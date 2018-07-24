/**
 * Created by TK on 2017/9/19.
 * cookie操作
 */
const Cookie = {
  /**
   * 设置cookie
   * name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure
   * @param name {string}
   * @param value {string|number}
   * @param expires {Date|number} Date实例(絕對時間)或者毫秒（當前時間加上ms数，过期）
   * @param domain {string}
   * @param path {string}
   * @param secure {bool}
   */

  set: function (name, value, expires, domain, path = '/', secure) {
    let cookieText = ''
    cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value)
    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString()
    } else {
      let _expires = new Date(+new Date() + expires)
      cookieText += '; expires=' + _expires.toGMTString()
    }
    if (path) {
      cookieText += '; path=' + path
    }
    if (domain) {
      cookieText += '; domain=' + domain
    }
    if (secure) {
      cookieText += '; secure'
    }
    document.cookie = cookieText
  },

  /**
   * 获取cookie
   * @param name {string}
   * @returns {string}
   */

  get: function (name) {
    let arr
    let reg = new RegExp('(^| )' + encodeURIComponent(name) + '=([^;]*)(;|$)')
    arr = document.cookie.match(reg)
    if (arr) {
      return decodeURIComponent(arr[2])
    } else {
      return null
    }
  },
  /**
   * 删除cookie
   * @param name
   * @param domain
   * @param path
   * @param secure
   */

  del: function (name, domain, path, secure) {
    this.set(name, '', 0, domain, path, secure)
  }
}

export default Cookie
