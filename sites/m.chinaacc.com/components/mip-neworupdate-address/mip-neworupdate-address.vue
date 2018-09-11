<template>
  <div class="wrapper dzgl">
    <div class="titbg">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
        <i class="dian abs"/>新增地址</div>
      </div>
    </div>
    <div class="bot clearfix">
      <div class="bot-nr clearfix">
        <div class="bot-nr-l fl">收 货 人：</div>
        <input
          v-model="postInfo.fullName"
          type="text"
          name="fullName"
          class="bot-nr-c fl">
      </div>
      <div class="bot-nr clearfix">
        <div class="bot-nr-l fl">手机号码：</div>
        <input
          v-model="postInfo.mobile"
          type="text"
          name="fullName"
          class="bot-nr-c fl">
      </div>
      <div class="bot-nr clearfix">
        <div class="bot-nr-l fl">邮&#12288;&#12288;编：</div>
        <input
          v-model="postInfo.zipcode"
          type="text"
          name="fullName"
          class="bot-nr-c fl">
      </div>
      <div class="bot-nr clearfix">
        <div class="bot-nr-l fl">邮&#12288;&#12288;箱：</div>
        <input
          v-model="postInfo.email"
          type="text"
          name="fullName"
          class="bot-nr-c fl">
      </div>
      <div class="bot-nr clearfix pr">
        <div class="bot-nr-l fl">所在地区：</div>
        <div
          class="bot-nr-c3 fl"
          on="click:addressPicker.initPicker">
          <label
            v-if="flag"
            id="cityData"
            v-text="readyArea.province.name + ' ' + readyArea.city.name + ' ' + readyArea.area.name"/>
        </div>
        <i class="rjian abs"/>
      </div>
      <div class="bot-nr clearfix">
        <div class="bot-nr-l fl">详细地址：</div>
        <textarea
          v-model="postInfo.address"
          name="fullName"
          class="bot-nr-c2 fl"
          placeholder="请输入街道、楼牌号等"/>
      </div>
    </div>
    <button
      class="han"
      @click="savePostInfo">保存并使用</button>
    <mip-address-picker
      id="addressPicker"
      @areaChange="trest"/>

  </div>
</template>

<script>
import { getUrlParams, gotoUrl } from '../../common/utils'
import { getShopMemPostInfo, updatePostInfoInvoice } from '../../common/api'
import { Toast, Loading } from '../../common/utils/toast'
export default {
  data () {
    return {
      flag: false,
      readyArea: {},
      tmp: 1,
      orderId: '',
      postHisId: '',
      postInfo: {
        fullName: '',
        mobile: '',
        zipcode: '',
        email: '',
        address: ''
      }
    }
  },
  async mounted () {
    const that = this
    let params = getUrlParams()
    that.postHisId = params.postHisId
    that.orderId = params.orderId
    if (params['type'] + '' === '1') {
      let setting = {
        postHisId: params.postHisId
      }
      await getShopMemPostInfo(setting).then(res => {
        if (res != null) {
          let PostInfo = res.PostInfo
          that.postInfo.fullName = PostInfo.fullName
          that.postInfo.mobile = PostInfo.mobile
          that.postInfo.zipcode = PostInfo.zipcode
          that.postInfo.email = PostInfo.email
          that.postInfo.address = PostInfo.address
          if (PostInfo.provinceName != null && PostInfo.provinceName + '' !== '') {
            that.readyArea.province = {
              id: PostInfo.provinceId || '',
              name: PostInfo.provinceName || ''
            }
          }
          if (PostInfo.cityName != null && PostInfo.cityName + '' !== '') {
            that.readyArea.city = {
              id: PostInfo.cityId || '',
              name: PostInfo.cityName || ''
            }
          }
          if (PostInfo.areaName != null && PostInfo.areaName + '' !== '') {
            that.readyArea.area = {
              id: PostInfo.areaId || '',
              name: PostInfo.areaName || ''
            }
          }
          that.flag = true
        }
      })
    }
  },
  methods: {
    trest (e) {
      let item = e.detail[0]
      this.readyArea = {
        province: { id: item['province'].id, name: item['province'].name },
        city: { id: item['city'].id, name: item['city'].name },
        area: { id: item['area'].id, name: item['area'].name }
      }
      this.$set(this.readyArea, item['area'].id, this.readyArea)
      this.flag = false
      this.flag = true
    },
    savePostInfo () {
      const that = this
      let $Toast = new Toast()
      let $Loading = new Loading()
      // 收货人
      if (that.postInfo.fullName + '' === '') {
        $Toast.open({ message: '请输入收件人姓名！' })
        return
      }

      // 手机号码
      if (that.postInfo.mobile + '' === '') {
        $Toast.open({ message: '手机号码不能为空' })
        return
      } else {
        let mobilePhoneRegex = /^[0-9]{11}$/
        if (!mobilePhoneRegex.test(that.postInfo.mobile)) {
          $Toast.open({ message: '手机号码不正确' })
          that.postInfo.mobile = ''
          return
        }
      }

      // 邮编
      if (that.postInfo.zipcode + '' === '') {
        $Toast.open({ message: '请填邮政编码' })
        return
      } else {
        let szReg = /^[0-9][0-9]{5}$/
        if (!szReg.test(that.postInfo.zipcode)) {
          $Toast.open({ message: '请填正确的邮政编码' })
          that.postInfo.zipcode = ''
          return
        }
      }

      // 邮箱
      if (that.postInfo.email + '' === '') {
        $Toast.open({ message: '请填邮箱' })
        return
      } else {
        let szReg = /^([a-zA-Z0-9]+[_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!szReg.test(that.postInfo.email)) {
          $Toast.open({ message: '邮箱不正确' })
          that.postInfo.email = ''
          return
        }
      }

      const containSpecial = function (s) {
        let containSpecial = RegExp(
          /[( )(~)(!)(@)(#) ($)(%)(^)(&)(*)(()())(\-)(_)(+)(=) ([)(\])({)(})(|)(\\)(;)(:)(')(")(,)(.)(/) (<)(>)(?)()]+/
        )
        return containSpecial.test(s)
      }
      // 详细地址
      if (that.postInfo.address + '' === '') {
        $Toast.open({ message: '详细地址不能为空' })
        return
      } else {
        if (containSpecial(that.postInfo.address)) {
          $Toast.open({ message: '详细地址不正确！' })
          that.postInfo.address = ''
          return
        }
      }

      // 保存
      $Loading.open()
      let setting = {
        orderId: that.orderId + '',
        fullName: encodeURI(that.postInfo.fullName),
        provinceId: that.readyArea.province.id.toString(),
        cityId: that.readyArea.city.id.toString(),
        areaId: that.readyArea.area.id.toString(),
        zipcode: that.postInfo.zipcode,
        address: encodeURI(that.postInfo.address),
        mobile: that.postInfo.mobile,
        email: that.postInfo.email,
        postHisId: that.postHisId
      }
      updatePostInfoInvoice(setting).then(res => {
        $Loading.close()
        if (res.success + '' === '1') {
          $Toast.open({
            message: '保存成功'
          })
          setTimeout(() => {
            gotoUrl(
              '/payment/addressManage.html?orderId=' +
                that.orderId +
                '&postHisId=' +
                res.post.postHisId
            )
          }, 1500)
        } else {
          $Toast.open({
            message: '保存失败'
          })
        }
      })
    }
  }
}
</script>
