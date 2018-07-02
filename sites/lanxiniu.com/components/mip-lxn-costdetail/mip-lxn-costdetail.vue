<template>
  <div class="wrapper">
    <div class="pay-content">
      <div class="pay-list">
        <ul>
          <li
            v-for="item in pillList"
            :class="{title:item.billType==='总价预估'}"
            :key="item.billName">
            <span v-text="item.billType"/>
            <span v-text="item.billMount"/>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-show="loading"
      class="loader">
      <div class="loader-inner lxn-loading"/>
    </div>
  </div>

</template>

<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
base.setHtmlRem()
export default {
  props: {
    globaldata: {
      type: Object,
      default: function () { return {} }
    },
    userlogin: {
      type: Object,
      default: function () { return {} }
    }
  },
  data () {
    return {
      loading: true,
      pillList: []
    }
  },
  created () {
    console.log('创建数据')
    base.setHtmlRem()
    console.log(this.globaldata)
  },
  mounted () {
    this.getRequest()
    this.$element.customElement.addEventAction('login', (event, str) => {
      let interval = setInterval(() => {
        console.log(JSON.stringify(this.userlogin, null, 2))
        if (this.userlogin.sessionId !== '') {
          this.getRequest()
          clearInterval(interval)
        }
      }, 200)
      console.log('查看用户信息:' + JSON.stringify(event, null, 2))
    })

    if (this.userlogin.sessionId !== '') {
      this.getRequest()
    } else {
      console.log('未登录')
    }
  },
  methods: {
    getCostDetail (item) {
      // 获取费用明细
      let sessionid = base.getbaiduLogMsg()
      let updata = {
        token: sessionid,
        orderNum: item.OrderNum
      }
      let urls = base.url + '/Order/billInfo?' + base.setUrlParam(updata)

      fetch(urls, {
        method: 'post'
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log(response)
          console.log('查看数据:' + response)
          this.hideloading()
          response.data.billInfo.forEach(function (item) {
            item.billMount = item.billMount + '元'
          })
          this.pillList = response.data.billInfo
        })
    },
    getRequest () {
      let url = location.search // 获取url中"?"符后的字串
      console.log('查看url:' + url)
      let theRequest = {}
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      this.getCostDetail(theRequest)
    },
    showloading () {
      this.loading = true
    },
    hideloading () {
      this.loading = false
      let that = this
      setTimeout(function () {
        that.loading = false
      }, 500)
    }
  }
}
</script>

<style scoped>
.wrapper{
    width: 1px;
    min-width: 100%;
}
.pay-content {
  margin-top: 0.2rem;
}
.pay-list {
  margin-top: 0.2rem;
  padding: 0 0.3975rem;
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}
.pay-list li {
  font-size: 0.28rem;
  color: #555555;
  letter-spacing: 0.06px;
  padding: 0.24rem 0;
  border-bottom: 0.02rem solid #f1f1f1;
}
.pay-list li span:last-child {
  float: right;
}
.pay-list li.title span:last-child {
  font-size: 0.32rem;
  color: #ff6666;
  letter-spacing: 0.07px;
}
</style>
