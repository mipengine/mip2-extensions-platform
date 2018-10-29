<template>
  <div class="wrapper">
    <div class="container">
      <div
        class="li"
        @click="toposition">
        <i>服务地址</i>
        <input
          v-model="addr"
          placeholder="请填写门牌号"
          type="button"
          style="background:rgba(0,0,0,0); text-align: left; vertical-align: middle"
          @click="inputval" >
        <div class="arwabsolute">
          <img
            class="re-more"
            src="https://www.daoway.cn/h5/image/go_06.png">
        </div>
      </div>
      <div class="li"><i>门牌号</i><input
        v-model="doorNum"
        type="text"
        placeholder="请填写门牌号" ></div>
      <div class="li"><i>联系人</i><input
        v-model="contactPerson"
        type="text"
        placeholder="请填写联系人" ></div>
      <div class="li"><i>联系电话</i><input
        v-model="phone"
        type="Number"
        maxlength="11"
        placeholder="请填写联系电话" ></div>
      <button
        class="btn"
        @click="sure">保存</button>
    </div>

    <div
      v-show="warn.show"
      class="layer">
      <div class="layer-content zoomIn">
        <p
          class="layer-text"
          v-text="warn.texts"/>
        <p
          class="layer-sure active-layer"
          @click="closeLayer">知道了</p>
      </div>
    </div>
  </div>
</template>

<script>
// import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
  data: function () {
    return {
      addposition: JSON.parse(localStorage.getItem('addposition')),
      position2: localStorage.getItem('position2'),
      phone: '',
      contactPerson: '',
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      channel: 'mip',
      addr: '',
      doorNum: ''

    }
  },
  mounted () {
    let nick = localStorage.getItem('nick')
    this.contactPerson = nick
    this.addr = this.addposition.city + this.addposition.area + this.addposition.name
    if (this.position2) {
      this.position2 = JSON.parse(this.position2)
    }
  },
  methods: {
    sure () {
      let that = this
      let reg1 = /^1[3,4,5,8,7,6][0-9]{9}$/
      let mipUserId = localStorage.getItem('mipUserId')
      if (!that.addr) {
        that.warn.show = true
        that.warn.texts = '请填服务地址'
      } else if (!that.doorNum) {
        that.warn.show = true
        that.warn.texts = '请填写楼层，门牌号'
      } else if (!that.contactPerson) {
        that.warn.show = true
        that.warn.texts = '请填写联系人姓名'
      } else if (!that.phone) {
        that.warn.show = true
        that.warn.texts = '请填写手机号'
      } else if (!reg1.test(that.phone)) {
        that.warn.show = true
        that.warn.texts = '请填写正确的手机号'
      } else {
        let communityId = that.addposition.id || this.addposition.communityId
        let url = 'https://www.daoway.cn/daoway/rest/user/' + mipUserId + '/addUserAddress?isConfirm=0&channel=' + that.channel
        fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: 'addr=' + that.addr + '&lat=' + that.addposition.lat + '&lot=' + that.addposition.lot + '&communityId=' + communityId + '&phone=' + that.phone + '&name=' + that.contactPerson + '&doorNum=' + that.doorNum
        }).then(function (res) {
          return res.json()
        }).then(function (text) {
          if (text.status === 'ok') {
            let position2 = {
              addr: that.addr,
              city: that.addposition.city,
              communityId: communityId,
              contactPerson: that.contactPerson,
              house: that.doorNum,
              lat: that.addposition.lat,
              lot: that.addposition.lot,
              phone: that.phone,
              street: that.doorNum
            }
            localStorage.setItem('position2', JSON.stringify(position2))
            MIP.viewer.page.back()
          } else {
            console.log(text.msg)
            that.warn.show = true
            that.warn.texts = text.msg
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    closeLayer () {
      this.warn.show = false
    }
  }
}
</script>

<style scoped>
  .wrapper {
    margin: 0 auto;
    text-align: center;
  }
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  i {
    font-style: normal
  }

  li, ol {
    list-style: none
  }

  .container{width: 100%;}
  .container .li{height: 45px; line-height:45px;border-bottom: 1px solid #f5f5f5; background: #fff; width: 94%; margin: 0 auto; vertical-align: middle;}
  .container .li input{width: 74%;height: 42px;line-height: 42px; display: inline-block; vertical-align: middle; border: none; outline: none}
  .arwabsolute{position: relative;float: right; }
  .container .li i{width: 18%; display: inline-block; text-align: left}
  .re-more{width: 8px; height: auto}
  .btn {
    margin:25px 4%;
    width: 92%;
    line-height: 45px;
    background: #ee252d;
    text-align: center;
    border-radius: 4px;
    color: #fff;
    border: none;
    font-size: 16px;

  }
</style>
