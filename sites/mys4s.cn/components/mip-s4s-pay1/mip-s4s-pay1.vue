<template>
    <div class="s4s-page">
        <div class="s4s-body" style="padding: 0;">
            <div class="s4s-tips">
                 <mip-img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/car.png" width="60" height="50" ></mip-img>
                <div class="s4s-tips-right">
                    <p>交通违法代缴的办理周期为<span style="color:#FE7000">1-2个工作日，部分地区2-5个工作日</span>，需年检用户如需当日处理完成，请勿下单。其他问题请参见
                    <a data-type="mip" href="help.html" style="text-decoration: underline;" >常见问题</a>
                    <!-- <span style="text-decoration: underline;" @click="gotoHelp">常见问题</span> -->
                    。</p>
                </div>
            </div>
            <div style="display:none">
                <canvas id="canvas" width="0px" height="0px" style="dispaly: none"></canvas>
            </div>
           
            <div  class="s4s-pay-body">
                 <div class="s4s-title">违章详情</div>
                <div class="s4s-group" v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.drive_no == 1">
                    <span class="s4s-group-tit">驾驶证号</span>
                    <input type="idcard" v-model="driveNo" placeholder="请输入驾驶证号码" />
                </div>
                <div class="s4s-group" v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.drive_file_number == 1">
                    <span class="s4s-group-tit">驾驶证档案编号</span>
                    <input type="idcard" v-model="drive_file_number" placeholder="请输入驾驶证档案编号" />
                </div>
                <div class="s4s-group" v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.drive_bar_code == 1">
                    <span class="s4s-group-tit">驾驶证条形码编号</span>
                    <input type="idcard" v-model="drive_bar_code" placeholder="请输入驾驶证条形码编号" />
                </div>

                <div class="s4s-group" v-if="!this.user.Tel || refillTel">
                    <span class="s4s-group-tit">手机号码</span>
                        <input type="text" v-model="phone" style="width:auto;max-width:300px;min-width:105px" placeholder="请输入手机号码" />
                        <span v-if ="!cansend" type="button" style="background-color: #fff; color: #666;border:0;border-radius:3px;margin-left:5px;font-size:0.14rem" disabled>{{btntext}}</span>
                        <span type="button" v-show="btnenable && cansend" @click="sendcode" style="background-color: #fff; color: #108ee9;border:0;border-radius:3px;margin-left:5px;font-size:0.14rem">发送验证码</span>
                </div>
                <div class="s4s-group">
                    <span class="s4s-group-tit" >验证码</span>
                    <input type="text" v-model="code" placeholder="请输入短信验证码" />
                </div>
                
                <div class="s4s-group"  v-if="!(!this.user.Tel || !refillTel)">
                    <span class="s4s-group-tit" >手机号码</span>
                    <span class="s4s-group-tit" style="width:auto;"  >{{this.phone ? this.phone : (this.user.Tel || '-')}}</span>
                    <span @click="refillTelClick" style="color:#108ee9;margin-left:5px;font-size:0.14rem">更换</span>
                </div>
                 <div class="s4s-group">
                    <span class="s4s-group-tit">车牌号码</span>
                    <span class="s4s-group-txt">{{ illegal.car_no||illegal.CarNo }}</span>
                </div>
                <div class="s4s-group">
                    <span class="s4s-group-tit">认罚日期</span>
                    <span class="s4s-group-txt">{{ date }}</span>
                </div>
                
               
                <div class="s4s-group group-upload" v-if="(illegal.FreeRuleObject && illegal.FreeRuleObject.drive_licence == 1) || (illegal.FreeRuleObject && illegal.FreeRuleObject.travel_licence == 1)">
                    <span class="s4s-group-tit">上传行驶证</span>
                    <div style="display: flex;flex: 1;">
                        <template v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.drive_licence == 1">
                            <div @click="chooseImage"  class="group-upload-margin" >
                                <!-- <span class="s4s-chooseimg">正面</span> -->
                                <mip-img  v-if="driveUrl" :src="driveUrl"  styel="width:100%;" ></mip-img>
                                <mip-img v-else styel="width:100%;" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/upload.png" ></mip-img>
                                <input type="file" accept="image/*" @change="uploader" ref="file" multiple="multiple" style="display: none;">
                            </div>
                        </template>
                        <template v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.travel_licence == 1">
                            <div  @click="chooseTravel"  class="group-upload-margin" >
                                <!-- <span class="s4s-chooseimg" style="margin-left: 20px;">反面</span> -->
                                <mip-img v-if="travelUrl" :src="travelUrl"  styel="width:100%;" ></mip-img>
                                <mip-img v-else styel="width:100%;" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/upload2.png" ></mip-img>
                                <input type="file" accept="image/*" @change="uploaderXSZTravel" ref="XSZTravel" multiple="multiple" style="display: none;">
                            </div>
                        </template>
                    </div>
                </div>
                <div class="s4s-group" v-if="(illegal.FreeRuleObject && illegal.FreeRuleObject.jsz_drive_licence == 1) || (illegal.FreeRuleObject && illegal.FreeRuleObject.jsz_travel_licence == 1)">
                    <span class="s4s-group-tit">上传驾驶证</span>
                    <div style="display: flex;flex: 1;">
                        <template v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.jsz_drive_licence == 1">
                            <mip-img v-if="JSZDriveUrl" @click="chooseJSZDrive" :src="JSZDriveUrl" style="width: .40rem;height: .40rem;margin: .05rem 0;" ></mip-img>
                            <div v-show="!JSZDriveUrl" @click="chooseJSZDrive" class="group-upload-margin">
                                <span class="s4s-chooseimg">正面</span>
                                <input type="file" accept="image/*" @change="uploaderJSZDrive" ref="JSZDrive" multiple="multiple" style="display: none;">
                            </div>
                        </template>
                        <template v-if="illegal.FreeRuleObject && illegal.FreeRuleObject.jsz_travel_licence == 1">
                            <mip-img v-if="JSZTravelUrl" @click="chooseJSZTravel" :src="JSZTravelUrl" style="width: .40rem;height: .40rem;margin: .05rem 0 .05rem .10rem;" ></mip-img>
                            <div v-show="!JSZTravelUrl" @click="chooseJSZTravel" class="group-upload-margin">
                                <span class="s4s-chooseimg" style="margin-left: 20px;">反面</span>
                                <input type="file" accept="image/*" @change="uploaderJSZTravel" ref="JSZTravel" multiple="multiple" style="display: none;">
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="s4s-pay-body">
            <div class="s4s-title">订单详情</div>
                <div class="s4s-group"><span class="s4s-group-tit">罚款金额</span><span class="s4s-group-txt" style="color:#333">¥ {{ price || 0  }}</span>
                </div>
                  <div class="s4s-group">
                    <span class="s4s-group-tit">服务费用</span><span class="s4s-group-txt" style="color:#FE7000">¥ {{ ownFree || 0 }}</span>
                </div>
            </div>
           
            <!-- <div class="s4s-sum"> 服务费:  -->
                <!-- <span style="text-decoration:line-through;" v-if="price"> {{ ownFree + 5 || 5 }}</span> -->
                <!-- <span> ¥ {{ ownFree || 0 }}</span> -->
                <!-- <span style="width:auto;color:#959595;font-size:0.12rem;margin-left:0.10rem" v-if="price">已优惠5元</span> -->
            <!-- </div> -->
            <a href="#" ref="newWeb"></a>
            <div class="agree-container" >
                <p><mip-img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/disagree.png" v-show="!agree" width="25" height="25" @click="goAgree" ></mip-img>
                <mip-img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree.png" v-show="agree" width="25" height="25" @click="goAgree" ></mip-img>
                我同意
                <a data-type="mip" href="agreement.html" style="color: #666666;text-decoration:underline" >《服务协议》</a>
                <!-- <span style="color: #666666;text-decoration:underline" @click="gotoAgreement">《服务协议》</span> -->
                中的说明</p>
            </div>
            <!-- <button class="s4s-btn" v-if="(!user.Tel || refillTel)" @click="payFee"> 支付金额{{ (((price * 100 + ownFree * 100 + lateFree * 100) || 0) / 100).toFixed(2) }}元 | 立即办理 </button> -->
            <div style="height:60px;"></div>
            <div class="pay-contaienr">
                <div>
                    <p>合计金额：<span>¥ {{ (((price * 100 + ownFree * 100 + lateFree * 100) || 0) / 100).toFixed(2) }}</span></p>
                    <p>预计1-5个工作日办理完成 </p>
                </div>
                <div :class="agree?'' :'disabled-btn'" @click="payFee" >
                    <button > 立即办理</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import util from '../../common/util';

export default {
    data() {
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
            travelUrl:'',
            user: {},
            tel: '',
            phone: '',
            JSZTravelUrl: '',
            JSZDriveUrl:'',
            notify: null,
            showConfirm: false,
            timer: null,
            out_trade_no: '',
            paysrc: '',
            showpay: false,
            system:{},
            payType:'alipay',
            drive_bar_code: '',
            drive_file_number: '',
            agree:false,
        }
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
    mounted() {
        console.log(this.globalData)
        this.illegal = this.globalData;
        this.price = this.globalData.Fine;
        this.date = this.globalData.OccTime&&this.globalData.OccTime.substring(0, 10);
        this.getNotify();
        this.getVipFee()
    },
    methods: {
        // 常见问题
        gotoHelp() {
         MIP.viewer.open("help.html");
        },
        goAgree(){
            console.log(this.agree)
            this.agree = !this.agree
        },
        // 服务协议
        gotoAgreement() {
          MIP.viewer.open("agreement.html");
        },
        // 上传行驶证正面
        chooseImage() {
            this.$refs.file.click();
        },
        // 上传行驶证反面
        chooseTravel() {
            this.$refs.XSZTravel.click();
        },
        // 上传驾驶证正面
        chooseJSZDrive() {
            this.$refs.JSZDrive.click();
        },
        // 上传驾驶证正面
        chooseJSZTravel() {
            this.$refs.JSZTravel.click();
        },
        // 上传行驶证正面照
        uploader() {
            let list = this.$refs.file.files;
            if (list.length != 1) {
                util.toast('最多只能选择1张行驶证。');
                return
            }
            
            let item = {
                name:list[0].name,
                size:list[0].size,
                file:list[0]
            }
            this.html5Reader(list[0],item,'driveUrl')
        },
        // 上传行驶证正面照
        uploaderXSZTravel() {
            let list = this.$refs.XSZTravel.files;
            if (list.length != 1) {
                util.toast('最多只能选择1张行驶证。');
                return
            }
            
            let item = {
                name:list[0].name,
                size:list[0].size,
                file:list[0]
            }
            this.html5Reader(list[0],item,'travelUrl')
        },
        // 上传驾驶证正面照
        uploaderJSZDrive() {
            let list = this.$refs.JSZDrive.files;
            if (list.length != 1) {
                util.toast('最多只能选择1张驾驶证。');
                return
            }
            
            let item = {
                name:list[0].name,
                size:list[0].size,
                file:list[0]
            }
            this.html5Reader(list[0],item,'JSZDrive')
        },
        // 上传驾驶证正面照
        uploaderJSZTravel() {
            let list = this.$refs.JSZTravel.files;
            if (list.length != 1) {
                util.toast('最多只能选择1张驾驶证。');
                return
            }
            
            let item = {
                name:list[0].name,
                size:list[0].size,
                file:list[0]
            }
            this.html5Reader(list[0],item,'JSZTravel')
        },
        html5Reader: function(file, item, name) {
            let imgSrc = new Image();
            let reader = new FileReader();
            reader.onload = (e) => {
                imgSrc.src = e.srcElement.result;
                this.$set(item, 'src', e.srcElement.result);
                let self = this;
                imgSrc.onload = function() {
                    // 图片原始尺寸
                    var originWidth = this.width;
                    var originHeight = this.height;
                    // 最大尺寸限制
                    var maxWidth = 600, maxHeight = 600;
                    // 目标尺寸
                    var targetWidth = originWidth, targetHeight = originHeight;
                    // 图片尺寸超过400x400的限制
                    if (originWidth > maxWidth || originHeight > maxHeight) {
                        if (originWidth / originHeight > maxWidth / maxHeight) {
                            // 更宽，按照宽度限定尺寸
                            targetWidth = maxWidth;
                            targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                        } else {
                            targetHeight = maxHeight;
                            targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                        }
                    }
                    let canvas = document.getElementById('canvas');
                    let context = canvas.getContext('2d');
                    // canvas对图片进行缩放
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    // 清除画布
                    context.clearRect(0, 0, targetWidth, targetHeight);
                    // 图片压缩
                    context.drawImage(imgSrc, 0, 0, targetWidth, targetHeight);
                    // canvas转为blob并上传
                    canvas.toBlob(function (blob) {
                    //    var b = {
                    //         file: blob,
                    //         name: item.name,
                    //         size: blob.size,
                    //         src: imgSrc.src
                    //     }
                        const formData = new FormData();
                        formData.append("image", blob, item.name);

                        // const formData = new FormData();
                        // formData.append("image", file);

                        util.toast("正在上传");

                        fetch('https://mys4s.cn/car/upload_report_pic',{
                            method: "POST",
                            body: formData ,
                        }).then(res=>res.json()).then(data=>{
                            if(data.code == 0) {
                                    util.toast("上传成功");
                                    if(name === 'ticket') {
                                        self.ticketUrl = data.data
                                    }else if(name === 'JSZTravel') {
                                        self.JSZTravelUrl = data.data
                                    }else if(name === 'JSZDrive') {
                                        self.JSZDriveUrl = data.data
                                    }else if(name === 'travelUrl') {
                                        self.travelUrl = data.data
                                    }else if(name === 'driveUrl') {
                                        self.driveUrl = data.data
                                    }
                                } else {
                                    util.toast(data.msg);
                                }
                        })
                    },file.type ||  'image/png');
                }
            }
            reader.readAsDataURL(file);
        },
        // 支付
        payFee() {
            if(!this.agree){
                return
            }
            let drivenoReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            let telReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
            if(!this.user.Tel) {
                if (!telReg.test(this.phone)) {
                    util.toast('请输入正确的手机号码');
                    return;
                }
            }
            if(this.user.Tel == '18072755357' || this.user.Tel == '1515802770300' || this.user.Tel == '13372576987'){
                this.driveUrl = 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180608141025148.pic_thumb.jpg'
                this.travelUrl = 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180608141025148.pic_thumb.jpg'
                this.JSZDriveUrl = 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180608141025148.pic_thumb.jpg'
                this.JSZTravelUrl = 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180608141025148.pic_thumb.jpg'
            }
            if(this.illegal.FreeRuleObject && this.illegal.FreeRuleObject.drive_no == 1) {
                if(!this.driveNo) {
                    util.toast('请输入驾驶证号');
                    return;
                }else if (!drivenoReg.test(this.driveNo)) {
                    util.toast('请输入正确的驾驶证号');
                    return;
                }
            }
            if(this.illegal.FreeRuleObject && this.illegal.FreeRuleObject.drive_file_number == 1) {
                if (!this.drive_file_number) {
                    util.toast('请输入驾驶证档案编号');
                    return;
                }
            }
            if(this.illegal.FreeRuleObject && this.illegal.FreeRuleObject.drive_bar_code == 1) {
                if (!this.drive_bar_code) {
                    util.toast('请输入驾驶证条形码编号');
                    return;
                }
            }
            if(this.illegal.FreeRuleObject && this.illegal.FreeRuleObject.drive_licence == 1) {
                if (!this.driveUrl) {
                    util.toast('请先上传行驶证正面照');
                    return;
                }
            }
            if(this.illegal.FreeRuleObject && this.illegal.FreeRuleObject.travel_licence == 1) {
                if (!this.travelUrl) {
                    util.toast('请先上传行驶证反面照');
                    return;
                }
            }
            if(this.illegal.FreeRuleObject && this.illegal.FreeRuleObject.jsz_drive_licence == 1) {
                if (!this.JSZDriveUrl) {
                    util.toast('请先上传驾驶证正面照');
                    return;
                }
            }
            if(this.illegal.FreeRuleObject && this.illegal.FreeRuleObject.jsz_travel_licence == 1) {
                if (!this.JSZTravelUrl) {
                    util.toast('请先上传驾驶证反面照');
                    return;
                }
            }
            if (this.notify && this.notify.status) {
                this.showConfirm = true;
            } else {
                this.GenerateOrders();
            }
        },
        // 提交订单
        GenerateOrders() {
            let self = this;
            let price = Number(this.price * 100)
            let totalPrice = Number(price + Math.round(this.ownFree * 100) + Math.round(this.lateFree * 100))
            let param = {
                formid: '',
                fine: price, // 罚金
                lateFree:this.lateFree? Math.round(this.lateFree * 100) : 0,
                ownFree: Math.round(this.ownFree * 100), // 服务费
                totalPrice: totalPrice, // 总金额
                vio_time: this.date, // 文章时间：格式：2017-12-13
                carno: this.illegal.CarNo || '',
                vio_id: this.illegal.ViolationId || '',
                mobile: this.phone || window.localStorage.UserTelAll,
                drive_no: this.driveNo || '',  // 驾驶证号
                drive_url: this.driveUrl || '', // 行驶证正面
                travel_url: this.travelUrl || '', // 行驶证反面
                jsz_drive_url: this.JSZDriveUrl || '', // 驾驶证正面
                jsz_travel_url: this.JSZTravelUrl || '', // 驾驶证反面
                vin: this.illegal.vin || '',
                engion: this.illegal.engion || '',
                drive_bar_code: this.drive_bar_code || '',
                drive_file_number: this.drive_file_number || '',
                car_type:window.localStorage.car_type || ''
            }
            if(this.payType === 'wechat_web') {
                param.pay_method ='wechat_web'
                var ua = navigator.userAgent.toLowerCase();
                if(!self.system.win&&!self.system.mac&&!self.system.xll){
                    if(ua.match(/MicroMessenger/i)=="micromessenger") {
                        param.pay_method ='wechat_app'
                     }else {
                         param.pay_method ='wechat_h5'
                     }
                }
            }
           util.fetchData('v3/violation/web/order/create', param).then((res) => {
                if(res.code == 20022) {
					self.$router.replace({
						path: '/login',
						query: {
                            redirect: '/ticketPay',
                            id: self.$route.query.id
						}
					})
					return;
				}
                if (res.code >= 40000 && res.code < 50000) {
                    self.$router.replace({
                        path: '/login',
                        query: {
                            redirect: '/ticketPay',
                            id: self.$route.query.id
                        }
                    });
                    return;
                }
                if (res.code == 0) {
                    if(self.system.win||self.system.mac||self.system.xll){//如果是电脑跳转到
                        // window.location.href = res.data.CodeImg
                        self.paysrc = this.payType === 'wechat_web' ? res.data.CodeImg : res.data.qr_code_img
                        self.out_trade_no = res.data.out_trade_no
                        self.showpay = true
                        self.timer = setInterval(self.getPayStatus, 1000)
                            // window.location.href="#";  
                    }else{  //如果是手机,跳转到
                        if(self.payType === 'wechat_web'){
                            // window.location.href = res.data.MwebUrl
                           
                        }else{
                            window.location.href = res.data.qr_code
                        }
                    }
                } else {
                    util.toast(res.msg);
                }
            });
        },
        // 获取公告
        getNotify() {
            let self = this;
            util.fetchData('v2/car/vio_notify').then(( res) => {
                if (res.code == 0) {
                    self.notify = res.data;
                    // self.notify = {
                    //     notify: '测试',
                    //     status: true
                    // }
                }
            });
        },
        getVipFee() {
            let self = this;
            console.log(this.illegal)
            util.fetchData('v3/violation/fee',{
                vio_id: this.illegal.ViolationId,
                car_no: this.illegal.car_no||this.illegal.CarNo,
                fine: Number(this.price * 100)+''
            }).then((res) => {
                if (res.code == 0) {
                    this.lateFree = res.data.LateFree ? Number((res.data.LateFree / 100).toFixed(2)) : 0
                    this.ownFree = res.data.OwnFree ? Number((res.data.OwnFree / 100).toFixed(2)) : 0
                }
            });
        }
    }
}
</script>

<style scoped>
.s4s-tips {
    background: #fff;
    border-radius: .07rem;
    padding: 4%;
    font-size: .14rem;
    color: #4B4B4B;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}



.s4s-tips-right {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-left: .15rem;
    line-height: 150%;
}

.s4s-pay-body {
    background: #fff;
    padding: 0 4%;
    margin-top:15px;
}

.s4s-group img {
    width: .20rem;
}

.s4s-sum {
    margin: .20rem .10rem 0 .10rem;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: left;
    font-size: .13rem;
    color: #4B4B4B;
}

.s4s-sum span {
    color: #f40;
    padding-right: .05rem;

}

.s4s-chooseimg {
    padding: .02rem .04rem;
    color: #0086C6;
    font-size: .16rem;
    float: right;
}

.s4s-group {
  height: 32px;
  border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
  color: #666;
  overflow: hidden;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
    padding: 15px 0px;
  box-sizing: content-box;
}
.s4s-group-tit {
  font-size: 15px;
  width: 90px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.s4s-group-txt {
  font-size: 15px;
  color: #777;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.s4s-group input {
  border: none;
  font-size: 15px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: left;
}
select {
  font-size: 15px;
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
.s4s-body {
    max-width: 700px;
    margin: 0 auto;
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
   
}
.s4s-title{
  font-size:20px;
      padding-top: 15px;
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
.agree-container{
    font-size: 15px;
    color:#999999;
}
.agree-container p{
    padding: 15px;
}
.agree-container mip-img{
        vertical-align: bottom;
}

.pay-contaienr{
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
}
.pay-contaienr>div:first-child{
    flex:1;
    font-size: 16px;
        display: flex;
    flex-direction: column;
    justify-content: center;
        padding: 0 10px;
}
.pay-contaienr span {
    color:#FE7000;
}
.pay-contaienr button {
    color:#fff;
    font-size: 18px;
    font-weight: 300;
}
.pay-contaienr p:last-child{
    color:#999;
    font-size: 11px;
}
.pay-contaienr>div:last-child{
    width:120px;
    background-image: linear-gradient(40deg, #FE5A00 0%, #FF7C00 100%);
    text-align: center;
    line-height: 50px;
    font-size: 18px;
}
.pay-contaienr .disabled-btn{
    background: #E6E6E6!important;
}
.pay-contaienr .disabled-btn button{
    color: #999999;
}

.group-upload{
    height: auto;
}
.group-upload-margin{
        margin: 10px 15px 10px 0;
    flex:1;
}
</style>
