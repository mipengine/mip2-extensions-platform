<template>
  <div id="bot" ref="bot">
    <div class="bot">
      <div class="bot-left">
        <div class="flex">
          <span>金额：</span>
          <span>￥{{price}}</span>
        </div>
        <p>屏幕碎裂</p>
      </div>
      <div class="bot-right" @click.stop="save">确认下单</div>
    </div>
  </div>
</template>
<script>
import {fetch} from '../../common/js/fetch'
import apiUrl from '../../common/js/config.api'
export default {

  props:{
    orderdata:{
      default(){
        return{
          price:''
        }
      },
      type:Object
    }
  },
  data(){
    return{
    }
  },
  watch:{
    orderdata(val){
      this.price = val.price
    }
  },
  mounted () {
  },
  created(){
  },
  methods:{
    //下单流程 先判断有没有登陆有酒直接验证短信吗是否正确-再保存订单，没有先注册（登陆），在验证短信验证码
    save(){
      let regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/  
      let reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$/; 
      //首先判断有没有 型号及故障
      if(this.orderdata.device==''){
        MIP.setData({
          alertMsg:{
                errorTitle: "请您选择型号",
                isError: true
            }
        })
      }else if(this.orderdata.solution==''){
        MIP.setData({
          alertMsg:{
                errorTitle: "请您选择故障",
                isError: true
            }
        })
      }else if(this.orderdata.name==''){
        MIP.setData({
          alertMsg:{
                errorTitle: "请您填写姓名",
                isError: true
            }
        })
        
      }else if(this.orderdata.name&&!regName.test(this.orderdata.name)){
        MIP.setData({
          alertMsg:{
                errorTitle: "请您填写正确的姓名",
                isError: true
            }
        })
        
      }else if(this.orderdata.phone==''){
        MIP.setData({
          alertMsg:{
                errorTitle: "请您填写手机号",
                isError: true
            }
        })
      }else if(this.orderdata.phone&&reg.test(this.orderdata.phone)){
        MIP.setData({
          alertMsg:{
                errorTitle: "请您填写正确的手机号",
                isError: true
            }
        })
      }else if(this.orderdata.imgCode==''){
        MIP.setData({
          alertMsg:{
                errorTitle: "请您填写图形验证码",
                isError: true
            }
        })
      }else if(this.orderdata.imgCode.length>0&&this.orderdata.imgCode.length<4){
        MIP.setData({
          alertMsg:{
                errorTitle: "请您填写四位图形验证码",
                isError: true
            }
        })
      }else if(this.orderdata.code==''){
        MIP.setData({
          alertMsg:{
                errorTitle: "请您填写短信验证码",
                isError: true
            }
        })
      }else if(this.orderdata.code.length>0&&this.orderdata.code.length<6){
        MIP.setData({
          alertMsg:{
                errorTitle: "请您填写六位短信验证码",
                isError: true
            }
        })
      }else if(this.orderdata.address==''){
        MIP.setData({
          alertMsg:{
                errorTitle: "请添加所在省市区",
                isError: true
            }
        })
      }else{
        if(localStorage.getItem('tokenMsg')){
          //登陆过了，验证短信验证码。判断登录状态
          this.isLogin()
        }else{
          //组测登陆
          this.register()
        }
      }
    },
    //验证短信呀没整嘛
    validate(){
      fetch(apiUrl.codeValidate, {
          sessionkey: this.orderdata.codeSessionkey,
          authcode: this.orderdata.code
      }).then(res => {
          if (res.code == 200) {
            this.saveOrder()
          }else if(res.code==10001){
            this.orderdata.code=''
            MIP.setData({orderdata:{
              "code":""
            }})
            MIP.setData({
              alertMsg:{
                errorTitle: "验证码输入错误",
                isError: true
              }
            })
            //传递给子组件，清空验证码
            // this.$set(this.isForm,'isCode',true)
          }
      })
    },
    //是否已经登陆
    isLogin(){
      
      let nowTime = new Date().getTime()
      let nowTime1 = 7*24*60*60*1000-2*60*60*1000
      let fTime = JSON.parse(localStorage.getItem('tokenMsg')).expires_in;
      if(fTime-nowTime>0&&fTime-nowTime<2*60*60*1000){  //token没有过期
        this.validate()
      }else if(nowTime-fTime>0&&nowTime-fTime<nowTime1){  //token过期了，但是可以刷新
        this.refreshToken()
      }else if(nowTime-fTime>nowTime1){  //token大于一周了
        this.register()
      }
      

    },
    //注册
    register(){
      fetch(apiUrl.login, {
          mobile: this.orderdata.phone,
          authcode: this.orderdata.code,
          sessionKey: this.orderdata.codeSessionkey,
          isAppend: 'true',
          userName: this.orderdata.name,
          // code: CODE
        }).then(res => {
          if(res.expires_in){
            res.expires_in = new Date().getTime() + res.expires_in * 1000
            localStorage.removeItem('tokenMsg')
            localStorage.setItem('tokenMsg', JSON.stringify(res))
            //注册成功，保存订单
            this.saveOrder()
          }else{
             MIP.setData({alertMsg:{
              errorTitle: res.message,
              isError: true
            }})
          }
        })
    },
    //刷新token
    refreshToken(){
        fetch(apiUrl.refreshToken, {
                grant_type: 'refresh_token',
                refresh_token: JSON.parse(localStorage.getItem('tokenMsg')).refresh_token,
                scope: 'all'
            })
            .then(res => {
              localStorage.removeItem('tokenMsg')
                    res.expires_in = new Date().getTime() + res.expires_in * 1000
                    localStorage.setItem('tokenMsg', JSON.stringify(res))
                    //保存订单
                     this.validate()
            }).catch(error=>{
               this.register()
            })
    },
    //保存订单
    saveOrder(){
      let subjosn = {
          message: this.orderdata.desc,
          repairMethod :1,
          serviceCenterId : '',
          deviceId : this.orderdata.deviceId,
          name: this.orderdata.name,
          mobile : this.orderdata.phone,
          brandId : this.orderdata.brandId,
          cityId : this.orderdata.cityId,
          distId : this.orderdata.distId,
          addr: this.orderdata.address,
          doorStartDate : '',
          doorEndDate : '',
           // 维修方案故障ID 数组
          "solutionMalfunctionList[0].malfunctionId" : this.orderdata.malfunctionId, 
          "orderAttributeValueList[0].attributeId" : this.orderdata.attr,
          "orderAttributeValueList[0].valueId":this.orderdata.attrValue,
      }
       fetch(apiUrl.saveOrder, subjosn)
          .then(res => {
              if (res.code == 200) {
                  this.orderId = res.data.orderId;
                  localStorage.removeItem('sessionkey')
                  window.location.href = "./success.html"
              }
          })
    }
  }
}
</script>

<style scoped lang="less">
 .bot{
    // position: absolute;
    // bottom: 0;
    // left: 0;
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
          padding-top: 10px;
        }
        span:nth-child(1){
          padding-left: 10px;
        }
        span:nth-child(2){
          color: #fa5e24;
        }
      }
      p{
        padding-left: 10px;
        color: #999;
      }
    }
    .bot-right{
      float: right;
      height: 50px;
      width:40%;
      line-height: 50px;
      text-align: center;
      color: #fff;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      background-color: #fa5e24;
    }
  }
</style>
  