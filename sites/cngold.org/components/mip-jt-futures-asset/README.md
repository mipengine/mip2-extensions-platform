# mip-jt-futures-asset

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-futures-asset/mip-jt-futures-asset.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-futures-asset/mip-jt-futures-asset.js)

## 说明

期货资管产品详情数据展示

## 示例

示例说明

```
// 代码示例
<mip-jt-futures-asset codes="JO_95722" ids="q90,q63,q59,q60,q135,q91,q149,q148,q147,q153,q152,q146,q151" repeat-ids="totalRate,q90"></mip-jt-futures-asset>
  <!-- 产品详情 -->
  <section class="mt20 f-zgcp-data">
    <div class="top clearfix">
      <div class="fl">
        <p>累计收益</p>
        <p id="JO_95722_q90"></p>
      </div>
      <div class="fr">
        <p class="name"></p>
        <p>
          <span>最新净值：<em id="JO_95722_q63">2</em></span><span>运行状态：<em id="runState" class="blue">运行中</em></span>
        </p>
      </div>
    </div>
    <div class="btm ov-h clearfix">
      <ul>
        <li><span>净值日期：</span><em id="JO_95722_q59"></em></li>
        <!--<li><span>净值日期：</span><em id="time"></em></li>-->
        <li><span>今年以来收益：</span><em id="JO_95722_q60"></em></li>
        <li><span>成立日期：</span><em>${variety.foundDate!'--'}</em></li>
        <li><span>近1年收益：</span><em id="JO_95722_q135"></em></li>
      </ul>
    </div>
  </section>

  <!-- 统计 -->
  <section class="f-zgcp-tj pl-pr-10 clearfix mb0">
    <dl>
      <dt>收益统计</dt>
      <dd>总收益率：<span id="totalRate"></span></dd>
      <dd>周收益率：<span id="JO_95722_q91"></span></dd>
      <dd>月收益率：<span id="JO_95722_q149"></span></dd>
      <dd>今年以来：<span id="JO_95722_q148"></span></dd>
    </dl>
    <dl>
      <dt>风险统计</dt>
      <dd>最大回撤率：<span id="JO_95722_q147"></span></dd>
      <dd>盈利月占比：<span id="JO_95722_q153"></span></dd>
      <dd>亏损月占比：<span id="JO_95722_q152"></span></dd>
    </dl>
    <dl>
      <dt>风险统计</dt>
      <dd>夏普值：<span id="JO_95722_q146"></span></dd>
      <dd>累计盈亏比：<span id="JO_95722_q151"></span></dd>
    </dl>
  </section>
```

## 属性

### codes

**说明**：所要查询的资管产品code，多个code用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无

### ids

**说明**：所要展示的字段，多个字段用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无

### repeat-ids

**说明**：
需要重复展示的数据所对应的id和字段；每组以';'作为分割，组内以','分割。
eg：'total,q60'--表示id为'total'的元素内容为q60字段所对应的数据(只有一组时不需要加';')
'total,q60;time,q59'--多组时以';'分割，末尾不加';'

**必选项**：否

**类型**：字符串

**默认值**：无

