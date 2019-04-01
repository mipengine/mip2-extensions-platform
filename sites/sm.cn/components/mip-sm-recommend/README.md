# mip-sm-recommend 神马推荐组件

神马推荐组件,展现神马推荐词列表

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/sm.cn/mip-sm-recommend/mip-sm-recommend.js](https://c.mipcdn.com/extensions/platform/v2/sm.cn/mip-sm-recommend/mip-sm-recommend.js)

## 说明

神马官方组件,用于在mip页中展现神马推荐词列表

## 示例

示例说明

```
<mip-sm-recommend title='%E8%A5%BF%E7%BA%A2%E6%9F%BF%E8%83%BD%E6%B2%BB%E7%97%85%E5%90%97'>
   
</mip-sm-recommend>
```

## 属性

### title

**说明**：页面内容标题，需要对中文编码（encodeURIComponent）

**必选项**：是

**类型**：字符串

**单位**：无

**默认值**：无

## 注意事项

- title 是页面中内容标题，**不是**`<title>`标签中的文本，同时需要对中文编码（encodeURIComponent）
