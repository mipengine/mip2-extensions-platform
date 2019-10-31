# mip-jt-expert-filter

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-expert-filter/mip-jt-expert-filter.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-expert-filter/mip-jt-expert-filter.js)

## 说明

根据业务分类和专家等级进行专家或者机构筛选，适用于金投专家和金投机构


## 示例

示例说明

```
<mip-jt-expert-filter 
  type='mingjia'
  letter='0'
  kind-id='24'
  grade-id='1'
>
<!--用于存放已选条件-->
<div class="select-li clearfix">
  <ul>
  </ul>
</div>
<section class="expert-list top-content">
  <div class="index_tit clearfix search-box">
    <i class="icon"></i>
    <h2 class="fl">推荐专家</h2>
    <span class="sel fr" id="show_chose" on="tap:chose-lightbox.open"><i class="icon4"></i>筛选</span>
  </div>
</section>

<!--弹窗-->
<mip-lightbox
  id="chose-lightbox"
  layout="nodisplay"
  class="mip-hidden">
<div class="sel-box" id="chose_box">
    <div class="sel-top">
        <i class="close-sel-box fl" id="close_chose" on="tap:chose-lightbox.close"></i>
        <span>筛选</span>
    </div>
    <div class="sel-pices">
        <p>按业务分类</p>
        <ul class="clearfix" id="kind-ul">
          <li><span data-value="-1">全部</span></li>
          <li> <span data-value="25">金融</span></li>
          <li class="on b"> <span data-value="24">综合</span></li>
          <li> <span data-value="20">其他</span></li>
          <li> <span data-value="23">大宗商品</span></li>
          <li> <span data-value="19">资管</span></li>
          <li> <span data-value="18">私募</span></li>
          <li> <span data-value="17">信托</span></li>
          <li> <span data-value="16">基金</span></li>
          <li> <span data-value="15">债券</span></li>
          <li> <span data-value="14">房产</span></li>
          <li> <span data-value="13">珠宝</span></li>
          <li> <span data-value="12">银行</span></li>
          <li> <span data-value="11">贷款</span></li>
          <li> <span data-value="10">能源</span></li>
          <li> <span data-value="9">奢侈品</span></li>
          <li> <span data-value="8">收藏品</span></li>
          <li> <span data-value="7">股票</span></li>
          <li> <span data-value="6">期货</span></li>
          <li> <span data-value="5">保险</span></li>
          <li> <span data-value="4">p2p网贷</span></li>
          <li> <span data-value="3">外汇</span></li>
          <li> <span data-value="2">贵金属</span></li>
          <li> <span data-value="1">信用卡</span></li>
          <li> <span data-value="28">美股</span></li>
          <li> <span data-value="27">港股</span></li>
          <li> <span data-value="26">现货</span></li>
          <li> <span data-value="22">原油</span></li>
          <li> <span data-value="21">财经</span></li>
        </ul>
    </div>
    <div class="sel-pices">
        <p>按专家等级</p>
        <ul class="clearfix" id="grade-ul">
          <li><span data-value="-1">全部</span></li>
          <li><span data-value="0">普通专家</span></li>
          <li class="on v"><span data-value="1">黄金vip</span></li>
          <li><span data-value="2">铂金vip</span></li>
          <li><span data-value="3">铂金vip</span></li>
          <li><span data-value="4">铂金vip</span></li>
        </ul>
    </div>
    <div class="sel-bot clearfix">
        <span class="reset" id="reset">重置</span>
        <span class="confirm" id="confirm">完成（<i class="expertCount" id="expert-count">10</i>位专家）</span>
    </div>
    <p class="sel-tips" id="sel-tips"></p>
</div>
</mip-lightbox>
</mip-jt-expert-filter>

```

## 属性

### type

**说明**：当前页面的查询类型

**必选项**：是

**类型**：字符串

**取值范围**：mingjia(专家)、jigou(机构)

### letter

**说明**：当前所在页面的专家或机构首字母

**必选项**：是

**类型**：字符串

**默认值**：无

### kind-id

**说明**：当前所在页面的专家或机构业务类型

**必选项**：是

**单位**：字符串

**默认值**：无

### grade-id

**说明**：当前所在页面的专家或机构等级

**必选项**：是

**单位**：字符串

**默认值**：无