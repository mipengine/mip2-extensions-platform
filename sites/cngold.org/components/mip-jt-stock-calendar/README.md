# mip-jt-stock-calendar

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-calendar/mip-jt-stock-calendar.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-calendar/mip-jt-stock-calendar.js)

## 说明

股票新股日历--加载选中日期的数据

## 示例

示例说明

```
// 代码示例
<mip-jt-stock-calendar></mip-jt-stock-calendar>
<time class="time_content bg_fff">
	<ul class="time_week clearfix" id="time_box">
		<li class="on" id="2019-03-01"><span>星期五</span><p>03/01</p></li>
		<li id="2019-03-04"><span>星期一</span><p>03/04</p></li>
		<li id="2019-03-05"><span>星期二</span><p>03/05</p></li>
		<li id="2019-03-06"><span>星期三</span><p>03/06</p></li>
		<li id="2019-03-07"><span>星期四</span><p>03/07</p></li>
		<li id="2019-03-08"><span>星期五</span><p>03/08</p></li>
		<li id="2019-03-11"><span>星期一</span><p>03/11</p></li>
		<li id="2019-03-12"><span>星期二</span><p>03/12</p></li>
	</ul>
</time>

<div class="xgrl_box1"><span id="sg">0</span>新股申购，<span id="ss">0</span> 新股上市</div>

<section class="pdlr30">
	<div class="shuju_box1 clearfix">
		<b>申购</b>
		<div class="shuju_box1_1 fl" id="sg_list">
				<p>无</p>
		</div>
	</div>

	<div class="shuju_box1 clearfix">
		<b>上市</b>
		<div class="shuju_box1_1 fl" id="ss_list">
				<p>无</p>
		</div>
	</div>

	<div class="shuju_box1 clearfix">
		<b>中签号</b>
		<div class="shuju_box1_1 fl" id="zqh_list">
				<p>无</p>
		</div>
	</div>

	<div class="shuju_box1 clearfix">
		<b>中签率</b>
		<div class="shuju_box1_1 fl" id="zql_list">
				<p>无</p>
		</div>
	</div>
</section>
```

## 属性

无

## 注意事项

该组件仅适用于新股日历页面，其余页面不适用