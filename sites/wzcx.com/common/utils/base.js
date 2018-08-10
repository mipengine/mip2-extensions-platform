const outAldhttp = 'https://yjmtpt.xx-motor.com/xmdcwbaidu.com/example/'

function setContainerH (dom) {
  const agent = window.navigator.userAgent
  let containerH = window.innerHeight || document.documentElement.clientHeight
  containerH -= 44
  if (/iphone/ig.test(agent) && /Baidu/ig.test(agent)) {
    containerH -= 56
  }
  document.querySelector(dom).style.height = containerH + 'px'
}
function resetRem () {
  let b = document
  let a = {}
  a.Html = b.getElementsByTagName('html')[0]
  let htmls = b.getElementsByTagName('html')

  a.widthProportion = function () {
    console.log('宽度:' + b.body.clientWidth)
    return (b.body.clientWidth || a.Html.offsetWidth) / 375
  }
  a.changePage = function () {
    let length = htmls.length
    let remValue = a.widthProportion() * 20
    if (remValue !== null && !MIP.viewer.page.isRootPage) {
      for (let i = 0; i < length; i++) {
        htmls[i].setAttribute('style', 'font-size:' + remValue + 'px!important;height:100% !important')
      }
    } else {
      for (let j = 0; j < length; j++) {
        htmls[j].setAttribute('style', 'font-size:' + remValue + 'px!important;height:100% !important')
      }
    }
  }
  a.changePage()
  window.addEventListener('resize', a.changePage)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      a.changePage()
    }
  })
  window.addEventListener('DOMContentLoaded', a.changePage)
}
export default {
  resetRem: resetRem,
  setContainerH: setContainerH,
  outAldhttp: outAldhttp
}
