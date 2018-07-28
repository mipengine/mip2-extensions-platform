# `mip-s4s-pay1`

标题|内容
----|----
类型|业务组件
支持布局|无
所需脚本|https://c.mipcdn.com/extensions/platform/v2/my/mip-s4s-pay1/mip-s4s-pay1.js

## 说明

违章查询支付组件

## 示例

```js
<mip-data>
  <script type="application/json">
    {
        "#payCarData": {
          "provice": "",
          "car_no": "",
          "vin": "",
          "engine": ""
        }
    }
  </script>
</mip-data>

<mip-s4s-pay1 m-bind:global-data="payCarData"></mip-s4s-pay1>
```

## 属性

globalData为违章车辆信息
