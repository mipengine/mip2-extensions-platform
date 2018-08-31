<template>
  <div>
    <div class="car-info">{{ carname }}</div>
    <div class="boxlist">
      <div
        v-for="(paramItem,index) in detailed_params"
        :key="index">
        <div class="box-list-tit">
          <div class="tip-title">
            <span class="tip-title-value">
              {{ paramItem.pcname }}
            </span>
            <div
              v-if="index==0"
              class="have-pic">
              <span>注：</span>
              <span class="biao">标配</span>
            </div>
          </div>
        </div>
        <div
          v-for="(item,index) in paramItem.items"
          :key="index"
          class="box-list-bot">
          <div class="params-list">
            <span class="params-list-left">
              {{ item.ccname }}
            </span>
            <span class="params-list-right">
              <span
                v-if="item.ccvalue === '●'"
                class="params-list-li"/>
              <span
                v-else
                class="params-list-txt">
                {{ item.ccvalue }}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <mip-xin-button
      v-if="imUrl"
      :source="2"
      :im-url="imUrl"/>
  </div>
</template>

<style scoped>
.car-info {
  padding: 0.44rem 0.3rem 0.24rem 0.3rem;
  overflow: hidden;
  font-size: 0.32rem;
}
.box-list-tit {
  height: 0.7rem;
  line-height: 0.7rem;
  color: #585858;
  font-size: 0.26rem;
  font-family: PingFangSC;
  padding: 0 0.3rem;
  background-color: #f6f6f9;
  margin-bottom: 0.2rem;
  margin-top: 0.2rem;
}

.tip-title {
  display: flex;
  justify-content: space-between;
  /* overflow: hidden; */
  width: 100%;
}
.tip-title-value{
  font-weight:600
}
.box-list-bot {
  height: 1rem;
  line-height: 1rem;
}
.params-list {
  width: 100%;
  line-height: 0.4rem;
  position: relative;
}

.params-list-left {
  font-size: 0.3rem;
  display: inline-block;
  margin-left: 0.3rem;
  width: 46%;
  color: #999999;
}
.params-list-right {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 48%;
}

.params-list-txt{
  font-size: 0.3rem;
  color: #333;
}

.params-list-li {
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  background: #333;
}
.biao {
  margin-left: 0.1rem;
  position: relative;
  margin-right: 0.1rem;
}

.biao::before {
  content: "";
  display: inline-block;
  position: absolute;
  top: 50%;
  margin-top: -0.05rem;
  left: -0.22rem;
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  background-color: #585858;
}

.choice {
  margin-right: 0.25rem;
}

.boxlist {
  overflow: hidden;
  padding-bottom: 0.88rem;
}

/* .dubleBg {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  padding: 0 0.2rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border: 0.01rem solid #eee;
  font-size: 0.15rem;
} */
</style>
<script>
import base from '../../common/utils/base'
import { setLocalStorage } from '../../common/utils/utils.js'
import { requestFun } from '../../common/utils/reqUtils'
import { viewPoint } from '../../common/utils/stastic.js'
let pid = '/pages/params'
export default {
  props: {
    query: {
      type: Object,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      page: { a: 1 },
      rows: 10,
      class_name: {},
      val: {},
      val_name: {},
      detailed_params: [],
      carId: this.query.carId,
      imUrl: this.query.imUrl
    }
  },
  created () {
    base.setMediaBase()
    // 获取上个页面传过来的参数
  },
  mounted () {
    viewPoint('', null, {
      pid: pid
    })
    let that = this
    if (this.token) {
      setLocalStorage('ajaxToken', this.token)
    }
    requestFun('/ajax/car/get_config', {
      method: 'POST',
      param: { carid: this.carId }
    })
      .then(res => {
        that.carname = res.carinfo.carname
        that.detailed_params = res.config
      })
      .catch(err => {
        console.log(err)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    btnClick () {
      this.page = 2
    }
  }
}
</script>
