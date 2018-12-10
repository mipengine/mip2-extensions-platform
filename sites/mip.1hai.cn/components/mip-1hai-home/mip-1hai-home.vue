<template>
  <section class="new-home">
    <div class="banner-scroll">
      <mip-carousel
        layout="responsive"
        width="750"
        height="342"
        autoplay
        defer="3000"
      >
        <mip-img
          src="https://image.1hai.cn/images/News/20180419/ffedb84c-9d8e-40bf-9aa8-89ee3746b3d0.jpg"
        />
        <mip-img
          src="https://files.1hai.cn/group7/M00/65/D6/rBQFH1vb-_SAfC6HAAIPDJGISck523.jpg"
        />
      </mip-carousel>
      <!-- <div class="mip-carousel-indicator-wrapper">
        <div
          id="mip-carousel-example"
          class="mip-carousel-indicatorDot">
          <div class="mip-carousel-activeitem mip-carousel-indecator-item"/>
          <div class="mip-carousel-indecator-item"/>
        </div>
      </div> -->
    </div>

    <div class="navigater">
      <div class="ng-mod">
        <a
          data-type="mip"
          data-title="自驾租车"
          href="step1.html"
          class="icon-booking">
          <span class="icon" />
          <p>自驾租车<span>百款车型 千个网点</span></p>
        </a>
        <a
          data-type="mip"
          data-title="我的一嗨"
          href="my.html"
          class="icon-my">
          <span class="icon" />
          <p>我的一嗨<span>&nbsp;</span></p>
        </a>
      </div>
    </div>

    <div class="footer">
      <a
        data-type="mip"
        data-title="联系客服"
        href="tel:4008886608">联系客服</a>
      <p>Copyright &copy; 2018 一嗨租车</p>
    </div>

    <div
      v-if="loading"
      class="loading">
      <div class="loading-bd" />
    </div>

    <div
      :class="{show: sweetAlert.show, hide: !sweetAlert.show}"
      class="c-layer"
      @click="cancelMethod"
    >
      <div
        class="c-layer-box"
        @touchstart.prevent>
        <div
          v-if="sweetAlert.title"
          class="hd" >{{ sweetAlert.title }}</div>
        <div class="bd">
          <p class="confirm-content">{{ sweetAlert.content }}</p>
        </div>
        <div class="ft ui-flex align-center">
          <div
            class="cell"
            @touchend.stop.prevent="cancelMethod">取消</div>
          <div
            class="cell btn-sure"
            @touchend.stop.prevent="sureMethod">确定</div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="less">
</style>

<script>
import util from '../../common/util'
import urls from '../../common/urls'
import '../../common/base.less'
import './mip-1hai-home.less'

export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    },
    orderData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    globalData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      sweetAlert: {
        show: false,
        title: '默认标题',
        content: '默认内容'
      },
      loading: false,
      listData: []
    }
  },

  created () {
    console.log('一嗨租车')
    console.log(
      'info:',
      this.info,
      'config:',
      this.config,
      'orderData:',
      this.orderData,
      'globalData:',
      this.globalData
    )

    // 焦点图
    this.getFocusPicture()
  },

  mounted () {
    window.addEventListener('show-page', () => {
      // do something when page show
    })

    window.addEventListener('hide-page', () => {
      // do something when page hide
    })
  },

  methods: {
    // 焦点图
    getFocusPicture () {
      // Identify
      let identify = util.encrypt(
        'Version=' +
          this.globalData.Version +
          '&Source=' +
          this.globalData.Source
      )
      let param =
          '' +
          'typeId=' +
          1 +
          '&cityName=' +
          '' +
          '&channelId=' +
          this.globalData.ChannelId
      let paramObj = util.getParamEncrypt(this.globalData.md5_key, param)

      this.showLoading()
      fetch(urls.apiHref.GetFocusPicture + paramObj.des, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          Token: this.globalData.Token,
          Remark: 'Unchecked',
          Authorization: paramObj.auth,
          AppPlatform: this.globalData.Source,
          Appidentity: identify
        })
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          this.hideLoading()

          let result = response.Result
          result = util.decrypt(result)
          result = JSON.parse(result)

          // console.log(result.Result);

          this.listData = result.Result
        })
    },

    // sweetAlert
    cancelMethod () {
      this.sweetAlert.show = false
    },
    sureMethod () {
      this.sweetAlert.show = false
    },

    // loading
    showLoading () {
      this.loading = true
    },
    hideLoading () {
      this.loading = false

      let that = this
      setTimeout(function () {
        that.loading = false
      }, 360)
    }
  }
}
</script>
