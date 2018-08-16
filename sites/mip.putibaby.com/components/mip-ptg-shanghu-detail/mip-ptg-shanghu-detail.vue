
<template>
  <div class="root">

    <div class="block_1">
      <div
        v-if="info.first_shanghu_at"
        class="interval">上户服务时间 自{{ info.first_shanghu_at.substr(0,4) }}至今</div>
      <div
        v-else
        class="interval">没有上户历史记录</div>

      <div class="stat">
        <table class="stat_table">
          <tbody>
            <tr>
              <td class="stat_td_1">上户次数<br><span>{{ info.time }}</span>次 </td>
              <td class="stat_td_2">上户天数<br><span>{{ info.days }}</span>天</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="info.feedback_cc"
      class="block_2">
      <div class="block_2_title">综合评价</div>
      <div
        v-for="(x,index) in star_total"
        :key="index"
        class="stars">
        <div class="star_row" >
          <table class="star_row_table star_row_table_zh">
            <tr>
              <td class="star_left">{{ x[0] }}</td>
              <td class="star_right">
                <span
                  v-for="idx in [1,2,3,4,5]"
                  :key="idx"
                >
                  <mip-img
                    v-if="idx <= Math.round(info.feedback_cc?info[x[1]]:5)"
                    layout="responisve"
                    width="12px"
                    height="12px"
                    class="star"
                    src="https://mip.putibaby.com/i/star_yellow_2.png"/>
                  <mip-img
                    v-else
                    layout="responisve"
                    width="12px"
                    height="12px"
                    class="star"
                    src="https://mip.putibaby.com/i/unstar.png"/>
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div
        v-for="(x,index) in star_categories"
        :key="index"
        class="stars">
        <div class="star_row_1" >
          <table class="star_row_table">
            <tr>
              <td class="star_left">{{ x[0] }}</td>
              <td class="star_right">
                <span
                  v-for="idx in [1,2,3,4,5]"
                  :key="idx">
                  <mip-img
                    v-if="idx <= Math.round(info.feedback_cc?info[x[1]]:5)"
                    layout="responisve"
                    width="12px"
                    height="12px"
                    class="star"
                    src="https://mip.putibaby.com/i/star_yellow_2.png"/>
                  <mip-img
                    v-else
                    layout="responisve"
                    width="12px"
                    height="12px"
                    class="star"
                    src="https://mip.putibaby.com/i/unstar.png"/>
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="ptg_sy">

      <div
        v-for="(f,index) in list"
        :key="index"
        class="khpj_list"
      >
        <div class="khpj_row">
          <div class="khpj_row_left">{{ f.shanghu_at }} 至 {{ f.end_at ? f.end_at : '今' }}</div>
          <div class="khpj_row_right">共<span class="days">{{ f.days }}</span>天</div>
          <div class="clear"/>
        </div>

        <div class="khpj_card">
          <mip-img
            :src="f.mama_info.header.big"
            layout="responisve"
            class="khpj_mama_header"/>
          <div class="khpj_mama_name">
            {{ f.mama_info.name }}&nbsp;{{ f.mama_info.role }}
            ({{ f.type == 'history' ? '历史客户' : '菩提果签约' }}&nbsp;
            {{ f.master_type == 'yuer' ? ' 育儿单' : '月嫂单' }})
          </div>
          <div class="khpj_mama_phone_number">手机: {{ f.mama_info.phone_number }}</div>
        </div>

        <div
          v-if="f.record_cc || f.care_cc"
          class="khpj_row">
          <div class="khpj_row_left">拍照: {{ f.record_cc }}张</div>
          <div class="khpj_row_right">护理记录: {{ f.care_cc }}</div>
          <div class="clear"/>
        </div>

        <div class="khpj_row">
          <div class="khpj_row_left">客户评分:</div>
          <div class="khpj_row_right">

            <div
              v-if="f.feedback"
              class="feedback_stars">
              <span
                v-for="idx in [1,2,3,4,5]"
                :key="idx">
                <mip-img
                  v-if="idx <= (f.feedback.total_star||0)"
                  class="star"
                  src="https://mip.putibaby.com/i/star_yellow_2.png"/>
                <mip-img
                  v-else
                  class="star"
                  src="https://mip.putibaby.com/i/unstar.png"/>
              </span>
            </div>

          </div>
        </div>

        <div class="khpj_commnet">
          <div class="khpj_comment_head">客户评价:</div>
          <div
            v-if="f.feedback"
            class="khpj_comment_text">{{ f.feedback.comment }}</div>
          <div
            v-else
            class="khpj_comment_text">上户中，用户还没有评价。</div>
        </div>

        <div
          v-if="f.feedback && f.feedback.pics"
          class="khpj_pics_list">
          <mip-img
            v-for="p in f.feedback.pics"
            :key="p.big"
            :src="p.big"
            layout="responisve"
            popup
            class="khpj_pic"/>
        </div>

        <div
          v-if="f.feedback && f.feedback.ptg_reply"
          class="ptg_fk">
          <mip-img
            layout="responisve"
            style="width:10px;margin-right:5px;display: inline-block;"
            src="https://mip.putibaby.com/i/fankui.png"/>
          <span style="color:#88bd4e;font-size:14px;">菩提果客服反馈：</span>
          <span style="color:#666666;font-size:14px;">{{ f.feedback.ptg_reply }}</span>
        </div>
      </div>
      <div class="bg">
        <div
          class="mip-infinitescroll-loading"
          @click="loadMoreClick">
          <p>{{ state.loadMessage }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
.ptg_sy {
}

.khpj_row {
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #e5e5e5;
  color: #666;
  /*border-top: 1px solid #eee;*/
  margin-left:10px;
  margin-right:10px;
}

.clear {
  clear: both;
}

.khpj_row_left {
  float: left;
}

.khpj_row_right {
  float: right
}

.khpj_star {
  width: 15px;
  display: inline-block;
  margin-right: 2px;
  position: relative;
  top: 0;
}

.khpj_card {
  position: relative;
  height: 70px;
  border-bottom: 1px solid #e5e5e5;
  margin-left:10px;
  margin-right:10px;
}

.khpj_mama_header {
  height: 50px;
  width: 50px;
  position: absolute;
  left: 0px;
  top: 10px;
  border-radius: 5px;
}

.khpj_mama_name {
  font-size: 15px;
  position: absolute;
  top: 11px;
  left: 65px;
  line-height:16px;
  color:#666;
}

.khpj_mama_phone_number {
  position: absolute;
  top: 40px;
  color: #999;
  left: 75px;
}

.khpj_commnet {
  padding: 10px;
}

.khpj_comment_head {
  font-size: 16px;
  color:#666;
}

.khpj_comment_text {
  font-size: 14px;
  color:#666;
}

.khpj_pics_list {
  padding: 10px;
}

.khpj_pic {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  display: inline-block;
  margin-right: 5px;
  cursor: pointer;
}

.block_1 {
  margin-top: 10px;
  border-radius: 4px;
  overflow: hidden;
}

.interval {
  background: #afd03b;
  font-size: 13px;
  color: #FFF;
  height: 35px;
  line-height: 35px;
  text-align: center;
}

.stat {
  background: #fff;
  border-radius:5px;
}

.stat_table {
  width: 100%;
  height: 100%;
  padding-top:20px;
  padding-bottom:15px;
  margin-bottom:10px;
}
.stat_table span{
  color:#afd03b;
  font-size:18px;
}
.stat_td_1 {
  font-size: 13px;
    line-height: 24px;
    text-align: center;
    width: 50%;
    height: 44px;
    border-right: solid 1px #e5e5e5;
    color: #666;
}

.stat_td_2 {
  font-size: 13px;
    line-height: 24px;
    text-align: center;
    width: 50%;
    height: 44px;
    color: #666;
}

.stat_td_3 {
  color: #F9AF4E;
  text-align: center;
}

.block_2 {
  margin: 10;
  border-radius: 4;
  overflow: hidden;
  background: #fff;
}

.block_2_title {
  height: 30px;
    color: #fff;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    background: #6BD4FA;
    padding: 0px 10px;
    border-radius: 5px 5px 0px 0px;
}

.star_row {
  height: 40px;
}

.star_row_table {
  height: 100%;
  width: 100%;
}

.star_row_table_zh{
 border-bottom:solid 1px #f4f4f4;
}
.star_left {
  padding-left: 10px;
  text-align: left;
}

.star_right {
  padding-right: 10px;
  text-align: right
}

.star {
  width: 14px;
  display: inline-block;
  margin-left: 5px;
}

.ptg_fk {
  margin-left:10px;
  margin-right:10px;
  border-top:1px solid #eee;
  padding-top:10px;
  padding-bottom:10px;
}
.stars{
height:44px;
line-height:44px;
}
.khpj_list{
  border-radius: 5px;
  margin-top: 10px;
  background-color:#fff;
  /* background-image: url('/i/ptg_sy.png'); */
  background-size: 160px;
  background-repeat: repeat-y;
  background-position: center;

}
.days{
  color: #afd03b;
}
.mip-infinitescroll-loading {
  width: 100%;
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #666;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 10px;
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

API.ajaxMasterShanghuFull = function (username, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/ajax_master_shanghu_detail',
    {
      'u': username
    },
    fn)
}

API.reportVisit = function (zw, city, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/ajax_report_visit', {
      'zw_id': zw,
      'city': city
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
      info: pdata.info,
      list: pdata.list,
      star_total: [
        ['综合评价', 'total_star']
      ],
      star_categories: [
        ['对产妇的照料', 'star_1'],
        ['对新生儿的护理', 'star_2'],
        ['个人与环境卫生', 'star_3'],
        ['月子营养餐制作', 'star_4'],
        ['护理师沟通', 'star_5'],
        ['护理师工作态度', 'star_6']
      ],
      state: {
        isLoadingMore: false,
        loadMessage: '查看全部评价',
        hasMoreData: false
      },
      filter: {
        pn: 0,
        kw: ''
      }
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
  beforeMount () {
    function getParameterByName (name, url) {
      if (!url) url = window.location.href
      name = name.replace(/[[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
      var results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
    var qcity = getParameterByName('city') || ''
    qcity = qcity.replace('市', '')
    var cities = ['北京', '天津', '哈尔滨', '武汉', '上海', '长春', '济南', '长沙', '广州', '杭州', '洛阳', '南阳', '深圳', '沈阳', '石家庄', '西安', '湘潭', '徐州', '成都', '南京', '黄石', '郑州', '青岛', '大连', '常州', '唐山', '保定', '秦皇岛', '襄阳', '太原', '昆明', '兰州', '呼和浩特', '乌鲁木齐', '合肥', '南昌', '福州', '厦门', '南宁']
    if (cities.lastIndexOf(qcity) >= 0) {
      this.city = qcity
      console.log(qcity)
    }

    var city = this.city || ''
    API.reportVisit(4, city, function (isOk, res) {
      if (isOk) {
        console.log(res)
      } else {
        console.log(res)
      }
    })
    this.init()
    var self = this
    window.addEventListener('scroll', function (e) {
      // console.log(document.documentElement.scrollTop);
      // console.log(document.body.scrollTop);
      var scrollTop = document.documentElement.scrollTop
      if (scrollTop === 0) {
        scrollTop = document.body.scrollTop
      }

      if (scrollTop + window.innerHeight >= document.body.clientHeight - 200) {
        // 触发加载数据
        console.log('加载数据')
        self.loadMoreAuto()
      };
    })
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
    loadMoreAuto () {
      if (this.state.loadMessage === '查看全部评价') {
        this.state.loadMessage = '数据正在加载中...'
        this.load_more()
      }
    },
    loadMoreClick () {
      if (this.state.loadMessage === '查看全部评价') {
        this.state.loadMessage = '数据正在加载中...'
        this.load_more()
      }
    },
    load_more () {
      console.log('should set data')
      var self = this
      API.ajaxMasterShanghuFull(self.info.username, function (isOk, res) {
        if (isOk) {
        // console.log(res);
          self.list = res.list
          self.info = res.info
          self.state.loadMessage = '没有更多评价了!'
        } else {
          console.log(res)
          self.state.loadMessage = '加载数据出错'
        }
      })
    },

    load_data () {
      console.log('should set data')
    }
  }

}
</script>
