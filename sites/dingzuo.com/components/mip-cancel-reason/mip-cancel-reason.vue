<template>
  <div class="cancel-reason">
    <h3>订单已取消</h3>
    <p>请告知我们原因帮助我们改善服务</p>
    <ul class="reasons">
      <li
        v-for="reason in reasons"
        ref="li"
        :key="reason.id"
        @click="select"><span><i/></span> {{ reason }} </li>
    </ul>
    <mip-fixed
      class="pay"
      @click="toJump">提交</mip-fixed>
  </div>
</template>

<style scoped>
li{
  list-style: none;
}
.cancel-reason{
  background: #ffffff;
  padding: 25px 0;
}
/* 标题 */
h3{
  font-size: 20px;
  color: #E46A75;
  text-align: center;
}
p{
  text-align: center;
  font-size: 13px;
  color: #999999;
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid #DCDCDC;
}
/* 原因列表 */
.reasons li{
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  color: #333333;
  padding-left: 20px;
}
.reasons li span{
  display: inline-block;
  height: 16px;
  width: 16px;
  border: 1px solid #999999;
  border-radius: 8px;
  margin-right: 10px;
  vertical-align: middle;
}
.reasons li i{
  display: block;
  float: left;
  margin-top: 2px;
  margin-left: 2px;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background: #FD8F14;
  visibility: hidden;
}
.reasons .select span{
  border-color: #FD8F14;
}
.reasons .select i{
  visibility: visible;
}
.pay{
  height: 48px;
  width: 100%;
  left: 0;
  bottom: 0;
  line-height: 48px;
  text-align: center;
  border-top: 1px solid #BEBEBE;
  background: #FFFFFF;
  font-size: 16px;
  color: #00C093;
  display: block !important;
}
</style>

<script>
export default {
  data () {
    return {
      reasons: ['不想去了', '订单信息有误，需重新下单', '反馈太慢，等不及啦', '已通过其他方式约定成功', '其他']
    }
  },
  mounted () {
    this.$refs.li[0].className = 'select'
  },
  methods: {
    select (e) {
      let $li = this.$refs.li
      let el = e.currentTarget
      let $len = $li.length
      for (let i = 0; i < $len; i++) {
        $li[i].className = ''
      }
      el.className = 'select'
    },
    toJump () {
      MIP.viewer.open('./index.html')
    }
  }
}
</script>
