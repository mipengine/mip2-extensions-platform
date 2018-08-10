<template>
  <div class="title">
    <span class="title-con">{{this.title}}</span>
  </div>
</template>

<style scoped>
.title {
  height: 1.1rem;
  line-height: 1.1rem;
  border-left: 0.04rem solid #f85d00;
  border-bottom: 0.01rem solid #f1f1f1;
  font-size: 0.34rem;
  font-weight: 600;
  color: #333;
}
.title .title-con {
  margin-left: 0.4rem;
}
</style>
<script>
import base from "../../common/utils/base";
import { requestFun } from "../../common/utils/reqUtils";

export default {
  props: ["title"],
  data() {
    return {};
  },
  created() {
    base.setMediaBase();
  },
  mounted() {},
  methods: {}
};
</script>
