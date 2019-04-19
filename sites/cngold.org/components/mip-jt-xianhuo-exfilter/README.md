# mip-jt-xianhuo-exfilter

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-xianhuo-exfilter/mip-jt-xianhuo-exfilter.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-xianhuo-exfilter/mip-jt-xianhuo-exfilter.js)

## 说明

现货交易所城市筛选

## 示例

示例说明

```
// 代码示例
<mip-jt-xianhuo-exfilter
  city-name='全国'
  pro-name='全国'
  city-id='0'
  pro-id='0'
  seltype-id='0'
></mip-jt-xianhuo-exfilter>
<!--<mip-jt-xianhuo-exfilter
  city-name='沧州'
  pro-name='河北省'
  city-id='139'
  pro-id='6'
  seltype-id='0'
></mip-jt-xianhuo-exfilter>-->
<div class="index_tit jys_tit">
  <i class="icon"></i>
  <h2>
    <a title="大宗交易所" href="">大宗交易所</a>
    <span on="tap:chose-lightbox.open" class="jys-filter-btn jys-filter-btn-city br2 fr" >选城市</span>
  </h2>
</div>
<!-- 选城市 -->
<mip-lightbox
  id="chose-lightbox"
  layout="nodisplay"
  class="mip-hidden">
<div class="xhhq-filter jys-city-filter">
  <div class="heading">
    <div class="fl img">
      <span class="menuAllclose" on="tap:chose-lightbox.close">&lt;</span>
    </div>
    城市选择
    <span><a title="首" href="http://m.cngold.org/xianhuo/">首</a></span>
  </div>
  <div class="bd">
    <!--当前选择城市-->
    <div class="tit mb10 clearfix">
    	当前选择城市：<span class="addr-icon selectCity" id="selectCity">全国</span>
    </div>
    <!-- letter -->
    <div class="zimu_box">
      <div class="zimu" id="zimu">
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span>D</span>
          <span>E</span>
          <span>F</span>
          <span>G</span>
          <span>H</span>
          <span>I</span>
          <span>J</span>
          <span>K</span>
          <span>L</span>
          <span>M</span>
          <span>N</span>
          <span>O</span>
          <span>P</span>
          <span>Q</span>
          <span>R</span>
          <span>S</span>
          <span>T</span>
          <span>U</span>
          <span>V</span>
          <span>W</span>
          <span>X</span>
          <span>Y</span>
          <span>Z</span>
      </div>
    </div>

    <!-- hot-city -->
    <div class="hot-city">
      <div class="tit mb10">热门城市</div>
      <dl id="hot-city">
        <dd data-value="0-0-全国">全国</dd>
        <dd data-value="213-12-杭州">杭州</dd>
        <dd data-value="587-4-上海">上海</dd>
        <dd data-value="585-2-北京">北京</dd>
        <dd data-value="327-20-深圳">深圳</dd>
        <dd data-value="326-20-广州">广州</dd>
        <dd data-value="586-3-天津">天津</dd>
        <dd data-value="200-11-南京">南京</dd>
        <dd data-value="202-11-苏州">苏州</dd>
      </dl>
    </div>
    <!-- area -->
    <div class="area-filter" id="area-filter">
      <div class="tit mt10">按省份</div>
      <dl>
        <dt>华北地区</dt>
        <dd province="2">北京</dd><dd province="3">天津</dd><dd province="6">河北</dd><dd province="7">山西</dd><dd province="28">内蒙古</dd>
      </dl>
      <dl>
        <dt>华东地区</dt>
        <dd province="4">上海</dd><dd province="12">浙江</dd><dd province="16">山东</dd><dd province="11">江苏</dd><dd province="13">安徽</dd><dd province="14">福建</dd><dd province="15">江西</dd>
      </dl>
      <dl>
        <dt>华南地区</dt>
        <dd province="20">广东</dd><dd province="31">广西</dd><dd province="21">海南</dd>
      </dl>
      <dl>
        <dt>华中地区</dt>
        <dd province="19">湖南</dd><dd province="17">河南</dd><dd province="18">湖北</dd>
      </dl>
      <dl>
        <dt>东北地区</dt>
        <dd province="10">黑龙江</dd><dd province="8">辽宁</dd><dd province="9">吉林</dd>
      </dl>
      <dl>
        <dt>西南地区</dt>
        <dd province="22">四川</dd><dd province="23">贵州</dd><dd province="24">云南</dd><dd province="5">重庆</dd><dd province="405">西藏</dd>
      </dl>
      <dl>
        <dt>西北地区</dt>
        <dd province="26">甘肃</dd><dd province="25">陕西</dd><dd province="30">新疆</dd><dd province="441">青海</dd><dd province="29">宁夏</dd>
      </dl>
    </div>
    <!-- 筛选结果 -->
    <div class="filter-result-box" id="res-box">
      <dl id="citydl">
        <dd>杭州</dd><dd>上海</dd><dd>北京</dd><dd>深圳</dd><dd>广州</dd><dd>天津</dd><dd>南京</dd><dd>苏州</dd>
      </dl>
    </div>
    <!-- 筛选结果-无 -->
    <div class="filter-result-none" id="nores-box">该条件下暂无内容</div>
  </div>
  <div class="xhhq-filter-btn">
    <span class="reset" id="reset">重置</span><span id="confirm" class="confirm">确认筛选</span>
  </div>
</div>
</mip-lightbox>
```

## 属性

### city-name

**说明**：当前选中的城市名称

**必选项**：是

**类型**：字符串

**默认值**：无

### pro-name

**说明**：当前选中的省名称

**必选项**：是

**类型**：字符串

**默认值**：无

### city-id

**说明**：当前选中的城市id

**必选项**：是

**类型**：字符串

**默认值**：无

### pro-id

**说明**：当前选中的省id

**必选项**：是

**类型**：字符串

**默认值**：无

### seltype-id

**说明**：交易所类别id

**必选项**：是

**类型**：字符串

**默认值**：无
