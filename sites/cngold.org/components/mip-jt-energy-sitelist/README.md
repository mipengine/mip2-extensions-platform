# mip-jt-energy-sitelist

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-energy-sitelist/mip-jt-energy-sitelist.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-energy-sitelist/mip-jt-energy-sitelist.js)

## 说明

原油加油站网点列表展示及油价数据展示

## 示例

示例说明

```
<mip-jt-energy-sitelist
  lng="116.38"
  lat="39.90"
  city="北京市"
>
<section class="mt20">
  <div class="index_tit">
    <i class="icon"></i>
    <h2><a href="https://m.cngold.org/energy/m_jyzwd.html" title="加油站">加油站</a></h2>
  </div>
  <div class="jyzdw_box1 pb25 pdlr30 clearfix">
    <dl class="fl jyzdw_dl">
      <dt id="cityName">北京市</dt>
      <dd>精确定位查询周边</dd>
      <dd class="red" hidden="" id="noPlace">未找到相关地址，请检查输入是否准确</dd>
    </dl>
    <div class="fr jyzdw_r clearfix">
      <a href="/energy/m_jyzwd.html" title="定位"><p class="dingwei"><i class="icon5"></i>定位</p></a>
      <em></em>
      <p class="shuru"><a href="https://m.cngold.org/energy/m_jyzwd.html"><i class="icon5"></i>输入</a></p>
    </div>
  </div>

  <mip-map height="200">
  <script type="application/json">
    {
      "ak": "hKhuzfFBrcL6zGm4s6b371NDxaUrhFPl",
      "hideMap": false,
      "getPosition": false,
      "dataOnlyGetSdk": false,
      "location": {
        "province": "北京",
        "city": "北京市",
        "district": "东城区",
        "street": "天安门"
      },
      "controls": {
        "NavigationControl": {
          "showZoomInfo": true,
          "enableGeolocation": true
        },
        "MapTypeControl": {
          "type": "BMAP_MAPTYPE_CONTROL_HORIZONTAL",
          "mapTypes": ["BMAP_NORMAL_MAP", "BMAP_SATELLITE_MAP", "BMAP_HYBRID_MAP"]
        }
      }
    }
  </script>
</mip-map>
  <div id="oil-data"></div>
  <div class="jyz_content" id="site-list"></div>
</section>

</mip-jt-energy-sitelist>

```

## 属性

### lng

**说明**：所要查询的位置的经度

**必选项**：是

**类型**：字符串

**默认值**：无

### lat

**说明**：所要查询的位置的纬度

**必选项**：是

**类型**：字符串

**默认值**：无

### city

**说明**：所要查询的城市

**必选项**：是

**类型**：字符串

**默认值**：无
