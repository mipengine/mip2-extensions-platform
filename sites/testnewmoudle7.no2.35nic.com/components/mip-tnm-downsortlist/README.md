# mip-tnm-downsortlist

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-downsortlist/mip-tnm-downsortlist.js](https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-downsortlist/mip-tnm-downsortlist.js)

## 说明 mip-tnm-downsortlist

组件功能说明 根据地址栏获取参数得到的接口获取栏目分类,根据获取到的栏目分类ID输出对应分类下的下载列表数据

## 示例
```html
 <mip-tnm-downsortlist></mip-tnm-downsortlist>
````
示例说明
1.分类接口：
 prosorttitleUrl: baseurl + 'open_webapi/MofineApi.asmx/GetSysNMSortList?menuIndexVar='+getUrlParams().menuIndexVar+'&editionId='+getUrlParams().editionId+'&parentId=0'
2.下载列表接口：
downssortlistUrl:baseurl+'open_webapi/MofineApi.asmx/GetTempDownloadList?menuIndexVar='+getUrlParams().menuIndexVar+'&editionId='+getUrlParams().editionId+'&intSta='+getUrlParams().intSta+'&intNum='+getUrlParams().intNum+'&sortId='+getUrlParams().sortId+''
3.根据地址栏获取参数得到的接口返回的数据格式需要是如下格式：
       status：0 表示请求成功。
       items：[] 是需要渲染的数序。
       isEnd：表示是否是最后一页，非必须。
       {
            status: 0,
            data: {
                items: [],
                isEnd: 1
            }
       }
4.访问地址需要地址栏参数:?menuIndexVar=downsdll&editionId=1&intSta=0&intNum=2&sortId=

## 属性

属性说明
