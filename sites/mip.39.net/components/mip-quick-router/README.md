# mip-quick-router

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/mip.39.net/mip-quick-router/mip-quick-router.js](https://c.mipcdn.com/extensions/platform/v2/mip.39.net/mip-quick-router/mip-quick-router.js)

## 说明

调起快应用

## 示例






// 代码示例
	
    <!-- 直接启动服务 -->

	<mip-xiaomi-router packageName="xxx.xxx.xxx" page="home" params="a1=v1&a2=v2"></mip-xiaomi-router>



## 属性

### packagename

**说明**：manifest.json中声明的包名 必选项：是 类型：string

### approuter

**说明**：是否直接启动服务；不填默认直接启动 必选项：否 类型：{true|false}

### page

**说明**：要打开的页面 必选项：否 类型：string

### params

**说明**：请求附带的参数，通过：a1=v1&a2=v2的方式书写 必选项：否 类型：string

### protocal

**说明**：请求协议；默认http 必选项：否 类型：string

