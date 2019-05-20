# mip-example

标题|文章列表组件（上拉加载更多)
----|----
类型|业务组件
支持布局|container
所需脚本| https://c.mipcdn.com/extensions/platform/v2/ruiwen.com/mip-gzpd-pubuliu/mip-gzpd-pubuliu.js |

## 说明

一个文章列表，上拉可以加载更多。之所以不用官方的那个组件，是因为这个请求数据接口是好多地方共用的，接口数据结构不对

## 示例


```
<!DOCTYPE html>
<html mip>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <title>黑板报</title>
    <link rel="canonical" href="对应的原页面地址">
    <link rel="stylesheet" href="https://c.mipcdn.com/static/v2/mip.css">
</head>
<body>
<mip-gzpd-pbl></mip-gzpd-pbl>

<script src="https://c.mipcdn.com/static/v2/mip.js"></script>
<script src="/mip-gzpd-pbl/mip-gzpd-pbl.js"></script>

</body>
</html>

```

## 属性

无