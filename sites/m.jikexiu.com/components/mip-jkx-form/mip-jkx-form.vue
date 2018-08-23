<template>
  <div class="form">
    <div class="name flex">
      <p class="left">姓名</p>
      <input
        v-mtfocus
        v-model="form.name"
        :class="{right1:wrong1}"
        type="text"
        class="right"
        placeholder="请填写您的姓名"
        @input="inputCode">
    </div>
    <div class="phone flex">
      <p class="left">手机号码</p>
      <input
        v-mtfocus
        v-model="form.phone"
        :class="{right1:wrong2}"
        type="number"
        pattern="[0-9]*"
        class="right"
        placeholder="请填写您的手机号码"
        @focus = "foucs"
        @blur = "blur"
        @input="inputCode">
    </div>
    <div class="sendCode flex">
      <p class="left">图形验证码</p>
      <input
        v-mtfocus
        v-model="form.imgCode"
        :class="{right1:wrong3}"
        type="number"
        pattern="[0-9]*"
        class="right"
        placeholder="请填写图形验证码"
        @input="inputCode">
      <img
        :src="form.img.img"
        class="img"
        @click="refreshImg" >
    </div>
    <div class="code flex">
      <p class="left">短信验证码</p>
      <input
        v-mtfocus
        v-model="form.code"
        :class="{right1:wrong4}"
        type="number"
        pattern="[0-9]*"
        class="right"
        placeholder="请填写短信验证码"
        @input="inputCode">
      <p
        :class="{act:isTap}"
        class="txt"
        @click="smscode">{{ form.text }}</p>
      <span class="row"/>
    </div>
  </div>
</template>
<script>
import request from '@/common/js/fetch'
import apiUrl from '@/common/js/config.api'
let regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·0-9A-z]{1,20}$/
let reg = /^[1]\d{10}$/
export default {
  directives: {
    'mtfocus' (el, binding, vnode) {
      el.onfocus = function () {
        document.getElementById('bot').style.display = 'none'
        document.getElementById('protect-fix').style.display = 'block'
      }
      el.onblur = function () {
        document.getElementById('bot').style.display = 'block'
        document.getElementById('protect-fix').style.display = 'none'
      }
    }
  },
  props: {
    isForm: {
      default () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      form: {
        name: '',
        phone: '',
        imgCode: '',
        code: '',
        text: '获取验证码',
        img: {
          img: '',
          sessionkey: ''
        },
        codeSessionkey: ''
      },
      isTap: false,
      timeOut: ''

    }
  },
  watch: {
    isForm (val) {
      if (val.isCode) {
        this.refreshImg()
      }
    }
  },
  created () {
    this.refreshImg()
  },
  methods: {
    // form表单方法
    // 图形验证码
    refreshImg () {
      this.form.imgCode = ''
      this.form.code = ''
      this.time = 0
      MIP.setData({
        'orderData': {
          'imgCode': '',
          'code': ''
        }})
      request(apiUrl.imgCode).then(res => {
        if (res.code === 200) this.form.img = res.data
      })
    },
    // 定时器
    timer () {
      this.isTap = true
      if (this.time > 0) {
        this.time--
        this.form.text = this.time + 's'
        this.disabled = true
        setTimeout(this.timer, 1000)
      } else {
        this.time = 0
        this.form.text = '重新获取'
        this.disabled = false
        this.isTap = false
      }
    },
    // 获取短信验证码：
    smscode () {
      if (this.form.name === '') {
        MIP.setData({
          'alertMsg': {
            'errorTitle': '请您输入姓名',
            'isError': true
          },
          'orderData': {
            'name': ''
          }
        })
        this.form.name = ''
      } else if (!regName.test(this.form.name)) {
        MIP.setData({
          'alertMsg': {
            errorTitle: '请您输入正确的姓名',
            isError: true
          },
          'orderData': {
            'name': ''
          }
        })
        this.form.name = ''
      } else if (this.form.phone !== '' && !reg.test(this.form.phone)) {
        MIP.setData({
          'alertMsg': {
            'errorTitle': '手机号码输入错误',
            'isError': true
          }
        })
        this.form.phone = ''
        MIP.setData({orderData: {
          'phone': ''
        }})
      } else if (this.form.phone === '') {
        MIP.setData({
          alertMsg: {
            'errorTitle': '请您输入手机号',
            'isError': true
          }
        })
      } else if (this.form.imgCode === '') {
        MIP.setData({
          alertMsg: {
            'errorTitle': '请您输入图片验证码',
            'isError': true
          },
          orderData: {
            'imgCode': '',
            'code': ''
          }
        })
        this.form.imgCode = ''
      } else if (this.form.imgCode.length > 0 && this.form.imgCode.length !== 4) {
        this.refreshImg()
        MIP.setData({
          alertMsg: {
            'errorTitle': '请重新输入图片验证码',
            'isError': true
          },
          orderData: {
            'imgCode': '',
            'code': ''
          }
        })
      } else {
        if (!this.isTap) {
          if (this.form.imgCode.length === 4) {
            request(apiUrl.sendCode, 'post', {
              authcode: this.form.imgCode,
              sessionkey: this.form.img.sessionkey,
              mobile: this.form.phone
            }).then(res => {
              if (res.code === 200) {
                this.time = 60
                this.timer()
                this.lastsendtime = res.data.lastsendtime
                this.form.codeSessionkey = res.data.sessionkey
                MIP.setData({
                  orderData: {
                    'codeSessionkey': this.form.codeSessionkey
                  }
                })
                localStorage.setItem('sessionkey', JSON.stringify(res.data.sessionkey))
              } else {
                MIP.setData({
                  alertMsg: {
                    'errorTitle': res.msg,
                    'isError': true
                  },
                  orderData: {
                    'imgCode': ''
                  }
                })
                this.form.imgCode = ''
                this.refreshImg()
              }
            }).catch(error => {
              console.log('错误' + error)
            })
          } else {
            MIP.setData({
              alertMsg: {
                'errorTitle': '请输入4位图形验证码',
                'isError': true
              }
            })
          }
        }
      }
    },
    // 传递form数据
    inputCode () {
      MIP.setData({
        'orderData': {
          'name': this.form.name,
          'phone': this.form.phone,
          'imgCode': this.form.imgCode,
          'code': this.form.code,
          'codeSessionkey': this.form.codeSessionkey
        }})
    }
    // focus () {
    //   if (this.timeOut) {
    //     clearTimeout(this.timeOut)
    //     this.timeOut = ''
    //   }
    //   document.getElementById('bot').style.opacity = 0
    //   document.getElementById('protect-fix').style.display = 'block'
    // },
    // blur () {
    //   this.timeOut = setTimeout(() => {
    //     document.getElementById('bot').style.opacity = 1
    //     document.getElementById('protect-fix').style.display = 'none'
    //   }, 300)
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
      position: relative;
      padding: 5px 0;
      border-bottom: 1px solid #eee;
      .left{
        width: 30%;
        height: 35px;
        line-height: 35px;
        color: #666;
        font-size: 15px;
      }
      .right{
        width: 70%;
        line-height: 35px;
        border: none;
        outline:none;
        color: #333;
        font-size: 14px;
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
        position: absolute;
        top: 0;
        right: -10px;
        width: 100px;
        height: 45px;
        background-size: 100% 100%;
      }
    }
    .code{
      position: relative;
      .right{
        width:40%;
      }
      .txt{
          line-height: 45px;
          font-size: 13px;
          color: #fa5e24;
          text-align: center;
          position: absolute;
          top: 0;
          right: -10px;
          width: 100px;
          height: 45px;
          background-size: 100% 100%;
      }
      .act{
          color: #ccc;
      }
      .row{
        position: absolute;
        top: 0;
        right: 89px;
        width: 1px;
        height: 45px;
        background: #eee;
      }
    }
  }
</style>
