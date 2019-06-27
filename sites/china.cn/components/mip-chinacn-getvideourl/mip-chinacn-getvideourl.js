/**
 * @file 点击播放获取视频播放地址组件
 * @author wangsha@mail.china.cn
 */
import './index.less'
import md5 from './md5'

export default class MIPChinacnGetvideourl extends MIP.CustomElement {
  firstInviewCallback () {
    let element = this.element;
    let myVideo = element.querySelector('video');
    let request = false;
    myVideo.addEventListener('play', function () {
        if (request === true) {
            return;
        } else {
            myVideo.pause();
            let id = element.querySelector('#id').value;
            let k = md5('chinavideoplay');
            fetch('https://www.china.cn/video_api.php?a=play&k=' + k + '&t=mip&id=' + id + '')
                .then(function (response) {
                    return response.json();
                })
                .then(function (myJson) {
                    request = true;
                    let videoUrl = myJson.data;
                    myVideo.setAttribute('src', videoUrl);
                    myVideo.play();
                }).catch(function (e) {
                    console.log(e);
                });
        }
    });
  }
}
