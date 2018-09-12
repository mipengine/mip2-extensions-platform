const jsonpAction = (url, params, callbackStr = 'jsonpCallBack') => {
  return new Promise((resolve, reject) => {
    window.fetchJsonp(url + params, {
      jsonpCallback: callbackStr
    }).then(res => {
      return res.json()
    }).then(results => {
      if (results.status === 'OK' || results.status === '0') {
        if (typeof results.data === 'object') {
          resolve(results.data)
        } else if (typeof results.data === 'string') {
          resolve(JSON.parse(results.data))
        }
      } else {
        reject(results)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export default jsonpAction
