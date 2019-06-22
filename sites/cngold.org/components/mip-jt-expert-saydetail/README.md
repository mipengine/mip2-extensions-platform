# mip-jt-expert-saydetail

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-expert-saydetail/mip-jt-expert-saydetail.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-expert-saydetail/mip-jt-expert-saydetail.js)

## 说明

专家说说详情页--获取说说内容、点赞情况和评论列表

## 示例

示例说明

```
<mip-jt-expert-saydetail
  say-id="27342"
  member-id="831301"
>
<section id="per-main" class="per-main clearfix">
  <div class="user_list">
    <ul id="member-say" class="user_li clearfix">
    </ul>
  </div>
</section>
<section class="per-main">
  <div id="agree" class="zan_pnum clearfix">
    <i class="num_icon fl"></i>
  </div>
</section>
<section class="per-main">
  <div class="user_list">
    <ul id="comment" class="user_li clearfix">
    </ul>
  </div>
</section>
</mip-jt-expert-saydetail>

```

## 属性

### say-id

**说明**：所要查询的说说对应id

**必选项**：是

**类型**：字符串

**默认值**：无

### member-id

**说明**：所要查询的说说对应的专家id

**必选项**：是

**类型**：字符串

**默认值**：无
