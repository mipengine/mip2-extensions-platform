# `mip-s4s-carinfo`

标题|内容
----|----
类型|业务组件
支持布局|无
所需脚本|https://c.mipcdn.com/extensions/platform/v2/my/mip-s4s-carinfo/mip-s4s-carinfo.js

## 说明

修改／添加／查看 车辆信息组件

## 示例

```js
<mip-data>
  <script type="application/json">
    {
      "#changeCarData":{
        "provice": "",
        "car_no": "",
        "vin": "",
        "engine": "",
      }
    }
  </script>
</mip-data>
<mip-s4s-carinfo m-bind:global-data="changeCarData" id="carInfo"  ></mip-s4s-carinfo>
```
## 属性

globalData为要修改／添加／查看 的车辆信息
