import config from './config.js'

export default class MIPChinacnStats extends MIP.CustomElement {
  build () {
    let tokens = this.element.getAttribute('token')

    tokens.split(' ').forEach(token => {
      let elem = document.createElement('mip-stats-baidu')
      elem.setAttribute('token', config[token])
      this.element.appendChild(elem)
    })
  }
}
