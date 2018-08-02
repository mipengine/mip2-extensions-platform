<template>
  <div class="root">
    <div
      v-for="order in list"
      :key="order.order_number"
      class="row">
      <p class="row_p">
        <span class="row_header">
          编号: {{ order.order_number }}
        </span>
        <span class="status">
          {{ order.desc_str }}
        </span>
      </p>
      <div
        class="info"
        @click="handleBtn(order)">
        <mip-img
          :src="order.master.header.small"
          layout="responsive"
          width="85px"
          height="22px"
          class="header"/>
        <!-- <mip-img layout="responsive" width="85px" height="22px"
                  class="header" src="i/age.png" ></mip-img> -->
        <span class="name">{{ order.master.name }}</span>
        <p class="starBox">

          <mip-img
            v-for="(item,index) in order.master.star_1_list"
            :key="index"
            layout="responsive"
            width="12"
            height="12"
            class="iconStar"
            src="https://mip.putibaby.com/i/select_master_star.png"/>
          <mip-img
            v-for="(item,index) in order.master.star_0_list"
            :key="index"
            layout="responsive"
            width="12"
            height="12"
            class="iconStar iconStar_no"
            src="https://mip.putibaby.com/i/select_master_unstar.png"/>

        </p>

        <span class="price">￥{{ order.master.ptg_price }}</span>
        <div class="message">
          <mip-img
            layout="responsive"
            width="85px"
            height="22px"
            class="age_img"
            src="i/age.png"/>
          <span class="age">{{ order.master.age }}岁</span>
          <mip-img
            layout="responsive"
            width="85px"
            height="22px"
            class="work_year_img"
            src="i/work_year.png"/>
          <span class="work_year">{{ order.master.work_year }}年</span>
          <mip-img
            layout="responsive"
            width="85px"
            height="22px"
            class="jiguan_img"
            src="i/jiguan.png"/>
          <span class="jiguan">{{ order.master.jiguan }}</span>
        </div>
      </div>
      <div class="row_footer">
        <div class="btn_list">
          <div
            v-if="order.showBtn_tuijian"
            class="tuijianBtn"
            @click="handleBtn_tuijian(order)">推荐</div>
          <div
            v-if="order.showBtn_shipinyuyue"
            class="tuijianBtn"
            @click="handleBtn_shipinyuyue(order)">发起视频预约</div>

          <div
            v-if="order.showBtn_chakanshipin"
            class=""
            @click="handleBtn_chakanshipin(order)">查看视频</div>
          <div
            v-if="order.showBtn_wodeyuyue"
            class="tuijianBtn"
            @click="handleBtn_wodeyuyue(order)">我的预约</div>
          <div
            v-if="order.showBtn_buheshi"
            class="tuijianBtn"
            @click="handleBtn_buheshi(order)">不合适</div>
          <div
            v-if="order.showBtn_shanchu"
            class="tuijianBtn"
            @click="handleBtn_shanchu(order)">删除</div>
          <div
            v-if="order.showBtn_dianhualianxi"
            class="tuijianBtn"
            @click="handleBtn_dianhualianxi(order)">电话联系</div>
          <div
            v-if="true || order.showBtn_lianxikefu"
            class="tuijianBtn"
            @click="handleBtn_lianxikefu(order)">联系客服</div>
          <div
            v-if="order.showBtn_nidinghetong"
            class="tuijianBtn boldBtn"
            @click="handleBtn_nidinghetong(order)">拟定合同</div>
          <div
            v-if="order.showBtn_chakanhetong"
            class="tuijianBtn"
            @click="handleBtn_chakanhetong(order)">查看合同</div>
          <div
            v-if="order.showBtn_jiaodingjin"
            class="tuijianBtn boldBtn"
            @click="handleBtn_jiaodingjin(order)">交定金</div>
          <div
            v-if="order.showBtn_qianyue"
            class="tuijianBtn boldBtn"
            @click="handleBtn_qianyue(order)">签约</div>
          <div
            v-if="order.showBtn_shanghu"
            class="tuijianBtn boldBtn"
            @click="handleBtn_shanghu(order)">邀请上户</div>
          <div
            v-if="order.showBtn_fukuan"
            class="tuijianBtn boldBtn"
            @click="handleBtn_fukuan(order)">付款</div>
            <!-- <div class="btn tuijianBtn" v-if="order.showBtn_xuqian" @click="handleBtn_xuqian(order)">续签</div> -->
        </div>
        <div class="clear"/>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}

body {
  background-color: #F1F5E2 !important;
}

.root {
  background-color: #F1F5E2;
  padding:10px;
  padding-top: 1px;
  padding-bottom: 40px;
}

.row {
  background: #fff;
  margin-top: 10px;
  position: relative;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
}

.row_p {
  margin: 0px;
  padding: 0px;
  line-height: 30px;
  border-bottom: 1px solid #f4f4f4;
}

.status {
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
  color: #afd03b;
  cursor: pointer;
  float: right;
  font-size: 15px;
}
.row_header {
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  color: #666;
  cursor: pointer;
  font-size: 13px;
}
.row_footer {
  border-top: 1px solid #f4f4f4;
  background-color: #fff;
  height: 30px;
  padding-right: 10px;
}

.starBox{
  position:absolute;
  left:125px;
  top:18px;
}

.starBox mip-img{
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-left:2px;
  float:left;
}

.btn_list {
  float: right;
  text-align: right;
}

.tuijianBtn {
  border: 1px solid #afd03b;
  display: inline-block;
    border-radius: 15px;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    padding: 3px 8px;
  margin: 5px 0px 8px 1px;
  color: #afd03b;
  cursor: pointer;
}
.boldBtn{
  background-color: #afd03b;
  color: #fff;
}
.info {
  background: #fff;
  position: relative;
  height: 68px;
  overflow: hidden;
  cursor: pointer;
}

.header {
  width: 68px;
  height: 68px;
  position: absolute;
  top: 0px;
  left: 0px;
}

.name {
  font-size: 15px;
  color: #666;
  position: absolute;
  top: 15px;
  left: 78px;
}
.price {
  font-size: 16px;
  font-weight: bold;
  color: red;
  position: absolute;
  top: 15px;
  right: 10px;
}

.message {
  font-size: 13px;
  color: #999;
  position: absolute;
  top: 40px;
  left: 78px;
}

.age_img {
  width: 13px;
  height: 10px;
  position: relative;
  top: 0;
  display: inline-block;
}

.age {
  display: inline-block;
  margin-right: 5px;
}

.work_year_img {
  width: 13px;
  height: 10px;
  position: relative;
  top: 0;
  display: inline-block;
}

.work_year {
  display: inline-block;
  margin-right: 5px;
}

.jiguan_img {
  width: 13px;
  height: 10px;
  position: relative;
  top: 0;
  display: inline-block;
}

</style>
<script>
var API = {}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

API.wrapRet_ = function (api, opts, fn) {
  console.log('posting to ' + api)
  opts.mip_sid = API.sessionId || ''
  fetch(api, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opts)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(ret => {
      console.log(ret)
      if (ret.success) fn(true, ret.data)
      else fn(false, ret.error)
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

API.ajaxOrderList = function (obj, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/ajax_order_list', obj,
    fn)
}

API.rejectInterview = function (orderId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/reject_interview', {
      'id': orderId
    },
    fn)
}

API.zjqd = function (masterId, masterType, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/zjqd', {
      'master_id': masterId,
      'master_type': masterType
    },
    fn)
}

API.changeToContract = function (orderId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/change_to_contract', {
      'id': orderId
    },
    fn)
}

API.hideFinishedOrder = function (orderId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/hide_finished_order', {
      'id': orderId
    },
    fn)
}

API.doShanghu = function (orderId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/do_shanghu', {
      'id': orderId
    },
    fn)
}
export default {

  props: {
    src: {
      type: String,
      default: null
    },
    dataJsonstr: {
      type: String,
      default: null

    }
  },
  data () {
    console.log(this)

    return {
      list: [],
      state: {
        showTuijianBtn: true,
        show_confirm: false

      }
    }
  },
  computed: {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is pty order list component !')
    var self = this
    window.addEventListener('show-page', () => {
      console.log('show-page')

      API.ajaxOrderList({}, function (isOk, res) {
        if (isOk) {
          self.list = res.list
        } else {
          console.error(res)
        }
      })

      // if (self.isUnion || !self.isLogin) {
      //   return
      // }

      // API.checkUnionAgain('', function (isOk, res) {
      //   if (isOk) {
      //     console.log(res)
      //     self.isLogin = res.isLogin
      //     self.isUnion = res.isUnion
      //     // MIP.setData({'#isLogin': true})
      //     // MIP.setData({'#isUnion': event.userInfo.isUnion})
      //   } else {
      //     console.log(res)
      //   }
      // })
    })
    window.addEventListener('hide-page', () => {

    })
    this.$element.customElement.addEventAction('echo', function (event, str) {
      console.log(event)
    })
    this.$element.customElement.addEventAction('dook', function (event, str) {
      // console.log(event);
      if (event.from) {
        console.log(event.from)
        event.from.bind(self)(event.data, true)
        // var eval_str = 'this.' + event.handler + '(event_order)'
      }
    })
    this.$element.customElement.addEventAction('docancel', function (event, str) {
      console.log(event)
      console.log(str)
    })
    this.$element.customElement.addEventAction('logindone', function (event, str) {
      console.log(event)
      API.sessionId = event.sessionId
      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)
      if (!event.userInfo.isUnion) {
        console.log('logindone to submit_ph')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(window.location.href)), {})
      }
      API.ajaxOrderList({}, function (isOk, res) {
        if (isOk) {
          self.list = res.list
        } else {
          console.error(res)
        }
      })
    })
  },
  methods: {
    init () {
      console.log('should loading')
      // console.log(this.dataJson);
    },

    load_data () {
      console.log('should set data')
    },
    show_alert (msg) {
      var ele = document.getElementById('ptgconfirm')
      // console.log(ele);
      MIP.viewer.eventAction.execute('doshow', ele, {
        el_id: 'orderlist',
        title: '提示错误',
        msg: msg,
        from: null})
    },
    reload_ () {
      var self = this
      API.ajaxOrderList({}, function (isOk, res) {
        if (isOk) {
          self.list = res.list
        } else {
          console.error(res)
        }
      })
    },
    handleBtn (order) {
      // window.location.href = '/master_card?mcode=' + order.master.mcode;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/master_card?mcode=' + order.master.mcode), {})
    },
    handleBtn_tuijian (order) {
      // window.location.href = '/master_card?mcode=' + order.master.mcode;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/master_card?mcode=' + order.master.mcode), {})
    },

    handleBtn_shipinyuyue (order) {
      // window.location.href = '/video_interview_master?master_id=' + order.master.id;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/video_interview_master?master_id=' + order.master.id), {})
    },
    handleBtn_qianyue (order, skip) {
      // window.location.href = '/show_master?u=' + order.master.username;
      var self = this
      if (skip) {
        API.zjqd(order.master.id, 'yuesao', function (isOk, data) {
          if (isOk) {
            window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/edit_contract?id=' + order.id), {})
            // self.reload_()
          } else {
            console.warn(data)
            self.show_alert(data)
          }
        })
      } else {
        var ele = document.getElementById('ptgconfirm')
        // console.log(ele);
        MIP.viewer.eventAction.execute('doshow', ele, {
          el_id: 'orderlist',
          title: '提示消息',
          msg: '确定签约?',
          from: this.handleBtn_qianyue,
          data: order })
      }
    },
    handleBtn_chakanshipin (order) {
      // window.location.href = '/show_my_qs_list?id=' + order.id;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/show_my_qs_list?id=' + order.id), {})
    },
    handleBtn_wodeyuyue (order) {
      // window.location.href = '/show_my_realtime_video_interview?id=' + order.id;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/show_my_realtime_video_interview?id=' + order.id), {})
    },
    handleBtn_buheshi (order, skip) {
      var self = this
      if (skip) {
        API.rejectInterview(order.id, function (isOk, data) {
          if (isOk) {
            self.reload_()
          } else {
            console.warn(data)
            self.show_alert(data)
          }
        })
      } else {
        var ele = document.getElementById('ptgconfirm')
        // console.log(ele);
        MIP.viewer.eventAction.execute('doshow', ele, {
          el_id: 'orderlist',
          title: '提示消息',
          msg: '确定不合适?',
          from: this.handleBtn_buheshi,
          data: order })
      }
    },
    handleBtn_shanchu (order, skip) {
      var self = this
      // if(!confirm('确定要删除?')) return;
      if (skip) {
        API.hideFinishedOrder(order.id, function (isOk, data) {
          if (isOk) {
            self.reload_()
          } else {
            console.warn(data)
            self.show_alert(data)
          }
        })
      } else {
        var ele = document.getElementById('ptgconfirm')
        // console.log(ele);
        MIP.viewer.eventAction.execute('doshow', ele, {
          el_id: 'orderlist',
          title: '提示消息',
          msg: '确定要删除?',
          from: this.handleBtn_shanchu,
          data: order })
      }
    },
    handleBtn_dianhualianxi (order) {
      var self = this
      if (self.doingTel2) {
        return
      }
      self.doingTel2 = 1

      setTimeout(function () {
        self.doingTel2 = 0
      }, 2000)

      window.location.href = 'tel:' + order.master.phone_number
    },
    handleBtn_nidinghetong (order) {
      // window.location.href = '/edit_contract?id=' + order.id;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/edit_contract?id=' + order.id), {})
    },
    handleBtn_chakanhetong (order) {
      // window.location.href = '/edit_contract?id=' + order.id + '&readonly=1';
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/edit_contract?id=' + order.id + '&readonly=1'), {})
    },
    handleBtn_jiaodingjin (order) {
      // window.location.href = '/pay/v2_do_pay?order_id=' + order.id;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/pay/v2_do_pay?order_id=' + order.id), {})
    },
    handleBtn_shanghu (order, skip) {
      // var self = this;
      // API.doShanghu(order.id, function(isOk, data) {
      //   if (isOk) {
      //     self.reload_();
      //   } else {
      //     console.warn(data);
      //   }
      // });
      var self = this
      if (skip) {
        API.doShanghu(order.id, function (isOk, data) {
          if (isOk) {
            self.reload_()
          } else {
            console.warn(data)
            self.show_alert(data)
          }
        })
      } else {
        var ele = document.getElementById('ptgconfirm')
        // console.log(ele);
        MIP.viewer.eventAction.execute('doshow', ele, {
          el_id: 'orderlist',
          title: '提示消息',
          msg: '确定要邀请护理师上户吗?',
          from: this.handleBtn_shanghu,
          data: order })
      }
    },

    handleBtn_lianxikefu (order) {
      var self = this
      if (self.doingTel) {
        return
      }
      self.doingTel = 1

      setTimeout(function () {
        self.doingTel = 0
      }, 2000)

      window.location.href = 'tel:400-618-8835'
    },
    handleBtn_fukuan (order) {
      // window.location.href = '/pay/v2_do_pay?order_id=' + order.id;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/pay/v2_do_pay?order_id=' + order.id), {})
    },
    handleBtn_xuqian (order) {
      // window.location.href = '/v2_edit_xudan_yuesao_contract?order_id=' + order.id;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/v2_edit_xudan_yuesao_contract?order_id=' + order.id), {})
    }
  }

}
</script>
