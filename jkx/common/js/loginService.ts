 import axios from 'axios'
const OPENAPI_GRANT_BY_CODE = 'http://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&;;;;;;;;;;;;'
const OPENAI_GET_USER_INFO = 'http://openapi.baidu.com/rest/2.0/cambrian/sns/userinfo?'
export class LoginService {
  public async grantByCode(code: string, redirectUri: string): Promise<User> {
    const access = this.config.config.xiongzhanghao
    const codeUrl = `${OPENAPI_GRANT_BY_CODE}${qs.stringify({
      code,
      client_id: access.clientId,
      client_secret: access.clientSecret,
      redirect_uri: redirectUri
    })}`
    const res = await axios.get(codeUrl)                                 // 获取 access_token openid
    const json = res.data
    if (!json && json.error_msg) {
      throw new InternalServerError(json.error_msg)
    }
    const user = await User.findOrCreateByOauthId(json.openid)
    if (!user.id) {
      // create user
      const resUserInfo = await axios.get(                               // 拉取用户信息
        `${OPENAI_GET_USER_INFO}${qs.stringify({
          access_token: json.access_token,
          openid: json.openid
        })}`
      )
      const userData = resUserInfo.data 
    }
    return user
  }
}