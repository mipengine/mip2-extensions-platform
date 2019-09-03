# mip-example

添加下载的卡片
----|----
类型|业务组件
支持布局|container
所需脚本| https://c.mipcdn.com/extensions/platform/v2/kt250.com/mip-getfans/mip-getfans.js |

## 说明

当前文章标题包含接口所返回的关键词时显示下载的卡片，点击显示弹窗。（当前关键词：开学第一课）

## 示例


```
<!DOCTYPE html>
<html mip>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,user-scalable=no">
    <title>开学第一课</title>
    <link rel="canonical" href="对应的原页面地址">
    <link rel="stylesheet" href="https://c.mipcdn.com/static/v2/mip.css">
  </head>
  <body>
    <div>
      <mip-getfans></mip-getfans>
    </div>
    <script src="https://c.mipcdn.com/static/v2/mip.js"></script>
    <script src="/mip-getfans/mip-getfans.js"></script>
  </body>
</html>


```

## 属性

无