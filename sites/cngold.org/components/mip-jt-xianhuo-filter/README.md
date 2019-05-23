# mip-jt-xianhuo-filter

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-xianhuo-filter/mip-jt-xianhuo-filter.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-xianhuo-filter/mip-jt-xianhuo-filter.js)

## 说明

现货行情条件筛选

## 示例

示例说明

```
// 代码示例
<mip-jt-xianhuo-filter 
  cate-Ids=''
  province-id='0'
  city-id='0'
  prefix='metal'
  last-index='1'
></mip-jt-xianhuo-filter>
<div class="index_tit jys_tit">
  <i class="icon"></i>
  <h2>
    <a title="农产品行情" href="https://m.cngold.org/xianhuo/m_hq_farm.html">金属</a>
    <span on="tap:filter-lightbox.open" class="xh-filter-btn br2 fr">
      <img src="https://res.cngoldres.com/mobile/images/chose_xianhuo415.png" alt="筛选">筛选
    </span>
  </h2>
</div>
<mip-lightbox
  id="filter-lightbox"
  layout="nodisplay"
  class="mip-hidden">
  <div class="xhhq-filter">
    <div class="heading">
      <span src="https://res.cngoldres.com/mobile/images/return_xianhuo415.png" class="menuAllclose" on="tap:filter-lightbox.close">&lt;</span>
      行情筛选
      <span><a title="首" href="https://m.cngold.org/xianhuo/">首</a></span>
    </div>
    <div class="hd" id="left_tab">
      <ul>
        <li id="prefixLi" class="on">分类</li>
        <li class="lastc"  id="cateLi0">金属</li>
        <li id="provincesLi">地区</li>
      </ul>
    </div>
    <div class="bd" id="right_con">
      <div>
          <dl id="prefixIndex">
            <dd data-value="" >不限</dd>
            <dd data-value="farm" >农产品</dd>
            <dd data-value="gangcai">钢材</dd>
            <dd data-value="metal" class="on">金属</dd>
            <dd data-value="huagong" >化工</dd>
            <dd data-value="mucai" >木材</dd>
          </dl>
          <dl id="cateIndex0">
            <dd class="on" data-value="0-0">不限</dd>
            <dd data-value="286-0">小金属</dd>
            <dd data-value="285-0">稀土金属</dd>
            <dd data-value="284-0">贵金属</dd>
            <dd data-value="283-0">有色金属</dd>
          </dl>



          <dl id="provinceIndex">
              <dd data-value="0" class="on" >全国</dd>
              <dt>华北</dt>
              <dd data-value="2" >北京市</dd>
              <dd data-value="3" >天津市</dd>
              <dd data-value="6" >河北省</dd>
              <dd data-value="7" >山西省</dd>
              <dd data-value="28" >内蒙古</dd>
              <dt>华东</dt>
              <dd data-value="4" >上海市</dd>
              <dd data-value="11" >江苏省</dd>
              <dd data-value="12" >浙江省</dd>
              <dd data-value="13" >安徽省</dd>
              <dd data-value="14" >福建省</dd>
              <dd data-value="15" >江西省</dd>
              <dd data-value="16" >山东省</dd>
              <dt>华南</dt>
              <dd data-value="20" >广东省</dd>
              <dd data-value="21" >海南省</dd>
              <dt>华中</dt>
              <dd data-value="17" >河南省</dd>
              <dd data-value="18" >湖北省</dd>
              <dd data-value="19" >湖南省</dd>
              <dt>东北</dt>
              <dd data-value="8"  >辽宁省</dd>
              <dd data-value="9"  >吉林省</dd>
              <dd data-value="10"  >黑龙江省</dd>
              <dt>西南</dt>
              <dd data-value="5" >重庆市</dd>
              <dd data-value="22" >四川省</dd>
              <dd data-value="23" >贵州省</dd>
              <dd data-value="24" >云南省</dd>
              <dt>西北</dt>
              <dd data-value="25" >陕西省</dd>
              <dd data-value="26" >甘肃省</dd>
              <dd data-value="30" >新疆省</dd>
              <dd data-value="441" >青海省</dd>
          </dl>
      </div>
      <div class="xhhq-filter-btn">
        <span class="reset" id="reset">重置</span>
        <span class="confirm" id="confirm">确认</span>
      </div>
    </div>
  </div>
</mip-lightbox>
```

## 属性

### cate-Ids

**说明**：当前选中种类的ids，多个id中间以'-'连接

**必选项**：是

**类型**：字符串

**默认值**：无

### province-id

**说明**：当前选中的省对应id

**必选项**：是

**类型**：字符串

**默认值**：无

### city-id

**说明**：当前选中的市对应id

**必选项**：是

**类型**：字符串

**默认值**：无

### prefix

**说明**：当前的行情种类，'farm'--农产品，'gangcai'--钢材，'metal'--金属，'huagong'--化工，'mucai'--木材

**必选项**：是

**类型**：字符串

**默认值**：无

### last-index

**说明**：用于标记初始化筛选界面左侧的tab中哪个处于选中状态

**必选项**：是

**类型**：字符串

**默认值**：无