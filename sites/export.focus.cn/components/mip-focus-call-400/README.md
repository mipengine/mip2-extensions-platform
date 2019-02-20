# mip-focus-call-400

mip-focus-call-400 实现了获取动态400号码并拨打的功能。

标题|内容
----|----
类型|业务
支持布局| fill
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/export.focus.cn/mip-focus-call-400/mip-focus-call-400.js](https://c.mipcdn.com/extensions/platform/v2/export.focus.cn/mip-focus-call-400/mip-focus-call-400.js)
[https://c.mipcdn.com/static/v2/mip-lightbox/mip-lightbox.js](https://c.mipcdn.com/static/v2/mip-lightbox/mip-lightbox.js)

## 说明

本组件监听了点击事件，点击事件发生时，向后台发送请求获取动态400号码，然后拨打400号码。
本组件包含一个容器和一个弹出层。为了方便自定义样式，默认状态下(弹出层未弹出)下的显示内容由插槽插入。
需要设置id和on来监听自身的点击事件。 
city-id, pid, phone是发送请求所需携带的数据。
host-number，extension-number是请求失败后拨打电话的号码。

## 示例

```html
<mip-focus-call-400 
  id="focus-call-1111" 
  on="tap:focus-call-1111.call androidfail:lightbox-call-1111.toggle" 
  city-id="1" 
  pid="1111" 
  phone="4000000000-111111" 
  host-number="400-000-0000" 
  extension-number="111111" 
  fetch-url="http://export.focus-test.cn/ajax/randomBigCode">
    <div class="icon"></div>
</mip-focus-call-400>
\```

## 属性

### city-id

说明: 城市id
必选项：是
类型：数字
取值范围：>0

### pid

说明：楼盘id
必选项：是
类型：数字
取值范围：>0

### phone

说明：电话号码
必选项：是
类型：字符串

### host-number

说明：主机号
必选项：是
类型：字符串

### extension-number

说明：分机号
必选项：是
类型：数字
取值范围：>0

### id

说明：用来监听点击事件
必选项：是
类型：字符串

### fetch-url

说明：获取动态400电话的接口
必选项：是
类型：字符串

## 注意事项

1. 本组件中包含弹窗，使用了mip-lightbox组件，所以需要引入相应依赖脚本。
2. 因为lightbox的点击事件会通过冒泡传递到组件上，会导致弹窗无法打开。本组件通过类名来判断事件发生的元素是否包含在lightbox中来区分这种情况, 所以插槽中用来触发点击事件的元素必须设置一个类名。