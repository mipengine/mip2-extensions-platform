<template>
  <div class="zfcg">
    <h3 class="succ">{{ orderState }}</h3>
    <div class="cg"/>
    <div class="butt">
      <!-- <a class="yy" href="https://author.baidu.com/home/1601150861293373" target="_slef">选购课程</a> -->
      <a
        class="yy"
        href="http://m.chinaacc.com/mip/shitingList/index.shtml"
        target="_slef">选购课程</a>
      <a
        class="yy"
        href="http://m.chinaacc.com"
        target="_blank">去看书</a>
      <a
        class="see"
        @click="goUrl">查看我的订单</a>
    </div>
  </div>
</template>

<script>
import { gotoUrl, getUrlParams } from '../../common/utils'
export default {
  data () {
    return {
      orderState: ''
    }
  },
  async mounted () {
    let params = getUrlParams()
    let payResult = params.payResult
    if (payResult == null || payResult + '' === '0') {
      this.orderState = '订单关闭'
    } else if (payResult + '' === '1') {
      this.orderState = '订单支付成功'
    } else if (payResult + '' === '2') {
      this.orderState = '订单支付失败'
    }
  },
  methods: {
    goUrl () {
      gotoUrl('/payment/allOrder.html')
    }
  }
}
</script>
