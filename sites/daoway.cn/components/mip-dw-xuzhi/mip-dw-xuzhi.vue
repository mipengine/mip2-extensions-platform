<template>
  <div class="wrapper">

    <div class="content">
      <div><img
        style="vertical-align: top"
        src="http://www.daoway.cn/mip/common/images/xuzhi.jpg"
        width="100%"
        height="auto"></div>
      <div class="xuzhiconter">
        <dl>
          <dt>01</dt>
          <dd><h3>商家接单</h3><p>用户付款下单后，商家需在<i>30分钟内</i>确认是否接单。如果下单时间不在营业时间，商家需在<i>次日上班后60分钟内</i>确认是否接单。</p></dd>
        </dl>
        <dl>
          <dt>02</dt>
          <dd><h3>正常退款</h3><p>商家已确认接单后，在<i>商家营业时间内、离约定时间2小时之前</i>，用户申请退款的，商家应予以100%退款。</p></dd>
        </dl>
        <dl>
          <dt>03</dt>
          <dd><h3>商家爽约</h3>
            <p>商家已确认接单后，<i>商家单方面再取消订单</i>或在未事先取得用户同意的情况下<i>超过约定时间2小时</i>仍未上门的，均视为商家爽约。用户申请退款时，若尚未开始服务商家须将已付款项予以100%退款，并通过到位平台向用户另行<i>赔付30元</i>爽约金。</p>
          </dd>
        </dl>
        <dl>
          <dt>04</dt>
          <dd><h3>用户爽约</h3>
            <p>商家已确认接单后，<i>用户单方面在离约定时间2小时内申请退款</i>、商家按时上门后用户拒绝接受服务、商家按时上门后无法联系到用户导致未能提供服务，均视为用户爽约。商家可按已安排的服务人员数<i>扣取30元/人</i>的爽约金（空单费)。如商家已安排服务车辆上门的，可另行扣取最高不超过100元/辆的空驶费，其余部分应予以退款。</p>
          </dd>
        </dl>
        <dl>
          <dt>05</dt>
          <dd><h3>协商退款</h3>
            <p>在商家开始服务后，如果<i>用户对商家提供的服务不满意</i>用户可向商家申请部分退款，具体退金额需和商家协商。协商不成的将由到位平台客服进行仲裁，以保障用户和商家双方的合理权益。</p>
          </dd>
        </dl>
      </div>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

i {
  font-style: normal
}

li, ol {
  list-style: none
}

.xuzhiconter{padding:3%;}
.xuzhiconter h3{font-size: 14px; color: #f95252; margin: 0; text-align: left}
.xuzhiconter dt{width: 27px; height: 27px; display: inline-block; vertical-align: top; background: url("http://www.daoway.cn/mip/common/images/xuzhi_number.png") no-repeat center; background-size: 100% 100%; color: #fff; text-align: center; line-height: 27px; font-size: 14px;margin-top: 4px}
.xuzhiconter dd{width: 86%; margin: 0; display: inline-block; margin-left: 2%; margin-top: 5px; line-height: 22px}
.xuzhiconter dd p{margin: 5px 0; font-size: 12px;text-align: left}
.xuzhiconter dd p i{color: #f95252}
#xuzhi{position: relative; bottom: 0.02rem; float: right; right: 5px}
#page-orderstate .icon{font-size: 12px; position: relative; bottom: 0.1rem; left: 5px}
#page-neworder .icon{font-size: 12px; }
.needpay b{font-weight: normal}
</style>

<script>
export default {
  data: function () {
    return {
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {

  }
}
</script>
