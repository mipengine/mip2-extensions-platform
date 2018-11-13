<template type="mip-mustache">
  <div class="mip-about">
    <h3>关于盯座</h3>
    <p class="title">盯座预定</p>
    <p>餐厅即时餐位预定，实时空闲桌位预定，无需等待，24小时无人值守自助预定台，优质包间自选按！</p>
    <p class="title">开发者</p>
    <p>北京盛宴联盟科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;(110105016472875)</p>
  </div>
</template>

<style scoped>
h3::before{
content: "";
position: absolute;
background:  #E0E0EB;
width: 200%;
height: 1px;
position: absolute;
top: -20px;
left: 0;
-webkit-transform-origin: 0 0;
-moz-transform-origin: 0 0;
-ms-transform-origin: 0 0;
-o-transform-origin: 0 0;
transform-origin: 0 0;
-webkit-transform: scale(0.5, 0.5);
-ms-transform: scale(0.5, 0.5);
-o-transform: scale(0.5, 0.5);
transform: scale(0.5, 0.5);
}
/* 隐藏滚动条 */
h3{
  font-size: 18px;
  font-weight: normal;
  text-align: center;
  margin: 20px 0;
}
p{
  padding: 0 20px;
  margin-bottom: 20px;
  color: #999999;
  font-size: 13px;
}
.title{
  color: #00C093;
  margin-bottom: 10px;
  font-size: 16px;
}
</style>

<script>
export default {

}
</script>
