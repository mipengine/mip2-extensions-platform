
// function request (fetchPromise, timeout = 10000) {
//   let abortFn = null

//   // 这是一个可以被reject的promise
//   let abortPromise = new Promise(function (resolve, reject) {
//     abortFn = function () {
//       MIP.setData({
//         alertMsg: {
//           errorTitle: '请求超时',
//           isError: true
//         }
//       })
//       reject(new Error('request timeout'))
//     }
//   })

//   // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
//   let abortablePromise = Promise.race([
//     fetchPromise,
//     abortPromise
//   ])

//   setTimeout(function () {
//     abortFn()
//   }, timeout)

//   return abortablePromise
// }

function request (url, method = 'get', body = {}, timeout = 30000) {
  let show
  let requestPromise
  if (method === 'get' || method === 'GET') {
    requestPromise = new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.code) show = true
          resolve(res)
        })
        .catch((error) => {
          MIP.setData({
            alertMsg: {
              errorTitle: error,
              isError: true
            }
          })
          reject(error)
        })
    })
  } else {
    let [str, len] = ['', 0]
    for (let key in body) {
      if (len >= 1) {
        str += '&'
      }
      len++
      str += encodeURI(`${key}=${body[key]}`)
    }
    let head = url.indexOf('authentication/mobile') > 0 ? {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic dGVzdC1qa3g6amt4c2VjcmV0'
    } : {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    head = url.indexOf('order/saveOrder') > 0 ? {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('tokenMsg')).access_token}`
    } : head
    requestPromise = new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: head,
        body: str
      })
        .then((response) => response.json())
        .then((res) => {
          if (url.indexOf('authentication/mobile') < 0 && res.code) show = true
          if (url.indexOf('common/smscode') < 0 && url.indexOf('common/validate') < 0 && url.indexOf('authentication/mobile') < 0 && url.indexOf('oauth/token') < 0) {
            if (res.code !== 200) {
              MIP.setData({
                alertMsg: {
                  errorTitle: res.msg,
                  isError: true
                }
              })
            }
          }
          resolve(res)
        })
        .catch((error) => {
          MIP.setData({
            alertMsg: {
              errorTitle: error,
              isError: true
            }
          })
          reject(error)
        })
    })
  }

  let aboutFn = null
  // 这是一个可以被reject的promise
  let abortPromise = new Promise(function (resolve, reject) {
    aboutFn = function () {
      if (!show) {
        MIP.setData({
          alertMsg: {
            errorTitle: '请求超时',
            isError: true
          }
        })
      }

      reject(new Error('request timeout'))
    }
  })
  // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  let abortablePromise = Promise.race([
    requestPromise,
    abortPromise
  ])

  setTimeout(function () {
    aboutFn()
  }, timeout)
  // post请求
  return abortablePromise
}
export default request
