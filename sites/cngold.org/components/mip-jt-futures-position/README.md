# mip-jt-futures-position

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-futures-position/mip-jt-futures-position.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-futures-position/mip-jt-futures-position.js)

## 说明

期货持仓数据查询

## 示例

示例说明

```
// 代码示例
<mip-jt-futures-position></mip-jt-futures-position>
<section class="mt20">
  <div class="index_tit clearfix">
    <i class="icon"></i>
    <h2>期货持仓</h2>
  </div>

  <div class="f-qhcc-filter">
      <!--交易所选择-->
      <section>
        <div class="jys-choice clearfix">
          <div class="fl text" id="exText">大连期货交易所</div>
          <div class="fr choose-btn">选择交易所</div>
          <input type="hidden" id="exchangeId" value="1"/>
        </div>
        <div class="jys-con pdlr30 hide">
          <ul class="f-a-list f-col2 clearfix">      
              <li class="ex-li on" data-value="1">大连商品交易所</li>
              <li class="ex-li" data-value="2">上海期货交易所</li>
              <li class="ex-li" data-value="4"  >郑州商品交易所</li>
              <li class="ex-li" data-value="5"  >芝加哥期货交易所</li>
          </ul>
        </div>
      </section>
      <!--时间选择-->
      <section>
        <div class="date-choice clearfix">
          <div class="fl text strDate" id="dateText">2019-03-28</div>
          <div class="fr choose-btn">选择日期</div>
        </div>
        <div class="jys-con date-con pdlr30 hide">
          <input type="date" id="dateInput">
        </div>
      </section>
      <!--品种选择-->
      <section>
        <div class="category-choice clearfix">
          <div class="fl text selectVariety" id="kindText">豆粕</div>
          <div class="fr choose-btn">选择品种</div>
          <input type="hidden" id="varietyId" value="62" />
        </div>
        <div class="jys-con pdlr30 hide">
          <ul class="f-a-list f-col3 pl-pr-10 clearfix kindUl" id="kind_1">
              <li class="kind-li"  data-exchangeId="1"  data-value="62">豆粕</li>
              <li class="kind-li" data-exchangeId="1"  data-value="63">豆二</li>
              <li class="kind-li"  data-exchangeId="1"  data-value="64">豆一</li>
              <li class="kind-li hide"  data-exchangeId="2"  data-value="8">螺纹钢</li>
              <li class="kind-li hide"  data-exchangeId="2"  data-value="50">线材</li>
              <li class="kind-li hide"  data-exchangeId="2"  data-value="51">沪铜</li>
              <li class="kind-li hide"  data-exchangeId="2"  data-value="52">沪铝</li>
              <li class="kind-li hide"  data-exchangeId="2"  data-value="53">橡胶</li>
              <li class="kind-li hide"  data-exchangeId="4"  data-value="78">强麦</li>
              <li class="kind-li hide" data-exchangeId="4"  data-value="79">棉花</li>
              <li class="kind-li hide"  data-exchangeId="5"  data-value="94">美豆粕</li>
              <li class="kind-li hide" data-exchangeId="5"  data-value="95">美豆油</li>
          </ul>
        </div>
      </section>
    <div class="search-btn" id="search">开始查询</div>
  </div>
</section>

<!--弹窗-->
<div class="tips-alert"><span>请填写月份</span></div>
<div class="tips-box hide">
    <p>您选择的日期没有数据！！</p>
</div>
<div class="cover hide"></div>
```

## 属性

### 无

## 注意事项

使用时请按照示例中的html结构

### 自定义属性说明
li.ex-li元素
- data-value：每个交易所对应的id

li.kind-li元素
- data-exchangeId：该品种所属的交易所id
- data-value：该品种对应的id
