import './index.less'

export default class MIPYs137Copytext extends MIP.CustomElement {
  build () {
    const element = this.element
    let url = element.getAttribute('url')
    fetch(url).then(function (res) {
      return res.text()
    }).then(function (txt) {
      let e = txt.split(',')
      let t = document.createElement('input')
      t.type = 'text'
      t.readOnly = false
      t.className = 'tkl'
      t.style.position = 'absolute'
      t.style.left = '-9999px'
      t.style.top = '-9999px'
      let n = (Math.random() * e.length)
      t.value = e[n]
      null == document.querySelector('.tkl') && document.body.appendChild(t)
      document.querySelector('html').addEventListener('click',
        function () {
          var e = document.querySelector('.tkl')
          e.select()
          e.setSelectionRange(0, e.value.length)
          document.execCommand('copy')
        })
    });
  }
}
