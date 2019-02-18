export default class MIPAddScript extends MIP.CustomElement {
  build () {
  	let head = document.getElementsByTagName('head')[0]
    let script = document.createElement('script')
    script.src = this.element.getAttribute('base-url')
    head.appendChild(script)
  }
}
