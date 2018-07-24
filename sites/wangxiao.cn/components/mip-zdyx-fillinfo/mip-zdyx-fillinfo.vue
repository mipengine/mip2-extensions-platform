<template>
  <div class="fillinfo-content">
    <div class="form-group">
      <span>手机号</span>
      <input
        v-model="phoneNumber"
        type="text"
        placeholder="请输入手机号">
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
      class="btn"
      @click="submitPhoneNumber">提交</div>
    <div
      v-show="showErrorMessage"
      class="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
import base from '../../common/base'
export default {
  components: {},
  props: {
    showImgCode: {
      type: Boolean,
      default: function () {
        return true
      }
    }
  },
  data () {
    return {
      showErrorMessage: false,
      errorMessage: '',
      phoneNumber: '',
      phoneCodeNumber: '',
      imgCode: '',
      phonCodeBtnText: '获取验证码',
      getingPhoneCode: false,
      imgCodeUrl: 'https://api.wangxiao.cn/app/Validate.ashx?validatekey='
    }
  },
  computed: {},
  watch: {
    showErrorMessage: function (newQuestion, oldQuestion) {
      if (newQuestion) {
        setTimeout(() => {
          this.showErrorMessage = !this.showErrorMessage
        }, 2000)
      }
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
      let _this = this
      if (_this.showImgCode && _this.imgCode === '') {
        _this.errorMessage = '请输入图形验证码'
        _this.showErrorMessage = true
        return
      }
      let uPattern = /^1[0-9][0-9]\d{8}$/
      if (uPattern.test(_this.phoneNumber) && !_this.getingPhoneCode) {
        fetch(base.api.sendMessage, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: _this.phoneNumber,
            imageCode: _this.imgCode
          })
        })
          .then(function (response) {
            // 获得后台实际返回的内容
            response.json().then(function (data) {
              if (data.code === '000000') {
                _this.getingPhoneCode = true
                _this.phonCodeBtnText = 60
                let timer = setInterval(() => {
                  if (_this.phonCodeBtnText === 0) {
                    _this.phonCodeBtnText = '获取验证码'
                    clearInterval(timer)
                    _this.getingPhoneCode = false
                  }
                  _this.phonCodeBtnText = --_this.phonCodeBtnText
                }, 1000)
              } else {
                _this.errorMessage = data.message
                _this.showErrorMessage = true
              }
            })
          })
          .catch(function (err) {
            console.log('Fetch Error :-S', err)
          })
      } else {
        if (!uPattern.test(_this.phoneNumber)) {
          _this.errorMessage = '手机号码错误'
          _this.showErrorMessage = true
        } else {
          console.log('请稍后获取')
        }
      }
    },
    submitPhoneNumber () {
      let _this = this
      if (_this.phoneNumber === '') {
        _this.errorMessage = '请输入手机号码'
        _this.showErrorMessage = true
        return
      }
      let uPattern = /^1[0-9][0-9]\d{8}$/
      if (!uPattern.test(_this.phoneNumber)) {
        _this.errorMessage = '请输入正确的手机号码'
        _this.showErrorMessage = true
        return
      }
      if (_this.phoneCodeNumber === '') {
        _this.errorMessage = '请输入短信验证码'
        _this.showErrorMessage = true
        return
      }
      fetch(base.api.compareMessageCode, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: _this.phoneCodeNumber,
          phone: _this.phoneNumber
        })
      })
        .then(function (response) {
          // 获得后台实际返回的内容
          response.json().then(function (data) {
            if (data.code === '100000') {
              _this.errorMessage = data.message
              _this.showErrorMessage = true
            }
          })
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    }
  }
}
</script>
<style lang='less' scoped>
.fillinfo-content {
  padding: 4rem 2rem;
  margin-top: 3.5rem;
  .errorMessage {
    position: absolute;
    left: 50%;
    top: 35%;
    margin-left: -50px;
    margin-top: -50px;
    color: #fff;
    background: #999;
    padding: 1rem;
    border-radius: 6px;
  }
  .form-group {
    display: flex;
    border-bottom: 1px solid #f1f1f1;
    font-size: 1.6rem;
    color: #666;
    padding: 0.6rem;
    > span {
      line-height: 4rem;
      font-size: 1.5rem;
      color: #333;
    }
    .form-group-left {
      display: flex;
      > span {
        line-height: 4rem;
        font-size: 1.5rem;
        color: #333;
      }
      input {
        width: 12rem;
        padding: 1rem;
      }
    }
    .phoncode-btn {
      width: 8.5rem;
      color: #ff6a4c;
      text-align: center;
      border: 1px solid #ff6a4c;
      border-radius: 1.3rem;
      cursor: pointer;
      padding: 0;
      font-size: 1.3rem;
      height: 2.4rem;
      line-height: 2.4rem;
    }
  }
  .form-group-imgcode {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  input {
    border: none;
    font-size: 1.6rem;
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
    padding: 1rem;
  }
  input::-webkit-input-placeholder {
    color: #ccc;
    font-size: 1.4rem;
  }
  .btn {
    font-size: 1.6rem;
    height: 4.4rem;
    line-height: 4.4rem;
    margin-top: 2.7rem;
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
