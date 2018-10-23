<template>
  <div
    v-if="status !== 'hidden'"
    class="mip-download-wrapper">
    <div
      :class="[btnStyle === 1 ? styleObject.radius:'',status === 'online' ? styleObject.safe:styleObject.disabled]"
      @click="handleSafeClick">
      <span>安全下载</span>
    </div>
    <div class="safeScanWrapper">
      <p class="safeScan">安全下载:使用百度手机助手下载,更快更安全.</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default () {
        return '#'
      }
    },
    btnStyle: {
      type: Number,
      default () {
        return 1
      }
    },
    source: {
      type: String,
      default () {
        return ''
      }
    },
    versionCode: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  data () {
    return {
      dataList: {},
      timer: null,
      status: 'hidden',
      api: 'https://mobile.baidu.com/app?action=miphighdown&',
      styleObject: {
        'radius': 'btn-radius',
        'safe': 'mip-download-safe',
        'disabled': 'mip-download-safe-invalid'
      }
    }
  },
  created () {
    this.doLog('pageview', {
      act: 'pageEnter',
      from: this.source,
      url: this.url
    })
    let url = this.getServerUrl()
    let that = this
    fetch(url).then(function (res) {
      return res.json()
    }).then(function (data) {
      if (data.error !== 0) {
        that.status = 'hidden'
        that.doLog('pageview', {
          act: 'dataLoaded',
          err: data.error,
          tj: 'mip_download_' + that.url,
          from: that.source
        })
      } else {
        that.doLog('pageview', {
          act: 'dataLoaded',
          status: data.status,
          tj: 'mip_download' + '_' + data.pid + '_' + data.docid,
          from: that.source
        })
        that.status = data.status
      }
      that.dataList = data
    }).catch(function (err) {
      that.doLog('pageview', {
        act: 'dataError',
        req: url,
        err: err
      })
      that.status = 'hidden'
    })
  },
  methods: {
    getServerUrl () {
      let params = {
        'url': this.url,
        'from': this.source,
        'versionCode': this.versionCode
      }
      let urlParams = this.obj2QueryStr(params)
      return this.api + urlParams
    },
    handleSafeClick () {
      if (this.status === 'online') {
        this.doLog('click', {
          act: 'btn-click',
          status: this.status,
          tj: 'mip_download' + '_' + this.dataList.pid + '_' + this.dataList.docid + '_' + this.url,
          from: this.source
        })
        this.highdownByCoustomScheme(this.dataList.invokeParam, this.dataList.fallbackHighdown)
      }
    },
    highdownByCoustomScheme (app, fallback) {
      let timeout = 1000
      let start = Date.now()
      let intent = 'bdashighdown://mobile.baidu.com/appsearch/highdownload?' + app
      let ifr = document.createElement('iframe')
      let self = this
      ifr.width = 0
      ifr.height = 0
      ifr.style.opacity = 0
      ifr.src = intent
      document.body.appendChild(ifr)
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(function () {
        let unhidden = self.unHidden()
        let timeDiff = Date.now() - start
        if (timeDiff < (timeout + 200) && unhidden) {
          window.location.href = fallback
        }
      }, timeout)
    },
    unHidden () {
      if ('webkitHidden' in document) {
        return !document.webkitHidden
      }
      if ('mozHidden' in document) {
        return !document.mozHidden
      }
      if ('hidden' in document) {
        return !document.hidden
      }
      return true
    },
    obj2QueryStr (params) {
      return Object.keys(params).map(key => key + '=' + params[key]).join('&')
    },
    doLog (logtype, queryInfo = {}, headerInfo = {}) {
      const LOG_BASE = 'https://mobile.baidu.com/app?'
      queryInfo = Object.assign(queryInfo, {
        action: 'log',
        logtype: logtype,
        mip: 'mip-download-safe'
      })
      let url = LOG_BASE + this.obj2QueryStr(queryInfo)
      let img = document.createElement('img')
      img.src = url
    }
  }
}
</script>
<style scoped>
    .mip-download-wrapper {
        width: 100%;
        font-family: 'pingfang-Regular';
        text-align: center;
    }

    .mip-download-wrapper .mip-download-safe,
    .mip-download-wrapper .mip-download-safe-invalid {
        display: inline-block;
        width: 275px;
        height: 37px;
        line-height: 37px;
        font-size: 15px;
        text-align: center;
    }

    .mip-download-wrapper .mip-download-safe {
        position: relative;
        color: #fff;
        background-image: -webkit-linear-gradient(55deg, #25cdff, #467bf3);
        background-image: linear-gradient(35deg, #25cdff, #467bf3);
        background-color: #467bf3;
    }

    .mip-download-wrapper .mip-download-safe-invalid {
        position: relative;
        color: #fff;
        background-color: #999;
    }

    .mip-download-wrapper .btn-radius {
        border-radius: 18.5px;
    }
    .mip-download-wrapper .safeScanWrapper{
        display: inline-block;
        width: 275px;
        font-size: 10px;
        line-height: 20px;
        color: #999;
        margin-top: 5px;
    }
    .safeScanWrapper .safeScan{
        width: 100%;
        text-align: left;
    }
</style>
