/**
 * @file 常用方法
 * @author huangjing
 */

export function getQuery (name) {
  let url = location.search.substr(1)
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let matched = url.match(reg)

  return matched ? decodeURIComponent(matched[2]) : ''
}

export function getRedirectUrl (url, query) {
  let result = url + (url.indexOf('?') >= 0 ? '&' : '?') +
        'code=' + query.code +
        '&state=' + encodeURIComponent(query.state)
  return result
}

export function getUUID () {
  let s = []
  let hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  let uuid = s.join('')
  return uuid
}
