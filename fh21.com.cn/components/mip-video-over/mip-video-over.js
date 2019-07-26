import './index.less'

export default class MIPVideoOver extends MIP.CustomElement {
  	build () {
        let ele = this.element;
        let popEle = ele.children[0];
        let src = ele.getAttribute('src');
        let poster = ele.getAttribute('poster');
        let autoplay = ele.getAttribute('autoplay') || true;
        let width = ele.getAttribute('width');
        let controls = ele.getAttribute('controls') || true;
        let preload = ele.getAttribute('preload');
        // 视频宽高比
        let wh = ele.getAttribute('wh');
        let video = document.createElement('video');

        // 创建视频
        function createVideo(){
        	let _w = 16;
        	let _h = 9;
        	video.src = src;
        	video.poster = poster;

        	addVideoAttr(autoplay, 'autoplay');
        	addVideoAttr(width, 'width');
        	addVideoAttr(controls, 'controls');
        	addVideoAttr(preload, 'preload');

        	if(wh){
        		_w = wh.split('wh')[0];
        		_h = wh.split('wh')[1];
        	}

        	let w = ele.offsetWidth || window.innerWidth;

        	let height = w / _w * _h + 'px';
        	video.style.height = height;

        	ele.appendChild(video)
        }

        function addVideoAttr(v, a){
        	if(v) video[a] = v;
        }

        // 初始视频
        createVideo();

        //  当播放开始的时候设置为自动播放
        video.onplay = function () {
            popEle.style.display = 'none';
        	addVideoAttr(controls, 'controls');
        };

        // 视频播放完成
        video.onended = function () {
            popEle.style.display = 'block';
            video.controls = false;
        };

	    // 重新播放
	    this.addEventAction('play', (event, str) => {
	      video.play();
	    })
        // 关闭弹窗
	    this.addEventAction('close', (event, str) => {
	      popEle.style.display = 'none';
	      video.controls = true;
	    })
    
  	}
}
