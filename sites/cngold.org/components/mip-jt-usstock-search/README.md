# mip-jt-usstock-search

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-usstock-search/mip-jt-usstock-search.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-usstock-search/mip-jt-usstock-search.js)

## 说明

美股搜索

## 示例

示例说明

```
// 代码示例
<section class="mt20 on-blur bg_f5f5f5">
  <!--点击搜索-->
  <div class="hks-search-box clearfix">
    <div class="hks-search sousuo bg_fff" on="tap:search-lightbox.open">
      <i></i>
      <div class="false_input">股票代码/名称/简拼</div>
    </div>
  </div>
</section>

<mip-jt-usstock-search
  input-id="select_input"
  list-id="result_ul"
></mip-jt-usstock-search>
<mip-lightbox
  id="search-lightbox"
  layout="nodisplay"
  class="mip-hidden">
<section class="on-focus mt20 bg_f5f5f5">
  <div class="hks-search-box clearfix">
    <div class="hks-search sousuo bg_fff">
      <i></i>
      <mip-form method="get" url="https://m.cngold.org/usstock/m_quote_all.html">
        <input type="text" placeholder="股票代码/名称/简拼" id="select_input"/>
      </mip-form>
    </div>
    <div class="search-box-del" on="tap:search-lightbox.close">取消</div>
  </div>
  <div class="hks-search-result">
    <div class="top">
      <span class="code">代码</span><span class="jian">简拼</span>
    </div>
    <ul id="result_ul">
    </ul>
  </div>
  <div class="hks-like">
    <div class="top">你可能感兴趣的内容</div>
    <ul>
      <li><a href="//m.cngold.org/usstock/m_quote_internet.html"><i></i><p>中概股行情</p></a></li>
      <li><a href="//m.cngold.org/usstock/m_quote_internet.html"><i></i><p>互联网行情</p></a></li>
      <li><a href="//m.cngold.org/usstock/lm692/"><i></i><p>公司新闻</p></a></li>
      <li><a href="//m.cngold.org/usstock/lm689/"><i> </i><p>美股学堂</p></a></li>
    </ul>
  </div>
</section>
</mip-lightbox>
```

## 属性

### input-id

**说明**：搜索框input对应的id

**必选项**：是

**类型**：字符串

**默认值**：无

### list-id

**说明**：搜索结果对应的id

**必选项**：是

**类型**：字符串

**默认值**：无
