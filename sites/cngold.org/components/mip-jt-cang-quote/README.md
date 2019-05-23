# mip-jt-cang-quote

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-cang-quote/mip-jt-cang-quote.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-cang-quote/mip-jt-cang-quote.js)

## 说明

收藏邮币卡行情数据展示、文交所详情页指数数据切换

## 示例

示例说明

```
// 代码示例
<!--用法一：行情数据展示-->
<mip-jt-cang-quote
  codes="JO_66260"
></mip-jt-cang-quote>
<section class="cang_ybkhqxq_01 mt20">
  <table class="wjs_article_table mglr30 mb20" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td><a href="http://m.cngold.org/cang/m_ybkhq_336_202313.html" title="三轮猴套票">三轮猴套票</a></td>
      <td>
        <div><a href="http://m.cngold.org/cang/m_wjshq_3.html" title="南方文交所">南方文交所</a></div>
        <div><a href="http://m.cngold.org/cang/m_ybkhq_336_202313.html" title="202313">202313</a></div>
      </td>
      <td>
        <div class="JO_66260_q63"></div>
        <div>
          <span class="JO_66260_q70"></span>
          &nbsp;&nbsp;&nbsp;
          <em class="JO_66260_q80"></em>
        </div>
      </td>
    </tr>
  </table>
  
  <table class="wjs_article_table mglr30" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td>今开：<span class="JO_66260_q1"></span></td>
      <td>最高：<span class="JO_66260_q3"></span></td>
      <td>成交量：<span class="JO_66260_q60"></span></td>
    </tr>
    <tr>
      <td>昨收：<span class="JO_66260_q2"></span></td>
      <td>最低：<span class="JO_66260_q4"></span></td>
      <td>成交额：<span class="JO_66260_q61"></span></td>
    </tr>
  </table>
</section>

<!--用法二：不同指数切换-->
<mip-jt-cang-quote
  is-more='true'
></mip-jt-cang-quote>
<section class="mt20">
  <div class="wjs_article_title pdlr30">
    <div class="clearfix">
      <div class="name fl">江苏文交所(<span class="quote_code" id="quote_code">100021</span>)</div>
      <div class="table_type">
        <span id="quote_name">综合指数</span>
        <em id="quote_more">更多<img src="https://res.cngoldres.com/mobile/img/m_wjshqxq_01.png" alt="" /></em>
      </div>
    </div>
    <ul class="table_type_all" id="type_ul">
      <li data-value="JO_66082">综合指数</li>
      <li data-value="JO_66083">邮票指数</li>
      <li data-value="JO_66084">邮资封片指数</li>
      <li data-value="JO_66085">电话卡指数</li>
    </ul>
  </div>
  <table class="wjs_article_table mglr30" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td>今开：<span class="color_change quote_q1" id="quote_q1"></span></td>
      <td>最高：<span class="color_change quote_q3" id="quote_q3"></span></td>
      <td>成交量：<span class="quote_q60" id="quote_q60"></span></td>
    </tr>
    <tr>
      <td>昨收：<span class="color_change quote_q2" id="quote_q2"></span></td>
      <td>最低：<span class="color_change quote_q4" id="quote_q4"></span></td>
      <td>成交额：<span class="quote_q61" id="quote_q61"></span></td>
    </tr>
  </table>
</section>

```

## 属性

### codes

**说明**：行情code,多个时用','隔开

**必选项**：用法一中必选

**类型**：字符串

**默认值**：无

### is-more

**说明**：是否需要不同指数切换

**必选项**：用法二中必选

**类型**：字符串

**默认值**：无

## 注意事项

用法一中，行情数据的展示需加形如'{行情code}_q1'的类名

用法二中，不同指数切换时请按照示例html结构书写
