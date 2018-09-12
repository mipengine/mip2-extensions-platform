<template>
  <div id="">
    <div class="order-item">
      <div class="items-content">
        <h2 class="items-tit">{{ destination }}</h2>
        <p class="items-info">出行天数{{ day }}天</p>
      </div>
    </div>
    <div class="order-item">
      <div class="item-text">
        <p>请填写联系人信息，以便旅行顾问及时联系您</p>
      </div>
      <div class="submit-form-content">
        <ul class="form-list">
          <li class="form-li">
            <span>联系人</span>
            <div class="form-ipt">
              <input
                v-model="name"
                type="text"
                class="ipt"
                placeholder="请输入您的名字" >
            </div>
          </li>
          <li class="form-li">
            <span>手机号码</span>
            <div class="form-ipt">
              <input
                v-model="phone"
                type="tel"
                class="ipt"
                placeholder="请输入您的手机号码" >
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="actions">
      <button
        :disabled="enabled"
        class="btn-normal"
        type="submit"
        @click="submitTap">{{ tip }}</button>
    </div>
  </div>

</template>

<script>
import toast from '../../common/toast'

let options = {
  position: 'top-center',
  duration: 2000
}
export default {
  props: {
    'host': {
      type: String,
      required: true
    },
    'des': {
      type: String,
      required: true
    },
    'days': {
      type: Number,
      required: true
    },
    'info': {
      type: Object,
      required: true
    },
    'tripid': {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      destination: '美国',
      day: 0,
      name: '',
      phone: '',
      enabled: false,
      tip: '提交需求'
    }
  },
  watch: {
    info (val) {
    }
  },
  mounted () {
    this.destination = this.des
    this.day = this.days
    this.phone = this.getPhone()
    this.name = this.getName()
    this.$on('login', (ev) => {
      this.submitOrder()
    })
  },
  methods: {
    submitOrder () {
      if (this.name === null || this.name.trim() === '') return
      if (this.phone === null || this.phone.trim() === '') return

      this.enabled = true
      this.tip = '正在提交数据，请稍后...'

      let params = {}
      params['dest'] = this.destination
      params['realname'] = this.name
      params['mobile'] = this.phone
      params['days'] = this.day
      params['fid'] = 'baidu_mip'
      params['trip_id'] = this.tripid

      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      let _data = []
      for (let k in params) {
        _data.push(k + '=' + params[k])
      }
      fetch('https://m.6renyou.com/we_service/save_order', {
        method: 'POST',
        body: _data.join('&'),
        headers: headers
      }).then(res => res.json()).then(res => {
        this.savePhone()
        if (parseInt(res.status) === 1) {
          this.baiduCB(this.name, this.phone, this.info)
          MIP.viewer.open(this.host + '/order/result')
        } else {
          if (res.message === '您的需求已经提交') {
            toast.show('您上一个订单派送中，请稍后再提交', options)
            this.enabled = false
            this.tip = '提交需求'
            return
          }
          toast.show(res.message, options)
          this.enabled = false
          this.tip = '提交需求'
        }
      }).catch(err => {
        toast.show('下单失败' + err.message, options)
        this.enabled = false
        this.tip = '提交需求'
      })
    },
    submitTap: function () {
      let re = /^1\d{10}$/

      if (this.name === null || this.name.trim() === '') {
        toast.show('请输入姓名', options)
        return
      }

      if (this.phone === null || this.phone.trim() === '') {
        toast.show('请输入电话', options)
        return
      }

      if (re.test(this.phone)) {
        if (this.info && this.info.userInfo && this.info.userInfo.userinfo) {
        } else {
          this.$emit('bridge')
          return
        }
        this.savePhone()
        this.submitOrder()
      } else {
        toast.show('电话号码输入有误', options)
      }
    },
    savePhone () {
      let CustomStorage = MIP.util.customStorage
      let storage = new CustomStorage(0)
      storage.set('phone', this.phone)
      storage.set('name', this.name)
    },
    getPhone () {
      let CustomStorage = MIP.util.customStorage
      let storage = new CustomStorage(0)
      return storage.get('phone')
    },
    getName () {
      let CustomStorage = MIP.util.customStorage
      let storage = new CustomStorage(0)
      return storage.get('name')
    },
    baiduCB (name, phone, info) {
      if (!info || !info.userInfo || !info.userInfo.userinfo) return
      let openid = info.userInfo.userinfo.openid
      let accessToken = info.userInfo['access_token']
      let data = {
        name,
        phone,
        openid,
        accessToken,
        dest: this.destination,
        days: this.day
      }
      let _data = []
      for (let k in data) {
        _data.push(k + '=' + data[k])
      }
      fetch(this.host + '/order/callback/baidu', {
        method: 'POST',
        body: _data.join('&'),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(resp => resp.json()).then(resp => {
        console.log(resp)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
