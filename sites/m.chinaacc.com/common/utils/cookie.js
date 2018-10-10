export const setCookie = (key, value) => {
  document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value)
}

/* export const setCookie = (key, value) => {
  return (document.cookie = [
    encodeURIComponent(key),
    '=',
    encodeURIComponent(value),
    '; path=/',
    '; domain=.chinaacc.com'
  ].join(''))
} */

export const getCookie = key => {
  let results
  if (!key) {
    results = {}
  }
  let cookies = document.cookie ? document.cookie.split(';') : []
  let rdecode = /(%[0-9A-Z{2}])+/g
  for (let i in cookies) {
    let parts = cookies[i].split('=')
    let name = parts[0].replace(rdecode, decodeURIComponent).trim()
    let cookieStr = parts.slice(1).join('=')
    if (key && key === name) {
      results = decodeURIComponent(cookieStr)
      break
    }
  }
  return results
}
