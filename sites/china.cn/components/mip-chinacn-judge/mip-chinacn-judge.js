export default class MIPChinacnJudge extends MIP.CustomElement {
  connectedCallback () {
    let type = this.element.getAttribute('type')
    let domain = this.element.getAttribute('domain')
    let token = this.element.getAttribute('token')
    let child = this.element.querySelector('script[type="application/json"]')
    if (child && child.textContent) {
      try {
        let config = MIP.util.jsonParse(child.textContent.toString())
        Object.keys(config).forEach(key => {
          if (document.domain.match(key)) {
            token = config[key]
          }
        })
      } catch (e) {}
    }
    let node = document.createElement('mip-ad')
    node.setAttribute('type', type)
    node.setAttribute('domain', domain)
    node.setAttribute('token', token)
    let wrapper = document.createElement('div')
    wrapper.setAttribute('id', token)
    node.appendChild(wrapper)
    this.element.appendChild(node)
  }
}
