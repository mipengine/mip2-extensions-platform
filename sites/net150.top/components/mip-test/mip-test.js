import './index.less'

export default class MIPTest extends MIP.CustomElement {
  build () {
    let url= this.element.getAttribute("url")
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    wrapper.innerHTML = `<h3>测试组件</h3>`
    //location.href=url
    
    this.element.appendChild(wrapper)
    


  }
}
