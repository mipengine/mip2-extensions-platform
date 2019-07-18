export const currentURL = () => MIP.util.getOriginalUrl()

export const getURLParameters = (url = currentURL()) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => {
    a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)
    return a
  }, {})

export const getCurrentUrlParamter = key => getURLParameters()[key]

export const serializeParameter = (k, v = '', encode = true) =>
  encode
    ? `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
    : `${k}=${v}`

export const serializeParameters = (
  params,
  { encode = true } = {}
) => {
  const query = Object.keys(params).map(k =>
    serializeParameter(k, params[k], encode)
  )
  return query.join('&')
}
