# mip-jt-forex-tool

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-forex-tool/mip-jt-forex-tool.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-forex-tool/mip-jt-forex-tool.js)

## 说明

外汇计算器计算功能，包括外汇点值计算器、外汇利润计算器、外汇保证金计算器、外汇买卖计算器、购汇、结汇

## 示例

示例说明

```
// 代码示例
<mip-jt-forex-tool type='jiehui'></mip-jt-forex-tool>
<section class="section-part">   
  <div class="index_tit">
    <i class="icon"></i>
    <h2>结汇</h2>
  </div>

  <div class="part_con">
    <div class="row clearfix">
      <span>拥有外币形式：</span>
        <p>
          <select class='jiehui_select' id="typename">
            <option value="1">现汇</option>
            <option value="2">现钞</option>
          </select>
          <i></i>
        </p>
        </div>
    <div class="row clearfix">
      <span>卖出金额：</span>
      <p><input type="text" id="sellAmt"></p>
    </div>
    <div class="row clearfix">
      <span>卖出币种：</span>
      <p>
        <select id="fxType2" class='jiehui_select'>
          <option value="GBP">英镑 (GBP)</option>
          <option value="HKD">港币 (HKD)</option>
          <option value="USD" selected="selected">美元 (USD)</option>
          <option value="CHF">瑞士法郎 (CHF)</option>
          <option value="SGD">新加坡元 (SGD)</option>
          <option value="SEK">瑞典克朗 (SEK)</option>
          <option value="DKK">丹麦克朗 (DKK)</option>
          <option value="NOK">挪威克朗 (NOK)</option>
          <option value="JPY">日元 (JPY)</option>
          <option value="CAD">加拿大元 (CAD)</option>
          <option value="AUD">澳大利亚元 (AUD)</option>
          <option value="EUR">欧元 (EUR)</option>
          <option value="MOP">澳门元 (MOP)</option>
          <option value="PHP">菲律宾比索 (PHP)</option>
          <option value="THB">泰国铢 (THB)</option>
          <option value="NZD">新西兰元 (NZD)</option>
          <option value="KRW">韩元 (KRW)</option>
          <option value="RUB">卢布 (RUB)</option>
        </select>
        <i></i>
      </p>
    </div>
    <div class="row clearfix">
      <span>当前汇率：</span>
      <p><input type="text" id="exRate"></p>
    </div>
    <div class="row bg_f5f5f5 mrje">
      <div class="total clearfix">
        可兑换回人民币：<span id="get">0</span>
      </div>
    </div>
  </div>
</section>

```

## 属性

### type

**说明**：计算器的类型

**必选项**：是

**默认值**：无

**类型**：字符串

**取值范围**：whdz,whlr,whbzj,whmm,gouhui,jiehui

## 注意事项

1,其他计算器示例参照example/index.html

2,外汇储蓄计算器使用单独组件mip-jt-forex-savecalc
