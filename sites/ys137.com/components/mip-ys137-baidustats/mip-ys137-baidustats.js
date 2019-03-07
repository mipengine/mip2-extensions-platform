import './index.less'

export default class MIPYs137Box extends MIP.CustomElement {
  connectedCallback () {
    let referrer = MIP.sandbox.window.document.referrer
    let referrerCheck = this.element.getAttribute('referrer')
    if (this.refIsexisted(referrer, referrerCheck) === true) {
    if (referrerCheck) {
      let checkArr = new Array()
      let trueValue = true
      if (referrerCheck.substr(0,1) === '!') {
        trueValue = false
        referrerCheck = referrerCheck.substring(1)
      }
      if (referrerCheck.indexOf('|') !== -1) {
        checkArr = referrerCheck.split('|')
      } else {
        checkArr.push(referrerCheck)
      }
      
      for (let i=0; i<checkArr.length; i++) {
        if (referrer.indexOf(checkArr[i]) !== -1) {
          return trueValue
        }
      }
      return !trueValue
    } else {
      return true
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
