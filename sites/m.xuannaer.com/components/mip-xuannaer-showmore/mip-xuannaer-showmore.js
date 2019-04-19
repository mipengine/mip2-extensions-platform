import './index.less'

export default class MIPXuannaerShowmore extends MIP.CustomElement {
  build () {
    let box = this.element.querySelector('.open-box')
    let button = this.element.querySelector('.base-info-more')
    let addClassName = this.element.getAttribute('add-class') || 'show-more'
    let addClassButtonName = this.element.getAttribute('add-class-button') || 'last-inco'
    button.addEventListener('click', () => {
      if (box.classList.contains(addClassName)) {
        box.classList.remove(addClassName)
        button.classList.remove(addClassButtonName)
        button.querySelector('span').innerHTML = '展开更多信息'
      } else {
        box.classList.add(addClassName)
        button.classList.add(addClassButtonName)
        button.querySelector('span').innerHTML = '收起'
      }
    })
  }
}
