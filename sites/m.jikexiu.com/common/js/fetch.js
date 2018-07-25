
import Axios from './basic'

export const fetch = (url, params = {}, loading = false) => {
  return new Promise((resolve, reject) => {
    // 接口请求为post方式
    Axios.post(url, params).then(({ data }) => {
      if (data.code !== 200) {
        MIP.setData({alertMsg: {
          errorTitle: data.msg,
          isError: true
        }})
      }
      resolve(data)
    }).catch(err => {
      // 错误抛出
      let load = false
      if (url === 'refreshToken') load = true
      MIP.setData({
        loading: load,
        alertMsg: {
          errorTitle: `请求错误,错误提示${err},接口${url}`,
          isError: true
        }})
      reject(err)
      // throw new Error(err)
    })
  })
}
