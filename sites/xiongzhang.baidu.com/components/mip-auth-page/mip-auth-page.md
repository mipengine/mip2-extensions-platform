# `mip-auth-page`

## 说明

提供给未登录百度账号的登录授权页所用的组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/extensions/platform/v2/xiongzhang.baidu.com/mip-auth-page/mip-auth-page.js


## 流程

1. 从当前组件所在的html页面的url中获取`redirect_uri`、 `client_id`、`state`查询参数。

* **redirect_uri**为登录授权成功后跳转页面的url
* **client_id**为熊掌号开发者id
* **state** 防止CSRF攻击的参数，在重定向后会带上，state的值为：

```javascript
JSON.stringify({
    url: 'xxxxxx', // 登录授权成功后跳转页面的url
    r: 123123123123 // 时间戳
});

```

如若`参数不存在` 或者 `格式不正确`，皆会抛出`error`

2. 通过步骤1获取到的参数打开Oauth的页面，进行登录授权操作

3. 登录授权成功后跳转到`redirect_uri`的地址，并携带`code`

## 示例

```html
<mip-auth-page></mip-auth-page>
```

## 属性

无

## 方法&事件

无

## 注意事项



