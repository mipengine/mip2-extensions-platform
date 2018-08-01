import Req from '../utils/$fetch'

const serviceModule = {
  getMyOrders (params) {
    return Req({
      url: 'order/getMyOrders',
      method: 'post',
      tip: true
    }, params)
  },
  cancelOrDelOrder (params) {
    return Req({
      url: 'order/cancelOrDelOrder',
      method: 'post',
      tip: true
    }, params)
  },
  getMember (params) {
    return Req({
      url: 'login/getMember',
      method: 'post',
      tip: true
    }, params)
  },
  findOrderDetails (params) {
    return Req({
      url: 'order/findOrderDetails',
      method: 'post',
      tip: true
    }, params)
  }
}
const ApiSetting = { ...serviceModule }

export default ApiSetting
