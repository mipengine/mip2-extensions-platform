# `mip-zhdownload`

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/zongheng.tfciw/mip-zhdownload/mip-zhdownload.js](https://c.mipcdn.com/extensions/platform/v2/zongheng.tfciw/mip-zhdownload/mip-zhdownload.js)

## 说明

组件功能说明

## 示例
```html
<mip-zhdownload androidhref="http://www.xmkanshu.com/app/android?fr=bdgfh&mip=1&bkid=189169121&crid=1&ld=1" ioshref="http://www.xmkanshu.com/app/android?fr=bdgfh&mip=1&bkid=189169121&crid=1&ld=1&os=iphone"
  title="离线免费看全文，离线免费看全文，离线免费看全文">
  <mip-stats-baidu>
    <script type="application/json">
      {
        "token": "02890d4a309827eb62bc3335b2b28f7f"
      }
    </script>
  </mip-stats-baidu>
</mip-zhdownload>
<script src="https://c.mipcdn.com/static/v2/mip.js"></script>
<script src="https://c.mipcdn.com/static/v2/mip-stats-baidu/mip-stats-baidu.js"></script>
<script src="https://c.mipcdn.com/extensions/platform/v2/zongheng.tfciw/mip-zhdownload/mip-zhdownload.js"></script>
```
示例说明

## 属性

```
ioshref：ios下载链接
androidhref：安卓下载链接
title：标题
```

## 打点

```ssh
1、展现  3*downloadbar*firstinview
2、关闭  downloadbar*close
3、下载  downloadbar*download
```
