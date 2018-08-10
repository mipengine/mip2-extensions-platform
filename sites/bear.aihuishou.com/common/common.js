import Request from './request'
import { Base64 } from 'js-base64'

const Api = {

  getAccessToken: async (UID, SECRET) => {
    const opts = {
      url: 'https://neon.aihuishou.com/oauth/token',
      method: 'POST',
      params: {
        'grant_type': 'client_credentials'
      },
      headers: {
        'Authorization': 'Basic' + ' ' + Base64.encode(`${UID}:${SECRET}`)
      }
    }
    let result = await Request(opts) // eslint不允许直接return 一个 await value
    return result
  },

  getAreaConfig: async (slug) => {
    const opts = {
      url: 'https://neon.aihuishou.com/v1/current_app',
      params: {
        slug
      }
    }
    let result = await Request(opts)
    return result
  },
  getCsrfToken: async (slug) => {
    const opts = {
      url: 'https://neon.aihuishou.com/v1/csrf/token'
    }
    let result = await Request(opts)
    return result
  },
  getCityInfoByCode: async (adcode) => {
    const opts = {
      url: `https://neon.aihuishou.com/v1/divisions/${adcode}/parent`
    }
    let result = await Request(opts)
    return result
  },
  getCityInfoByIp: async () => {
    const opts = {
      url: `https://neon.aihuishou.com/v1/divisions/ip`
    }
    let result = await Request(opts)
    return result
  }
}

export default Api
