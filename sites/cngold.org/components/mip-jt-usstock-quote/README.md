# mip-jt-usstock-quote

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-usstock-quote/mip-jt-usstock-quote.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-usstock-quote/mip-jt-usstock-quote.js)

## 说明

美股行情数据展示

## 示例

示例说明

```
// 代码示例
<mip-jt-usstock-quote
	code="JO_211360"
	ids="q63,q70,q80,q1,q2,q3,q4,time"
></mip-jt-usstock-quote>
<div class="clearfix mglr30 mt10">
	<dl class="hqy_dl fl">
		<dt id="JO_211360_q63">-</dt>
		<dd class="hqy_dd1"><span id="JO_211360_q70">-</span><span id="JO_211360_q80">-</span></dd>
		<dd class="hqy_dd2">交易中</dd>
	</dl>

	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="hqy_table fr">
		<tr>
			<td align="left" valign="middle">最高<span id="JO_211360_q3">-</span></td>
			<td align="right" valign="middle">今开<span id="JO_211360_q1">-</span></td>
		</tr>
		<tr>
			<td align="left" valign="middle">最低<span id="JO_211360_q4">-</span></td>
			<td align="right" valign="middle">昨收<span id="JO_211360_q2">-</span></td>
		</tr>
		<tr>
			<td colspan="4" valign="middle"  id="JO_211360_time">更新时间：</td>
		</tr>
	</table>
</div>
```

## 属性

### code

**说明**：行情code

**必选项**：是

**类型**：字符串

**默认值**：无

### ids

**说明**：所要展示的行情字段，中间用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无
