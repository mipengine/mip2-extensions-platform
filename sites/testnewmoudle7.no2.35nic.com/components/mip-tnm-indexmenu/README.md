# mip-tnm-indexmenu

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-indexmenu/mip-tnm-indexmenu.js](https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-indexmenu/mip-tnm-indexmenu.js)

## 示例

```html
 <mip-tnm-indexmenu  src=""></mip-tnm-indexmenu>
````
示例说明 根据异步请求菜单接口，处理接口图片渲染菜单列表

## 属性

### src

属性说明:新闻列表接口
必选项:是
类型:字符串
接口数据返回格式如下:
status：0 表示请求成功。
items：[] 是需要渲染的数序。
isEnd：表示是否是最后一页，非必须。
{
    status: 0,
    data: {
        items: [],
        isEnd: 1
    }
}
