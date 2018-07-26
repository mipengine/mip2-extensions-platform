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
    cancelOrder: zdyxhttp + 'Order/cancelOrder',
    comitEvaluate: zdyxhttp + 'Order/evaluateOrder'
  },
  getQueryString: function (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let result = window.location.search.substr(1).match(reg)
    if (result != null) {
      return decodeURIComponent(result[2])
    } else {
      return null
    }
  }
})
