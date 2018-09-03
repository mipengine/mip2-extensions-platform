# `mip-addchapter`

## 说明

### 小说目录组件
    需要引入:
        css: <link rel="stylesheet" href="https://c.mipcdn.com/static/v2/mip.css">
            <link rel="stylesheet" href="https://c.mipcdn.com/static/mag-design/2.0.2/mag-design.min.css">
        js: <script src="https://c.mipcdn.com/static/v2/mip.js"></script>
           <script src="/mip-addchapter/mip-addchapter.js"></script>

## 示例
```
<body>
<mip-data>
    <script type="application/json">
      {
        "title": "神武天地",
        originUrl: "https://xxx.xxx.com"
      }
    </script>
  </mip-data>
  <mip-addchapter 
    m-bind:novel-name = "title"
    m-bind:origin-url = "originUrl"></mip-addchapter>
</body>
```
### 字段说明
novel-name: 小说的名字,非必须

origin-url: 网页原地址，非必须