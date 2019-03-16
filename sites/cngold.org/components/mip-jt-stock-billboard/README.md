# mip-jt-stock-billboard

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-billboard/mip-jt-stock-billboard.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-billboard/mip-jt-stock-billboard.js)

## 说明

股票龙虎榜数据展示

## 示例

示例说明

```
// 代码示例
<mip-jt-stock-billboard></mip-jt-stock-billboard>
<section class="mt20">
	<mip-vd-tabs>
		<ul class="clearfix" id="billboardStyle">
			<li class="on" value="0">全部</li>
			<li value="1">沪市龙虎榜</li>
			<li value="2">深市龙虎榜</li>
		</ul>
		<div class="lhb_con2 pb5">
			<div class="clearfix hangqing_bigbox">
				<div class="hangqing_left fl" id="all1">
					<span>股票名称</span>
				</div>
				<div class="swiper-container hangqing_right fl">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div class="canshu_name">
								<ul class="clearfix">
									<li><span>解读</span></li>  <li><span>收盘价</span></li>
									<li><span>涨跌幅</span></li>  <li><span>龙虎榜净<br />买额</span></li>
									<li><span>龙虎榜卖出<br />额（万）</span></li>  <li><span>龙虎榜成交<br />额（万）</span></li>
									<li><span>市场总成交<br />额（万）</span></li>	 <li><span>净买额占总<br />成交比</span></li>
									<li><span>成交额占总<br />成交比</span></li>	 <li><span>换手率</span></li>
									<li><span>流通市值<br />（亿）</span></li>
								</ul>
							</div>

							<div class="shuju_content">
								<table width="100%" border="0" cellspacing="0" cellpadding="0" class="sjhq_table" id="all2">
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--表格结束-->		   
			<div class="view_more" ><a href="">加载更多沪市龙虎榜<i class="icon"></i></a></div>		  
		</div>
		<div class="lhb_con2 pb5">
			<div class="clearfix hangqing_bigbox">
				<div class="hangqing_left fl" id="hushi1">
					<span>股票名称</span>
				</div>
				<div class="swiper-container hangqing_right fl">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div class="canshu_name">
								<ul class="clearfix">
									<li><span>解读</span></li>  <li><span>收盘价</span></li>
									<li><span>涨跌幅</span></li>  <li><span>龙虎榜净<br />买额</span></li>
									<li><span>龙虎榜卖出<br />额（万）</span></li>  <li><span>龙虎榜成交<br />额（万）</span></li>
									<li><span>市场总成交<br />额（万）</span></li>	 <li><span>净买额占总<br />成交比</span></li>
									<li><span>成交额占总<br />成交比</span></li>	 <li><span>换手率</span></li>
									<li><span>流通市值<br />（亿）</span></li>
								</ul>
							</div>

							<div class="shuju_content">
								<table width="100%" border="0" cellspacing="0" cellpadding="0" class="sjhq_table" id="hushi2">
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--表格结束-->		   
			<div class="view_more" ><a href="">加载更多沪市龙虎榜<i class="icon"></i></a></div>		  
		</div>
		<div class="lhb_con3 pb5">
			<div class="clearfix hangqing_bigbox">
				<div class="hangqing_left fl" id="shenshi1">
					<span>股票名称</span>
				</div>
				<div class="swiper-container hangqing_right fl">
					<div class="swiper-wrapper">
						<div class="swiper-slide">
							<div class="canshu_name">
								<ul class="clearfix">
									<li><span>解读</span></li>  <li><span>收盘价</span></li>
									<li><span>涨跌幅</span></li>  <li><span>龙虎榜净<br />买额</span></li>
									<li><span>龙虎榜卖出<br />额（万）</span></li>  <li><span>龙虎榜成交<br />额（万）</span></li>
									<li><span>市场总成交<br />额（万）</span></li>	 <li><span>净买额占总<br />成交比</span></li>
									<li><span>成交额占总<br />成交比</span></li>	 <li><span>换手率</span></li>
									<li><span>流通市值<br />（亿）</span></li>
								</ul>
							</div>

							<div class="shuju_content">
								<table width="100%" border="0" cellspacing="0" cellpadding="0" class="sjhq_table" id="shenshi2">
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--表格结束-->		   
			<div class="view_more" ><a href="">加载更多沪市龙虎榜<i class="icon"></i></a></div>		  
		</div>

	</mip-vd-tabs>
</section>

```

## 属性

无

## 注意事项

该组件仅用于龙虎榜页面，其余页面不适用