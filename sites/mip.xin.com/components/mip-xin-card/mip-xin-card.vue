<template>
  <div style="padding-bottom:0.88rem">
    <div
      v-for="(item,index) in similarCar"
      :class="{'carcontent-bottom':index != similarCar.length-1 }"
      :key="index"
      class="carcontent"
      @click="gotoDetail(item.detail_url,index)">
      <div class="content-left">
        <!-- <mip-img class="icon" src="//c2.xinstatic.com/f3/20180712/1811/5b4729493be86404190.png"></mip-img> -->
        <!-- <mip-img class="icon fire" src="//c2.xinstatic.com/f3/20180416/1840/5ad47da2a9951360644.png"></mip-img> -->
        <mip-img
          :src="item.pic"
          class="carpic"/>
        <mip-img
          v-if="item.is_video == 1"
          class="play"
          src="//c2.xinstatic.com/f3/20180323/1111/5ab470517f150445829.png"/>
      </div>
      <div class="content-right">
        <span class="carname">{{ item.carname }}</span>
        <span class="carbday">{{ item.regist_date }}年/{{ item.mileage }}公里</span>
        <span class="carprice">{{ item.panel_price }}万</span>
        <div class="pricedetail">
          <div
            v-if="item.is_ycg_car == 1"
            class="percent">一成购</div>
          <span class="instalment">首付{{ item.show_price }}万 月供{{ item.monthly_price }}元</span>
        </div>
        <!-- <div class="line"/>-->
        <!-- <div class="guarantee">
          <mip-img class="identification" src="//c2.xinstatic.com/f3/20180719/1834/5b506920e7e27787238.png"></mip-img>
          <div class="refund">30天包退 一年保修</div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { clickPoint } from '../../common/utils/stastic.js'
import base from '../../common/utils/base'
import { requestFun } from '../../common/utils/reqUtils'
import { getCarId, getLocalStorage, getDomain } from '../../common/utils/utils.js'
const pid = '/pages/detail'
export default {
  props: {
    // fromSimilar: {
    //   type: Number,
    //   default: 0
    // },
    cityMessage: {
      type: String,
      default: ''
    },
    carid: {
      type: String,
      default: ''
    }
  },
  // props: ['carid', 'cityMessage', 'fromSimilar'],
  data () {
    return {
      similarCar: []
    }
  },
  created () {
    base.setMediaBase()
  },
  mounted () {
    requestFun('/ajax/car/get_similar_carlist', {
      method: 'POST',
      param: { carid: getCarId(), cityid: JSON.parse(this.cityMessage).cityid }
    })
      .then(res => {
        if (res.length && res.length > 0) {
          this.similarCar = res
        } else {
          this.$emit('showSimilar')
        }
      })
      .catch(err => {
        this.$emit('showSimilar')
        console.log(err)
      })
  },
  methods: {
    gotoDetail (url, index) {
      let urlSimilar = `${getDomain()}${url}`
      if (this.similarCar) {
        clickPoint(
          'recommendation',
          {
            carid: this.carid,
            rank: index + 1
          },
          () => {
            MIP.viewer.open(urlSimilar + getLocalStorage('locationUrl'), {
              isMipLink: true
            })
          },
          {
            pid: pid
          }
        )
      } else {
        MIP.viewer.open(urlSimilar + getLocalStorage('locationUrl'), {
          isMipLink: true
        })
      }
    }
  }
}
</script>
<style scoped>
.carcontent {
  display: flex;
  /* height: 2.9rem; */
  height: 2.4rem;
  /**padding: 0.24rem 0.3rem 0 0.3rem;*/
}
.carcontent-bottom {
  border-bottom: 0.01rem solid #eee;
}
.content-left {
  margin-top: 0.06rem;
  position: relative;
  margin-left: 0.3rem;
  margin-top: 0.3rem;
}

.content-left .carpic {
  width: 2.56rem;
  height: 1.7rem;
}
.content-left .play {
  height: 0.9rem;
  width: 0.9rem;
  position: absolute;
  top: 0.41rem;
  left: 0.8rem;
}
.content-left .icon {
  position: absolute;
  top: -0.04rem;
  left: 0rem;
  width: 0.82rem;
  height: 0.42rem;
  z-index: 99999;
}
.content-left .fire {
  width: 0.4rem;
  height: 0.49rem;
  margin-top: -0.2rem;
}

.content-right {
  margin-left: 0.27rem;
  /**width: 4.37rem;*/
  margin-top: 0.25rem;
  /* overflow: hidden; */
}

.content-right .carname {
  font-size: 0.28rem;
  /**width: 4.08rem;**/
  margin-right: 0.2rem;
  height: 0.75rem;
  line-height: 1.2;
  color: #1b1b1b;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.content-right .carbday {
  height: 0.2rem;
  line-height: 0.2rem;
  display: block;
  margin-top: 0.07rem;
  color: #999;
  font-size: 0.2rem;
}

.content-right .carprice {
  display: block;
  margin-top: 0.1rem;
  height: 0.26rem;
  font-size: 0.26rem;
  color: #333;
  font-weight: Medium;
}
.line {
  margin-top: 0.3rem;
  width: 4.38rem;
  height: 0.01rem;
  /**background: #eee;**/
}

.content-right .pricedetail {
  display: flex;
  margin-top: 0.1rem;
  height: 0.26rem;
  align-items: center;
}

.content-right .pricedetail .percent {
    display: inline-block;
     /**width: .8rem;
    line-height: .3rem;**/
    height: .26rem;
    border-radius: .03rem;
    background: #f85d00;
    font-size: .18rem;
    color: #fff;
    text-align: center;
    margin-right: .06rem;
     display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.01rem 0.1rem 0 0.1rem;

}
.content-right .instalment {
  font-size: 0.26rem;
  font-weight: Medium;
  color: #f85d00;
}

.guarantee {
  display: flex;
  align-items: center;
  margin-top: 0.15rem;
  height: 0.32rem;
  line-height: 0.32rem;
}

.identification {
  width: 0.96rem;
  height: 0.32rem;
  margin-right: 0.1rem;
}

.refund {
  font-size: 0.2rem;
  color: #999;
}

/*.content-right .inquiry{
  width:1.22rem;
  height:0.46rem;
  line-height: 0.46rem;
  border-radius:0.03rem;
  border:0.01rem solid #FF5A37;
  font-size:0.24rem;
  color:#FF5A37;
  text-align: center;
} */
</style>
