const jsonpAction = (url, params, callbackStr = 'jsonpCallBack') => {
  return new Promise((resolve, reject) => {
    fetch(url + params, {
      jsonpCallback: callbackStr
    }).then(res => {
      return res.text()
    }).then(results => {
      resolve(results) 
    }).catch(err => {
      reject(err)
    })
  })
}

export default jsonpAction
