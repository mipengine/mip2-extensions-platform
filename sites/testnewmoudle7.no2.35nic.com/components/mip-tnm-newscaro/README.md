# mip-tnm-newscaro

mip-tnm-newscaro 根据接口实现首页新闻轮播图

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-newscaro/mip-tnm-newscaro.js](https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-newscaro/mip-tnm-newscaro.js)

## 示例

### 基本用法
```html
 <mip-tnm-newscaro src="" modulesrc=""></mip-tnm-newscaro>
````
示例说明
1.根据src属性得到URL异步请求接口实现首页新闻轮播图

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
### modulesrc

属性说明:页面模块接口
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
