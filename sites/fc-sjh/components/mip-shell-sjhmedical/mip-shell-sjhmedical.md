# `mip-shell-sjhmedical`

## 说明
商家号医疗 mip-shell

## 示例
```html
<mip-shell-sjhmedical mip-shell=''>
        <script type="application/json">
          {
              "routes": [
                  {
                      "pattern": "https://sjh.baidu.com/*",
                      "meta": {
                         "header": {
                              "show": true,
                              "title": "医疗",
                              "homeUrl": ""
                          },
                          "view": {
                            "isIndex": true
                          }
                      }
                  }
              ],
          }
      </script>
    </mip-shell-sjhmedical>
```

### routes
[参考mip-shell用法](https://github.com/mipengine/mip2/blob/master/docs/page/shell.md)
