<template>
  <div class="wrapper">

    <div class="root">
      <mip-vd-tabs current="1">
        <section>
          <li class="shoucang">收藏</li>
          <li class="dingdan">订单</li>
        </section>
        <div class="fav">
          <mip-ptg-fav-list
            id="favlist"
          />
        </div>
        <div class="ord">
          <mip-ptg-order-list
            id="orderlist"
            on="dook:orderlist.dook docancel:orderlist.docancel"
          />
        </div>
      </mip-vd-tabs>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
    .shoucang{
      border-right:solid 1px #f4f4f4 !important;
      height: 30px !important;
      line-height: 30px !important;
      margin-top: 7px !important;
    }
    .dingdan{
      height: 30px !important;
      line-height: 30px !important;
      margin-top: 7px !important;
    }
    .mip-vd-tabs-nav-selected{
      color: #afd03b!important;
      border-bottom: none !important;
    }
</style>

<script>
export default {
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is my first custom component !')
  }
}
</script>
