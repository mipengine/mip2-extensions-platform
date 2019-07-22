/**
 * @file mip-contentfilter-miaoshou-v2 组件
 * @author
 */
const { CustomElement } = MIP

export default class MIPStatsMiaoshouV2 extends CustomElement {
  build () {
    let e = this.element

    let selectName = e.getAttribute('selectName') ? e.getAttribute('selectName') : '.introduce_box'
    let contentContainer = e.querySelector(selectName)

    let p = contentContainer.querySelectorAll('p')
    let length = p.length

    for (let i = 0; i < length; i++) {
      if (p[i].innerHTML === '' || p[i].innerHTML === '<br/>' || p[i].innerHTML === '<br>') {
        p[i].parentNode.removeChild(p[i])
      }
    }
  }
}
