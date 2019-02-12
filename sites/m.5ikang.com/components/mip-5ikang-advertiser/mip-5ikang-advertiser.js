const {setData, getData} = MIP

export default class MIP5ikangAdvertiser extends MIP.CustomElement {
  build () {
    let element = this.element
    let config = element.getAttribute('config')
    let div = document.createElement('div')
    div.setAttribute('class', `${config}_div`)
    element.appendChild(div)
    let adConfig = getData('adConfig')
    if (!adConfig) {
      adConfig = ''
    }
    adConfig += config + '|'
    setData({
      adConfig: adConfig
    })
  }
}
