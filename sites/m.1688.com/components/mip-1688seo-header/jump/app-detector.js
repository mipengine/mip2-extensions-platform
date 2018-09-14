/// ================== Copy from 'universal-env' =====================
export const isWeb = typeof navigator === 'object' && (navigator.appCodeName === 'Mozilla' || navigator.product === 'Gecko')
export const isNode = typeof process !== 'undefined' && !!(process.versions && process.versions.node)
export const isWeex = typeof callNative === 'function'
export const isReactNative = typeof __fbBatchedBridgeConfig !== 'undefined'
/// ==================================================================

const tryGetUA = (ua) => {
  if (ua == null && typeof window !== 'undefined') {
    ua = window.navigator.userAgent
  }

  return ua
}

const defaultUA = tryGetUA()

const REGEX_IS_WECHAT = /MicroMessenger/
const REGEX_IS_IOS = /iPhone|iPad|iPod/
const REGEX_IS_ANDROID = /[Aa]ndroid/
const REGEX_IS_IOS_VERSION = /\(i[^;]+;( U;)? CPU.+Mac OS X.+Version\/(\d+)/

let isAndroid = false
let isIOS = false
let isWeChat = false
let iOSVersion = null

if (defaultUA) {
  isAndroid = REGEX_IS_ANDROID.test(defaultUA)
  isIOS = REGEX_IS_IOS.test(defaultUA)
  isWeChat = REGEX_IS_WECHAT.test(defaultUA)

  const m = REGEX_IS_IOS_VERSION.exec(defaultUA)
  iOSVersion = m && m[2]
}

export { isAndroid, isIOS, isWeChat, iOSVersion }

/**
 * 根据传入的 UA 或当期环境的 UA 返回 App 信息
 *
 * @param {string?} ua 允许用户手动传入 userAgent
 */
export const detect = (ua) => {
  ua = tryGetUA(ua)

  // 集团 UA 规范
  const REGEX_ALIAPP = /AliApp(([^/]+)\/([^/]+))/
  // 以 -PD 结尾的认为是 pad 的标识
  const REGEX_IS_PAD = /-PD$/

  if (isWeex) {
    // eslint-disable-next-line
    const appCode = navigator.appName;
    // eslint-disable-next-line
    const version = navigator.appVersion;
    const isPad = REGEX_IS_PAD.test(appCode)

    return {
      appCode,
      version,
      isPhone: !isPad,
      isPad
    }
  }

  const m = REGEX_ALIAPP.exec(ua)
  // appCode 和版本号同时匹配上
  if (m && m[1] && m[2]) {
    const appCode = m[1]
    const version = m[2]
    const isPad = REGEX_IS_PAD.test(appCode)

    return {
      appCode,
      version,
      isPhone: !isPad,
      isPad
    }
  }

  return null
}

export const appInfo = detect()

/**
 * 判断当前环境是否与传入的 appCode 一致
 *
 * @param {string} appCode 用于判断的 appCode
 * @param {string?} ua 允许用户手动传入 userAgent
 */
export const is = (appCode, ua) => {
  if (ua == null) {
    ua = defaultUA
  }

  return !!appInfo && appInfo.appCode === appCode
}

// ==================== 集团 App 环境判断 =====================
export const appEnvConstantsMap = {
  // 千牛
  'QN': 'isQN',
  // 1688
  '1688': 'is1688',
  // 手淘
  'TB': 'isTaoBao',
  // 手猫 🐱
  'TM': 'isTMall',
  // 钉钉
  'DingTalk': 'isDingTalk',
  // 口碑商家
  'AM': 'isAlipayMercant',
  // 支付宝
  'AP': 'isAlipay',
  // Alibaba Buyer
  'EA': 'isAlibabaBuyer',
  // Alibaba Seller
  'AS': 'isAlibabaSeller',
  // 零售通
  'RetailTrader': 'isRetailTrader'
}
export const isQN = is('QN')
export const is1688 = is('1688')
export const isTaoBao = is('TB')
export const isTMall = is('TM')
export const isDingTalk = is('DingTalk')
export const isAlipayMercant = is('AM')
export const isAlipay = is('AP')
export const isAlibabaBuyer = is('EA')
export const isAlibabaSeller = is('AS')
export const isRetailTrader = is('RetailTrader')

/// =================== dynamic way will fail for static es2015 module definition =============
// const appEnvConstants = {}
// appList.forEach(appCode => {
//   Object.defineProperty(appEnvConstants, `is${appCode}`, {
//     get() {
//       return is(appCode)
//     }
//   })
// })

// export { ...appEnvConstants }
