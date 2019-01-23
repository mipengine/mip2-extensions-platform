export default class MIP5ikangAd extends MIP.CustomElement {

  build() {
    let loadIkAd = function (elem) {
      let config = elem.getAttribute('config')
      let div = document.createElement('div');
      div.setAttribute('class', `${config}_div`)
      elem.appendChild(div)

      let adConfig = MIP.getData('adConfig');
      if (!adConfig) {
        adConfig = ''
      }
      adConfig += config + '|'
      MIP.setData({
        adConfig: adConfig
      });
    };

    let element = this.element;
    loadIkAd(element)
  }
}
