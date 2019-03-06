import './index.less'

export default class MIPYs137Box extends MIP.CustomElement {
  connectedCallback () {
    var referrer = MIP.sandbox.window.document.referrer;
    var referrer_check = this.element.getAttribute('referrer')
    if (referrer_check) {
      if (referrer.indexOf(referrer_check) != -1) {
        this.createBaidustats()
      }
    } else {
      this.createBaidustats()
    }
  }
  createBaidustats () {
    var token = this.element.getAttribute('token')
    if (token) {
      var ele = document.createElement('mip-stats-baidu')
      ele.setAttribute('token',token);
      this.element.appendChild(ele)
    }
  }
}
