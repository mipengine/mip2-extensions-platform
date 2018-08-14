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
  },
  loginBecomeMember (params) {
    return Req({
      url: 'login/login',
      method: 'post',
      tip: true,
      isAlertErr: false
    }, params)
  },
  popupCheckMsmCode (params) {
    return Req({
      url: 'code/checkMsmCode',
      method: 'post',
      tip: true,
      isAlertErr: false
    }, params)
  },
  popupLoginBecomeMember (params) {
    return Req({
      url: 'login/login',
      method: 'post',
      tip: true,
      isAlertErr: false
    }, params)
  }
}
const ApiSetting = { ...serviceModule }

export default ApiSetting
