<template>
  <div class="wrapper">
    <article class="uccessNum p-border">
      <div>
        <span>已成功复活</span>
        <span data-to="2221389">
          <em
            v-for="item in num"
            :key="item"
            class="repaireList"
          >{{ item }}</em>
        </span>
        <span>部手机</span>
      </div>
    </article>
  </div>
</template>
<script>
import request from '@/common/js/fetch'
import apiUrl from '../../common/js/config.api'
export default {
  data () {
    return {
      num: ''
    }
  },
  created () {
    request(apiUrl.count).then(res => {
      if (res.code === 200) {
        this.num = res.data.detail.total_repair.split('')
      }
    })
  }
}
</script>
<style scoped lang="less">
  .wrapper {
    margin: 0 auto;
    text-align: center;
  }
  .uccessNum {
    padding:5px 0;
    width: 100%;
    text-align: center;
    line-height: 30px;
    background: #f8f9fa;
    display: block;
    span {
      font-size: 12px;
      color: #888c91;
      vertical-align: middle;
      display: inline-block;
      em {
        margin: 0 2px;
        width: 15px;
        height: 15px;
        text-align: center;
        line-height: 15px;
        font-style: normal;
        font-size: 13px;
        color: #fff;
        background: #22272d;
        display: inline-block;
        vertical-align: middle;
        border-radius: 2px;
      }
    }
  }
</style>
