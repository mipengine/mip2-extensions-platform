<template>
  <div style="height: 100%">
    <div
      v-show="!showEditAddressFlag"
      class="address-page">
      <div class="main-content">
        <div class="address-list">
          <div
            v-for="(a,index) in addresses"
            :key="index"
            :class="{selected: isSelected(a)}"
            class="address-item"
            swipe-move
            swipe-left="showDeleteBtn(a)($event)"
            swipe-right="hideDeleteBtn(a)($event)"
            @click="clickAddress(a)">
            <div
              class="relative"
              ng-style="{left: a.showDel?'-5rem': ''}">
              <span>{{ a.clientName }}</span>
              <span class="user-cellphone">{{ a.cellphone }}</span>
              <span
                v-if="a.isDefault"
                class="default-mark">默认地址</span>
            </div>
            <div
              class="relative"
              ng-style="{left: a.showDel?'-5rem': ''}">
              {{ a.location.province+a.location.city+a.location.district+a.detailAddress }}
            </div>
            <div
              class="delete-wrapper"
              ng-style="{right: a.showDel?'0': '',left: a.showDel?'auto': '100%'}">
              <div
                class="delete-btn"
                ng-click="deleteAddr(a,$event)">删除</div>
            </div>
            <mip-img
              layout="container"
              class="selected-img"
              src="~@/static/icon/address_selected.png"
              width="40px"
              height="40px"
            />
          </div>
        </div>
      </div>
      <mip-fixed
        type="bottom"
        still>
        <div class="footer">
          <div class="pre-btn-icon"/>
          <div
            class="btn-text"
            @click="toAddAddress()">新增收货地址</div>
        </div>
      </mip-fixed>
    </div>
    <div
      v-show="showEditAddressFlag"
      class="edit-address-page">
      <div class="main-content">
        <div class="edit-address">
          <div class="address-attr">
            <input
              v-model="location.name"
              placeholder="收货人姓名">
          </div>
          <div class="address-attr">
            <input
              v-model="location.cellphone"
              placeholder="联系电话">
          </div>
          <div class="address-attr">
            <div class="select-wrapper">
              <select
                v-model="location.province"
                @change="changeProvince()">
                <option value="">省</option>
                <option
                  v-for="(p,index) in provinces"
                  :value="p.code"
                  :key="index">{{ p.province }}</option>
              </select>
              <div class="select-arrow"/>
            </div>
            <div class="select-wrapper">
              <select
                v-model="location.city"
                @change="changeCity()">
                <option value="">市</option>
                <option
                  v-for="(c,index) in cities"
                  :value="c.code"
                  :key="index">{{ c.city }}</option>
              </select>
              <div class="select-arrow"/>
            </div>
            <div class="select-wrapper">
              <select v-model="location.district">
                <option value="">区</option>
                <option
                  v-for="(c,index) in districts"
                  :value="c.code"
                  :key="index">{{ c.district }}</option>
              </select>
              <div class="select-arrow"/>
            </div>
          </div>
          <div class="address-attr">
            <textarea
              v-model="location.address"
              placeholder="街道、小区名称、楼层单元等详细信息" />
          </div>
        </div>
        <div class="set-default">
          <div>设置为默认地址</div>
          <div
            :class="{checked: location.default}"
            class="as-default"
            @click="location.default=!location.default"/>
        </div>
        <div
          class="save_btn"
          @click="saveAddress()">保存</div>
      </div>
    </div>
    <div
      v-if="toastmsg"
      class="toast-msg">
      {{ toastmsg }}
    </div>
  </div>
</template>

<style scoped lang="less">
@main-color: #ff1d41;
@dark-font: #323038;
@normal-font: #494949;
@light-font: #aaa;
@normal-border: 1px solid #e4e4e4;
@medium-font: #95949d;
.box-orient(@orient) {
  -moz-box-orient: @orient;
  -webkit-box-orient: @orient;
  box-orient: @orient;
}
.box-pack(@pack) {
  -moz-box-pack: @pack;
  -webkit-box-pack: @pack;
  box-pack: @pack;
}
.box-align(@align) {
  -moz-box-align: @align;
  -webkit-box-align: @align;
  box-align: @align;
}
.box-flex(@flex) {
  -moz-box-flex: @flex;
  -webkit-box-flex: @flex;
  box-flex: @flex;
  flex: @flex;
  display: block;
}
.place-holder(@color,@size) {
  &:-moz-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder,
  &::-webkit-input-placeholder {
    color: @color;
    font-size: @size;
  }
}
.phone-switch(@width) {
  @borderWidth: 1px;
  @height: @width*0.6;
  width: @width;
  height: @height;
  position: relative;
  border-radius: @height;
  border: @borderWidth solid #ccc;
  background: #19b99a;
  overflow: hidden;
  &:before {
    left: -@borderWidth;
    top: -@borderWidth;
    content: "";
    position: absolute;
    width: @height;
    height: @height;
    box-shadow: 2px 2px 2px #ccc;
    border-radius: @height;
    border: @borderWidth solid #ccc;
    transition: left 0.5s;
    background: #fff;
    box-sizing: border-box;
    z-index: 15;
  }
  &:after {
    background: #fefefe;
    content: "";
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    position: absolute;
    transition: left 0.5s;
    z-index: 10;
    border-radius: @height;
  }
  &.checked {
    &:before {
      left: @width - @height;
    }
    &:after {
      left: @width;
    }
  }
}
.toast-msg {
  width: 180px;
  padding: 15px 10px;
  line-height: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  border-radius: 5px;
  left: 50%;
  top: 100px;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1000;
}
.default-mark {
  background: #ff1d41;
  color: #fff;
  font-size: 1.2rem;
  border-radius: 2px;
  padding: 0 0.4rem;
  height: 2rem;
  line-height: 2rem;
}
.address-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  .box-orient(vertical);
  font-size: 1.4rem;
  .main-content {
    .box-flex(1);
    background-color: #f4f4f4;
    border-top: 1px solid #eee;
    overflow-y: auto;
  }
  .delete-wrapper {
    position: absolute;
    top: 0;
    left: 100%;
    height: 100%;
    line-height: 7rem;
    z-index: 100;
    .delete-btn {
      background: @main-color;
      margin-left: 1rem;
      width: 5rem;
      text-align: center;
      color: #fff;
      height: 100%;
    }
  }
  .footer {
    height: 5rem;
    min-height: 5rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .box-align(center);
    .box-pack(center);
    .pre-btn-icon {
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 2rem;
      border: 2px solid @main-color;
      position: relative;
      margin-right: 2rem;
      &:before {
        content: "";
        position: absolute;
        height: 2px;
        background: @main-color;
        left: 25%;
        top: 50%;
        width: 50%;
        transform: translateY(-50%);
      }
      &:after {
        content: "";
        position: absolute;
        width: 2px;
        background: @main-color;
        left: 50%;
        top: 25%;
        height: 50%;
        transform: translateX(-50%);
      }
    }
    .btn-text {
      color: @main-color;
      line-height: 5rem;
      font-size: 1.6rem;
    }
  }
  .address-list {
    margin-top: 1rem;
    background-color: #fff;
    .address-item {
      padding: 0.5rem 1rem;
      border-bottom: 1px solid #eee;
      line-height: 3rem;
      position: relative;
      overflow: hidden;
      &:last-child {
        border-bottom: none;
      }
      .user-cellphone {
        padding: 0 0.5rem;
      }
      &.selected {
        .selected-img {
          display: block;
        }
      }
      .selected-img {
        display: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 1rem;
        width: 3.5rem;
      }
    }
  }
}
.edit-address-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  .box-orient(vertical);
  font-size: 1.4rem;
  select {
    border: none;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    outline: none;
  }
  .main-content {
    .box-flex(1);
    background-color: #f4f4f4;
    border-top: 1px solid #eee;
    .edit-address {
      background-color: #fff;
      padding: 0 1rem;
      margin-top: 1rem;
      .address-attr {
        min-height: 4rem;
        line-height: 4rem;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        .box-align(center);
        &:last-child {
          border-bottom: none;
        }
        .select-wrapper {
          height: 70%;
          .box-flex(1);
          position: relative;
        }
        .select-arrow {
          border-right: 1px solid #999;
          border-bottom: 1px solid #999;
          transform: rotateZ(45deg);
          right: 1rem;
          width: 1rem;
          height: 1rem;
          position: absolute;
          right: 10%;
          top: 0;
          z-index: 100;
        }
        select {
          width: 90%;
          height: 100%;
          display: block;
          background: transparent;
        }
        textarea {
          min-height: 6rem;
        }
        input,
        textarea {
          .place-holder(#999,1.4rem);
          border: none;
          outline: none;
          resize: none;
          width: 100%;
          display: inline-block;
          font: 1.4rem arial;
        }
      }
    }
    .set-default {
      .edit-address .address-attr;
      background-color: #fff;
      padding: 0 1rem;
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .box-align(center);
      .box-pack(justify);
      .as-default {
        .phone-switch(4rem);
      }
    }
    .save_btn {
      background-color: @main-color;
      color: #fff;
      margin: 0 auto;
      margin-top: 2rem;
      text-align: center;
      border-radius: 0.5rem;
      height: 3.5rem;
      line-height: 3.5rem;
      font-size: 1.3rem;
      width: 90%;
    }
  }
}
</style>

<script>
import { httpGet, httpPost } from '@/common/httpUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil.js'
import { templateCompile } from '@/common/urlUtil'
export default {
  props: {
    prefixUrl: {
      type: String,
      default: ''
    },
    addressUrl: {
      type: String,
      default: ''
    },
    nextUrl: {
      type: String,
      default: ''
    },
    loginUrl: {
      type: String,
      default: ''
    },
    provinceUrl: {
      type: String,
      default: ''
    },
    cityUrl: {
      type: String,
      default: ''
    },
    districtUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      addresses: [],
      showEditAddressFlag: false,
      provinces: [],
      cities: [],
      districts: [],
      location: { default: false },
      addressOID: '',
      pageData: {},
      orderPending: true,
      toastmsg: ''
    }
  },
  mounted () {
    sessionStorageUtil.syncSessionData()
    this.loadAddress()
    this.addressOID = MIP.hash.get('addressOID')
  },
  methods: {
    loadAddress () {
      let me = this
      httpGet(this.addressUrl)
        .then(function (res) {
          if (res.statusCode === 200) {
            me.addresses = res.result.data || []
          } else if (res.statusCode === 1005) {
            sessionStorageUtil.set(
              'login_back_url',
              MIP.viewer.page.currentPageId
            )
            me.loginUrl && MIP.viewer.open(me.loginUrl)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    clickAddress (a) {
      if (a) {
        sessionStorageUtil.set('selected_addr', a)
        window.MIP.viewer.page.back()
      }
    },
    toAddAddress () {
      let me = this
      me.showEditAddressFlag = true
      httpGet(me.provinceUrl).then(function (res) {
        if (res.statusCode === 200) {
          me.provinces = res.result.data || []
          if (me.provinces.length > 0) {
            let provinceCode = me.provinces[0].code
            me.location.province = provinceCode
            let cityUrl = templateCompile(me.cityUrl, { provinceCode })
            httpGet(cityUrl).then(function (res) {
              if (res.statusCode === 200) {
                me.cities = res.result.data || []
                if (me.cities.length > 0) {
                  let cityCode = me.cities[0].code

                  me.location.city = cityCode
                  let districtUrl = templateCompile(me.districtUrl, {
                    provinceCode,
                    cityCode
                  })
                  httpGet(districtUrl).then(function (res) {
                    if (res.statusCode === 200) {
                      me.districts = res.result.data || []
                      if (me.districts.length > 0) {
                        me.location.district = me.districts[0].code
                      }
                    }
                  })
                }
              }
            })
          }
        }
      })
    },
    isSelected (a) {
      return a.addressOID === this.addressOID
    },
    saveAddress (callback) {
      let me = this
      me.location.default = me.location.default || false
      me.toast('系统正在处理地址请求，请稍后')
      if (me.validate() && me.orderPending) {
        me.orderPending = false
        httpPost(me.addressUrl, me.location)
          .then(function (res) {
            me.orderPending = true
            if (res.statusCode === 200) {
              me.toastmsg = ''
              me.showEditAddressFlag = false
              res.result.data &&
                res.result.data.addressOID &&
                me.addresses.push(res.result.data)
            } else if (res.statusCode === 1005) {
              sessionStorageUtil.set(
                'login_back_url',
                MIP.viewer.page.currentPageId
              )
              me.loginUrl && MIP.viewer.open(me.loginUrl)
            } else {
              me.toast(res.comments)
            }
          })
          .catch(function (err) {
            me.toast(err.message)
          })
      }
    },
    validate () {
      if (!this.location.name) {
        this.toast('姓名不得为空')
        return false
      }
      if (!/1\d{10}/.test(this.location.cellphone)) {
        this.toast('请输入有效的手机号码')
        return false
      }
      if (!this.location.address) {
        this.toast('详细地址不得为空')
        return false
      }
      return true
    },
    toast (msg, timeout) {
      let me = this
      if (msg !== '') {
        timeout = timeout || 2000
        me.toastmsg = msg
        setTimeout(() => {
          me.toastmsg = ''
        }, timeout)
      }
    },
    changeProvince () {
      let me = this
      let provinceCode = me.location.province
      let cityUrl = templateCompile(me.cityUrl, { provinceCode })
      httpGet(cityUrl).then(function (res) {
        if (res.statusCode === 200) {
          me.cities = res.result.data || []
          if (me.cities.length > 0) {
            let cityCode = me.cities[0].code

            me.location.city = cityCode
            let districtUrl = templateCompile(me.districtUrl, {
              provinceCode,
              cityCode
            })
            httpGet(districtUrl).then(function (res) {
              if (res.statusCode === 200) {
                me.districts = res.result.data || []
                if (me.districts.length > 0) {
                  me.location.district = me.districts[0].code
                }
              }
            })
          }
        }
      })
    },
    changeCity () {
      let me = this
      let cityCode = me.location.city
      let provinceCode = me.location.province
      let districtUrl = templateCompile(me.districtUrl, {
        provinceCode,
        cityCode
      })
      httpGet(districtUrl).then(function (res) {
        if (res.statusCode === 200) {
          me.districts = res.result.data || []
          if (me.districts.length > 0) {
            me.location.district = me.districts[0].code
          }
        }
      })
    }
  }
}
</script>
