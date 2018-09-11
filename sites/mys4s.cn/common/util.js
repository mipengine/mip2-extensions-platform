import md5 from './md5'
function signData (data, path) {
  let array = []
  let key
  let seed = '99754106633f94d350db34d548d6091a'
  for (key in data) {
    if (data[key] !== undefined && key !== 'md5') {
      array.push(data[key] ? key + '=' + data[key] : key + '=')
    }
  }
  array.sort()
  let param = ''
  for (let item of array) {
    if (param !== '') {
      param += '&'
    }
    param += item
  }
  param += seed
  param += '/' + path
  return md5(param)
}
export default {
  // 弱提示
  toast (msg = '', time = 2500) {
    let toast = document.createElement('div')
    toast.className = 's4s-toast'
    toast.innerHTML = msg
    document.body.appendChild(toast)
    let timer = setTimeout(() => {
      clearTimeout(timer)
      let timer2 = setTimeout(() => {
        document.body.removeChild(toast)
        clearTimeout(timer2)
      }, 200)
    }, time)
  },
  // 时间格式化
  formatDateTime (timeStamp) {
    let date = timeStamp ? new Date(timeStamp) : new Date()
    // date.setTime(timeStamp * 1000);
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  },
  signData,
  fetchData (path, param) {
    let params = {
      ...param
    }
    try {
      params.access_token = window.localStorage.getItem('mip-login-xzh:sessionId:https://mys4s.cn/v3/nc/auth?source=xzapp')
      params.source = 'xzapp'
    } catch (e) {
      throw (new Error(e))
    }
    params.md5 = signData(params, path)
    for (let i in params) {
      if (typeof params[i] === 'number') {
        params[i] += ''
      }
    }
    return fetch('https://mys4s.cn/' + path, {
      method: 'POST',
      body: JSON.stringify(params),
      // headers: {
      //   'Content-Type': 'application/json'
      // },
      // credentials: 'same-origin',
      credentials: 'include'
    })
      .then(data => {
        return data.json()
      })
  }
}
