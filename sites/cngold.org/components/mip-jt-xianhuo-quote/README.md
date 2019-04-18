# mip-jt-xianhuo-quote

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-xianhuo-quote/mip-jt-xianhuo-quote.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-xianhuo-quote/mip-jt-xianhuo-quote.js)

## 说明

现货行情数据展示

## 示例

示例说明

```
// 代码示例
<mip-jt-xianhuo-quote 
	codes="JO_130616,JO_130605,JO_130625,JO_130634,JO_130624"
></mip-jt-xianhuo-quote>
<!--farm-->
<h2>农产品</h2>
<table class="hq-table">
		<thead>
			<tr>	 
				<th width='35%'>名称</th>
				<th >报价</th>
				<th >单位</th>
				<th >产地</th>
				<th >跌涨</th>
			</tr>
		</thead>
		<tbody id="dataList">
			<!-- 5条 -->
				<tr>
					<td><a title="糙米现货价格" href="https://m.cngold.org/xianhuo/m_farm_hq621.html" >糙米</a></td>
					<td class="JO_130616_q63"></td>
					<td>元/公斤</td>
					<td >中国</td>
					<td class="JO_130616_q70"></td>
				</tr>
				<tr>
					<td><a title="色选米现货价格" href="https://m.cngold.org/xianhuo/m_farm_hq628.html" >色选米</a></td>
					<td class="JO_130605_q63"></td>
					<td>元/公斤</td>
					<td >中国</td>
					<td class="JO_130605_q70"></td>
				</tr>
				<tr>
					<td><a title="青豆现货价格" href="https://m.cngold.org/xianhuo/m_farm_hq663.html" >青豆</a></td>
					<td class="JO_130625_q63"></td>
					<td>元/斤</td>
					<td >中国</td>
					<td class="JO_130625_q70"></td>
				</tr>
				<tr>
					<td><a title="红米现货价格" href="https://m.cngold.org/xianhuo/m_farm_hq618.html" >红米</a></td>
					<td class="JO_130634_q63"></td>
					<td>元/公斤</td>
					<td >中国</td>
					<td class="JO_130634_q70"></td>
				</tr>
				<tr>
					<td><a title="大豆现货价格" href="https://m.cngold.org/xianhuo/m_farm_hq41.html" >大豆</a></td>
					<td class="JO_130624_q63"></td>
					<td>元/斤</td>
					<td >中国</td>
					<td class="JO_130624_q70"></td>
				</tr>
		</tbody>
</table>

```

## 属性

### codes

**说明**：所要查询的行情code,多个code用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无