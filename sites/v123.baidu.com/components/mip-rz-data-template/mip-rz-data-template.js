/**
 * @file mip-rz-data-template 组件
 * @description 迁移至 mip2
 * @author
 */
import ClipboardJS from 'clipboard'

const {
  util,
  viewer,
  templates,
  CustomElement
} = MIP

function getQuery () {
  let query = location.search.slice(1) || ''
  if (!query) {
    return {}
  }
  return query.split('&').reduce(function (obj, item) {
    let data = item.split('=')
    obj[data[0]] = decodeURIComponent(data[1])
    return obj
  }, {})
}

function copyfun (element) {
  let diyclipboard = new ClipboardJS('.wechatcopybtn')
  diyclipboard.on('success', function (e) {
    let toastdiv = element.getElementsByClassName('diy-toast')[0]
    toastdiv.innerHTML = '已复制，请打开微信搜索公众号'
    toastdiv.classList.add('diy-toast-show')
    setTimeout(function () {
      toastdiv.classList.remove('diy-toast-show')
    }, 1500)
  })
  diyclipboard.on('error', function (e) {
    // console.log(e)
  })
}

function handTime (time) {
  if (time.indexOf('-') !== -1) {
    let arr = time.split('-')
    return arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
  } else {
    return time
  }
}

function talkfull (element, arr, order, num) {
  if (arr) {
    let tempw = window.innerWidth || document.documentElement.clientWidth
    let tempw2 = tempw * 0.88
    let temparr = []
    for (let index = 0; index < arr.length; index++) {
      let tempobj = {
        w: tempw2,
        h: tempw2 * 0.75
      }
      if (num === 1) {
        tempobj.src = arr[index].pic
        tempobj.title = arr[index].desp
      } else if (num === 2) {
        tempobj.src = arr[index].orgPic
        tempobj.title = arr[index].honorName
      }
      temparr.push(tempobj)
    }
    viewer.eventAction.execute('usefull', element, {
      order: order,
      items: temparr
    })
  }
}

function levelfull (element, data, item) {
  item.querySelector('mip-img').addEventListener('click', function () {
    let order = Number(item.dataset['order'])
    if (item.classList.contains('liveshot-img')) {
      // 实拍照片
      talkfull(element, data.compPhotos, order, 1)
    } else if (item.classList.contains('qualhonor-img')) {
      // 资质荣誉
      talkfull(element, data.honorCertificate, order, 2)
    }
  }, false)
}

function realfull (element, data) {
  let imgitem = element.querySelectorAll('.img-item')
  setTimeout(function () {
    if (imgitem) {
      for (let index = 0; index < imgitem.length; index++) {
        levelfull(element, data, imgitem[index])
      }
    }
  })
}

export default class MIPRzDataTemplate extends CustomElement {
  /**
   * 第一次进入可视区回调，只会执行一次
   */
  firstInviewCallback () {
    let element = this.element
    // 获取当前页面的所有query
    let query = getQuery()
    fetch('https://v123.baidu.com/xzhpageajax', {
      method: 'POST',
      body: 'camId=' + query.id,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (res) {
      // 转json
      return res.json()
    }, function () {
      // 向外界组件暴露加载失败事件
    }).then(function (res) {
      if (!res.code) {
        // 加载成功
        // 渲染模板
        // 判断 ios darkMode
        let isDarkMode = /theme\/dark/i.test(decodeURIComponent(navigator.userAgent.toLowerCase()))
        if (isDarkMode) {
          document.body.classList.add('dark-mode')
        }

        if (res.data.regCapital) {
          res.data.regCapital = res.data.regCapital.split('.')[0]
        }
        if (res.data.authTime) {
          res.data.authTime = handTime(res.data.authTime)
        }
        if (res.data.regTime) {
          res.data.regTime = handTime(res.data.regTime)
        }
        if (res.data.effTime) {
          res.data.effTime = handTime(res.data.effTime)
        }
        let replacedata = JSON.stringify(res.data).replace(/http:\/\/trustcdn.baidu.com/g, 'https://ss0.bdstatic.com/6KYTfyqn1Ah3otqbppnN2DJv')
          .replace(/http:\/\/himg.bdimg.com/g, '//himg.bdimg.com')
          .replace(/http:\/\/kbbos.baidu.com/g, '//kbbos.baidu.com')
          .replace(/http:\/\/trustrcv.baidu.com/g, 'https://sp1.baidu.com/6KYTfyq72xB3otqbppnN2DJv')
          .replace(/http:\/\/qyyqbos.baidu.com/g, '//qyyqbos.baidu.com')
        let tempdata = JSON.parse(replacedata)
        templates.render(element, tempdata).then(function (html) {
          element.innerHTML = html
          let pageTitle
          if (tempdata.brandBackground) {
            pageTitle = element.querySelectorAll('.top-title')[0]
            util.css(pageTitle, 'backgroundImage', 'url(' + tempdata.brandBackground + ')')
          } else if (Number(tempdata.idType) === 5 && tempdata.brandLogo) {
            pageTitle = element.querySelectorAll('.top-bg')[0]
            util.css(pageTitle, 'backgroundImage', 'url(' + tempdata.brandLogo + ')')
          }
          copyfun(element)
          realfull(element, tempdata)
        })
      }
    })
  }
}
