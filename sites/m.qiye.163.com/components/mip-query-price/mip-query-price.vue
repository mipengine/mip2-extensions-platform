<template>
  <div class="m-inquiry">
    <h4 class="w-tit">
      最低仅需
      <span>0.39</span>元/天/人
    </h4>
    <p class="w-txt">即可享受专业、放心的企业邮箱服务</p>
    <mip-form url="//m.qiye.163.com">
      <div class="w-inquiry">
        <div class="w-inquiry__tit">我想购买的用户数(个)</div>
        <div class="w-input-number">
          <span
            :class="{'is-disabled': count <= 5}"
            role="button"
            class="w-input-number__decrease"
            @click="decrease"
          >
            <i class="w-icon-minus"/>
          </span>
          <span
            role="button"
            class="w-input-number__increase"
            @click="increase">
            <i class="w-icon-plus"/>
          </span>
          <div class="w-input">
            <input
              :value="count"
              type="number"
              autocomplete="off"
              max="10"
              min="5"
              class="w-input__inner"
              @input="countInput"
              @blur="countBlur"
            >
          </div>
        </div>
        <div class="reference-pri">
          <div
            :class="{'f-show': !msg, 'f-hide': !!msg}"
            class="reference-pri__con">
            <div class="preferential-price">
              优惠价：
              <span id="min-price">{{ minPrice }}元/年</span>
            </div>
            <div
              id="standardPrice"
              class="standard-price">
              标准价：
              <span id="max-price">{{ maxPrice }}元/年</span>
            </div>
          </div>
          <div
            :class="{'f-show': !!msg, 'f-hide': !msg}"
            class="reference-pri__msg"
            v-html="msg"
          />
        </div>

        <a
          class="btn register-btn"
          href="https://m.qiye.163.com/regist.html">立即免费试用</a>
      </div>
    </mip-form>
    <!-- <div class="m-inquiry__ft">
      <a href="/version.html">了解企业邮箱版本</a>
    </div>-->
  </div>
</template>

<style scoped>
@import "./mip-query-price.css";
</style>

<script>
const Utils = require('sim-jsonp')
Utils.initResponse()

function debounce (fn, delay) {
  // 维护一个 timer
  let timer = null

  return function () {
    // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
    const context = this
    const args = arguments

    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

export default {
  data () {
    return {
      msg: '',
      count: 5,
      minPrice: 1000,
      maxPrice: 1500,
      url: '//services.qiye.163.com/service/admin/price/?v=3',
      inquiry: debounce(() => {
        let count = this.count
        if (isNaN(count) || count === '') {
          this.resetQueryMsg('请输入正确的人数', '0.00', '0.00')
        }
        if (count < 5) {
          this.resetQueryMsg('最少起售5用户', '0.00', '0.00')
        }
        if (count >= 5 && count <= 500) {
          let url = this.url + '?type=1g&num=' + count
          Utils.XMLHttp.sendReq(url, this.inquiryCallback)
        }
        if (count > 500) {
          this.resetQueryMsg(
            '<p style="color: #666;">大客户专享服务，请直接点击 “<a href="https://qiyukf.com/client?k=abab5b9989e6f898240067f40874a096&u=&d=ptxgkhzvbattncugls3d&uuid=ybbv4czl0o4cgnt97a1s&gid=0&sid=0&qtype=0&dvctimer=0&robotShuntSwitch=0&hc=0&robotId=0&pageId=1563437083921KncbRRhZoq&t=%25E7%25BD%2591%25E6%2598%2593%25E4%25BC%2581%25E4%25B8%259A%25E9%2582%25AE%25E7%25AE%25B1%2520-%2520%25E4%25BC%2581%25E4%25B8%259A%25E9%2582%25AE%25E7%25AE%25B1%25E4%25BF%25A1%25E6%2581%25AF%25E5%258C%2596%25E4%25B8%2593%25E4%25B8%259A%25E8%25A7%25A3%25E5%2586%25B3%25E6%2596%25B9%25E6%25A1%2588">购买咨询</a>”进行询价</p>',
            '0.00',
            '0.00'
          )
        }
      }, 500)
    }
  },
  mounted () {},
  methods: {
    decrease () {
      let val = this.count
      if (val > 5) {
        val--
        this.doQuery(val)
      }
    },
    increase () {
      let val = this.count
      val++
      this.doQuery(val)
    },
    countInput (e) {
      let val = parseInt(e.target.value)
      if (val >= 5) {
        this.doQuery(val)
      }
    },
    countBlur (e) {
      let val = parseInt(e.target.value)
      if (!val || val < 5) {
        val = 5
      }
      this.doQuery(val)
    },
    inquiryCallback (obj) {
      let ret = obj.responseText.split('|')
      this.resetQueryMsg('', ret[2], ret[3])
    },
    /**
     * 询价信息显示
     * @param {string} msg
     * 提示信息
     * @param {number} min
     * 优惠价
     * @param {number} max
     * 原价
     **/
    resetQueryMsg (msg, min, max) {
      this.msg = msg
      this.minPrice = min
      this.maxPrice = max
    },
    doQuery (val) {
      if (val && val >= 5) {
        this.count = val
        this.inquiry(this)
      }
    }
  }
}
</script>
