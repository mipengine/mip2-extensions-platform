# mip-jt-insurance-tool

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-insurance-tool/mip-jt-insurance-tool.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-insurance-tool/mip-jt-insurance-tool.js)

## 说明

保险计算器功能实现，包括住房公积金、养老保险、失业保险、工伤保险、生育保险、医疗保险、养老退休金。使用该组件时请按照示例（example）文件夹中的html结构

## 示例

示例说明

```
<mip-jt-insurance-tool
  type="houseFund"
>
<!--计算器-->
<section class="calculator mt20">
  <div class="index_tit">
    <i class="icon"></i>
    <h2>住房公积金缴费计算器</h2>
  </div>
  <mip-form method="get" url="https://m.cngold.org/insurance/m_jisuanqi_gongjijin.html">
  <table cellspacing="0" width="100%">
    <tr>
      <th>您的月工资： </th>
      <td>
        <input class="input_wrap" id="wages" placeholder="0" type="text">
      </td>
    </tr>
    <tr>
      <th>本市职工上年月平均工资： </th>
      <td>
        <input class="input_wrap" id="avg_wages" placeholder="0" type="text">
      </td>
    </tr>
    <tr>
      <th>单位缴存比例(%)： </th>
      <td>
        <input class="input_wrap" id="unit_rate" placeholder="0" type="text">
      </td>
    </tr>
    <tr>
      <th>个人缴存比例(%)：</th>
      <td>
        <input class="input_wrap" id="person_rate" placeholder="0" type="text">
      </td>
    </tr>
  </table>
  <table cellspacing="0" width="100%" class="calc_result">
    <tbody>
      <tr>
        <th id="messg2">今年您每月缴存的住房公积金为：</th>
        <td><input class="input_wrap" id="total_fund" type="text" disabled></td>
      </tr>
      <tr>
        <th>单位缴存： </th>
        <td><input class="input_wrap" id="unit_fund" type="text" disabled></td>
      </tr>
      <tr>
        <th>个人缴存： </th>
        <td><input class="input_wrap" id="person_fund" type="text" disabled></td>
      </tr>
    </tbody>
  </table>
  <div id="calc_tips" class="calc_tips"></div>
  <div class="operate clearfix mglr30">
    <span id="btnCalc" name="btnCalc" class="on fl">开始计算</span>
  </div>
  </mip-form>
</section>
</mip-jt-insurance-tool>
```

## 属性

### type

**说明**：计算器的类型

**必选项**：是

**类型**：字符串

**取值范围**：houseFund（住房公积金）、pension（养老保险）、lostjob（失业保险）、injury（工伤保险）、birth（生育保险）、medical（医疗保险）、retire（养老退休金）

