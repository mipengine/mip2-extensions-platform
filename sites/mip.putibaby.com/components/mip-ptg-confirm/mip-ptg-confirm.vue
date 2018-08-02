<template>
  <div
    class="root">
    <mip-fixed
      v-if="show"
      type="top"
      still
      class="fix_back">
      <div id="fullScreen"/>
      <div id="floatLayer">
        <p class="title">{{ title }}</p>
        <p class="msg">{{ msg }}</p>
        <div class="btn_div">
          <span
            class="btn_cal"
            @click="cancelConfirm">取消</span>
          <span
            class="btn_ok"
            @click="okConfirm">确定</span>
        </div>
      </div>

    </mip-fixed>
  </div>
</template>
<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}

/* https://www.cnblogs.com/martianShu/p/5893355.html */
.fix_back{
  z-index:9999;
  width:100%;
  height:100%;
}
.fix_con{
  z-index:10000 !important;
}
#fullScreen {
  width: 100%;
  height: 100%;
  pointer-event:none;
  opacity: 0.7;
  background-color: black;
}

#floatLayer {
  width: 80%;
  height: 120px;
  background-color: white;
  border-radius: 5px;
  padding-top: 30px;
  text-align: center;
  margin-left:10%;
  position:absolute;
  z-index:999999;
  top:200px;
}
.msg{
  margin-bottom: 15px;
  font-size: 15px;
  color:#999;
}

.title{
 margin-bottom:10px;
 font-size: 18px;
 color: #333;
}

.btn_div{
  width: 100%;
  border-top: solid 1px #ddd;
  height: 50px;
}

.btn_cal{
    display:inline-block;
    background-color: #fff;
    font-size: 18px;
    color: #666;
    width: 47%;
    text-align: center;
    height:45px;
    line-height:45px;
    border-right: solid 1px #ddd;
}
.btn_ok{
   display:inline-block;
    background-color: #fff;
    font-size: 18px;
    color: #afd03b;
    width: 47%;
    text-align: center;
    height: 45px;
    line-height: 45px;
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

export default {
  props: {
    msg: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    okevent: {
      type: String,
      default: null
    },
    cancelevent: {
      type: String,
      default: null
    }
  },
  data () {
    console.log(this)
    return {
      show: false
    }
  },
  computed: {

  },
  watch: {
    show: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    }
  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is comfirm component !')
    var self = this
    this.$element.customElement.addEventAction('doshow', function (event, str) {
      // console.log(event);
      // console.log(str);
      self.show = true
      self.msg = event.msg
      self.current_el_event = event
      self.current_el_id = event.el_id
      self.current_el_data = event.data
    })
  },
  firstInviewCallback () {
    this.init()
  },
  methods: {
    init () {
      console.log('should loading')
      this.reload_()
    },
    created () {
      this.reload_()
    },

    reload_ () {

    },
    cancelConfirm () {
      var ele = document.getElementById(this.current_el_id)
      // console.log(ele);
      this.current_el_event.el_id = 'ptgconfirm'
      MIP.viewer.eventAction.execute('docancel', ele, this.current_el_event)
      this.current_el_event = {}
      this.current_el_id = ''
      this.current_el_data = {}
      this.show = false
    },
    okConfirm () {
      var ele = document.getElementById(this.current_el_id)
      // console.log(ele);
      this.current_el_event.el_id = 'ptgconfirm'
      MIP.viewer.eventAction.execute('dook', ele, this.current_el_event)
      this.current_el_event = {}
      this.current_el_id = ''
      this.current_el_data = {}
      this.show = false
    }
  }

}
</script>
