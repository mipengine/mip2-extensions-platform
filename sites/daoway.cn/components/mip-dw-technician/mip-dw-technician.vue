<template>
  <div class="wrapper">
    <div
      v-for="(t,index) in technician"
      :key="t"
      :id="t.technicianId"
      class="weui-cell">
      <div class="weui-cell__hd">
        <img :src="t.photoURL ? t.photoURL : 'http://www.daoway.cn/mip/common/images/iconimg.png'">
      </div>
      <div class="weui-cell__cd">
        <i v-html="t.name"/>
        <i v-html="t.sex"/>
        <i v-html="t.age"/>
        <div class="star">
          <img
            v-for="(i,index) in [1, 2, 3, 4, 5]"
            :key="i"
            :src="t.level < index ? 'http://www.daoway.cn/mip/common/images/star.png/' : 'http://www.daoway.cn/mip/common/images/red_star.png'">
          <div style="display:inline-block; margin-left: 10px;">已接{{ t.orderAmount }}单</div>
        </div>
        <div>{{ t.description }}</div>
      </div>
      <div
        class="weui-cell__bd"
        @touchend="getlist(t.technicianId,index)">
        <button
          v-if="t.technicianId == technicianId"
          :class="{acty:t.technicianId == technicianId}"
          class="mini-btn" >已选</button>
        <button
          v-else
          class="mini-btn">选择</button>
      </div>
    </div>
  </div>
</template>

<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
  data () {
    return {
      technician: [],
      technicianId: base.getRequest(location.href).technicianId
    }
  },
  mounted () {
    this.technician = JSON.parse(localStorage.getItem('technician')).technicianList
  },
  methods: {
    getlist (id, index) {
      let that = this
      that.technicianId = id
      let techindex = that.technician[index]
      let tech = {
        photoURL: techindex.photoURL,
        sex: techindex.sex,
        name: techindex.name,
        id: techindex.dwid
      }
      sessionStorage.setItem('tech', JSON.stringify(tech))
      MIP.viewer.page.back()
    }

  }
}
</script>

<style scoped>
    .wrapper {
        margin: 0 auto;
    }
    i{
        font-style: normal;
    }

    .weui-cell {
        padding: 10px;
        position: relative;
        margin-bottom: 5px;
        border-bottom: 1px solid #eee;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        background: #fff;
    }

    .weui-cell__hd {
        float: left;
    }

    .weui-cell__hd img {
        width: 40px;
        height: 40px;
        display: block;
        border-radius: 50%;
    }

    .weui-cell__cd {
        padding: 0 8px;
    }

    .weui-cell__cd div {
        margin: 3px 0;
        font-size: 13px;
        color: #888;
    }

    .star img {
        width: 10px;
        height: 10px;
        padding: 0 2px;
    }

    .weui-cell__cd i {
        font-size: 16px;
        color: #646464;
        padding-right: 10px;
    }

    .weui-cell__bd {
        float: right;
        margin-right: 0;
    }

    .weui-cell__bd button {
        width: 65px;
        border-radius: 4px;
        padding: 4px 10px;
        border: 1px solid #898989;
        background: #f5f5f5;
    }

    .weui-cell__bd button.acty{
        color: #fff;
        border: 1px solid #e64340;
        background: #e64340;
    }

</style>
