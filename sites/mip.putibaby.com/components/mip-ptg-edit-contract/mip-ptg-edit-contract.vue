
<template>
  <div class="root">
    <mip-form
      class="root"
      method="get"
      url="https://www.mipengine.org?we=123">

      <div class="yifang">
        <mip-img
          :src="master.header.small"
          layout="responsive"
          width="65"
          height="65"
          class="mama_header"/>
        <div class="">
          <div class="mama_name">乙方
            <span class="mama_info_span">{{ master.name }}</span>
          </div>
          <div class="mama_phone">电话
            <span class="mama_info_span">
              <a href="tel:400-618-8835">{{ master.phone_number }}</a>
            </span>
          </div>
          <div class="mama_id_card">身份证
            <span class="mama_info_span">{{ master.id_card }}
            </span>
          </div>
        </div>
      </div>

      <div class="bingfang">
        <mip-img
          layout="responsive"
          width="65"
          height="65"
          class="mama_header"
          src="https://mip.putibaby.com/i/logo.png"/>
        <div class="mama_name_b">丙方
          <span class="mama_info_span">天津菩提果科技有限公司</span>
        </div>
        <div class="mama_phone_b">电话
          <span class="mama_info_span">
            <a href="tel:400-618-8835">400-618-8835</a>
          </span>
        </div>
      </div>

      <div class="jiafang">
        <div class="sub_head">
          <p>甲方（我的）信息</p>
        </div>
        <div class="row">
          <div class="left">真实姓名</div>
          <div class="right">
            <input
              v-model="contract_mama_name"
              :readOnly="rea"
              class="input"
              type="text"
              name="username"
              validatetarget="username"
              validatetype="must"
              placeholder="中文姓名"
              @input="contract_mama_name_change_"
              @change="contract_mama_name_change_">
            <div target="username">姓名不符合规范</div>
          </div>
        </div>
        <div class="line"/>
        <div class="row">
          <div class="left">手机号码</div>
          <div class="right">
            <input
              v-model="contract_mama_phone_number"
              :readOnly="rea"
              class="input"
              type="number"
              name="phone_number"
              validatetarget="phone_number"
              validatetype="must"
              placeholder="手机号码"
              @input="contract_mama_phone_number_change_"
              @change="contract_mama_phone_number_change_">
            <div target="phone_number">手机号码错误</div>
          </div>
        </div>
        <div class="line"/>
        <div class="row">
          <div class="left">身份证号</div>
          <div class="right">
            <input
              v-model="contract_mama_id_card"
              :readOnly="rea"
              class="input"
              type="number"
              name="identity"
              validatetarget="identity"
              validatetype="must"
              placeholder="身份证号码"
              @input="contract_mama_id_card_change_"
              @change="contract_mama_id_card_change_">
            <div target="identity">身份证号码错误</div>
          </div>
        </div>
        <div class="line"/>

        <div class="row_photo">
          <div>
            <input
              id="fz"
              :disabled="rea"
              type="file"
              accept="image/*"
              class="uploadfile"
              name="f"
              display="none"
              @change="changeZ" >
            <mip-img
              class="id_photo_z"
              src="https://mip.putibaby.com/i/camera_.png"
              @click="fileSelectZ"/>
            <mip-img
              :class="{'show_opacity':show_z}"
              class="id_photo_zz"
              src="https://mip.putibaby.com/i/id_card_z.png"/>
            <mip-img
              :src="contract_mama_id_card_zheng"
              :class="{'show_zheng':show_z}"
              class="id_photo"/>
            <span>身份证正面</span>

          </div>
        </div>

        <div class="row_photo">
          <div>
            <input
              id="ff"
              :disabled="rea"
              type="file"
              class="uploadfile"
              name="f"
              display="none"
              @change="changeF" >

            <mip-img
              class="id_photo_f"
              src="https://mip.putibaby.com/i/camera_.png"
              @click="fileSelectF"/>
            <mip-img
              :class="{'show_opacity':show_f}"
              class="id_photo_ff"
              src="https://mip.putibaby.com/i/id_card_f.png"/>
            <mip-img
              :src="contract_mama_id_card_fan"
              :class="{'show_fan':show_f}"
              class="id_photo"/>
            <span>身份证反面</span>
          </div>
        </div>
      </div>
      <div class="shanghu_info">
        <div class=" shanghu_i">
          <p>上户信息</p>
        </div>
        <div class="row">
          <div class="left">服务时间</div>
          <div class="right">
            <div class="quantian">
              <div
                :class="{'checked' : contract_is_offer_allday_ser , 'unchecked' : !contract_is_offer_allday_ser }"
                @click="quantianChecked"/>
              <input
                :checked="contract_is_offer_allday_service"
                v-model="contract_is_offer_allday_service"
                :disabled="rea"
                type="radio"
                name="service_time"
                value="true"
                @change="contract_is_offer_allday_service_change_" > 全天
            </div>
            <div class="baiban">
              <div
                :class="{'checked' : !contract_is_offer_allday_ser , 'unchecked' : contract_is_offer_allday_ser }"
                @click="baibanChecked"/>
              <input
                :checked="!contract_is_offer_allday_service"
                v-model="contract_is_offer_allday_service"
                :disabled="rea"
                type="radio"
                name="service_time"
                value="false"
                @change="contract_is_offer_allday_service_change_"> 白班
            </div>
          </div>
        </div>
        <div class="line"/>
        <div class="row">
          <div class="left">上户日期</div>
          <div class="right">
            <input
              v-model="contract_shanghu_at"
              :readOnly="rea"
              class="input_date"
              type="date"
              value=""
              placeholder="请选择月份/年份"
              @change="contract_shanghu_at_change_" >
          </div>
        </div>
        <div class="line"/>
        <div class="row">
          <div class="left">上户时长</div>
          <div class="right">
            <input
              v-model="contract_shanghu_length"
              :readOnly="rea"
              class="input_sc"
              type="number"
              value=""
              @input="contract_shanghu_length_change_"
              @change="contract_shanghu_length_change_">天
          </div>
        </div>
        <div class="line"/>
        <div class="row">
          <div class="left">26天薪资</div>
          <div class="right">
            <p>{{ contract_master_price }}</p> 元
          </div>
        </div>
        <div class="line"/>
        <div class="row">
          <div class="left">总金额</div>
          <div class="right">
            <p>{{ contract_price }}</p> 元
          </div>
        </div>
        <div class="line"/>
        <div class="row">
          <div class="left">支付方式</div>
          <div class="right zhifufangshi">
            两次支付(定金, 尾款)
          </div>
        </div>
        <div class="line"/>
        <div class="row">
          <div class="left">定金</div>
          <div class="right">
            <p>{{ contract_deposit }}</p> 元
          </div>
        </div>
      </div>

      <div class="other_info">
        <a
          :href="to_contract_skill_req"
          mip-link>
          <div class="row">
            <div class="left">服务项目</div>
            <div class="extra_text">
              <p>已选
                <span class="extra_i">{{ contract_skill_req }}
                </span> 项
              </p>
            </div>
            <mip-img
              layout="responsive"
              width="16"
              height="16"
              class="jt"
              src="i/contract_jt.png"/>
          </div>
        </a>
        <div class="line"/>
        <a
          :href="to_contract_extra"
          mip-link>
          <div class="row">
            <div class="left">补充条款</div>
            <div
              class="extra_text"/>
            <mip-img
              layout="responsive"
              width="16"
              height="16"
              class="jt"
              src="i/contract_jt.png"/>
          </div>
        </a>
        <div class="line"/>
        <div class="row">
          <div class="left">上户地点</div>
          <div class="right">
            <textarea
              v-model="contract_location"
              :readOnly="rea"
              class="input_address"
              type="text"
              value=""
              placeholder="请输入上户的详细地址"
              @input="contract_location_change_"
              @change="contract_location_change_"/>
          </div>
        </div>
      </div>

      <div class="contract_info">
        <div class="sub_head">
          <p>合同信息</p>
        </div>
        <div
          class="contract_row"
          @click="contractDetail">
          <span>《菩提果母婴护理服务合同》</span>
          <div class="extra_text_xx">详细</div>
          <mip-img
            layout="responsive"
            width="16"
            height="16"
            class="jt_xx"
            src="i/contract_jt.png"/>
        </div>
      </div>
      <div
        v-show="err"
        class="err">
        {{ err_message }}
      </div>
      <div class="submit">
        <input
          v-show="!rea"
          class="btn"
          type="submit"
          value="提交"
          @click="handleSubmit_({},false)" >
      </div>
    </mip-form>
  </div>
</template>
<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}

* {
  margin: 0px;
  padding: 0px;
}

p {
  margin: 0px;
  padding: 0px;
  font-family: '黑体';
}

.root {
  background: #f4f4f4;
  padding-bottom: 30px;
  color: #666;
  font-size: 14px;
}

.yifang {
  width: 100%;
  height: 88px;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  margin-bottom: 10px;
}

.bingfang {
  width: 100%;
  height: 90px;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
}

.jiafang {
  width: 100%;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  height: 345px;
}

.mama_info {
  background: #fff;
  position: relative;
  height: 85px;
  color: #666;
  margin-bottom: 10px;
  font-size: 15px;
}

.mama_info_span {
  position: absolute;
  left: 52px;
  top: 1px;
  width: 170px;
  color: #333;

}

.mama_header {
  height: 65px;
  width: 65px;
  position: absolute;
  top: 10px;
  left: 15px;
  border-radius: 5px;
}

.mama_name {
  position: absolute;
  left: 95px;
  top: 10px;
  color: #333;
}

.mama_phone {
  position: absolute;
  left: 95px;
  top: 35px;
  color: #333;
}

.mama_phone_a {
  text-decoration: none;
  color: #666;
}

.mama_id_card {
  position: absolute;
  left: 95px;
  top: 60px;
  color: #333;
}

.mama_name_b {
  position: absolute;
  left: 95px;
  top: 20px;
  color: #333;
}

.mama_phone_b {
  position: absolute;
  left: 95px;
  top: 45px;
  color: #333;
}

.ptg_info {
  background: #fff;
  margin-bottom: 10px;
  padding: 10px 0 10px 10px;
}

.shanghu_info {
  margin-bottom: 10px;
  background: #fff;
  /* position: relative; */
}

.other_info {
  background: #fff;
  position: relative;
  width: 100%;
  margin: 10px auto 0;
}

.row {
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  position: relative;
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  font-size: 14px;
}

.row_address {
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  position: relative;
  padding-left: 10px;
  height: 70px;
  line-height: 40px;
  overflow: hidden;
  font-size: 15px;
}

.row .left {
  position: absolute;
  display: inline-block;
  width: 105px;
  float: left;
  clear: left;
  color: #666;
  left: 15px;
}

.left_address {
  width: 80px;
  float: left;
  clear: left;
  line-height: 0px;
}

.row .right {
  position: absolute;
  float: left;
  display: inline-block;
  left: 120px;
  color: #999;
}

.contract_info {
  margin-bottom: 13px;
  position: relative;
  height: 100px;
}

.sub_head {
  line-height: 54px;
  color: #999;
  height: 44px;
  background: #f4f4f4;
  position: relative;
  top: 0;
}

.sub_head p {
  position: absolute;
  left: 15px;
}

.contract_row {
  background: #fff;
  cursor: pointer;
  position: relative;
  padding-left: 5px;
  height: 44px;
  line-height: 44px;
  overflow: hidden;
  font-size: 15px;
}

.contract_row span {
  position: absolute;
  left: 10px;
}

.jt {
  width: 8px;
  height: 13px;
  position: absolute;
  right: 15px;
  top: 16px;
  color: #999;
}

.jt_xx {
  width: 8px;
  height: 13px;
  position: absolute;
  right: 14px;
  top: 16px;
}

.btns {
  margin-top: 10px;
}

.submit {
  margin: 0 auto;
}

.btn {
  -webkit-appearance: none;
  background: #afd03b;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  width: 89.3%;
  height: 47px;
  position: relative;
  border-style: none;
  margin: 0 auto;
  left: 50%;
  margin-left: -44.65%;

}

.btn2 {
  background: #fff;
  color: #333;
  width: 200px;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px auto 10px auto;
  text-align: center;
}

.clear {
  clear: both;
}

.input {
  border: none;
  width: 150px;
  font-size: 14px;
  height: 24px;
  display: inline-block;
  color: #999;

}

.input_sc {
  border: none;
  width: 74px;
  font-size: 14px;
  color: #999;
}

.input_date {
  -webkit-appearance: none;
  border: 1px solid #e5e5e5;
  width: 130px;
  height: 30px;
  font-size: 15px;
  background-size: 0;
  font-family: Arial;
  color: #999;
  position: absolute;
  top: 6px;
  background: #fff;
  border-radius: 3px;
  padding-left: 5px;

}

.inputReadOnly {
  border: 0;
  width: 70px;
  color: #b2b2b2;

}

.input_address {
  margin-top: 0px;
  border: none;
  display: inline-block;
  font-family: Arial, Helvetica, sans-serif;
  width: 200px;
  height: 44px;
  line-height: 44px;
  resize: none;
  color: #999;
  font-size: 14px;

}

.extra_text {
  float: right;
  position: absolute;
  right: 35px;
  color: #999;
  font-size: 14px;
  position: absolute;
  width: 75px;
}

.extra_text_xx {
  float: right;
  color: #888888;
  font-size: 15px;
  position: absolute;
  right: 35px;
  top: 1px;
  width: 30px;
}

.extra_i {
  color: #afd03b;
  display: inline-block;
  margin: 0 3px;
  position: relative;
  width: 13px;
  text-align: center;
}

.radio {
  display: inline-block;
}

.radio_toggle_quantian {
  display: inline-block;
  opacity: 1;
  position: relative;
  width: 20px;
  z-index: 999;
}

.radio_toggle_baiban {
  display: inline-block;
  opacity: 1;
  position: relative;
  width: 20px;
  z-index: 999;
  left: 45px;
}

.radio_img_1 {
  position: absolute;
  left: 105px;
  width: 23px;
  top: 10px;
}

.radio_img_2 {
  position: absolute;
  left: 180px;
  width: 23px;
  top: 10px;
}

.radio_img_3 {
  position: absolute;
  left: 162px;
  width: 23px;
  top: 10px;
}

.id_photo {
  width: 88%;
  height: 110px;
  border-radius: 3px;
  margin-left: 10%;
  margin-right: 5%;
  margin-bottom: 5px;
  z-index: 11;
  background: rgba(0, 0, 0, 0);
  opacity: 0;
}

.id_photo_z {
  width: 88%;
  height: 110px;
  border-radius: 3px;
  margin-left: 10%;
  margin-right: 5%;
  margin-bottom: -4px;
  position: absolute;
  z-index: 22;
  opacity: .7;
}

.id_photo_zz {
  width: 88%;
  height: 110px;
  border-radius: 3px;
  margin-left: 10%;
  margin-right: 5%;
  margin-bottom: -4px;
  position: absolute;
  background: #fff;
}

.id_photo_f {
  width: 88%;
  height: 110px;
  border-radius: 3px;
  margin-left: 10%;
  margin-right: 5%;
  margin-bottom: -4px;
  position: absolute;
  z-index: 22;
  opacity: .7;
}

.id_photo_ff {
  width: 88%;
  height: 110px;
  border-radius: 3px;
  margin-left: 10%;
  margin-right: 5%;
  margin-bottom: -4px;
  position: absolute;
  background: #fff;
}

.show_opacity {
  opacity: 0;
}

.show_zheng {
  opacity: 1;
}

.show_fan {
  opacity: 1;
}

.jiafang .row_photo {
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  position: relative;
  padding-top: 10px;
  line-height: 25px;
  padding-bottom: 5px;
  overflow: hidden;
  width: 48%;
  float: left;
  text-align: center;
  font-size: 15px;
}

.pho_back {
  position: absolute;
  top: 10px;
  left: 5%;
  height: 110px;
  width: 90%;
  background: black;
  opacity: 0.2;
}

.mip-placeholder {
  background: rgba(0, 0, 0, 0) !important;
}

.identity {
  width: 30px;
  position: absolute;
  top: 47px;
  left: 40%;
}

.quantian {
  line-height: 40px;
  display: inline-block;
  margin-right: 24px;
  position: absolute;
  top: 2px;
  width: 45px;
  left: 25px;
}

.baiban {
  line-height: 40px;
  display: inline-block;
  margin-right: 24px;
  margin-left: 20px;
  position: absolute;
  left: 90px;
  top: 2px;
  width: 45px;
}

.zhifufangshi {
  color: #b2b2b2;
}

.shanghu_info input[type='radio'] {
  display: inline;
  width: 40px;
  float: left;
  position: absolute;
  top: 15px;
  margin-left: -35px;
  opacity: 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.row_photo .uploadfile {
  display: none;
  opacity: 0;
}

.checked {
  /* background-image: url('/i/balance_checked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 10px;
  left: -26px;
  z-index: 22;

}

.unchecked {
  /* background-image: url('/i/balance_unchecked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 10px;
  left: -26px;
  z-index: 22;

}

.err {
  color: #f00;
  position: relative;
  top: -14px;
  text-align: center;

}

.none {
  poniter-events: none;
}

.line {
  width: 92%;
  background: #f4f4f4;
  height: 1px;
  position: relative;
  left: 50%;
  margin-left: -46%;
}

.right p {
  position: relative;
  display: inline-block;
  width: 70px;
}

.shanghu_i {
  height: 44px;
  background: #f4f4f4;
  line-height: 44px;
  position: relative;
  left: 0px;
  padding-left: 15px;
}

.shanghu_i p {
  position: absolute;
  left: 15px;
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
API.ajaxContract = function (orderId, readonly, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/ajax_contract', {
      'id': orderId,
      'readonly': readonly ? 1 : 0
    }, fn)
}

API.uploadFile = function (data, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/upload_image', {
      'data': data,
      'target': 'media/image-[md5].jpg'
    },
    fn)
}

function normalImageSize (w, h) {
  var nw = 800
  var nh = 1000
  if (w <= nw && h <= nh) {
    return [w, h]
  }
  if (w >= h) {
    nh = h / (w / nw)
  } else {
    nw = w / (h / nh)
  }
  return [nw, nh]
}

function toDataUrlV2 (file, callback) {
  // ref https://sebastianblade.com/browser-side-image-compress-and-upload/

  var reader = new FileReader()
  var image = new Image()
  var canvas = document.createElement('canvas')
  var context = canvas.getContext('2d')

  image.addEventListener('load', function () {
    // console.warn("5");
    // 规范图片尺寸
    var S = normalImageSize(image.naturalWidth, image.naturalHeight)
    canvas.width = S[0]
    canvas.height = S[1]
    // 将图片绘制到 canvas 画布上
    context.drawImage(image, 0, 0, S[0], S[1])
    var quality = 30
    var filetype = 'image/jpeg'
    var compressedImageDataURL = canvas.toDataURL(filetype, quality / 100)
    callback(compressedImageDataURL)
  })

  image.addEventListener('error', function () {
    console.warn('Image load error')
  })
  reader.onloadend = function (e) {
    var dataURL = e.target.result
    // fileReader.result (data:image/png;base64,iVBORw0KG...)
    image.src = dataURL
  }
  reader.readAsDataURL(file)
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
    var pdata = JSON.parse(this.dataJsonstr)

    var toContractExtra
    var toContractSkillReq
    if (pdata.readonly !== '1') {
      toContractSkillReq = 'edit_contract_skill_req_mip?id=' + pdata.id
      toContractExtra = 'edit_contract_extra_mip?id=' + pdata.id
    } else {
      toContractSkillReq = 'edit_contract_skill_req_mip?id=' + pdata.id + '&readonly=1'
      toContractExtra = 'edit_contract_extra_mip?id=' + pdata.id + '&readonly=1'
    }

    return {
      isLogin: false,
      isUnion: false,
      ajaxLoaded: false,
      order_id: pdata.id,
      readonly: pdata.readonly,
      rea: !!pdata.readonly,
      err: false,
      show_z: false,
      show_f: false,
      contract_is_offer_allday_ser: true,
      master: {

      },
      order: {},
      contract_mama_name: '',
      contract_mama_phone_number: '',
      contract_mama_id_card: '',
      contract_shanghu_at: '',
      contract_shanghu_length: 0,
      contract_location: '',
      contract_price: 0,
      contract_master_price: 0,
      contract_deposit: 0,
      contract_is_pay_monthly: false,
      contract_is_offer_allday_service: 'true',
      contract_skill_req: 0,

      is_show_pay_monthly_btn: false,
      hardcode_deposit: 0,
      contract_mama_id_card_zheng: '',
      contract_mama_id_card_fan: '',
      pics: [],
      contract_deposit_min: 0,
      to_contract_skill_req: toContractSkillReq,
      to_contract_extra: toContractExtra,
      err_message: '',
      ret: 1
    }
  },
  computed: {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    var readonly = this.readonly ? 1 : 0
    if (readonly === 1 || readonly === '1') {
      this.rea = true
    }
    var self = this
    this.$element.customElement.addEventAction('echo', function (event, str) {
    })
    this.$element.customElement.addEventAction('dook', function (event, str) {
      event.from.bind(self)(event.data, true)
      // var eval_str = 'this.' + event.handler + '(event_order)'
    })
    this.$element.customElement.addEventAction('docancel', function (event, str) {
    })

    function setData (ajaxData) {
      var pdata = ajaxData
      var data = pdata.order

      // var masterPrice = data.master.price_26day // 月嫂价格
      var masterPrice = data.contract_is_offer_allday_service
        ? data.master.yuesao_allday_price
        : data.master.yuesao_daytime_price
      masterPrice = masterPrice / 100

      var price = Math.round(masterPrice / 26 * data.contract_shanghu_length) // 通过月嫂价格和上户时长计算的总金额
      var deposit = Math.round(masterPrice / 26 * data.contract_deposit_min * data.contract_shanghu_length) // 通过月嫂价格和上户时长计算的订金
      if (data.contract_shanghu_length === 0) {
        price = 0
        deposit = 0
        // master_price = 0;
      } else if (price !== data.contract_price) {
        price = data.contract_price
        deposit = data.contract_deposit
        masterPrice = Math.round(data.contract_price / data.contract_shanghu_length * 26)
      }
      var toContractExtra
      var toContractSkillReq
      if (pdata.readonly !== '1' && pdata.readonly !== 1) {
        toContractSkillReq = 'edit_contract_skill_req_mip?id=' + pdata.order.id
        toContractExtra = 'edit_contract_extra_mip?id=' + pdata.order.id
      } else {
        toContractSkillReq = 'edit_contract_skill_req_mip?id=' + pdata.order.id + '&readonly=1'
        toContractExtra = 'edit_contract_extra_mip?id=' + pdata.order.id + '&readonly=1'
      }
      var showz
      if (data.contract_mama_id_card_list[0] === '') {
        showz = false
      } else {
        showz = true
      }
      var showf
      if (data.contract_mama_id_card_list[1] === 'undefined' ||
        data.contract_mama_id_card_list[1] == null) {
        showf = false
      } else {
        showf = true
      }
      var skillLength
      if (data.contract_skill_req === '') {
        skillLength = 0
      } else {
        skillLength = data.contract_skill_req.split(',').length
      }
      if (localStorage.State) {
        var saved = JSON.parse(localStorage.State)
        if (saved.ts && saved.ts > pdata.ts) {
          return saved
        }
      }

      self.readonly = pdata.readonly
      self.rea = !!pdata.readonly
      self.err = false
      self.show_z = showz
      self.show_f = showf
      self.contract_is_offer_allday_ser = !!data.contract_is_offer_allday_service
      self.master = pdata.order.master
      self.order = pdata.order
      self.contract_mama_name = data.contract_mama_name
      self.contract_mama_phone_number = data.contract_mama_phone_number
      self.contract_mama_id_card = data.contract_mama_id_card
      self.contract_shanghu_at = data.contract_shanghu_at
      self.contract_shanghu_length = data.contract_shanghu_length
      self.contract_location = data.contract_location
      self.contract_price = price
      self.contract_master_price = masterPrice
      self.contract_deposit = deposit
      self.contract_is_pay_monthly = !!data.contract_is_pay_monthly
      self.contract_is_offer_allday_service = data.contract_is_offer_allday_service ? 'true' : 'false'
      self.contract_skill_req = skillLength
      self.is_show_pay_monthly_btn = data.contract_shanghu_length >= 42
      self.hardcode_deposit = data.hardcode_deposit
      self.contract_mama_id_card_zheng = data.contract_mama_id_card_list[0]
      self.contract_mama_id_card_fan = data.contract_mama_id_card_list[1]
      self.pics = []
      self.contract_deposit_min = data.contract_deposit_min
      self.to_contract_skill_req = toContractSkillReq
      self.to_contract_extra = toContractExtra
      self.err_message = ''

      self.ajaxLoaded = true
    }

    this.$element.customElement.addEventAction('logindone', function (event, str) {
      API.sessionId = event.sessionId
      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)
      API.ajaxContract(self.order_id, self.readonly, function (isOk, res) {
        setData(res)
      })
    })
  },
  methods: {
    init () {
    },
    load_data () {
    },
    fileSelectZ () {
      this.cur_image_fn = 'zheng'
      document.getElementById('fz').click()
    },
    fileSelectF () {
      this.cur_image_fn = 'fan'
      document.getElementById('ff').click()
    },
    changeZ () {
      // var pic = document.getElementById('preview')
      var file = document.getElementById('fz')
      var ext = file.value.substring(file.value.lastIndexOf('.') + 1).toLowerCase()
      // gif在IE浏览器暂时无法显示
      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
        console.warn('图片的格式必须为png或者jpg或者jpeg格式！')
        return
      }
      this.html5Reader(file)
      this.show_z = true
    },
    changeF () {
      // var pic = document.getElementById('fan')
      var file = document.getElementById('ff')
      var ext = file.value.substring(file.value.lastIndexOf('.') + 1).toLowerCase()
      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
        return
      }
      this.html5Reader(file)
      this.show_f = true
    },
    uploadFile_ (myBase64, fn) {
      var self = this
      API.uploadFile(myBase64, function (isOk, res) {
        if (self.cur_image_fn === 'zheng') {
          self.$set(self, 'contract_mama_id_card_zheng', res.raw)
          self.cur_image_fn = ''
          self.saveIt_()
        } else if (self.cur_image_fn === 'fan') {
          self.$set(self, 'contract_mama_id_card_fan', res.raw)
          self.cur_image_fn = ''
          self.saveIt_()
        }
      })
    },
    quantianChecked () {
      if (this.readonly !== '1' && this.readonly !== 1) {
        this.contract_is_offer_allday_service = 'true'
        this.contract_is_offer_allday_ser = true
        this.contract_master_price = this.master.yuesao_allday_price / 100
        this.saveIt_()
      }
    },
    baibanChecked () {
      if (this.readonly !== '1' && this.readonly !== 1) {
        this.contract_is_offer_allday_service = 'false'
        this.contract_is_offer_allday_ser = false
        this.contract_master_price = this.master.yuesao_daytime_price / 100
        this.saveIt_()
      }
    },
    contract_is_offer_allday_service_change_ () {
      if (this.contract_is_offer_allday_service === 'true') {
        this.contract_is_offer_allday_ser = true
        this.contract_master_price = this.master.yuesao_allday_price / 100
      } else {
        this.contract_is_offer_allday_ser = false
        this.contract_master_price = this.master.yuesao_daytime_price / 100
      }
      this.saveIt_()
    },
    contract_mama_name_change_ () {
      this.inspect_()
      if (this.ret !== 2) {
        // return
      }
      this.saveIt_()
    },
    contract_mama_phone_number_change_ () {
      this.inspect_()
      if (this.ret !== 2) {
        // return
      }
      this.saveIt_()
    },
    contract_mama_id_card_change_ () {
      this.inspect_()
      if (this.ret !== 2) {
        // return
      }
      this.saveIt_()
    },
    contract_shanghu_at_change_ () {
      this.inspect_()
      this.saveIt_()
    },
    contract_shanghu_length_change_ () {
      var djb = 0.12 // 定金比默认值
      // 定金比分段函数
      if (this.contract_shanghu_length <= 25 && this.contract_shanghu_length >= 16) {
        djb = 0.2
      } else if (this.contract_shanghu_length <= 15 && this.contract_shanghu_length >= 10) {
        djb = 0.3
      } else if (this.contract_shanghu_length <= 9 && this.contract_shanghu_length >= 0) {
        djb = 1.0
      }
      this.contract_deposit_min = djb
      this.inspect_()
      if (this.ret !== 2) {
        // return
      }
      this.saveIt_()
    },
    contract_location_change_ (event) {
      this.inspect_()
      if (this.ret !== 2) {
        // return
      }
      this.saveIt_()
    },

    saveIt_ () {
      if (!this.ajaxLoaded) {
        console.error('can not save while data not loaded')
        return false
      }
      this.contract_price = Math.round(this.contract_master_price / 26 * this.contract_shanghu_length * 100) / 100
      this.contract_deposit = this.contract_shanghu_length > 42
        ? (this.contract_is_pay_monthly === 1
          ? Math.round(this.contract_master_price * this.contract_deposit_min * 100) / 100
          : Math.round(this.contract_deposit_min * this.contract_master_price / 26 * this.contract_shanghu_length * 100) / 100)
        : Math.round(this.contract_deposit_min * this.contract_master_price / 26 * this.contract_shanghu_length * 100) / 100

      var obj = {}
      var service

      if (this.contract_is_offer_allday_service === 'true') {
        service = 'true'
      } else {
        service = 'false'
      }
      if (this.contract_deposit_min === 1) {
        obj.contract_deposit = obj.contract_price
      }
      obj.id = this.order.id
      obj.contract_mama_id_card_list = this.contract_mama_id_card_zheng + ',' + this.contract_mama_id_card_fan
      obj.contract_mama_name = this.contract_mama_name
      obj.contract_mama_phone_number = this.contract_mama_phone_number
      obj.contract_mama_id_card = this.contract_mama_id_card
      obj.contract_shanghu_at = this.contract_shanghu_at
      obj.contract_shanghu_length = this.contract_shanghu_length
      obj.contract_location = this.contract_location
      obj.contract_price = this.contract_price
      obj.contract_master_price = this.contract_master_price
      obj.contract_deposit = this.contract_deposit
      obj.contract_is_pay_monthly = !!this.contract_is_pay_monthly
      obj.contract_is_offer_allday_service = service
      obj.is_show_pay_monthly_btn = this.contract_shanghu_length >= 42
      obj.hardcode_deposit = this.hardcode_deposit
      obj.pics = []
      obj.mama_id = this.order.mama.id

      this._data.ts = new Date()
      localStorage.State = JSON.stringify(this._data)
      API.wrapRet_(
        'https://mip.putibaby.com/api/set_contract', obj,
        function (isOk, res) {
          if (isOk) {
          }
        })
    },
    Trim (str) {
      var idCard = str.replace(/\s/gi, '')
      return idCard
    },
    inspect_ () {
      this.ret = 1
      if (!/\S+/.test(this.contract_mama_name)) {
        this.err_message = '请填写正确的姓名'
        this.err = true
        return
      }
      if (!/\S+/.test(this.contract_mama_phone_number)) {
        this.err_message = '请填写正确的电话号码'
        this.err = true
        return
      } else if (!this.contract_mama_phone_number.match(/^1\d{10}/)) {
        this.err_message = '请填写正确的电话号码'
        this.err = true
        return
      }
      if (!/\S+/.test(this.contract_mama_id_card)) {
        this.err_message = '请填写身份证号码'
        this.err = true
        return
      } else if (this.contract_mama_id_card) {
        var idCard = this.contract_mama_id_card
        this.Trim(idCard)
        // 15位和18位身份证号码的正则表达式
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        // 如果通过该验证，说明身份证格式正确，但准确性还需计算
        if (regIdCard.test(idCard)) {
          if (idCard.length === 18) {
            var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]// 将前17位加权因子保存在数组里
            var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]// 这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0// 用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
              idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i]
            }
            var idCardMod = idCardWiSum % 11
            var idCardLast = idCard.substring(17)// 计算出校验码所在数组的位置
            // 得到最后一位身份证号码
            // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod === 2) {
              if (idCardLast === 'X' || idCardLast === 'x') {
              } else {
                this.err_message = '身份证号码错误'
                this.err = true
                return
              }
            } else {
              // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
              if (parseInt(idCardLast) === idCardY[idCardMod]) {
              } else {
                this.err_message = '身份证号码错误'
                this.err = true
                return
              }
            }
          } else {
            this.err_message = '身份证号码错误'
            this.err = true
            return
          }
        } else {
          this.err_message = '身份证格式不正确'
          this.err = true
          return
        }
      } else {
        this.err_message = '身份证格式不正确'
        this.err = true
        return
      }

      if (!/^[1-9]\d*/.test(this.contract_shanghu_length)) {
        this.err_message = '请填写正确的上户时长'
        this.err = true
        return
      }
      if (!/^\d\d\d\d-\d\d-\d\d$/.test(this.contract_shanghu_at)) {
        this.err_message = '请填写正确的上户时间，类似2017-01-01'
        this.err = true
        return
      }
      if (!/\S+/.test(this.contract_location)) {
        this.err_message = '请填写正确的上户地点'
        this.err = true
        return
      }
      this.err = false
      this.ret = 2
    },
    contractDetail () {
      var id = this.order.id
      var url = 'https://mip.putibaby.com/v2_show_ptg_ys_full_contract?id=' + id + '&_=' + Math.random()
      // window.location.href = url
      window.MIP.viewer.open(MIP.util.makeCacheUrl(url), {})
    },

    handleSubmit_ (data, skip) {
      // 检查基本信息
      // var info = oa({}, this.state);
      if (this.contract_deposit_min === 1) {
        this.contract_deposit = this.contract_price
      }

      var self = this
      self.inspect_()
      if (self.ret !== 2) {
        return
      }
      if (skip) {
        API.wrapRet_(
          'https://mip.putibaby.com/api/submit_contract', {
            'id': this.order.id
          },
          function (isOk, res) {
            if (isOk) {
              // window.location.href = 'https://mip.putibaby.com/order_list'
              window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/order_list'), {replace: true})
            } else {
              self.err_message = '提交失败请重试'
              self.err = true
            }
          })
      } else {
        var ele = document.getElementById('ptgconfirm')

        MIP.viewer.eventAction.execute('doshow', ele, {
          el_id: 'editcontract',
          title: '提示消息',
          msg: '确定合同填写无误?',
          from: this.handleSubmit_,
          data: data
        })
      }
    },

    html5Reader (file) {
      var that = this
      var fileName = file.files[0]

      toDataUrlV2(fileName, function (myBase64) {
        that.uploadFile_(myBase64, 'id_card_zheng')
      })
    }
  }
}
</script>
