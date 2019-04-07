export default class MIPMuzhiScriptadd extends MIP.CustomElement {
  build () {
    let src = this.element.getAttribute('src')
    let script = document.createElement('script')
    if (typeof src === 'string') {
      script.src = src
      this.element.appendChild(script)
    }
  }
}
