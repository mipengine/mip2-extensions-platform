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
<mip-sm-recommend params={"recommend_api":"https://fe.sm.cn/mip_update/test.php?wd=query&from=mip","zm_path":"http://zm10.sm-tc.cn/rec/redirect/?src=http://m.sa.sm.cn/s?q=","zm_search":{"alg_bu":"exp3","rec_type":"xxx","from":"wh30010"}}>
</mip-sm-recommend>
```

## 属性

### params

**说明**：params中指定推荐词请求接口，以及推荐词跳转所需参数

**必选项**：是

**单位**：json

**默认值**：无

### recommend_api

**说明**：获取推荐词接口

**必选项**：是

**单位**：string

**默认值**：无

### zm_path

**说明**：点击推荐词所需的跳转路径(不含query词)

**必选项**：是

**单位**：string

**默认值**：无

### zm_search

**说明**：点击推荐词所需的跳转参数

**必选项**：是

**单位**：json

**默认值**：无
