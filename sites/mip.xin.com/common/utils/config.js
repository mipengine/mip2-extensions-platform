const ENV = window.location.href.indexOf('mip.xin.com') > -1 ? 'production' : 'dev'
let pustUrl = ''
pustUrl = window.location.href.indexOf('mip.xin.com') > -1 ? '//ab.xin.com/hitlog.gif' : '//ab.test.xin.com/hitlog.gif'
const HOST_CONFIG = {
  'dev': {
    domain: 'http://jira-15387.openapix.ceshi.xin.com',
    // domain: 'http://openapix.zyj.xin.com',
    h5Host: 'http://h5.ceshi.xin.com',
    mHost: 'http://m.ceshi.xin.com',
    pustUrl: pustUrl // 埋点提交地址
  },
  'production': {
    domain: 'https://openapix.xin.com',
    // domain: 'http://jira-15387.openapix.ceshi.xin.com',
    h5Host: 'https://h5.xin.com',
    mHost: 'https://m.xin.com',
    pustUrl: pustUrl // 埋点提交地址
  }
}

let config = {
  env: ENV,
  apiActionMap: {}
}

config = Object.assign(config, HOST_CONFIG[ENV])
// 导出
export default config
