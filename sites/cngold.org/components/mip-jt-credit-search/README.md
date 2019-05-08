# mip-jt-credit-search

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-credit-search/mip-jt-credit-search.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-credit-search/mip-jt-credit-search.js)

## 说明

信用卡办理地区展示及查询功能，需依赖于cityList

## 示例

示例说明

```
// 代码示例
<mip-jt-credit-search
  input-id='search_input'
  res-id='slist'
  reset-id='search_cancel'
></mip-jt-credit-search>
<section class="mt20">
  <div class="bank_filter clearfix">
    <div class="bank_filter_box search_text">
      <div class="bank_filter_select">
        <input type="text" id="search_input" value="中文/首字母"/>
        <i class="icon4"></i>
      </div>
      <div id="search_cancel" class="search_cancel">取消</div>
      <div class="bank_filter_options" id="slist">
      </div>
    </div>
  </div>
</section>

<section class="bx_filter_area">
  <div class="bx_filter_province"><span class="zimu A">A</span></div>
  <div class="bx_filter_city clearfix" id="dd_a"></div>
  <div class="bx_filter_province"><span class="zimu B">B</span></div>
  <div class="bx_filter_city clearfix" id="dd_b"></div>
  <div class="bx_filter_province"><span class="zimu C">C</span></div>
  <div class="bx_filter_city clearfix" id="dd_c"></div>
  <div class="bx_filter_province"><span class="zimu D">D</span></div>
  <div class="bx_filter_city clearfix" id="dd_d"></div>
  <div class="bx_filter_province"><span class="zimu E">E</span></div>
  <div class="bx_filter_city clearfix" id="dd_e"></div>
  <div class="bx_filter_province"><span class="zimu F">F</span></div>
  <div class="bx_filter_city clearfix" id="dd_f"></div>
  <div class="bx_filter_province"><span class="zimu G">G</span></div>
  <div class="bx_filter_city clearfix" id="dd_g"></div>
  <div class="bx_filter_province"><span class="zimu H">H</span></div>
  <div class="bx_filter_city clearfix" id="dd_h"></div>
  <div class="bx_filter_province"><span class="zimu I">I</span></div>
  <div class="bx_filter_city clearfix" id="dd_i"></div>
  <div class="bx_filter_province"><span class="zimu J">J</span></div>
  <div class="bx_filter_city clearfix" id="dd_j"></div>
  <div class="bx_filter_province"><span class="zimu K">K</span></div>
  <div class="bx_filter_city clearfix" id="dd_k"></div>
  <div class="bx_filter_province"><span class="zimu L">L</span></div>
  <div class="bx_filter_city clearfix" id="dd_l"></div>
  <div class="bx_filter_province"><span class="zimu M">M</span></div>
  <div class="bx_filter_city clearfix" id="dd_m"></div>
  <div class="bx_filter_province"><span class="zimu N">N</span></div>
  <div class="bx_filter_city clearfix" id="dd_n"></div>
  <div class="bx_filter_province"><span class="zimu O">O</span></div>
  <div class="bx_filter_city clearfix" id="dd_o"></div>
  <div class="bx_filter_province"><span class="zimu P">P</span></div>
  <div class="bx_filter_city clearfix" id="dd_p"></div>
  <div class="bx_filter_province"><span class="zimu Q">Q</span></div>
  <div class="bx_filter_city clearfix" id="dd_q"></div>
  <div class="bx_filter_province"><span class="zimu R">R</span></div>
  <div class="bx_filter_city clearfix" id="dd_r"></div>
  <div class="bx_filter_province"><span class="zimu S">S</span></div>
  <div class="bx_filter_city clearfix" id="dd_s"></div>
  <div class="bx_filter_province"><span class="zimu T">T</span></div>
  <div class="bx_filter_city clearfix" id="dd_t"></div>
  <div class="bx_filter_province"><span class="zimu U">U</span></div>
  <div class="bx_filter_city clearfix" id="dd_u"></div>
  <div class="bx_filter_province"><span class="zimu V">V</span></div>
  <div class="bx_filter_city clearfix" id="dd_v"></div>
  <div class="bx_filter_province"><span class="zimu W">W</span></div>
  <div class="bx_filter_city clearfix" id="dd_w"></div>
  <div class="bx_filter_province"><span class="zimu X">X</span></div>
  <div class="bx_filter_city clearfix" id="dd_x"></div>
  <div class="bx_filter_province"><span class="zimu Y">Y</span></div>
  <div class="bx_filter_city clearfix" id="dd_y"></div>
  <div class="bx_filter_province"><span class="zimu Z">Z</span></div>
  <div class="bx_filter_city clearfix" id="dd_z"></div>
  <div class="bx_zimu_link fixed">
    <a href="#dd_a">A</a>
    <a href="#dd_b">B</a>
    <a href="#dd_c">C</a>
    <a href="#dd_d">D</a>
    <a href="#dd_e">E</a>
    <a href="#dd_f">F</a>
    <a href="#dd_g">G</a>
    <a href="#dd_h">H</a>
    <a href="#dd_i">I</a>
    <a href="#dd_j">J</a>
    <a href="#dd_k">K</a>
    <a href="#dd_l">L</a>
    <a href="#dd_m">M</a>
    <a href="#dd_n">N</a>
    <a href="#dd_o">O</a>
    <a href="#dd_p">P</a>
    <a href="#dd_q">Q</a>
    <a href="#dd_r">R</a>
    <a href="#dd_s">S</a>
    <a href="#dd_t">T</a>
    <a href="#dd_u">U</a>
    <a href="#dd_v">V</a>
    <a href="#dd_w">W</a>
    <a href="#dd_x">X</a>
    <a href="#dd_y">Y</a>
    <a href="#dd_z">Z</a>
  </div>
</section>

```

## 属性

### input-id

**说明**：搜索框对应id

**必选项**：是

**类型**：字符串

**默认值**：无

### res-id

**说明**：搜索结果存放容器对应id

**必选项**：是

**类型**：字符串

**默认值**：无

### reset-id

**说明**：取消搜索按钮对应id

**必选项**：是

**类型**：字符串

**默认值**：无

