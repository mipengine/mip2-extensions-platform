/**
 * @file: moblie left menu
 * @author: 1450052652@qq.com
 */
/**
 * 函数描述setCustomSidebar
 *
 * @param {string} sidebarmenuUrl 左侧菜单接口
 * @param {string} lanUrl 语言选择接口
 */
export default class Sidebar {
  constructor (rootEl) {
    this.sidebar = document.querySelector('.mip-shell-sidebar-wrapper')
  }

  setCustomSidebar (sidebarmenuUrl, lanUrl) {
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
        sidebaritemEle.setAttribute('data-type', 'mip')
        sidebaritemEle.setAttribute('data-title', array[index].nmShowTopic)
        sidebaritemEle.className = array[index].nmIndexVar + ' left-side-item'
        sidebaritemEle.innerHTML = array[index].nmShowTopic
        const lefticon = array[index].wapMenuIcon.split('|')
        sidebaritemEle.style.backgroundImage = 'url(' + lefticon[0] + ')'
        sidebarliEle.appendChild(sidebaritemEle)
        const sidebarUrl = array[index].wapModuleVar
        const hadsorturl = 'https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetSysNMSortList?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&parentId='
        // 判断是否有分类
        fetch(hadsorturl).then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('hadsortlist went wrong!')
          }
        }).then(hadsortlist => {
          // 有分类
          const path = '/mip/templates/default'
          if (hadsortlist.data.items.length > 0) {
            switch (sidebarUrl) {
              case 0:
                sidebaritemEle.href = path + '/index.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 首页
                break
              case 1:
                sidebaritemEle.href = path + '/single.html?id=' + array[index].nmMenuId + '&infoName=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 单页图文
                break
              case 2:
                sidebaritemEle.href = path + '/news_sort.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 新闻
                break
              case 3:
                sidebaritemEle.href = path + '/products_sort.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 产品
                break
              case 4:
                sidebaritemEle.href = path + '/downs_sort.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 下载
                break
              case 5:
                sidebaritemEle.href = path + '/videos_sort.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 视频
                break
              case 6:
                sidebaritemEle.href = path + '/gbook.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 留言
                break
              case 7:
                sidebaritemEle.href = path + '/jobs_sort.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&jobsStatus=1&intSta=0&intNum=&sortId=' // 招聘
                break
              case 8:
                sidebaritemEle.href = path + '/alinks.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&alinksIsShow=0' // 友情链接
                break
              case 9:
                sidebaritemEle.href = path + '/search.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 搜索列表
                break
              case 10:
                sidebaritemEle.href = path + '/customform.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 自定义表单
                break
              case 99:
                sidebaritemEle.href = 'javascript:void(0);' // 其他情况
                break
              case 100:
                sidebaritemEle.href = 'javascript:void(0);' // 菜单
                break
              case 101:
                sidebaritemEle.href = path + '/search.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 搜索
                break
              case 102:
                sidebaritemEle.href = 'tel:' + array[index].nmPIndexVar // 电话
                break
              case 103:
                sidebaritemEle.href = path + '/contactus.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 联系
                break
              case 104:
                sidebaritemEle.href = 'mailto:' + array[index].nmPIndexVar // 邮箱
                break
              case 105:
                sidebaritemEle.href = 'sms:' + array[index].nmPIndexVar // 短信
                break
              default:
                sidebaritemEle.href = 'javascript:void(0);' // 其他情况
                break
            }
          } else {
            // 无分类
            switch (sidebarUrl) {
              case 0:
                sidebaritemEle.href = path + '/index.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 首页
                break
              case 1:
                sidebaritemEle.href = path + '/single.html?id=' + array[index].nmMenuId + '&infoName=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 单页图文
                break
              case 2:
                sidebaritemEle.href = path + '/news.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 新闻
                break
              case 3:
                sidebaritemEle.href = path + '/products.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 产品
                break
              case 4:
                sidebaritemEle.href = path + '/downs.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 下载
                break
              case 5:
                sidebaritemEle.href = path + '/videos.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 视频
                break
              case 6:
                sidebaritemEle.href = path + '/gbook.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 留言
                break
              case 7:
                sidebaritemEle.href = path + '/jobs.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&jobsStatus=1&intSta=0&intNum=&sortId=' // 招聘
                break
              case 8:
                sidebaritemEle.href = path + '/alinks.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&alinksIsShow=0' // 友情链接
                break
              case 9:
                sidebaritemEle.href = path + '/search.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 搜索列表
                break
              case 10:
                sidebaritemEle.href = path + '/customform.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 自定义表单
                break
              case 99:
                sidebaritemEle.href = 'javascript:void(0);' // 其他情况
                break
              case 100:
                sidebaritemEle.href = 'javascript:void(0);' // 菜单
                break
              case 101:
                sidebaritemEle.href = path + '/search.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 搜索
                break
              case 102:
                sidebaritemEle.href = 'tel:' + array[index].nmPIndexVar // 电话
                break
              case 103:
                sidebaritemEle.href = path + '/contactus.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 联系
                break
              case 104:
                sidebaritemEle.href = 'mailto:' + array[index].nmPIndexVar // 邮箱
                break
              case 105:
                sidebaritemEle.href = 'sms:' + array[index].nmPIndexVar // 短信
                break
              default:
                sidebaritemEle.href = 'javascript:void(0);' // 其他情况
                break
            }
          }
        })
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
