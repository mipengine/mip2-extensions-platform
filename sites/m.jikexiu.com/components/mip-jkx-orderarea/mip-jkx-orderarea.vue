<template>
  <div
    class="area">
    <div
      class="city1 flex">
      <p
        class="title">
        所在城市
      </p>
      <p
        :class="{right1:wrong2}"
        type="text"
        class="content"
        readonly="readonly"
        @click="selectArea">{{ area.address }}
      </p>
    </div>
    <div
      class="detail flex">
      <p
        class="title">
        详细地址
      </p>
      <p
        :class="{right1:wrong2}"
        class="content"
        @click="focus">
        {{ detail }}
      </p>
    </div>
  </div>
</template>
<script>
import request from '@/common/js/fetch'
import apiUrl from '../../common/js/config.api'
export default {

  // directives: {
  //   focus: {
  //     inserted: function (el) {
  //       el.focus()
  //     }
  //   }
  // },
  props: {
    areadata: {
      default () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      area: {
        cityId: 0,
        proId: 1,
        disId: 0,
        province: '',
        city: '',
        distri: '',
        address: '',
        detail: ''
      },
      isShow1: true,
      isShowPopup: false,
      detail: '',
      num: 0,
      isLocation: true
    }
  },
  watch: {
    areadata (val) {
      if (this.area.address !== val.address) {
        this.area.address = val.address
        let city = val.show1 && this.num === 0 ? this.area.address.split(' ')[1] : val.address.split(' ')[1]
        let dist = val.show1 && this.num === 0 ? this.area.address.split(' ')[2] : val.address.split(' ')[2]
        this.isLocation = false
        request(`${apiUrl.getByName}?cityName=${city}&distName=${dist}`).then(res => {
          if (res.code === 200) {
            this.area.cityId = res.data.dist.city.id
            this.area.distId = res.data.dist.id
            MIP.setData({
              orderData: {
                'cityId': this.area.cityId,
                'distId': this.area.distId,
                'address': this.area.address,
                'detail': this.detail
              },
              areaData: {
                'detail': this.detail,
                'address': this.area.address,
                'locationAddress': this.area.address
              }
            })
          }
        })
      }
      this.area.address = val.show1 && this.num === 0 ? this.area.address : val.address
      this.detail = val.detail
      if (val.show1) this.num++
    }
  },
  mounted () {
    this.$on('success', res => {
      this.isLocation = false
      this.detail = res.address.city + ' ' + res.address.district + ' ' + res.address.street
      this.area.city = res.address.city
      this.area.address = res.address.province + ' ' + res.address.city + ' ' + res.address.district
      MIP.setData({
        chooseDetail: {
          'around': [],
          'city': res.address.city,
          'nowPosition': res.address.city + ' ' + res.address.district + ' ' + res.address.street + ' ' + res.address.street_number
        }
      })
      request(`${apiUrl.getByName}?cityName=${res.address.city}&distName=${res.address.district}`).then(res1 => {
        if (res1.code === 200) {
          this.area.cityId = res1.data.dist.city.id
          this.area.distId = res1.data.dist.id
          MIP.setData({
            orderData: {
              'cityId': this.area.cityId,
              'distId': this.area.distId,
              'address': this.area.address,
              'detail': this.detail,
              'lat': res.point.lat,
              'lng': res.point.lng
            },
            areaData: {
              'detail': this.detail,
              'address': this.area.address,
              'locationAddress': this.area.address
            }
          })
        }
      })
    })
    this.$on('failed', res => {
      console.log(res)
      this.isLocation = true
    })
  },
  methods: {
    selectArea () {
      MIP.setData({
        areaData: {
          'show': true
        }
      })
    },
    focus () {
      // 没有授权获取位置
      if (this.isLocation) {
        MIP.setData({
          alertMsg: {
            errorTitle: '您没有授权获取位置信息，请您先选择所在城市',
            isError: true
          }
        })
      } else {
        MIP.setData({
          chooseDetail: {
            'show': true
          },
          orderData: {
            'showFixed': true
          }
        })
      }
    },
    blur () {
      MIP.setData({
        orderData: {
          'detail': this.area.detail
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
  li,ol{
    list-style: none;
  }
  .flex{
    display: -webkit-flex;
    display: flex;
    flex-direction: row;
  }
  input{
    border: none;
    outline:none;
  }
  .area{
    margin: 10px 0;
    background: #f2f2f2;
    .flex{
      padding: 0 10px;
      background: #fff;
      border-bottom: 1px solid #eee;
      .title{
          width: 30%;
          height: 35px;
          padding: 5px 0;
          color: #666;
          line-height: 35px;
          // text-indent: 10px;
          font-size: 15px;
      }
      .content{
          width: 65%;
          height: 35px;
          padding: 5px 0;
          color: #333;
          line-height: 35px;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
      }
    }
    .city1,.detail{
      position: relative;
    }
    .city1:after{
      position: absolute;
      top: 0;
      right: 10px;
      content: "";
      width: 8px;
      height: 14px;
      margin-top: 13px;
      background: url(//rs.jikexiu.com/appresources/images/arrow_gray.png) no-repeat;
      background-size: 100% 100%;
    }
    .detail:after{
      content: "";
      position: absolute;
      top: 0;
      right: 10px;
      width: 20px;
      height: 20px;
      margin-top: 10px;
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAXPSURBVHja1JjfTxpZFMe/szMrKStVM3EInWKARAzWbQjtGkvQNkUMtBr74kP/Rh+6POyaQLuhSRXjNg0pommNI+t0OwtkojIuDe5M7j7o3Kipw/DDJr0JD4Q78/3cw73nfM9lCCH4nsYP+M4G1+0LFEUhsiyjVqvh4OAAjUaD/uZ0OjE0NITh4WF4vV54PB6mWz2mky1hGAbZ2trC9lYJh0d1288NDtxEaPwOxsfHwbIs802AZVkmr1+/ppHkOA5+vx9utxtutxv9/f107vHxMSqVCiqVCvb29qDrOo38w4cP4fV6mWsDNgyDrK/nUSptUdFIJIKxsTFb0TIMg3z48AHv3r2ji71zZxxTUw/airYtYMMwyKtXf6Bc3qNC9+//AofD0XaEms0mefv2T7pwn8+PePyxbWg7wCSTyaJc3gPHcXj06BECgUDXh0eSJJLL5aDrOnw+P+bmEgDAdJ3WNjY2KGwikegJLAAEAgEmkUiA4ziUy3vY2NjoPg8rikIKhQIAIBaLdXRIrIbX62VisRgAoFAoQFEU0g0wWVtbAwCMjo4iGAz2FNYcwWCQGR0dBQCc6ZGOgCVJgqqq4DgO0Wj0WqtXNBoFx3FQVRWSJHUW4eL79wCAiYkJ29mg2WwSWZbJx48fiSzLpNls2sqZDoeDmZiYuKDbVmnWNI1UqlUAQCgUsgW6trZ2oTicKyokGo22XHQoFEKhUEClWoWmacTlcjG2I1wulwEAoijiqgfPL255eRk7OzsXYAFA13Xs7OxgeXkZmqZZRtvlcjGiKF7Qtw2sKP8AADweT8uCkslkaOXy+fxYWFjA8+fPsbCwAJ/PDwBoNBrIZDIwDMMS2tQz9W1vicMDFQAwPDxsCby7uwtVPZ0bDocxOTnJnIsYPB4PVlffkFJpC6qqYnd3F8Fg8Mr3mXqmvu0IH/97GrHBwUFL4HL5L+or7t2799U5U1MP4HQ6zzLPrrWbO9Mz9W0Dm3uxr6/PUsCMhCiKV3oBlmXp3qwfHVm+z9S7fBZ63nH09f1oa97Jf/r1tEgcd7q1T05OLB/+qd8FAPj70yerCkVq1QoAYGhoyHpBZ3qmvm3ggYGB07/88NBSwO8/zQKHR3UUi8WvF6BikXYlIyMj1lvsTM/Utw3sct0EANRqNUuBsbExeqDy+TxWV98QM99qmkZWV9+QfD5PD6ZVhjivZ+rbTmu3b4sol/cg7+8jEolc+TDLskwqlSLpdBq6rqNU2jKNObm8xeLxeMtqJ+/vU/22Iuz1egGAlkkrEZ7nmaWlJbgF4au/uwUBi4uLLTvm83bA1LcdYZfLxbgFgVSqVWxvb2NychKtyuris2dQVZV8/vwZX758wY0bN3Dr1i3wPG/LOG1vb9MFWtmBK4/jz3fvovLyJTY3NxEKhUgrT2FGm+f5tlOVpmlkc3OT6nZkLwOBAOMWBOi6jnx+/Vr9cD6/Dl3X4RaEli2YZeGITU/TnqtYLF7LJVyxWCRmzxibnu6up+N5ngmHwzRtSZLUU2hJkmjaC4fDtvZ7y9IciURoz5XL5SDLck+gZVkmuVyO9oyRSMTW4bTlJWZmZuDz+aHrOrLZrK3utlU3ns1m6Z3EzMxMb69bWZZl4vHHGBnxQtd1rKysdAytKApZWVmBrusYGfG2devTlltjWZZJJOYgiiKFVlW1LWhVVSmsKIpIJObavsVsy16yLMskk0kKnU6nbUOrqkpLuCiKSCaTHV25tu2HWZZlZmdnYeZoO5E+H1m3IGB2drbj++GODLzD4WCSqRTcgoBGo2EJbcI2Gg24BQHJVKqjW8+uOw4Tmud5Cn3ZKGmaRmF5nu8atusWyeFwMPPz8xQ6nU7jvB9Op9MUdn5+vmtYu/fDtszLyu+/4fCojsGBm4jPJvDqZZZ+Tz15Cjvm6ZsBX4ambXuPYXvWNZueOPXkKW2ZnE5nz2FPW1pCevqp1+vk1xcvSL1eJ71+NyGkd1viW43/BwC96ly0OPz74QAAAABJRU5ErkJggg==") no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
