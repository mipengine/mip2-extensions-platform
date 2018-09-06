<template>
    <div class="fpxx clearfix">
        <div class="tit clearfix">
            <div class="tit-left fl pr"><i class="dian abs"></i>发票类型</div>
            <span class="tit-right fr" @click="showPop">发票说明 ></span>
        </div>
        <ul class="ztop clearfix" id="fir_invoiceUl">
            <li class="one invoiceTypeLi" invoiceType="-1" @click="getType($event,'invoiceType')">不开发票</li>
            <li id="dz_tag_li" invoiceType="3" class="on invoiceTypeLi" style="display: none;" @click="getType($event,'invoiceType')">电子发票<br><em>（普票，可报销凭证）</em></li>
            <li id="pt_tag_li" invoiceType="1" class="invoiceTypeLi" style="display: none;" @click="getType($event,'invoiceType')">纸质发票<br><em>（普票）</em></li>
            <li id="zzs_tag_li" invoiceType="4" class="m0 invoiceTypeLi"  style="display: none;" @click="getType($event,'invoiceType')">增值税<br>发票</li>
        </ul>
        <div class="zbot" id="fir_invoiceDiv" v-show="invoiceType != -1">
            <div class="tit clearfix persional">
                <div class="tit-left fl pr">
                    <i class="dian abs"></i>
                    <div id="fir_invoiceTag" v-if="invoiceType == 3">电子发票</div>
                    <div id="fir_invoiceTag" v-if="invoiceType == 1">普通发票</div>
                    <div id="fir_invoiceTag" v-if="invoiceType == 4">增值税发票</div>
                </div>
            </div>
            <ul class="stop clearfix persional" id="fir_invoiceClass_ul" v-show="invoiceType != 4">
                <li class="fl fir_invoiceClass" invoiceClass="2" @click="getType($event,'invoiceClass')">单位</li>
                <li class="fr on fir_invoiceClass fir_invoiceClassDefault" invoiceClass="1" @click="getType($event,'invoiceClass')">个人</li>
            </ul>
            <div class="ssr persional">
                <input name="" type="text" v-if="invoiceType != 4 && invoiceClass == 1" placeholder="个人" class="txt" id="fir_invoiceTitle" :value="invoiceCertification ? invoiceCertification.unitName : invoiceCertification"/>
                <input name="" type="text" v-if="(invoiceType != 4 && invoiceClass == 2) || invoiceType == 4" placeholder="单位名称" class="txt" id="fir_invoiceTitle" :value="invoiceCertification ? invoiceCertification.unitName : invoiceCertification"/>
            </div>
            <div class="ssr" v-if="invoiceType == 4 || invoiceClass == 2">
                <input name="" type="text" placeholder="纳税人识别号" class="txt" id="fir_taxpayerNumber" :value="invoiceCertification ? invoiceCertification.taxpayerNumber : invoiceCertification"/>
            </div>
            <ul class="stop clearfix persional" id="invoiceItem_ul" v-show="invoiceType == 3">
                <li class="fl invoiceItem" value="0" @click="getType($event,'invoiceItem')">商品明细</li>
                <li class="fr invoiceItem on" value="1" @click="getType($event,'invoiceItem')">商品类别</li>
            </ul>
            <div class="swxts" v-if="invoiceType == 4 || invoiceClass == 2">
                <p class="swxts-t">温馨提示</p>
                <p class="swxts-b">三证合一后，部分地区税务系统中的 纳税人识别号不会自动升级为18位，为了不影响您正常报销，请再次与贵单位财务确认当前使用的纳税人识别号。</p>
            </div>
            <p class="szs" v-if="invoiceType == 4 || invoiceClass == 2">注：电子发票可用于报销，一旦开具不予更换。电子发票申请成功后，可到“我的网校我的家”发票索取页面打印/下载。</p>
            <div class="ssr" v-if="invoiceType == 4 || invoiceClass == 2">
                <input name="" type="text" id="fir_regAddress" placeholder="注册地址"  class="txt" :value="invoiceCertification ? invoiceCertification.regAddress : invoiceCertification"/>
            </div>
            <div class="ssr" v-if="invoiceType == 4 || invoiceClass == 2">
                <input name="" type="text" id="fir_regPhone" placeholder="注册电话"  class="txt" :value="invoiceCertification ? invoiceCertification.regPhone : invoiceCertification"/>
            </div>
            <div class="ssr" v-if="invoiceType == 4 || invoiceClass == 2">
                <input name="" type="text" id="fir_bankName" placeholder="开户银行"  class="txt" :value="invoiceCertification ? invoiceCertification.bankName : invoiceCertification"/>
            </div>
            <div class="ssr" v-if="invoiceType == 4 || invoiceClass == 2">
                <input name="" type="text" id="fir_bankAccount" placeholder="银行账户"  class="txt" :value="invoiceCertification ? invoiceCertification.bankAccount : invoiceCertification"/>
            </div>
        </div>
        <div id="sec_invoiceDiv" v-if="invoiceType == 4 && isHasSecondInvoice == true">
            <p class="szs" style="color: red;">·根据国家政策纸质书目前处于免税状态，不能开具专用发票，请填写纸质书所需以下发票信息</p>
            <div class="tit clearfix">
                <div class="tit-left fl pr"><i class="dian abs"></i>发票信息</div>
            </div>
            <ul class="ztop clearfix" id="sec_invoiceUl">
                <li class="on invoiceTypeLi" sec_invoiceType="3" @click="getSecondType($event,'sec_invoiceType')">电子发票<br><em>可报销凭证</em></li>
                <li class="invoiceTypeLi" sec_invoiceType="1" @click="getSecondType($event,'sec_invoiceType')">纸质发票<br><em>普通发票</em></li>
            </ul>
            <div class="zbot" id="sec_invoiceDiv_Chi">
                <div class="tit clearfix persional">
                    <div class="tit-left fl pr">
                        <i class="dian abs"></i>
                        <div v-if="sec_invoiceType == 3">电子发票</div>
                        <div v-if="sec_invoiceType == 1">普通发票</div>
                    </div>
                </div>
                <ul class="stop clearfix persional" id="sec_invoiceClass_ul">
                    <li class="fl sec_invoiceClass" sec_invoiceClass="2"  @click="getSecondType($event,'sec_invoiceClass')">单位</li>
                    <li class="fr on sec_invoiceClass" sec_invoiceClass="1"  @click="getSecondType($event,'sec_invoiceClass')">个人</li>
                </ul>
                <div class="ssr persional">
                    <input name="" type="text" v-if="sec_invoiceClass == 1" placeholder="个人" class="txt" id="sec_invoiceTitle" :value="invoiceCertification ? invoiceCertification.unitName : invoiceCertification"/>
                    <input name="" type="text" v-if="sec_invoiceClass == 2" placeholder="单位名称" class="txt" id="sec_invoiceTitle" :value="invoiceCertification ? invoiceCertification.unitName : invoiceCertification"/>
                </div>
                <div class="ssr" v-if="sec_invoiceClass == 2">
                    <input name="" type="text" placeholder="纳税人识别号" class="txt" id="sec_taxpayerNumber" :value="invoiceCertification ? invoiceCertification.taxpayerNumber : invoiceCertification"/>
                </div>
                <div class="swxts" v-if="sec_invoiceClass == 2">
                    <p class="swxts-t">温馨提示</p>
                    <p class="swxts-b">三证合一后，部分地区税务系统中的 纳税人识别号不会自动升级为18位，为了不影响您正常报销，请再次与贵单位财务确认当前使用的纳税人识别号。</p>
                </div>
                <p class="szs" v-if="sec_invoiceClass == 2">注：电子发票可用于报销，一旦开具不予更换。电子发票申请成功后，可到“我的网校我的家”发票索取页面打印/下载。</p>
                <div class="ssr" v-if="sec_invoiceClass == 2">
                    <input name="" type="text" id="sec_regAddress" placeholder="注册地址"  class="txt" :value="invoiceCertification ? invoiceCertification.regAddress : invoiceCertification"/>
                </div>
                <div class="ssr" v-if="sec_invoiceClass == 2">
                    <input name="" type="text" id="sec_regPhone" placeholder="注册电话"  class="txt" :value="invoiceCertification ? invoiceCertification.regPhone : invoiceCertification"/>
                </div>
                <div class="ssr" v-if="sec_invoiceClass == 2">
                    <input name="" type="text" id="sec_bankName" placeholder="开户银行"  class="txt" :value="invoiceCertification ? invoiceCertification.bankName : invoiceCertification"/>
                </div>
                <div class="ssr" v-if="sec_invoiceClass == 2">
                    <input name="" type="text" id="sec_bankAccount" placeholder="银行账户"  class="txt" :value="invoiceCertification ? invoiceCertification.bankAccount : invoiceCertification"/>
                </div>
            </div>
        </div>
        <span class="han" id="saveInvoice" @click="savaClick">确　定</span>
        <span class="han" id="saveInvoiceDis" style="display: none;">确　定</span>
        <!--发票说明弹框-->
        <div class="mask" @click="closePop"></div>
        <div class="fptk clearfix pr">
            <span class="colse abs"  @click="closePop"></span>
            <div class="tit">发票说明</div>
            <div class="cen">
                <p><em>注：</em>(1) 电子发票请仔细填写发票抬头，税务局指定网站"瑞宏网<a href="http://www.e-inv.cn">http://www.e-inv.cn</a>"查询发票信息，电子发票可用于报销。申请电子发票后，不予开具纸质发票;请用PDF阅读器打开电子发票。</p>
                <p>(2) 纸质发票请详细填写发票抬头、邮寄地址、邮编、收件人、手机号。如果是单位地址，请写单位全称；如果是家庭住址，请写楼层门牌号;</p>
                <p>(3) 学习卡支付学费的发票需联系购卡点索取；</p>
                <p>(4) 索取电子/纸质发票请到我的网校我的家"发票索取"页面申请（<a href="${invoiceUrl }">去索取>></a>），时限为购买网校辅导课程或图书后一年内，逾期不予办理；</p>
                <p>(5) 收到发票后请妥善保管，涉及退款的课程申请返款时须退还原发票；</p>
                <p>(6) 非纸质图书商品，可开具增值税专用发票；</p>
                <p>(7) 纸质发票、增值税专用发票需以快递方式进行邮寄，快递邮寄方式产生的费用需自行承担且邮寄时间为1-6天（购纸质书的同时申请发票的情况除外）。</p>
            </div>
        </div>
    </div>
</template>

<script>
import { getCookie, setCookie } from "../../common/utils/cookie";
import { Toast } from "../../common/utils/toast";
import {
  getInvoiceInfo,
  saveInvoiceInfo,
  noInvoiceInfo
} from "../../common/api";
import { getUrlParams, gotoUrl } from "../../common/utils";

export default {
  data() {
    return {
      invoiceType: 3,
      sec_invoiceType: 3,
      invoiceClass: 1,
      sec_invoiceClass: 1,
      invoiceTitle: "",
      sec_invoiceTitle: "",
      taxpayerNumber: "",
      sec_taxpayerNumber: "",
      invoiceCertification: {},
      invoiceTypeList: [],
      isHasSecondInvoice: false,
      isValid: true,
      regAddress: "",
      sec_regAddress: "",
      regPhone: "",
      sec_regPhone: "",
      bankName: "",
      sec_bankName: "",
      bankAccount: "",
      bankAccount2: "",
      invoiceItemIndex: "",
      orderId: "",
      memberId: "",
      uid: "",
      saveType: "",
      invoiceTypeStr: "",
      sec_invoiceTypeStr: "",
      invoiceTypeCookieObj: "",
      shopMemPostInfo: ""
    };
  },
  async mounted() {
    const that = this;
    if (getCookie("username") != "") that.memberId = getCookie("username");
    if (getCookie("cdeluid") != "") that.uid = getCookie("cdeluid");
    if (getCookie("orderId") != "") that.orderId = getCookie("orderId");
    if (getCookie("invoiceType") != "")
      that.invoiceTypeCookieObj = getCookie("invoiceType");
      let setting = {
        orderId: that.orderId,
        saveType: "2",
        invoiceTypeStr: that.invoiceTypeCookieObj,
        hasBook: "1"
      }
    await getInvoiceInfo(setting).then(invoiceData => {
      if (
        invoiceData.invoiceCertification != "" ||
        invoiceData.invoiceCertification != undefined
      ) {
        that.invoiceCertification = invoiceData.invoiceCertification;
      }
      if (invoiceData.isHasSecondInvoice == 1) {
        that.isHasSecondInvoice = true;
      }
      invoiceData.invoiceTypeList.forEach((item, index) => {
        if (item == 4) {
          document.querySelector("#zzs_tag_li").style.display = "block";
        } else if (item == 1) {
          document.querySelector("#pt_tag_li").style.display = "block";
        } else if (item == 3) {
          document.querySelector("#dz_tag_li").style.display = "block";
        }
      });
    });
  },
  methods: {
    closePop() {
      document.querySelector('.mask').style.display = "none"
      document.querySelector('.fptk').style.display = "none"
    },
    showPop() {
      document.querySelector('.mask').style.display = "block"
      document.querySelector('.fptk').style.display = "block"
    },
    getType(e, type) {
      let fir_invoiceClassDefault = document.querySelector(
        ".fir_invoiceClassDefault"
      );
      let fir_invoiceUl_li = document.querySelectorAll(
        "#fir_invoiceUl .invoiceTypeLi"
      );
      let fir_invoiceClass_ul_li = document.querySelectorAll(
        "#fir_invoiceClass_ul .fir_invoiceClass"
      );
      let invoiceItem_ul_li = document.querySelectorAll(
        "#invoiceItem_ul .invoiceItem"
      );
      if (type == "invoiceType") {
        this.typeforEach(fir_invoiceUl_li);
        this.typeforEach(fir_invoiceClass_ul_li);
        if (
          e.target.className != "" &&
          e.target.className.indexOf("invoiceTypeLi") != -1
        ) {
          e.target.classList.add("on");
          this.invoiceType = e.target.getAttribute(type);
        } else {
          e.target.parentNode.classList.add("on");
          this.invoiceType = e.target.parentNode.getAttribute(type);
        }
        fir_invoiceClassDefault.classList.add("on");
        this.invoiceClass = 1;
      }
      if (type == "invoiceClass") {
        this.typeforEach(fir_invoiceClass_ul_li);
        e.target.classList.add("on");
        this.invoiceClass = e.target.getAttribute(type);
      }
      if (type == "invoiceItem") {
        this.typeforEach(invoiceItem_ul_li);
        e.target.classList.add("on");
      }
    },
    getSecondType(e, type) {
      let sec_invoiceUl_li = document.querySelectorAll(
        "#sec_invoiceUl .invoiceTypeLi"
      );
      let sec_invoiceClass_ul_li = document.querySelectorAll(
        "#sec_invoiceClass_ul .sec_invoiceClass"
      );
      if (type == "sec_invoiceType") {
        this.typeforEach(sec_invoiceUl_li);
        if (
          e.target.className != "" &&
          e.target.className.indexOf("invoiceTypeLi") != -1
        ) {
          e.target.classList.add("on");
          this.sec_invoiceType = e.target.getAttribute(type);
        } else {
          e.target.parentNode.classList.add("on");
          this.sec_invoiceType = e.target.parentNode.getAttribute(type);
        }
      }
      if (type == "sec_invoiceClass") {
        this.typeforEach(sec_invoiceClass_ul_li);
        e.target.classList.add("on");
        this.sec_invoiceClass = e.target.getAttribute(type);
      }
    },
    typeforEach(typeArr) {
      typeArr.forEach((item, index) => {
        item.classList.remove("on");
      });
    },
    savaClick() {
      const that = this;
      let saveInvoiceIpt = document.querySelector("#saveInvoice");
      let saveInvoiceDisIpt = document.querySelector("#saveInvoiceDis");
      saveInvoiceIpt.style.display = "none";
      saveInvoiceDisIpt.style.display = "block";
      that.isValid = that.validData();
      let invoiceCookieData = that.invoiceDesc();
      if (that.invoiceType == -1) {
        noInvoiceInfo({ orderId: that.orderId }).then(data => {
          if (data == 1) {
            gotoUrl("/payment/submitOrder.html");
          }
        });
      } else {
        that.invoiceItemIndex = document.querySelector(".invoiceItem.on").value;
        if (!that.isValid) {
          saveInvoiceIpt.style.display = "block";
          saveInvoiceDisIpt.style.display = "none";
        } else {
          saveInvoiceInfo({
            memberId: that.memberId,
            uid: that.uid,
            invoiceType: that.invoiceType + "",
            invoiceType2: that.sec_invoiceType + "",
            invoiceClass: that.invoiceClass + "",
            invoiceClass2: that.sec_invoiceClass + "",
            invoiceTitle: that.invoiceTitle,
            invoiceTitle2: that.sec_invoiceTitle,

            taxpayerNumber: that.taxpayerNumber,
            taxpayerNumber2: that.sec_taxpayerNumber,

            regAddress: that.regAddress,
            regPhone: that.regPhone,
            bankName: that.bankName,
            bankAccount: that.bankAccount,
            invoiceItem: JSON.stringify(that.invoiceItemIndex),

            regAddress2: that.sec_regAddress,
            regPhone2: that.sec_regPhone,
            bankName2: that.sec_bankName,
            bankAccount2: that.sec_bankAccount,

            orderId: that.orderId,
            saveType: "2"
          }).then(saveInvoiceInfoData => {
            if (saveInvoiceInfoData == 1) {
              setCookie(
                "cdelInvoice",
                JSON.stringify({
                  orderId: that.orderId,
                  invoiceType: that.invoiceType + "",
                  invoiceType2: that.sec_invoiceType + "",
                  invoiceTitle: that.invoiceTitle,
                  invoiceTitle2: that.sec_invoiceTitle,
                  invoiceTypeStr: that.invoiceTypeStr,
                  invoiceTypeStr2: that.sec_invoiceTypeStr
                })
              );
              let params = getUrlParams()
              if(that.invoiceType == 1 || that.invoiceType == 4){
                gotoUrl("/payment/addressManage.html?isFromInvoice=true&orderId=" + params.orderId +"&postHisId=" +params.postHisId +"");
              }else{
                gotoUrl("/payment/submitOrder.html");
              }
            }
          });
        }
        saveInvoiceIpt.style.display = "block";
        saveInvoiceDisIpt.style.display = "none";
      }
    },
    validData() {
      let regTaxpayerNumber = /^[0-9A-Za-z]{15}([0-9A-Za-z]{3})?$/;
      let mobilePhoneRegex = /^1[3|4|5|7|8][0-9]\d{8}$/;
      let telePhoneReg = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
      let bankAccountReg = /^[0-9]*$/;
      let fir_invoiceTitle,
        fir_taxpayerNumber,
        fir_regAddress,
        fir_regPhone,
        fir_bankName,
        fir_bankAccount,
        sec_invoiceTitle,
        sec_taxpayerNumber,
        sec_regAddress,
        sec_regPhone,
        sec_bankName,
        sec_bankAccount;
      if (document.querySelector("#fir_invoiceTitle")) {
        fir_invoiceTitle = document.querySelector("#fir_invoiceTitle").value;
      }
      if (this.invoiceClass == 2 && fir_invoiceTitle == "") {
        let $Toast = new Toast();
        $Toast.open({ message: "请填写单位名称", duration: 1000 });
        return false;
      } else {
        if (fir_invoiceTitle == "") {
          this.invoiceTitle = "个人";
        } else {
          this.invoiceTitle = fir_invoiceTitle;
        }
      }
      if (document.querySelector("#fir_taxpayerNumber")) {
        fir_taxpayerNumber = document.querySelector("#fir_taxpayerNumber")
          .value;
      }
      if (this.invoiceClass == 2 && fir_taxpayerNumber == "") {
        let $Toast = new Toast();
        $Toast.open({ message: "请填写纳税人识别号", duration: 1000 });
        return false;
      } else if (
        this.invoiceClass == 2 &&
        !regTaxpayerNumber.test(fir_taxpayerNumber)
      ) {
        let $Toast = new Toast();
        $Toast.open({ message: "纳税人识别号错误", duration: 1000 });
        return false;
      } else if (this.invoiceClass == 2) {
        this.taxpayerNumber = fir_taxpayerNumber;
      } else {
        this.taxpayerNumber = "";
      }

      if (document.querySelector("#fir_regAddress")) {
        fir_regAddress = document.querySelector("#fir_regAddress").value;
      }
      if (this.invoiceType == 4 && fir_regAddress == "") {
        let $Toast = new Toast();
        $Toast.open({ message: "请填写注册地址", duration: 1000 });
        return false;
      }
      this.regAddress = fir_regAddress;

      if (document.querySelector("#fir_regPhone")) {
        fir_regPhone = document.querySelector("#fir_regPhone").value;
      }
      if (this.invoiceType == 4 && fir_regPhone == "") {
        let $Toast = new Toast();
        $Toast.open({ message: "请填写注册电话", duration: 1000 });
        return false;
      } else if (this.invoiceType == 4 && !telePhoneReg.test(fir_regPhone)) {
        let $Toast = new Toast();
        $Toast.open({ message: "注册电话错误", duration: 1000 });
        return false;
      }
      this.regPhone = fir_regPhone;

      if (document.querySelector("#fir_bankName")) {
        fir_bankName = document.querySelector("#fir_bankName").value;
      }
      if (this.invoiceType == 4 && fir_bankName == "") {
        let $Toast = new Toast();
        $Toast.open({ message: "请填写开户银行", duration: 1000 });
        return false;
      }
      this.bankName = fir_bankName;

      if (document.querySelector("#fir_bankAccount")) {
        fir_bankAccount = document.querySelector("#fir_bankAccount").value;
      }
      if (this.invoiceType == 4 && fir_bankAccount == "") {
        let $Toast = new Toast();
        $Toast.open({ message: "请填写银行账户", duration: 1000 });
        return false;
      } else if (
        this.invoiceType == 4 &&
        !bankAccountReg.test(fir_bankAccount)
      ) {
        let $Toast = new Toast();
        $Toast.open({ message: "银行账户错误", duration: 1000 });
        return false;
      }
      this.bankAccount = fir_bankAccount;

      if (this.invoiceType == 4 && this.isHasSecondInvoice) {
        if (document.querySelector("#sec_invoiceTitle")) {
          sec_invoiceTitle = document.querySelector("#sec_invoiceTitle").value;
        }
        if (this.sec_invoiceClass == 2 && sec_invoiceTitle == "") {
          let $Toast = new Toast();
          $Toast.open({ message: "请填写单位名称", duration: 1000 });
          return false;
        } else {
          if (sec_invoiceTitle == "") {
            this.sec_invoiceTitle = "个人";
          } else {
            this.sec_invoiceTitle = sec_invoiceTitle;
          }
        }

        if (document.querySelector("#sec_taxpayerNumber")) {
          sec_taxpayerNumber = document.querySelector("#sec_taxpayerNumber")
            .value;
        }
        if (this.sec_invoiceClass == 2 && sec_taxpayerNumber == "") {
          let $Toast = new Toast();
          $Toast.open({ message: "请填写纳税人识别号", duration: 1000 });
          return false;
        } else if (
          this.sec_invoiceClass == 2 &&
          !regTaxpayerNumber.test(sec_taxpayerNumber)
        ) {
          let $Toast = new Toast();
          $Toast.open({ message: "纳税人识别号错误", duration: 1000 });
          return false;
        } else if (this.sec_invoiceClass == 2) {
          this.sec_taxpayerNumber = sec_taxpayerNumber;
        } else {
          this.sec_taxpayerNumber = "";
        }

        if (document.querySelector("#sec_regAddress")) {
          sec_regAddress = document.querySelector("#sec_regAddress").value;
          this.sec_regAddress = sec_regAddress;
        }

        if (document.querySelector("#sec_regPhone")) {
          sec_regPhone = document.querySelector("#sec_regPhone").value;
          this.sec_regPhone = sec_regPhone;
        }

        if (document.querySelector("#sec_bankName")) {
          sec_bankName = document.querySelector("#sec_bankName").value;
          this.sec_bankName = sec_bankName;
        }

        if (document.querySelector("#sec_bankAccount")) {
          sec_bankAccount = document.querySelector("#sec_bankAccount").value;
          this.sec_regAddress = sec_bankAccount;
        }
      }
      return true;
    },
    invoiceDesc() {
      let invoiceTypeStr = "";
      let invoiceTypeStr2 = "";
      let invoiceTitle2 = "";
      if (this.invoiceType == 1) {
        invoiceTypeStr = "纸质发票";
      }
      if (this.invoiceType == 3) {
        invoiceTypeStr = "电子发票";
      }
      if (this.invoiceType == 4) {
        invoiceTypeStr = "增值税";
        if (this.isHasSecondInvoice) {
          if (this.sec_invoiceType == 1) {
            invoiceTypeStr2 = "纸质发票";
          }
          if (this.sec_invoiceType == 3) {
            invoiceTypeStr2 = "电子发票";
          }
          if (this.sec_invoiceClass == 2) {
            invoiceTypeStr2 += "-单位";
          } else {
            invoiceTypeStr2 += "-个人";
          }
        }
      } else {
        if (this.invoiceClass == 2) {
          invoiceTypeStr += "-单位";
        } else {
          invoiceTypeStr += "-个人";
        }
      }
      this.invoiceTypeStr = invoiceTypeStr;
      this.sec_invoiceTypeStr = invoiceTypeStr2;

      let resData =
        "{orderId:'" +
        this.orderID +
        "',invoiceTypeStr:'" +
        invoiceTypeStr +
        "',title:'" +
        this.invoiceTitle +
        "',invoiceType:'" +
        this.invoiceType +
        "'}";
      if (this.invoiceType == -1) {
        resData =
          "{orderId:'" +
          this.orderID +
          "',invoiceType:'" +
          this.invoiceType +
          "'}";
      }
      if (this.isHasSecondInvoice) {
        resData =
          "{orderId:'" +
          this.orderID +
          "',invoiceTypeStr:'" +
          invoiceTypeStr +
          "'," +
          "title:'" +
          this.invoiceTitle +
          "',invoiceType:'" +
          this.invoiceType +
          "'," +
          "invoiceType2:'" +
          this.sec_invoiceType +
          "',invoiceTypeStr2:'" +
          invoiceTypeStr2 +
          "'," +
          "title2:'" +
          this.sec_invoiceTitle +
          "'}";
      }
      return resData;
    }
  }
};
</script>

