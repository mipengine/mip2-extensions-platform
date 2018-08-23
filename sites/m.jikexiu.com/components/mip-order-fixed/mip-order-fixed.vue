<template>
  <div
    v-show="!show"
    id="bot"
    ref="bot">
    <div class="bot">
      <div class="bot-left">
        <div class="flex">
          <span>金额：</span>
          <span>{{ price }}</span>
        </div>
        <p>{{ fault }}{{ period }}</p>
      </div>
      <div
        class="bot-right"
        @click.stop="save">
        确认下单
      </div>
    </div>
    <div id="protect-fix"/>
  </div>
</template>
<script>
import request from '../../common/js/fetch'
import apiUrl from '../../common/js/config.api'
export default {
  props: {
    orderdata: {
      default () {
        return {
          price: '请选择故障',
          fault: '维修成功后支付',
          period: '',
          show: false
        }
      },
      type: Object
    },
    info: {
      default () {
        return {
          userinfo: {
          }
        }
      },
      type: Object
    }
  },
  data () {
    return {
      user_id: ''
    }
  },
  watch: {
    orderdata (val) {
      this.price = val.price
      this.fault = val.fault
      this.period = val.period
      this.show = val.showFixed
    }
  },
  mounted () {
    this.$element.customElement.addEventAction('login', event => {
      // 这里可以输出登录之后的数据
      MIP.setData({
        info: {
          isLogin: true,
          sessionId: event.sessionId,
          userInfo: event.userInfo
        }
      })
      // 获取用户信息

      // 后端交互会话标识
    })
  },
  methods: {
    //  下单流程 先判断有没有登陆有酒直接验证短信吗是否正确-再保存订单，没有先注册（登陆），在验证短信验证码
    save () {
      let regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·0-9A-z]{1,20}$/ /// ^[u4e00-u9fa5·0-9A-z]+$/
      let reg = /^[1]\d{10}$/
      //  首先判断有没有 型号及故障
      if (this.orderdata.device === '') {
        MIP.setData({
          alertMsg: {
            errorTitle: '请您选择型号',
            isError: true
          }
        })
      } else if (this.orderdata.solution === '') {
        MIP.setData({
          alertMsg: {
            errorTitle: '请您选择故障',
            isError: true
          }
        })
      } else if (this.orderdata.name === '') {
        MIP.setData({
          alertMsg: {
            errorTitle: '请您填写姓名',
            isError: true
          }
        })
      } else if (this.orderdata.name && !regName.test(Number(this.orderdata.name))) {
        MIP.setData({
          alertMsg: {
            errorTitle: '请您填写正确的姓名',
            isError: true
          }
        })
      } else if (this.orderdata.phone === '') {
        MIP.setData({
          alertMsg: {
            errorTitle: '请您填写手机号',
            isError: true
          }
        })
      } else if (this.orderdata.phone && !reg.test(Number(this.orderdata.phone))) {
        MIP.setData({
          alertMsg: {
            errorTitle: '请您填写正确的手机号',
            isError: true
          }
        })
      } else if (this.orderdata.imgCode === '') {
        MIP.setData({
          alertMsg: {
            errorTitle: '请您填写图形验证码',
            isError: true
          }
        })
      } else if (this.orderdata.imgCode.length > 0 && this.orderdata.imgCode.length < 4) {
        MIP.setData({
          alertMsg: {
            errorTitle: '请您填写四位图形验证码',
            isError: true
          }
        })
      } else if (this.orderdata.code === '') {
        MIP.setData({
          alertMsg: {
            errorTitle: '请您填写短信验证码',
            isError: true
          }
        })
      } else if (this.orderdata.code.length > 0 && this.orderdata.code.length < 6) {
        MIP.setData({
          alertMsg: {
            errorTitle: '请您填写六位短信验证码',
            isError: true
          }
        })
      } else if (this.orderdata.address === '') {
        MIP.setData({
          alertMsg: {
            errorTitle: '请添加所在省市区',
            isError: true
          }
        })
      } else {
        MIP.setData({
          loading: true
        })
        if (localStorage.getItem('tokenMsg')) {
          //  登陆过了，验证短信验证码。判断登录状态
          this.isLogin()
        } else {
          //  组测登陆
          this.register()
        }
      }
    },
    //  验证短信呀没整嘛
    validate () {
      request(apiUrl.codeValidate, 'post', {
        sessionkey: this.orderdata.codeSessionkey,
        authcode: this.orderdata.code
      }).then(res => {
        if (res.code === 200) {
          this.saveOrder()
        } else if (res.code === 10001) {
          this.orderdata.code = ''
          MIP.setData({
            loading: false,
            orderdata: {
              code: ''
            },
            alertMsg: {
              errorTitle: '验证码输入错误',
              isError: true
            }
          })
        }
      })
    },
    //  是否已经登陆
    isLogin () {
      let nowTime = new Date().getTime()
      let nowTime1 = 7 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000
      let fTime = JSON.parse(localStorage.getItem('tokenMsg')).expires_in
      //  token没有过期
      if (fTime - nowTime > 0 && fTime - nowTime < 2 * 60 * 60 * 1000) {
        this.validate()
      //  token过期了，但是可以刷新
      } else if (nowTime - fTime > 0 && nowTime - fTime < nowTime1) {
        this.refreshToken()
      //  token大于一周了
      } else if (nowTime - fTime > nowTime1) {
        this.register()
      }
    },
    //  注册
    register () {
      request(apiUrl.login, 'post', {
        mobile: this.orderdata.phone,
        authcode: this.orderdata.code,
        sessionKey: this.orderdata.codeSessionkey,
        isAppend: true,
        userName: this.orderdata.name,
        code: ''
      }).then(res => {
        if (res.expires_in) {
          res.expires_in = new Date().getTime() + res.expires_in * 1000
          localStorage.removeItem('tokenMsg')
          localStorage.setItem('tokenMsg', JSON.stringify(res))
          //  注册成功，保存订单
          this.saveOrder()
        } else {
          MIP.setData({
            loading: false,
            alertMsg: {
              errorTitle: res.message,
              isError: true
            }
          })
        }
      })
    },
    //  刷新token
    refreshToken () {
      request(apiUrl.refreshToken, 'post', {
        grant_type: 'refresh_token',
        refresh_token: JSON.parse(localStorage.getItem('tokenMsg')).refresh_token,
        scope: 'all'
      }).then(res => {
        if (res.expires_in) {
          localStorage.removeItem('tokenMsg')
          res.expires_in = new Date().getTime() + res.expires_in * 1000
          localStorage.setItem('tokenMsg', JSON.stringify(res))
          //  保存订单
          this.validate()
        } else {
          MIP.setData({
            alertMsg: {
              errorTitle: res.message,
              isError: true
            }
          })
        }
      }).catch(error => {
        console.log(error)
        this.register()
      })
    },
    //  保存订单
    saveOrder () {
      if (this.info.userInfo && this.info.userInfo.openid) {
        let subjosn = {
          message: this.orderdata.desc || '',
          repairMethod: 1,
          serviceCenterId: '',
          deviceId: this.orderdata.deviceId || '',
          name: this.orderdata.name,
          mobile: this.orderdata.phone,
          brandId: this.orderdata.brandId || '',
          cityId: this.orderdata.cityId || '',
          distId: this.orderdata.distId || '',
          addr: this.orderdata.detail,
          doorStartDate: '',
          doorEndDate: '',
          orderSource: 1,
          orderOrigin: 497,
          lat: this.orderdata.lat || '',
          lng: this.orderdata.lng || '',
          ___user_id: this.info.userInfo.openid || '',
          //  维修方案故障ID 数组
          'solutionMalfunctionList[0].malfunctionId': this.orderdata.malfunctionId,
          'orderAttributeValueList[0].attributeId': this.orderdata.attributeId,
          'orderAttributeValueList[0].valueId': this.orderdata.attrValue
        }
        request(apiUrl.saveOrder, 'post', subjosn).then(res => {
          MIP.setData({
            loading: false
          })
          if (res.code === 200) {
            this.orderId = res.data.orderId
            localStorage.removeItem('sessionkey')
            MIP.viewer.open('./success.html')
          }
        })
      } else {
        MIP.setData({
          loading: false,
          alertMsg: {
            errorTitle: '没有获取到您的openid',
            isError: true
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
#bot{
    position:relative;
  }
  #protect-fix{
    position:absolute;
    top:0;
    bottom:0;
    width:100%;
    height:100%;
    opacity: 0;
    display: none;
  }
 .bot{
    width: 100%;
    height: 52px;
    background: #fff;
    z-index: 100;
    .bot-left{
      float: left;
      width: 60%;
      .flex{
        span{
          display: inline-block;
        }
        span:nth-child(1){
          padding-left: 10px;
        }
        span:nth-child(2){
          color: #fa5e24;
          line-height: 30px;
        }
      }
      p{
        padding-left: 10px;
        font-size: 13px;
        color: #999;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
    .bot-right{
      float: right;
      height: 50px;
      width: 40%;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background-color: #fa5e24;
    }
  }
</style>
