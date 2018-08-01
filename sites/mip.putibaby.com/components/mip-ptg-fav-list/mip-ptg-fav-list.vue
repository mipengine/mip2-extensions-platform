
<template>
  <div class="row">
    <div
      v-for="fav in favlist"
      :key="fav.master.header.small"
    >
      <div
        class="root"
        @click="handleBtn(fav)">
        <mip-img
          :src="fav.master.header.small"
          layout="responsive"
          width="85px"
          height="22px"
          class="header" />
        <!-- <img src={master.header.small} class="img"} /> -->
        <div class="name">{{ fav.master.name }}</div>
        <p class="starBox">
          <mip-img
            v-for="(item, index) in fav.master.star_1_list"
            :key="index"
            layout="responsive"
            width="12"
            height="12"
            class="iconStar"
            src="https://mip.putibaby.com/i/select_master_star.png" />
          <mip-img
            v-for="(item, index) in fav.master.star_0_list"
            :key="index"
            layout="responsive"
            width="12"
            height="12"
            class="iconStar"
            src="https://mip.putibaby.com/i/select_master_unstar.png" />
        </p>
        <div class="price">￥{{ fav.master.price.ptg_price/100 }}</div>
        <div class="info">
          <mip-img
            layout="responsive"
            width="12px"
            height="12px"
            class="age_img"
            src="i/age.png" />
          <span class="age">{{ fav.master.age }}岁</span>
          <mip-img
            layout="responsive"
            width="12px"
            height="12px"
            class="work_year_img"
            src="i/work_year.png" />
          <span class="work_year">{{ fav.master.work_year }}年</span>
          <mip-img
            layout="responsive"
            width="12px"
            height="12px"
            class="jiguan_img"
            src="i/jiguan.png" />
          <span class="jiguan">{{ fav.master.jiguan }}</span>
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

body{
   background-color: #f3f3f3 !important;
}
.row{
  height:100%;
  padding: 10px;
  padding-top: 0px;
  padding-bottom: 40px;
}
.root{
  background: #fff;
  position: relative;
  height: 68px;
  overflow: hidden;
  cursor: pointer;
  margin-top: 10px;
  border:solid 1px #e5e5e5;
  border-radius: 3px;
}

.header{
  width: 68px;
  height: 68px;
  position: absolute;

}

.name{
  font-size:  16px;
  color: #666;
  position: absolute;
  top: 15px;
  left: 80px;
}

.price{
  font-size:  16px;
  font-weight: bold;
  color: red;
  position: absolute;
  top: 15px;
  right: 20px;
}

.info{
  font-size:  14px;
  color: #666;
  position: absolute;
  top: 40px;
  left: 80px;
}

.icon{
  width: 14px;
  position: relative;
  top: 0px;
  display: inline-block;
  margin-right: 5px;
}

.age{
  display: inline-block;
  margin-right: 10px;
}

.work_year{
  display: inline-block;
  margin-right: 10px;
}
 .age_img,.work_year_img,.jiguan_img{
  width:12px!important;
  height:12px!important;
  display:inline-block;
 }

.starBox {
  position: absolute;
  left: 136px;
  top: 20px;
}
.starBox mip-img{
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-left:2px;
  float:left;
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
      if (ret.success) fn(true, ret.data)
      else fn(false, ret.error)
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

API.ajaxFavList = function (opt, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/ajax_fav_list', opt, fn)
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
    return {
      favlist: []
    }
  },
  computed: {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is my first custom component !')
    var self = this

    window.addEventListener('show-page', () => {
      console.log('show-page')

      API.ajaxFavList({}, function (isOk, res) {
        if (isOk) {
          self.favlist = res.favlist
        } else {
          console.error(res)
        }
      })

      // if (self.isUnion || !self.isLogin) {
      //   return
      // }

      // API.checkUnionAgain('', function (isOk, res) {
      //   if (isOk) {
      //     console.log(res)
      //     self.isLogin = res.isLogin
      //     self.isUnion = res.isUnion
      //     // MIP.setData({'#isLogin': true})
      //     // MIP.setData({'#isUnion': event.userInfo.isUnion})
      //   } else {
      //     console.log(res)
      //   }
      // })
    })
    window.addEventListener('hide-page', () => {

    })

    this.$element.customElement.addEventAction('logindone', function (event, str) {
      console.log(event)
      API.sessionId = event.sessionId
      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)
      API.ajaxFavList({}, function (isOk, res) {
        if (isOk) {
          self.favlist = res.favlist
        } else {
          console.error(res)
        }
      })
    })
  },
  firstInviewCallback () {
    this.init()
  },
  methods: {
    init () {
      console.log('should loading')
    },

    load_data () {
      console.log('should set data')
    },

    handleBtn (fav) {
      // window.location.href = '/master_card?mcode=' + fav.master.mcode;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/master_card?mcode=' + fav.master.mcode), {})
    }

  }

}
</script>
