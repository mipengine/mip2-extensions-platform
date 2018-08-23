<template>
  <div class="message">
    <div class="textBox" >
      <span class="num">{{ num }}/60</span>
      <textarea
        v-model="desc"
        maxlength="60"
        class="jkx_textBox"
        placeholder="请填写其他要求或详细描述故障(可不填)"
        @input="descInput"
        @blur="blur"/>
    </div>
    <div class="tips"> <p>工作时间（08:00-22:00）内将有来自重庆区号023的电话与您联系确认详情！</p> </div>
    <Alert :msg="alertMsg"/>
  </div>
</template>
<script>
export default{
  data () {
    return {
      num: 0, // 输入的字数
      desc: ''
    }
  },
  methods: {
    descInput () {
      if (this.isEmojiCharacter(this.desc)) this.desc = ''
      if (this.desc.length === 60) {
        MIP.setData({
          alertMsg: {
            errorTitle: '最多输入60个字',
            isError: true
          }
        })
      }
      this.num = this.desc.length
    },
    // 表情过滤
    isEmojiCharacter (substring) {
      for (let i = 0; i < substring.length; i++) {
        let hs = substring.charCodeAt(i)
        if (hs >= 0xd800 && hs <= 0xdbff) {
          if (substring.length > 1) {
            let ls = substring.charCodeAt(i + 1)
            let uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
            if (uc >= 0x1d000 && uc <= 0x1f77f) {
              return true
            }
          }
        } else if (substring.length > 1) {
          let Ls = substring.charCodeAt(i + 1)
          if (Ls === 0x20e3) {
            return true
          }
        } else {
          if (hs >= 0x2100 && hs <= 0x27ff) {
            return true
          } else if (hs >= 0x2B05 && hs <= 0x2b07) {
            return true
          } else if (hs >= 0x2934 && hs <= 0x2935) {
            return true
          } else if (hs >= 0x3297 && hs <= 0x3299) {
            return true
          } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 ||
                            hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b ||
                            hs === 0x2b50) {
            return true
          }
        }
      }
    },
    blur () {
      MIP.setData({
        orderData: {
          desc: this.desc
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .textBox{
      overflow:hidden;
      position: relative;
      margin: 10px 0;
      padding: 0 10px;
      background: #fff;
      .jkx_textBox{
        overflow:hidden;
        display: block;
        width: 100%;
        height: 60px;
        padding: 10px 0;
        line-height: 150%;
        // text-indent: 10px;
        font-size: 15px;
        border: none;
        outline:none;
      }
      .num{
        position: absolute;
        bottom:10px;
        right: 10px;
        color: #ccc;
      }
  }
  .tips{
      padding: 10px;
      // margin-bottom: 50px;
      p{
        padding: 10px;
        line-height: 25px;
        color: #666;
        background: #f5ebc2;

      }
  }
</style>
