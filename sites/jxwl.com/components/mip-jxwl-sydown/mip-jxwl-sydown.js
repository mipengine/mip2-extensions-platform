
const { util } = MIP
const { platform } = util

export default class MIPJxwlSyDown extends MIP.CustomElement {
  build () {
    let el = this.element
    let downurl = el.getAttribute('downurl')
    let size = el.getAttribute('size')
    let iosdownurl = el.getAttribute('iosdownurl')
    let iossize = el.getAttribute('iossize')
    let dom = ''
    if(platform.isIOS()){ 
	    if(iosdownurl===''){
			dom='<span class="yuyue">苹果预约</span>'
		}else{
			dom='<a href="'+iosdownurl+'" class="btn">苹果下载（'+iossize+'）</a>'
		}
    }else{
	    if(downurl===''){
			dom='<span class="yuyue">安卓预约</span>'
		}else{
			dom='<a href="'+downurl+'" class="btn">安卓下载（'+size+'）</a>'
		}
    }
    let container = document.createElement('div')
    container.classList.add("download")
	container.innerHTML=dom
	el.appendChild(container)
  }
}
