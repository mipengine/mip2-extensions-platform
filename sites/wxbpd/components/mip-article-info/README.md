# `mip-article-info`

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/wxbpd/mip-article-info/mip-article-info.js](https://c.mipcdn.com/extensions/platform/v2/wxbpd/mip-article-info/mip-article-info.js)

## 说明

mip-article-info 用于与服务端进行数据交互并动态展示页面信息
由于官方的获取异步数据的组件对于数据格式有明确要求，并且无法满足项目需要，因此未使用官方组件

## 示例

<mip-article-info serverurl="" pageurl="" articleid=""></mip-article-info>

## 属性

serverurl 获取服务端数据的地址
pageurl 页面地址，用于页面跳转
articleid 获取数据所需参数
