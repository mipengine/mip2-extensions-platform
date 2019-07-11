# mip-zhmsaskv2

标题|内容
----|----
类型|js组件
支持布局|支持 与页面视图结合使用
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/mip.zhms.cn/mip-zhmsaskv2/mip-zhmsaskv2.js](https://c.mipcdn.com/extensions/platform/v2/mip.zhms.cn/mip-zhmsaskv2/mip-zhmsaskv2.js)

## 说明

mip.zhms.cn站点留言面板组件，实现留言提交。

## 示例

示例说明

```
该组件只需要引用，页面存在<mip-zhmsask-new></mip-zhmsask-new>即可使用

<mip-zhmsask-new MerchantId="0" BrandId="0" CategoryId="0" Source="{&quot;SourceUrl&quot;:&quot;https://mip.zhms.cn/xxx&quot;,&quot;IntentionBrand&quot;:&quot;xxx&quot;}" ></mip-zhmsask-new>
```

## 属性

### MerchantId

**说明**：商家编号

**必选项**：非必选项

**单位**：数字

**默认值**：0

### BrandId

**说明**：品牌编号

**必选项**：非必选项

**单位**：数字

**默认值**：0

### CategoryId

**说明**：分类编号

**必选项**：非必选项

**单位**：数字

**默认值**：0

### Source

**说明**：来源信息

**必选项**：必选项

**单位**：json字符串

**默认值**：""