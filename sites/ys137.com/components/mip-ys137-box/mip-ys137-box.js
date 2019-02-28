import './index.less'

export default class MIPYs137Box extends MIP.CustomElement {
  init () {
    this.myinit()
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
