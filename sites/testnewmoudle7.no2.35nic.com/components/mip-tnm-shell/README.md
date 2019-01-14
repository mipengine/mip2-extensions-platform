# mip-tnm-shell

mip-tnm-shell 实现移动端站点头部，左侧菜单，底部菜单

标题|mip-tnm-shell
----|----
类型|定制
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-shell/mip-tnm-shell.js](https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-shell/mip-tnm-shell.js)

## 示例
```html
    <mip-tnm-shell mip-shell="">
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
              "homeUrl":"https://testnewmoudle7.no2.35nic.com/mip/templates/default/index.html",
              "lanUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetLanguageEdition",
              "sidebarmenuUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetQuickMenu?editionId=1&intTop=12",
              "footermenuUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetBottomMenu?editionId=1&intTop=5",
              "nmsorttitleUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetSysNMSortList?menuIndexVar=" 

             
              
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
               "homeUrl":"https://testnewmoudle7.no2.35nic.com/mip/templates/default/index.html",
              "lanUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetLanguageEdition",
              "sidebarmenuUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetQuickMenu?editionId=1&intTop=12",
              "footermenuUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetBottomMenu?editionId=1&intTop=5",
              "nmsorttitleUrl":"https://testnewmoudle7.no2.35nic.com/open_webapi/MofineApi.asmx/GetSysNMSortList?menuIndexVar="
            }
          }
        }
      ]
    }
            </script>
        </mip-tnm-shell>

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
              "homeUrl":"",
              "lanUrl":"",
              "sidebarmenuUrl":"",
              "footermenuUrl":"",
              "nmsorttitleUrl":""

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
              "homeUrl":"",
              "lanUrl":"",
              "sidebarmenuUrl":"",
              "footermenuUrl":"",
              "nmsorttitleUrl":""

            }
          }
        }
      ]
    }
 这里有几个注意点：
1.homeUrl:首页链接
2.lanUrl： 语言接口
3.sidebarmenuUrl：左侧菜单接口
4.footermenuUrl：底部菜单接口
5.nmsorttitleUrl：分类标题接口
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