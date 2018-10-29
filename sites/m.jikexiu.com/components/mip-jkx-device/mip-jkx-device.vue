<template>
  <div
    id="wrapper"
    ref="wrapper">
    <div class="wra">
      <div
        v-for="(item,index) in headMsg"
        :key="index"
        :class="{wrapper1:index>0}"
        class="wrapper"
        @click="open(index)">
        <p class="title">{{ item }}</p>
        <p
          v-if="index==0"
          :class="{txt:showTxt1}"
          class="name">
          {{ index==0?name:name1 }}
        </p>
        <p
          v-if="index>0"
          :class="{txt:showTxt2}"
          class="name">
          {{ index==0?name:name1 }}
        </p>
        <p class="arrow-wrap">
          <img
            src="//rs.jikexiu.com/appresources/images/arrow_gray.png"
            class="arrow"
            alt="">
        </p>
      </div>
      <transition name="fade">
        <div
          v-show="devicedata.showFault"
          class="choose-fault flex">
          <div class="choose-left">
            <div class="choose-left-default">{{ fault||devicedata.fault }}</div>
            <div class="choose-left-period">{{ period||devicedata.period&&devicedata.period.split('(')[1].split(')')[0] }}</div>
          </div>
          <div class="choose-right">
            {{ price||devicedata.price }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import request from '@/common/js/fetch'
import apiUrl from '@/common/js/config.api'
export default {
  props: {
    devicedata: {
      default () {
        return {}
      },
      type: Object
    },
    info: {
      default () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      last: true, // 玄设备还是故障
      index: 0,
      index1: 0,
      title: '',
      name: '选择型号',
      name1: '选择故障',
      show: false,
      showTxt1: false,
      showTxt2: false,
      headMsg: ['设备型号', '设备故障'],
      tab: [],
      changeColor: 0, // tab选择,
      changeColor1: 0, // tab选择,
      categoryId: 12, // 型号
      brandId: 8, // 品牌
      deviceId: '', // 设备id
      color: 117,
      attr: 1,
      attrValue: 2162,
      price: 0,
      malfunctionId: '', // 故障id，
      // 判断验证码是否为空,判断form组件的内容，清空
      isForm: {},
      period: '',
      fault: '',
      showFault: false
    }
  },
  watch: {
    devicedata (val) {
      if (val.showFault) {
        this.name1 = val.name1
        this.showTxt1 = val.showTxt1
        this.showTxt2 = val.showTxt2
        if (
          this.showTxt1 &&
          this.showTxt2 &&
          this.name &&
          this.name1 &&
          this.name1 !== '选择故障'
        ) {
          this.fault = val.fault
          this.price = val.price
          this.period = val.period
            ? val.period.split('(')[1].split(')')[0]
            : val.period
        }
      } else {
        this.name = val.name
        this.name1 = '选择故障'
      }
    }
  },
  mounted () {
    let href = window.location.href
    // if (this.info && this.info.isLogin) {
    if (href.indexOf('brandId') >= 0) {
      this.brandId = href
        .split('?')[1]
        .split('&')[0]
        .split('=')[1]
        .indexOf('-') >= 0 ? href
          .split('?')[1]
          .split('&')[0]
          .split('=')[1]
          .split('-')[1] : href
          .split('?')[1]
          .split('&')[0]
          .split('=')[1]
          .split('-')[0] || 0

      this.categoryId =
        href
          .split('?')[1]
          .split('&')[0]
          .split('=')[1]
          .indexOf('-') >= 0 ? href
            .split('?')[1]
            .split('&')[0]
            .split('=')[1].split('-')[0] : 0
        this.show = true
        this.last = true
        this.tab = ['品牌', '类型', '型号']
        if (this.categoryId > 0 && this.brandId > 0) {
          this.changeColor = 2
        } else if (this.brandId > 0 && this.categoryId === 0) {
          this.changeColor = 1
        } else {
          this.changeColor = 0
        }

        // this.changeColor = this.brandId > 0 ? 2 : 0
        // const brand = function () {
        //   let fun = {
        //     12: '手机',
        //     20: '跑步机',
        //     13: '平板',
        //     15: '笔记本',
        //     16: '一体机',
        //     32: '智能手表',
        //     26: '存储器'
        //   }
        //   return fun[this.brandId]
        // }
        // this.tab[0] = brand()
        MIP.setData({
          deviceData: {
            show: true,
            changeColor: this.changeColor,
            last: true,
            categoryId: this.categoryId,
            brandId: this.brandId,
            tab: this.tab
          }
        })
      } else if (href.indexOf('modelName') > 0) {
        let NAME = decodeURI(href.split('?')[1].split('=')[1])
        request(apiUrl.getSms, 'post', {
          ids: NAME
        }).then(res => {
          if (res.code === 200) {
            this.name = res.data.device.model
            this.name1 = res.data.sms[0].malfunctionName
            this.price = res.data.sms[0].price
            this.malfunctionId = res.data.sms[0].malfunctionId
            this.deviceId = res.data.device.id
            let per
            if (res.data.sms[0].warrantyPeriod > 0) {
              per = `质保${res.data.sms[0].warrantyPeriod}天`
            } else if (res.data.sms[0].warrantyPeriod === 0) {
              per = '不质保'
            } else {
              per = '终身质保'
            }

            this.period = per
            this.price = this.price > 0 ? `￥${this.price}` : '待检测'
            this.fault = res.data.sms[0].method
            this.showFault = true
            MIP.setData({
              deviceData: {
                show: false,
                name: this.name,
                name1: this.name1,
                showTxt1: true,
                showTxt2: true,
                price: this.price,
                fault: res.data.sms[0].method,
                period: `(${per})`,
                showFault: true
              },
              orderData: {
                price: this.price > 0 ? `￥${this.price}` : '待检测',
                device: this.name,
                solution: this.name1,
                malfunctionId: this.malfunctionId,
                attributeId: this.attr,
                attrValue: this.attrValue,
                deviceId: this.deviceId,
                fault: res.data.sms[0].method,
                period: `(${per})`
              }
            })
          }
        })
      }
    } else {
      // 设置登录组件的config属性中，重定向地址:redirectUri为订单页地址
      MIP.setData({
        config: {
          redirectUri: href
        }
      })
      // 在下一个执行时机触发事件
      this.$nextTick(function () {
        this.$emit('actionOrder')
      })
    }
    // } else {
    // // 设置登录组件的config属性中，重定向地址:redirectUri为订单页地址
    //   MIP.setData({
    //     config: {
    //       redirectUri: href
    //     }
    //   })
    //   // 在下一个执行时机触发事件
    //   this.$nextTick(function () {
    //     this.$emit('actionOrder')
    //   })
    // }
  },
  methods: {
    open (index) {
      if (index === 0) {
        MIP.setData({
          deviceData: {
            show: true,
            changeColor: 0,
            last: true
          }
        })
      } else if (index === 1) {
        if (this.name !== '选择型号') {
          MIP.setData({
            deviceData: {
              show: true,
              changeColor: 0,
              last: false
            }
          })
        } else {
          MIP.setData({
            alertMsg: {
              errorTitle: '请选择手机型号',
              isError: true
            }
          })
        }
      }
      this.changeColor = 0
      this.changeColor1 = 0
    }
  }
}
</script>
<style scoped lang="less">
#wrapper {
  margin-top: -30px;
  background: #f2f2f2;
  .wra {
    background: #fff;
  }
}
.wrapper {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  margin: 40px auto 0;
  // padding: 5px 0;
  padding: 5px 10px;
  text-align: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  background: #fff;
  .title,
  .name {
    height: 35px;
    line-height: 35px;
    color: #333;
    font-size: 15px;
  }
  .title {
    width: 30%;
    text-align: left;
    color: #666;
  }
  .name {
    width: 60%;
    margin-left: 0px;
    text-align: left;
    color: #999;
  }
  .txt {
    color: #333;
  }
  .arrow-wrap {
    position: relative;
    width: 10%;
    .arrow {
      display: block;
      position: absolute;
      top: 50%;
      right: 0;
      // right: 0;
      // bottom: 0;
      // margin: auto;
      // content: '';
      width: 8px;
      height: 14px;
      margin-top: -7px;
      // background: url('//rs.jikexiu.com/appresources/images/arrow_gray.png') no-repeat;
      // background-size: 100% 100%;
    }
  }
}
.wrapper1 {
  margin-top: 0px;
}
.choose-fault {
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 5px 10px;
  background: #f5ebc2;
  .choose-left {
    .choose-left-default,
    .choose-left-period {
      line-height: 25px;
      font-size: 14px;
    }
    .choose-left-period {
      color: #999;
    }
  }
  .choose-right {
    line-height: 50px;
    color: #f10215;
    font-size: 14px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
