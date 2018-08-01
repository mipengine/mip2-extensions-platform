import Req from '../utils/$fetch'

const serviceModule = {
  getMember (params) {
    return Req({
      url: 'login/getMember',
      method: 'post',
      tip: false,
      isAlertErr: false
    }, params)
  },
  getNoticeBar (params) {
    return Req({
      url: 'notice/getNoticeBar',
      method: 'post',
      tip: false,
      isAlertErr: false
    }, params)
  },
  illegalsSearch (params) {
    return Req({
      url: 'illegalsPayment/illegalsSearch',
      method: 'post',
      tip: true
    }, params)
  },
  siteIllegalsSearch (params) {
    return Req({
      url: 'illegalsPayment/siteIllegalSearch',
      method: 'post',
      tip: true
    }, params)
  },
  innerIllegalsSearch (params) {
    return Req({
      url: 'illegalsPayment/innerIllegalsSearch',
      method: 'post',
      tip: true
    }, params)
  },
  decisionCreatelllegalsOrder (params) {
    return Req({
      url: 'order/createlllegalsOrder',
      method: 'post',
      tip: true
    }, params)
  },
  createlllegalsOrder (params) {
    return Req({
      url: 'order/createlllegalsOrder',
      method: 'post',
      tip: true
    }, params)
  },
  checkOwnVehicle (params) {
    return Req({
      url: 'illegalsPayment/checkOwnVehicle',
      method: 'post',
      tip: true
    }, params)
  },
  getMsmCode (params) {
    return Req({
      url: 'code/getMsmCode',
      method: 'post',
      tip: true
    }, params)
  },
  checkMsmCode (params) {
    return Req({
      url: 'code/checkMsmCode',
      method: 'post',
      tip: true
    }, params)
  }

}
const ApiSetting = { ...serviceModule }

export default ApiSetting
