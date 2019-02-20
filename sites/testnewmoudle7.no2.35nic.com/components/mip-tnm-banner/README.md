# mip-tnm-banner

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-banner/mip-tnm-banner.js](https://c.mipcdn.com/extensions/platform/v2/testnewmoudle7.no2.35nic.com/mip-tnm-banner/mip-tnm-banner.js)

## 示例

### 基本用法
```html
 <mip-tnm-banner src="" bwidth="300" bheight="138"></mip-tnm-banner>
````
示例说明
1.根据src属性得到URL异步请求接口实现手机轮播图

## 属性

### src

属性说明:手机轮播图接口
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
### bwidth

属性说明:轮播图宽度,不是实际宽度,与高度属性配合来设置图片比例
必选项:是
类型:字符串


### bheight

属性说明:轮播图高度,不是实际高度,与宽度属性配合来设置图片比例
必选项:是
类型:字符串
