# mip-testnewmoudle-shell

标题|mip-testnewmoudle-shell
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-testnewmoudle-shell/mip-testnewmoudle-shell.js](https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-testnewmoudle-shell/mip-testnewmoudle-shell.js)

## 说明 mip-testnewmoudle-shell

组件功能说明 实现移动端站点头部，左侧菜单，底部菜单

## 示例
```html
 <mip-testnewmoudle-shell mip-shell>
          <script type="application/json">
    {
      "routes": [
        {
          "pattern": "/use-shell.html",
          "meta": {
            "header": {
              "show": true,
              "title": "我的首页",
              "logo": "https://gss0.bdstatic.com/5bd1bjqh_Q23odCf/static/wiseindex/img/favicon64.ico",
              "homeUrl": "https://www.mipengine.org/v2/codelabs/customize-shell/add-function.html",
              "footermenuUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetBottomMenu?editionId=1&intTop=5",
              "sidebarmenuUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetQuickMenu?editionId=1&intTop=10",
              "nmsorttitleUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetSysNMSortList?menuIndexVar=travle_activity&editionId=1&parentId=0",
              "nmlinkUrl":["/index.html","/single.html","/news.html","/products.html","/downs.html","/videos.html","/gbook.html","/jobs.html","/alinks.html","/search.html","/customform.html","javascript:void(0);","javascript:void(0);","/search.html","tel:","contactus.html","mailto:","sms:"],
             "lanUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetLanguageEdition"
            },
            "view": {
              "isIndex": true
            }
          }
        },
        {
          "pattern": "*",
          "meta": {
            "header": {
              "show": true,
              "title": "其他页面",
               "homeUrl": "https://www.mipengine.org/v2/codelabs/customize-shell/add-function.html",
              "footermenuUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetBottomMenu?editionId=1&intTop=5",
              "sidebarmenuUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetQuickMenu?editionId=1&intTop=20",
               "nmsorttitleUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetSysNMSortList?menuIndexVar=travel_news&editionId=1&parentId=0",
             "nmlinkUrl":["/index.html","/single.html","/news.html","/products.html","/downs.html","/videos.html","/gbook.html","/jobs.html","/alinks.html","/search.html","/customform.html","javascript:void(0);","javascript:void(0);","/search.html","tel:","contactus.html","mailto:","sms:"],
             "lanUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetLanguageEdition"
            }
          }
        }
      ]
    }
    </script>
    </mip-testnewmoudle-shell>

示例说明  

## 属性  mip-shell

属性说明  个性化shell

Shell 配置的基本结构如下：
   {
      "routes": [
        {
          "pattern": "/use-shell.html",
          "meta": {
            "header": {
              "show": true,
              "title": "我的首页",
              "logo": "",
              "homeUrl": "",
              "footermenuUrl":"",
              "sidebarmenuUrl":"",
              "nmsorttitleUrl":"",
              "nmlinkUrl":[],
             "lanUrl":""
            },
            "view": {
              "isIndex": true
            }
          }
        },
        {
          "pattern": "*",
          "meta": {
            "header": {
              "show": true,
              "title": "其他页面",
               "homeUrl": "",
              "footermenuUrl":"",
              "sidebarmenuUrl":"",
               "nmsorttitleUrl":"",
             "nmlinkUrl":[],
             "lanUrl":""
            }
          }
        }
      ]
    }
 这里有几个注意点：
       homeUrl 首页链接
       footermenuUrl 底部菜单接口
       sidebarmenuUrl 左侧菜单接口
       nmsorttitleUrl 分类标题接口
       nmlinkUrl 根据类型判断链接页面
       lanUrl 语言接口
       接口返回的数据格式需要是如下格式：
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