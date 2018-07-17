<template>
  <div class="fillinfo-content">
    <div class="form-group">
      <span>手机号</span>
      <input
        v-model="phoneNumber"
        type="text"
        placeholder="请输入手机号">
    </div>
    <div class="form-group form-group-imgcode">
      <div class="form-group-left">
        <span>手机验证码</span>
        <input
          v-model="phoneCodeNumber"
          class="phone-code"
          type="text"
          placeholder="">
      </div>
      <span
        class="phoncode-btn"
        @click="getPhoneCode">{{ phonCodeBtnText }}</span>
    </div>
    <div
      v-if="showImgCode"
      class="form-group form-group-imgcode">
      <div class="form-group-left">
        <span>图形验证码</span>
        <input
          v-model="imgCode"
          class="phone-code"
          type="text"
          placeholder="">
      </div>
      <div
        class="code"
        @click="getImgCode">
        <mip-img
          :src="imgCodeUrl"
          width="90"
          height="40"/>
      </div>
    </div>
    <div class="btn">提交</div>
    <mip-lightbox
      id="my-lightbox3"
      autoclosetime="2"
      layout="nodisplay"
      class="mip-hidden">
      <div class="lightbox">
        {{ errorMessage }}
      </div>
    </mip-lightbox>
  </div>
</template>
<script>
import base from '../../common/base'
export default {
  components: {},
  props: {
    value: {
      type: Number,
      default: function () {
        return 0
      }
    },
    showImgCode: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },
  data () {
    return {
      errorMessage: '手机号码格式错误',
      phoneNumber: '',
      phoneCodeNumber: '',
      imgCode: '',
      phonCodeBtnText: '获取验证码',
      getingPhoneCode: false,
      imgCodeUrl: 'https://api.wangxiao.cn/app/Validate.ashx?validatekey='
    }
  },
  computed: {
    getWidth () {
      return this.value / 0.05
    }
  },
  mounted () {
    this.imgCodeUrl = this.imgCodeUrl + base.getQueryString('validatekey')
  },
  methods: {
    getImgCode () {
      this.imgCodeUrl =
        this.imgCodeUrl.replace(/&v=.*/g, '') + '&v=' + Math.random()
    },
    getPhoneCode () {
      let uPattern = /^1[0-9][0-9]\d{8}$/
      if (uPattern.test(this.phoneNumber)) {
        fetch(base.url + base.api.sendMessage, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: this.phoneNumber
          })
        })
          .then(function (response) {
            if (response.status !== 200) {
              console.log(`返回的响应码${response.status}`)
              return
            }
            // 获得后台实际返回的内容
            response.json().then(function (data) {
              this.phonCodeBtnText = 60
              let timer = setInterval(() => {
                if (this.phonCodeBtnText === 0) {
                  this.phonCodeBtnText = '获取验证码'
                }
                clearInterval(timer)
                this.phonCodeBtnText = --this.phonCodeBtnText
              }, 1000)
            })
          })
          .catch(function (err) {
            console.log('Fetch Error :-S', err)
          })
      } else {
        console.log('手机号码错误')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.fillinfo-content {
  padding: 4rem;
  .form-group {
    display: flex;
    border-bottom: 1px solid #f1f1f1;
    font-size: 1.6rem;
    color: #666;
    padding: 0.8rem;
    > span {
      line-height: 4rem;
    }
    .form-group-left {
      display: flex;
      > span {
        line-height: 4rem;
      }
      input {
        width: 12rem;
        padding: 1rem;
      }
    }
    .phoncode-btn {
      width: 9rem;
      text-align: center;
      border: 1px solid;
      border-radius: 6px;
      cursor: pointer;
    }
  }
  .form-group-imgcode {
    display: flex;
    justify-content: space-between;
  }
  input {
    border: none;
    font-size: 1.6rem;
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 1rem;
  }
  .btn {
    font-size: 1.6rem;
    height: 5rem;
    line-height: 5rem;
    margin-top: 2rem;
    background: linear-gradient(to right, #ff8f53, #ff5e59);
    text-align: center;
    color: #fff;
    border-radius: 6px;
  }
  .code {
    width: 9rem;
    height: 4rem;
    overflow: hidden;
    cursor: pointer;
  }
}
</style>
