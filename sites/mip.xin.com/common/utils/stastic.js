import config from './config'
import {
  serialize
} from './utils'
let util = MIP.util
let CustomStorage = util.customStorage
let storage = new CustomStorage(0)
// pid 映射表. 设置的不全
const PIDMAP = {
  '/pages/detail': 'u2_104', // 详情页面
  '/pages/report': 'u2_105', // 检测报告详情页
  '/pages/params': 'u2_106', // 参数配置页
  '/pages/bigimage': 'u2_107' // 大图页
}
// 埋点数据提交地址
const postUrl = config.pustUrl
// const postUrl = 'https://ab.xin.com/hitlog.gif';
let systemCid = ''
let lon = ''

let lat = '' // 经纬度
let networkType = '' // 网络环境
// let sc = '';// 屏幕宽度
// SetLocation()
// 获取guid
function getGid () {
  let key = 'system_cid'
  try {
    let value = storage.get(key)
    if (!value) {
      value = gid()
      storage.set(key, value)
      return value
    }
    return value || ''
  } catch (e) {
    return ''
  }

  function gid () {
    function S4 () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }
}

// 事件类型的值
const HandleTypeValueEnum = {
  VIEW: 'w', // 浏览
  CLICK: 'c', // 点击
  EXPOSURE: 'e' // 曝光
}
// 事件类型的key名称
const HandleTypeNameEnum = {
  EV: 'ev', // 浏览事件
  PL: 'pl' // 曝光
}

const getCityID = () => {
  let key = 'currentCity'
  try {
    // 城市信息为json字符串需要转化为对象
    let value = storage.get(key)
    if (value) {
      return JSON.parse(value).cityid || ''
    }
    return ''
  } catch (e) {
    return ''
  }
}

// const getUID = () => {
//   let key = 'userMobile'
//   try {
//     let value = storage.get(key)
//     if (value) {
//       return value.userid || ''
//     }
//     return ''
//   } catch (e) {
//     return ''
//   }
// }
// 获取optoken
const getToken = () => {
  let key = 'optoken'
  try {
    let value = storage.get(key)
    if (value) {
      return value || ''
    }
    return ''
  } catch (e) {
    return ''
  }
}
// 获取channel
const getChannel = () => {
  let key = 'channel'
  try {
    let value = storage.get(key)
    if (value) {
      return value || ''
    }
    return ''
  } catch (e) {
    return ''
  }
}
// 返回基础数据
const BaseParams = () => {
  if (!systemCid) {
    systemCid = getGid()
  }
  return {
    app_id: 'u2_0',
    app: '2.0',
    uid: '',
    cid: systemCid, // 设备标识
    xdid: systemCid, // 新设备标识
    cityid: getCityID(), // 城市id
    platform: 'applet', // 平台类型
    net: networkType,
    source: 'mip',
    channel: getChannel(),
    sc: storage.get('sc') || '',
    ts: (+new Date()) + '', // 时间戳
    abversion: '',
    optoken: getToken(),
    imei: '',
    mac: '',
    pageid: '',
    pid: '', // 映射表
    url: '', // 页面url
    ref: '',
    location: (lon + lat) === '' ? '' : (lon + ',' + lat), // 地址位置
    keywordid: '',
    creative: '',
    mediaid: ''
  }
}

// 埋点数据提交
const postPoint = (params = {}, completeFun, commonParam) => {
  let p1 = Object.assign(BaseParams(), params)
  commonParam = commonParam || {}
  let lastParam = Object.assign(p1, commonParam)
  if (lastParam.pid.indexOf('/pages/') > -1) {
    // pid取值
    lastParam.pid = PIDMAP[lastParam.pid.toLowerCase()] || ''
  }
  // 请求数据
  try {
    let requestUrl = postUrl + '?' + serialize(lastParam)
    fetch(requestUrl)
      .then(response => {
        return response.json()
      })
      .then(res => {
        if (res.error_code && res.error_code !== 200) {
          return
        }
        if (res.data && res.error_code === 200) {
          completeFun && completeFun()
        } else {
          completeFun && completeFun()
        }
      })
      .catch(err => {
        completeFun && completeFun(err)
      })
  } catch (e) {

  }
}

// 检测ev pl 是否为空 为空抛出异常
const checkEvPl = (key, msg) => {
  if (!key) {
    throw msg
  }
}

/** 生成ev/pl 的值
 *
 * @param  {[NAME]} key 名称 如 ev pl
 * @param  {[evpl]} evpl值
 * @param  {[values]} evpl对应的数据
 * @return {[object]} 返回为object
 */
const getEvPlValues = (NAME, evpl, values) => {
  let params = {}
  let index = 0
  for (let key in values) {
    if (index === 0) {
      evpl += '#'
    }
    evpl += `${key}=${values[key]}/`
    index += 1
  }
  // 存在value值时需要加入ev标识
  if (values) {
    params[NAME] = evpl.slice(-1) === '/' ? evpl.slice(0, evpl.length - 1) : evpl.slice(0)
  }
  return params
}

// 浏览埋点  ev是事件标识 和 values
const viewAndClickPoint = (TYPE, ev = '', values = {}, completeFun, commonParam) => {
  // checkEvPl(ev, 'ev不允许为空');
  ((params = getEvPlValues(HandleTypeNameEnum.EV, ev, values)) => {
    params['type'] = TYPE
    postPoint(params, completeFun, commonParam)
  })()
}

// 生成曝光埋点的ds字符串
const getExposureDsValus = (ds) => {
  if (ds.length === 0) {
    return ''
  }
  let dsStr = ''
  ds.forEach((item, index) => {
    dsStr += getDsItemStr(item) + ';'
  })
  return dsStr ? dsStr.slice(0, dsStr.length - 1) : dsStr
}
// 生成ds 内一项的字符串结果
const getDsItemStr = (item) => {
  let str = ''
  for (let key in item) {
    str += `${key}#${item[key]},`
  }
  return str.slice(0, str.length - 1)
}

// 浏览埋点  ev是事件标识 和 values
export const viewPoint = (ev = '', values = {}, commonParam) => {
  viewAndClickPoint(HandleTypeValueEnum.VIEW, ev, values, null, commonParam)
}
// 点击埋点
export const clickPoint = (ev = '', values = {}, completeFun, commonParam) => {
  viewAndClickPoint(HandleTypeValueEnum.CLICK, ev, values, completeFun, commonParam)
}

// 曝光埋点
// param: pl 曝光名称,values 埋点数据,ds 曝光数据, commonParam 公共参数
export const exposurePoint = (pl = '', values, ds, commonParam) => {
  checkEvPl(pl, 'pl不允许为空')
  getExposureDsValus(ds);
  ((params = getEvPlValues(HandleTypeNameEnum.PL, pl, values)) => {
    params['type'] = HandleTypeValueEnum.EXPOSURE
    params['ds'] = getExposureDsValus(ds)
    params = Object.assign(params, commonParam)
    postPoint(params, null)
  })()
}
