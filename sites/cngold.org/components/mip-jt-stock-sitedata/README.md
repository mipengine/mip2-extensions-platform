# mip-jt-stock-sitedata

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-sitedata/mip-jt-stock-sitedata.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-sitedata/mip-jt-stock-sitedata.js)

## 说明

股票证券公司营业网点--根据城市名查询对应网点数据

## 示例

示例说明

```
// 代码示例
<mip-jt-stock-sitedata city-name='北京' container-id='content_ul_list'></mip-jt-stock-sitedata>
<section class="mt20">
	<p class="searchLine clearfix">
		<span class="cityNow"><a hrft="https://m.cngold.org/stock/m_wangdian_0_0_585.html"><i class="icon"></i>北京</a></span>
		<span class="searchEnt"><a href="https://m.cngold.org/stock/m_wangdian_company/"><i class="icon"></i>按公司查找</a></span>
		<span class="cityChange"><a href="https://m.cngold.org/stock/m_wangdian_city/"><i class="icon"></i>切换城市</a></span>
	</p>
	<ul class="yywd_list" id="content_ul_list">
	
	</ul>
	<div class="view_more upload-more"><a href="https://m.cngold.org/stock/m_wangdian.html">查看更多</a></div>
</section>
```

## 属性

### city-name

**说明**：城市名称

**必选项**：是

**类型**：字符串

**默认值**：无

### container-id

**说明**：容器id

**必选项**：是

**类型**：字符串

**默认值**：无
