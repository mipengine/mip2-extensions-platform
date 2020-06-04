import './index.less'
export default class MIPTest extends MIP.CustomElement {
  build () {
    let name = this.element.getAttribute('name')
    let content = document.createElement('p')
    content.innerText = 'Hello ' + name
    this.element.appendChild(content)
    content.onclick=function(){
      console.log(12222);
      content.innerText = 11221;
    }
    // 在这里注册 say 事件的监听
    this.addEventAction('say', (event, str) => {
      this.element.innerText = str;
    })
  }
}
