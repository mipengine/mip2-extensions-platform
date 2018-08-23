<template>
  <div class="s4s-page">
    <div class="s4s-tips">
      <mip-img
        src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/car.png"
        width="60"
        height="50" />
      <div class="s4s-tips-right">
        <p>交通违法代缴的办理周期为1-2个工作日，部分地区2-5个工作日，<span style="color:#FE7000">需年检用户如需当日处理完成，请勿下单</span>。其他问题请参见
          <a
            data-type="mip"
            href="help.html"
            style="text-decoration: underline;" >常见问题</a>
          <!-- <span style="text-decoration: underline;" @click="gotoHelp">常见问题</span> -->
          。</p>
      </div>
    </div>
    <div style="display:none">
      <canvas
        id="canvas"
        width="0"
        height="0"
        style="dispaly: none"/>
    </div>

    <div class="s4s-pay-body">
      <div class="s4s-title">违章详情</div>
      <div
        v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.drive_no == 1"
        class="s4s-group">
        <span class="s4s-group-tit">驾驶证号</span>
        <input
          v-model="driveNo"
          type="idcard"
          placeholder="请输入驾驶证号码" >
      </div>
      <div
        v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.drive_file_number == 1"
        class="s4s-group">
        <span class="s4s-group-tit">驾驶证档案号</span>
        <input
          v-model="drive_file_number"
          type="idcard"
          placeholder="请输入驾驶证档案编号" >
        <span
          class="s4s-help"
          @click="openDriveFileNumber">?</span>
      </div>
      <div
        v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.drive_bar_code == 1"
        class="s4s-group">
        <span class="s4s-group-tit">行驶证条码号</span>
        <input
          v-model="drive_bar_code"
          type="idcard"
          placeholder="请输入行驶证条形码编号" >
        <span
          class="s4s-help"
          @click="openDriveBarCode">?</span>
      </div>

      <div class="s4s-group">
        <span class="s4s-group-tit">手机号码</span>
        <input
          v-model="phone"
          type="text"
          maxlength="11"
          style="width:auto;max-width:3rem;min-width:1.05rem"
          placeholder="请输入手机号码接收订单状态" >

      </div>
      <div class="s4s-group">
        <span class="s4s-group-tit" >验证码</span>
        <input
          v-model="code"
          type="text"
          maxlength="4"
          placeholder="请输入短信验证码" >
        <span
          v-show="!cansend"
          type="button"
          class="code-btn-disable"
          disabled>{{ btntext }}</span>
        <span
          v-show="cansend"
          type="button"
          class="code-btn"
          @click="sendcode">获取验证码</span>
      </div>
      <!-- <div class="s4s-group"  v-if="!(!this.user.Tel || !refillTel)">
                    <span class="s4s-group-tit" >手机号码</span>
                    <span class="s4s-group-tit" style="width:auto;"  >{{this.phone ? this.phone : (this.user.Tel || '-')}}</span>
                    <span @click="refillTelClick" style="color:#108ee9;margin-left:.05rem;font-size:0.14rem">更换</span>
                </div> -->
      <div class="s4s-group">
        <span class="s4s-group-tit">车牌号码</span>
        <span
          class="s4s-group-txt"
          style="color:#333">{{ illegal.car_no||illegal.CarNo }}</span>
      </div>
      <div class="s4s-group">
        <span class="s4s-group-tit">认罚日期</span>
        <span
          class="s4s-group-txt"
          style="color:#333">{{ date }}</span>
      </div>
      <div
        v-if="(illegal.FreeRuleObject && illegal.FreeRuleObject.drive_licence == 1) || (illegal.FreeRuleObject && illegal.FreeRuleObject.travel_licence == 1)"
        class="s4s-group group-upload">
        <span
          class="s4s-group-tit"
          style="padding-top:0"
        >上传行驶证</span>
        <div style="display: flex;flex:1;">
          <template v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.drive_licence == 1">
            <div
              class="group-upload-margin"
              @click="chooseImage" >
              <!-- <span class="s4s-chooseimg">正面</span> -->
              <mip-img
                :src="driveUrl || 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/upload.png'"
                styel="width:100%;" />
              <input
                ref="file"
                type="file"
                accept="image/*"
                multiple="multiple"
                style="display: none;"
                @change="uploader">
            </div>
          </template>
          <template v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.travel_licence == 1">
            <div
              class="group-upload-margin"
              @click="chooseTravel" >
              <!-- <span class="s4s-chooseimg" style="margin-left: .2rem;">反面</span> -->
              <mip-img
                :src="travelUrl || 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/upload2.png'"
                styel="width:100%;" />
              <input
                ref="XSZTravel"
                type="file"
                accept="image/*"
                multiple="multiple"
                style="display: none;"
                @change="uploaderXSZTravel">
            </div>
          </template>
          <span
            class="s4s-help"
            style="margin-top: 0.025rem;"
            @click="openDriveFile">?</span>
        </div>
      </div>
      <div
        v-if="(illegal.FreeRuleObject && illegal.FreeRuleObject.jsz_drive_licence == 1) || (illegal.FreeRuleObject && illegal.FreeRuleObject.jsz_travel_licence == 1)"
        class="s4s-group">
        <span
          class="s4s-group-tit"
          style="padding-top:0">上传驾驶证</span>
        <div style="display: flex;flex:1;">
          <template
            v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.jsz_drive_licence == 1"
          >
            <mip-img
              v-if="JSZDriveUrl"
              :src="JSZDriveUrl"
              style="width: .40rem;height: .40rem;margin: .05rem 0;"
              @click="chooseJSZDrive" />
            <div
              v-show="!JSZDriveUrl"
              class="group-upload-margin"
              @click="chooseJSZDrive">
              <mip-img
                :src="driveUrl||'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/upload.png'"
                styel="width:100%;" />
              <input
                ref="JSZDrive"
                type="file"
                accept="image/*"
                multiple="multiple"
                style="display: none;"
                @change="uploaderJSZDrive">
            </div>
          </template>
          <template
            v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.jsz_travel_licence == 1"
          >
            <mip-img
              v-if="JSZTravelUrl"
              :src="JSZTravelUrl"
              style="width: .40rem;height: .40rem;margin: .05rem 0 .05rem .10rem;"
              @click="chooseJSZTravel" />
            <div
              v-show="!JSZTravelUrl"
              class="group-upload-margin"
              @click="chooseJSZTravel">
              <mip-img
                :src="travelUrl||'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/upload2.png'"
                styel="width:100%;"
              />
              <input
                ref="JSZTravel"
                type="file"
                accept="image/*"
                multiple="multiple"
                style="display: none;"
                @change="uploaderJSZTravel">
            </div>
          </template>
          <span
            class="s4s-help"
            @click="openDriverFile">?</span>
        </div>
      </div>
    </div>
    <div class="s4s-pay-body">
      <div class="s4s-title">订单详情</div>
      <div class="s4s-group"><span class="s4s-group-tit">罚款金额</span><span
        class="s4s-group-txt"
        style="color:#333">¥ {{ price || 0 }}</span>
      </div>
      <div class="s4s-group">
        <span class="s4s-group-tit">服务费用</span><span
          class="s4s-group-txt"
          style="color:#FE7000">¥ {{ ownFree || 0 }}</span>
      </div>
    </div>

    <!-- <div class="s4s-sum"> 服务费:  -->
    <!-- <span style="text-decoration:line-through;" v-if="price"> {{ ownFree + 5 || 5 }}</span> -->
    <!-- <span> ¥ {{ ownFree || 0 }}</span> -->
    <!-- <span style="width:auto;color:#959595;font-size:0.12rem;margin-left:0.10rem" v-if="price">已优惠5元</span> -->
    <!-- </div> -->
    <a
      ref="newWeb"
      href="#"/>
    <div class="agree-container" >
      <p><mip-img
        v-show="!agree"
        src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/disagree.png"
        width="22"
        height="22"
        @click="goAgree" />
        <mip-img
          v-show="agree"
          src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree.png"
          width="22"
          height="22"
          @click="goAgree" />
        我同意
        <a
          data-type="mip"
          href="agreement.html"
          style="color: #666666;text-decoration:underline" >《服务协议》</a>
        <!-- <span style="color: #666666;text-decoration:underline" @click="gotoAgreement">《服务协议》</span> -->
        中的说明</p>
    </div>
    <!-- <button class="s4s-btn" v-if="(!user.Tel || refillTel)" @click="payFee"> 支付金额{{ (((price * 100 + ownFree * 100 + lateFree * 100) || 0) / 100).toFixed(2) }}元 | 立即办理 </button> -->
    <div style="height:.6rem;"/>
    <mip-fixed type="bottom">
      <div class="pay-contaienr">
        <div class="pay-contaienr-first">
          <p class="pay-contaienr-p1">合计金额：<span class="pay-contaienr-num">¥ {{ (((price * 100 + ownFree * 100 + lateFree * 100) || 0) / 100).toFixed(2) }}</span></p>
          <p class="pay-contaienr-p2" >预计1-5个工作日办理完成 </p>
        </div>
        <div
          id="pay1btn"
          :class="agree?'pay-contaienr-last' :'pay-contaienr-last disabled-btn'"
          on="tap:pay1.pay1event"
        >
          立即办理
        </div>
      </div>
    </mip-fixed>
    <mip-fixed type="top">
      <div
        v-if="detail"
        class="s4s-mask"
        @click="closeMake">
        <mip-img
          :src="src"
          :height="height||293"
          layout="responsive"
          width="350" />
      </div>
    </mip-fixed>
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
      id: 0,
      carno: '',
      date: '',
      phone: '',
      price: 0,
      ownFree: 0,
      lateFree: 0,
      illegal: {},
      driveUrl: '',
      travelUrl: '',
      user: {},
      tel: '',
      JSZTravelUrl: '',
      JSZDriveUrl: '',
      notify: null,
      showConfirm: false,
      timer: null,
      out_trade_no: '',
      paysrc: '',
      showpay: false,
      system: {},
      payType: 'alipay',
      drive_bar_code: '',
      drive_file_number: '',
      agree: true,
      btntext: '获取验证码',
      cansend: true,
      code: '',
      isTrueCode: false,
      detail: false,
      src: '',
      height: ''
    }
  },
  prerenderAllowed () {
    return true
  },
  watch: {
    code (val) {
      let tel = /^1\d{10}$/
      if (!this.cansend && val.length === 4 && tel.test(this.phone)) {
        this.testCode()
      }
    }
  },
  mounted () {
    MIP.viewer.fixedElement.init()
    let me = this
    this.$on('pay1event', event => {
      console.log('pay1event')
      me.payFee()
    })
    if (this.globalData && this.globalData.Fine) {
      try {
        window.localStorage.setItem(
          'pay1Data',
          JSON.stringify(this.globalData)
        )
      } catch (error) {
        util.toast('由于您处在无痕模式，不能存储您当前的记录')
      }
    } else {
      try {
        let globalData = window.localStorage.getItem('pay1Data')
        if (globalData && JSON.parse(globalData)) {
          this.globalData = JSON.parse(globalData)
        }
      } catch (error) {
        util.toast('由于您处在无痕模式，不能载入您之前输入的记录')
      }
    }

    this.illegal = this.globalData
    console.log(this.globalData)
    this.price = this.globalData.Fine
    this.date =
      this.globalData.OccTime && this.globalData.OccTime.substring(0, 10)
    this.getNotify()
    this.getVipFee()
  },
  methods: {
    closeMake () {
      this.detail = false
    },
    openDriveFile () {
      this.detail = true
      this.height = 480
      this.src =
        'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/driveFile.png'
    },
    openDriverFile () {
      this.detail = true
      this.height = 480
      this.src =
        'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/driverFile.png'
    },
    openDriveFileNumber () {
      this.detail = true
      this.height = 240
      this.src =
        'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/driveFileNumber.png'
    },
    openDriveBarCode () {
      this.detail = true
      this.height = 240
      this.src =
        'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/driveBarCode.png'
    },
    testCode () {
      util
        .fetchData('v5/user/login', {
          tel: this.phone,
          code: this.code,
          no_token: true
        })
        .then(res => {
          if (res.code === 0) {
            this.isTrueCode = true
            util.toast('验证成功')
          } else {
            util.toast(res.msg)
          }
        })
    },
    sendcode () {
      let tel = /^1\d{10}$/
      if (!this.phone) {
        util.toast('请输入手机号码')
        return
      } else if (!tel.test(this.phone)) {
        util.toast('输入手机号码有误')
        return
      }
      this.cansend = false
      this.leftTime = 60
      this.btntext = this.leftTime + 's后重发'
      this.timer = setInterval(this.enableResend, 1000)
      util
        .fetchData('v5/user/code', { tel: this.phone })
        .then(res => {
          if (res.code === 0) {
            util.toast('发送成功')
          } else {
            util.toast(res.msg)
          }
        })
        .catch(function (e, xhr, response) {
          util.toast('发送验证码失败，请重试')
          clearInterval(this.timer)
          this.cansend = true
          this.btn = true
        })
    },
    enableResend () {
      this.btntext = this.leftTime-- + 's后重发'
      if (this.leftTime === 0) {
        this.cansend = true
        clearInterval(this.timer)
        this.btntext = '发送验证码'
      }
    },
    // 常见问题
    gotoHelp () {
      MIP.viewer.open('help.html')
    },
    goAgree () {
      this.agree = !this.agree
    },
    // 服务协议
    gotoAgreement () {
      MIP.viewer.open('agreement.html')
    },
    // 上传行驶证正面
    chooseImage () {
      this.$refs.file.click()
    },
    // 上传行驶证反面
    chooseTravel () {
      this.$refs.XSZTravel.click()
    },
    // 上传驾驶证正面
    chooseJSZDrive () {
      this.$refs.JSZDrive.click()
    },
    // 上传驾驶证正面
    chooseJSZTravel () {
      this.$refs.JSZTravel.click()
    },
    // 上传行驶证正面照
    uploader () {
      let list = this.$refs.file.files
      if (list.length !== 1) {
        util.toast('最多只能选择1张行驶证。')
      }

      let item = {
        name: list[0].name,
        size: list[0].size,
        file: list[0]
      }
      // fix canvas bug
      this.html5Reader(list[0], item, 'driveUrl')
    },
    // 上传行驶证正面照
    uploaderXSZTravel () {
      let list = this.$refs.XSZTravel.files
      if (list.length !== 1) {
        util.toast('最多只能选择1张行驶证。')
        return
      }

      let item = {
        name: list[0].name,
        size: list[0].size,
        file: list[0]
      }
      this.html5Reader(list[0], item, 'travelUrl')
    },
    // 上传驾驶证正面照
    uploaderJSZDrive () {
      let list = this.$refs.JSZDrive.files
      if (list.length !== 1) {
        util.toast('最多只能选择1张驾驶证。')
        return
      }

      let item = {
        name: list[0].name,
        size: list[0].size,
        file: list[0]
      }
      this.html5Reader(list[0], item, 'JSZDrive')
    },
    // 上传驾驶证正面照
    uploaderJSZTravel () {
      let list = this.$refs.JSZTravel.files
      if (list.length !== 1) {
        util.toast('最多只能选择1张驾驶证。')
        return
      }

      let item = {
        name: list[0].name,
        size: list[0].size,
        file: list[0]
      }
      this.html5Reader(list[0], item, 'JSZTravel')
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
          let data = canvas.toDataURL('image/jpeg').split(',')[1]
          // 获取base64图片大小，返回MB数字
          let size = parseInt(data.length - data.length / 8 * 2)
          console.log(size)
          if (size) {
            const isLt2M = size / 1024 / 1024 < 2
            if (!isLt2M) {
              util.toast('图片大小需要小于 2MB!')
              return
            }
            util.toast('正在上传')
            self.uploadBase64(data, name)
          }

          // canvas转为blob并上传
          // canvas.toBlob(function (blob) {
          //    var b = {
          //         file: blob,
          //         name: item.name,
          //         size: blob.size,
          //         src: imgSrc.src
          //     }
          // const formData = new FormData()
          // formData.append('image', blob, item.name)

          // const formData = new FormData();
          // formData.append("image", file);

          // util.toast('正在上传')

          // fetch('https://mys4s.cn/car/upload_report_pic', {
          //   method: 'POST',
          //   body: formData
          // })
          //   .then(res => res.json())
          //   .then(data => {
          //     if (data.code === 0) {
          //       util.toast('上传成功')
          //       if (name === 'ticket') {
          //         self.ticketUrl = data.data
          //       } else if (name === 'JSZTravel') {
          //         self.JSZTravelUrl = data.data
          //       } else if (name === 'JSZDrive') {
          //         self.JSZDriveUrl = data.data
          //       } else if (name === 'travelUrl') {
          //         self.travelUrl = data.data
          //       } else if (name === 'driveUrl') {
          //         self.driveUrl = data.data
          //       }
          //     } else {
          //       util.toast(data.msg)
          //     }
          //   })
          // }, file.type || 'image/png')
        }
      }
      reader.readAsDataURL(file)
    },
    uploadBase64 (data, name) {
      let self = this
      util
        .fetchData('v3/violation/image/upload', {
          imageString: data
        })
        .then(data => {
          if (data.code === 0) {
            util.toast('上传成功')
            if (name === 'ticket') {
              self.ticketUrl = data.data
            } else if (name === 'JSZTravel') {
              self.JSZTravelUrl = data.data
            } else if (name === 'JSZDrive') {
              self.JSZDriveUrl = data.data
            } else if (name === 'travelUrl') {
              self.travelUrl = data.data
            } else if (name === 'driveUrl') {
              self.driveUrl = data.data
            }
          } else {
            util.toast(data.msg)
          }
        })
    },
    // 支付
    payFee () {
      if (!this.agree) {
        return
      }
      let drivenoReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      let telReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
      if (!this.user.Tel) {
        if (!telReg.test(this.phone)) {
          util.toast('请输入正确的手机号码')
          return
        }
      }
      if (!this.isTrueCode) {
        util.toast('手机号码未验证')
        return
      }
      if (
        this.user.Tel + '' === '18072755357' ||
        this.user.Tel + '' === '1515802770300' ||
        this.user.Tel + '' === '13372576987'
      ) {
        this.driveUrl =
          'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180608141025148.pic_thumb.jpg'
        this.travelUrl =
          'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180608141025148.pic_thumb.jpg'
        this.JSZDriveUrl =
          'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180608141025148.pic_thumb.jpg'
        this.JSZTravelUrl =
          'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180608141025148.pic_thumb.jpg'
      }
      if (
        this.illegal.FreeRuleObject &&
        this.illegal.FreeRuleObject.drive_no === 1
      ) {
        if (!this.driveNo) {
          util.toast('请输入驾驶证号')
          return
        } else if (!drivenoReg.test(this.driveNo)) {
          util.toast('请输入正确的驾驶证号')
          return
        }
      }
      if (
        this.illegal.FreeRuleObject &&
        this.illegal.FreeRuleObject.drive_file_number === 1
      ) {
        if (!this.drive_file_number) {
          util.toast('请输入驾驶证档案编号')
          return
        }
      }
      if (
        this.illegal.FreeRuleObject &&
        this.illegal.FreeRuleObject.drive_bar_code === 1
      ) {
        if (!this.drive_bar_code) {
          util.toast('请输入驾驶证条形码编号')
          return
        }
      }
      if (
        this.illegal.FreeRuleObject &&
        this.illegal.FreeRuleObject.drive_licence === 1
      ) {
        if (!this.driveUrl) {
          util.toast('请先上传行驶证正面照')
          return
        }
      }
      if (
        this.illegal.FreeRuleObject &&
        this.illegal.FreeRuleObject.travel_licence === 1
      ) {
        if (!this.travelUrl) {
          util.toast('请先上传行驶证反面照')
          return
        }
      }
      if (
        this.illegal.FreeRuleObject &&
        this.illegal.FreeRuleObject.jsz_drive_licence === 1
      ) {
        if (!this.JSZDriveUrl) {
          util.toast('请先上传驾驶证正面照')
          return
        }
      }
      if (
        this.illegal.FreeRuleObject &&
        this.illegal.FreeRuleObject.jsz_travel_licence === 1
      ) {
        if (!this.JSZTravelUrl) {
          util.toast('请先上传驾驶证反面照')
          return
        }
      }
      if (this.notify && this.notify.status) {
        this.showConfirm = true
      } else {
        let price = Number(this.price * 100)
        let totalPrice = Number(
          price +
            Math.round(this.ownFree * 100) +
            Math.round(this.lateFree * 100)
        )
        let param = {
          source: 'xzapp',
          fine: price + '', // 罚金
          lateFree: (this.lateFree ? Math.round(this.lateFree * 100) : 0) + '',
          ownFree: Math.round(this.ownFree * 100) + '', // 服务费
          totalPrice: totalPrice + '', // 总金额
          vio_time: this.date, // 文章时间：格式：2017-12-13
          carno: this.illegal.car_no || this.illegal.CarNo || '',
          vio_id: this.illegal.ViolationId || '',
          mobile: this.phone + '',
          drive_no: this.driveNo || '', // 驾驶证号
          drive_url: this.driveUrl || '', // 行驶证正面
          travel_url: this.travelUrl || '', // 行驶证反面
          jsz_drive_url: this.JSZDriveUrl || '', // 驾驶证正面
          jsz_travel_url: this.JSZTravelUrl || '', // 驾驶证反面
          vin: this.illegal.vin || '',
          engion: this.illegal.engine || this.illegal.engion || '',
          drive_bar_code: this.drive_bar_code || '',
          drive_file_number: this.drive_file_number || ''
        }
        if (
          !window.localStorage.getItem(
            'mip-login-xzh:sessionId:https://mys4s.cn/v3/nc/auth?source=xzapp'
          )
        ) {
          util.toast('未授权百度账号')
          return
        }
        util.fetchData('v3/violation/web/order/create', param).then(res => {
          if (res.code === 0) {
            MIP.setData({
              payConfig: {
                fee: totalPrice / 100,
                sessionId: window.localStorage.getItem(
                  'mip-login-xzh:sessionId:https://mys4s.cn/v3/nc/auth?source=xzapp'
                ),
                postData: {
                  order_id: res.data + ''
                },
                redirectUrl:
                  'https://mys4s.cn/static/vio/xz/success.html?orderId=' +
                  res.data
              }
            })
            this.$emit('canpay', {})
          } else {
            util.toast(res.msg)
          }
        })
      }
    },
    // 获取公告
    getNotify () {
      let self = this
      util.fetchData('v2/car/vio_notify').then(res => {
        if (res.code === 0) {
          self.notify = res.data
          // self.notify = {
          //     notify: '测试',
          //     status: true
          // }
        }
      })
    },
    getVipFee () {
      let self = this
      util
        .fetchData('v3/violation/fee', {
          vio_id: this.illegal.ViolationId,
          car_no: this.illegal.car_no || this.illegal.CarNo,
          fine: Number(this.price * 100) + ''
        })
        .then(res => {
          if (res.code === 0) {
            self.lateFree = res.data.LateFree
              ? Number((res.data.LateFree / 100).toFixed(2))
              : 0
            self.ownFree = res.data.OwnFree
              ? Number((res.data.OwnFree / 100).toFixed(2))
              : 0
          }
        })
    }
  }
}
</script>

<style scoped>
.s4s-tips {
  background: #fff;
  border-radius: 0.07rem;
  padding: 0.2rem;
  font-size: 0.12rem;
  color: #4b4b4b;
  display: flex;
  align-items: center;
}

.s4s-tips-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 0.15rem;
  line-height: 0.2rem;
}

.s4s-pay-body {
  background: #fff;
  padding: 0 4%;
  margin-top: 0.15rem;
}

.s4s-group img {
  width: 0.2rem;
}

.s4s-sum {
  margin: 0.2rem 0.1rem 0 0.1rem;
  -webkit-box-flex: 1;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  -ms-box-flex: 1;
  align-items: center;
  text-align: left;
  font-size: 0.13rem;
  color: #4b4b4b;
}

.s4s-sum span {
  color: #f40;
  padding-right: 0.05rem;
}

.s4s-chooseimg {
  padding: 0.02rem 0.04rem;
  color: #0086c6;
  font-size: 0.16rem;
  float: right;
}

.s4s-group {
  position: relative;
  line-height: 0.15rem;
  border-bottom: 0.01rem #eaeaea solid;
  color: #666;
  overflow: hidden;
  align-items: center;
  display: flex;
  padding: 0.15rem 0;
  box-sizing: content-box;
}
.s4s-group-tit {
  font-size: 0.15rem;
  width: 1rem;
  line-height: 0.25rem;
  padding-top: 0.025rem;
}
.s4s-group-txt {
  font-size: 0.15rem;
  color: #777;
  text-align: right;
}
.s4s-group input {
  border: none;
  font-size: 0.15rem;
  text-align: left;
  line-height: 0.25rem;
  flex: 1;
}
select {
  font-size: 0.15rem;
}
.s4s-group input:focus,
.s4s-group select:focus {
  border: none;
  outline: none;
  padding: 0;
}
.s4s-group:last-child {
  border: none;
}

.s4s-title {
  font-size: 0.2rem;
  /* padding: .15rem; */
  padding-top: 0.25rem;
  font-weight: bold;
}
.agree-container {
  font-size: 0.15rem;
  color: #999999;
}
.agree-container p {
  padding: 0.15rem;
}
.agree-container mip-img {
  vertical-align: bottom;
  margin-right: 0.12rem;
}

.group-upload {
  align-items: end;
  height: auto;
}
.group-upload-margin {
  margin: 0.025rem 0.1rem 0.025rem 0;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
}
.code-btn,
.code-btn-disable {
  color: #fe5c00;
  background-color: #fff;
  border: 0;
  border-radius: 0.03rem;
  font-size: 0.14rem;
  border: 0.01rem solid #ff7b00;
  padding: 0.05rem 0.075rem;
  line-height: 0.2rem;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -0.15rem;
}
.code-btn-disable {
  opacity: 0.5;
}

.pay-contaienr {
  display: flex;
  width: 100%;
  background: #fff;
}

.pay-contaienr-first {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  font-size: 0.16rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 0.1rem;
}

.pay-contaienr-num {
  color: #fe7000;
  font-size: 0.2rem;
  font-weight: bold;
}

.pay-contaienr-p1 {
  color: #000;
  font-size: 0.17rem;
}
.pay-contaienr-p2 {
  color: #999;
  font-size: 0.11rem;
}

.pay-contaienr-last {
  width: 1.2rem;
  background-image: linear-gradient(40deg, #ff7c00 0%, #fe5a00 100%);
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.18rem;
  font-weight: 300;
  color: #fff;
}

.disabled-btn {
  color: #999;
  background: #e6e6e6 !important;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #ccc;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #ccc;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #ccc;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #ccc;
}
.s4s-help {
  border-radius: 50%;
  border: 0.02rem solid #fe7000;
  color: #fe7000;
  font-size: 0.13rem;
  height: 0.2rem;
  min-width: 0.2rem;
  line-height: 0.18rem;
  text-align: center;
  font-weight: bold;
}
.s4s-mask {
  height: 100vh;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.3);
}

.s4s-mask mip-img {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  width: calc(100% - 0.3rem);
}
</style>
