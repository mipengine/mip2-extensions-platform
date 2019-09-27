# mip-example

复制弹窗
----|----
类型|业务
支持布局|N/S
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/gzpd.com/mip-gzpd-alert/mip-gzpd-alert.js](https://c.mipcdn.com/extensions/platform/v2/gzpd.com/mip-gzpd-alert/mip-gzpd-alert.js)

## 说明

付费复制或获取验证码复制。复制时会弹窗

## 示例

```html
<!DOCTYPE html>
<html mip>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,user-scalable=no">
    <title>MIP page</title>
    <link rel="canonical" href="对应的原页面地址">
    <link rel="stylesheet" href="https://c.mipcdn.com/static/v2/mip.css">
    <style mip-custom>
      /* 自定义样式 */
    </style>
  </head>
  <body>
  <mip-gzpd-alert>
    <div class="content">
      <h1>文章标题</h1>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
      <p>bala bala bala... bala bala bala... bala bala bala...</p>
    </div>
  </mip-gzpd-alert>

  <script src="https://c.mipcdn.com/static/v2/mip.js"></script>
  <script src="/mip-gzpd-alert/mip-gzpd-alert.js"></script>
  </body>
</html>
```

## 属性

无