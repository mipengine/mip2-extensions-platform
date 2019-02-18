/**
 * @file: moblie footer menu
 * @author: 1450052652@qq.com
 */
/**
 * 函数描述setCustomFooter底部菜单
 *
 * @param {string} footermenuUrl 首页链接
 *
 */
export default class Footer {
  constructor (rootEl) {
    this.footer = document.querySelector('.mip-shell-footer-wrapper')
  }
  // 首页链接 栏目链接
  setCustomFooter (footermenuUrl, nmsorttitleUrl, allnmsortUrl) {
    fetch(footermenuUrl).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('bottommenu went wrong!')
      }
    }).then(bottommenu => {
      const self = this
      const arrbott = bottommenu.data.items
      // console.log(arrbott)
      // 获取栏目所有分类
      fetch(allnmsortUrl).then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('allsortlist went wrong!')
        }
      }).then(allsortlist => {
        const allnmsort = allsortlist.data.items
        arrbott.forEach(function (value, index, array) {
          const footerEle = self.footer.querySelector('.mip-shell-footer')
          const footermenuEle = document.createElement('a')
          footermenuEle.setAttribute('data-type', 'mip')
          footermenuEle.setAttribute('data-title', array[index].nmShowTopic)
          footermenuEle.className = array[index].nmIndexVar + ' flex-subitem'
          const botticon = array[index].wapMenuIcon.split('|')
          footermenuEle.style.backgroundImage = 'url(' + botticon[0] + ')'
          const footerUrl = array[index].wapModuleVar
          footermenuEle.innerHTML = array[index].nmShowTopic
          footerEle.appendChild(footermenuEle)
          const path = '/mip/templates/default'
          allnmsort.forEach(function (allvalue, allindex, allarray) {
            const exti = allnmsort.findIndex(items => items.menuIndexVar === array[index].nmIndexVar)
            if (exti > 0) {
              switch (footerUrl) {
                case 0:
                  footermenuEle.href = path + '/index.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 首页
                  break
                case 1:
                  footermenuEle.href = path + '/single.html?id=' + array[index].nmMenuId + '&infoName=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 单页图文
                  break
                case 2:
                  footermenuEle.href = path + '/news_sort.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 新闻
                  break
                case 3:
                  footermenuEle.href = path + '/products_sort.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 产品
                  break
                case 4:
                  footermenuEle.href = path + '/downs_sort.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 下载
                  break
                case 5:
                  footermenuEle.href = path + '/videos_sort.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 视频
                  break
                case 6:
                  footermenuEle.href = path + '/gbook.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 留言
                  break
                case 7:
                  footermenuEle.href = path + '/jobs_sort.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&jobsStatus=1&intSta=0&intNum=&sortId=' // 招聘
                  break
                case 8:
                  footermenuEle.href = path + '/alinks.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&alinksIsShow=0' // 友情链接
                  break
                case 9:
                  footermenuEle.href = path + '/search.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 搜索列表
                  break
                case 10:
                  footermenuEle.href = path + '/customform.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 自定义表单
                  break
                case 99:
                  footermenuEle.href = 'javascript:void(0);' // 其他情况
                  break
                case 100:
                  footermenuEle.href = 'javascript:void(0);' // 菜单
                  self.footer.querySelector('.systemc_qmenu').setAttribute('on', 'tap:sidebar.open')
                  break
                case 101:
                  footermenuEle.href = path + '/search.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 搜索
                  break
                case 102:
                  footermenuEle.href = 'tel:' + array[index].nmPIndexVar // 电话
                  break
                case 103:
                  footermenuEle.href = path + '/contactus.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 联系
                  break
                case 104:
                  footermenuEle.href = 'mailto:' + array[index].nmPIndexVar // 邮箱
                  break
                case 105:
                  footermenuEle.href = 'sms:' + array[index].nmPIndexVar // 短信
                  break
                default:
                  footermenuEle.href = 'javascript:void(0);' // 其他情况
                  break
              }
            } else if (exti < 0) {
              switch (footerUrl) {
                case 0:
                  footermenuEle.href = path + '/index.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 首页
                  break
                case 1:
                  footermenuEle.href = path + '/single.html?id=' + array[index].nmMenuId + '&infoName=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 单页图文
                  break
                case 2:
                  footermenuEle.href = path + '/news.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 新闻
                  break
                case 3:
                  footermenuEle.href = path + '/products.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 产品
                  break
                case 4:
                  footermenuEle.href = path + '/downs.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 下载
                  break
                case 5:
                  footermenuEle.href = path + '/videos.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&intSta=0&intNum=&sortId=' // 视频
                  break
                case 6:
                  footermenuEle.href = path + '/gbook.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 留言
                  break
                case 7:
                  footermenuEle.href = path + '/jobs.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&jobsStatus=1&intSta=0&intNum=&sortId=' // 招聘
                  break
                case 8:
                  footermenuEle.href = path + '/alinks.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&alinksIsShow=0' // 友情链接
                  break
                case 9:
                  footermenuEle.href = path + '/search.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 搜索列表
                  break
                case 10:
                  footermenuEle.href = path + '/customform.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 自定义表单
                  break
                case 99:
                  footermenuEle.href = 'javascript:void(0);' // 其他情况
                  break
                case 100:
                  footermenuEle.href = 'javascript:void(0);' // 菜单
                  self.footer.querySelector('.systemc_qmenu').setAttribute('on', 'tap:sidebar.open')
                  break
                case 101:
                  footermenuEle.href = path + '/search.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 搜索
                  break
                case 102:
                  footermenuEle.href = 'tel:' + array[index].nmPIndexVar // 电话
                  break
                case 103:
                  footermenuEle.href = path + '/contactus.html?menuIndexVar=' + array[index].nmIndexVar + '&editionId=' + array[index].editionId // 联系
                  break
                case 104:
                  footermenuEle.href = 'mailto:' + array[index].nmPIndexVar // 邮箱
                  break
                case 105:
                  footermenuEle.href = 'sms:' + array[index].nmPIndexVar // 短信
                  break
                default:
                  footermenuEle.href = 'javascript:void(0);' // 其他情况
                  break
              }
            }
          })
        })

        // const hadsorturl = nmsorttitleUrl + array[index].nmIndexVar + '&editionId=' + array[index].editionId + '&parentId=0'
        // // 判断是否有分类
        // fetch(hadsorturl).then(response => {
        //   if (response.ok) {
        //     return response.json()
        //   } else {
        //     throw new Error('hadsortlist went wrong!')
        //   }
        // }).then(hadsortlist => {
        //   const path = '/mip/templates/default'
        //   // 有分类
        //   if (hadsortlist.data.items.length > 0) {
        //
        //   } else {
        //     // 无分类
        //
        //   }
        // })
      })
    })
  }
}
