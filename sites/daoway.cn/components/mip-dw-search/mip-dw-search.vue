<template>
  <div class="wrapper">
    <mip-fixed
      class="fixtop"
      type="top">
      <div class="fix">
        <div class="inputxt">
          <input
            v-model="searchtxt"
            class="searchinput"
            type="search"
            placeholder="搜索本地商家、上门服务"
            @input="searchname">
        </div>
        <div
          class="clear"
          @click="tosearchlist(searchtxt)">搜索</div>
      </div>
    </mip-fixed>
    <div class="box">
      <div class="searchdiv">
        <div
          v-for="i in searchary"
          :key="i"
          class="searchValue"
          @click="tosearchlist(i)">{{ i }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
  data: function () {
    return {
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      channel: 'mip',
      searchtxt: '',
      searchary: []

    }
  },
  mounted () {
    this.searchary = []
  },
  methods: {
    searchname () {
      let that = this
      let url = 'https://www.daoway.cn/daoway/rest/services/auto_complete_words?word=' + encodeURIComponent(that.searchtxt) + '&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          setTimeout(() => {
            if (that.searchtxt === '') {
              that.searchary = []
            } else {
              that.searchary = text.data
            }
          }, 200)
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    clear () {
      this.searchtxt = ''
      this.searchary = []
    },
    tosearchlist (name) {
      if (name) {
        MIP.viewer.open(base.htmlhref.searchlist + '?searchText=' + encodeURIComponent(name), {isMipLink: true})
      } else {
        this.warn.show = true
        this.warn.texts = '请输入搜索内容'
      }
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.fixtop{
  margin-top: 44px;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  padding-left: 4%;
}
.searchinput{
  padding-left:6%;
  height:30px;
  min-height:30px;
  background: #ececec;
  border-radius: 4px;
  margin: 10px auto;
  font-size: 14px;
}
.inputxt{
  width:80%;
  position:relative;
  display: inline-block;
}
.searchValue{
  line-height: 36px;
  border-bottom: 1px solid #f5f5f5;
  padding-left: 6%;
  text-align: left;
  color: #303030;
}

.fix .clear{
  margin-top:0;
  font-size: 14px;
  display:inline-block;
  width:15%;
  text-align:center
}
.box{
  padding: 0 3%;
  margin-top: 50px;
}
</style>
