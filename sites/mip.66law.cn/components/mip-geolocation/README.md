# mip-geolocation

标题|内容 获取H5 GPS定位并修改Cookie信息
----|----
类型|华律网MIP通用
支持布局|N/S
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/mip.66law.cn/mip-geolocation/mip-geolocation.js](https://c.mipcdn.com/extensions/platform/v2/mip.66law.cn/mip-geolocation/mip-geolocation.js)

## 使用方式

在开发 MIP 组件时需要获取GPS定位满足当前正常地区获取，可通过引用该组件获取相关的端能力服务，无法单独使用。

### 脚本引入

在需要使用 Box 对象的页面 HTML 当中引入脚本:

`<script type="text/javascript" src="https://c.mipcdn.com/static/v2/mip.66law.cn/mip-geolocation/mip-geolocation.js"></script>`

### 示例

```js
export default class MIPGeolocation extends MIP.CustomElement {
  build () {
    let attributes = this.element.attributes;
	console.log(attributes);
  }
}
```