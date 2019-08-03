export default class MIPJxwlShowDetail extends MIP.CustomElement {
  build () {
    let el = this.element
    let textbox = el.querySelector('.qlc')
    let showbox = el.querySelector('.qlist_intromore')
    let textcon = textbox.innerHTML
    let limit = el.getAttribute('limit')
    if (textcon.length>limit) {
      let cuttext = textcon.substr(0,limit)+' ... '
      textbox.innerHTML = cuttext
      showbox.innerHTML = '&nbsp;&nbsp;详情'
      showbox.addEventListener('click', function (e) {
        if ( this.classList.contains('zk') ) {
          textbox.innerHTML = cuttext
          this.classList.remove('zk')
          this.innerHTML = '&nbsp;&nbsp;详情'
        } else {
          textbox.innerHTML = textcon
          this.classList.add('zk')
          this.innerHTML = '&nbsp;&nbsp;收起'
        }
      });
    }
  }
}