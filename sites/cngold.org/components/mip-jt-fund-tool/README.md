# mip-jt-fund-tool

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-fund-tool/mip-jt-fund-tool.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-fund-tool/mip-jt-fund-tool.js)

## 说明

基金计算器功能实现，包括基金收益计算器、基金赎回费用计算器、基金持有期计算器、基金申购费用计算器

## 示例

示例说明

```
<!--基金收益-->
<mip-jt-fund-tool type="fundIncome">
<section class="calculator">
  <div class="index_tit">
    <i class="icon"></i>
    <h2>基金收益计算器</h2>
  </div>
  <mip-form class="my_form" url="https://m.cngold.org/fund/m_jjsy.html" method="get">
  <div class="common_form">
    <div>
      <label>投入本金（元）：</label>
      <input id="invest" type="text" class="calc-input" placeholder="请输入投入本金">
    </div>
    <div>
      <label>收回本金（元）：</label>
      <input id="recovery" type="text" class="calc-input" placeholder="请输入收回本金">
    </div>
    <div>
      <label>持有期限（天）：</label>
      <input id="holdday" type="text" class="calc-input" placeholder="请输入持有期限">
    </div>
    <div class="jsq_btns">
      <input type="button" class="calc_btn" id="calc-btn" value="计 算">
      <input type="button" class="clean_btn" id="clean-btn" value="清 除">
    </div>
  </div>
  <div id="calc-tips" class="calc_tips"></div>
  <div class="common_form">
    <div>
      <label>持有期总收益率：</label>
      <span class="result red"><em id="total-rate" class="calc-input"></em>%</span>
    </div>
    <div>
      <label>持有期年化收益率：</label>
      <span class="result red"><em id="year-rate" class="calc-input"></em>%</span>
    </div>
    
    <div class="tips_inform">
      <span>计算介绍：</span>基金收益是基金资产在运作过程中所产生的超过自身价值的部分。具体地说，基金收益包括基金投资所得红利、股息、债券利息、买卖证券价差、存款利息和其他收入。
    </div>
  </div>
  </mip-form>
</section>
</mip-jt-fund-tool>

```

## 属性

### type

**说明**：用于指定计算器的类型

**必选项**：是

**类型**：字符串

**取值范围**：fundIncome（基金收益计算器）、 fundRedeem（基金赎回费用计算器）、 fundHoldday（基金持有期计算器）、 fundPurchase（基金申购费用计算器）