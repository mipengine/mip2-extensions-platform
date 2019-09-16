# mip-tubatu-quickapp

MIP页面跳转快应用
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/mip-to8to/mip-tubatu-quickapp/mip-tubatu-quickapp.js](https://c.mipcdn.com/extensions/platform/v2/mip-to8to/mip-tubatu-quickapp/mip-tubatu-quickapp.js)

## 说明

组件功能说明
MIP页面跳转快应用

mip的页面支持跳转快应用

会捕捉页面中的id=app_router的节点，获取中的data-link和data-param数据，然后跳转到对应快应用页面。
data-link中是快应用的路径
data-param中是经过 JSON.stringify() 处理的字符串

<input type="hidden" id="app_router" data-link="/" data-param='{"a":1}'>

## 示例

```
// html 中
<input type="hidden" id="app_router" data-link="/" data-param='{"a":1}'>
```

```$xslt
    // js中,
    const appRouterNode = document.querySelector('#app_router')
    const url = appRouterNode.getAttribute('data-link')
    const params = JSON.parse(appRouterNode.getAttribute('data-param')) || {}

    if (typeof window.appRouter !== 'undefined') {
      window.appRouter('com.tubatu.demo', url, params)
     
    }
```

示例说明
使用时页面组件
1、只需要引用 mip-tubatu-quickapp 组件
2、添加节点 <input type="hidden" id="app_router" data-link="/" data-param='{"a":1}'>
就可以使用啦

```
// 代码示例
```

## 属性

### 属性1

**说明**：

**必选项**：

**单位**：

**默认值**：
