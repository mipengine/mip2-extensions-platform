/**
 * js sdk验证
 */
import {
  requestFun
} from './reqUtils'

export const jsSdkCheck = (options = {}) => {
  let url = options.url || 'https://mip.xin.com/help'
  return requestFun('/apis/js_sdk_sign', {
    method: 'GET',
    param: {
      url: url
    }
  })
}
