<script>
import Swiper from '../../common/swiper.js'
export default {
  mounted () {
    function $ (string) {
      return (document.querySelectorAll(string))[0]
    }
    // 显示更多
    const w = MIP.viewport.getWidth() > 640 ? 640 : MIP.viewport.getWidth()
    const _rem = w / 10
    const A = $('.outer')
    const B = $('.other_cont')
    const a = B.offsetHeight
    const teles = $('.teles')
    if (a < 2.4 * _rem) {
      teles.setAttribute('style', 'display:none')
    }
    teles.addEventListener('click', function () {
      animate(A, {height: a}, 10, function () {
        A.setAttribute('style', 'height:auto')
      })
      slideUp(teles, 10)
    })
    function slideUp (element, time) {
      // 获取元素总高度
      const totalHeight = element.offsetHeight
      // 定义一个变量保存元素当前高度
      let currentHeight = totalHeight
      // 计算每次减去的值
      const decrement = totalHeight / (time / 10)
      // 开始循环定时器
      const timer = setInterval(function () {
        // 减去当前高度的一部分
        currentHeight = currentHeight - decrement
        // 把当前高度赋值给height属性
        element.style.height = currentHeight + 'px'
        // 如果当前高度小于等于0，就关闭定时器
        if (currentHeight <= 0) {
          // 关闭定时器
          clearInterval(timer)
          // 把元素display设置为none
          element.style.display = 'none'
          // 把元素高度值还原
          element.style.height = totalHeight + 'px'
        }
      }, 10)
    }
    function animate (dom, o, time, fn) {
      if (time === undefined) {
        time = 10
      }
      clearInterval(dom.termId)
      dom.termId = setInterval(function () {
        dom.isOver = true
        for (let property in o) {
          let currentValue = parseInt(getStylePropertyValue(dom, property))
          if (property === 'opacity') {
            currentValue = parseInt(getStylePropertyValue(dom, property) * 100)
          }
          let speed = (o[property] - currentValue) / 10
          speed = currentValue > o[property] ? Math.floor(speed) : Math.ceil(speed)
          currentValue += speed
          if (currentValue !== o[property]) {
            dom.isOver = false
          }
          if (property === 'opacity') {
            dom.style.opacity = currentValue / 100
            dom.style.filter = 'alpha(opacity= ' + currentValue + ')'
          } else {
            dom.style[property] = currentValue + 'px'
          }
        }
        if (dom.isOver) {
          clearInterval(dom.termId)
          if (fn) {
            fn()
          }
        }
      }, time)
    }
    function getStylePropertyValue (dom, property) {
      if (window.getComputedStyle) {
        return getComputedStyle(dom, null)[property]
      } else {
        return dom.currentStyle[property]
      }
    }
    const monthtabString = 'swiper_month_tab'
    const myswiper = new Swiper('#' + monthtabString, {
      slidesPerView: 5.6
    })
    // 月份点击事件
    const monthObj = document.getElementById('month')
    const monthtabObj = document.getElementById(monthtabString)
    const M = monthObj.querySelectorAll('.month_cont')
    const Li = monthtabObj.querySelectorAll('li')
    if (Li.length <= 0) { return false }
    for (let i = 0; i < Li.length; i++) {
      Li[i].addEventListener('click', function () {
        let month = i + 1
        renderMonth(month)
        const _hash = hash.replace(/mon=(\d+)/, 'mon=' + month)
        window.history.pushState(null, null, _hash)
      })
    }
    // 更改月份显示
    function renderMonth (month) {
      if (!month) { month = 1 }
      for (let i = 0; i < Li.length; i++) {
        M[i].classList.add('none')
        Li[i].classList.remove('cur')
      }
      Li[month - 1].classList.add('cur')
      M[month - 1].classList.remove('none')
      myswiper.slideTo(month - 1, 0)
    }
    // 初始化月份显示
    let hash = window.location.hash
    if (!hash) hash = '#mon=1'
    const url = window.location.href.split('#mon=')
    if (url[1]) {
      if (url[1].trim() >= 1 && url[1].trim() <= 12) {
        renderMonth(url[1].trim())
      }
    } else {
      renderMonth(1)
    }
  }
}
</script>
