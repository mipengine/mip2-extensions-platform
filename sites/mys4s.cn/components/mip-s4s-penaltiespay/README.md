# `mip-s4s-penaltiespay`

标题|内容
----|----
类型|业务组件
支持布局|无
所需脚本|https://c.mipcdn.com/extensions/platform/v2/my/mip-s4s-penaltiespay/mip-s4s-penaltiespay.js

## 说明

处罚决定书支付组件

## 示例

```js
<mip-data>
  <script type="application/json">
    {
      "#penaltiePayData": {
        "orderNumber": "",
        "price": "",
        "date": "",
        "lateFree": "",
        "ownFree": "",
        "nick": "",
        "nickCarNo": "",
        "ticketUrl": "",
        "drive_no": ""
      }
    }
  </script>
</mip-data>

<mip-s4s-penaltiespay m-bind:global-data="penaltiePayData" id="pay2"></mip-s4s-penaltiespay>
```

## 属性

globalData为所需的相关处罚决定书的内容
