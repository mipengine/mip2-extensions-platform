import Axios from 'axios'
import cookie from './cookie'
import Api from './common'
import config from '../config'

const OAUTH_CONF = config[config['env']]

const { UID, SECRET } = OAUTH_CONF
// 代理名，原来为proxy_name,迎合eslint改为驼峰
const proxyName = '/api'
// 默认的参数
const defaultArgs = {
  timeout: 8000
}

const Request = async (args, codes) => {
  // 截取完整路径里面掉占位符：https://neon.aihuishou.com
  const reghttp = 'https://neon.aihuishou.com'
  // headers 增加slug
  args.headers = {
    ...args.headers,
    'App-Slug': OAUTH_CONF['slug']
  }
  // 默认method
  args.method = (args.method || 'GET').toLocaleUpperCase()
  // url 增加代理名
  args.url = proxyName + args.url.replace(reghttp, '')
  // 合并默认参数和业务参数
  args.whiteCodes = codes || null
  const opts = { ...defaultArgs, ...args }
  // 如果是post 请求 则 delete 掉 params key值 赋值给data
  if (args.method === 'POST') {
    opts['data'] = opts.params
    delete opts['params']
  }
  // 从cookie 获取token
  const accessToken = cookie.get('access_token_' + 'baidu_bears')
  const tokenType = cookie.get('token_type')

  // 设置headers
  if (accessToken) {
    opts.headers = {
      ...opts.headers,
      'Authorization': tokenType + ' ' + accessToken
    }
  }

  // 没有oauth 先请求token
  if (!accessToken && !/\/oauth\/token/.test(opts.url)) {
    let tokenRes
    try {
      tokenRes = await Api.getAccessToken(UID, SECRET)
    } catch (e) { console.warn(e); return }

    // 前端存的cookie 比后端少100 秒
    cookie.set('access_token_' + 'baidu_bears', tokenRes.access_token, (tokenRes.expires_in - 100) * 1000)
    cookie.set('token_type', tokenRes.token_type, (tokenRes.expires_in - 100) * 1000)

    // 继续当前请求，所以把token 写进去
    opts.headers = {
      ...opts.headers,
      'Authorization': tokenRes.token_type + ` ${tokenRes.access_token}`
    }
  }

  if (opts.method === 'POST' && !/\/oauth\/token/.test(opts.url)) {
    let res
    try {
      res = await Api.getCsrfToken()
    } catch (e) { console.warn(e); return }

    // 继续当前请求，所以把token 写进去
    opts.headers = {
      ...opts.headers,
      'X-CSRF-Token': res.token
    }
  }

  // 返回一个promise 用来 await调用
  return new Promise((resolve, reject) => {
    Axios(opts).then((res) => {
      // 如果是oauth 验证
      if (/\/oauth\/token/.test(opts.url)) {
        resolve(res.data)
        return
      }

      // 如果业务层有错误码过来
      if (codes && codes.indexOf(res.data.code) !== -1) {
        reject(res.data)
        return
      }
      // code 不为0
      if (+res.data.code !== 0) {
        reject(res.data)
        return
      }

      if (args['getAll']) {
        resolve(res.data)
        return
      }
      resolve(res.data.data)
    }).catch((err) => {
      // 默认直接弹框报错
      reject(err)
    })
  })
}

export default Request
