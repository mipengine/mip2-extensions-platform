import { set, get } from './cache'
import uuid from './uuid'

const QC006 = 'QC006'

const expire = 90 * 24 * 60 * 60 * 1000

export const getAnonymousUid = () => {
  let anonymousUid = get(QC006)
  if (!anonymousUid) {
    anonymousUid = uuid()
    set(QC006, anonymousUid, expire)
  }
  return anonymousUid
}
