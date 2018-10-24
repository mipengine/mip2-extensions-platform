<template>
  <div/>
</template>

<script>
import { getCookie, setCookie } from '../../common/utils/cookie'
import { getUrlParams, formatParams } from '../../common/utils'
import { Toast } from '../../common/utils/toast'
export default {
  data () {
    return {
      code: ''
    }
  },
  created () {
    const that = this
    let openId = getCookie('wxOpenId')
    if (
      MIP.util.platform.isWechatApp() &&
      (openId == null || openId === undefined)
    ) {
      // 微信内
      // cookie中没有openId，一个用户对应中华会计网校只有一个openId，所以只要有值，就无需再次认证
      let params = getUrlParams()
      // 获取参数code
      that.code = params.code
      if (that.code != null) {
        // 存在code，调起接口获取openId
        let paramMap = {
          'code': that.code
        }
        let result = window.fetchJsonp(
          '//m.chinaacc.com/m_member/baidu/wxOauth.shtm?' + formatParams(paramMap),
          {
            jsonpCallback: 'jsonpCallback'
          }
        )
        result
          .then(function (response) {
            return response.json()
          })
          .then(function (json) {
            let _json = JSON.parse(JSON.stringify(json))
            // code -1获取失败；1获取成功返回openId，存入cookie
            if (_json.code + '' === '1') {
              setCookie('wxOpenId', _json.openId)
            } else {
              let $Toast = new Toast()
              $Toast.open({
                message: '微信认证用户信息失败，请刷新页面重试'
              })
            }
          })
          .catch(ex => {
            let $Toast = new Toast()
            $Toast.open({
              message: '微信认证用户信息失败，请刷新页面重试，failed:' + ex
            })
          })
      }
      if (that.code == null) {
        // 不存在code，去认证页
        let url = window.location.href
        let wxParamMap = {
          'appid': 'wxf6ab920c859515ee',
          'redirect_uri': url,
          'res': '',
          'response_type': 'code',
          'scope': 'snsapi_base',
          'state': '123#wechat_redirect'
        }
        MIP.viewer.open(
          'https://open.weixin.qq.com/connect/oauth2/authorize?' + formatParams(wxParamMap)
        )
      }
    }
  }
}
</script>
