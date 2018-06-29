# `mip-jkx-board`

## 说明

极客修留言组件

## 示例

<div class="message">
    <div class="textBox" >
        <span class="num">{{num}}/60</span>
        <textarea maxlength="60" class="jkx_textBox" placeholder="您还可以详细描述故障，或提出其他要求" v-model="desc" @input="descInput" @blur="blur"></textarea>
    </div>
<div class="tips"> <p>工作时间（08:00-22:00）内将有来自重庆区号023的电话与您联系确认详情！</p> </div>

## 属性

descInput：输入的内容最多60个

