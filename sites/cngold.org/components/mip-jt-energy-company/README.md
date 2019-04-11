# mip-jt-energy-company

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-energy-company/mip-jt-energy-company.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-energy-company/mip-jt-energy-company.js)

## 说明

原油石化公司数据加载

## 示例

示例说明

```
// 代码示例
<!--推荐企业换一换-->
<mip-jt-energy-company btn-id="change_btn" list-id="company_list" is-init="0"></mip-jt-energy-company>
<section id="m_shgs_atlast_after">
  <div class="index_tit">
    <i class="icon"></i>
    <h2>推荐企业</h2>
    <p class="fr">
      <span id="change_btn">换一换</span>
    </p>
  </div>
  <div class="qy_list m_shgs_atlast" id="company_list">

  </div>
</section>
```

## 属性

### list-id

**说明**：列表容器id

**必选项**：是

**默认值**：无

**类型**：字符串

### is-init

**说明**：是否需要初始化（即在页面渲染时是否要调一次数据接口）

**必选项**：是

**默认值**：无

**类型**：字符串

**取值范围**：'0','1'

### btn-id

**说明**：换一换按钮

**必选项**：否

**默认值**：无

**类型**：字符串
