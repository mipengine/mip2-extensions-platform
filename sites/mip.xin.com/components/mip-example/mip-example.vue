<template>
  <div class="wrapper">
    <div class="car-title">奔驰 GLK级 2013款 3.0自动 GLK300动感天窗型</div>
    <div class="price-part">
      <span class="price">14.52万</span>
      <span class="discount">我要优惠</span>
      <div class="tax">新车含税20.17万元</div>
    </div>
  </div>
</template>

<style scoped>

.wrapper {
  margin: 0 auto;
}
.car-title{
  height: 0.56rem;
  padding: 0.15rem 0.2rem;
  font-size:0.18rem;
  text-align: left;
  color:#333333;
}
.price-part{
  width: 3.35rem;
  height: 0.55rem;
  padding: 0 0.2rem;
}
.price{
  height: 0.3rem;
  line-height:0.3rem;
  font-size: 0.3rem;
  color: #F85D00;
  font-family:PingFangSC-Medium;
}
</style>
<script src="/mip-example/mip-example.js"></script>
<script>
export default {
  mounted () {
    // console.log(requestFun);
    // let param = {
    //     carid:'39717055',
    //     cityid:'201',
    //     os: 'wap',
    //     search_cityid: '201'
    // }
    // requestFun('/cardetail/view', {
    //         method: 'POST',
    //         param: param
    //     }).then((res) => {
    //       console.log(res)
    //     }).catch((err) => {
    //       console.log(err)
    //     })
  }
}
</script>
