# mip-jt-stock-quote

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-quote/mip-jt-stock-quote.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-quote/mip-jt-stock-quote.js)

## 说明

股票行情数据展示

## 示例

示例说明

```
// 代码示例
<!--基本用法：只获取数据，eg：沪深港通-->
<mip-jt-stock-quote codes='JO_97602,JO_886,JO_222068,JO_96858,JO_6355' ids='q67,q63,q80,q1,q3'></mip-jt-stock-quote>
<section class="mt20">
	<div class="index_tit clearfix">
		<i class="icon"></i>
		<h2><a href="https://m.cngold.org/stock/m_quote_hsgt.html" title="沪深港通">沪深港通</a></h2>
		<p class="aLinks fr">
			<a href="https://m.cngold.org/stock/m_quote_shabbj.html" title="上证AB股比价">上证AB股比价</a>
			<a href="https://m.cngold.org/stock/m_quote_szabbj.html" title="深证AB股比价">深证AB股比价</a>
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
		<div id="hsgt">
			<dl class="clearfix mglr30">
				<dd class="w26">
					<a href="" class="blue mc" id="JO_97602_q67"></a>
				</dd>
				<dd id="JO_97602_q63"></dd>
				<dd id="JO_97602_q80"></dd>
				<dd id="JO_97602_q1"></dd>
				<dd id="JO_97602_q3"></dd>
			</dl>
			<dl class="clearfix mglr30">
				<dd class="w26">
					<a href="" class="blue mc" id="JO_886_q67"></a>
				</dd>
				<dd id="JO_886_q63"></dd>
				<dd id="JO_886_q80"></dd>
				<dd id="JO_886_q1"></dd>
				<dd id="JO_886_q3"></dd>
			</dl>
			<dl class="clearfix mglr30">
				<dd class="w26">
					<a href="" class="blue mc" id="JO_222068_q67"></a>
				</dd>
				<dd id="JO_222068_q63"></dd>
				<dd id="JO_222068_q80"></dd>
				<dd id="JO_222068_q1"></dd>
				<dd id="JO_222068_q3"></dd>
			</dl>
			<dl class="clearfix mglr30">
				<dd class="w26">
					<a href="" class="blue mc" id="JO_96858_q67"></a>
				</dd>
				<dd id="JO_96858_q63"></dd>
				<dd id="JO_96858_q80"></dd>
				<dd id="JO_96858_q1"></dd>
				<dd id="JO_96858_q3"></dd>
			</dl>
			<dl class="clearfix mglr30">
				<dd class="w26">
					<a href="" class="blue mc" id="JO_6355_q67"></a>
				</dd>
				<dd id="JO_6355_q63"></dd>
				<dd id="JO_6355_q80"></dd>
				<dd id="JO_6355_q1"></dd>
				<dd id="JO_6355_q3"></dd>
			</dl>
		</div>
		<div class="view_more"><a href="https://m.cngold.org/stock/m_quote_hsgt.html" title="查看更多沪深港通">查看更多沪深港通<i class="icon"></i></a></div>  
	</div>
</section>

<!--需要背景-->
<mip-jt-stock-quote codes='JO_939' ids='q63,q80,q70,q1,q2,q3,q4,q60,q61,q59' bg='1'></mip-jt-stock-quote>
<section id="showBg" class="hq_con bg_green pdlr30">
	<dl class="hq_dl">
		<dt class="clearfix">
			<span class="tit"><a href="https://m.cngold.org/stock/m_200012.html">南玻B(200012)</a></span>
			<span class="fr new" id="reLoad"><i class="icon"></i>刷新</span>
		</dt>
		<dd class="clearfix hq_dd1">
			<span class="zxj fl" id="JO_939_q63">--</span>
		</dd>
		<dd class="clearfix hq_dd2">
			<span class="zde" id="JO_939_q70">--</span>
			<span class="zdf" id="JO_939_q80" >--</span>
			
			<span class="fr time" id="JO_939_q59">--</span>
			<span id="sp" class="fr kpzt">已收盘</span>
		</dd>
	</dl>
	
	<ul class="hq_ul clearfix">
		<li class="clearfix">
			<span class="tit">最高</span>
			<span class="con" id="JO_939_q3">--</span>
		</li>
		<li class="clearfix">
			<span class="tit">最低</span>
			<span class="con" id="JO_939_q4">--</span>
		</li>
		<li class="clearfix">
			<span class="tit">今开</span>
			<span class="con" id="JO_939_q1">--</span>
		</li>
		<li class="clearfix">
			<span class="tit">昨收</span>
			<span class="con" id="JO_939_q2">--</span>
		</li>
		<li class="clearfix">
			<span class="tit">成交额</span>
			<span class="con" id="JO_939_q61"></span>
		</li>
		<li class="clearfix">
			<span class="tit">成交量</span>
			<span class="con" id="JO_939_q60">--</span>
		</li>
	</ul>	
</section>

```

## 属性

### codes

**说明**：所要查询的行情种类code，多个code用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无

### ids

**说明**：所要展示的字段，多个字段用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无

### bg

**说明**：是否需要设置背景色,设置为'1'代表需要

**必选项**：否

**类型**：字符串

**默认值**：无

**取值范围**：'1','0'
