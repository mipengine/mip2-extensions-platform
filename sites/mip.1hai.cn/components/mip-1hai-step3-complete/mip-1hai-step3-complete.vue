<template>
  <section main="role">
    <h2>订单详情</h2>

    <div class="loading" v-if="loading">
      <div class="loading-bd"></div>
    </div>
  </section>
</template>

<style scoped lang="less">
</style>

<script>
import util from "../../common/util";
import urls from "../../common/urls";
import "../../common/base.less";
import "./mip-1hai-step3-complete.less";

export default {
  props: {
    info: {
      type: Object,
      default() {
        return {};
      }
    },
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    orderData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    globalData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },

  data() {
    return {
      loading: false
    };
  },

  created() {
    console.log("完善个人信息");
    // console.log(
    //   "info:",
    //   this.info,
    //   "config:",
    //   this.config,
    //   "orderData:",
    //   this.orderData,
    //   "globalData:",
    //   this.globalData
    // );
  },

  mounted() {
    window.addEventListener("show-page", () => {
      // do something when page show
    });

    window.addEventListener("hide-page", () => {
      // do something when page hide
    });
  },

  methods: {
    // loading
    showLoading() {
      this.loading = true;
    },
    hideLoading() {
      this.loading = false;

      let that = this;
      setTimeout(function() {
        that.loading = false;
      }, 360);
    }
  }
};
</script>
