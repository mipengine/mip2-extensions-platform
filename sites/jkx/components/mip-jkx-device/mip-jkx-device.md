# `mip-jkx-device`

## 说明
极客修设备及故障

## 示例

<div class="wra">
    <div class="wrapper" @click="open(index)" v-for="(item,index) in headMsg" :key="index" :class="{wrapper1:index>0}">
    <p class="title">{{item}}</p>
    <p class="name">{{index==0?name:name1}}</p>
    <p class="arrow"></p>
  </div>

## 属性

headMsg:["设备型号","设备故障"],
