# mip-dishen-xzpicker

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/m.dishen.com/mip-dishen-xzpicker/mip-dishen-xzpicker.js](https://c.mipcdn.com/extensions/platform/v2/m.dishen.com/mip-dishen-xzpicker/mip-dishen-xzpicker.js)

## 说明

星座配对组件，选择对应的男女星座，点击”开始配对“后发送请求，根据返回的数据跳转到对应的配对结果页面

## 示例

示例说明

```
// 代码示例
      <mip-dishen-xzpicker
        fetch-url="http://localhost:8099/pair"
        data-href="https://m.dishen.com/xz/pair/_val_.html"
      >选择星座配对
      </mip-dishen-xzpicker>
```

## 属性

### fetch-url

**说明**：异步请求地址，使用 Fetch API 发送异步请求，成功后跳转到对应页面。

**必选项**： 是
 
### data-href

**说明**：配对请求成功后的跳转路径，配对请求成功后返回相对路径，会替换其中的_val_。
  
**必选项**：是
  
