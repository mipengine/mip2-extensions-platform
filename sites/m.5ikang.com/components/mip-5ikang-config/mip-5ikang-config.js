import Visitor from '../../common/utils/visitorLog'
import pageLog from '../../common/utils/pageLog'

const { getData } = MIP

export default class MIP5ikangConfig extends MIP.CustomElement {
  build () {
    Visitor.setClientId() // 设置放着标识cookie
    let ks = getData('ks')
    let pid = getData('pid')
    pageLog.sendPv(ks, pid) // 发送网站统计
  }
}
