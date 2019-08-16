/**
 * @file 用户行为收集
 * @author yeyongqin@mail.39.net
 */
import autoTrack from './auto-track'

export default class MIPChinacnGetvideourl extends MIP.CustomElement {
  build () {
    autoTrack.init()
  }
}
