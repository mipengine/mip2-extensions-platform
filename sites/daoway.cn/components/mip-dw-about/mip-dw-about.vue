<template>
  <div class="wrapper">
    <div class="logodiv">
      <img
        class="logo"
        src="http://www.daoway.cn/mip/common/images/logo.png"
        style="width:55px; height:55px">
    </div>
    <div class="list">官方微信号
      <div class="rightv">到位</div>
    </div>
    <div class="list">商务合作
      <div class="rightv rig"><a href="tel:010-64522010"/>010-64522010</div>
      <div class="navigator-arrow"/>
    </div>
    <div class="list last">客服电话
      <div class="rightv rig"><a href="tel:4000908608"/>4000908608</div>
      <div class="navigator-arrow"/>
    </div>
    <mip-fixed type="bottom">
      <div class="daoway">
        <div class="linjia">北京邻家科技有限公司</div>
        <div class="www">daoway.com</div>
      </div>
    </mip-fixed>
  </div>
</template>
<style scoped>
.wrapper {
  margin: 0 auto;
}
.logo{margin-top: 35px}
.logodiv{width: 100%; height: 140px; line-height: 140px; text-align: center;}
.list{width: 94%; height: 45px; line-height: 45px; background: #fff; padding: 0 3%; border-bottom: 1px solid #e5e5e5; position: relative; font-size:14px}
.last{border: none}
.list div{display: inline-block}
.rightv{float: right;color: #969696; width: 100px; text-align: right}
.daoway{width: 100%; line-height: 18px;  text-align: center; }
.www{color: #969696}
.navigator-arrow{position: absolute; top: 22px; right: 3%;}
.rig{padding-right: 3%}

</style>

<script>
export default {
  mounted () {
  }
}
</script>
