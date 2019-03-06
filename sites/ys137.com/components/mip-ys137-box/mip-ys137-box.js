import './index.less'

export default class MIPYs137Box extends MIP.CustomElement {
  constructor (...args) {
    super(...args)
    // 获取并浅拷贝组件内容
    // 防止在后续流程中 layout="responsive" 往组件内部添加别的 dom
    //this.originalChildNodes = [...this.element.childNodes]
  }

  build () {
    console.log('build')

  }
  connectedCallback () {
    //this.myinit()
    console.log('connectedCallback')
    var referrer = MIP.sandbox.window.document.referrer;
    var referrer_check = this.element.getAttribute('referrer')
    var token = this.element.getAttribute('token')
    console.log(referrer.indexOf(referrer_check))
    if (referrer_check && referrer!='') {
      if(referrer.indexOf(referrer_check) != -1) {
        var baidu_tongji = document.createElement('mip-stats-baidu')
        baidu_tongji.setAttribute('token',token);
        this.element.appendChild(baidu_tongji)
      }
    }
  }

  myinit () {
    const element = this.element
    const action = element.getAttribute('action')
    switch (action) {
      case 'show':
        break
      case 'hide':
        element.style.display = 'none'
        break
      case 'remove':
        element.remove()
        break
      default:
        element.remove()
        break
    }
  }
}
