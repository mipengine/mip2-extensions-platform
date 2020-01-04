import './index.less'
export default class MIPTest extends MIP.CustomElement {
  build () {
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    wrapper.innerHTML = `<h3>上传测试</h3>`
    this.element.appendChild(wrapper);
    //this.element.children[0].innerHTML='jkjkjkj';
    //console.log(this.element.children[0].innerHTML)
    console.log(this.element.getAttribute('data-id'));
    this.element.classList.add('inkkj');
    console.log(this.element.childElementCount)
    console.log(this.element.children)
    // 在这里注册 say 事件的监听
    this.addEventAction('say', (event, str) => {
      this.element.innerText = str;
      aaaa();
      //uaredirect('http://localhost:8111/components/mip-test/example/index.html','http://localhost:8111/components/mip-test/example/index.html',2);
    })
  }
}
function aaaa(){
  console.log('测试函数');
}
function uaredirect(f,l,o) {
	try {
		if (document.getElementById("bdmark") != null) {
			return;
		}
			var c = window.location.hash;
			if (!c.match("fromapp")) {
				if (navigator.userAgent.match(/(iPhone|240x320|acer|tianyu|iPod|Android|ios|iPad|mobile|Mobi)/i) && o==1) {
          location.replace(f);
				}else if(o==2){
          location.replace(l);
        }
			}
	} catch(d) {}
}
