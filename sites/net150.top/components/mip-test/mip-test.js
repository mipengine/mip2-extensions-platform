import './index.less'

export default class MIPTest extends MIP.CustomElement {
  build () {
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    wrapper.innerHTML = `<h3>上传测试</h3>`
    this.element.appendChild(wrapper)
  }
}
