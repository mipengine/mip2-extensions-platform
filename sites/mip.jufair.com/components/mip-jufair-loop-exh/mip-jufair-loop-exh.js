import './index.less'

export default class MIPJufairLoopExh extends MIP.CustomElement {
  build () {
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    wrapper.innerHTML = `
      <h1>MIP 2.0 component example</h1>
      <h3>This is my first custom component !</h3>
    `
    this.element.appendChild(wrapper)
  }
}
