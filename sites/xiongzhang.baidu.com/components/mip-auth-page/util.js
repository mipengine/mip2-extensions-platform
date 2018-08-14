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

export function getRedirectUrl (url, query, hash) {
  let result = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'code=' + query.code + '&state=' + encodeURIComponent(query.state) + hash

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

export function log (action = '', ext = {}, xzhid = '') {
  let img = document.createElement('img')
  /* eslint-disable fecs-camelcase */
  let data = {
    rqt: 300,
    click_token: '',
    url: 'authlogin',
    ext: JSON.stringify(ext),
    action,
    xzhid
  }
  /* eslint-enable fecs-camelcase */

  let queryArr = Object.keys(data).map(key => {
    return `${key}=${encodeURIComponent(data[key])}`
  })

  img.src = 'https://rqs.baidu.com/service/api/rqs?' + queryArr.join('&') + '&_t=' + (new Date()).getTime()
}
