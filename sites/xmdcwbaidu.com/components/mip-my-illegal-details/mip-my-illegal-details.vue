<template>
  <div class="illegal-details">
    <div class="details-top">
      <div
        class="top-left"
        v-text="theOrder.plateNumber"/>
      <div class="top-right">共<span v-text="orderDetail.length"/>条</div>
    </div>
    <div class="details-content-container">
      <div class="details-content-tip">*若办理失败，退款将在7个工作日内原路返回</div>
      <div
        v-for="(order, index) in orderDetail"
        :key="index"
        class="details-content">
        <div class="details-item">
          <div class="details-item-left">
            办理标志：<span v-text="sign(order.manageStatus)"/>
          </div>
          <div class="details-item-right">
            扣分数：<span v-text="order.score"/>分
          </div>
        </div>
        <div class="details-item">
          <div class="details-item-left">
            罚款金额：<span v-text="order.fine"/>元
          </div>
          <div class="details-item-right">
            服务费：<span v-text="order.fee"/>元
          </div>
        </div>
        <div class="details-item">
          <div class="line"/>
        </div>
        <div class="details-item">
          <div class="details-item-left2">
            违法时间
          </div>
          <div
            class="details-item-right2"
            v-text="order.violationTime"/>
        </div>
        <div class="details-item">
          <div class="details-item-left2">
            违法地址
          </div>
          <div
            class="details-item-right2"
            v-text="order.site"/>
        </div>
        <div class="details-item">
          <div class="details-item-left2">
            违法行为
          </div>
          <div
            class="details-item-right2"
            v-text="order.violationBehavior"/>
        </div>
        <div class="details-item">
          <div class="details-item-left2">
            违法序号
          </div>
          <div
            class="details-item-right2"
            v-text="order.sequences"/>
        </div>
        <div class="details-item">
          <div class="details-item-left2">
            滞纳金
          </div>
          <div
            class="details-item-right2"
            v-text="order.overdue + '元'"/>
        </div>
      </div>
    </div>
    <div class="details-footer">
      <div class="details-footer-box">
        <p>本服务由小优车务提供</p>
        <p>客服热线：<span>020-3113646</span>(工作日：9:00-17:00)</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../../common/less/const";
@import "../../common/less/common.less";

.illegal-details {
  background: rgba(245, 245, 245, 1);
  margin: 0 auto;
  // text-align: center;
  height: 100%;
  .details-top {
    background: #fff;
    padding: 0 0.3rem;
    height: 0.92rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .top-left {
      font-size: @font-large;
      color: rgba(51, 51, 51, 1);
    }
    .top-right {
      font-size: @font-medium;
      color: rgba(51, 51, 51, 1);
      span {
        color: #ff4925;
      }
    }
  }
  .details-content-container {
    margin: 0 0.3rem;
    .details-content-tip {
      height: 0.77rem;
      line-height: 0.77rem;
      color: rgba(153, 153, 153, 1);
      font-size: @font-small;
      text-align: left;
    }
  }
  .details-content {
    background: #fff;
    padding-bottom: 0.3rem;
    span {
      color: #ff4925;
    }
    .details-item {
      color: rgba(51, 51, 51, 1);
      font-size: @font-medium;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-top: 0.3rem;
      .details-item-left {
        padding-left: 0.3rem;
        width: 70%;
      }
      .details-item-right {
        width: 30%;
        text-align: right;
        padding-right: 0.3rem;
      }
      .line {
        height: 1px;
        background: red;
      }
      .details-item-left2 {
        padding-left: 0.3rem;
        width: 30%;
      }
      .details-item-right2 {
        width: 70%;
        text-align: right;
        padding-right: 0.3rem;
      }
    }
  }
}
</style>

<script>
import { resetRem, Storage } from '../../common/utils/common'
export default {
  data () {
    return {
      theOrder: '',
      plateNumber: '',
      orderDetail: ''
    }
  },
  mounted () {
    console.log('This is my first custom component !')
  },
  created () {
    let self = this
    resetRem()
    self.$nextTick(function () {
      self.orderDetail = Storage.get('orderDetail')
      self.theOrder = Storage.get('theOrder')
      console.log(self.orderDetail)
      console.log(self.theOrder)

      self.plateNumber = self.theOrder.plateNumber
    })
  },
  methods: {
    sign: function (state) {
      if (state === 0) {
        return '待审核'
      }
      if (state === 1) {
        return '处理中'
      }
      if (state === 2) {
        return '办理失败'
      }
      if (state === 3) {
        return '办理成功'
      }
      return '其它'
    }
  }
}
</script>
