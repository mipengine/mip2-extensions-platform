const zdyxhttp = 'https://mip.wangxiao.cn/'
export default ({
  url: 'https://mip.wangxiao.cn/',
  // 线上
  api: {
    getProductSubjects: zdyxhttp + 'course/getProductSubjects',
    sendMessage: zdyxhttp + 'baiduUser/sendMessage',
    compareMessageCode: zdyxhttp + 'baiduUser/compareMessageCode',
    getGoodsCatalog: zdyxhttp + 'Order/getProductData',
    getOrderList: zdyxhttp + 'Order/orderList',
    cancelOrder: zdyxhttp + 'order/cancel',
    comitEvaluate: zdyxhttp + 'Order/evaluateOrder',
    placeOrder: zdyxhttp + 'baiduUser/placeOrder'
  },
  getQueryString: function (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let result = window.location.search.substr(1).match(reg)
    if (result != null) {
      return decodeURIComponent(result[2])
    } else {
      return null
    }
  },
  getToken: function () {
    return window.localStorage.getItem('mip-login-xzh:sessionId:https://mip.wangxiao.cn:443/baiduUser/user') || window.localStorage.getItem('mip.wangxiao.token')
  },
  setToken: function (token) {
    if (token) {
      window.localStorage.setItem('mip-login-xzh:sessionId:https://mip.wangxiao.cn:443/baiduUser/user', token)
      window.localStorage.setItem('mip.wangxiao.token', token)
    }
  },
  setSession: function (datas) {
    sessionStorage.setItem('zdwxdata', JSON.stringify(datas))
  },
  getSession: function () {
    let data = sessionStorage.getItem('zdwxdata')
    return JSON.parse(data)
  },
  // 使用MIP2同步数据
  setGlobalData: function (newVal) {
    try {
      MIP.setData({'#zdwxdata': newVal})
    } catch (e) {
      console.error(e, e.stack)
    }
  }
})
