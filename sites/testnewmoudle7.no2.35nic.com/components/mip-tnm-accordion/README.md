# mip-tnm-accordion

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-accordion/mip-tnm-accordion.js](https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-accordion/mip-tnm-accordion.js)

## 说明 mip-tnm-accordion

组件功能说明  根据接口实现招聘信息折叠节点

## 示例
```html
  <mip-tnm-accordion src=""></mip-tnm-accordion>
````

示例说明
1.根据src属性得到URL异步请求无分类招聘接口渲染列表数据

## 属性

### src

属性说明: 招聘列表接口
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

