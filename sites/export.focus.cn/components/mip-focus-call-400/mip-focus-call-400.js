import './index.less'

export default class MIPFocusCall400 extends MIP.CustomElement {
  build () {
    let cityId = this.element.getAttribute('city-id')
    let pid = this.element.getAttribute('pid')
    let phone = this.element.getAttribute('phone')
    let host = this.element.getAttribute('host-number')
    let extension = this.element.getAttribute('extension-number')
    let url = this.element.getAttribute('fetch-url')

    let wrap = document.createElement('div')
    wrap.classList.add('lightbox-wrap')
    wrap.innerHTML = `
    <mip-lightbox
      id="lightbox-call-${pid}"
      layout="nodisplay"
      class="mip-hidden">
      <div class="lightbox">
        <div class="tips">
          <p class="tip-text">电话拨通后，请您手动拨打分机号</p>
          <p class="extension">${extension}</p>
          <div class="btns">
            <span class="cancel" on="tap:lightbox-call-${pid}.close" class="lightbox-close">取消拨打</span>
            <a class="comfirm" href="tel:${host}">立即拨打</a>
          </div>
        </div>
      </div>
    </mip-lightbox>
    `
    this.element.appendChild(wrap)

    let android = true
    if (window.navigator.userAgent.toLowerCase().indexOf('android') === -1) {
      android = false
    }

    this.addEventAction('call', (event, str) => {
      fetch(`${url}?pid=${pid}&number=${phone}&cityId=${cityId}`, {
        method: 'GET',
        credentials: "include"
      }).then(res => {
        return res.json()
      }).then(data => {
        if (data.data && data.code === 200) {
          window.location.href = `tel:${data.data}`;
        } else {
          return Promise.reject(data)
        }
      }).catch(err => {
        if (android) {
          let target = event.target || event.srcElement;
          // 通过类名来判断事件发生的元素是否包含在lightbox中
          // 所以插槽中用来触发点击事件的元素必须设置一个类名
          if (target && target.className) {
            let ele = this.element.querySelector(`.lightbox-wrap .${target.className}`)
            if (!ele) {
              MIP.viewer.eventAction.execute('androidfail', this.element, event)
            }
          }
        } else {
          window.location.href = `tel:${host},${extension}`;
        }
      })
    })
  }
}