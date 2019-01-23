export default class MIP5ikangCommon extends MIP.CustomElement {
  build() {
    let loadRelativeJs = function (el, url, callback) {

      let billboardJs = document.createElement('script')
      billboardJs.setAttribute('type', 'text/javascript')
      billboardJs.setAttribute('charset', 'UTF-8')
      billboardJs.setAttribute('src', url)
      el.appendChild(billboardJs)

      if (typeof callback === 'function') {
        billboardJs.onload = billboardJs.onerror = function () {
          callback();
        };
      }
    }

    let renderContent = function (el) {
      let config = MIP.getData('adConfig')
      let adStr = config.slice(0, config.length - 1);
      let adObj = {}
      adObj['ad_key'] = adStr;
      let func = document.createElement('script')
      func.innerHTML = `window.displayAd.renderAd(${JSON.stringify(adObj)})`
      el.appendChild(func)
    }

    let element = this.element;
    let attr = element.getAttribute('type');
    switch (attr) {
      case 'ad':
        loadRelativeJs(element, 'https://a-sp.5ikang.com/display_v2/content_load.js', function () {
          renderContent(element)
        });
        break;
      case 'stat':
        loadRelativeJs(element, 'https://a-sp.5ikang.com/display_v2/stat.js');
        break;

      case 'pv':
        loadRelativeJs(element, 'https://a-sp.5ikang.com/display_v2/p.js');
        break;
    }
  }
}
