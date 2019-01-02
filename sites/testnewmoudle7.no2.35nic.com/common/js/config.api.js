/**
 * @author lff
 * @time 2018-01-23
 * 项目相关接口配置文件
 */
const baseurl = 'https://testnewmoudle7.no2.35nic.com/'
const apiUrl = {
  bannerList: baseurl + 'open_webapi/MofineApi.asmx/GetTempNewsList?menuIndexVar=travel_news&editionId=1&intSta=0&intNum=2', //   首页轮播图接口
  homeUrl: baseurl + 'mip/templates/default/index.html', // 首页链接
  footermenuUrl: baseurl + 'open_webapi/MofineApi.asmx/GetBottomMenu?editionId=1&intTop=5', // 底部菜单接口
  sidebarmenuUrl: baseurl + 'open_webapi/MofineApi.asmx/GetQuickMenu?editionId=1&intTop=10', // 左侧菜单接口
  nmsorttitleUrl: baseurl + 'open_webapi/MofineApi.asmx/GetSysNMSortList?menuIndexVar=travle_activity&editionId=1&parentId=0', // 分类标题接口
  lanUrl: baseurl + 'open_webapi/MofineApi.asmx/GetLanguageEdition' // 语言接口
}

export default apiUrl
