/**
 * @file 点击播放获取视频播放地址组件
 * @author wangsha@mail.china.cn
 */
import './index.less'

export default class MIPChinacnGetvideourl extends MIP.CustomElement {
  firstInviewCallback () {
    let element = this.element
    let myVideo = element.querySelector('video')
    let request = false
    myVideo.addEventListener('play', function () {
      if (request === false) {
        myVideo.pause()
        let id = element.querySelector('#id').value
        fetch('https://www.china.cn/video_api.php?a=play&k=ebcc38b544f07554d0d9bd31522c2f1e&t=mip&id=' + id + '')
          .then(function (response) {
            return response.json()
          })
          .then(function (myJson) {
            request = true
            let videoUrl = myJson.data
            myVideo.setAttribute('src', videoUrl)
            myVideo.play()
          }).catch(function (e) {
            console.log(e)
          })
      }
    })
  }
}
