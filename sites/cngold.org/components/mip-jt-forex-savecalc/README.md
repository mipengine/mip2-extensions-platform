# mip-jt-forex-savecalc

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-forex-savecalc/mip-jt-forex-savecalc.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-forex-savecalc/mip-jt-forex-savecalc.js)

## 说明

外汇储蓄计算器

## 示例

示例说明

```
// 代码示例
<mip-jt-forex-savecalc></mip-jt-forex-savecalc>
<section class="section-part ">   
	<div class="index_tit">
		<i class="icon"></i>
		<h2>外汇储蓄计算器</h2>
	</div>
	<mip-form method="get" url="http://m.cngold.org/forex/m_jisuanqi_whcx.html">
	<div class="part_con">
		<div class="row clearfix">
			<span>外币种类：</span>
			<p>
				<select id="ccfxType">
					<option value="0">美元</option>
					<option value="1">英镑</option>
					<option value="2">欧元</option>
					<option value="3">日元</option>
					<option value="4">港币</option>
					<option value="5">加拿大元</option>
					<option value="6">瑞士法郎</option>
					<option value="7">澳大利亚元</option>
					<option value="8">新加坡元</option>
				</select>
				<i></i>
			</p>
		</div>
		<div class="row clearfix">
			<span>存款期限种类：</span>
			<p>
				<select id="ccfxTime">
					<option value="0">活期</option>
					<option value="7">七天通知</option>
					<option value="30">一个月</option>
					<option value="90">三个月</option>
					<option value="180">六个月</option>
					<option value="360">一年</option>
					<option value="720">两年</option>
				</select>
				<i></i>
				<input type="hidden" name="ccrd" id="ccrd" value="0">
			</p>
		</div>
		<div class="row clearfix">
			<span>存款金额：</span>
			<p>
				<input type="text" name="ccsaveAmt" id="ccsaveAmt" class="whcx_input">
			</p>
		</div>
		<div class="row clearfix">
			<span>存款年利率：</span>
			<p>
				<input type="text" name="ccyearRate" id="ccyearRate" placeholder="(单位：%)" class="whcx_input">
			</p>
		</div>
		<div id="saveTr">
		<div class="row clearfix">
			<span>存款日期：</span>
			<p>
				<input type="date" name="USER_AGE" class="whcx_input" id="ccsaveDate"/>
			</p>
		</div>
		<div class="row clearfix">
			<span>取款日期：</span>
			<p>
				<input type="date" name="USER_AGE"  class="whcx_input" id="ccfetchDate"/>
			</p>
		</div>
		</div>
		<div class="row bg_f5f5f5 mrje">
			<div class="total clearfix">
				存款利息：<span id="ccunit1">美元</span><span id="ccintAmt">0</span>
				
			</div>
		</div>
		<div class="row bg_f5f5f5 mrje">
			<div class="total clearfix">
				本息合计：<span id="ccunit2">美元</span><span id="ccsum">0</span>
			</div>
		</div>
		<div id="tool_tips">
			<p id="tool_tips_p"></p>
		</div>
	</div>
	</mip-form>
</section>
```

## 属性

无

## 注意事项

该组件仅适用于外汇储蓄计算器