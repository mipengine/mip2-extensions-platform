export default class MIPJxwlClickTj extends MIP.CustomElement {
  build () {
    let req = new Request("https://www.youxigt.com/ajax/hits/type/click", {
      'mode':'no-cors'
    })
    fetch(req).then(function() {})
    let az = document.getElementById('android')
    let ios = document.getElementById('ios')
    az.addEventListener('click', e => {
      let aurl = az.getAttribute('href')
      fetch("https://www.youxigt.com/ajax/hits/type/down?url="+aurl).then(function() {})
    })
    ios.addEventListener('click', e => {
      let iurl = ios.getAttribute('href')
      fetch("https://www.youxigt.com/ajax/hits/type/down?url="+iurl).then(function() {})
    })
  }
}
