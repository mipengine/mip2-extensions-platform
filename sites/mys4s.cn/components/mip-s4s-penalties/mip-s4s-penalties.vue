<template>
  <div class="s4s-page">
    <div class="s4s-body" >
      <div style="display:none">
        <canvas
          id="canvas"
          width="0"
          height="0"
          style="dispaly: none"/>
      </div>
      <a
        ref="pay2"
        data-type="mip"
        href="pay2.html"/>
      <!-- <img src="../../assets/620.jpg" style="width:100%;"/> -->
      <div class="s4s-order-container" >
        <p class="s4s-order-title">处罚决定书编号
          <span
            class="s4s-help s4s-help-tip"
            @click="openCode">
            !
          </span>
        <span style="color:#999;font-size:.14rem;">15-16位</span></p>
        <div class="s4s-order-input">
          <input
            v-model="orderNumber"
            type="text"
            maxlength="19"
            placeholder="请输入处罚决定书编号" >
          <span
            class="s4s-btn"
            @click="ready" >确定</span>
        </div>
        <p class="s4s-order-text">处罚决定书编号、车牌号和处罚人为办单依据，请咨询核对！</p>
      </div>
      <div
        v-show="showNotice"
        class="s4s-order-container"
        style="margin-top:.15rem;" >
        <p class="s4s-order-title">代缴流程和注意事项</p>
        <div class="s4s-order-img-container">
          <div style="flex:4">
            <div class="flex-center">
              <mip-img
                width="40"
                height="41"
                class="pic"
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/icon1.png" />
              <mip-img
                width="13"
                height="20"
                class="arr"
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/leftar.png"/>
            </div>
            <div class="s4s-order-tip-text" >违法告知单</div>
          </div>
          <div style="flex:4">
            <div class="flex-center">
              <mip-img
                width="40"
                height="41"
                class="pic"
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/icon2.png"/>
              <mip-img
                width="13"
                height="20"
                class="arr"
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/leftar.png"/>
            </div>
            <div class="s4s-order-tip-text" >交管认罚</div>
          </div>
          <div style="flex:4">
            <div class="flex-center">
              <mip-img
                width="40"
                height="41"
                class="pic"
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/icon3.png"/>
              <mip-img
                width="13"
                height="20"
                class="arr"
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/leftar.png"/>
            </div>
            <div class="s4s-order-tip-text" >领处罚决定书</div>

          </div>
          <div style="flex:3">
            <div class="flex-center">
              <mip-img
                width="40"
                height="41"
                class="pic"
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/icon4.png" />
            </div>
            <div class="s4s-order-tip-text" >线上缴费</div>

          </div>
        </div>
        <p class="s4s-order-content">交通违法代缴的办理周期为1-2个工作日，部分地区2-5个工作日，需年检的用户如需当日处理完成请勿下单。其他问题请参见
          <a
            data-type="mip"
            href="help.html"
            style="color:#4F7EFF">常见问题</a>
          <!-- <span @click="gotoHelp">常见问题</span> -->
          。</p>
      </div>
      <template v-if="!showNotice">

        <div
          v-if="showForm1"
          class="s4s-pay-body">
          <div class="s4s-title">
            违章处罚单信息
          </div>
          <div class="s4s-group">
            <span class="s4s-group-tit">被处罚人</span>
            <span
              class="s4s-group-tit"
              style="width:auto" >{{ payForm.name }}</span>
          </div>
          <div class="s4s-group">
            <div class="s4s-group-tit">认罚日期
              <!-- <span class="s4s-help" @click="openDateShow">?</span> -->
            </div>
            <span
              class="s4s-group-tit"
              style="width:auto" >{{ payForm.renfa_time }}</span>
          </div>
          <div class="s4s-group">
            <span class="s4s-group-tit">罚款金额</span>
            <span
              class="s4s-group-tit"
              style="width:auto;color:#fe7000">¥ {{ payForm.money }}</span>
          </div>
          <div class="s4s-group">
            <span class="s4s-group-tit">滞纳金</span>
            <span style="width:auto;color:#fe7000" >¥ {{ payForm.late_free || 0 }}</span>
          </div>
          <div class="s4s-group">
            <span class="s4s-group-tit">服务费</span>
            <span style="width:auto;color:#fe7000" >¥ {{ payForm.own_free || 0 }}</span>
          </div>
          <div class="s4s-group">
            <span class="s4s-group-tit">违法时间</span>
            <span style="width:auto;" >{{ payForm.time || '-' }}</span>
          </div>
          <div class="s4s-group">
            <span class="s4s-group-tit">违法地址</span>
            <span style="width:auto;" >{{ payForm.address || '-' }}</span>
          </div>
          <div class="s4s-group">
            <span class="s4s-group-tit">违法城市</span>
            <span style="width:auto;" >{{ payForm.city || '-' }}</span>
          </div>

        </div>

        <div
          v-if="showForm2"
          class="s4s-pay-body">
          <div class="s4s-title">
            违章处罚单信息
          </div>
          <div
            v-if="showName"
            class="s4s-group">
            <span class="s4s-group-tit">被处罚人</span>
            <input
              v-model="nick"
              type="text"
              placeholder="请输入被处罚人姓名" >
          </div>
          <div
            v-if="!showName"
            class="s4s-group">
            <span class="s4s-group-tit">车牌号码</span>
            <div style="display: flex;align-items:center;overflow: hidden;width:1.30rem;">
              <span
                class="s4s-sel-provice"
                style="float: left;"
                @click="selectProvice">{{ provice }}</span>
              <input
                v-model="nickCarNo2"
                type="text"
                maxlength="7"
                style="text-align: left;line-height:.25rem;width: 1rem;"
                placeholder="请输入车牌号码" >
            </div>
          </div>
          <div
            v-if="showDrive"
            class="s4s-group">
            <span class="s4s-group-tit">驾驶证号</span>
            <input
              v-model="drive_no"
              type="text"
              maxlength="19"
              placeholder="请输入驾驶证号" >
          </div>
          <div class="s4s-group">
            <div class="s4s-group-tit">认罚日期
              <!-- <span class="s4s-help" @click="openDateShow">?</span> -->
            </div>
            <input
              id="date1"
              :max="maxtime"
              v-model="date"
              type="date"
              class="s4s-select-date"
              style="flex: 1"
              placeholder="请选择认罚日期" >
            <mip-img
              width="20"
              height="22"
              src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/date.png"/>
          </div>
          <div class="s4s-group">
            <span class="s4s-group-tit">罚款金额</span>
            <input
              v-model="price"
              type="number"
              placeholder="请输入罚款金额" >
          </div>
          <div class="s4s-group">
            <span class="s4s-group-tit">滞纳金额</span>
            <span style="width:auto;color:#fe7000" >¥ {{ lateFree|| 0 }}</span>
          </div>
          <div class="s4s-group">
            <span class="s4s-group-tit">服务费用</span>
            <!-- <span style="width:auto;color:#959595;font-size:0.14rem;margin-right:0.10rem" v-if="price && price > 0">已优惠5元</span> -->
            <!-- <span style="width:auto;color:#959595; text-decoration:line-through;margin-right:0.15rem;font-size:0.14rem" >¥ {{ ownFree + 5 || 5 }}</span> -->
            <span style="width:auto;color:#fe7000" >¥ {{ ownFree|| 0 }}</span>
          </div>
          <div
            class="s4s-group"
            style="height:auto">
            <div class="s4s-group-tit">上传罚单</div>
            <mip-img
              v-show="ticketUrl"
              :src="ticketUrl"
              width="110"
              height="70"
              @click="chooseimg" />
            <mip-img
              v-show="!ticketUrl"
              src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/update3.png"
              width="110"
              height="70"
              style="background:#eee"
              @click="chooseimg" />
            <!-- <div
              v-show="!ticketUrl"
              class="image-container"
              @click="chooseimg" >
              <mip-img
                :src="ticketUrl || 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/update3.png'"
              />
            </div> -->
            <input
              ref="file"
              type="file"
              accept="image/*"
              multiple="multiple"
              style="display: none;"
              @change="uploader">
          </div>
        </div>

        <button
          v-if="showForm1 || showForm2"
          class="s4s-btn"
          @click="tryToPay">立即办理 </button>
      </template>

    </div>
    <mip-fixed type="top">
      <div
        v-show="openShow"
        class="s4s-mask"
        @click="closeMake">
        <mip-img :src="src" />
      </div>
    </mip-fixed>
    <!-- <template v-if="dateShow">
      <div class="s4s-pop">
        <div class="s4s-pop-bg"/>
        <div class="s4s-pop-body">
          <div class="s4s-pop-title">认罚日期</div>
          <div style="margin-top: .15rem;color: #333;font-size: .15rem;">处罚决定书的领取日期，或现场单的开具日期，请您准确填写以便确认罚款金额。</div>
        </div>
        <img src="../../assets/close.png" class="s4s-close" @click="closeDate" />
      </div>
      <div
        class="s4s-mask"
        @click="closeDate"/>
    </template> -->
  </div>
</template>

<script>
import util from '../../common/util'

export default {
  props: {
    globalData: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  },
  data () {
    return {
      provice: '浙',
      carno: '',
      code: '',
      nick: '',
      phone: '',
      nickCarNo: '',
      nickCarNo2: '',
      date: '',
      ticketUrl: '',
      price: '',
      openShow: false,
      dateShow: false,
      tel: '',
      ownFree: 0,
      lateFree: 0,
      drive_no: '',
      disabled: true,
      user: {},
      noticeNum: '',
      notify: null,
      showProvice: false,
      orderNumber: '',
      selectOrderNumber: '',
      showConfirm: false,
      showNotice: true,
      showForm2: false,
      showForm1: false,
      payForm: null,
      canTryToPay: true,
      searchAgain: false
    }
  },
  computed: {
    showName () {
      let str = this.selectOrderNumber.slice(0, 2)
      if (str === '31' || str === '62') {
        return false
      } else {
        return true
      }
    },
    showDrive () {
      let str = this.selectOrderNumber.slice(0, 2)
      if (str === '54' || str === '15') {
        return true
      } else {
        return false
      }
    },
    maxtime () {
      return util.formatDateTime().slice(0, 10)
    }
  },

  watch: {
    price () {
      this.getVioFee()
    },
    date () {
      this.getVioFee()
    },
    orderNumber () {
      this.orderNumber = this.orderNumber
        .replace(/\D/g, '')
        .replace(/....(?!$)/g, '$& ')
    }
  },
  mounted () {},
  methods: {
    // 点击办理
    tryToPay () {
      if (this.showForm2) {
        // let tel = /^1\d{10}$/
        let money = /^-?\d+\.?\d{0,2}$/
        let drivenoReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        let car = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/
        if (!this.nick && this.showName) {
          util.toast('请输入当事人姓名')
          return
        }

        if (this.nickCarNo2) {
          this.nickCarNo = this.nickCarNo.toUpperCase()
        }
        if (!this.showName) {
          this.nickCarNo = this.provice + this.nickCarNo2
          if (!this.nickCarNo2) {
            util.toast('请输入车牌号码')
            return
          } else if (!car.test(this.nickCarNo)) {
            util.toast('输入车牌号码有误')
            return
          }
        }
        if (this.showDrive) {
          if (!this.drive_no) {
            util.toast('请输入驾驶证号')
            return
          } else if (!drivenoReg.test(this.drive_no)) {
            util.toast('请输入正确的驾驶证号')
            return
          }
        }
        if (!this.date) {
          util.toast('请选择认罚日期')
          return
        } else {
          let selectDate = new Date(this.date.slice(0, 10) + 'T00:00:00')
          let nowDate = new Date()
          let d = selectDate.getTime() - nowDate.getTime()
          if (d > 0) {
            util.toast('认罚日期不得大于今天')
            return
          }
        }
        if (!this.price) {
          util.toast('请输入罚款金额')
          return
        } else if (!money.test(this.price)) {
          util.toast('输入罚款金额有误')
          return
        }
        if (!this.canTryToPay) {
          util.toast('请重新输入金额或时间,需计算滞纳金及手续费')
          return
        }
        if (
          this.user.Tel + '' === '18072755357' ||
          this.user.Tel + '' === '1515802770300' ||
          this.user.Tel + '' === '13372576987'
        ) {
          this.ticketUrl =
            'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180608141025148.pic_thumb.jpg'
        }
        if (!this.ticketUrl) {
          util.toast('请上传处罚单')
          return
        }
        MIP.setData({
          '#penaltiePayData': {
            nick: this.nick || '',
            phone: this.phone || '',
            nickCarNo: this.nickCarNo || '',
            date: this.date || '',
            ticketUrl: this.ticketUrl || '',
            price: this.price || '',
            ownFree: this.ownFree || 0,
            lateFree: this.lateFree || 0,
            drive_no: this.drive_no || ''
          }
        })
      }
      if (this.showForm1) {
        MIP.setData({
          '#penaltiePayData': {
            nick: this.payForm.nick || '',
            phone: this.phone || '',
            nickCarNo: this.payForm.car_no || '',
            date: this.payForm.renfa_time || '',
            ticketUrl: this.ticketUrl || '',
            price: this.payForm.money || '',
            ownFree: this.payForm.own_free || 0,
            lateFree: this.payForm.late_free || 0,
            drive_no: this.payForm.drive_no || ''
          }
        })
      }
      if (this.canTryToPay) {
        // MIP.viewer.open("pay2.html");
        this.$refs.pay2.click()
      }
    },
    ready () {
      MIP.setData({
        '#penaltiePayData': {
          orderNumber: this.orderNumber
        }
      })
      if (this.orderNumber.length > 19 || this.orderNumber.length < 18) {
        util.toast('罚单格式错误,请重新填写（15-16位）')
        this.showNotice = true
        this.showForm2 = false
        this.showForm1 = false
        return
      }
      if (this.searchAgain) {
        this.nick = ''
        this.phone = ''
        this.nickCarNo = ''
        this.date = ''
        this.price = ''
        this.ownFree = 0
        this.lateFree = 0
        this.ticketUrl = ''
        this.drive_no = ''
        this.nickCarNo2 = ''
      }

      this.searchAgain = true
      // let self = this
      let param = {
        access_token: '3b2P0oarLbtrU/IkydUON5pfdQhGW4fWzFgFqOZZDi8=',
        document: this.orderNumber.replace(/\s/g, '')
      }
      util
        .fetchData('v3/violation/web/ticket_query', param)
        .then(res => {
          if (res.code === 0) {
            this.selectOrderNumber = this.orderNumber
            // this.$store.state.orderNumber = this.selectOrderNumber
            if (res.data.code !== 1000) {
              this.showNotice = false
              this.payForm = res.data.Violation
              this.showForm2 = true
              this.showForm1 = false
              // util.toast(res.data.msg);
            } else if (res.data.code === 1000) {
              if (res.data.Violation == null || !res.data.Violation) {
                util.toast('您的罚单已缴费，\n无需处理')
              } else if (res.data.Violation.renfa_time === '') {
                util.toast('您的罚单尚未认罚，\n请认罚后处理')
              } else {
                this.showNotice = false
                this.payForm = res.data.Violation
                this.payForm.late_free = (res.data.late_free / 100).toFixed(2)
                this.payForm.own_free = (res.data.own_free / 100).toFixed(2)
                this.showForm1 = true
                this.showForm2 = false
              }
            }
          } else if (res.code === 90011) {
            this.selectOrderNumber = this.orderNumber
            // this.$store.state.orderNumber = this.selectOrderNumber
            this.showNotice = false
            if (res.data && res.data.Violation) {
              this.payForm = res.data.Violation
            }
            this.showForm2 = true
            this.showForm1 = false
          } else {
            this.showNotice = true
            this.showForm2 = false
            this.showForm1 = false
            util.toast(res.msg)
          }
        })
        .catch(e => {
          this.showNotice = true
          this.showForm2 = false
          this.showForm1 = false
          util.toast(e)
          // 测试
        })
    },
    // 常见问题

    onStatusChange (val) {
      this.showProvice = val
    },
    onResultChange (val) {
      this.provice = val
    },
    onStatusConfirmChange (val) {
      this.showConfirm = val
    },
    onResultConfirmChange (val) {
      if (val === 'OK') {
        this.GenerateOrders()
      }
    },
    // 上传处罚单
    chooseimg () {
      this.$refs.file.click()
    },
    // 上传处罚单
    uploader () {
      let list = this.$refs.file.files
      if (list.length !== 1) {
        util.toast('最多只能选择1张处罚单。')
        return
      }
      let item = {
        name: list[0].name,
        size: list[0].size,
        file: list[0]
      }
      this.html5Reader(list[0], item, 'ticket')
    },
    // 常见问题
    gotoHelp () {
      MIP.viewer.open('help.html')
    },
    selectProvice () {
      this.showProvice = true
    },
    // 打开处罚单帮助
    openCode () {
      this.openShow = true
      this.src =
        'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/notice@3x.png'
    },
    // openDateShow () {
    //   this.dateShow = true
    // },
    // 关闭认罚日期帮助
    closeDate () {
      this.dateShow = false
    },
    closeMake () {
      this.openShow = false
    },

    getVioFee () {
      let self = this
      this.canTryToPay = false
      if (!this.price) {
        return
      }
      if (!this.date) {
        return
      }
      let param = {
        notice_num: this.orderNumber.replace(/\s/g, ''),
        fine: Number(this.price) * 100 + '',
        vio_time: this.date
      }
      util.fetchData('v3/violation/fee', param).then(res => {
        if (res.code === 20022) {
          return
        }
        if (res.code >= 40000 && res.code < 50000) {
          return
        }
        if (res.code === 0) {
          self.ownFree = Number(
            res.data.OwnFree ? (res.data.OwnFree / 100).toFixed(2) : 0
          )
          self.lateFree = Number(
            res.data.LateFree ? (res.data.LateFree / 100).toFixed(2) : 0
          )
          self.canTryToPay = true
        } else {
          util.toast(res.msg ? res.msg : '服务繁忙,请稍后再试')
          self.canTryToPay = false
          self.ownFree = 0
          self.lateFree = 0
        }
      })
    },
    html5Reader: function (file, item, name) {
      let imgSrc = new Image()
      let reader = new FileReader()
      reader.onload = e => {
        imgSrc.src = e.srcElement.result
        this.$set(item, 'src', e.srcElement.result)
        let self = this
        imgSrc.onload = function () {
          // 图片原始尺寸
          let originWidth = this.width
          let originHeight = this.height
          // 最大尺寸限制
          let maxWidth = 600
          let maxHeight = 600
          // 目标尺寸
          let targetWidth = originWidth
          let targetHeight = originHeight
          // 图片尺寸超过400x400的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth
              targetHeight = Math.round(
                maxWidth * (originHeight / originWidth)
              )
            } else {
              targetHeight = maxHeight
              targetWidth = Math.round(
                maxHeight * (originWidth / originHeight)
              )
            }
          }
          let canvas = document.getElementById('canvas')
          let context = canvas.getContext('2d')
          // canvas对图片进行缩放
          canvas.width = targetWidth
          canvas.height = targetHeight
          // 清除画布
          context.clearRect(0, 0, targetWidth, targetHeight)
          // 图片压缩
          context.drawImage(imgSrc, 0, 0, targetWidth, targetHeight)
          // canvas转为blob并上传
          canvas.toBlob(function (blob) {
            const formData = new FormData()
            formData.append('image', blob, item.name)

            util.toast('正在上传')
            fetch('https://mys4s.cn/car/upload_report_pic', {
              method: 'POST',
              body: formData
            })
              .then(res => res.json())
              .then(data => {
                if (data.code === 0) {
                  util.toast('上传成功')
                  if (name === 'ticket') {
                    self.ticketUrl = data.data
                  }
                } else {
                  util.toast(data.msg)
                }
              })
          }, file.type || 'image/png')
        }
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style scoped>
.s4s-sel-provice {
  margin-right: 0.05rem;
  font-size: 0.17rem;
  color: #333;
}
.s4s-pay-body {
  margin-top: .15rem;
  background: #fff;
  padding: .2rem .15rem 0 .15rem;
  border-radius: .04rem;
}
.s4s-group img {
  width: 0.2rem;
  height: 0.2rem;
}

.s4s-order-container {
  background-color: #fff;
  padding: 4%;
}
.s4s-order-title {
  color: #4b4b4b;
  font-size: .2rem;
}

.s4s-order-input {
  border: .01rem solid #eeeeee;
  border-radius: .04rem;
  margin-top: .15rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
}
.s4s-order-input input {
  border: none;
  height: auto;
  -webkit-box-flex: 5;
  -ms-flex: 5;
  flex: 5;
  padding: .06rem .1rem;
  font-size: .16rem;
  color:#4F7EFF;
}
.s4s-order-input span {
  color: #fff;
  -webkit-box-flex: 2;
  -ms-flex: 2;
  flex: 2;
  background: #3388ff;
  margin: 0;
  line-height: .5rem;
  text-align: center;
  background-image: linear-gradient(40deg, #ff7c00 0%, #fe5a00 100%);
}
.s4s-order-img-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.2rem 0;
  text-align: center;
}
.s4s-order-img-container mip-img + mip-img {
  margin-right: -.22rem;
  margin-left: .16rem;
}
.flex-center {
  margin-bottom: .1rem;
}
.s4s-order-content {
  font-size: .13rem;
  color: #636363;
}
.s4s-order-content span {
  text-decoration: underline;
}
.s4s-select-date {
  border: none;
  color: #666;
  -webkit-box-flex: none;
  -ms-flex: none;
  flex: none;
  background: #fff;
}

.s4s-title {
  font-size: .2rem;
  padding-bottom: .15rem;
}
.s4s-help-tip {
  float: none;
  display: inline-block;
}
.s4s-order-text {
  color: #fe7000;
  font-size: .12rem;
  margin-top: .15rem;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.s4s-order-tip-text {
  font-size: .13rem;
  color: #636363;
}
.image-container {
      height: 70px;
    width: 100%;
    overflow: hidden;
}
</style>
