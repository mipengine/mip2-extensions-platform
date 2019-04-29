# mip-jt-lux-starsearch

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-lux-starsearch/mip-jt-lux-starsearch.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-lux-starsearch/mip-jt-lux-starsearch.js)

## 说明

奢侈品明星库搜索功能

## 示例

示例说明

```
// 代码示例
<mip-jt-lux-starsearch
  search-input="search_input"
  search-list="search_list"
></mip-jt-lux-starsearch>
<div class="index_tit clearfix">
  <i class="icon"></i>
  <h2>
    <a href="http://m.cngold.org/lux/m_mingliu.html" title="明星库">明星库</a>
  </h2>
  <div class="star_search fr">
    <mip-form url="http://m.cngold.org/lux/m_mingliu.html" method="get">
      <input type="text" placeholder="请输入姓名查找" id="search_input" value="">
    </mip-form>
    <i class="m_luxbg"></i>
    <ul class="star_search_list" id="search_list"></ul>
  </div>
</div>
```

## 属性

### search-input

**说明**：搜索框对应id

**必选项**：是

**类型**：字符串

**默认值**：无

### search-list

**说明**：搜索结果容器id

**必选项**：是

**类型**：字符串

**默认值**：无
