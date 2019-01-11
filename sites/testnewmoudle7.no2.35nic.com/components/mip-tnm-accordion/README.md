# mip-tnm-accordion

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-accordion/mip-tnm-accordion.js](https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-accordion/mip-tnm-accordion.js)

## 说明 mip-tnm-accordion

组件功能说明  根据接口实现招聘信息折叠节点
			
## 示例 
```html
  <mip-tnm-accordion></mip-tnm-accordion>
````

示例说明
1.无分类招聘接口
jobslistUrl:baseurl+'/open_webapi/MofineApi.asmx/GetJobsList?jobsStatus='+getUrlParams().jobsStatus+'&editionId='+getUrlParams().editionId+'&intSta='+getUrlParams().intSta+'&intNum='+getUrlParams().intNum+'&sortId='+getUrlParams().sortId+''
2.根据地址栏获取参数得到的接口返回的数据格式需要是如下格式：
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
3.访问地址需要地址栏参数:?jobsStatus=1&editionId=1&intSta=0&intNum=2&sortId=

## 属性

属性说明
