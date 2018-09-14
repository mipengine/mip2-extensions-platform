/**
 * 浏览器侦测类
 */
const userAgent = navigator.userAgent.toLocaleLowerCase()

function isIOS () {
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return true
  }
}
function isAndroid () {
  if (/android/.test(userAgent)) {
    return true
  }
}
export default{
  isIOS,
  isAndroid
}
