# mip-jt-stock-tool

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-tool/mip-jt-stock-tool.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-stock-tool/mip-jt-stock-tool.js)

## 说明

股票相关计算器（股票卖出手续费计算器、股票收益率计算器、股票收益计算器）的计算

## 示例

示例说明

```
// 代码示例
<div class="index_tit clearfix">
    <h2>股票收益率计算器</h2>
</div>
<mip-jt-stock-tool type="gpsyl"></mip-jt-stock-tool>
<mip-form name="stock_2" method="get" url="https://m.cngold.org/stock/m_tool_gpsyl.html">
<div class="tool_con mglr30">
    <dl class="tool_dl clearfix">
        <dt>股票价格：</dt>
        <dd><input name="edprice" id="edprice" type="text" class="input_text"> 元</dd>
    </dl>
    <dl class="tool_dl clearfix">
        <dt class="lih11">企业每股税后利润：</dt>
        <dd><input name="edone" id="edone" type="text" class="input_text"> 元</dd>
    </dl>
    <div class="tool_btn">
        <input type="button" value="开始计算" id="calc_gpsyl" class="tool_btn01">
        <input type="reset" value="重新计算" id="reset_gpsyl" class="tool_btn02">
    </div>
    <!-- 提示框
    <div id="tips">
    <p id="tips_p"></p>
    </div> -->
</div>
<div class="tool_con03">
    <p class="tool_tit">计算结果：</p>
    <dl class="tool_dl clearfix mt20">
        <dt>股票市盈率：</dt>
        <dd><input name="edresult" id="edresult" disabled="disabled" value="" type="text" class="input">%</dd>
    </dl>
</div>
</mip-form>


```

## 属性

### type

**说明**：股票计算器的类型

**必选项**：是

**类型**：字符串

**取值范围**：gpmcsxf,gpsyl,gpsy

**单位**：无

**默认值**：无

