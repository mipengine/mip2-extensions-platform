
import Axios from './basic'
/**
 * @decription      公共数据获取接口
 * @params {String} url      接口地址
 * @params {Object} params   request参数
 * @params {Object} isToken  是否需要token
*/
export const fetch = (url, params = {},loading=false) => {
  MIP.setData({"loading":true})
  return new Promise((resolve, reject) => {
    // 接口请求为post方式
    Axios.post(url, params).then(({ data }) => {
      MIP.setData({"loading":false})
      if(data.code!=200){
        MIP.setData({alertMsg:{
          errorTitle: data.msg,
          isError: true
        }})
      }
      
      resolve(data)
    }).catch(err => {
      // 错误抛出
      MIP.setData({"loading":false,alertMsg:{
          errorTitle: "请求错误",
          isError: true
      }})

      throw new Error(err)
    })
  })
}
