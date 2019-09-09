import './index.less'
let {util}=MIP
let {platform }=util
function shebei() {
  let ios=platform.isIOS()
  let android=platform.isAndroid()
  if(ios||android){
    return true
  }
  else{
    return false
  }
}
function topc (mipurl) {
  let wwwurl=mipurl.replace("mip","www")
  window.location.href=wwwurl
}
export default class MIPToPc extends MIP.CustomElement {
  build () {
    let element = this.element
    let mipurl = this.element.getAttribute('url')
    let isOk = shebei()
    if (!isOk) {
      let wwwurl=topc(mipurl)
      element.innerHTML =wwwurl
    }
  }
}
