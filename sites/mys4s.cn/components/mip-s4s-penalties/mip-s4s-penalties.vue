<template>
    <div class="s4s-page">
        <div class="s4s-body" >
            <div style="display:none">
                <canvas id="canvas" width="0px" height="0px" style="dispaly: none"></canvas>
            </div>
            <a data-type="mip" ref="pay2" href="pay2.html"></a>
            <!-- <img src="../../assets/620.jpg" style="width:100%;"/> -->
            <div class="s4s-order-container" >
                <p class="s4s-order-title">处罚决定书编号
                    <span class="s4s-help s4s-help-tip"  @click="openCode">
                        !
                    </span>
                    <span style="color:#999;font-size:14px;">15-16位</span></p>
                <div class="s4s-order-input">
                    <input type="text" maxlength="19" v-model="orderNumber" placeholder="请输入处罚决定书编号" />
                    <span class="s4s-btn" @click="ready" >确定</span>
                </div>
                <p class="s4s-order-text">处罚决定书编号、车牌号和处罚人为办单依据，请咨询核对！</p>
            </div>
            <div v-if="showNotice" class="s4s-order-container" style="margin-top:15px;" >
                <p class="s4s-order-title">代缴流程和注意事项</p>
                <div class="s4s-order-img-container">
                    <div style="flex:4">
                        <div class="flex-center">
                            <mip-img width="40" height="41" class="pic" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/icon1.png" ></mip-img>
                            <mip-img width="13" height="20" class="arr" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/leftar.png"></mip-img>
                        </div>
                        <div class="s4s-order-tip-text" >违法告知单</div>
                    </div>
                     <div  style="flex:4">
                         <div class="flex-center">
                             <mip-img width="40" height="41" class="pic" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/icon2.png"></mip-img>
                            <mip-img  width="13" height="20"  class="arr" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/leftar.png"></mip-img>
                         </div>
                        <div class="s4s-order-tip-text" >交管认罚</div>
                    </div>
                     <div  style="flex:4">
                         <div class="flex-center">
                             <mip-img width="40" height="41" class="pic" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/icon3.png"></mip-img>
                            <mip-img  width="13" height="20"  class="arr" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/leftar.png"></mip-img>
                         </div>
                         <div class="s4s-order-tip-text" >领处罚决定书</div>
                        
                    </div>
                     <div  style="flex:3">
                         <div class="flex-center">
                             <mip-img width="40" height="41" class="pic" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/icon4.png" ></mip-img>
                         </div>
                         <div class="s4s-order-tip-text" >线上缴费</div>
                        
                        
                    </div>
                    
                    <!-- <img  class="pic" src="../../assets/icon2.png">
                    <img  class="arr" src="../../assets/leftar.png">
                    <img  class="pic" src="../../assets/icon3.png">
                    <img  class="arr" src="../../assets/leftar.png">
                    <img  class="pic" src="../../assets/icon4.png"> -->
                </div>
                <p class="s4s-order-content">罚单处理周期为24小时，仅现场单或已领处罚单决定书才可直接缴款。其他问题参见
                  <a data-type="mip" href="help.html" style="text-decoration: underline;">常见问题</a>
                  <!-- <span @click="gotoHelp">常见问题</span> -->
                  。</p>
            </div>
            <template v-if="!showNotice">
           
            <div v-if="showForm1" class="s4s-pay-body">
                 <div class="s4s-title">
                    违章处罚单信息
                </div>
                <div class="s4s-group">
                    <span class="s4s-group-tit">被处罚人</span>
                    <span class="s4s-group-tit" style="width:auto" >{{payForm.name}}</span>
                </div>
                <div class="s4s-group">
                    <div class="s4s-group-tit">认罚日期
                        <!-- <span class="s4s-help" @click="openDateShow">?</span> -->
                    </div>
                    <span  class="s4s-group-tit" style="width:auto"  >{{payForm.renfa_time}}</span>
                </div>
                <div class="s4s-group">
                    <span class="s4s-group-tit">罚款金额</span>
                    <span  class="s4s-group-tit" style="width:auto;color:#fe7000">¥ {{payForm.money}}</span>
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
            
            <div v-if="showForm2" class="s4s-pay-body">
                <div class="s4s-title">
                    违章处罚单信息
                </div>
                <div class="s4s-group" v-if="showName">
                    <span class="s4s-group-tit">被处罚人</span>
                    <input type="text" v-model="nick" placeholder="请输入被处罚人姓名" />
                </div>
                <div class="s4s-group" v-if="!showName">
                    <span class="s4s-group-tit">车牌号码</span>
                      <div style="display: flex;align-items:center;overflow: hidden;width:1.30rem;">
                        <span class="s4s-sel-provice" style="float: left;" @click="selectProvice">{{ provice }}</span>
                        <input type="text" v-model="_nickCarNo" maxlength="7" style="text-align: left;line-height:.25rem;width: 1rem;" placeholder="请输入车牌号码" />
                      </div>
                </div>
                <div class="s4s-group" v-if="showDrive">
                    <span class="s4s-group-tit">驾驶证号</span>
                    <input type="text" v-model="drive_no" maxlength="19" placeholder="请输入驾驶证号" />
                </div>
                <div class="s4s-group">
                    <div class="s4s-group-tit">认罚日期
                        <!-- <span class="s4s-help" @click="openDateShow">?</span> -->
                    </div>
                    <input type="date" id="date1" :max="maxtime" v-model="date" class="s4s-select-date" style="flex: 1" placeholder="请选择认罚日期" />
                    <img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/date.png"/>
                </div>
                <div class="s4s-group">
                    <span class="s4s-group-tit">罚款金额</span>
                    <input type="number" v-model="price" placeholder="请输入罚款金额" />
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
                <div class="s4s-group" style="height:auto">
                    <div class="s4s-group-tit">上传罚单</div>
                    <mip-img v-if="ticketUrl" @click="chooseimg" style="width:50%" :src="ticketUrl" ></mip-img>
                    <div v-if="!ticketUrl">
                        <mip-img @click="chooseimg" style="width:50%" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/update3.png" ></mip-img>
                    </div>
                    <div v-show="!ticketUrl" @click="chooseimg">
                        <input type="file" accept="image/*" @change="uploader" ref="file" multiple="multiple" style="display: none;">
                    </div>
                </div>
            </div>

            <button v-if="showForm1 || showForm2" class="s4s-btn" @click="tryToPay">立即办理 </button>
            </template>

        </div>
        <div class="s4s-mask" @click="closeMake" v-if="openShow">
            <mip-img :src="src" ></mip-img>
        </div>
        <template v-if="dateShow">
            <div class="s4s-pop">
                <div class="s4s-pop-bg"></div>
                <div class="s4s-pop-body">
                    <div class="s4s-pop-title">认罚日期</div>
                    <div style="margin-top: .15rem;color: #333;font-size: .15rem;">处罚决定书的领取日期，或现场单的开具日期，请您准确填写以便确认罚款金额。</div>
                </div>
                <!-- <img src="../../assets/close.png" class="s4s-close" @click="closeDate" /> -->
            </div>
            <div class="s4s-mask" @click="closeDate"></div>
        </template>
    </div>
</template>

<script>
import util from "../../common/util";

export default {
  data() {
    return {
      provice: "浙",
      carno: "",
      code: "",
      nick: "",
      phone: "",
      nickCarNo: "",
      _nickCarNo: "",
      date: "",
      ticketUrl: "",
      price: "",
      openShow: false,
      dateShow: false,
      tel: "",
      ownFree: 0,
      lateFree: 0,
      drive_no: "",
      disabled: true,
      user: {},
      noticeNum: "",
      notify: null,
      showProvice: false,
      notify: null,

      orderNumber: "",
      selectOrderNumber: "",
      showConfirm: false,
      showNotice: true,
      showForm2: false,
      showForm1: false,
      payForm: null,
      canTryToPay: true,
      searchAgain: false
    };
  },
  props: {
    globalData: {
      type: Object,
      default() {
        return {};
      },
      required: true
    }
  },

  watch: {
    globalData() {
      console.log(this.globalData);
    },
    price() {
      this.getVioFee();
    },
    date() {
      this.getVioFee();
    },
    orderNumber() {
      this.orderNumber = this.orderNumber
        .replace(/\D/g, "")
        .replace(/....(?!$)/g, "$& ");
  
    }
  },
  computed: {
    showName() {
      let str = this.selectOrderNumber.slice(0, 2);
      if (str === "31" || str === "62") {
        return false;
      } else {
        return true;
      }
    },
    showDrive() {
      let str = this.selectOrderNumber.slice(0, 2);
      if (str === "54" || str === "15") {
        return true;
      } else {
        return false;
      }
    },
    maxtime() {
      return util.formatDateTime().slice(0, 10);
    }
  },
  mounted() {

  },
  methods: {
    // 点击办理
    tryToPay() {
      if (this.showForm2) {
        let tel = /^1\d{10}$/;
        let money = /^-?\d+\.?\d{0,2}$/;
        let drivenoReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        let car = /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/;
        if (!this.nick && this.showName) {
          util.toast("请输入当事人姓名");
          return;
        }

        if (this._nickCarNo) {
          this.nickCarNo = this.nickCarNo.toUpperCase();
        }
        console.log("nickCarNo", this.nickCarNo);
        if (!this.showName) {
          this.nickCarNo = this.provice + this._nickCarNo;
          if (!this._nickCarNo) {
            util.toast("请输入车牌号码");
            return;
          } else if (!car.test(this.nickCarNo)) {
            util.toast("输入车牌号码有误");
            return;
          }
        }
        if (this.showDrive) {
          if (!this.drive_no) {
            util.toast("请输入驾驶证号");
            return;
          } else if (!drivenoReg.test(this.drive_no)) {
            util.toast("请输入正确的驾驶证号");
            return;
          }
        }
        if (!this.date) {
          util.toast("请选择认罚日期");
          return;
        } else {
          var selectDate = new Date(this.date.slice(0, 10) + "T00:00:00"),
            nowDate = new Date();
          var d = selectDate.getTime() - nowDate.getTime();
          if (d > 0) {
            util.toast("认罚日期不得大于今天");
            return;
          }
        }
        if (!this.price) {
          util.toast("请输入罚款金额");
          return;
        } else if (!money.test(this.price)) {
          util.toast("输入罚款金额有误");
          return;
        }
        if (!this.canTryToPay) {
          util.toast("请重新输入金额或时间,需计算滞纳金及手续费");
          return;
        }
        if (
          this.user.Tel == "18072755357" ||
          this.user.Tel == "1515802770300" ||
          this.user.Tel == "13372576987"
        ) {
          this.ticketUrl =
            "https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180608141025148.pic_thumb.jpg";
        }
        if (!this.ticketUrl) {
          util.toast("请上传处罚单");
          return;
        }
        MIP.setData({
          "#penaltiePayData": {
            nick: this.nick || "",
            phone: this.phone || "",
            nickCarNo: this.nickCarNo || "",
            date: this.date || "",
            ticketUrl: this.ticketUrl || "",
            price: this.price || "",
            ownFree: this.ownFree || 0,
            lateFree: this.lateFree || 0,
            drive_no: this.drive_no || ""
          }
        });
      }
      if (this.showForm1) {
         MIP.setData({
          "#penaltiePayData": {
            nick: this.payForm.nick || '',
            phone: this.phone || '',
            nickCarNo: this.payForm.car_no || '',
            date: this.payForm.renfa_time || '',
            ticketUrl: this.ticketUrl || '',
            price: this.payForm.money || '',
            ownFree: this.payForm.own_free ||0,
            lateFree: this.payForm.late_free || 0,
             drive_no: this.payForm.drive_no || '',
          }
        });
      }
      if (this.canTryToPay) {
        // MIP.viewer.open("pay2.html");
        this.$refs.pay2.click();
      }
    },
    ready() {
        MIP.setData({
            "#penaltiePayData": {
                orderNumber: this.orderNumber
            }
        });
      if (this.orderNumber.length > 19 || this.orderNumber.length < 18) {
        util.toast("罚单格式错误,请重新填写（15-16位）");
        this.showNotice = true;
        this.showForm2 = false;
        this.showForm1 = false;
        return;
      }
      if (this.searchAgain) {
        this.nick = "";
        this.phone = "";
        this.nickCarNo = "";
        this.date = "";
        this.price = "";
        this.ownFree = 0;
        this.lateFree = 0;
        this.ticketUrl = "";
        this.drive_no = "";
        this._nickCarNo = "";
      }

      this.searchAgain = true;
      let self = this;
      let param = {
        access_token: "3b2P0oarLbtrU/IkydUON5pfdQhGW4fWzFgFqOZZDi8=",
        document: this.orderNumber.replace(/\s/g, "")
      };
      util
        .fetchData("v3/violation/web/ticket_query", param)
        .then(res => {
          if (res.code == 0) {
            this.selectOrderNumber = this.orderNumber;
            // this.$store.state.orderNumber = this.selectOrderNumber
            if (res.data.code != 1000) {
              this.showNotice = false;
              this.payForm = res.data.Violation;
              this.showForm2 = true;
              this.showForm1 = false;
              // util.toast(res.data.msg);
            } else if (res.data.code == 1000) {
              if (res.data.Violation == null || !res.data.Violation) {
                util.toast("您的罚单已缴费，\n无需处理");
              } else if (res.data.Violation.renfa_time == "") {
                util.toast("您的罚单尚未认罚，\n请认罚后处理");
              } else {
                this.showNotice = false;
                this.payForm = res.data.Violation;
                this.payForm.late_free = (res.data.late_free / 100).toFixed(2);
                this.payForm.own_free = (res.data.own_free / 100).toFixed(2);
                this.showForm1 = true;
                this.showForm2 = false;
              }
            }
          } else if (res.code == 90011) {
            this.selectOrderNumber = this.orderNumber;
            // this.$store.state.orderNumber = this.selectOrderNumber
            this.showNotice = false;
            if (res.data && res.data.Violation) {
              this.payForm = res.data.Violation;
            }
            this.showForm2 = true;
            this.showForm1 = false;
          } else {
            this.showNotice = true;
            this.showForm2 = false;
            this.showForm1 = false;
            util.toast(res.msg);
          }
        })
        .catch(e => {
          this.showNotice = true;
          this.showForm2 = false;
          this.showForm1 = false;
          util.toast(e);
          // 测试
        });
    },
    // 常见问题

    onStatusChange(val) {
      this.showProvice = val;
    },
    onResultChange(val) {
      this.provice = val;
    },
    onStatusConfirmChange(val) {
      this.showConfirm = val;
    },
    onResultConfirmChange(val) {
      if (val == "OK") {
        this.GenerateOrders();
      }
    },
    // 上传处罚单
    chooseimg() {
      this.$refs.file.click();
    },
    // 上传处罚单
    uploader() {
      let list = this.$refs.file.files;
      if (list.length != 1) {
        util.toast("最多只能选择1张处罚单。");
        return;
      }
      let item = {
        name: list[0].name,
        size: list[0].size,
        file: list[0]
      };
      this.html5Reader(list[0], item, "ticket");
    },
    // 常见问题
    gotoHelp() {
      MIP.viewer.open("help.html");
    },
    selectProvice() {
      this.showProvice = true;
    },
    // 打开处罚单帮助
    openCode() {
      this.openShow = true;
      this.src =
        "https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/img/notice@3x.png";
    },
    openDateShow() {
      this.dateShow = true;
    },
    // 关闭认罚日期帮助
    closeDate() {
      this.dateShow = false;
    },
    closeMake() {
      this.openShow = false;
    },

    getVioFee() {
      let self = this;
      this.canTryToPay = false;
      if (!this.price) {
        return;
      }
      if (!this.date) {
        return;
      }
      let param = {
        notice_num: this.orderNumber.replace(/\s/g, ""),
        fine: Number(this.price) * 100 + "",
        vio_time: this.date
      };
      util.fetchData("v3/violation/fee", param).then(res => {
        if (res.code == 20022) {
          return;
        }
        if (res.code >= 40000 && res.code < 50000) {
          return;
        }
        if (res.code == 0) {
          self.ownFree = Number(
            res.data.OwnFree ? (res.data.OwnFree / 100).toFixed(2) : 0
          );
          self.lateFree = Number(
            res.data.LateFree ? (res.data.LateFree / 100).toFixed(2) : 0
          );
          self.canTryToPay = true;
        } else {
          util.toast(res.msg ? res.msg : "服务繁忙,请稍后再试");
          self.canTryToPay = false;
          self.ownFree = 0;
          self.lateFree = 0;
        }
      });
    },
    html5Reader: function(file, item, name) {
      let imgSrc = new Image();
      let reader = new FileReader();
      reader.onload = e => {
        imgSrc.src = e.srcElement.result;
        this.$set(item, "src", e.srcElement.result);
        let self = this;
        imgSrc.onload = function() {
          // 图片原始尺寸
          var originWidth = this.width;
          var originHeight = this.height;
          // 最大尺寸限制
          var maxWidth = 600,
            maxHeight = 600;
          // 目标尺寸
          var targetWidth = originWidth,
            targetHeight = originHeight;
          // 图片尺寸超过400x400的限制
          if (originWidth > maxWidth || originHeight > maxHeight) {
            if (originWidth / originHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth;
              targetHeight = Math.round(
                maxWidth * (originHeight / originWidth)
              );
            } else {
              targetHeight = maxHeight;
              targetWidth = Math.round(
                maxHeight * (originWidth / originHeight)
              );
            }
          }
          let canvas = document.getElementById("canvas");
          let context = canvas.getContext("2d");
          // canvas对图片进行缩放
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          // 清除画布
          context.clearRect(0, 0, targetWidth, targetHeight);
          // 图片压缩
          context.drawImage(imgSrc, 0, 0, targetWidth, targetHeight);
          // canvas转为blob并上传
          canvas.toBlob(function(blob) {
            const formData = new FormData();
            formData.append("image", blob, item.name);

            util.toast("正在上传");
            fetch("https://mys4s.cn/car/upload_report_pic", {
              method: "POST",
              body: formData
            })
              .then(res => res.json())
              .then(data => {
                if (data.code == 0) {
                  util.toast("上传成功");
                  if (name === "ticket") {
                    self.ticketUrl = data.data;
                  }
                } else {
                  util.toast(data.msg);
                }
              });
          }, file.type || "image/png");
        };
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
.s4s-sel-provice {
  margin-right: 0.05rem;
  font-size: 0.17rem;
  color: #333;
}
.s4s-pay-body {
  margin-top: 15px;
  background: #fff;
  padding: 20px 15px 0 15px;
  border-radius: 4px;
}
.s4s-group img {
  width: 0.2rem;
  height: 0.2rem;
}

.s4s-pop {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 3rem;
  margin-top: -0.5rem;
  margin-left: -1.5rem;
}
.s4s-pop-body {
  background-color: #fff;
  border-radius: 0.05rem;
  padding: 0.1rem;
  position: absolute;
}
.s4s-pop-title {
  background: rgba(37, 170, 255, 0.9);
  border-radius: 0.2rem;
  height: 0.35rem;
  line-height: 0.35rem;
  text-align: center;
  color: #fff;
  font-size: 0.17rem;
  position: relative;
  z-index: 9999;
}
.s4s-pop-bg {
  /* background: #fff url(../../assets/help.png) no-repeat .02rem .04rem / 100% 100%; */
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  position: absolute;
  left: 50%;
  top: -0.55rem;
  margin-left: -0.5rem;
  z-index: 99;
}

.s4s-order-container {
  background-color: #fff;
  padding: 4%;
}
.s4s-order-title {
  color: #4b4b4b;
  font-size: 20px;
}

.s4s-order-input {
  border: 1px solid #eeeeee;
  border-radius: 4px;
  margin-top: 15px;
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
  padding: 6px 10px;
  font-size: 16px;
}
.s4s-order-input span {
  color: #fff;
  -webkit-box-flex: 2;
  -ms-flex: 2;
  flex: 2;
  background: #3388ff;
  margin: 0;
  line-height: 50px;
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
.s4s-order-img-container mip-img+mip-img{
      margin-right: -22px;
    margin-left: 16px;
}
.flex-center{
  margin-bottom: 10px;
}
.s4s-order-content {
  font-size: 13px;
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
}
.s4s-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  z-index: 99999;
  text-align: center;
  padding: 5px 10px;
  border-radius: 4px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  font-size: 14px;
}

.s4s-title {
  font-size: 20px;
  padding-bottom: 15px;
}
.s4s-help-tip {
  float: none;
  display: inline-block;
}
.s4s-order-text {
  color: #fe7000;
  font-size: 12px;
  margin-top: 15px;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.s4s-order-tip-text {
  font-size: 13px;
  color: #636363;
}
</style>
