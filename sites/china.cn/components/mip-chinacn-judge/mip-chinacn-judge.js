export default class MIPChinacnJudge extends MIP.CustomElement {
  connectedCallback () {
    let child = this.element.querySelector('script[type="application/json"]')
    if (child && child.textContent) {
      try {
        let config = MIP.util.jsonParse(child.textContent.toString())
        Object.keys(config).forEach(key => {
          if (document.domain.match(key)) {
            let token = config[key]
            let elem = this.element.querySelector('mip-ad')
            let wrapper = elem.querySelector('div')
            elem.setAttribute('token', token)
            wrapper.setAttribute('id', token)
          }
        })
      } catch (e) {}
    }
  }
}
