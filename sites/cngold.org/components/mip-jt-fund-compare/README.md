# mip-jt-fund-compare

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-fund-compare/mip-jt-fund-compare.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-fund-compare/mip-jt-fund-compare.js)

## 说明

基金比较页面行业配置数据展示

## 示例

示例说明

```
<mip-jt-fund-compare codes="000387,001743">
<table class="table_jjbj col3">
  <thead>
    <tr>
      <th>资产</th>
      <th>000387<br />泰达宏利瑞利债券A<br /></th>
      <th>001743<br />诺安优选回报混合<br /></th>
    </tr>
  </thead>
  <tbody>
    <tr id="made">
      <td>制造业</td>
      <td class="red" id="made-000387">--</td>
      <td class="red" id="made-001743">--</td>
    </tr>
    <tr id="finance">
      <td>金融业</td>
      <td class="red" id="finance-000387">--</td>
      <td class="red" id="finance-001743">--</td>
    </tr>
    <tr id="estate">
      <td>房地产业</td>
      <td class="red" id="estate-000387">--</td>
      <td class="red" id="estate-001743">--</td>
    </tr>
    <tr id="info">
      <td>信息技术业</td>
      <td class="red" id="info-000387">--</td>
      <td class="red" id="info-001743">--</td>
    </tr>
    <tr id="farm">
      <td>农林牧渔业</td>
      <td class="red" id="farm-000387">--</td>
      <td class="red" id="farm-001743">--</td>
    </tr>
    <tr id="sale">
      <td>批发零售业</td>
      <td class="red" id="sale-000387">--</td>
      <td class="red" id="sale-001743">--</td>
    </tr>
    <tr id="traffic">
      <td>交通运输业</td>
      <td class="red" id="traffic-000387">--</td>
      <td class="red" id="traffic-001743">--</td>
    </tr>
    <tr id="build">
      <td>建筑业</td>
      <td class="red" id="build-000387">--</td>
      <td class="red" id="build-001743">--</td>
    </tr>
  </tbody>
</table>
</mip-jt-fund-compare>
```

## 属性

### codes

**说明**：所需查询的基金code，多个code用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无