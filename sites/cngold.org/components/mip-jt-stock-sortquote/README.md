# mip-jt-stock-sortquote

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-sortquote/mip-jt-stock-sortquote.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-sortquote/mip-jt-stock-sortquote.js)

## 说明

股票行情数据展示，分三种页面:行情首页、行情列表页、行情详情页

## 示例

示例说明

```
// 代码示例
<!--首页-沪市A股-->
<mip-jt-stock-sortquote 
	category-id='29' 
	container-id='sha' 
	page-size='5'
	ids='q63,q80,q1,q3'
	type='index'
></mip-jt-stock-sortquote>
<section>
	<div class="index_tit clearfix">
		<i class="icon"></i>
		<h2><a href="https://m.cngold.org/stock/m_quote_sha.html" title="沪市A股">沪市A股</a></h2>
		<p class="aLinks fr">
			<a href="https://m.cngold.org/stock/m_quote_sza.html" title="深市A股">深市A股</a>
			<a href="https://m.cngold.org/stock/m_quote_agu.html" title="沪深A股">沪深A股</a>
		</p>
	</div>
	
	<div class="tab_list tab_list1">
		<dl class="tab_head clearfix">
			<dd class="w26">名称</dd>
			<dd>最新价</dd>
			<dd>涨跌幅</dd>
			<dd>开盘价</dd>
			<dd>最高价</dd>
		</dl>
		<div id="sha"></div>
		<div class="view_more"><a href="https://m.cngold.org/stock/m_quote_sha.html" title="查看更多沪市A股">查看更多沪市A股<i class="icon"></i></a></div>  
	</div>
</section>

<!--详情页-相关指数行情行情-->
<mip-jt-stock-sortquote 
	category-id='442' 
	container-id='quotationList' 
	page-size='10'
	ids='q63,q80,q60,q61'
	type='detail'
></mip-jt-stock-sortquote>
<section class="mt20">
	<div class="index_tit bold">
		<h2><a href="https://m.cngold.org/stock/m_quote_hszs.html" title="相关指数">相关指数</a></h2>
	</div>
	
	<div class="tab_list tab_list3">
		<dl class="tab_head clearfix">
			<dd>股票名称</dd>
			<dd>最新价</dd>
			<dd>涨跌幅</dd>
			<dd>成交量</dd>
			<dd>成交额</dd>
		</dl>		
		<div id="quotationList">
		</div>
	</div>
	<div class="view_more"><a href="https://m.cngold.org/stock/m_quote_hszs.html" title="查看更多相关指数行情">查看更多相关指数行情<i class="icon"></i></a></div>
</section>


<!--列表页-沪深指数-->
<mip-jt-stock-sortquote 
	category-id='442' 
	container-id='stockQuoteList' 
	list-id='stockList'
	page-size='10'
	ids='q63,q70,q80,q60,q61,q1,q3,q4,q2'
	type='list'
></mip-jt-stock-sortquote>
<section class="mt20">
	<div class="index_tit bold">
		<h2><a href="https://m.cngold.org/stock/m_quote_hszs.html" title="沪深指数">沪深指数</a></h2>
	</div>
	<div class="clearfix hangqing_bigbox hszs_box">
		<div id="stockList" class="hangqing_left fl">
			<span>股票名称</span>
		</div>

		<div class="swiper-container hangqing_right fl">
			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<div class="canshu_name">
						<ul class="clearfix">
							<li><span>最新价</span></li>  <li><span>涨跌额 </span></li>
							<li><span>涨跌幅</span></li>  <li><span>成交量</span></li>  
							<li><span>成交额</span></li>	 <li><span>开盘价</span></li>
							<li><span>最高价</span></li>  <li><span>最低价</span></li>
							<li><span>昨收价</span></li>
						</ul>
					</div>

					<div class="shuju_content">
						<table id="stockQuoteList" width="100%" border="0" cellspacing="0" cellpadding="0" class="sjhq_table">
						</table>
					</div>
				</div>
			</div>	
		</div>
	</div>
</section>

```

## 属性

### type

**说明**：页面类型

**必选项**：是

**类型**：字符串

**取值范围**：index,list,detail

**默认值**：无

### pageSize

**说明**：所取数据条数

**必选项**：是

**类型**：字符串

**默认值**：无

### ids

**说明**：所要展示的字段，多个字段用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无

### category-id

**说明**：所要查询的行情种类id，多个id用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无

### container-id

**说明**：行情数据列表容器id

**必选项**：是

**类型**：字符串

**默认值**：无

### list-id

**说明**：行情数据名称列表容器id

**必选项**：当type值为list时为必选项，其余情况不填

**类型**：字符串

**默认值**：无

## 注意事项

1.参数ids在赋值时无需传q68(股票代码)和q67(股票名称)，组件中已做处理



