/**
 * @file: moblie left menu
 * @author: 1450052652@qq.com
 */
export default class Sidebar {
  constructor (rootEl) {
    this.sidebar = document.querySelector('.mip-shell-sidebar-wrapper')
  }

  setCustomSidebar (sidebarmenuUrl, nmlinkUrl, lanUrl) {
    // 左侧菜单
    fetch(sidebarmenuUrl).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('leftsidebar went wrong!')
      }
    }).then(leftmenu => {
      const arrleft = leftmenu.data.items
      const sidebarEle = this.sidebar.querySelector('.mip-shell-sidebar')
      const sidebarnavEle = document.createElement('nav')
      sidebarnavEle.setAttribute('id', 'menu')
      sidebarnavEle.className = 'quick-menu'
      sidebarEle.appendChild(sidebarnavEle)
      const sidebarulEle = document.createElement('ul')
      sidebarulEle.className = 'list'
      sidebarnavEle.appendChild(sidebarulEle)
      const sidebarmenuliEle = document.createElement('li')
      sidebarmenuliEle.className = 'divider'
      sidebarmenuliEle.innerHTML = '菜单'
      sidebarulEle.appendChild(sidebarmenuliEle)

      arrleft.forEach(function (value, index, array) {
        const sidebarliEle = document.createElement('li')
        sidebarulEle.appendChild(sidebarliEle)
        const sidebaritemEle = document.createElement('a')
        sidebaritemEle.className = array[index].nmIndexVar + ' left-side-item'
        sidebaritemEle.innerHTML = array[index].nmShowTopic
        const lefticon = array[index].wapMenuIcon.split('|')
        sidebaritemEle.style.backgroundImage = 'url(' + lefticon[0] + ')'
        sidebarliEle.appendChild(sidebaritemEle)
        const sidebarUrl = array[index].wapModuleVar
        switch (sidebarUrl) {
          case 0:
            sidebaritemEle.href = nmlinkUrl[0] // 首页
            break
          case 1:
            sidebaritemEle.href = nmlinkUrl[1] // 单页图文
            break
          case 2:
            sidebaritemEle.href = nmlinkUrl[2] // 新闻
            break
          case 3:
            sidebaritemEle.href = nmlinkUrl[3] // 产品
            break
          case 4:
            sidebaritemEle.href = nmlinkUrl[4] // 下载
            break
          case 5:
            sidebaritemEle.href = nmlinkUrl[5] // 视频
            break
          case 6:
            sidebaritemEle.href = nmlinkUrl[6] // 留言
            break
          case 7:
            sidebaritemEle.href = nmlinkUrl[7] // 招聘
            break
          case 8:
            sidebaritemEle.href = nmlinkUrl[8] // 友情链接
            break
          case 9:
            sidebaritemEle.href = nmlinkUrl[9] // 搜索列表
            break
          case 10:
            sidebaritemEle.href = nmlinkUrl[10] // 自定义表单
            break
          case 99:
            sidebaritemEle.href = nmlinkUrl[11] // 其他情况
            break
          case 100:
            sidebaritemEle.href = nmlinkUrl[12] // 菜单
            break
          case 101:
            sidebaritemEle.href = nmlinkUrl[13] // 搜索
            break
          case 102:
            sidebaritemEle.href = nmlinkUrl[14] + array[index].nmPIndexVar // 电话
            break
          case 103:
            sidebaritemEle.href = nmlinkUrl[15] // 联系
            break
          case 104:
            sidebaritemEle.href = nmlinkUrl[16] + array[index].nmPIndexVar // 邮箱
            break
          case 105:
            sidebaritemEle.href = nmlinkUrl[17] + array[index].nmPIndexVar // 短信
            break
          default:
            sidebaritemEle.href = nmlinkUrl[11] // 其他情况
            break
        }
      })

      // 语言版本
      fetch(lanUrl).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('laninfo went wrong!')
        }
      }).then(laninfo => {
        const sibarmenuEle = this.sidebar.querySelector('#menu')
        const sidebarEle = this.sidebar.querySelector('.list')
        const lanulEle = document.createElement('ul')
        lanulEle.className = 'lan'
        // sibarmenuEle.appendChild(lanulEle)
        sibarmenuEle.insertBefore(lanulEle, sidebarEle)
        const lanliEle = document.createElement('li')
        lanliEle.className = 'divider'
        lanliEle.innerHTML = '语言选择'
        lanulEle.appendChild(lanliEle)
        const arrlan = laninfo.data.items
        arrlan.forEach(function (value, index, array) {
          const lanliEle = document.createElement('li')
          lanulEle.appendChild(lanliEle)
          const lanitemEle = document.createElement('a')
          lanitemEle.className = array[index].keys + ' leftsideitem'
          lanitemEle.innerHTML = array[index].title
          // const lefticon = array[index].wapMenuIcon.split("|");
          // lanitemEle.style.backgroundImage = "url("+lefticon[0]+")"
          lanliEle.appendChild(lanitemEle)
        })
      })
    })
  }
}
