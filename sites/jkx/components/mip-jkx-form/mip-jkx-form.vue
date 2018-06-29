<template>
  <div class="form">
      <div class="name flex">
        <p class="left">姓名</p>
        <input type="text" class="right" v-model="form.name" @input="code" placeholder="请填写您的姓名" :class="{right1:wrong1}">
      </div>
      <div class="phone flex">
        <p class="left">手机号码</p>
        <input type="number" pattern="[0-9]*" class="right" @input="code" v-model="form.phone" placeholder="请填写您的手机号码" :class="{right1:wrong2}">
      </div>
      <div class="sendCode flex">
         <p class="left">图形验证码</p>
        <input type="number" pattern="[0-9]*" class="right" @input="code" v-model="form.imgCode" placeholder="请填写图形验证码" :class="{right1:wrong3}">
        <img class="img" :src="form.img.img" @click="refreshImg" />
      </div>
      <div class="code flex">
         <p class="left">短信验证码</p>
        <input type="number" pattern="[0-9]*" class="right" v-model="form.code" @input="code" placeholder="请填写短信验证码" :class="{right1:wrong4}">
        <p class="txt" @click="smscode" :class="{act:isTap}">{{form.text}}</p>
      </div>
      <Alert :msg="alertMsg"></Alert>
    </div>
</template>
<script>
import {fetch} from '@/common/js/fetch'
import apiUrl from '@/common/js/config.api'
let regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/  
let reg = /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/;

export default {
props:['isForm'],
  data(){
    return{
      form:{
        name:'',
        phone:'',
        imgCode:'',
        code:'',
        text:'发送验证码',
        img:{
          img:'',
          sessionkey:''
        },
        codeSessionkey:''
      },
        isTap:false
    }
  },
  watch:{
      isForm(val){
          if(val.isCode){
              this.refreshImg()
          }
      }
  },
  created(){
    this.refreshImg()
  },
  methods:{
    //form表单方法
    //图形验证码
    refreshImg(){
      this.form.imgCode = ''
      this.form.code=''
      this.time = 0
       MIP.setData({orderData:{
        "imgCode":"",
        "code":""
        }})
      fetch(apiUrl.imgCode).then(res => {
          this.form.img = res.data
      }).catch(error => {
          console.log("错误" + error)
      })
    },
    //定时器
    timer() {
         this.isTap = true
        if (this.time > 0) {
            this.time--;
            this.form.text = this.time + "s后重新获取";
            this.disabled = true;
            setTimeout(this.timer, 1000);
        } else {
            this.time = 0;
            this.form.text  = "重新获取";
            this.disabled = false;
             this.isTap = false
        }
    },
    //获取短信验证码：
    smscode() {
        if(this.form.name==''||!regName.test(this.form.name)){
            MIP.setData({
                 alertMsg : {
                    errorTitle: "请您输入正确的姓名",
                    isError: true
                },
                orderData:{
                    name:''
                }
            })
            this.form.name = ''
        }else if (this.form.phone != '' && !reg.test(this.form.phone)) {
            MIP.setData({
                 alertMsg : {
                    errorTitle: "手机号码输入错误",
                    isError: true
                }
            })
            this.form.phone = ''
            MIP.setData({orderData:{
                "phone":""
            }})
        } else if (this.form.phone == '') {
            MIP.setData({
                 alertMsg : {
                    errorTitle: "请您输入手机号",
                    isError: true
                }
            })
        }else if (this.form.imgCode == '') {
            MIP.setData({
                 alertMsg : {
                    errorTitle: "请您输入图片验证码",
                    isError: true
                },
                orderData:{
                    "imgCode":"",
                    "code":""
                }
            })
            this.form.imgCode = ''
        } else if (this.form.imgCode.length>0 && this.form.imgCode.length != 4) {
            this.refreshImg()
            MIP.setData({
                 alertMsg : {
                    errorTitle: "请重新输入图片验证码",
                    isError: true
                },
                orderData:{
                    "imgCode":"",
                    "code":""
                }
            })
        } else {
            if (this.form.imgCode.length == 4) {
                fetch(apiUrl.sendCode, {
                    authcode: this.form.imgCode,
                    sessionkey: this.form.img.sessionkey,
                    mobile: this.form.phone
                }).then(res => {
                        if (res.code ==200) {
                        this.time = 60
                        this.timer()
                        this.lastsendtime = res.data.lastsendtime
                        this.form.codeSessionkey = res.data.sessionkey,
                        MIP.setData({orderData:{
                            "codeSessionkey":this.form.codeSessionkey
                        }})
                        localStorage.setItem('sessionkey', JSON.stringify(res.data.sessionkey))
                    } else {
                        MIP.setData({
                            alertMsg : {
                                errorTitle: res.msg,
                                isError: true
                            },
                            orderData:{
                                imgCode:""
                            }
                        })
                        this.form.imgCode = ""
                        this.refreshImg()
                    }
                }).catch(error => {
                    console.log("错误" + error)
                })
            } else {
                MIP.setData({
                    alertMsg : {
                        errorTitle: "请输入4位图形验证码",
                        isError: true
                    },
                    
                })
            }

        }
    },
    //传递form数据
    code(){
       
        MIP.setData({orderData:{
            "name":this.form.name,
            "phone":this.form.phone,
            "imgCode":this.form.imgCode,
            "code":this.form.code,
            "codeSessionkey":this.form.codeSessionkey
        }})
    },
    // inputCode(){
    //     if(this.form.code.length==6){
    //         MIP.setData({orderData:{
    //             "code":this.form.code,
    //         }})
    //     }
        
    // }
  }
}
</script>

<style scoped lang="less">
    .flex{
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
}
.form{
    margin: 10px 0;
    padding:0 10px;
    background: #fff;
  .flex{
    padding: 5px 0;
    border-bottom: 1px solid #eee;
    .left{
      width: 30%;
      height: 30px;
      line-height: 30px;
      color: #999;
      font-size: 15px;
    }
    .right{
      width: 70%;
      border: none;
      outline:none;
      color: #333;
    }
    input::-webkit-input-placeholder{
        color:#999;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#999;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#999;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
        color:#999;
    }
  }
  .sendCode{
    .left{
      width: 30%;
    }
    .right{
      width:40%;
      border: none;
      outline:none;
    }
    .img{
      width: 90px;
      height: 30px;
      background-size: 100% 100%;
    }
  }
  .code{
    .right{
      width:40%;

    }
    .txt{
      width: 30%;
      line-height: 30px;
      font-size: 13px;
      color: #fa5e24;
      text-align: center;
    }
    .act{
        color: #333;
    }
  }
}
</style>
