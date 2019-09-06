# mip-jt-wenda-list

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-wenda-list/mip-jt-wenda-list.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-wenda-list/mip-jt-wenda-list.js)

## 说明

金投问答频道获取回答列表数据

## 示例

示例说明

```
// 代码示例
<!--列表1：回答列表-->
<div class="index_tit"><i class="icon"></i><h2>列表1</h2></div>
<mip-jt-wenda-list
  type="top"
  hobby-id=''
>
<section class="mt20">
  <div class="wd_list" id="top-list">
  </div>
</section>
</mip-jt-wenda-list>


```

## 属性

### type

**说明**：指定获取哪种回答列表

**必选项**：是

**类型**：字符串

**取值范围**：top(获取回答列表)、new(获取最新问答列表)、 price(获取高悬赏回答列表)

### hobby-id

**说明**：指定感兴趣的回答列表的id

**必选项**：是

**类型**：字符串

**取值范围**：例如贵金属对应'1'，原油对应'2'，该对应关系可参考m端对应页面
