# mip-jt-cang-postal

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-cang-postal/mip-jt-cang-postal.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-cang-postal/mip-jt-cang-postal.js)

## 说明

收藏邮币卡行情页面邮币卡行情数据初始化及翻页

## 示例

示例说明

```
// 代码示例
<mip-jt-cang-postal
  total-page='309'
  list-id='quote_list'
  init-codes='JO_66260,JO_66254,JO_66252,JO_66290,JO_66289,JO_66288,JO_66287,JO_66270'
  page-btns='page_prev,page_next'
  tips-id='page_tips'  
></mip-jt-cang-postal>
<section class="mt20">
  <div class="index_tit clearfix">
    <i class="icon"></i>
    <h2>邮币卡行情</h2>
  </div>
  <div class="tab_list tab_list2 ybk_quote_table">
    <dl class="tab_head clearfix">
      <dd class="w26">邮币卡</dd>
      <dd>文交所</dd>
      <dd>最新价</dd>
      <dd>涨跌幅</dd>
    </dl>
    <div id="quote_list">
      <dl class="clearfix mglr30 ybk_quote_tr">
        <dd class="w26">
          <a href="https://m.cngold.org/cang/m_ybkhq_336_202313.html" title="三轮猴套票">
            三轮猴套票
          </a>
        </dd>
        <dd>
          <a href="https://m.cngold.org/cang/m_wjshq_3.html" title="南方文交所">南方文交所</a>
        </dd>
        <dd class="JO_66260q63"></dd>
        <dd class="JO_66260q80"></dd>
      </dl>
      <dl class="clearfix mglr30 ybk_quote_tr">
        <dd class="w26">
          <a href="https://m.cngold.org/cang/m_ybkhq_334_202228.html" title="国际扫盲年">
            国际扫盲年
          </a>
        </dd>
        <dd>
          <a href="https://m.cngold.org/cang/m_wjshq_3.html" title="南方文交所">南方文交所</a>
        </dd>
        <dd class="JO_66254q63"></dd>
        <dd class="JO_66254q80"></dd>
      </dl>
      <dl class="clearfix mglr30 ybk_quote_tr">
        <dd class="w26">
          <a href="https://m.cngold.org/cang/m_ybkhq_333_202226.html" title="三轮马小版">
            三轮马小版
          </a>
        </dd>
        <dd>
          <a href="https://m.cngold.org/cang/m_wjshq_3.html" title="南方文交所">南方文交所</a>
        </dd>
        <dd class="JO_66252q63"></dd>
        <dd class="JO_66252q80"></dd>
      </dl>
      <dl class="clearfix mglr30 ybk_quote_tr">
        <dd class="w26">
          <a href="https://m.cngold.org/cang/m_ybkhq_332_202220.html" title="关公套票">
            关公套票
          </a>
        </dd>
        <dd>
          <a href="https://m.cngold.org/cang/m_wjshq_3.html" title="南方文交所">南方文交所</a>
        </dd>
        <dd class="JO_66290q63"></dd>
        <dd class="JO_66290q80"></dd>
      </dl>
      <dl class="clearfix mglr30 ybk_quote_tr">
        <dd class="w26">
          <a href="https://m.cngold.org/cang/m_ybkhq_331_202219.html" title="民族传统体育">
            民族传统体育
          </a>
        </dd>
        <dd>
          <a href="https://m.cngold.org/cang/m_wjshq_3.html" title="南方文交所">南方文交所</a>
        </dd>
        <dd class="JO_66289q63"></dd>
        <dd class="JO_66289q80"></dd>
      </dl>
      <dl class="clearfix mglr30 ybk_quote_tr">
        <dd class="w26">
          <a href="https://m.cngold.org/cang/m_ybkhq_330_202218.html" title="巴黎公社套票">
            巴黎公社套票
          </a>
        </dd>
        <dd>
          <a href="https://m.cngold.org/cang/m_wjshq_3.html" title="南方文交所">南方文交所</a>
        </dd>
        <dd class="JO_66288q63"></dd>
        <dd class="JO_66288q80"></dd>
      </dl>
      <dl class="clearfix mglr30 ybk_quote_tr">
        <dd class="w26">
          <a href="https://m.cngold.org/cang/m_ybkhq_329_202215.html" title="桃花小版">
            桃花小版
          </a>
        </dd>
        <dd>
          <a href="https://m.cngold.org/cang/m_wjshq_3.html" title="南方文交所">南方文交所</a>
        </dd>
        <dd class="JO_66287q63"></dd>
        <dd class="JO_66287q80"></dd>
      </dl>
      <dl class="clearfix mglr30 ybk_quote_tr">
        <dd class="w26">
          <a href="https://m.cngold.org/cang/m_ybkhq_328_202213.html" title="西藏民居套票">
            西藏民居套票
          </a>
        </dd>
        <dd>
          <a href="https://m.cngold.org/cang/m_wjshq_3.html" title="南方文交所">南方文交所</a>
        </dd>
        <dd class="JO_66270q63"></dd>
        <dd class="JO_66270q80"></dd>
      </dl>
    </div>
  </div>
  <div class="cang_ybk_page">
    <span id="page_prev">上一页</span>
    <span id="page_next"><em>下一页</em></span>
    <p id="page_tips"></p>
  </div>
</section>
```

## 属性

### total-page

**说明**：邮币卡行情总页数

**必选项**：是

**类型**：字符串

**默认值**：无

### list-id

**说明**：邮币卡行情数据列表容器

**必选项**：是

**类型**：字符串

**默认值**：无

### page-btns

**说明**：翻页按钮对应id,中间以','隔开

**必选项**：是

**类型**：字符串

**默认值**：无

### tips-id

**说明**：提示框对应id

**必选项**：是

**类型**：字符串

**默认值**：无

### init-codes

**说明**：页面初始化时的行情code，中间用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无
