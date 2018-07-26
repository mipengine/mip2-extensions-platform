<template>
  <div class="s4s-page">
    <div class="s4s-body">
      <div class="s4s-car-info">
        <div class="s4s-car-model">
          <span class="s4s-car-name">{{ provice + car_no || '-' }}</span>
          <span
            class="s4s-car-change"
            @click="gotoForm">更换爱车</span>
          <a
            ref="car"
            data-type="mip"
            href="car.html"/>
          <a
            ref="pay1"
            data-type="mip"
            href="pay1.html"/>
        </div>
        <div
          class="s4s-car-illegal"
          style="color:#666;margin-bottom:.08rem" >共有未处理违章
          <span>{{ illegal.total || 0 }} </span>条，扣
          <span>{{ illegal.degree || 0 }} </span>分，罚款
          <span>{{ illegal.fine || 0 }} </span>元。
        </div>
      </div>
      <div class="s4s-title">违章记录</div>
      <div v-if="!!lists&&lists.length" >
        <div
          v-for="list in lists"
          :key="list"
          class="s4s-illegal-item" >
          <div class="s4s-illegal-list-body">
            <div class="s4s-illegal-hd">
              <span class="s4s-illegal-addr"><mip-img
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/position.png"
                style="margin-right:.03rem;vertical-align: -.02rem;"
                width="10"
                height="14" />{{ list.Address || '未知' }}</span>
            </div>
            <div class="s4s-illegal-bd">
              <div class="s4s-illegal-bd-number"> 扣
                <span class="s4s-origin">{{ list.Point || 0 }}</span>分  罚款
                <span class="s4s-origin">{{ list.Fine || 0 }}</span>元
              </div>
              <div class="s4s-illegal-bd-txt">{{ list.Reason || '未知' }}</div>
              <span style="color:#999">{{ list.OccTime || '' }}</span>
            </div>
            <div
              v-if="list.ProcessStatus == 1"
              class="s4s-illegal-btn"
              @click="gotoTicketPay(list)">
              <span>立即办理</span>
            </div>
            <div
              v-if="list.ProcessStatus != 1"
              class="s4s-illegal-btn disable-btn" >
              <span>不可办理</span>
            </div>
          </div>
        </div>
      </div>

      <div
        v-show="!lists.length"
        class="s4s-empty">
        <mip-img
          src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/empty.png"
          style="width:60%;margin: .4rem auto;"/>
      </div>
      <div
        v-if="detail"
        class="s4s-mask"
        @click="closeMake"/>
    </div>
  </div>
</template>

<script>
import util from '../../common/util'

export default {
  props: {
    globalData: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  },
  data () {
    return {
      provice: '浙',
      proviceShow: false,
      detail: false,
      src: '',
      user: {},
      illegal: {},
      code: 1,
      lists: [],
      car_no: '',
      engion: '',
      vin: '',
      car: null,
      driveUrl: '',
      showProvice: false,
      car_type: '',
      system: {}
    }
  },
  mounted () {
    this.provice = this.globalData.provice
    this.car_no = this.globalData.car_no
    this.engion = this.globalData.engine
    this.vin = this.globalData.vin
    this.car_type = this.globalData.car_type
    if (this.globalData.channel) {
      window.localStorage.channel = this.$route.query.channel
    } else {
      window.localStorage.channel = ''
    }
    this.getIllegal(
      null,
      this.globalData.provice + this.globalData.car_no,
      this.globalData.vin,
      this.globalData.engine
    )

    const that = this
    this.$on('search', function () {
      that.getIllegal(
        null,
        that.globalData.provice + that.globalData.car_no,
        that.globalData.vin,
        that.globalData.engine
      )
    })
  },
  methods: {
    closeMake () {
      this.detail = false
    },
    gotoTicketPay (item) {
      MIP.setData({
        '#payCarData': item
      })
      // MIP.viewer.open("pay1.html");
      this.$refs.pay1.click()
    },
    // 获取违章
    getIllegal (formid, carNo, vin, engion) {
      let self = this
      let param = {
        car_no: carNo ? carNo.toUpperCase() : '',
        vin: vin ? vin.toUpperCase() : '',
        engine: engion ? engion.toUpperCase() : '',
        channel: 'baidu',
        car_type: this.globalData.car_type
      }
      // car_no车牌号，vin车架号，engion发动机，{car_no: 陕KC1166 vin: LSVNJ49J472028756 engion: 020297
      util
        .fetchData('v3/violation/web/query', param)
        .then(res => {
          if (res.code === 0 && res.data) {
            let newList = []
            if (res.data.Records && res.data.Records.length > 0) {
              res.data.Records.forEach(function (item) {
                newList.push({
                  OccTime: item.OccTime,
                  Address: item.Address,
                  Reason: item.Reason,
                  Fine: item.Fine,
                  Status: item.Status,
                  Point: item.Point,
                  ViolationCode: item.ViolationCode,
                  ViolationWritNo: item.ViolationWritNo,
                  Category: item.Category,
                  Locationid: item.Locationid,
                  LocationName: item.LocationName,
                  Free: item.Free,
                  CooperFree: item.CooperFree,
                  ProcessStatus: item.ProcessStatus,
                  ProcessMsg: item.ProcessMsg,
                  ExecutePoint: item.ExecutePoint,
                  FreeCode: item.FreeCode,
                  FreeRule: item.FreeRule,
                  FreeRuleObject: item.FreeRuleObject || {},
                  ViolationId: item.ViolationId,
                  car_no: carNo ? carNo.toUpperCase() : '',
                  vin: vin ? vin.toUpperCase() : '',
                  engion: engion ? engion.toUpperCase() : ''
                })
              })
            }
            let illegal = {
              total: res.data.Total || 0,
              degree: res.data.Degree || 0,
              fine: res.data.Fine || 0
            }
            self.illegal = illegal
            self.lists = newList
            self.code = res.code

            let addParam = {
              car_no: param.car_no ? param.car_no.toUpperCase() : '',
              vin: param.vin ? param.vin.toUpperCase() : '',
              engine: param.engine ? param.engine.toUpperCase() : ''
            }
            // 接口参数 engion
            util.fetchData('v3/violation/car/manage', addParam).then(res => {
              if (res.code > 0) {
                util.toast(res.msg)
                return
              }
              if (res.code === 0) {
                // util.toast("操作成功");
              }
            })
          } else {
            util.toast('查询失败,请稍后重试')
          }
        })
        .catch(function (e, xhr, response) {
          util.toast('查询失败,请稍后重试')
        })
    },
    gotoForm () {
      // MIP.viewer.open("car.html");
      this.$refs.car.click()
    }
  }
}
</script>

<style scoped>
.s4s-illegal-body {
  margin: 0 0.1rem 0.1rem 0.1rem;
  background: #fff;
  border-radius: 0.07rem;
  padding: 0 0.1rem;
  -webkit-box-shadow: 0 0.01rem 0.03rem rgba(0, 0, 0, 0.05);
  box-shadow: 0 0.01rem 0.03rem rgba(0, 0, 0, 0.05);
}
.s4s-car-sel {
  border: 0.01rem rgba(0, 161, 238, 0.23) solid;
  color: #00a1ee;
  padding: 0.03rem 0.05rem;
  border-radius: 0.03rem;
  font-size: 0.14rem;
  -ms-flex-item-align: end;
  align-self: flex-end;
}

.s4s-car-info {
  background-color: #fff;
  padding: 4%;
  font-size: .15rem;
}

.s4s-car-model {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.s4s-car-name {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  color: #333;
  font-size: .2rem;
}

.s4s-car-illegal {
  padding-top: .1rem;
  color: #00a1ee;
  font-size: .14rem;
}

.s4s-car-select {
  padding-top: 0.1rem;
  color: #00a1ee;
  font-size: 0.13rem;
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
}

.s4s-origin {
  color: #fe7000;
}

.s4s-car-illegal span {
  color: #fe7000;
}
.s4s-right {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: 0.1rem;
}

.s4s-right-txt {
  font-size: 0.13rem;
  color: #aaa;
  display: block;
}

.s4s-illegal-item {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 0 .12rem .1rem .12rem;
  box-sizing: border-box;
}
.s4s-illegal-list-body {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background: #fff;
  border-radius: 0.04rem;
  -webkit-box-shadow: 0 0.01rem 0.03rem 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0.01rem 0.03rem 0 rgba(0, 0, 0, 0.05);
  padding: .12rem;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
  border-radius: .05rem;
}

.s4s-illegal-hd {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0.1rem 0;
  border-bottom: .01rem rgba(0, 0, 0, 0.05) solid;
}

.s4s-illegal-icon {
  width: 0.11rem;
  height: 0.15rem;
}

.s4s-illegal-addr {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 0.14rem;
  color: #666;
  padding: 0 0.15rem 0 0.1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.s4s-illegal-bd {
  padding: 0.1rem 0;
  font-size: 0.14rem;
  color: #333;
}

.s4s-illegal-bd-number span {
  padding: 0 0.03rem;
}

.s4s-illegal-bd-txt {
  width: 100%;
  padding-top: 0.1rem;
  line-height: 150%;
  color: #999;
}

.s4s-illegal-time {
  padding: 0.1rem 0;
  border-top: 0.01rem rgba(0, 0, 0, 0.05) solid;
  font-size: 0.14rem;
  color: #999;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
}

.s4s-illegal-ft {
  padding: 0.1rem 0;
  border-top: 0.01rem rgba(0, 0, 0, 0.05) solid;
  font-size: 0.14rem;
  color: #f55d4c;
}

.s4s-illegal-tips {
  border-top: 0.01rem rgba(0, 0, 0, 0.05) solid;
  padding: 0.1rem 0;
  font-size: 0.14rem;
  color: #f40;
}

.s4s-illegal-btn {
  text-align: right;
  padding-top: .1rem;
  border-top: .01rem rgba(0, 0, 0, 0.05) solid;
}
.s4s-illegal-btn.disable-btn span {
  background: #e6e6e6;
  color: #999;
}
.s4s-illegal-btn span {
  font-weight: 300;
  background-image: linear-gradient(-133deg, #ff7907 0%, #ffa018 100%);
  border-radius: .04rem;
  padding: .05rem .15rem;
  text-align: center;
  width: .93rem;
  font-size: .14rem;
  color: #fff;
}

.s4s-title {
  font-size: .2rem;
  padding: .15rem;
}
.s4s-car-change {
  border: .01rem solid #fe7000;
  border-radius: .04rem;
  background: #ffffff;
  padding: .03rem .1rem;
  color: #fe7000;
}
</style>
