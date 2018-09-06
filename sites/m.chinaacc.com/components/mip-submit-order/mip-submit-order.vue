<template>
  <div class="wrapper">
    <!--登录-->
    <mip-login id="mipLogin" on="isLogin:userOrder.watchLogin"></mip-login>
    <!--登录 end-->
    <!--订单信息-->
    <div class="ddxx clearfix">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
          <i class="dian abs"></i>订单信息</div>
        <div class="fr">订单号：
          <span v-text="order.orderId"></span>
        </div>
      </div>
      <div class="cen clearfix" v-for="(detail, index) in productList" :key="index">
        <div class="left fl zgtype" v-if="detail.productType == 1">课程</div>
        <div class="left fl zgtype" v-else>图书</div>
        <div class="right fl sgd">
          <p class="right-t zgname" v-if="detail.productType == 1">
            <span v-text="detail.productName"></span>——[
            <span v-text="detail.courseEduName"></span>]
          </p>
          <p class="right-t zgname" v-else>
            <span v-text="detail.productName"></span>
            <em class="fr">×
              <span v-text="detail.productNum"></span>
            </em>
          </p>
          <p class="right-c zgprice">
            <span></span>
            <em class="fr">
              <span v-text="currency(detail.price)"></span>
            </em>
          </p>
          <div class="sxx" v-if="detail.giftProducts != null && detail.giftProducts != '' && detail.giftProducts != '[]'">
            <div class="xnr clearfix" v-for="(item, index) in detail.giftProducts" :key="index">
              <div v-if="item.productId != null && item.productId != ''">
                <p class="xnr-l fl">[赠品]&nbsp;{{item.productName}}</p>
                <p class="fr">
                  <span v-text="currency(0)"></span>
                </p>
              </div>
              <div v-else>
                <p class="xnr-l fl">无赠品</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--订单信息 end-->

    <!--收件人信息-->
    <div class="sjrxx clearfix" v-if="isShowAddress">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
          <i class="dian abs"></i>收件人信息</div>
      </div>
      <div v-if="!isPostInfo">
        <div class="cen clearfix">
          <div class="cen-l fl">收 货 人：</div>
          <input type="text" class="cen-c fl" v-model="postInfo.fullName">
        </div>
        <div class="cen clearfix">
          <div class="cen-l fl">手机号码：</div>
          <input type="text" class="cen-c fl" v-model="postInfo.mobile">
        </div>
        <div class="cen clearfix">
          <div class="cen-l fl">邮&#12288;&#12288;编</div>
          <input type="text" class="cen-c fl" v-model="postInfo.zipcode">
        </div>
        <div class="cen clearfix">
          <div class="cen-l fl">邮&#12288;&#12288;箱</div>
          <input type="text" class="cen-c fl" v-model="postInfo.email">
        </div>
        <div class="cen clearfix" on="click:addressPicker.initPicker">
          <div class="cen-l fl">所在地区：</div>
          <label id="cityData" v-text="readyArea.province.name + ' ' + readyArea.city.name + ' ' + readyArea.area.name"></label>
        </div>
        <div class="cen clearfix">
          <div class="cen-l fl">详细地址:</div>
          <textarea class="cen-c2 fl" placeholder="请输入街道、楼牌号等" v-model="postInfo.address"></textarea>
        </div>
        <div class="bot">
          <span class="han" @click="savePostInfo">保存并使用</span>
        </div>
      </div>
      <div class="cen2 clearfix" v-else @click="gotoAddressManage">
        <div class="cen2-t clearfix">
          <span class="cen2-t-l fl">
            <span class="zg_fullname" v-text="order.shopMemPostInfo.fullName"></span>
          </span>
          <span class="fr">
            <span v-text="formatMobile(order.shopMemPostInfo.mobile)"></span>
          </span>
        </div>
        <div class="cen2-c clearfix pr">
          <i class="fd abs"></i>
          <span class="zg_fullAddress" v-if="order.shopMemPostInfo.fullAddress != null">
            <span v-text="order.order.shopMemPostInfo.fullAddress"></span>
          </span>
          <span class="zg_fullAddress" v-else>
            <span v-text="order.shopMemPostInfo.cityName"></span>
            <span v-text="order.shopMemPostInfo.areaName"></span>
            <span v-text="order.shopMemPostInfo.address"></span>
            <i class="rjian abs"></i>
          </span>
        </div>
      </div>
    </div>
    <mip-address-picker id="addressPicker" @areaChange="trest"></mip-address-picker>
    <!--收件人信息 end-->

    <!--邮寄方式-->
    <div class="yjfs clearfix" v-if="hasBook > 0">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
          <i class="dian abs"></i>邮寄方式</div>
        <div class="tit-right fr pr" v-text="defaultSendTypeName"></div>
      </div>
    </div>
    <!--邮寄方式 end-->

    <!--发票信息-->
    <div class="yjfs clearfix">
      <a href="javascript:void(0)" v-if="showInvoice == true" @click="toInvoicePage()">
        <div class="tit clearfix">
          <div class="tit-left fl pr">
            <i class="dian abs"></i>发票信息</div>
          <div class="tit-right fr pr">
            <span v-if="invoiceCookieTypeStr != null" v-text="invoiceCookieTypeStr"></span>
            <i class="rjian abs"></i>
          </div>
        </div>
        <div class="cen clearfix" v-if="invoiceCookieTypeStr != null">
          <div class="cen-r fr" v-text="invoiceCookieTitle"></div>
        </div>
        <div class="tit clearfix" v-if="invoiceCookieTypeStr2!=null && invoiceCookieTypeStr2!=''">
          <div class="tit-right fr pr">
            <span v-text="invoiceCookieTypeStr2"></span>
            <i class="rjian abs"></i>
          </div>
        </div>
        <div class="cen clearfix" v-if="invoiceCookieTypeStr2 != null && invoiceCookieTypeStr2!=''">
          <div class="cen-r fr" v-text="invoiceCookieTitle2"></div>
        </div>
      </a>
      <a href="javascript:void(0)" v-if="showInvoice == false">
        <div class="tit clearfix">
          <div class="tit-left fl pr">
            <i class="dian abs"></i>发票信息</div>
          <div class="tit-right fr pr">
            <span v-if="invoiceCookieTypeStr!=null" v-text="invoiceCookieTypeStr"></span>
          </div>
        </div>
        <div class="cen clearfix">
          <div class="cen-r fr"></div>
        </div>
        <div class="cen clearfix">
          <div class="cen-r fr">使用学习卡支付的费用，如需发票请联系购卡点索取。</div>
        </div>
      </a>
    </div>
    <!--发票信息 end-->

    <!--优惠卷-->
    <div class="yhj clearfix" v-if="(coupon != undefined && coupon.length > 0 && specialVoucher == undefined) || (coupon != undefined && coupon.length > 1 && specialVoucher != undefined)">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
          <i class="dian abs"></i>优惠券</div>
        <div class="tit-kg fr"><input type="checkbox" id="checkbox_c1" class="chk_3" />
          <label></label>
        </div>
      </div>
      <div class="cen clearfix pr yhqbox" @click="showYHPop">
        <p class="cen-t pr">
          <span id="voucherName" v-text="voucherName"></span>
          <i class="rjian abs"></i>
        </p>
        <p class="cen-b">
          <span id="voucherDate" v-text="voucherDate"></span>
        </p>
      </div>
    </div>
    <!--优惠卷 end-->

    <!--优惠政策-->
    <div class="yhj clearfix" v-if="hasRule > 0">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
          <i class="dian abs"></i>优惠政策</div>
        <div class="tit-kg fr"><input type="checkbox" id="rules" name="rules" class="chk_3 zcchk" @click="changeDiscount(0);" checked/>
          <label for="rules"></label>
        </div>
      </div>
    </div>

    <!--优惠政策 end-->
    <!--订单金额-->
    <div class="ddje clearfix">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
          <i class="dian abs"></i>订单金额</div>
        <div class="tit-right fr" v-if="needMoney.discountValue > 0 && needMoney.discountValue < 10">VIP优惠</div>
      </div>
      <div class="cen clearfix">
        <span class="fl">
          <em>
            <span class="zgnum">{{order.productNum}}</span>件</em>商品，总商品金额：</span>
        <span class="cen-r fr">
          <span class="totalMoney">￥{{totalMoney}}</span>
        </span>
      </div>
      <div class="cen clearfix">
        <span class="fl">运费：</span>
        <span class="cen-r fr">
          <span class="postMoney">￥{{postMoney == 0 ? '0.00' : postMoney}}</span>
        </span>
      </div>
      <div class="cen clearfix">
        <span class="fl">优惠减免：</span>
        <span class="cen-r fr">
          <em>
            <span class="favourableMoneyView">￥{{(totalMoney - finalTotalMoney).toFixed(2)}}</span>
          </em>
        </span>
      </div>
    </div>
    <!--订单金额 end-->

    <input type="hidden" id="invoiceType" value="0" />
    <input type="hidden" id="invoiceflag" value="2" />
    <div class="mask"></div>
    <!--优惠卷弹框-->
    <div class="yhqtk clearfix pr" v-if="(coupon != null && coupon != '[]' && coupon.length > 0 && specialVoucher == null)||(coupon != null && coupon != '[]' && coupon.length > 1 && specialVoucher != null)">
      <span class="colse abs" @click="closeYHPop"></span>
      <div class="tit">选择优惠券</div>
      <div class="cbox">
        <div class="cen pr" :id="'cen_' + index" v-for="(voucher,index) in coupon" :key="index" v-if="voucher.voucherId != 375" @click="clickChecked('cen_' + index)">
          <div v-if="voucher.isvalid == 1 && voucher.discountType == 2">
            <div class="chk abs isvalid">
              <input v-if="voucher.discountName == voucher.detailName" type="checkbox" :id="'voucher' + voucher.discountId" name="myvoucher" :value="voucher.detailId" :voucherId="voucher.discountId" :isSingle="voucher.isSingle" :voucherName="voucher.detailName" :voucherDate="'有效期至：' + dateFormat(voucher.endTime)">
              <input v-if="voucher.discountName != voucher.detailName" type="checkbox" :id="'voucher' + voucher.discountId" name="myvoucher" :value="voucher.detailId" :voucherId="voucher.discountId" :isSingle="voucher.isSingle" :voucherName="voucher.discountName + voucher.detailName" :voucherDate="'有效期至：' + dateFormat(voucher.endTime)">
            </div>
            <p class="cen-t" v-if="voucher.discountName == voucher.detailName">{{voucher.detailName}}</p>
            <p class="cen-t" v-if="voucher.discountName != voucher.detailName">{{voucher.discountName}}{{voucher.detailName}}</p>
            <p class="cen-b">有效期至：{{dateFormat(voucher.endTime)}}</p>
            <span v-if="voucher.isVip == 0">
              <font color="red">&nbsp;&nbsp;&nbsp;不与VIP优惠同时使用！ </font>
            </span>
          </div>
          <div v-if="voucher.isvalid == 0 && voucher.discountType == 2">
            <div class="chk abs">
              <input type="checkbox" :id="'voucher' + voucher.discountId" name="myvoucher" :value="voucher.detailId" :voucherId="voucher.discountId" :isSingle="voucher.isSingle" :voucherName="voucher.discountName + voucher.detailName" :voucherDate="'有效期至：' + dateFormat(voucher.endTime)" disabled="disabled">
            </div>
            <p class="cen-t" v-if="voucher.discountName == voucher.detailName">{{voucher.detailName}}</p>
            <p class="cen-t" v-if="voucher.discountName != voucher.detailName">{{voucher.discountName}}{{voucher.detailName}}</p>
            <p class="cen-b">有效期至：{{dateFormat(voucher.endTime)}}</p>
            <span v-if="voucher.isVip==0">
              <font color="red">&nbsp;&nbsp;&nbsp;不与VIP优惠同时使用！ </font>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!--优惠卷弹框 end-->
    <!--提交浮层-->
    <div class="tjfd">
      <div class="zj fl">应付总额：
        <b>
          <span class="totalneedmoney">{{currency(finalTotalMoney + postMoney)}}</span>
        </b>
      </div>
      <span class="han fr zgtjdd" v-if="loginFlag" on="tap:log.login">提交订单</span>
      <span class="han fr zgtjdd" v-else @click="submitOrder">提交订单</span>
    </div>
    <!--提交浮层 end-->
  </div>
</template>

<script>
import { getCookie, setCookie } from "../../common/utils/cookie";
import { currency, limitTo, compareSort, gotoUrl } from "../../common/utils";
import {
  getOrderDetail,
  getSpecialDiscount,
  updatePostInfoInvoiceChangeOrder,
  getPayUrl,
  updateOrder
} from "../../common/api";
import { Toast, Loading } from "../../common/utils/toast";
export default {
  data() {
    return {
      order: [],
      productList: [],
      hasBook: 0,
      defaultSendTypeName: "",
      isPostInfo: false,
      coupon: [],
      totalMoney: 0,
      finalTotalMoney: 0,
      showInvoice: false,
      invoiceOrderId: "",
      invoiceCookieType: "",
      invoiceCookieTypeStr: "",
      invoiceCookieTypeStr2: "",
      invoiceCookieTitle: "",
      invoiceCookieTitle2: "",
      isFirst: 1,
      hasRule: "",
      voucherName: "请选择优惠券!",
      voucherDate: "",
      discountIds: [],
      needMoney: "",
      isRules: false,
      cacheMap: {},
      postMoney: "",
      specialVoucher: "",
      postHisId: "",
      readyArea: {
        province: { id: "", name: "" },
        city: { id: "", name: "" },
        area: { id: "", name: "" }
      },
      postInfo: {
        fullName: "",
        mobile: "",
        zipcode: "",
        email: "",
        address: ""
      },
      isShowAddress: true,
      loginFlag: true
    };
  },
  async mounted() {
    await this.initOrderDetail();
    //登录监听
    const that = this;
    that.$on("watchLogin", function() {
      //已登录
      that.loginFlag = false;
    });
  },
  methods: {
    dateFormat(date) {
      let _date = new Date(date);
      _date =
        _date.getFullYear() +
        "-" +
        (_date.getMonth() + 1 < 10
          ? "0" + (_date.getMonth() + 1)
          : _date.getMonth() + 1) +
        "-" +
        _date.getDate();
      return _date;
    },
    submitOrder() {
      const that = this;
      let prules = "";
      let order_book_list = getCookie("order_book_list");
      let rules = document.querySelector("#rules");

      if (rules != null && rules.checked) {
        prules = "1";
      } else {
        prules = "0";
      }

      if (order_book_list != null) {
        order_book_list = order_book_list.replace(/"/g, "");
      }
      if (
        order_book_list != undefined &&
        order_book_list != "" &&
        (that.postHisId == "" ||
          that.postHisId == -1 ||
          that.postHisId == undefined)
      ) {
        let $Toast = new Toast();
        let $Loading = new Loading();
        $Toast.open({ message: "请填写收货地址！" });
        return;
      }
      let setting = {
        orderId: that.order.orderId + "",
        prules: prules,
        pvip: "1",
        buy_book_list: order_book_list,
        voucherIds: "",
        yqm: "0"
      };
      updateOrder(setting).then(res => {
        if (res.code == 1) {
          gotoUrl("/payment/confirmOrder.html");
        }
      });
    },
    clickChecked(cen_id) {
      const that = this;
      let currentCen = document.querySelector("#" + cen_id);
      let currentChk = document.querySelector("#" + cen_id + " .chk");
      let currentIpt = document.querySelector(
        "#" + cen_id + " input[name='myvoucher']"
      );
      let vouchers = document.querySelectorAll(
        "input[name='myvoucher']:checked"
      );
      let checked = false;
      if (currentChk.className.indexOf("isvalid") != -1) {
        if (currentIpt.checked == true) {
          currentChk.classList.remove("j");
          currentCen.classList.remove("tj");
          currentIpt.checked = false;
          vouchers = document.querySelectorAll(
            "input[name='myvoucher']:checked"
          );
        } else {
          currentChk.classList.add("j");
          currentCen.classList.add("tj");
          currentIpt.checked = true;
          vouchers = document.querySelectorAll(
            "input[name='myvoucher']:checked"
          );
        }
        if (document.querySelector("#checkbox_c1") != null) {
          document.querySelector("#checkbox_c1").checked = false;
        }
        that.voucherName = "请选择优惠券！";
        that.voucherDate = "";
        if (vouchers != null && vouchers != "" && vouchers.length > 0) {
          checked = true;
          if (vouchers.length > 1) {
            that.voucherName = "您已选择" + vouchers.length + "张优惠券";
          } else {
            vouchers.forEach((item, index) => {
              that.voucherName = item.getAttribute("voucherName");
              that.voucherDate = item.getAttribute("voucherDate");
            });
          }
        }
        if (document.querySelector("#checkbox_c1") != null) {
          document.querySelector("#checkbox_c1").checked = checked;
        }
        let voucherId = currentIpt.getAttribute("voucherId");
        setTimeout(() => {
          that.changeDiscount(voucherId);
        }, 10);
      }
    },
    showYHPop() {
      document.querySelector(".mask").style.display = "block";
      document.querySelector(".yhqtk").style.display = "block";
    },
    closeYHPop() {
      document.querySelector(".mask").style.display = "none";
      document.querySelector(".yhqtk").style.display = "none";
    },
    changeDiscount(type) {
      const that = this;
      let discount = "";
      let discount_key = "";
      let rules = document.querySelector("#rules"); // 优惠策略按钮
      if (rules != null && rules.checked) {
        discount = "discount";
      } else {
        discount = "";
      }
      // 获取书籍及课程列表
      let order_course_list = getCookie("order_course_list");
      let order_book_list = getCookie("order_book_list");
      if (order_course_list != null) {
        order_course_list = order_course_list.replace(/"/g, "");
      }
      if (order_book_list != null) {
        order_book_list = order_book_list.replace(/"/g, "");
      }

      let voucherType = document.querySelector("#voucher" + type);
      if (rules != null && rules.checked) {
        that.isRules = true;
      } else {
        that.isRules = false;
      }

      if (type != 0 && type != "0") {
        if (voucherType.checked) {
          that.discountIds.push(parseInt(type));
        } else {
          that.discountIds.splice(that.discountIds.indexOf(parseInt(type)), 1);
        }
        discount_key = discount + "_" + that.discountIds;
      } else {
        that.discountIds = [];
        discount_key = discount + "_";
      }
      if (that.cacheMap[discount_key] != undefined) {
        that.coupon = that.cacheMap[discount_key].couponList;
        if (typeof that.coupon == "string") {
          that.coupon = JSON.parse(that.coupon);
        }
        that.totalMoney = that.cacheMap[discount_key].totalMoney;
        that.postMoney = that.cacheMap[discount_key].postMoney;
        that.finalTotalMoney = that.cacheMap[discount_key].finalTotalMoney;
      } else {
        //优惠接口
        let discountSetting = {
          isRules: that.isRules + "",
          postMoney: that.order.postMoney + "",
          totalNum: that.order.productNum + "",
          chooseCoupon: that.discountIds.join(","),
          select_course_list: order_course_list,
          free_list: null,
          buy_book_list: order_book_list
        };
        getSpecialDiscount(discountSetting).then(res => {
          that.cacheMap[discount_key] = res;
          that.totalMoney = res.totalMoney;
          that.postMoney = res.postMoney;
          that.finalTotalMoney = res.finalTotalMoney;
          that.coupon = JSON.parse(res.couponList);
        });
      }
      setTimeout(function() {
        for (let j = 0; j < that.discountIds.length; j++) {
          let $this_obj = document.querySelector(
            "#voucher" + that.discountIds[j]
          );
          if ($this_obj && !$this_obj.checked) {
            $this_obj.checked = true;
            $this_obj.parentNode(".chk").classList.add("j");
            $this_obj.childNodes(".cen").classList.add("tj");
          }
        }
        if (that.discountIds.length <= 0) {
          if (document.querySelector("#checkbox_c1") != null) {
            document.querySelector("#checkbox_c1").checked = true;
          }
          that.voucherName = "请选择优惠券！";
          that.voucherDate = "";
        }
      }, 10);
    },
    currency(num) {
      return currency(num);
    },
    limitTo(str, len) {
      return limitTo(str, len);
    },
    initOrderDetail() {
      const that = this;
      let $Loading = new Loading();
      $Loading.open();
      let memberId = getCookie("username"),
        cdelInvoice = getCookie("cdelInvoice");

      // 获取书籍及课程列表
      let order_course_list = getCookie("order_course_list");
      if (order_course_list != null) {
        order_course_list = order_course_list.replace(/"/g, "");
      }
      let order_book_list = getCookie("order_book_list");
      if (order_book_list != null || order_book_list != undefined) {
        order_book_list = order_book_list.replace(/"/g, "");
      }
      if (order_book_list == "") {
        that.isShowAddress = false;
      }

      let invoiceType = "3";
      let invoiceTypeVal = document.querySelector("#invoiceType");
      let invoiceflagVal = document.querySelector("#invoiceflag");
      if (cdelInvoice != null && cdelInvoice != "") {
        invoiceType = cdelInvoice.invoiceType;
      }

      let rules = document.querySelector("#rules"); // 优惠策略按钮
      //订单详情接口
      let setting = {
        buy_book_list: order_book_list,
        select_course_list: order_course_list,
        memberId: memberId,
        payStyle: "3",
        invoiceType: invoiceType
      };
      getOrderDetail(setting).then(res => {
        $Loading.close();
        // 商品信息、账户信息和优惠信息
        let discountResultList = JSON.parse(res.discountResultList);
        // 订单信息
        that.order = res.order;
        that.hasRule = res.hasRule;
        that.postMoney = that.order.postMoney;
        that.productList = discountResultList[0].productList;
        that.needMoney = res.needMoney;
        if (discountResultList[0].couponList) {
          that.coupon = discountResultList[0].couponList;
          that.needMoney = discountResultList[0].needMoney;
        }
        if (rules != null && rules.checked == false) {
          that.productList =
            discountResultList[discountResultList.length - 1].productList;
          if (discountResultList[discountResultList.length - 1].couponList) {
            that.coupon =
              discountResultList[discountResultList.length - 1].couponList;
            that.needMoney =
              discountResultList[discountResultList.length - 1].needMoney;
          }
        }
        let discountInitObj_1 = {};
        let discountInitObj_2 = {};

        discountInitObj_1.couponList = discountResultList["0"].couponList;
        discountInitObj_1.totalMoney = that.needMoney.totalMoney;
        discountInitObj_1.finalTotalMoney =
          that.needMoney.totalMoneyAfterDiscount;
        discountInitObj_1.postMoney = that.postMoney;

        discountInitObj_2.couponList = discountResultList["1"].couponList;
        discountInitObj_2.totalMoney = that.needMoney.totalMoney;
        discountInitObj_2.finalTotalMoney =
          that.needMoney.totalMoneyAfterDiscount;
        discountInitObj_2.postMoney = that.postMoney;

        that.cacheMap["discount_"] = discountInitObj_1;
        that.cacheMap["_"] = discountInitObj_2;
        that.totalMoney = that.needMoney.totalMoney;
        that.finalTotalMoney = that.needMoney.totalMoneyAfterDiscount;

        that.productList = that.productList.sort(compareSort("productType"));
        that.hasBook = res.hasBook;
        that.defaultSendTypeName = res.defaultSendTypeName;
        that.specialVoucher = res.specialVoucher;
        that.postHisId = res.order.postHisId;
        setCookie("invoiceType", JSON.stringify(res.invoiceType));
        setCookie("orderId", that.order.orderId);
        if (
          that.order.shopMemPostInfo != undefined &&
          that.order.shopMemPostInfo != ""
        ) {
          that.isPostInfo = true;
        }
        that.showInvoice = res.showInvoice;
        if (cdelInvoice) {
          cdelInvoice = JSON.parse(cdelInvoice);
          that.invoiceOrderId = cdelInvoice.orderId;
          if (that.invoiceOrderId == that.order.orderId) {
            that.invoiceCookieType = cdelInvoice.invoiceType;
            invoiceTypeVal.value = cdelInvoice.invoiceType;
            if (cdelInvoice.invoiceType == 1 || cdelInvoice.invoiceType == 4) {
              invoiceflagVal.value = 1;
            }
            if (
              cdelInvoice.invoiceTypeStr != null &&
              cdelInvoice.invoiceTypeStr != ""
            ) {
              that.invoiceCookieTypeStr = cdelInvoice.invoiceTypeStr;
            }
            that.invoiceCookieTitle = cdelInvoice.invoiceTitle;
            that.invoiceCookieTypeStr2 = cdelInvoice.invoiceTypeStr2;
            that.invoiceCookieTitle2 = cdelInvoice.invoiceTitle2;
          }
        } else {
          invoiceTypeVal.value = 0;
          invoiceflagVal.value = 2;
          if (that.showInvoice == true) {
            that.invoiceCookieTypeStr = "暂无发票信息";
          }
        }
      });
    },
    gotoAddressManage() {
      const that = this;
      gotoUrl(
        "/payment/addressManage.html?orderId=" +
          that.order.orderId +
          "&postHisId=" +
          that.postHisId +
          ""
      );
    },
    toInvoicePage() {
      const that = this;
      gotoUrl(
        "/payment/invoiceInfo.html?orderId=" +
          that.order.orderId +
          "&postHisId=" +
          that.postHisId +
          ""
      );
    },
    trest(e) {
      let item = e.detail[0];
      this.readyArea = {
        province: { id: item["province"].id, name: item["province"].name },
        city: { id: item["city"].id, name: item["city"].name },
        area: { id: item["area"].id, name: item["area"].name }
      };
      this.$set(this.readyArea, item["area"].id, this.readyArea);
      this.flag = false;
      this.flag = true;
    },
    formatMobile(str) {
      return str.substr(0, 3) + "****" + str.substr(7);
    },
    savePostInfo() {
      const that = this;
      let $Toast = new Toast();
      let $Loading = new Loading();
      // 收货人
      if (that.postInfo.fullName == "") {
        $Toast.open({ message: "请输入收件人姓名！" });
        return;
      }

      // 手机号码
      if (that.postInfo.mobile == "") {
        $Toast.open({ message: "手机号码不能为空" });
        return;
      } else {
        let mobilePhoneRegex = /^[0-9]{11}$/;
        if (!mobilePhoneRegex.test(that.postInfo.mobile)) {
          $Toast.open({ message: "手机号码不正确" });
          that.postInfo.mobile = "";
          return;
        }
      }

      // 邮编
      if (that.postInfo.zipcode == "") {
        $Toast.open({ message: "请填邮政编码" });
        return;
      } else {
        let szReg = /^[0-9][0-9]{5}$/;
        if (!szReg.test(that.postInfo.zipcode)) {
          $Toast.open({ message: "请填正确的邮政编码" });
          that.postInfo.zipcode = "";
          return;
        }
      }

      // 邮箱
      if (that.postInfo.email == "") {
        $Toast.open({ message: "请填邮箱" });
        return;
      } else {
        let szReg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!szReg.test(that.postInfo.email)) {
          $Toast.open({ message: "邮箱不正确" });
          that.postInfo.email = "";
          return;
        }
      }

      //所在地区
      if (
        that.readyArea.province.name == "" ||
        that.readyArea.city.name == "" ||
        that.readyArea.area.name == ""
      ) {
        $Toast.open({ message: "请选择您所在的地区" });
        return;
      }

      const containSpecial = function(s) {
        let containSpecial = RegExp(
          /[(\ )(\~)(\!)(\@)(\#) (\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=) (\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/) (\<)(\>)(\?)(\)]+/
        );
        return containSpecial.test(s);
      };
      // 详细地址
      if (that.postInfo.address == "") {
        $Toast.open({ message: "详细地址不能为空" });
        return;
      } else {
        if (containSpecial(that.postInfo.address)) {
          $Toast.open({ message: "详细地址不正确！" });
          that.postInfo.address = "";
          return;
        }
      }

      // 保存

      $Loading.open();
      let setting = {
        orderId: that.order.orderId.toString(),
        fullName: encodeURI(that.postInfo.fullName),
        provinceId: that.readyArea.province.id.toString(),
        cityId: that.readyArea.city.id.toString(),
        areaId: that.readyArea.area.id.toString(),
        zipcode: that.postInfo.zipcode,
        address: encodeURI(that.postInfo.address),
        mobile: that.postInfo.mobile,
        email: that.postInfo.email,
        postHisId: that.postHisId.toString()
      };
      updatePostInfoInvoiceChangeOrder(setting).then(res => {
        $Loading.close();
        if (res.success == 1 || res.success == "1") {
          that.initOrderDetail();
        } else {
          $Toast.open({
            message: "保存失败"
          });
        }
      });
    }
  }
};
</script>
