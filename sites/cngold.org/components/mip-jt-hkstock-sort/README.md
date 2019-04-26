# mip-jt-hkstock-sort

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-hkstock-sort/mip-jt-hkstock-sort.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-hkstock-sort/mip-jt-hkstock-sort.js)

## 说明

港股排序功能

## 示例

示例说明

```
// 代码示例
<mip-jt-hkstock-sort
  kind='all'
  list-id='list_box'
  sort-btns='sort'
  cancel-btn='clear_sort'
></mip-jt-hkstock-sort>
<!-- 全部港股 -->
<section class="mt20">
  <div class="index_tit">
    <i class="icon"></i>
    <h2><a href="https://m.cngold.org/hkstock/m_quote_all.html" title="全部港股">全部港股</a></h2>
    <p class="fr clear-sort" id="clear_sort">取消排序</p>
  </div>
  <div class="hq_table">
    <div class="fixed-outBox" id="content_div">
      <div class="fixed-box">
        <dl class="thead">
          <dt>名称</dt>
          <dd>最新价(港元)</dd>
          <dd class="sort" id="70">涨跌额</dd>
          <dd class="sort" id="80">涨跌幅</dd>
        </dl>
      </div>
    </div>
    <div id="list_box">
        <dl class="content_dl">
            <dt><a href="https://m.cngold.org/hkstock/m_00988.html" title="楼东俊安资源"><p class="name">楼东俊安资源</p><span>00988</span></a></dt>
          <dd class=" red">0.06</dd>
          <dd class=" red">0.01</dd>
          <dd class=" red">31.11%</dd>
        </dl>
        <dl class="content_dl">
            <dt><a href="https://m.cngold.org/hkstock/m_08153.html" title="科地农业"><p class="name">科地农业</p><span>08153</span></a></dt>
          <dd class=" red">0.13</dd>
          <dd class=" red">0.03</dd>
          <dd class=" red">25%</dd>
        </dl>
        <dl class="content_dl">
            <dt><a href="https://m.cngold.org/hkstock/m_08172.html" title="拉近网娱"><p class="name">拉近网娱</p><span>08172</span></a></dt>
          <dd class=" red">0.12</dd>
          <dd class=" red">0.02</dd>
          <dd class=" red">20%</dd>
        </dl>
        <dl class="content_dl">
            <dt><a href="https://m.cngold.org/hkstock/m_08115.html" title="上海青浦消防"><p class="name">上海青浦消防</p><span>08115</span></a></dt>
          <dd class=" red">0.58</dd>
          <dd class=" red">0.07</dd>
          <dd class=" red">13.73%</dd>
        </dl>
        <dl class="content_dl">
            <dt><a href="https://m.cngold.org/hkstock/m_08100.html" title="智易控股"><p class="name">智易控股</p><span>08100</span></a></dt>
          <dd class=" red">0.44</dd>
          <dd class=" red">0.05</dd>
          <dd class=" red">12.66%</dd>
        </dl>
        <dl class="content_dl">
            <dt><a href="https://m.cngold.org/hkstock/m_08432.html" title="太平洋酒吧"><p class="name">太平洋酒吧</p><span>08432</span></a></dt>
          <dd class=" red">0.72</dd>
          <dd class=" red">0.08</dd>
          <dd class=" red">12.5%</dd>
        </dl>
        <dl class="content_dl">
            <dt><a href="https://m.cngold.org/hkstock/m_08353.html" title="安科系统"><p class="name">安科系统</p><span>08353</span></a></dt>
          <dd class=" red">0.51</dd>
          <dd class=" red">0.05</dd>
          <dd class=" red">12.09%</dd>
        </dl>
        <dl class="content_dl">
            <dt><a href="https://m.cngold.org/hkstock/m_08237.html" title="华星控股"><p class="name">华星控股</p><span>08237</span></a></dt>
          <dd class=" red">0.11</dd>
          <dd class=" red">0.01</dd>
          <dd class=" red">12%</dd>
        </dl>
        <dl class="content_dl">
            <dt><a href="https://m.cngold.org/hkstock/m_06828.html" title="蓝天威力"><p class="name">蓝天威力</p><span>06828</span></a></dt>
          <dd class=" red">0.28</dd>
          <dd class=" red">0.03</dd>
          <dd class=" red">12%</dd>
        </dl>
        <dl class="content_dl">
            <dt><a href="https://m.cngold.org/hkstock/m_08423.html" title="CHI HO DEV"><p class="name">CHI HO DEV</p><span>08423</span></a></dt>
          <dd class=" red">0.58</dd>
          <dd class=" red">0.06</dd>
          <dd class=" red">11.54%</dd>
        </dl>
    </div>
    <div class="view_more" id="content_before"><a href="javascript:void(0)" title="查看更多">查看更多<i class="icon"></i></a></div>
  </div>
</section>
```

## 属性

### kind

**说明**：港股种类

**必选项**：是

**类型**：字符串

**默认值**：无

### list-id

**说明**：数据存放列表所对应的id

**必选项**：是

**类型**：字符串

**默认值**：无

### sort-btns

**说明**：排序按钮对应的类名

**必选项**：是

**类型**：字符串

**默认值**：无

### cancel-btn

**说明**：取消排序按钮对应的id

**必选项**：是

**类型**：字符串

**默认值**：无
