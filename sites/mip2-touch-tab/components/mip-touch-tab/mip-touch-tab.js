import './index.less'

export default class MIPTouchTab extends MIP.CustomElement {
  build() {
    let len = this.element.getAttribute('data-len')
    let nb = this.element.getAttribute('nb')
    let lang = this.element.getAttribute('lang')
    document.body.addEventListener('touchmove', (event) => {
      this.event = event ? event : window.event
      if (this.event.preventDefault) {
        this.event.preventDefault()
      } else {
        this.event.returnValue = false
      }
    }, {
      passive: false
    })
    this.startX = 0
    this.moveX = 0
    this.cliW = 0
    this.pages({
      wrap: 'touch-wrap', //.wrap的id
      wrap2: 'touch-wrap2', //.wrap2的id
      len: len, //一共有几页
      n: nb, //页面一打开默认在第几页？第一页就是0
      lang: lang //每次的滑动距离
    })
    this.element.querySelectorAll('.icons-node')[0].classList.add('icon-active')
  }
  //重新设置div宽度
  setwidth(box2) {
    let nodenum = box2.children.length
    box2.style.width = nodenum + '00%'
  }
  //获取当前div的宽度
  cliWith(box2) {
    this.cliW = box2.clientWidth
  }
  pages(obj) {
    let box = this.element.querySelector('#' + obj.wrap)
    let box2 = this.element.querySelector('#' + obj.wrap2)
    let len = obj.len
    let n = obj.n
    this.setwidth(box2)
    this.cliWith(box2)
    box.addEventListener("touchstart", (event) => {
      //touchStart
      if (!event.touches.length) {
        return
      }
      this.startX = event.touches[0].pageX
      this.moveX = 0
    }, false)
    box.addEventListener("touchmove", (event) => {
      //touchMove
      if (!event.touches.length) {
        return
      }
      this.moveX = event.touches[0].pageX - this.startX
      box2.style.transform = 'translateX(' + (-n * this.cliW * 0.5 + this.moveX) + 'px)' //根据手指的位置移动页面
    }, false)
    box.addEventListener("touchend", (event) => {
      //touchEnd
      //位移小于+-50的不翻页
      if (this.moveX < -50) n++
      if (this.moveX > 50) n--
      //最后&最前页控制
      if (n < 0) n = 0
      if (n > len - 1) n = len - 1
      //重定位
      box2.style.transform = 'translateX(' + (-n * 50) + '%)' //根据百分比位置移动页面
      this.element.querySelector('.icon-active').classList.remove('icon-active')
      this.element.querySelectorAll('.icons-node')[n].classList.add('icon-active')
    }, false)
  }
}
