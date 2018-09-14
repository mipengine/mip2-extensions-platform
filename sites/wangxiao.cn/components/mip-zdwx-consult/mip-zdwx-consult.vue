<template>
  <div
    v-show="showErrorMessage"
    class="errorMessage">
    {{ errorMessage }}
  </div>
</template>
<script>
import base from '../../common/base.js'
let xzh = require('xzh-sdk')
let context = null
export default {
  data() {
    return {
      showErrorMessage: false,
      errorMessage: '网络异常，请稍后再试！'
    }
  },
  watch: {
    showErrorMessage: function(newQuestion, oldQuestion) {
      if (newQuestion) {
        setTimeout(() => {
          this.showErrorMessage = !this.showErrorMessage
        }, 2000)
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let _this = this
      if (!context) {
        fetch(base.api.authentication, {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams([['url',window.location.origin + window.location.pathname + window.location.search]]).toString()
        }).then(function(response) {
          return response.json()
        }).then(function(res) {
          xzh.init({
            data: {
              appid: res.data.appid,
              timestamp: res.data.timestamp,
              nonce_str: res.data.nonce_str,
              signature: res.data.signature,
              url: window.location.origin + window.location.pathname + window.location.search
            },
            success: function(data){
              context = data.result
            },
            fail: function(){
              
            }
          })
        }).catch(function(err){
        })
      }
    },
    invokeIM() {
      let _this = this
      if(context){
        try{
          xzh.invokeBcpIM({
            data:{
              onlyWiseIM: true
            },
            success:()=>{
            },
            fail:(res)=>{
              location.href = "https://ada.baidu.com/imlp/xzh?xzhId=1536919189936218"
            },
            context: context
          })
        }
        catch (err) {
        }
      }else{
        fetch(base.api.authentication, {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams([['url',window.location.origin + window.location.pathname + window.location.search]]).toString()
        }).then(function(response) {
          return response.json()
        }).then(function(res) {
          xzh.init({
            data: {
              appid: res.data.appid,
              timestamp: res.data.timestamp,
              nonce_str: res.data.nonce_str,
              signature: res.data.signature,
              url: window.location.origin + window.location.pathname + window.location.search
            },
            success: function(data){
              context = data.result
              try{
                xzh.invokeBcpIM({
                  data:{
                    onlyWiseIM: true
                  },
                  fail:(res)=>{
                    location.href = "https://ada.baidu.com/imlp/xzh?xzhId=1536919189936218"
                  },
                  context: context
                })
              }
              catch (err) {
              }
            },
            fail: function(){
              
            }
          })
        }).catch(function(err){
        })
      }
      
    }
  },
  mounted() {
    let _this = this
    this.$element.customElement.addEventAction('consult', event => {
      _this.invokeIM()
    })
  },
  prerenderAllowed() {
    return true
  }
};
</script>
<style lang='less' scoped>
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
  transform: translate(-50%, -50%);
}
</style>
