const { CustomElement, util } = MIP
const { platform } = util
export default class MIPCybDowninfo extends CustomElement {
  build () {
	let ele = this.element;
    let android = platform.isAndroid();
	let ios = platform.isIOS();
	let down = ele.querySelectorAll('#soft-download');
	let dandroid = ele.querySelectorAll('#down-android');
	let dofficial = ele.querySelectorAll('#down-official');
	let dappstore = ele.querySelectorAll('#down-appstore');
	let dnormal = ele.querySelectorAll('#down-normal');
	console.log(dappstore.length);
	ele.querySelectorAll('#soft-download').innerHTML = '<li id="noDownload" class="officials">此软件不提供苹果版下载</li>';
	if(ios) {
		if (dandroid.length) {
			down[0].removeChild(dandroid[0]);
		}
		if (dofficial.length) {
			down[0].removeChild(dofficial[0]);
		}
		if (dappstore.length == 0) {
			down[0].innerHTML = '<li id="noDownload" class="officials">此软件不提供苹果版下载</li>';
		}
	} else {
		if (dappstore.length) {
			down[0].removeChild(dappstore[0]);
		}
		if (dandroid.length == 0) {
			down[0].innerHTML = '<li id="noDownload" class="officials">此软件不提供安卓版下载</li>';
		}
		
	}
	if (dnormal.length) {
		down[0].removeChild(dnormal[0]);
		down[0].innerHTML = '<li id="noDownload" class="tips official">抱歉！此软件暂不提供手机版下载。</li>';
	}
	
   
  }
}