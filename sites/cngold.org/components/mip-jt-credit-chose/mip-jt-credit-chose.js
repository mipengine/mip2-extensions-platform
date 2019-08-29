export default class MIPJtCreditChose extends MIP.CustomElement {
  build () {
    let tabClass = this.element.getAttribute('tab-class')
    // 给定父元素，移除所有子元素的对应类名
    function removeCla (par, cla) {
      let childs = par.children
      for (let i = 0; i < childs.length; i++) {
        childs[i].classList.remove(cla)
      }
    }
    // 切换类名
    function changeCla (par) {
      par.addEventListener('click', function (e) {
        let target = e.target || e.srcElement
        if (target.nodeName.toLowerCase() === 'label') {
          removeCla(par, 'on')
          target.parentNode.classList.add('on')
        } else if (target.nodeName.toLowerCase() === 'dd') {
          removeCla(par, 'on')
          target.classList.add('on')
        }
      })
    }
    let dlEles = document.getElementsByClassName(tabClass)
    // 切换类名
    for (let i = 0; i < dlEles.length; i++) {
      changeCla(dlEles[i])
    }
  }
}
