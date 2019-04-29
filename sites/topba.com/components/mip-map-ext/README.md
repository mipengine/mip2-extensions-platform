# mip-map-ext

mip 百度地图组件|组件集成了百度地图的服务，目前支持定位、地图控件加载、显示弹窗、显示自己的位置及显示多个覆盖物等功能
----|----
类型|通用
支持布局|responsive, fixed-height, fill, container, fixed
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/topba.com/mip-map-ext/mip-map-ext.js](https://c.mipcdn.com/extensions/platform/v2/topba.com/mip-example/mip-example.js)

## 说明

显示自己的位置及显示多个覆盖物

## 示例

示例说明

```
<mip-map-ext></mip-map-ext>
```

## 属性
data-only-get-sdk

说明：是否只加载地图 SDK

必填：否

格式：Boolean

默认：false

hide-map

说明：是否隐藏地图

必填：否

格式：Boolean

默认：false

get-position

说明：是否自动定位

必填：否

格式：Boolean

默认：false

触发事件

getPositionComplete

如设置定位且成功定位，则透传经纬度等信息 透传数据结构如下：
{
  "accuracy":30,
  "altitude":null,
  "altitudeAccuracy":null,
  "heading":null,
  "latitude":40.050551292543,
  "longitude":116.28123645733,
  "speed":null,
  "timestamp":null,
  "point":{
    "lng":116.28123645733,
    "lat":40.050551292543
  },
  "address":{
    "city":"北京市",
    "city_code":0,
    "district":"海淀区",
    "province":"北京市",
    "street":"软件园西三路辅路",
    "street_number":""
  }
}

getPositionFailed

定位失败

searchLocalFailed

无法定位值local所配位置时，触发此事件，并切换为自动定位

暴露方法

getLocal

获取当前定位

showMyPosition
说明：显示自己的位置

必填：是

格式：point

默认：无