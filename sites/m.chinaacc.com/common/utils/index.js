import conf from './config'
import { getCookie } from './cookie'
// 格式化jsonp参数
export const formatParams = params => {
  let arr = []
  for (let name in params) {
    arr.push(
      encodeURIComponent(name) + '=' + encodeURIComponent(params[name])
    )
  }
  return arr.join('&')
}

// 获取地址链接中"?"后的参数
export const getUrlParams = () => {
  let url = location.search
  let params = {}
  if (url.indexOf('?' !== -1)) {
    let str = url.substr(1)
    let strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      params[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
    return params
  } else {
    return params
  }
}

// 数组转字符串
export const stringifyArr = arr => {
  return arr.join(',')
}

// 货币format
export const currency = num => {
  num = num.toString().replace(/\$|,/g, '')
  if (isNaN(num)) num = '0'
  let sign = num + '' === (num = Math.abs(num)) + ''
  num = Math.floor(num * 100 + 0.50000000001)
  let cents = num % 100
  num = Math.floor(num / 100).toString()
  if (cents < 10) cents = '0' + cents
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      ',' +
      num.substring(num.length - (4 * i + 3))
  }
  return '¥' + (sign ? '' : '-') + num + '.' + cents
}

// 通过对象属性，对对象排序
export const compareSort = property => {
  return function (a, b) {
    let v1 = a[property]
    let v2 = b[property]
    return v1 - v2
  }
}

// 字符串截取
export const limitTo = (str, num) => {
  let maxLen = parseInt(num)
  str = str.toString()
  return str.length > maxLen ? str.slice(0, maxLen) + '...' : str
}

// 页面跳转
export const gotoUrl = path => {
  MIP.viewer.open(conf.devPageUrl + path, {
    isMipLink: true
  })
}

// 清除数组中空元素
export const emptyArr = arr => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined || arr[i] === '') {
      arr.splice(i, 1)
      i = i - 1
    }
  }
  return arr
}

// 是否存在于number数组中
export const inNumArray = (str, arr) => {
  let result = false
  arr.forEach(item => {
    item = parseInt(item)
    if (str === item) {
      result = true
    }
  })
  return result
}

// 是否存在于String数组中
export const inStrArray = (str, arr) => {
  let result = false
  arr.forEach(item => {
    if (item.indexOf(str.toString()) !== -1) {
      result = true
    }
  })
  return result
}

// 检测是否登录
export const checkLogin = (flag) => {
  let cdeluid = getCookie('cdeluid')
  let session = getCookie('sessionId')
  if (cdeluid !== undefined && session !== undefined) {
    flag = false
  } else {
    flag = true
  }
  return flag
}
