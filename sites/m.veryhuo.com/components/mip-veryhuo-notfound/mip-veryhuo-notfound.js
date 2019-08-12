const { CustomElement, util } = MIP;

export default class MIPMhotComment extends CustomElement {
  build () {
    let goHome = this.element.querySelectorAll('.go-home')[0]
    goHome.onclick = function () {
      location.href = './index.html'
    }
  }
}
