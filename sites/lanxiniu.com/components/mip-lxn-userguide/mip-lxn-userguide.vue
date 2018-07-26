<template>
  <div class="wrapper">
    <ul class="guideList">
      <li class="maintab">
        <span>
          常见问题
        </span>
      </li>
      <li class="border-first">
        <p
          :class="{'open-detail':qubie.flag}"
          @click="open(qubie)">
          <span>搬家和货运的区别</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="qubie.flag"
          class="detail">
          货运为师傅仅为您提供从A地到B地的货物运输服务，如您需要师傅提供搬运服务需要与师傅协商价格；
          搬家为一口价的含搬运的搬家服务，除厢货涉及到部分额外大件费用外，其他价格均为一口价，价格透明，绝不会坐地起价。
        </div>
      </li>
      <li>
        <p
          :class="{'open-detail':youhui.flag}"
          @click="open(youhui)">
          <span>如何获得优惠</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="youhui.flag"
          class="detail">
          <p>1.搬家用户可以参与【砍价活动】获取搬家优惠券，最高优惠金额可达96元</p>
          <p>2.邀请好友用车，好友成功用车后您也可以获得优惠券。</p>
          <p>3.用车成功后，参与【好评返现】，还可以领取返现红包哦。</p>
        </div>
      </li>
      <li>
        <p
          :class="{'open-detail':sfbanyun.flag}"
          @click="open(sfbanyun)">
          <span>搬家师傅是否管搬运</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="sfbanyun.flag"
          class="detail">
          搬家订单师傅是提供全程搬运的，搬运的范围为一整车的搬运，一整车包含多趟往返，不单独按搬运次数计算。
        </div>
      </li>
      <li>
        <p
          :class="{'open-detail':cancel.flag}"
          @click="open(cancel)">
          <span>取消及退款问题</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="cancel.flag"
          class="detail">
          <p class="heads">怎么取消订单</p>
          <p>在【个人中心】中找到需要取消的订单，点击订单下方的取消订单按钮，确定【取消】即可。<br>
            请注意：由于您自己的原因导致的取消会收取取消费。在服务开始前如因司机原因造成的取消，可联系客服处理。<br>
            搬家订单取消规则：<br>
            预约服务：服务开始前40分钟取消，收取40元取消费；车辆到位且到达服务时间，收取起步价作为取消费；<br>
            马上服务：车辆到位且等待20分钟后，收取40元作为取消费。<br>
            取消费为司机空驶的补偿。</p>
          <p class="heads">退款到账时间及方式</p>
          <p>订单取消后，支付的金额均会原路退回到支付账户，退款时间为3-5个工作日。</p>
        </div>
      </li>
      <li>
        <p
          :class="{'open-detail':fapiao.flag}"
          @click="open(fapiao)">
          <span>如何开发票</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="fapiao.flag"
          class="detail">
          在线支付的费用，在订单服务完成后，可以在【个人中心】中找到【发票】，输入发票信息申请开票即可。
        </div>
      </li>
      <li class="border-second">
        <p
          :class="{'open-detail':safetousu.flag}"
          @click="open(safetousu)">
          <span>安全与投诉</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="safetousu.flag"
          class="detail">
          <p class="heads">平台司机认证体系</p>
          <p>所有服务搬家司机，均是平台认证的好司机哦，不仅统一培训、考试，更是经过数据考核与服务质量的双重考核过关的！</p>
          <p class="heads">司机爽约、多收费怎么办</p>
          <p>如遇到司机爽约、拒绝服务、多收费的，可以向400投诉。客服人员会对您的投诉进行核实处理，如情况属实，平台会对司机进行处罚。</p>
          <p class="heads">怎么投诉司机</p>
          <p>在【个人中心】-【我的订单】中，找到要投诉的订单，进入订单详情中，点击右上角的投诉，进行投诉即可。</p>
        </div>
      </li>

      <li class="maintab">
        <span>
          订单问题
        </span>
      </li>
      <li class="border-first">
        <p
          :class="{'open-detail':zjtjd.flag}"
          @click="open(zjtjd)">
          <span>是否可以增加途经地</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="zjtjd.flag"
          class="detail">
          搬家订单系统默认为2个地址，如果您需要中间增加途经地，在司机服务过程中，直接和司机沟通即可。
          搬家订单增加途经地，需要额外支付50元的增加途经地的费用。
        </div>
      </li>
      <li>
        <p
          :class="{'open-detail':gstcf.flag}"
          @click="open(gstcf)">
          <span>高速费、停车费谁来付</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="gstcf.flag"
          class="detail">
          所有由第三方收取的费用，如高速费、停车费均由您来承担。
        </div>
      </li>
      <li>
        <p
          :class="{'open-detail':fyzf.flag}"
          @click="open(fyzf)">
          <span>费用如何支付</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="fyzf.flag"
          class="detail">
          <p class="heads">费用如何支付</p>
          <p>搬家订单用户在下单时就需要在线支付订单费用，此时费用会预付到平台，您可获得平台提供的安全保障。</p>
          <p class="heads">订单尾款怎么支付？</p>
          <p>在订单服务结束后，您可在【个人中心】-我的订单中，找到您的订单，点击立即支付即可。也可以扫司机端的二维码进行在线支付。</p>
          <p class="heads">额外费用怎么支付？</p>
          <p>当您在使用搬家服务过程中，产生需要二次支付的费用时（如增加搬运工人、停车费、拆装费等），您需要在服务结束时，扫司机的收款码进行支付，搬家订单全程无现金支付。</p>
        </div>
      </li>
      <li>
        <p
          :class="{'open-detail':ghdriver.flag}"
          @click="open(ghdriver)">
          <span>想要换司机怎么办</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="ghdriver.flag"
          class="detail">
          当您遇到司机无法正常服务或司机迟到，可联系客服400-678-5966更换司机。
        </div>
      </li>
      <li class="border-second">
        <p
          :class="{'open-detail':lxdriver.flag}"
          @click="open(lxdriver)">
          <span>联系不上司机怎么办</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="lxdriver.flag"
          class="detail">
          如果您在下单后，尝试几次无法联系司机，请您拨打客户电话：400-678-5966处理，客服会根据您的需要帮您安排其他司机。
        </div>
      </li>
      <li class="maintab">
        <span>
          保险保障
        </span>
      </li>
      <li class="border-first">
        <p
          :class="{'open-detail':bxbzfwsm.flag}"
          @click="open(bxbzfwsm)">
          <span>保险保障服务说明</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="bxbzfwsm.flag"
          class="detail">
          保险保障服务是平台为所有订单提供的货物运输的保障。当您的订单在运输过程中出现货损，请第一时间与客服联系进行理赔，客服电话：400-678-5966。
        </div>
      </li>
      <li class="border-second">
        <p
          :class="{'open-detail':lpgz.flag}"
          @click="open(lpgz)">
          <span>理赔规则</span>
          <span class="arrow"/>
        </p>
        <div
          v-show="lpgz.flag"
          class="detail">
          <p>1. 保险保障仅包含货物运输过程中出现的货损等问题，不包含货物搬运过程中产生的人为损坏。</p>
          <p>2. 理赔受理时效为订单服务结束之前，建议您在货物到达目的地时进行验货，超时后则不予受理。</p>
          <p>3. 理赔处理时效为2个工作日，受理成功的理赔保险，会在2个工作日内处理完成。</p>
          <p>4. 理赔金额上限为5000元。</p>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import base from '../../common/utils/base'
export default {
  data () {
    return {
      qubie: { // 搬家和货运的区别
        flag: false
      },
      youhui: { // 如何获得优惠
        flag: false
      },
      sfbanyun: { // 搬家师傅是否管搬运
        flag: false
      },
      cancel: {// 取消及退款问题
        flag: false
      },
      fapiao: {// 如何开发票
        flag: false
      },
      safetousu: {// 安全与投诉
        flag: false
      },
      zjtjd: {// 是否可以增加途经地
        flag: false
      },
      gstcf: {// 高速费、停车费谁来付
        flag: false
      },
      fyzf: {// 费用如何支付
        flag: false
      },
      ghdriver: {// 想要换司机怎么办
        flag: false
      },
      lxdriver: {// 联系不上司机怎么办
        flag: false
      },
      bxbzfwsm: {// 保险保障服务说明
        flag: false
      },
      lpgz: {// 理赔规则
        flag: false
      }

    }
  },
  created () {
    console.log('创建数据')
    base.setHtmlRem()
  },
  mounted () {
    console.log('This is my first custom component !')
  },
  methods: {
    open (item) {
      item.flag = !item.flag

      console.log(item)
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
-webkit-overflow-scrolling: touch;
}
.guideList{
    text-align: left;
    padding: .1rem .32rem;
}
.guideList li{
    font-size: .26rem;
    background: #ffffff;
    padding: .26rem .3rem;
    color: #222222;
    list-style: none;
    border-bottom: .03rem solid #f3f3f3;
}
.guideList li.maintab{
    background: unset;
    border: none;
    font-size: .32rem;
    color: #222222;
    padding-left: .5rem;
    padding-bottom: .15rem;
}
.guideList li.maintab span{
     position: relative;
}
.guideList li.maintab span::before{
    position: absolute;
    content: "";
    display: inline-block;
    left: -.15rem;
    top: 0.03rem;
    /* top: .2rem; */
    width: .06rem;
    height: .28rem;
    background: #45A3EC;
    border-radius: 2rem;
}
.border-first{
    /* border--topradius: .08rem; */
    border-top-left-radius: .08rem;
     border-top-right-radius: .08rem;
}
.border-second{
    border-bottom-left-radius: .08rem;
    border-bottom-right-radius: .08rem;
}

.arrow{
    margin-top: .1rem;
    float: right;
    display: inline-block;
    width: .16rem;
    height: .16rem;
    border:.02rem solid #4D4D4D;
    border-left: none;
    border-bottom: none;
    transform: rotate(45deg);
}
.open-detail .arrow{
    transform: rotate(135deg);
    margin-top: 0;
}

.detail{
    margin-top: .2rem;
    padding: 0 .1rem;
    font-size: .24rem;
    line-height: 1.5;
    color: #888888;
}
.heads{
    font-size: .24rem;
    color: #45A3EC;
    padding: .15rem 0;
}
</style>
