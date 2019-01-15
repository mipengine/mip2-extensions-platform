/**
 * @author lff
 * @time 2018-01-23
 * 获取地址栏参数
 */export function getUrlParams () {
  let str = location.href
  let num = str.indexOf('?')
  const param = {}
  str = str.substr(num + 1)
  const arr = str.split('&')
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=')
    if (num > 0) {
      const name = arr[i].substring(0, num)
      const value = arr[i].substr(num + 1)
      param[name] = decodeURI(value)
    }
  }
  return param
}
