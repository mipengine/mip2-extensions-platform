# mip-jt-insurance-socialcalc

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-insurance-socialcalc/mip-jt-insurance-socialcalc.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-insurance-socialcalc/mip-jt-insurance-socialcalc.js)

## 说明

社保计算器功能实现，需依赖于data/rate.js

## 示例

示例说明

```
<mip-jt-insurance-socialcalc>
<section class="calculator w-counter mb26">
  <div class="index_tit">
    <i class="icon"></i> <h2>社保计算器</h2>
  </div>
  <div class="jsq-content1">
    <div class="clearfix jsq-content1-2 select_city">
      <span>所在城市：</span>
      <div class="input-box ">
        <input name="do" id="city-input" placeholder="请选择城市" type="text" value="" readonly="readonly">
        <div class="all_city" id="city-select">
          <div class="select_layer">
            <ul class="clearfix" id="city-ul">
              <li >北京</li>
              <li>上海</li>
              <li>广州</li>
              <li>南京</li>
              <li>杭州</li>
              <li>济南</li>
              <li>郑州</li>
              <li>沈阳</li>
              <li>武汉</li>
              <li>成都</li>
              <li>重庆</li>
              <li>东莞</li>
              <li>福州</li>
              <li>哈尔滨</li>
              <li>昆明</li>
              <li>南昌</li>
              <li>青岛</li>
              <li>苏州</li>
              <li>深圳</li>
              <li>天津</li>
              <li>无锡</li>
              <li>厦门</li>
              <li>珠海</li>
              <li>潍坊</li>
              <li>其他</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="clearfix jsq-content1-2">
      <span>税前收入：</span>
      <div class="input-box">
        <input placeholder="请输入金额" type="text" id="pretax-income">
      </div>
    </div>
    <div class="clearfix jsq-content1-3 operate">
      <span id="calc-btn" >开始计算</span>  
    </div>
  </div>
  <div class="calc_tips" id="calc-tips"></div>
  <div class="jsq-content2">
    <div class="jsq-content2-title">计算结果</div>
    <div class="sb-result">
      <div class="item-sytle-1 clearfix">
        <span>社保基数：</span>
        <div class="input-box"><input name="do" id="social-security-base" type="text"  disabled="disabled"/></div>
      </div>
      <div class="item-sytle-2 clearfix">
        <span class="low">最低值：</span>
        <div class="input-box"><p id="pension-min" name="" type="text" disabled="disabled"></p></div>
        <span class="high">最高值：</span>
        <div class="input-box"><p id="pension-max" name="" type="text" disabled="disabled" ></p></div>
      </div>
    </div>
    <div class="sb-result">
      <div class="item-sytle-1 clearfix">
        <span>公积金基数：</span>
        <div class="input-box"><input name="do" type="text" id="provident-fund-base" disabled="disabled" /></div>
      </div>
      <div class="item-sytle-2 clearfix">
        <span class="low">最低值：</span>
        <div class="input-box"><p id="provident-fund-min" name="" type="text" disabled="disabled" ></p></div>
        <span class="high">最高值：</span>
        <div class="input-box"><p id="provident-fund-max" name="" type="text" disabled="disabled" ></p></div>
      </div>
    </div>
    <div class="sb-result">
      <div class="item-sytle-1 clearfix">
        <span>个人缴费总额：</span>
        <div class="input-box"><span id="personal-fee-total"  name="" type="text" disabled="disabled" ></span></div>
        <b>元</b>
      </div>
      <div class="item-sytle-3 clearfix">
        <span>养老：</span>
        <div class="input-box"><input name="do" id="pension-rate" type="text"  disabled="disabled"/></div>
        <b></b>
        <span>工伤：</span>
        <div class="input-box"><input name="do" id="injury-rate"  disabled="disabled"/></div>
        <b></b>
      </div>
      <div class="item-sytle-3 clearfix">
        <span>医疗：</span>
        <div class="input-box"><input name="do" type="text" id="medical-rate"  disabled="disabled"/></div>
        <b></b>
        <span>失业：</span>
        <div class="input-box"><input name="do" id="unemployment-rate" type="text" disabled="disabled"/></div>
        <b></b>
      </div>
      <div class="item-sytle-3 clearfix">
        <span>生育：</span>
        <div class="input-box"><input name="do" id="fertility-rate" type="text" disabled="disabled" /></div>
        <b></b>
        <span>公积金：</span>
        <div class="input-box"><input name="do" type="text" id="provident-fund-rate" disabled="disabled"/></div>
        <b></b>
      </div>
    </div>
    <div class="sb-result">
      <div class="item-sytle-1 clearfix">
        <span>单位缴费总额：</span>
        <div class="input-box"><span id="company-fee-total"  name="" type="text" disabled="disabled" ></span></div>
        <b>元</b>
      </div>
      <div class="item-sytle-3 clearfix">
        <span>养老：</span>
        <div class="input-box"><input name="do" type="text" id="pension-company-rate" disabled="disabled"/></div>
        <b></b>
        <span>工伤：</span>
        <div class="input-box"><input name="do" type="text" id="injury-company-rate" disabled="disabled"/></div>
        <b></b>
      </div>
      <div class="item-sytle-3 clearfix">
        <span>医疗：</span>
        <div class="input-box"><input name="do" type="text" id="medical-company-rate" disabled="disabled"/></div>
        <b></b>
        <span>失业：</span>
        <div class="input-box"><input name="do" type="text" id="unemployment-company-rate" disabled="disabled"/></div>
        <b></b>
      </div>
      <div class="item-sytle-3 clearfix">
        <span>生育：</span>
        <div class="input-box"><input name="do" type="text" id="fertility-company-rate" disabled="disabled"/></div>
        <b></b>
        <span>公积金：</span>
        <div class="input-box"><input name="do" type="text" id="provident-fund-company-rate" disabled="disabled"/></div>
        <b></b>
      </div>
    </div>
  </div>
</section>
</mip-jt-insurance-socialcalc>
```

## 属性

无