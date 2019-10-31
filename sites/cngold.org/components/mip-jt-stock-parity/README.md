# mip-jt-stock-parity

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-parity/mip-jt-stock-parity.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-parity/mip-jt-stock-parity.js)

## 说明

股票比价表格数据展示（上证AB股比价、深证AB股比价、AH股比价）

## 示例

示例说明

```
// 代码示例
<!-- AH股比价 -->
<mip-jt-stock-parity list-num='3' list-id='ahbjList' table-id='ahbjTable'></mip-jt-stock-parity>
<div class="index_tit clearfix">
	<h2>AH股比价</h2>
</div>
<div class="clearfix hangqing_bigbox ahgu_box">
	<div id="ahbjList" class="hangqing_left fl">
		<span>名称</span>
	</div>
	<div class="swiper-container hangqing_right fl">
		<div class="swiper-wrapper">
			<div class="swiper-slide">
				<div class="canshu_name">
					<ul class="clearfix">
						<li><span>A股代码</span></li>  <li><span>最新价(RMB)</span></li>
						<li><span>涨跌幅</span></li>  <li><span>H股代码</span></li>  
						<li><span>最新价(HKD)</span></li>	 <li><span>涨跌幅</span></li>
						<li><span>比价(A/H)</span></li>  <li><span>溢价(A/H)</span></li>
					</ul>
				</div>

				<div class="shuju_content">
					<table id="ahbjTable" width="100%" border="0" cellspacing="0" cellpadding="0" class="sjhq_table">
					</table>
				</div>
			</div>
		</div>	
	</div>
</div>
```

## 属性

### list-num

**说明**：比价查询种类，1--上证AB股比价，2--深证AB股比价，3--AH股比价

**必选项**：是

**类型**：字符串

**取值范围**：1,2,3

**单位**：无

**默认值**：无

### list-id

**说明**：比价查询名称列表容器id

**必选项**：是

**类型**：字符串

**单位**：无

**默认值**：无

### table-id

**说明**：比价查询表格容器id

**必选项**：是

**类型**：字符串

**单位**：无

**默认值**：无
