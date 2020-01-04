import './index.less'
export default class MIPTest extends MIP.CustomElement {
  build () {
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    wrapper.innerHTML = `<h3>上传测试</h3>`
    this.element.appendChild(wrapper);
    wrapper.onclick=function(){
      console.log(12222);
    }
    // 在这里注册 say 事件的监听
    this.addEventAction('say', (event, str) => {
      this.element.innerText = str;
    })
  }
}
