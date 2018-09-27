<template>
  <div
    v-if="status !== 'hidden'"
    class="mip-download-wrapper">
    <div
      :class="[btnStyle === 1 ? styleObject.radius:'',status === 'online' ? styleObject.safe:styleObject.disabled]"
      @click="handleSafeClick">
      <i class="iconfont el-icon-logo">&nbsp;|</i>
      <span>安全下载</span>
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
      api: 'http://mobile.baidu.com/appsite?action=miphighdown&',
      // api: 'http://yq01-ae.epc.baidu.com:8777/appsite?action=miphighdown&',
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
    @font-face {
        font-family: "iconfont";
        src: url(data:application/x-font-woff;charset=utf-8;base64,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) format('woff');
    }

    .mip-download-wrapper .iconfont {
        font-family: "iconfont" !important;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .el-icon-logo:before {
        content: "\e613";
    }

    .mip-download-wrapper .iconfont {
        position: absolute;
        font-size: 17.5px;
        top: 9.7px;
        left: 16px;
        display: inline-block;
        height: 17.5px;
        line-height: 17.5px;
        overflow: hidden;
    }

</style>