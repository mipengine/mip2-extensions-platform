import Req from '../utils/$fetch'

const serviceModule = {
  getLicenseInfoForEncry (params) {
    return Req({
      url: 'jmt-api/aladdin/getLicenseInfoForEncry',
      method: 'post',
      tip: true,
      otherHeaders: {
        'X-CLIENT-SOURCE': escape('百度'),
        'X-CHANNEL-ID': '4291',
        'X-CHANNEL-NAME': escape('百度阿拉丁')
      },
      isAlertErr: false
    }, params)
  },
  getCarInfo (params) {
    return Req({
      url: 'jmt-api/aladdin/getCarInfo',
      method: 'get',
      tip: true,
      otherHeaders: {
        'X-CLIENT-SOURCE': escape('百度'),
        'X-CHANNEL-ID': '4291',
        'X-CHANNEL-NAME': escape('百度阿拉丁')
      },
      isAlertErr: false
    }, params)
  }
}
const ApiSetting = { ...serviceModule }

export default ApiSetting
