let util = require('util')

Object.assign(util, {
  containReg (txt) {
    return new RegExp('(\\s*|^)' + txt + '(\\s*|$)', 'g')
  },
  // check if dom has certain class
  hasClass (ele, cls) {
    return ele && ele.className.match(this.containReg(cls))
  },
  // add certain class to dom
  addClass (ele, cls) {
    if (!ele || this.hasClass(ele, cls)) {
      return
    }
    ele.className = (ele.className + ' ' + cls).trim()
  },
  // remove certain class from dom
  removeClass (ele, cls) {
    if (!ele || !this.hasClass(ele, cls)) {
      return
    }
    ele.className = ele.className.replace(this.containReg(cls), ' ').trim()
  },
  // toggle certain class of dom
  toggleClass (ele, cls) {
    if (this.hasClass(ele, cls)) {
      this.removeClass(ele, cls)
    } else {
      this.addClass(ele, cls)
    }
  },
  query (objclass) {
    return document.querySelector(objclass)
  },
  removeEle (ele) {
    if (ele) {
      ele.remove()
    }
  }
})

export default util
