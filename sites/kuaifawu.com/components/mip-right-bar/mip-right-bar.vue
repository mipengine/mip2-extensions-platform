<template>
  <div class="wrapper">
    <mip-fixed
      type="right"
      right="0"
      class="fr">
      <div class="customer">
        <a href="http://dbt.zoosnet.net/LR/Chatpre.aspx?id=DBT35838153&lng=cn">
          <div class="customer-icon-1"/>
          <div class="customer-txt">在线</div>
        </a>
        <a href="tel:4006028082">
          <div class="customer-icon-2"/>
          <div class="customer-txt">电话</div>
        </a>
      </div>
    </mip-fixed>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
.fr {
  width: 0.54rem;
  bottom: 0.8rem;
  right: 0.1rem;
}
.customer a{
  height: 0.54rem;
  width: 0.54rem;
  display: block;
  margin-top: 0.13333rem;
  padding-top: 0.06rem;
  -moz-border-radius: 50%;
  font-size: 0.1rem;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: rgba(71, 212, 177, 0.85);
  box-sizing:border-box;
}
.customer-icon-1 {
  background:url(../../static/image/home_online.png) no-repeat center;
  background-size: contain;
  height: 0.2rem;
  margin-bottom: 0.06rem;
}
.customer-icon-2 {
  background:url(../../static/image/home_phone.png) no-repeat center;
  background-size: contain;
  height: 0.2rem;
  margin-bottom: 0.06rem;
}
.customer a .customer-txt {
  color: #f3f6f6;
  font-size: 0.1rem;
  text-align: center;
}
</style>

<script>
export default {
  mounted () {
    console.log('This is 右侧咨询 !')
  }
}
</script>
