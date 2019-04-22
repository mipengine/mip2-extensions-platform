import './index.less'
const {
  util
} = MIP
export default class MIPXuannaerShowmore extends MIP.CustomElement {
  build () {
    let box = this.element.querySelector('.open-box')
    let button = this.element.querySelector('.base-info-more')
    let addClassName = this.element.getAttribute('add-class') || 'show-more'
    let addClassButtonName = this.element.getAttribute('add-class-button') || 'last-inco'

    let docHeight = this.element.getAttribute('need-height')
    let type = this.element.getAttribute('data-type')
    let nowheight = util.css(box, 'height')
    if (type === 'rem') {
      let fontsize = util.css(document.querySelector('html'), 'fontSize')
      let remint = fontsize.replace('px', '')
      nowheight = nowheight.replace('px', '')
      docHeight = docHeight.replace('px', '') * remint
      if (nowheight > docHeight) {
        util.css(box, 'height', docHeight + 'px')
        box.classList.add(addClassName)
        util.css(button, 'display', 'block')
      }
    }
    button.addEventListener('click', () => {
      if (box.classList.contains(addClassName)) {
        box.classList.remove(addClassName)
        util.css(box, 'height', 'auto')
        button.classList.add(addClassButtonName)
        button.querySelector('span').innerHTML = '收起'
      } else {
        box.classList.add(addClassName)
        util.css(box, 'height', docHeight + 'px')
        button.classList.remove(addClassButtonName)
        button.querySelector('span').innerHTML = '展开更多信息'
      }
    })
  }
}
