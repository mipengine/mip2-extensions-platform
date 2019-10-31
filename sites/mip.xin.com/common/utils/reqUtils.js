import config from './config'
import {
  getLocalStorage,
  serialize,
  getDomain
} from './utils'

// 获得api路径
const getApiPath = (action) => {
  if (action.indexOf('/apis/') > -1) {
    // 走node接口 对当前域名进行请求
    return action
  }
  if (!action) return config.domain
  if (config.env === 'production' || config.env === 'build') {
    return config.domain + action
  }
  let path = (config.apiActionMap[action] || config.domain) + action
  return path
}

// 默认参数
let baseParams = {
  param: {},
  headers: 'application/json',
  method: 'GET'
}
export const requestFun = function (url = '', options = {}) {
  let sn = getLocalStorage('ajaxToken') || ''
  let requestOptions = Object.assign(baseParams, options)
  let contentType = 'application/json'
  let requestUrl = getApiPath(url) + '?source=mip'
  let params = {}
  let body = JSON.stringify({
    sn: sn,
    params: requestOptions.param
  })
  if (requestOptions.method === 'POST') {
    params = {
      body: body,
      method: requestOptions.method,
      headers: {
        'X-Requested-With': 'xmlhttprequest', // 需要加上这个请求头
        'content-type': contentType // 默认值
      }
    }
    if (requestUrl.indexOf('/apis/') > -1) {
      // 拼接链接适配百度
      requestUrl = getDomain() + requestUrl
      params.credentials = 'include'
      // 请求相同域 带上cookie
    }
  } else if (requestOptions.method === 'GET') {
    requestUrl = requestUrl + '&' + serialize(requestOptions.param)
  }
  return new Promise((resolve, reject) => {
    fetch(requestUrl, params)
      .then(response => {
        return response.json()
      })
      .then(res => {
        if (res.error_code && res.error_code !== 200) {
          reject(res)
          return
        }
        if (res.data && res.error_code === 200) {
          // 数据正常
          resolve(res.data)
        } else {
          reject(res.data)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
