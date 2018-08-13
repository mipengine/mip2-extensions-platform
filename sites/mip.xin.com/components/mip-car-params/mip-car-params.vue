<template>
    <div>
      <div class="car-set-bottom" @click='openParams'>
        <a class="lookParams" >{{params}}</a>
        <span class="paramsArrow"></span>
      </div>
  </div>
</template>

<script>
import { viewPoint, clickPoint } from "../../common/utils/stastic.js";
import config from "../../common/utils/config";
import { getCarId, getLocalStorage } from "../../common/utils/utils.js";
const pid = "/pages/detail";
export default {
  props: ["params", "url", "imUrl"],
  data() {
    return {
      carid: ""
    };
  },
  mounted() {
    this.carid = getCarId();
  },
  methods: {
    openParams() {
      let imUrl = getLocalStorage("locationUrl")
        ? `&imUrl=${this.imUrl}`
        : `?imUrl=${this.imUrl}`;
      let options = this.imUrl ? `${this.url}${imUrl}` : `${this.url}`;
      let ev =
        this.params == "查看详细参数配置"
          ? "collocation_more"
          : "examine_report";
      clickPoint(
        ev,
        {
          carid: this.carid
        },
        () => {
          MIP.viewer.open(options, {
            isMipLink: true
          });
        },
        {
          pid: pid
        }
      );
    }
  }
};
</script>
<style scoped>
.car-set-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(241, 241, 241, 1);
  padding-bottom: 0.37rem;
  padding-top: 0.37rem;
  border-bottom: 0.18rem solid rgba(241, 241, 241, 1);
}
.lookParams {
  font-size: 0.26rem;
  text-align: center;
  margin-left: 0.04rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
}

.paramsArrow {
  width: 0.14rem;
  height: 0.14rem;
  transform: rotate(-315deg);
  border: solid #dbdada;
  border-width: 2px 2px 0 0;
}
</style>
