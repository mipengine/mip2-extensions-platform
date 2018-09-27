# `mip-safe-download`

 |标题 | 内容 |
----|----|
类型| 通用 |
支持布局 | 
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/mipProject/mip-safe-download/mip-safe-download.js](https://c.mipcdn.com/extensions/platform/v2/mipProject/mip-safe-download/mip-safe-download.js)

## 说明
提供通用的手助安全包下载按钮展现逻辑
1. online状态展示按钮
2. offline状态按钮置灰
3. 其它情况，隐藏按钮

## 示例
```javascript { .theme-peacock }
    <mip-mobile-download
            url="https://app.3dmgame.com/mip/android/86378.html"
            source="1021815n"
            version-code=100012
            btn-style=1
    >
    </mip-mobile-download>
```

示例说明

## 属性

|字段|类型|必须|说明|
|---|---|---|---|
|url|String|必须|页面唯一标识|
|source|String|必须|渠道号，从手助PM获取|
|version-code|int|非必须|安装包版本号，低于此版本号的高速包不会展示，默认为0|
|btn-style|int|非必须默认1|按钮样式、1-圆角按钮、2-方形按钮



