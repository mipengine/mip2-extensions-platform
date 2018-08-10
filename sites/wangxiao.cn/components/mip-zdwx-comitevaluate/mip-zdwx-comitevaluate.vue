<template>
  <div class="evaluate-content">
    <textarea
      v-model="textareaValue"
      class="textarea"
      cols="30"
      rows="10"
      placeholder="请输入您的评价"/>
    <div class="br"/>
    <div class="evaluate-stars-content">
      <div class="stars-item">
        <span class="star-title">专业能力</span>
        <stars-component
          v-model="starValue1"
          :disable="false"
          :isbig="true"/>
      </div>
      <div class="stars-item">
        <span class="star-title">课程风采</span>
        <stars-component
          v-model="starValue2"
          :disable="false"
          :isbig="true"/>
      </div>
      <div class="stars-item">
        <span class="star-title">资料提供</span>
        <stars-component
          v-model="starValue3"
          :disable="false"
          :isbig="true"/>
      </div>
    </div>
    <mip-fixed
      type="bottom"
      class="evaluate-btn"
      @click="comitEvaluate">
      发表
    </mip-fixed>
    <div
      v-show="showErrorMessage"
      class="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
import base from '../../common/base.js'
import starsComponent from '../mip-zdwx-stars/mip-zdwx-stars.vue'
export default {
  components: { starsComponent },
  data () {
    return {
      showErrorMessage: false,
      errorMessage: '',
      starValue1: 0,
      starValue2: 0,
      starValue3: 0,
      textareaValue: ''
    }
  },
  computed: {
    getWidth () {
      return this.value / 0.05
    }
  },
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
    base.setToken(base.getQueryString('token'))
  },
  methods: {
    comitEvaluate () {
      let _this = this
      if (_this.textareaValue === '') {
        _this.errorMessage = '请输入评价信息'
        _this.showErrorMessage = true
        return
      }
      if (_this.starValue1 === 0) {
        _this.errorMessage = '请评价专业能力'
        _this.showErrorMessage = true
        return
      }
      if (_this.starValue2 === 0) {
        _this.errorMessage = '请评价课程风采'
        _this.showErrorMessage = true
        return
      }
      if (_this.starValue3 === 0) {
        _this.errorMessage = '请评价资料提供'
        _this.showErrorMessage = true
        return
      }
      fetch(base.api.comitEvaluate, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          FKID: base.getQueryString('id'),
          token: base.getToken(),
          Data: {
            CommentDetail: {
              CategoryID: '',
              CommentContent: _this.textareaValue,
              FKID: base.getQueryString('id'),
              RemarkSource: 1,
              UserName: ''
            },
            CommentItemDetails: [
              {
                Score: _this.starValue1,
                ScoreItemID: 4,
                ModuleId: 3
              },
              {
                Score: _this.starValue2,
                ScoreItemID: 5,
                ModuleId: 3
              },
              {
                Score: _this.starValue3,
                ScoreItemID: 6,
                ModuleId: 3
              }
            ]
          }
        })
      })
        .then(function (response) {
          // 获得后台实际返回的内容
          response.json().then(function (data) {
            if (data.code === '000000') {
              _this.errorMessage = data.message
              _this.showErrorMessage = true
              setTimeout(() => {
                MIP.viewer.open(MIP.util.makeCacheUrl(base.url + 'order/list?token=' + base.getToken()))
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
    }
  }
}
</script>
<style lang='less' scoped>
.evaluate-btn {
  height: 5rem;
  line-height: 5rem;
  font-size: 1.6rem;
  color: #fff;
  text-align: center;
  background: linear-gradient(to right, #ff8f53, #ff5e59);
}
.textarea {
  width: 100%;
  border: none;
  padding: 1rem;
  font-size: 1.4rem;
  resize: none;
  outline: none;
}
textarea::-webkit-textarea-placeholder {
  color: #ccc;
  font-size: 1.4rem;
}
.br {
  height: 0.6rem;
  background: #f5f5f5;
}
.stars-backgound-content span,
.stars-active-content span {
  width: 2rem !important;
}
.star-title {
  font-size: 1.6rem;
  padding-right: 2.3rem;
  padding-left: 1.2rem;
  height: 3rem;
  line-height: 3rem;
}
.evaluate-stars-content {
  margin-top: 1rem;
}
.stars-item {
  display: flex;
  align-items: center;
}
.errorMessage {
  position: absolute;
  left: 50%;
  top: 35%;
  color: #fff;
  background: #999;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  max-width: 18rem;
  transform: translate(-50%,-50%);
}
</style>
