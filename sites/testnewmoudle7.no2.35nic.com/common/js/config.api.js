/**
 * @author lff
 * @time 2018-01-23
 * 项目相关接口配置文件
 */
import { getUrlParams } from './getparam'
const baseurl = 'https://testnewmoudle7.no2.35nic.com/'
const apiUrl = {
  bannerList: baseurl + 'open_webapi/MofineApi.asmx/GetTempNewsList?menuIndexVar=travel_news&editionId=1&intSta=0&intNum=2&sortId=0', //   首页轮播图接口
  homeUrl: baseurl + 'mip/templates/default/index.html', // 首页链接
  footermenuUrl: baseurl + 'open_webapi/MofineApi.asmx/GetBottomMenu?editionId=1&intTop=5', // 底部菜单接口
  sidebarmenuUrl: baseurl + 'open_webapi/MofineApi.asmx/GetQuickMenu?editionId=1&intTop=12', // 左侧菜单接口
  nmsorttitleUrl: baseurl + 'open_webapi/MofineApi.asmx/GetSysNMSortList?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&parentId=' + getUrlParams().parentId, // 分类标题接口
  lanUrl: baseurl + 'open_webapi/MofineApi.asmx/GetLanguageEdition', // 语言接口
  newsmoduleUrl: baseurl + 'open_webapi/MofineApi.asmx/GetPageModuleList?moduleElement=news_toptitle&editionId=1', // 首页新闻页面模块
  provdtabUrl: baseurl + 'open_webapi/MofineApi.asmx/GetTempProductsList?menuIndexVar=travel_step&editionId=1&intSta=0&intNum=3&sortId=0', // 首页产品接口
  promoduleUrl: baseurl + 'open_webapi/MofineApi.asmx/GetPageModuleList?moduleElement=products_toptitle&editionId=1', // 首页产品页面模块
  prosorttitleUrl: baseurl + 'open_webapi/MofineApi.asmx/GetSysNMSortList?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&parentId=0', // 产品分类列表标题接口
  prosortlistUrl: baseurl + 'open_webapi/MofineApi.asmx/GetTempProductsList?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&intSta=' + getUrlParams().intSta + '&intNum=' + getUrlParams().intNum + '&sortId=' + getUrlParams().sortId + '', // 产品分类列表数据接口
  jobslistUrl: baseurl + '/open_webapi/MofineApi.asmx/GetJobsList?jobsStatus=' + getUrlParams().jobsStatus + '&editionId=' + getUrlParams().editionId + '&intSta=' + getUrlParams().intSta + '&intNum=' + getUrlParams().intNum + '&sortId=' + getUrlParams().sortId + '', // 招聘列表页接口
  newssortlistUrl: baseurl + 'open_webapi/MofineApi.asmx/GetTempNewsList?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&intSta=' + getUrlParams().intSta + '&intNum=' + getUrlParams().intNum + '&sortId=' + getUrlParams().sortId + '', // 新闻分类列表数据接口
  videossortlistUrl: baseurl + 'open_webapi/MofineApi.asmx/GetTempVideosList?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&intSta=' + getUrlParams().intSta + '&intNum=' + getUrlParams().intNum + '&sortId=' + getUrlParams().sortId + '', // 视频分类列表数据接口
  downssortlistUrl: baseurl + 'open_webapi/MofineApi.asmx/GetTempDownloadList?menuIndexVar=' + getUrlParams().menuIndexVar + '&editionId=' + getUrlParams().editionId + '&intSta=' + getUrlParams().intSta + '&intNum=' + getUrlParams().intNum + '&sortId=' + getUrlParams().sortId + '', // 下载分类列表数据接口
  jobsortlistUrl: baseurl + 'open_webapi/MofineApi.asmx/GetJobsList?jobsStatus=' + getUrlParams().jobsStatus + '&editionId=' + getUrlParams().editionId + '&intSta=' + getUrlParams().intSta + '&intNum=' + getUrlParams().intNum + '&sortId=' + getUrlParams().sortId + ''// 招聘分类列表数据接口
}

export default apiUrl
