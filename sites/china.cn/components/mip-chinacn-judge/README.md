# mip-chinacn-judge

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/china.cn/mip-chinacn-judge/mip-chinacn-judge.js](https://c.mipcdn.com/extensions/platform/v2/china.cn/mip-chinacn-judge/mip-chinacn-judge.js)

## 说明

页面在不同域名的缓存页面展示时 使用不同的广告代码

## 示例

示例说明

```
<mip-chinacn-judge type="baidu-wm-ext" domain="7011.stia.cn" token="avnreeuwb">
<script type="application/json">{"s.sm.cn":"dyqazhnnn"}</script>
</mip-chinacn-judge>
```

## 属性

### type

**说明**：广告类型

**必选项**：是

**单位**：string

**默认值**：无

### domain

**说明**：域名

**必选项**：是

**单位**：string

**默认值**：无

### token

**说明**：广告token

**必选项**：是

**单位**：string

**默认值**：无

### 配置参数

**说明**：域名与对应的广告token

**必选项**：否

**类型**：键值对

**默认值**：无
