# mip-jt-xianhuo-hqquote

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-xianhuo-hqquote/mip-jt-xianhuo-hqquote.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-xianhuo-hqquote/mip-jt-xianhuo-hqquote.js)

## 说明

该组件用于获取金投现货品种行情表格数据

## 示例

示例说明

```
// 代码示例
<mip-jt-xianhuo-hqquote
  code="JO_144414"
  pageSize="20"
  unit="元/斤"
  >
<!--价格信息-->
<section class="xh-price-today clearfix mt20">
  <div class="fl">
    <h2><a href="https://m.cngold.org/xianhuo/m_variety_farm_xiangfu.html" id="cateurl" >香附</a></h2>
    <p>当日价格<em id="recentQuotation">--</em></p>
  </div>
  <div class="fr">
    <span id="recentDate" class="date">--</span>
    <br>
    <span id="unit" >单位&nbsp;<em>元/斤</em></span>
  </div>
</section>
<!--价格表-->
<section>
  <table class="hq-table"  id="realtime_quote_asia">
  </table>
</section>
</mip-jt-xianhuo-hqquote>
```

## 属性

### code

**说明**：品种对应code

**必选项**：是

**类型**：字符串

**默认值**：无

### pageSize

**说明**：所需获取的行情条数

**必选项**：是

**类型**：字符串

**默认值**：无

### unit

**说明**：品种对应的单位

**必选项**：是

**类型**：字符串

**默认值**：无

## 注意事项

1，代码示例中的id不可修改（#recentQuotation、#recentDate、#realtime_quote_asia）

