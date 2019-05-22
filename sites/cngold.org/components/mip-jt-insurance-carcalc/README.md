# mip-jt-insurance-carcalc

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-insurance-carcalc/mip-jt-insurance-carcalc.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-insurance-carcalc/mip-jt-insurance-carcalc.js)

## 说明

保险车险计算器功能实现

## 示例

示例说明

```
<mip-jt-insurance-carcalc>
<section class="mt20">
  <div class="index_tit">
    <i class="icon"></i>
    <h2>车险计算器</h2>
  </div>
  <div class="car_insurance_calculator">
    <ul class="car_insurance_ul">
      <li id="div-error-info"></li>
      <li>
        <span>车辆购置价格：(元)</span>
        <input type="text" maxlength="8" id="txt-money">元</td>
      </li>
      <li>
        <span>车辆所在地：</span>
        <span>以<a href="">北京</a>为例</span>
      </li>
      <li>
        <span id="div-calc-info">公司报价: <i id="span-top-company">0</i>元</span>
        <span>公市场价: <i id="span-top-market">0</i>元</span>
      </li>
    </ul>

    <div class="calc_tips" id="calc-tips"></div>

    <h2 style="font-size:.32rem">强制保险</h2>
    <div class="mandatory_insurance">
      <div class="mandatory_insurance_list"> 
        <span class="mandatory_insurance_list_header">强制保险</span>
          <span class="mandatory_insurance_list_radio">
          <span><input type="radio" value="950" name="rdoCompulsory"  class="calc-input rdo-force" checked="checked">家用6座以下</span>
            <span><input type="radio" value="1100" name="rdoCompulsory"  class="calc-input rdo-force">家用6座及以上</span>
         </span>
        <span class="mandatory_insurance_list_footer">
          <input type="text" id="txt-compulsory" readonly="true">
          <i>元</i>
        </span>
      </div>
      <span class="footer">家用6座以下950元/年，家用6座及以上1100元/年</span>
    </div>

    <h2 style="font-size:.32rem">商业保险</h2>
    <div class="car_insurance_list">
      <span class="car_insurance_list_header">
        <em>常规保险合计</em>
          <em><input class="red" type="text"  readonly="true" id="txt-common-total">元</em>
      </span>
      <span class="car_insurance_list_footer"> 
        目前保险公司平均折扣为77%
        </span>
    </div>
    
    <div class="car_insurance_list_radio">
      <span class="car_insurance_list_span">
        <em>
          <input id="chk-third" checked="checked"  class="calc-input" type="checkbox" />
          <label>第三者责任险</label>
        </em>
          <em><input type="text" readonly="true" id="txt-third">元</em>
      </span>
      <div class="car_insurance_list_money">
        <span class="">
          <input type="radio" name="rdo-tpl" value="50000"   class="calc-input rdo-tpl">
          <label>5万</label>
        </span>

        <span class="">
          <input type="radio" name="rdo-tpl" value="100000" checked class="chkTPL calc-input rdo-tpl" >
          <label>10万</label>
        </span>

        <span class="">
          <input type="radio" name="rdo-tpl" value="200000" class="ml5 calc-input rdo-tpl" >
          <label>20万</label>
        </span>

        <span class="">
          <input type="radio" name="rdo-tpl" value="500000" class="calc-input rdo-tpl">
          <label>50万</label>
        </span>

        <span class="">
          <input type="radio" name="rdo-tpl" value="1000000" class="ml5 calc-input rdo-tpl">
          <label>100万</label>
        </span>
        </div>
    </div>

    <div class="car_insurance_list">
      <span class="car_insurance_list_header">
        <em>
          <input id="chk-car-damage" type="checkbox" class="calc-input" checked="checked" />
          车辆损失险
        </em>
          <em><input type="text" readonly="true" id="txt-car-damage">元</em>
      </span>
      <span class="car_insurance_list_footer"> 
        现款购车价格×1.2%
        </span>
    </div>
    <div class="car_insurance_list">
      <span class="car_insurance_list_header">
        <em>
          <input type="checkbox" id="chk-car-theft" class="calc-input" checked="checked" />
          全车盗抢险
        </em>
          <em><input type="text" readonly="true" id="txt-car-theft">元</em>
      </span>
      <span class="car_insurance_list_footer"> 
        新车购置价×1.0%
        </span>
    </div>

    <div class="car_insurance_list">
      <span class="car_insurance_list_header">
        <em>
          <input id="chk-breakage-of-glass" class="calc-input" checked="checked" type="checkbox">
          玻璃单独破碎险
        </em>
          <em><input type="text" class="p-input2" readonly="true" id="txt-breakage-of-glass">元</em>
      </span>
      <span class="car_insurance_list_footer"> 
        进口新车购置价×0.25%，国产新车购置价×0.15%
        </span>
        <span class="car_insurance_list_radio">
        <span>
          <input type="radio" name="rdoBreakageOfGlass" value="0" class="calc-input rdo-glass">
          <label>进口</label>
        </span>
        <span>
          <input type="radio" name="rdoBreakageOfGlass" checked value="1" class="calc-input rdo-glass">
          <label>国产</label>
        </span>
        <span>
    </span></span></div>    

    <div class="car_insurance_list">
      <span class="car_insurance_list_header">
        <em>
          <input class="calc-input" checked="checked" id="chk-selfignite" type="checkbox">
          自燃损失险
        </em>
          <em><input type="text" readonly="true" id="txt-selfignite">元</em>
      </span>
      <span class="car_insurance_list_footer"> 
        新车购置价×0.15%
        </span>
    </div>
    <div class="car_insurance_list">
      <span class="car_insurance_list_header">
        <em>
          <input id="chk-abatement" type="checkbox" class="calc-input" checked="checked">
          不计免赔特约险
        </em>
          <em><input type="text" readonly="true" id="txt-abatement">元</em>
      </span>
      <span class="car_insurance_list_footer"> 
        (车辆损失险+第三者责任险)*20%
        </span>
    </div>
    <div class="car_insurance_list">
      <span class="car_insurance_list_header">
        <em>
          <input id="chk-blameless" class="calc-input" checked="checked" type="checkbox">
          无过责任险
        </em>
          <em><input type="text" readonly="true" id="txt-blameless">元</em>
      </span>
      <span class="car_insurance_list_footer"> 
        第三者责任险保险费×20%
        </span>
    </div>
    <div class="car_insurance_list">
      <span class="car_insurance_list_header">
        <em>
          <input id="chk-limit-of-passenger" class="calc-input" checked="checked" type="checkbox">
          车上人员责任险
        </em>
          <em><input type="text" readonly="true" class="calc-input" id="txt-limit-of-passenger">元</em>
      </span>
      <span class="car_insurance_list_footer"> 
        每人保费50元,可根据车辆的实际座位数填写
        </span>
    </div>  

    <div class="car_insurance_list_radio">
      <span class="car_insurance_list_span">
        <em>
          <input id="chk-car-damage-dw" class="calc-input" checked="checked" type="checkbox">
          <label>车身划痕险</label>
        </em>
          <em><input type="text" readonly="true" id="txt-car-damage-dw" value="0">元</em>
      </span>
      <span class="second_header">赔付额度</span>
      <div class="car_insurance_list_money">
        <span class="">
          <input type="radio" name="rdo-car-damage-dw" value="2000" class="calc-input rdo-dw" >
          <label>2千</label>
        </span>

        <span class="">
          <input type="radio" name="rdo-car-damage-dw" value="5000" checked class="calc-input rdo-dw">
          <label>5千</label>
        </span>

        <span class="">
          <input type="radio" name="rdo-car-damage-dw" value="10000" class="calc-input rdo-dw">
          <label>1万</label>
        </span>

        <span class="">
          <input type="radio" name="rdo-car-damage-dw" value="20000" class="calc-input rdo-dw">
          <label>2万</label>
        </span>

        <span class="">
          <input type="radio" name="rdo-car-damage-dw" value="1000000" class="ml5" class="calc-input rdo-dw">
          <label>100万</label>
        </span>
        </div>
    </div>
  </div>
</section>
</mip-jt-insurance-carcalc>
```

## 属性

无
