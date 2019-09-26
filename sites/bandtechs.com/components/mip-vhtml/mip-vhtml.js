import './index.less'

export default class MIPVhtml extends MIP.CustomElement {
  build () {
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    let index = this.element.getAttribute('name')
    let List = this.element.getAttribute('list')
    List = JSON.parse(List)
    wrapper.innerHTML = `
      <div class="textS">` + List[index].content + `</div>
    `
    this.element.appendChild(wrapper)
  }
}
