import './index.less'

export default class MIPLesoFullpage extends MIP.CustomElement {
  build () {
    // 设定尺寸
    let fullbody = MIP.viewport.getHeight()
    MIP.util.css(this.element, 'height', fullbody)
    let section = document.getElementsByClassName('fullpage')
    MIP.util.css(section, 'height', fullbody)
    let alp = document.querySelector('#allpage')
    MIP.util.css(alp, 'top', '0px')

    // 添加滚动条件
    let Gesture = MIP.util.Gesture
    let gesture = new Gesture(this.element)
    let nowsec = 1
    let allsec = alp.attributes.sec.value

    gesture.on('swipeup swipedown', function (event, data) {
      if (data.swipeDirection === 'up') {
        if (nowsec < allsec) {
          MIP.util.css(alp, 'top', '-' + fullbody * nowsec + 'px')
          nowsec++
        }
      }
      if (data.swipeDirection === "down") {
        if (nowsec > 1) {
          MIP.util.css(alp, 'top', '-' + fullbody * (nowsec - 2) + 'px')
          nowsec--
        }
      }
    })
  }
}
