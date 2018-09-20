# mip-novelcatalog 小说目录组件


mip-novelcatalog 实现了一个异步获取小说目录的组件

标题|内容
----|----
类型|通用
支持布局|responsive,fixed-height,fill,container,fixed
所需脚本|https://c.mipcdn.com/static/v2/mip.js, /mip-addchapter/mip-addchapter.js
所需样式|https://c.mipcdn.com/static/v2/mip.css, https://c.mipcdn.com/static/mag-design/2.0.2/mag-design.min.css

## 示例
```html
<body>
    <mip-data>
    <script type="application/json">
      {
        "title": "神武天地",
        "bkid": "",
        "originUrl": ""
      }
    </script>
  </mip-data>
  <mip-novelcatalog 
    m-bind:novel-name = "title"
    m-bind:origin-url = "originUrl"
    m-bind:bkid = "bkid"></mip-novelcatalog>
</body>
```

## 属性

### novel-name

说明：小说的名字

必选项：否

类型：字符串

默认值：''

### origin-url

说明：网页原地址

必选项：否

类型： 字符串

默认值：''

### bkid

说明：book id

必选项：否

类型：字符串

默认值：''




