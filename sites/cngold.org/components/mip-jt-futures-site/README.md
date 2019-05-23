# mip-jt-futures-site

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-futures-site/mip-jt-futures-site.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-futures-site/mip-jt-futures-site.js)

## 说明

两种用法：
1，根据给定的经纬度、城市名获取期货网点
2，根据输入字符进行期货公司查询

## 示例

示例说明

```
// 代码示例
// 获取网点列表
<mip-jt-futures-site 
  type="getList" 
  num-params="116.23128,40.22077"
  container-id="siteList"
  city-name="北京"
></mip-jt-futures-site>
<section class="yywd_box1 mt20">
  <div class="index_tit clearfix">
    <i class="icon"></i>
    <h2><a href="https://m.cngold.org/futures/m_wangdian.html" title="营业网点">营业网点</a></h2>
  </div>
  <div class="clearfix wddw_box1 pdLR30">
    <dl class="fl wddw_dl">
      <dt id="cityName">北京</dt>
    </dl>
    <div class="fr wddw_r clearfix">
      <a href="https://m.cngold.org/futures/m_wangdian.html" title="定位"><p class="dingwei"><i></i>定位</p></a>
    </div>
  </div>
  <div class="wd_content" id="siteList"></div>
</section>

// 查询期货公司
<mip-jt-futures-site 
  type="search" 
  num-params="2,585"
  container-id="search_res"
  input-id="search_input"
></mip-jt-futures-site>
<div class="ss_tc_box">
  <div class="qihuo_ss">
    <input placeholder="输入期货名或首字母" id="search_input"/>
    <span><i></i></span>
  </div>

  <div class="ss_tc bj_ffffff" id="search_res">
  </div>
</div>
```

## 属性

### type

**说明**：功能类型

**必选项**：是

**默认值**：无

**取值范围**：getList(获取列表),search(搜索)

### num-params

**说明**：数字参数，以','隔开，当type='getList'时参数格式为'经度,纬度'；当type='search'时参数格式为'省id,市id'

**必选项**：是

**默认值**：无

**类型**：字符串

### container-id

**说明**：容器id，用于存放结果

**必选项**：是

**默认值**：无

**类型**：字符串

### city-name

**说明**：城市名称

**必选项**：当type='getList'时必填

**默认值**：无

**类型**：字符串

### input-id

**说明**：查询时用于输入的input

**必选项**：当type='search'时必填

**默认值**：无

**类型**：字符串