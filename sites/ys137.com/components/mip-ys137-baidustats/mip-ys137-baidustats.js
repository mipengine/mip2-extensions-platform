import './index.less'

export default class MIPYs137Box extends MIP.CustomElement {
  connectedCallback () {
    let referrer = MIP.sandbox.window.document.referrer
    let referrerCheck = this.element.getAttribute('referrer')
    if (referrerCheck) {
      if (referrer.indexOf(referrerCheck) !== -1) {
        this.createBaidustats()
      }
    } else {
      this.createBaidustats()
    }
  }
  createBaidustats () {
    let token = this.element.getAttribute('token')
    if (token) {
      let ele = document.createElement('mip-stats-baidu')
      ele.setAttribute('token', token)
      this.element.appendChild(ele)
    }
  }
}
