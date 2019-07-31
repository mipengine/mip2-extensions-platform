import './index.less'

export default class MIPVideoOver extends MIP.CustomElement {
  build () {
    let ele = this.element
    let popEle = ele.children[0]
    let src = ele.getAttribute('src')
    let poster = ele.getAttribute('poster')
    // 视频宽高比
    let wh = ele.getAttribute('wh')
    let video = document.createElement('video')

    // 创建视频
    function createVideo () {
      let _w = 16
      let _h = 9
      video.src = src
      video.poster = poster

      addVideoAttr('autoplay')
      addVideoAttr('width')
      addVideoAttr('controls')
      addVideoAttr('preload')
      addVideoAttr('muted')

      // 添加其它属性
      addAttrs()

      addSetAttr('playsinline')
      addSetAttr('x5-playsinline')
      addSetAttr('webkit-playsinline')
      addSetAttr('t7-video-player-type')

      if (wh) {
        _w = wh.split('wh')[0]
        _h = wh.split('wh')[1]
      }

      let w = ele.offsetWidth || window.innerWidth

      let height = w / _w * _h + 'px'
      video.style.height = height
      ele.style.height = height

      ele.appendChild(video)
    }

    function addVideoAttr (a) {
      let v = ele.getAttribute(a)
      if (v) video[a] = v
    }

    function addSetAttr (a) {
      let v = ele.getAttribute(a)
      if (v) video.setAttribute(a, v)
    }

    function addAttrs () {
      let v = ele.getAttribute('data-attrs')
      if (v) {
        v.split('||').forEach(e => {
          let c = e.split('=')
          if (c[0] && c[1]) {
            video.setAttribute(c[0], c[1])
          }
        })
      }
    }

    // 初始视频
    createVideo()

    // 当播放开始的时候设置为自动播放
    video.onplay = function () {
      if (popEle) {
        popEle.style.display = 'none'
        video.style.display = 'block'
      }
    }

    // 视频播放完成
    video.onended = function () {
      if (popEle) {
        popEle.style.display = 'block'
        video.style.display = 'none'
        ele.querySelectorAll('a[data-href]').forEach(e => {
          let h = e.getAttribute('data-href')
          if (h) {
            e.href = h
            e.removeAttribute('data-href')
          }
        })
      }
    }

    // 重新播放
    this.addEventAction('play', (event, str) => {
      video.play()
    })
    // 关闭弹窗
    this.addEventAction('close', (event, str) => {
      popEle.style.display = 'none'
      video.style.display = 'block'
    })
  }
}
