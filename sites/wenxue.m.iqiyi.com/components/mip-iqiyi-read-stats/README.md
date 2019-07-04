# mip-iqiyi-read-stats

标题|内容
----|----
类型| 统计
支持布局| 否
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/wenxue.m.iqiyi.com/mip-iqiyi-read-stats/mip-iqiyi-read-stats.js](https://c.mipcdn.com/extensions/platform/v2/wenxue.m.iqiyi.com/mip-iqiyi-read-stats/mip-iqiyi-read-stats.js)

## 说明

iQiyi MIP 阅读器统计组件，包括 PV、Block 和 Click。

## 示例

示例说明

```html
<mip-iqiyi-read-stats>
  <script type="application/json">
    {
      "rpage": "p639",
      "aid": "205637139"
    }
  </script>
</mip-iqiyi-read-stats>

<button iqiyi-read-stats-rseat="c123">click(c123)</button>

<p iqiyi-read-stats-block="b111">
  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
</p>
```

## 属性

通过 JSON 格式的 `<script>` 脚本传入配置项。

### rapge

**说明**：统计的页面 rpage

**必选项**：Y