/**
 * @file 配置clientID等统计信息
 */

const getCookie = name => {
  let reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  let result = document.cookie.match(reg)
  if (result) {
    return unescape(result[2])
  } else {
    return ''
  }
}

const setCookie = (name, value) => {
  let Days = 30
  let exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`
}

const setClientId = () => {
  let clientId = getCookie('clientac')
  if (!clientId) {
    let nnum = parseInt(Math.random(10, 1) * 1000000) + ''
    if (nnum.length < 6) {
      for (let nnuml = nnum.length; nnuml < 6; nnuml++) {
        nnum += '0'
      }
    }
    clientId = new Date().getTime() + nnum
    setCookie('clientac', clientId)
  }
  return clientId
}

export default {
  setClientId
}
