<template>
  <div class="s4s-page" >
    <div class="s4s-car-info">
      <div style="display: flex;align-items:center;">
        <div style="flex:1;">
          <h2
            class="s4s-car-name"
          >请您上传行驶证 <span
            class="s4s-help"
            style="margin-left:.1rem;"
            @click="openDriveFile">?</span></h2>
          <div class="s4s-car-illegal"><span @click="goq">系</span>统可直接识别信息  ，无需填写</div>
          <a
            ref="go"
            href="https://jin.baidu.com/mkt/cloan/guide?code=0122huoke01&channel=JXJhuoke&spot=qichedasheng-201808215"
            style="color:#999999"/>
        </div>
        <div class="s4s-upload-pic">
          <div
            v-show="driveUrl"
            class="s4s-ask-upload-btn"
            @click="upload" >
            <mip-img
              :src="driveUrl"
              styel="width:100%;" />
          </div>
          <div
            v-show="!driveUrl"
            class="s4s-ask-upload-btn"
            @click="upload">
            <mip-img
              styel="width:100%;"
              src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/upload.png" />
            <input
              ref="file"
              type="file"
              accept="image/*"
              multiple="multiple"
              style="display: none;"
              @change="fileChanged">
          </div>
          <div style="display:none">
            <canvas
              id="dcanvas"
              width="0"
              height="0"
              style="dispaly: none"/>
          </div>
        </div>
      </div>
    </div>
    <div class="s4s-car-info s4s-illegal-body">
      <h2 class="s4s-car-name">或直接输入行驶证信息</h2>
      <div class="s4s-group">
        <span class="s4s-group-tit">车牌号码</span>
        <div
          class="provice"
          @click="selectProvice" >
          <div style="height:100%;padding: 4px 0;">{{ provice }} <span class="right-arrow"/></div>
        </div>
        <input
          v-model="car_no"
          type="text"
          maxlength="7"
          placeholder="请输入车牌号码" >
      </div>
      <!-- <div class="s4s-group">
            <div class="s4s-group-tit">车辆类型
            </div>
            <div style="flex:1">
                <select v-model="cartype"  :style="{direction: 'rtl', color: !cartype ? '#666' : '#000'}">
                    <option value='' disabled style="display:none;color:#ddd">请选择车辆类型</option>
                    <option v-for="item in carTypeList" :key="item.value" :value="item.value">
                        {{item.label}}
                    </option>
                </select>
            </div>
        </div> -->
      <div
        v-if="vinLength !== 0"
        class="s4s-group">
        <div class="s4s-group-tit">车架号码

        </div>
        <input
          :maxlength="vinLength === 99 ? '' : 6"
          v-model="vin"
          :placeholder="vinLength === 99 ? '请输入完整的车架号' : '请输入车架号后六位'"
          type="text" >
        <span
          class="s4s-help"
          @click="classDetail">?</span>
      </div>
      <div
        v-if="engineNoLength!== 0"
        class="s4s-group">
        <div class="s4s-group-tit">发动机号

        </div>
        <input
          :maxlength="engineNoLength === 99 ? '' : 6"
          v-model="engine"
          :placeholder="engineNoLength === 99 ? '请输入完整的发动机号' : '请输入发动机号后六位'"
          type="text" >
        <span
          class="s4s-help"
          @click="engineDetail">?</span>
      </div>
    </div>
    <button
      class="s4s-btn"
      @click="formSubmit"> {{ isEdit?'保存':'添加' }} </button>

    <mip-fixed type="top">
      <div
        v-if="detail"
        class="s4s-mask"
        @click="closeMake">
        <mip-img
          :src="src"
          layout="responsive"
          width="350"
          height="263" />
      </div>
    </mip-fixed>
    <mip-fixed type="bottom">
      <div
        v-if="showProvice"
        class="s4s-provice" >
        <div style="overflow: hidden;padding-bottom: .40rem;" >
          <template v-for="(provice, index) in proviceList">
            <div
              :key="index"
              class="s4s-provice-tit"
              @click="selProvince(provice)">{{ provice }}</div>
          </template>
          <div
            key="-1"
            class="s4s-provice-tit-hide"
            @click="selectProvice" >隐藏</div>
        </div>
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
      default: () => {}
    }
  },
  data () {
    return {
      ad: 0,
      car: null,
      provice: '浙',
      showProvice: false,
      car_no: '',
      engine: '',
      vin: '',
      detail: false,
      src: '',
      carid: 0,
      driveUrl: '',
      vinLength: 6,
      engineNoLength: 6,
      cartype: '',
      isEdit: false,
      editId: '',
      carTypeList: [
        {
          value: '02',
          label: '小型汽车'
        },
        {
          value: '01',
          label: '大型汽车'
        },
        {
          value: '52',
          label: '新能源小车'
        },
        {
          value: '51',
          label: '新能源大车'
        },
        {
          value: '26',
          label: '香港入境车'
        },
        {
          value: '27',
          label: '澳门入境车'
        },
        {
          value: '03',
          label: '使馆汽车'
        },
        {
          value: '04',
          label: '领馆汽车'
        },
        {
          value: '05',
          label: '境外汽车'
        },
        {
          value: '06',
          label: '外籍汽车'
        },
        {
          value: '07',
          label: '两三轮摩托车'
        },
        {
          value: '08',
          label: '轻便摩托车'
        },
        {
          value: '09',
          label: '使馆摩托车'
        },
        {
          value: '10',
          label: '领馆摩托车'
        },
        {
          value: '11',
          label: '境外摩托车'
        },
        {
          value: '12',
          label: '外籍摩托车'
        },
        {
          value: '13',
          label: '农用运输车'
        },
        {
          value: '14',
          label: '拖拉机'
        },
        {
          value: '15',
          label: '挂车'
        },
        {
          value: '16',
          label: '教练汽车'
        },
        {
          value: '17',
          label: '教练摩托车'
        }
      ],
      proviceList: [
        '京',
        '津',
        '渝',
        '沪',
        '冀',
        '晋',
        '辽',
        '吉',
        '黑',
        '苏',
        '浙',
        '皖',
        '闽',
        '赣',
        '鲁',
        '豫',
        '鄂',
        '湘',
        '粤',
        '琼',
        '川',
        '贵',
        '云',
        '陕',
        '甘',
        '青',
        '蒙',
        '桂',
        '宁',
        '新',
        '藏',
        '使',
        '领',
        '警',
        '学',
        '港',
        '澳'
      ]
    }
  },
  watch: {
    provice (val) {
      // MIP.setData({
      //   "#globalData": {
      //     provice: val
      //   }
      // });
      util
        .fetchData('v3/violation/rule', {
          prefix: val
        })
        .then(res => {
          if (res.code === 20022) {
            return
          }
          if (res.code >= 40000 && res.code < 50000) {
            return
          }
          if (res.code === 0) {
            this.vinLength = res.data.vinLength
            this.engineNoLength = res.data.engineNoLength
          }
        })
    }
    // cartype(val) {
    //   MIP.setData({
    //     "#globalData": {
    //       car_type: val
    //     }
    //   });
    // },
    // car_no(val) {
    //   MIP.setData({
    //     "#globalData": {
    //       car_no: val
    //     }
    //   });
    // },
    // engion(val) {
    //   MIP.setData({
    //     "#globalData": {
    //       engine: val
    //     }
    //   });
    // },
    // vin(val) {
    //   MIP.setData({
    //     "#globalData": {
    //       vin: val
    //     }
    //   });
    // }
  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    if (this.globalData && this.globalData.car_no) {
      this.car_no = this.globalData.car_no
      this.vin = this.globalData.vin
      this.provice = this.globalData.provice
      this.engine = this.globalData.engine
      this.isEdit = true
      this.editId = this.globalData.car_id
    }
  },
  methods: {
    goq () {
      this.ad += 1
      if (this.ad === 10) this.$refs.go.click()
    },
    // 查看行驶证
    openDriveFile () {
      this.detail = true
      this.src =
        'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/driveFileA.png'
    },
    selProvince (val) {
      this.provice = val
      MIP.setData({ '#globalData': { provice: val } })
      this.showProvice = false
    },
    // 选择省份
    selectProvice () {
      this.showProvice = !this.showProvice
    },
    // 查看车架号
    classDetail () {
      this.detail = true
      this.src =
        'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/classNo.png'
    },
    // 查看发动机号
    engineDetail () {
      this.detail = true
      this.src =
        'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/engine.png'
    },
    closeMake () {
      this.detail = false
    },
    formSubmit () {
      let car = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/
      if (this.car_no) {
        this.car_no = this.car_no.toUpperCase()
      }
      let carNo = this.provice + this.car_no
      if (!this.car_no) {
        util.toast('请输入车牌号')
        return
      } else if (!car.test(carNo)) {
        util.toast('输入车牌号码有误')
        return
      }
      // if (!this.cartype) {
      //   util.toast("请选择车辆类型");
      //   return;
      // }
      if (this.vin.length < 6 && this.vinLength !== 0) {
        util.toast('请输入正确的车架号')
        return
      }
      if (this.engine.length < 6 && this.engineNoLength !== 0) {
        util.toast('请输入正确的发动机号')
        return
      }
      // 接口参数 engine
      let param = {
        car_no: carNo,
        vin: this.vin,
        engine: this.engine
      }

      if (this.isEdit) {
        param.carid = this.editId
      }
      util.fetchData('v3/violation/car/manage', param).then(res => {
        if (res.code > 0) {
          util.toast(res.msg)
          return
        }
        if (res.code === 0) {
          util.toast('操作成功')
          MIP.viewer.open('./car.html')
        }
      })
    },
    upload () {
      this.$refs.file.click()
    },
    fileChanged () {
      let self = this
      let list = this.$refs.file.files
      if (list.length !== 1) {
        util.toast('最多只能选择1张驾驶证。')
        return
      }

      let item = {
        name: list[0].name,
        size: list[0].size,
        file: list[0]
      }
      self.html5Reader(list[0], item, 'travelUrl')
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
          let canvas = document.getElementById('dcanvas')
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
            util.toast('正在上传')
            const formData = new FormData()
            formData.append('image', blob, item.name)
            self.vehiclecardFetch(formData)
          }, file.type || 'image/png')
        }
      }
      reader.readAsDataURL(file)
    },
    vehicleInfo (val, driveUrl) {
      this.car = val
      this.provice = val.plateno ? val.plateno.substring(0, 1) : '浙'
      this.car_no = val.plateno ? val.plateno.substring(1) : ''
      this.vin = val.vin || ''
      this.engine = val.engineno || ''
      this.driveUrl = driveUrl
      if (val.vehicletype.indexOf('小') !== -1) {
        this.cartype = '02'
      } else if (val.vehicletype.indexOf('大') !== -1) {
        this.cartype = '01'
      }
    },
    // 识别行驶证
    vehiclecardFetch (formData) {
      let self = this
      fetch('https://mys4s.cn/v2/car/recognize_vehiclecard', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if (data.code === 0) {
            if (data.data && data.data.img_url) {
              self.driveUrl = data.data.img_url
              util.toast('行驶证识别成功，请您核对信息是否准确')
              self.vehicleInfo(data.data, self.driveUrl)
            } else {
              util.toast('行驶证识别失败,请重新上传或填写车辆信息')
            }
          } else {
            util.toast(data.msg)
          }
        })
    }
  }
}
</script>

<style scoped>
.s4s-car-info.s4s-illegal-body {
  margin-top: 0.12rem;
  padding-bottom: 0;
}

.s4s-user-car {
  margin: -1.1rem 0.1rem 0 0.1rem;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  color: #fff;
  font-size: 0.12rem;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -webkit-box-align: center;
}

.s4s-car-info {
  background-color: #fff;
  padding: 0.25rem 0.15rem;
}

.s4s-car-name {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  -ms-box-flex: 1;
  color: #333333;
  font-size: 0.2rem;
  display: flex;
  align-items: center;
}

.s4s-car-illegal {
  padding-top: 0.05rem;
  color: #999999;
  font-size: 0.14rem;
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
  width: 0.9rem;
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
.s4s-btn {
  background-image: linear-gradient(40deg, #ff7c00 0%, #fe5a00 100%);
  border-radius: 0.04rem;
  border: none;
  line-height: 0.5rem;
  font-size: 0.18rem;
  width: 90%;
  display: block;
  margin: 0 auto;
  color: #fff;
  margin: 0.2rem auto;
}
.s4s-upload-pic {
  width: 30%;
}

.provice {
  background-image: linear-gradient(40deg, #ff7c00 0%, #fe5a00 100%);
  border-radius: 0.04rem;
  color: #fff;
  /* width: 0.45rem; */
  min-width: 0.5rem;
  height: 0.25rem;
  margin-right: 0.1rem;
  padding: 0.01rem 0.09rem;
}
.right-arrow {
  display: inline-block;
  margin-bottom: 2px;
  width: 0;
  height: 0;
  border-left: 0.05rem solid transparent;
  border-top: 0.05rem solid #fff;
  border-right: 0.05rem solid transparent;
}
.s4s-provice {
  width: 100%;
  background: #d8dbdc;
  /* position: absolute; */
  /* bottom: 0; */
  /* left: 0; */
  transform: translateY(0);
  -webkit-transform: translateY(0);
  transition: transform 0.3s ease-out;
  -webkit-transition: -webkit-transform 0.3s ease-out;
}
.s4s-provice-tit,
.s4s-provice-tit-hide {
  float: left;
  width: 9%;
  padding: 0.05rem;
  background: #fff;
  border-radius: 0.04rem;
  margin-left: 3.09999999%;
  margin-top: 3.09999999%;
  text-align: center;
  font-size: 0.14rem;
}
.s4s-provice-tit-hide {
  width: 33.899999999%;
  background: #bbc3c7;
  color: #fff;
}
@media screen and (min-width: 500px) {
  .s4s-provice-tit {
    width: auto;
    margin-left: 1.09999999%;
    margin-top: 1.09999999%;
  }
  .s4s-provice-tit-hide {
    width: 98%;
    margin-left: 1.09999999%;
    margin-top: 1.09999999%;
  }
}
.s4s-provice-hover {
  background: #bbb;
  color: #fff;
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
</style>
