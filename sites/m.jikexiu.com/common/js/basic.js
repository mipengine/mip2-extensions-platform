import axios from 'axios'
import axiosConfig from './config.axios'
import Qs from 'qs'
// axios基础配置
let Axios = axios.create({
  timeout: axiosConfig.timeout || 0,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})
// 接口请求拦截器
Axios.interceptors.request.use(config => {
  // 获取当前接口路径(自动匹配当前站点地址对应的接口地址)
  let apiUrl =
        new RegExp(axiosConfig.proWeb).test(location.href)
          ? ((config.url === 'authentication/mobile' || config.url === 'oauth/token') ? axiosConfig.proApiAccount : axiosConfig.proApi)
          : ((config.url === 'authentication/mobile' || config.url === 'oauth/token') ? axiosConfig.testApiAccount : axiosConfig.testApi)

  let token =
        (config.url === 'user/order/list' || config.url === 'user/item/list' || config.url === 'order/detail' || config.url === 'item/detail' || config.url === 'order/saveOrder')
          ? `bearer ${JSON.parse(localStorage.getItem('tokenMsg')).access_token}` : 'Basic dGVzdC1qa3g6amt4c2VjcmV0'
  config.url = apiUrl + config.url
  // 添加公共请求头部信息
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  config.headers.common['Authorization'] = token
  // config.headers = Object.assign(config.headers, axiosConfig.headers || {})
  // 合并公共参数
  // let sendData = Object.assign(config.data, axiosConfig.params || {})
  // 提交数据添加时间戳
  // sendData.timesanp = +new Date()
  // 格式化参数
  config.data = Qs.stringify(config.data, { arrayLimit: 10000 })
  return config
}, error => {
  return Promise.reject(error)
})

// 响应返回拦截器
Axios.interceptors.response.use(data => {
  return data
}, ({ response }) => {
  // 获取错误状态码
  // switch (response.status) {
  //   case 401: console.error('您还没有权限访问该页面'); router.push('/login'); break
  //   case 404:
  //     console.error('您的访问路径不存在')
  //     router.push('/error_page/404')
  //     break
  //   case 500:
  //     console.error('服务器错误')
  //     router.push('/error_page/500')
  //     break
  // }
  return Promise.reject(response)
})

export default Axios
