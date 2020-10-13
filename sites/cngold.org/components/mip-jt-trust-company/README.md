# mip-jt-trust-company

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-trust-company/mip-jt-trust-company.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-trust-company/mip-jt-trust-company.js)

## 说明

信托公司页面根据所选条件展示筛选结果

## 示例

示例说明

```
<mip-jt-trust-company>
<div class="w-add-section mb10  clearfix">
  <div class="select-text">
    <p class="w-add-btn wd1" id="region-search">不限地区<i></i></p>
    <p class="w-safe-btn wd1" id="stock-search">不限股东<i></i></p>
    <p class="w-asset-btn wd2 mr0" id="money-search">不限注册资本<i></i></p>
  </div>

  <div class="select-box">
    <section class="add-btn-box down-box">
      <span id="r-0">不限地区</span>
      <span id="r-1">京津冀</span>
      <span id="r-2">江浙沪</span>
      <span id="r-3">珠三角</span>
      <span id="r-4">其他</span>
    </section>
    <section class="safe-btn-box down-box">
      <span id="s-0">不限股东</span>
      <span id="s-1">央企控股</span>
      <span id="s-2">地方企业控股</span>
      <span id="s-3">金融机构控股</span>
      <span id="s-4">省级政府控股</span>
      <span id="s-5">市级政府控股</span>
    </section>
    <section class="asset-btn-box  down-box">
      <span id="m-0">不限注册资本</span>
      <span id="m-1">10亿以下</span>
      <span id="m-2">10亿-20亿</span>
      <span id="m-3">20亿-30亿</span>
      <span id="m-4">30亿-50亿</span>
      <span id="m-5">50亿以上</span>
    </section>
  </div>
</div>
<section class="section-part" id="company-list">
  <dl class="company_dl mglr30 pdT20 tuijian_dl">
    <dt class="clearfix">
      <div class="fl company_dt_1">
        <a href="https://m.cngold.org/trust/m_company_120.html" title="央企信托" class="clearfix">
          <i class="img_i">
            <mip-img layout="responsive" width="70" height="50" src="https://res.cngoldres.com/upload/trust/2016/0927/db339f87dcc9bb3568aeeab46e0da07b.jpg"></mip-img>
          </i>
          <span>央企信托<br>
            <i class="stock_i">股东背景：</i>
          </span>   
        </a>
      </div>
      <a href="https://m.cngold.org/trust/m_company_120.html" class="fr yywd"><span class="windowopen03">了解详情</span></a>
    </dt>
    <dd class="num clearfix">
      <span class="gray w1">
        <b><em class="red red_f0">0亿</em></b>注册资本
      </span>
      <span class="gray w2">
        <b><em class="red">---</em></b>成立时间
      </span>
      <span class="gray w3">
        <b><em class="red">---</em></b>所在地
      </span>
      <span class="gray w4 br0">
        <b><em class="red">5只</em></b>旗下产品
      </span>
    </dd>
  </dl>
  <dl class="company_dl mglr30 pdT20 tuijian_dl">
    <dt class="clearfix">
      <div class="fl company_dt_1">
        <a href="https://m.cngold.org/trust/m_company_120.html" title="央企信托" class="clearfix">
          <i class="img_i">
            <mip-img layout="responsive" width="70" height="50" src="https://res.cngoldres.com/upload/trust/2016/0927/db339f87dcc9bb3568aeeab46e0da07b.jpg"></mip-img>
          </i>
          <span>央企信托<br>
            <i class="stock_i">股东背景：</i>
          </span>   
        </a>
      </div>
      <a href="https://m.cngold.org/trust/m_company_120.html" class="fr yywd"><span class="windowopen03">了解详情</span></a>
    </dt>
    <dd class="num clearfix">
      <span class="gray w1">
        <b><em class="red red_f0">0亿</em></b>注册资本
      </span>
      <span class="gray w2">
        <b><em class="red">---</em></b>成立时间
      </span>
      <span class="gray w3">
        <b><em class="red">---</em></b>所在地
      </span>
      <span class="gray w4 br0">
        <b><em class="red">5只</em></b>旗下产品
      </span>
    </dd>
  </dl>
</section>
</mip-jt-trust-company>
```

## 属性

无