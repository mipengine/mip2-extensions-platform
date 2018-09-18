<template>
  <div class="mip-complete">
    <div class="top">
      <mip-img
        :src="success"
        class="mesimg"
        width="79"
        height="72"
      />
      <div class="mestext">
        <h2>预约成功</h2>
        <p>大厅</p>
      </div>
    </div>
    <div class="detail">到店就餐请报手机号即可<a href="./orderdetails.html">订单详情</a></div>
    <mip-fixed
      class="pay"
      @click="toJump">完成</mip-fixed>
  </div>
</template>

<style scoped>
.mip-complete{
  color: #666666;
}
.top{
  height: 140px;
  padding-top: 40px;
  text-align: center;
}
.mip-complete::before{
content: "";
position: absolute;
background:  #E0E0EB;
width: 200%;
height: 1px;
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
.top .mesimg{
  display: inline-block;
}
.top .mestext{
  height: 72px;
  display: inline-block;
  text-align: left;
  vertical-align: top;
  margin-left: 20px;
}
.top .mestext h2{
  font-size: 26px;
  font-weight: normal;
  color: #00C093;
  margin-top: 10px;
}
.top .mestext p{
  font-size: 16px;
  margin-top: 10px;
}
.detail{
  padding-top: 10px;
  width: 90%;
  margin: 0 auto;
  border-top: 2px solid #E4E4E4;
}
.detail a{
  color: #FD8F14;
  float: right;
}
.pay{
    height: 48px;
    width: 100%;
    left: 0;
    bottom: 0;
    line-height: 48px;
    text-align: center;
    border-top: 1px solid #BEBEBE;
    background: #FFFFFF;
    font-size: 16px;
    color: #00C093;
    display: block !important;
}
</style>

<script>
import success from '@/static/success.png'
export default {
  data () {
    return {
      success: success
    }
  },
  methods: {
    toJump () {
      MIP.viewer.open('./index.html')
    }
  }
}
</script>
