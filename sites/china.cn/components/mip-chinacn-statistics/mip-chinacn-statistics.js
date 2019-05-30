export default class MIPChinacnStatistics extends MIP.CustomElement {
  build () {
    if (location.host !== 'mip.china.cn') {
      window.addEventListener('load', () => {
        setTimeout(() => {
          let timing = MIP.performance.getTiming()
          let data = {}
          // 页面地址
          data.url = encodeURIComponent(location.href)
          // 来源
          data.referrer = encodeURIComponent(document.referrer)
          // 使用MIPStart代替navigationStart
          let mst = timing.MIPStart
          // 白屏时间
          data.wpt = timing.MIPPageShow - mst
          // 首屏时间
          data.fpt = timing.MIPFirstScreen - mst
          // 页面时间
          data.plt = timing.loadEventEnd - mst
          // 页面类型
          let page = this.element.getAttribute('page')
          // 请求
          fetch('https://api.china.cn/dms/s.php', {
            method: 'POST',
            body: 'type=mip&page=' + page + '&str=' + JSON.stringify(data),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          })
        }, 500)
      })
    }
  }
}
