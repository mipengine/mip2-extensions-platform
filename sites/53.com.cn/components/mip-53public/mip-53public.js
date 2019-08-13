import './index.less'
export default class MIP53public extends MIP.CustomElement {
  build () {
    // let hrefs = 'https://mip.53.com.cn?hmsr=baidu&hmpl=&hmcu=&hmkw=&hmci='
    let hrefs = window.location.href
    let IsTuiguang = this.getParamArgs(hrefs, 'hmsr')
    localStorage.setItem('IsTuiguang', IsTuiguang)
  }
  // 获取链接中包含的hmsr参数
  getParamArgs (parms, parmName) {
    let argIndex = parms.indexOf('?')
    let arg = parms.substring(argIndex + 1)
    let valArg = ''
    let args = arg.split('&')
    for (let i = 0; i < args.length; i++) {
      let str = args[i]
      let arg = str.split('=')
      if (arg.length <= 1) continue
      if (parmName === arg[0]) {
        valArg = arg[1]
      }
    }
    return valArg
  }
}
