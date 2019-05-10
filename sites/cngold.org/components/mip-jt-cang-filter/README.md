# mip-jt-cang-filter

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-cang-filter/mip-jt-cang-filter.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-cang-filter/mip-jt-cang-filter.js)

## 说明

收藏古董鉴定列表页筛选

## 示例

示例说明

```
// 代码示例
<mip-jt-cang-filter
  url='m_jd_yuqi'
  list='1,2,3,4,5'
  chosed-box='chosed_box'
></mip-jt-cang-filter>
<section class="mt20">
  <div class="index_tit clearfix">
    <i class="icon"></i>
    <h2>玉器鉴定</h2>
    <div class="lux-selBtn fr" id="show_chose"><i class="icon4"></i>筛选</div>
  </div>
</section>
  <!--w 602-->
  <div class="selBox" id="chose_box">
    <div class="selCon" id="choseCon_box">
      <div class="cang_select_02">
        <div>当前条件：</div>
        <ul class="cang_select_04 has_selected" id="chosed_box">
        </ul>
      </div>
      <div class="cang_select_02 cang_select_03">
        <div>年代：<i class="show_all"></i></div>
        <ul class="cang_select_05 city_select" id="1">
          <li id="1-0">不限</li>
              <li id="1-34" name="34" > 新石器时代</li>
              <li id="1-35" name="35" > 商周</li>
              <li id="1-36" name="36" > 春秋战国</li>
              <li id="1-37" name="37" > 秦两汉魏晋</li>
              <li id="1-38" name="38" > 隋唐五代</li>
              <li id="1-39" name="39" >宋辽金元西</li>
              <li id="1-40" name="40" > 明朝</li>
              <li id="1-41" name="41" > 清朝</li>
              <li id="1-42" name="42" > 民国</li>
              <li id="1-43" name="43" > 现代</li>
        </ul>
      </div>
      <div class="cang_select_02 cang_select_03">
        <div>玉料及产地：<i class="show_all"></i></div>
        <ul class="cang_select_05 city_select" id="2">
          <li id="2-0">不限</li>
              <li id="2-44" name="44" > 和田籽料</li>
              <li id="2-45" name="45" > 和田山料</li>
              <li id="2-46" name="46" >俄罗斯山流</li>
              <li id="2-47" name="47" > 俄罗斯山料</li>
              <li id="2-48" name="48" > 青海料</li>
              <li id="2-49" name="49" > 韩料</li>
              <li id="2-50" name="50" > 岫岩河磨料</li>
              <li id="2-51" name="51" > 翡翠</li>
              <li id="2-52" name="52" >和田碧玉（</li>
              <li id="2-53" name="53" > 俄罗斯碧玉</li>
              <li id="2-54" name="54" > 加拿大碧玉</li>
              <li id="2-55" name="55" >非软玉地方</li>
              <li id="2-56" name="56" > 石英质</li>
              <li id="2-57" name="57" > 蛇纹石</li>
              <li id="2-58" name="58" > 东北河磨玉</li>
              <li id="2-59" name="59" > 青海碧玉</li>
              <li id="2-60" name="60" > 大理石</li>
              <li id="2-61" name="61" > 黄蜡石</li>
              <li id="2-62" name="62" > 其它</li>
        </ul>
      </div>
      <div class="cang_select_02 cang_select_03">
        <div>表现形式：<i class="show_all"></i></div>
        <ul class="cang_select_05 city_select" id="3">
          <li id="3-0">不限</li>
              <li id="3-63" name="63" > 籽料</li>
              <li id="3-64" name="64" > 把件</li>
              <li id="3-65" name="65" > 珠管环串</li>
              <li id="3-66" name="66" > 挂件/佩件</li>
              <li id="3-67" name="67" > 摆件</li>
        </ul>
      </div>
      <div class="cang_select_02 cang_select_03">
        <div>有无品相：<i class="show_all"></i></div>
        <ul class="cang_select_05 city_select" id="4">
          <li id="4-0">不限</li>
              <li id="4-68" name="68" > 全品</li>
              <li id="4-69" name="69" > 瑕疵品</li>
              <li id="4-70" name="70" > 残件</li>
              <li id="4-71" name="71" > 修补品</li>
        </ul>
      </div>
      <div class="cang_select_02 cang_select_03">
        <div>形状：<i class="show_all"></i></div>
        <ul class="cang_select_05 city_select" id="5">
          <li id="5-0">不限</li>
              <li id="5-72" name="72" > 佛像</li>
              <li id="5-73" name="73" > 动物</li>
              <li id="5-74" name="74" > 生肖系列</li>
              <li id="5-75" name="75" > 星座系列</li>
              <li id="5-76" name="76" > 如意</li>
              <li id="5-77" name="77" > 平安扣</li>
              <li id="5-78" name="78" > 植物</li>
              <li id="5-79" name="79" > 路路通</li>
              <li id="5-80" name="80" > 龙/凤</li>
              <li id="5-81" name="81" > 几何</li>
              <li id="5-82" name="82" > 心形</li>
              <li id="5-83" name="83" > 貔貅</li>
              <li id="5-84" name="84" > 其他形状</li>
        </ul>
      </div>
      <div class="btns"><span class="wc" id="btn_sure">确定</span></div>
    </div>
  </div>

```

## 属性

### url

**说明**：品种对应的url字段

**必选项**：是

**类型**：字符串

**默认值**：无

### list

**说明**：该品种下对应的条件id的字符串，用','隔开

**必选项**：是

**类型**：字符串

**默认值**：无

### chosed-box

**说明**：筛选弹窗中已选条件的容器id

**必选项**：是

**类型**：字符串

**默认值**：无

## 注意事项

1，筛选条件的ul需添加'city_select'类名

2，筛选按钮id为'show_chose'，筛选弹窗id为'chose_box'，筛选内容弹窗id为'choseCon_box'

3，筛选条件的展开与收起使用i.show_all标签