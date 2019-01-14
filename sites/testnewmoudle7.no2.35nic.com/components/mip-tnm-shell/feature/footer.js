/**
 * @file: moblie footer menu
 * @author: 1450052652@qq.com
 */
/**
 * 函数描述setCustomFooter
 *
 * @param {string} footermenuUrl 首页链接
 * @param {string} nmlinkUrl 各个页面链接
 *
 */
export default class Footer {
  constructor (rootEl) {
    this.footer = document.querySelector('.mip-shell-footer-wrapper')
  }
  // 首页链接 栏目链接
  setCustomFooter (footermenuUrl, nmlinkUrl) {
    fetch(footermenuUrl).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('bottommenu went wrong!')
      }
    }).then(bottommenu => {
      const self = this
      const arrbott = bottommenu.data.items
      arrbott.forEach(function (value, index, array) {
        const footerEle = self.footer.querySelector('.mip-shell-footer')
        const footermenuEle = document.createElement('a')
        footermenuEle.setAttribute('data-type', 'mip')
        footermenuEle.className = array[index].nmIndexVar + ' flex-subitem'
        const botticon = array[index].wapMenuIcon.split('|')
        footermenuEle.style.backgroundImage = 'url(' + botticon[0] + ')'
        const footerUrl = array[index].wapModuleVar
        footermenuEle.innerHTML = array[index].nmShowTopic
        footerEle.appendChild(footermenuEle)
        switch (footerUrl) {
          case 0:
            footermenuEle.href = nmlinkUrl[0] // 首页
            break
          case 1:
            footermenuEle.href = nmlinkUrl[1] // 单页图文
            break
          case 2:
            footermenuEle.href = nmlinkUrl[2] // 新闻
            break
          case 3:
            footermenuEle.href = nmlinkUrl[3] // 产品
            break
          case 4:
            footermenuEle.href = nmlinkUrl[4] // 下载
            break
          case 5:
            footermenuEle.href = nmlinkUrl[5] // 视频
            break
          case 6:
            footermenuEle.href = nmlinkUrl[6] // 留言
            break
          case 7:
            footermenuEle.href = nmlinkUrl[7] // 招聘
            break
          case 8:
            footermenuEle.href = nmlinkUrl[8] // 友情链接
            break
          case 9:
            footermenuEle.href = nmlinkUrl[9] // 搜索列表
            break
          case 10:
            footermenuEle.href = nmlinkUrl[10] // 自定义表单
            break
          case 99:
            footermenuEle.href = nmlinkUrl[11] // 其他情况
            break
          case 100:
            footermenuEle.href = nmlinkUrl[12] // 菜单
            self.footer.querySelector('.systemc_qmenu').setAttribute('on', 'tap:sidebar.open')
            break
          case 101:
            footermenuEle.href = nmlinkUrl[13] // 搜索
            break
          case 102:
            footermenuEle.href = nmlinkUrl[14] + array[index].nmPIndexVar // 电话
            break
          case 103:
            footermenuEle.href = nmlinkUrl[15] // 联系
            break
          case 104:
            footermenuEle.href = nmlinkUrl[16] + array[index].nmPIndexVar // 邮箱
            break
          case 105:
            footermenuEle.href = nmlinkUrl[17] + array[index].nmPIndexVar // 短信
            break
          default:
            footermenuEle.href = nmlinkUrl[11] // 其他情况
            break
        }
      })
    })
  }
}
