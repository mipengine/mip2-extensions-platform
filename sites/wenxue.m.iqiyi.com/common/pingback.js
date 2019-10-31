import { isJSON, isObject } from './type'
import { getAnonymousUid } from './user'
import {
  currentURL,
  getCurrentUrlParamter,
  serializeParameters
} from './url'

const BASE_URL = '//msg.qy.net/v5/yd/pv'

let PARAMS = {
  p1: '2_20_201', // 产品平台, 1_10_101代表文学 pc 平台
  u: getAnonymousUid(), // 终端用户唯一标识，pc平台传 jsuid
  pu: '', // 登录用户的爱奇艺PassportId P00003
  rpage: '', // 本页标识
  purl: currentURL(), // 本页 URL
  aid: '', // 图书 ID
  rseat: '', // 点击位置标识
  block: '', // 区块标识
  t: '', // 统计类型, 页面、区块、点击位置的值依次为t=detailspg, t=blockpv, t=click
  vfrom: getCurrentUrlParamter('vfrom'),
  src3: 'h5_mip_20190106' // 来源
}

const LOG = {
  pv: MIP.util.log('🌐'),
  block: MIP.util.log('👁️‍🗨️'),
  click: MIP.util.log('👆')
}

const send = params => {
  new Image().src =
    BASE_URL +
    '?' +
    serializeParameters({
      ...PARAMS,
      ...params
    })
}

const formatBlock = (block = '') =>
  isJSON(block)
    ? JSON.parse(block)
    : isObject(block)
      ? block
      : { block }

const formatRseat = (rseat = '') =>
  isJSON(rseat)
    ? JSON.parse(rseat)
    : isObject(rseat)
      ? rseat
      : { rseat }

export const sendPV = rpage => {
  LOG.pv.log({ rpage })
  send({
    t: 'detailspg',
    rpage
  })
}

export const sendBlock = (params = '') => {
  const block = formatBlock(params)
  LOG.block.log(block)
  send({
    t: 'blockpv',
    ...block
  })
}

export const sendClick = (params = '') => {
  const rseat = formatRseat(params)
  LOG.click.log(rseat)
  send({
    t: 'click',
    ...rseat
  })
}

export const configPingback = params => {
  const shouldSend = params.rpage && params.rapge !== PARAMS.rpage
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const val = params[key]
      if (val) PARAMS[key] = val
    }
  }
  if (shouldSend) sendPV(PARAMS.rpage)
}
