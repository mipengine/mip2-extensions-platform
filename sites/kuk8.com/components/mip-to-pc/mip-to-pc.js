import './index.less'
//引用mip工具
let {util} = MIP;
let { platform } = util;
//检查是否是移动设备
function shebei() {
  // 识别是否是iOS 系统
  let ios=platform.isIOS();
  // 识别是否是android 系统
  let android=platform.isAndroid();
  //判断是设备是否移动设备
  if(ios||android){
    return true;
  }
  else{
    return false;
  }
}
//网址进行替换成PCurl
function topc(mipurl) {
  let wwwurl=mipurl.replace("mip","www");
  //return wwwurl;
  window.location.href=wwwurl;
}
export default class MIPToPc extends MIP.CustomElement {
  build () {
    let element = this.element;//获取当前页面
    let mipurl = this.element.getAttribute('url');//获取url
    let isOk = shebei(); // 检测设备
    //如果不是移动设备跳转到PCurl
    if (!isOk) {
      let wwwurl=topc(mipurl);
      element.innerHTML =wwwurl;
    }
  }
}
