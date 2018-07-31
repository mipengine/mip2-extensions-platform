
<template>
  <div class="root">
    <div class="top">

      <div class="row">
        <div class="left">姓名</div>
        <div class="right">{{ data.name }}</div>
        <div class="clear" />
      </div>

      <div class="row">
        <div class="left">民族</div>
        <div class="right">{{ data.minzu }}</div>
        <div class="clear" />
      </div>

      <div class="row">
        <div class="left">籍贯</div>
        <div class="right">{{ data.jiguan }}</div>
        <div class="clear" />
      </div>

      <div class="row">
        <div class="left">从事母婴护理</div>
        <div class="right">{{ data.work_since_year }}年</div>
        <div class="clear" />
      </div>

      <div class="row">
        <div class="left">上户城市</div>
        <div class="right">{{ data.expect_city }}</div>
        <div class="clear" />
      </div>

      <div class="h">月嫂介绍:</div>

      <div class="text">
        {{ data.my_intro }}
      </div>

      <div v-if="data.my_yuer_intro">
        <div class="h">育儿嫂介绍:</div>
        <div class="text">
          {{ data.my_yuer_intro }}
        </div>
      </div>

      <div class="h">身份认证</div>

      <div class="row">
        <div class="left">身份证</div>
        <div class="right">{{ data.id_card }}</div>
        <div class="clear" />
      </div>

      <div
        v-if="data.myhlsz_list.length"
        class="row_z">
        <div class="left">母婴护理师证</div>
        <div class="right">
          <span class="cc">{{ data.myhlsz_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.myhlsz_list"
            :key="p.big"
            :src="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

      <div class="h">其它证书</div>

      <div
        v-if="data.jkz_list.length"
        class="row_z">
        <div class="left">健康证</div>
        <div class="right">
          <span class="cc">{{ data.jkz_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.jkz_list"
            :key="p.big"
            :src="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>

      </div>

      <div
        v-if="data.crsz_list.length"
        class="row_z">
        <div class="left">催乳师证</div>
        <div class="right">
          <span class="cc">{{ data.crsz_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.crsz_list"
            :key="p.big"
            :src="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

      <div
        v-if="data.ptgz_list.length"
        class="row_z">
        <div class="left">菩提果母婴培训证</div>
        <div class="right">
          <span class="cc">{{ data.ptgz_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.ptgz_list"
            :key="p.big"
            :src="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

      <div
        v-if="data.ptgz_list.length"
        class="row_z">
        <div class="left">月嫂证</div>
        <div class="right">
          <span class="cc">{{ data.ptgz_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.ptgz_list"
            :src="p.big"
            :key="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

      <div
        v-if="data.ptgz_list.length"
        class="row_z">
        <div class="left">菩提果母婴培训证</div>
        <div class="right">
          <span class="cc">{{ data.ptgz_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.ptgz_list"
            :src="p.big"
            :key="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

      <div
        v-if="data.yysz_list.length"
        class="row_z">
        <div class="left">育婴师证</div>
        <div class="right">
          <span class="cc">{{ data.yysz_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.yysz_list"
            :key="p.big"
            :src="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

      <div
        v-if="data.yingysz_list.length"
        class="row_z">
        <div class="left">营养师证</div>
        <div class="right">
          <span class="cc">{{ data.yingysz_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.yingysz_list"
            :src="p.big"
            :key="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

      <div
        v-if="data.hssz_list.length"
        class="row_z">
        <div class="left">护士师证</div>
        <div class="right">
          <span class="cc">{{ data.hssz_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.hssz_list"
            :src="p.big"
            :key="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

      <div
        v-if="data.xetnsz_list.length"
        class="row_z">
        <div class="left">小儿推拿师证</div>
        <div class="right">
          <span class="cc">{{ data.xetnsz_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.xetnsz_list"
            :src="p.big"
            :key="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

      <div
        v-if="data.chxfzs_list.length"
        class="row_z">
        <div class="left">产后修复证书</div>
        <div class="right">
          <span class="cc">{{ data.chxfzs_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.chxfzs_list"
            :src="p.big"
            :key="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

      <div
        v-if="data.qtzs_list.length"
        class="row_z">
        <div class="left">其他证书</div>
        <div class="right">
          <span class="cc">{{ data.qtzs_list.length }}张</span>
        </div>
        <div class="clear" />
        <div class="zhs_pics_list">
          <mip-img
            v-for="p in data.qtzs_list"
            :src="p.big"
            :key="p.big"
            popup
            layout="responisve"
            class="zhs_pic" />
        </div>
      </div>

    </div>

    <div class="footer">
      以上展示证书均经过菩提果检验，月嫂签约/上户时可要求携带以便查看
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    margin: 0 auto;
    text-align: center;
  }

  .top {
    margin: 10px;
    background: #fff;
    border-radius: 4px;
    color: #666;
    font-size: 14px;
    overflow: hidden;
    border: 1px solid #ddd;
    border-bottom: none;
  }

  .row {
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }

  .row_z {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: solid #eee 1px;
  }

  .zhs_pics_list {
    padding: 10px;
    margin-top: -20px;
    padding-bottom: 0px;
  }

  .zhs_pic {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    display: inline-block;
    margin-right: 5px;
    cursor: pointer;
  }

  .left {
    float: left;
    margin-left: 10px;
  }

  .right {
    float: right;
    margin-right: 10px;
    line-height: 40px;
  }

  .clear {
    clear: both;
  }

  .h {
    height: 40px;
    background: #f4f4f4;
    padding-left: 10px;
    line-height: 40px;
  }

  .text {
    padding: 10px;
  }

  .cc {
    /*line-height: 30px;*/
    /*display: inline-block;*/
    position: relative;
    top: -10px;
  }

  .jt {
    marginTop: 5px;
    height: 30px;
  }

  .footer {
    margin: 10px 20px;
  }
</style>

<script>
var API = {}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

API.wrapRet_ = function (api, opts, fn) {
  console.log('posting to ' + api)
  opts.mip_sid = API.sessionId || ''
  fetch(api, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opts)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(ret => {
      // console.log(ret);
      if (ret.success) fn(true, ret.data)
      else fn(false, ret.error)
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

API.getMasterInfo = function (masterId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/get_master_info_for_me', {
      'master_id': masterId
    },
    fn)
}

export default {

  props: {
    src: {
      type: String,
      default: null
    },
    dataJsonstr: {
      type: String,
      default: null
    }
  },
  data () {
    console.log(this)
    var pdata = JSON.parse(this.dataJsonstr)
    console.log(pdata)
    return {
      data: pdata

    }
  },
  computed: {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is shanghu detail component !')
  },
  methods: {
    init () {
      console.log('should loading')
      console.log(this.dataJson)
      this.reload_()
    },
    created () {
      this.reload_()
    },

    reload_ () {

    },

    load_data () {
      console.log('should set data')
    }
  }

}
</script>
