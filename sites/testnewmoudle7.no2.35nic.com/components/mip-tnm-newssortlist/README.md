# mip-tnm-newssortlist

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-newssortlist/mip-tnm-newssortlist.js](https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-newssortlist/mip-tnm-newssortlist.js)

## 说明 mip-tnm-prosortlist

组件功能说明 sortsrc属性得到URL获取栏目分类,,src属性得到的接口再根据分类的id异步请求该分类的新闻列表数据，渲染列表

## 示例

```html
 <mip-tnm-newssortlist src="" sortsrc=""></mip-tnm-newssortlist>
````
示例说明

1.sortsrc属性得到URL获取栏目分类
2.src属性得到URL以及分类id获取下载列表接口：
sortsrc属性得到URL获取栏目分类

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
### sortsrc

属性说明:栏目的分类接口
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