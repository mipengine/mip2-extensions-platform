import axios from 'axios'
import Qs from 'qs'
// axios基础配置
let Axios = axios.create({
  // baseURL: apiUrl || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})
Axios.defaults.transformRequest = [function(data) {
  return Qs.stringify(data)
}]

// 接口请求拦截器
Axios.interceptors.request.use(config => {
  let token =  config.url=='order/saveOrder'? JSON.parse(localStorage.getItem('tokenMsg')).access_token : ''
  let apiUrl = (config.url=='authentication/mobile' || config.url == 'oauth/token') ? 'https://account_t.jikexiu.com/':'https://api_t.jikexiu.com/v1/'
  config.url = apiUrl + config.url
  // 提交数据添加时间戳
  // sendData.timesanp = +new Date()
  // 格式化参数
  //  config.data = Qs.stringify(sendData, { arrayLimit: 10000 })
  // // 非必须token验证接口请求不加token
  // if(config.isToken){
  //   config.headers.Token = token
  // }else{
    // axios.defaults.headers.common['Authorization'] = token?`bearer ${token}`:'Basic dGVzdC1qa3g6amt4c2VjcmV0'
    config.headers.common['Authorization'] = token?`bearer ${token}`:'Basic dGVzdC1qa3g6amt4c2VjcmV0'
  // }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应返回拦截器
Axios.interceptors.response.use(data => {
  return data
}, ({ response }) => {
  // 获取错误状态码
  switch (response.status) {
    case 401: console.error('您还没有权限访问该页面'); break
    case 404: console.error('您的访问路径不存在'); break
    case 500: console.error('服务器错误'); break
  }
  return Promise.reject(response)
})

export default Axios




/*****************另一种封装**************************/
// import axios from 'axios'
// import qs from 'qs'

// axios.interceptors.request.use(config => {

//     config.timeout = 10000
//     return config;
// }, err => {
//     return Promise.resolve(err);
// })
// axios.interceptors.response.use(data => {
//     return data;
// }, err => {
//     if (err.response.status == 404) {
//         console.log('服务器被吃了⊙﹏⊙∥', err.response.status);
//     } else if (err.response.status == 403) {
//         console.log('权限不足,请联系管理员!');
//     } else if (err.response.status == 401) {
//         console.log('未知错误!');
//     }else if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1 ){
//         let config = err.config
//         console.log(err,'config1')
        
//         return axios.post(config);
        
//     }
//     return Promise.resolve(err);
// })

// export const fetch = (url, params) => {
//   let token =  url=='order/saveOrder'? `bearer ${JSON.parse(localStorage.getItem('tokenMsg')).access_token}` : ''
//   let apiUrl = url=='authentication/mobile' || url == 'oauth/token' ? 'https://account_t.jikexiu.com/':'https://api_t.jikexiu.com/v1/'
//   url = apiUrl + url
//     axios.defaults.transformRequest = [function(data) {
//         return qs.stringify(data)
//     }]
//     return axios({
//         method: 'post',
//         url: url,
//         data: params,
//         transformRequest: [function(data) {
//             return qs.stringify(data)
//         }],
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Authorization': token || 'Basic dGVzdC1qa3g6amt4c2VjcmV0'
//         }
//     }).then(res => {
        
//     }).catch(error => {
        
//     })
//   }