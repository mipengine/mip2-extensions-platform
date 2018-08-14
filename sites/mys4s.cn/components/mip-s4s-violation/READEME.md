# `mip-s4s-violation`

标题|内容
----|----
类型|业务组件
支持布局|无
所需脚本|https://c.mipcdn.com/extensions/platform/v2/my/mip-s4s-violation/mip-s4s-violation.js

## 说明

查询结果组件

## 示例

```js

<mip-data>
  <script type="application/json">
    {
      "globalData": {
        "provice": "",
        "car_no": "",
        "vin": "",
        "engine": "",
        "car_type": ""
      }
    }
  </script>
</mip-data>
<mip-s4s-violation m-bind:global-data="globalData" ></mip-s4s-violation>

```

## 属性

globalData 为所要查询的车辆信息
