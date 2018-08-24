<template>
  <div v-if="showCarMessage">
    <mip-xin-askprice
      id="cardetail"
      :show-toast="showToast"
      :is-direct="isDirect"
      :city-message="cityMessage"
      :carid="carid"
      :info="info"
      :car-price="carPrice"
      @closeToast="close"
      @hiddenButton="hiddenBottom"/>
    <mip-inservice-login
      id="customlog"
      :config="config"
      on="login:cardetail.clientLogin logout:cardetail.clientLogout"/>
    <mip-xin-swiper
      v-if="carInfo"
      :car-info="carInfo"
      :status = "status"
      :carid="carid"
      :city-message="cityMessage"
      @handleBigImg="handleBig"/>
    <mip-xin-price
      :carid="carid"
      :city-message="cityMessage"
      :show-message="showCarMessgae"
      :car-price="carPrice"
      :show-similarmodule="showSimilarmodule"
      @showAllMessage="showMessage"
      @showPrice="showPrice"
      @getImurl="getImurl"/>
    <mip-xin-button
      v-if="isShowButton&& carInfo && imUrl && status == 1"
      :carid="carid"
      :is-bai-cheng="isBaicheng"
      :im-url="imUrl"
      :car-info="carInfo"
      :source="1"
      :is-show-button="isShowButton"
      :cityid="cityMessage.cityid"
      @showConsultingToast="showConsulting"/>
    <div v-if="showCarMessgae">
      <mip-xin-detect :carid="carid"/>
      <mip-xin-switch
        :is-detail="1"
        :carid="carid" >
        <div slot="bottomTitle">
          <a :href="urlReport">
            <div
              class="car-set-bottom"
              @click="openParams">
              <span class="lookParams" >免费查看详细检测报告</span>
              <span class="paramsArrow"/>
            </div>
          </a>
        </div>
      </mip-xin-switch>
      <!-- <mip-xin-config :url="url" :carid="carid" params="查看详细检测报告"></mip-xin-config> -->
      <mip-xin-certification
        :carid="carid"
        :status="status"
        :city-message="cityMessage"
        :is-direct="isDirect"/>
    </div>
    <!-- <mip-lightbox  content-scroll id="my-lightbox" layout="nodisplay">
      <mip-xin-askprice :is-direct="isDirect" :city-message="cityMessage"  :carid="carid" :car-price="carPrice"/>
    </mip-lightbox> -->
    <mip-xin-title
      v-if="showSimilarmodule"
      :title="similarTitle"/>
    <mip-xin-card
      :carid="carid"
      :city-message="cityMessage"
      :from-similar="1"
      @showSimilar="showSimilar"/>
  </div>
</template>

<script>
import '../../common/css/base.css'
import base from '../../common/utils/base'
import { requestFun } from '../../common/utils/reqUtils'
import { viewPoint, clickPoint } from '../../common/utils/stastic.js'
import {
  setLocalStorage,
  getLocalStorage,
  getQuery,
  removeLocalStorage,
  getDomain
} from '../../common/utils/utils.js'
const pid = '/pages/detail'
export default {
  props: {
    query: {
      type: Object,
      required: true
    },
    token: {
      type: String,
      required: true
    },
    info: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      carPrice: '', // 车辆价格
      carInfo: {}, // 车辆基本信息
      docs: {}, // 车辆档案
      needCcid: [], // 车辆配置
      showCarMessgae: false, // 是否显示”展开全部车辆信息“按钮”
      similarTitle: '为您推荐相似车辆',
      carid: this.query.carId,
      // carid: "71896519",
      cityMessage: {}, // 城市信息
      isDirect: '0',
      showCarMessage: false, // 显示车辆信息
      url: '', // 详细检测报告的链接
      isBaicheng: '', // 是否百城
      imUrl: '', // 进入M站的IM路径
      showToast: false, // 是否显示询价弹层
      showSimilarmodule: true, // 是否显示相似推荐title
      isShowButton: true, // 是否显示底部按钮，默认显示，显示大图时，不显示，大图隐藏时显示
      status: 1, // 车辆是否已售 1未售，-1已售
      urlReport: ''
    }
  },
  mounted () {
    if (typeof this.info === 'string') {
      this.info = JSON.parse(this.info)
    }
    let that = this
    let param = {
      is_rank: 1
    }
    this.storageHandle()
    // this.getAuthMessage();

    if (getQuery().ename) {
      Object.assign(param, { ename: getQuery().ename })
    }
    if (window.location.href.indexOf('code=') > 0 && window.location.href.indexOf('state=') > 0) {
      this.showToast = true
    }
    requestFun('/ajax/city/get_location', {
      method: 'POST',
      param: param
    })
      .then(res => {
        if (res.cityid) {
          that.cityMessage = res
          // 从此处获取是否百城的字段；
          that.isBaicheng = res.city_rank ? res.city_rank : 0
          that.imUrl = res.im_url
          that.showCarMessage = true
          // 需要存储json字符串
          setLocalStorage('currentCity', JSON.stringify(res))
          this.url = `${getDomain()}/report_${this.carid}.html`
        } else {
          console.log('接口返回错误')
        }
      })
      .catch(err => {
        console.log(err)
      })
    viewPoint('', null, {
      pid: pid
    })
  },
  created () {
    base.setMediaBase()
  },
  methods: {
    // 显示车辆信息
    showMessage (e) {
      this.showCarMessgae = true
    },
    // // 显示询底价弹框
    showConsulting () {
      this.showToast = true
    },
    close () {
      this.showToast = false
      this.isShowButton = true
      // 相似推荐跳转后页面会出现在iframe里，导致无法关闭弹框，所以需要移除dom
      // if (window.document.querySelector('#callmaskSimilar')) {
      //   let target1 = window.document.querySelector('#callmaskSimilar')
      //   let parent1 = window.document.querySelector('#callmaskSimilar')
      //   if (parent1.nodeName === 'BODY') {
      //     parent1.removeChild(target1)
      //   }
      //   window.document
      //     .querySelector('#callmaskSimilar')
      //     .setAttribute('v-if', 'false')
      // }
      // if (window.document.querySelector('#callmask')) {
      //   let target2 = window.document.querySelector('#callmask')
      //   let parent2 = window.document.querySelector('#callmask').parentElement
      //   if (parent2.nodeName === 'BODY') {
      //     parent2.removeChild(target2)
      //   }
      // }
      // 如果是从百度跳转过来的需要去掉后面的参数，使用h5 api无刷新跳转
      if (window.location.href.indexOf('code=') > 0 && window.location.href.indexOf('state=') > 0) {
        // 百度过来的url需要decode
        let Deurl = decodeURIComponent(window.location.href)
        let href = Deurl.split('?')[0]
        window.history.pushState(null, '车辆详情', href)
        // window.location.href = window.location.href.split('?')[0]
        // console.log(window.location.href)
      }
    },
    // showSimilar(e) {
    //   console.log(e);
    //   this.showAskToast = false;
    //   this.showSimilarToast = true;
    // },
    // 询底价需要价格
    showPrice (e) {
      if (e.detail && e.detail[0]) {
        let carInfo = e.detail[0]
        this.carInfo = carInfo
        this.carPrice = carInfo.panel_price
        this.isDirect = carInfo.is_zg_car || '0'
        this.status = carInfo.status
      }
    },
    getImurl (e) {
      this.imUrl = e.detail[0]
    },
    // 是否显示相似推荐标题
    showSimilar () {
      this.showSimilarmodule = false
      this.showCarMessgae = true
    },
    openParams () {
      let ev = 'examine_report_detail'
      clickPoint(
        ev,
        {
          carid: this.carid
        },
        null,
        {
          pid: pid
        }
      )
    },
    handleBig (e) {
      this.isShowButton = !e.detail[0]
    },
    // getAuthMessage () {
    //   if (this.query.state && getLocalStorage('carList')) {
    //     this.showToast = true
    //   }
    // },
    storageHandle () {
      let url = ''
      if (this.query && this.query.optoken) {
        setLocalStorage('optoken', this.query.optoken)
      }
      if (this.query && this.query.channel) {
        setLocalStorage('channel', this.query.channel)
      }
      // 存储ajaxToken
      if (this.token) {
        setLocalStorage('ajaxToken', this.token)
      }
      if (!this.query.optoken && getLocalStorage('optoken')) {
        removeLocalStorage('optoken')
      }
      if (!this.query.channel && getLocalStorage('channel')) {
        removeLocalStorage('channel')
      } else if (this.query && this.query.optoken && this.query.channel) {
        // 存储跳转url 需要存储编码的url
        url = `?optoken=${this.query.optoken}&channel=${this.query.channel}`
        url = encodeURIComponent(url)
        setLocalStorage('locationUrl', url)
      } else if (this.query && this.query.optoken && !this.query.channel) {
        url = `?optoken=${this.query.optoken}`
        url = encodeURIComponent(url)
        setLocalStorage('locationUrl', url)
      } else if (this.query && !this.query.optoken && this.query.channel) {
        url = `?optoken=${this.query.channel}`
        url = encodeURIComponent(url)
        setLocalStorage('locationUrl', url)
      } else if (this.query && !this.query.optoken && !this.query.channel) {
        removeLocalStorage('locationUrl')
      }
      let opurl = getLocalStorage('locationUrl')
        ? getLocalStorage('locationUrl') + encodeURIComponent('&')
        : encodeURIComponent('?')
      this.urlReport = `${getDomain()}/report_${this.carid}.html${opurl}`
    },
    /**
     * 隐藏底部button
     */
    hiddenBottom () {
      this.isShowButton = false
    }
  }
}
</script>
<style scoped>
.car-set-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.01rem solid rgba(241, 241, 241, 1);
  padding-bottom: 0.37rem;
  padding-top: 0.37rem;
  border-bottom: 0.18rem solid rgba(241, 241, 241, 1);
}
.lookParams {
  font-size: 0.28rem;
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
  border-width: 0.02rem 0.02rem 0 0;
}
</style>
