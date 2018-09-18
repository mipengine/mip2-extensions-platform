<template>
  <div class="wrapper">
    <!--登录-->
    <mip-login
      id="mipLogin"
      on="isLogin:userOrder.watchLogin"/>
    <!--登录 end-->
    <!--订单信息-->
    <div class="ddxx clearfix">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
        <i class="dian abs"/>订单信息</div>
        <div class="fr">订单号：
          <span v-text="order.orderId"/>
        </div>
      </div>
      <div
        v-for="(detail, index) in productList"
        :key="index"
        class="cen clearfix">
        <div
          v-if="detail.productType == 1"
          class="left fl zgtype">课程</div>
        <div
          v-else
          class="left fl zgtype">图书</div>
        <div class="right fl sgd">
          <p
            v-if="detail.productType == 1"
            class="right-t zgname">
            <span v-text="detail.productName"/>——[
            <span v-text="detail.courseEduName"/>]
          </p>
          <p
            v-else
            class="right-t zgname">
            <span v-text="detail.productName"/>
            <em class="fr">×
              <span v-text="detail.productNum"/>
            </em>
          </p>
          <p class="right-c zgprice">
            <span/>
            <em class="fr">
              <span v-text="currency(detail.price)"/>
            </em>
          </p>
          <div
            v-if="detail.giftProducts != null && detail.giftProducts != '' && detail.giftProducts != '[]'"
            class="sxx">
            <div
              v-for="(item, index) in detail.giftProducts"
              :key="index"
              class="xnr clearfix">
              <div v-if="item.productId != null && item.productId != ''">
                <p class="xnr-l fl">[赠品]&nbsp;{{ item.productName }}</p>
                <p class="fr">
                  <span v-text="currency(0)"/>
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
    <div
      v-if="isShowAddress || hasBook > 0"
      class="sjrxx clearfix">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
        <i class="dian abs"/>收件人信息</div>
      </div>
      <div v-if="!isPostInfo">
        <div class="cen clearfix">
          <div class="cen-l fl">收 货 人：</div>
          <input
            v-model="postInfo.fullName"
            type="text"
            class="cen-c fl">
        </div>
        <div class="cen clearfix">
          <div class="cen-l fl">手机号码：</div>
          <input
            v-model="postInfo.mobile"
            type="text"
            class="cen-c fl">
        </div>
        <div class="cen clearfix">
          <div class="cen-l fl">邮&#12288;&#12288;编</div>
          <input
            v-model="postInfo.zipcode"
            type="text"
            class="cen-c fl">
        </div>
        <div class="cen clearfix">
          <div class="cen-l fl">邮&#12288;&#12288;箱</div>
          <input
            v-model="postInfo.email"
            type="text"
            class="cen-c fl">
        </div>
        <div
          class="cen clearfix"
          on="click:addressPicker.initPicker">
          <div class="cen-l fl">所在地区：</div>
          <label
            id="cityData"
            v-text="readyArea.province.name + ' ' + readyArea.city.name + ' ' + readyArea.area.name"/>
        </div>
        <div class="cen clearfix">
          <div class="cen-l fl">详细地址:</div>
          <textarea
            v-model="postInfo.address"
            class="cen-c2 fl"
            placeholder="请输入街道、楼牌号等"/>
        </div>
        <div class="bot">
          <span
            class="han"
            @click="savePostInfo">保存并使用</span>
        </div>
      </div>
      <div
        v-else
        class="cen2 clearfix"
        @click="gotoAddressManage">
        <div class="cen2-t clearfix">
          <span class="cen2-t-l fl">
            <span
              class="zg_fullname"
              v-text="order.shopMemPostInfo.fullName"/>
          </span>
          <span class="fr">
            <span v-text="formatMobile(order.shopMemPostInfo.mobile)"/>
          </span>
        </div>
        <div class="cen2-c clearfix pr">
          <i class="fd abs"/>
          <span
            v-if="order.shopMemPostInfo.fullAddress != null"
            class="zg_fullAddress">
            <span v-text="order.order.shopMemPostInfo.fullAddress"/>
          </span>
          <span
            v-else
            class="zg_fullAddress">
            <span v-text="order.shopMemPostInfo.cityName"/>
            <span v-text="order.shopMemPostInfo.areaName"/>
            <span v-text="order.shopMemPostInfo.address"/>
            <i class="rjian abs"/>
          </span>
        </div>
      </div>
    </div>
    <mip-address-picker
      id="addressPicker"
      @areaChange="trest"/>
    <!--收件人信息 end-->

    <!--邮寄方式-->
    <div
      v-if="hasBook > 0"
      class="yjfs clearfix">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
        <i class="dian abs"/>邮寄方式</div>
        <div
          class="tit-right fr pr"
          v-text="defaultSendTypeName"/>
      </div>
    </div>
    <!--邮寄方式 end-->

    <!--发票信息-->
    <div class="yjfs clearfix">
      <a
        v-if="showInvoice == true"
        @click="toInvoicePage()">
        <div class="tit clearfix">
          <div class="tit-left fl pr">
          <i class="dian abs"/>发票信息</div>
          <div class="tit-right fr pr">
            <span
              v-if="invoiceCookieTypeStr != null"
              v-text="invoiceCookieTypeStr"/>
            <i class="rjian abs"/>
          </div>
        </div>
        <div
          v-if="invoiceCookieTypeStr != null"
          class="cen clearfix">
          <div
            class="cen-r fr"
            v-text="invoiceCookieTitle"/>
        </div>
        <div
          v-if="invoiceCookieTypeStr2!=null && invoiceCookieTypeStr2!=''"
          class="tit clearfix">
          <div class="tit-right fr pr">
            <span v-text="invoiceCookieTypeStr2"/>
            <i class="rjian abs"/>
          </div>
        </div>
        <div
          v-if="invoiceCookieTypeStr2 != null && invoiceCookieTypeStr2!=''"
          class="cen clearfix">
          <div
            class="cen-r fr"
            v-text="invoiceCookieTitle2"/>
        </div>
      </a>
      <a v-if="showInvoice == false">
        <div class="tit clearfix">
          <div class="tit-left fl pr">
          <i class="dian abs"/>发票信息</div>
          <div class="tit-right fr pr">
            <span
              v-if="invoiceCookieTypeStr!=null"
              v-text="invoiceCookieTypeStr"/>
          </div>
        </div>
        <div class="cen clearfix">
          <div class="cen-r fr"/>
        </div>
        <div class="cen clearfix">
          <div class="cen-r fr">使用学习卡支付的费用，如需发票请联系购卡点索取。</div>
        </div>
      </a>
    </div>
    <!--发票信息 end-->

    <!--优惠卷-->
    <div
      v-if="(coupon != undefined && coupon.length > 0 && specialVoucher == undefined) || (coupon != undefined && coupon.length > 1 && specialVoucher != undefined)"
      class="yhj clearfix">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
        <i class="dian abs"/>优惠券</div>
        <div class="tit-kg fr"><input
          id="checkbox_c1"
          type="checkbox"
          class="chk_3" >
          <label/>
        </div>
      </div>
      <div
        class="cen clearfix pr yhqbox"
        @click="showYHPop">
        <p class="cen-t pr">
          <span
            id="voucherName"
            v-text="voucherName"/>
          <i class="rjian abs"/>
        </p>
        <p class="cen-b">
          <span
            id="voucherDate"
            v-text="voucherDate"/>
        </p>
      </div>
    </div>
    <!--优惠卷 end-->

    <!--优惠政策-->
    <div
      v-if="hasRule > 0"
      class="yhj clearfix">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
        <i class="dian abs"/>优惠政策</div>
        <div class="tit-kg fr"><input
          id="rules"
          type="checkbox"
          name="rules"
          class="chk_3 zcchk"
          checked
          @click="changeDiscount(0);">
          <label for="rules"/>
        </div>
      </div>
    </div>

    <!--优惠政策 end-->
    <!--订单金额-->
    <div class="ddje clearfix">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
        <i class="dian abs"/>订单金额</div>
        <div
          v-if="needMoney.discountValue > 0 && needMoney.discountValue < 10"
          class="tit-right fr">VIP优惠</div>
      </div>
      <div class="cen clearfix">
        <span class="fl">
          <em>
        <span class="zgnum">{{ order.productNum }}</span>件</em>商品，总商品金额：</span>
        <span class="cen-r fr">
          <span class="totalMoney">￥{{ totalMoney }}</span>
        </span>
      </div>
      <div class="cen clearfix">
        <span class="fl">运费：</span>
        <span class="cen-r fr">
          <span class="postMoney">￥{{ postMoney == 0 ? '0.00' : postMoney }}</span>
        </span>
      </div>
      <div class="cen clearfix">
        <span class="fl">优惠减免：</span>
        <span class="cen-r fr">
          <em>
            <span class="favourableMoneyView">￥{{ (totalMoney - finalTotalMoney).toFixed(2) }}</span>
          </em>
        </span>
      </div>
    </div>
    <!--订单金额 end-->

    <input
      id="invoiceType"
      type="hidden"
      value="0" >
    <input
      id="invoiceflag"
      type="hidden"
      value="2" >
    <div class="mask"/>
    <!--优惠卷弹框-->
    <div
      v-if="(coupon != null && coupon != '[]' && coupon.length > 0 && specialVoucher == null)||(coupon != null && coupon != '[]' && coupon.length > 1 && specialVoucher != null)"
      class="yhqtk clearfix pr">
      <span
        class="colse abs"
        @click="closeYHPop"/>
      <div class="tit">选择优惠券</div>
      <div class="cbox">
        <div
          v-for="(voucher,index) in coupon"
          v-if="voucher.voucherId != 375"
          :id="'cen_' + index"
          :key="index"
          class="cen pr"
          @click="clickChecked('cen_' + index)">
          <div v-if="voucher.isvalid == 1 && voucher.discountType == 2">
            <div class="chk abs isvalid">
              <input
                v-if="voucher.discountName == voucher.detailName"
                :id="'voucher' + voucher.discountId"
                :value="voucher.detailId"
                :voucherId="voucher.discountId"
                :isSingle="voucher.isSingle"
                :voucherName="voucher.detailName"
                :voucherDate="'有效期至：' + dateFormat(voucher.endTime)"
                type="checkbox"
                name="myvoucher">
              <input
                v-if="voucher.discountName != voucher.detailName"
                :id="'voucher' + voucher.discountId"
                :value="voucher.detailId"
                :voucherId="voucher.discountId"
                :isSingle="voucher.isSingle"
                :voucherName="voucher.discountName + voucher.detailName"
                :voucherDate="'有效期至：' + dateFormat(voucher.endTime)"
                type="checkbox"
                name="myvoucher">
            </div>
            <p
              v-if="voucher.discountName == voucher.detailName"
              class="cen-t">{{ voucher.detailName }}</p>
            <p
              v-if="voucher.discountName != voucher.detailName"
              class="cen-t">{{ voucher.discountName }}{{ voucher.detailName }}</p>
            <p class="cen-b">有效期至：{{ dateFormat(voucher.endTime) }}</p>
            <span v-if="voucher.isVip == 0">
              <font color="red">&nbsp;&nbsp;&nbsp;不与VIP优惠同时使用！ </font>
            </span>
          </div>
          <div v-if="voucher.isvalid == 0 && voucher.discountType == 2">
            <div class="chk abs">
              <input
                :id="'voucher' + voucher.discountId"
                :value="voucher.detailId"
                :voucherId="voucher.discountId"
                :isSingle="voucher.isSingle"
                :voucherName="voucher.discountName + voucher.detailName"
                :voucherDate="'有效期至：' + dateFormat(voucher.endTime)"
                type="checkbox"
                name="myvoucher"
                disabled="disabled">
            </div>
            <p
              v-if="voucher.discountName == voucher.detailName"
              class="cen-t">{{ voucher.detailName }}</p>
            <p
              v-if="voucher.discountName != voucher.detailName"
              class="cen-t">{{ voucher.discountName }}{{ voucher.detailName }}</p>
            <p class="cen-b">有效期至：{{ dateFormat(voucher.endTime) }}</p>
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
          <span class="totalneedmoney">{{ currency(finalTotalMoney + postMoney) }}</span>
        </b>
      </div>
      <span
        v-if="loginFlag"
        class="han fr zgtjdd"
        on="tap:log.login">提交订单</span>
      <span
        v-else
        class="han fr zgtjdd"
        @click="submitOrder">提交订单</span>
    </div>
    <!--提交浮层 end-->
  </div>
</template>

<script>
import { getCookie, setCookie } from '../../common/utils/cookie'
import { currency, limitTo, compareSort, gotoUrl } from '../../common/utils'
import {
  getOrderDetail,
  getSpecialDiscount,
  updatePostInfoInvoiceChangeOrder,
  updateOrder
} from '../../common/api'
import { Toast, Loading } from '../../common/utils/toast'
export default {
  data () {
    return {
      order: [],
      productList: [],
      hasBook: 0,
      defaultSendTypeName: '',
      isPostInfo: false,
      coupon: [],
      totalMoney: 0,
      finalTotalMoney: 0,
      showInvoice: false,
      invoiceOrderId: '',
      invoiceCookieType: '',
      invoiceCookieTypeStr: '',
      invoiceCookieTypeStr2: '',
      invoiceCookieTitle: '',
      invoiceCookieTitle2: '',
      isFirst: 1,
      hasRule: '',
      voucherName: '请选择优惠券!',
      voucherDate: '',
      discountIds: [],
      needMoney: '',
      isRules: false,
      cacheMap: {},
      postMoney: '',
      specialVoucher: '',
      postHisId: '',
      readyArea: {
        province: { id: '', name: '' },
        city: { id: '', name: '' },
        area: { id: '', name: '' }
      },
      postInfo: {
        fullName: '',
        mobile: '',
        zipcode: '',
        email: '',
        address: ''
      },
      isShowAddress: true,
      loginFlag: true
    }
  },
  async mounted () {
    const that = this
    await that.initOrderDetail()
    // 登录监听
    that.$on('watchLogin', function () {
      // 已登录
      that.loginFlag = false
    })
  },
  methods: {
    dateFormat (date) {
      let _date = new Date(date)
      _date =
        _date.getFullYear() +
        '-' +
        (_date.getMonth() + 1 < 10
          ? '0' + (_date.getMonth() + 1)
          : _date.getMonth() + 1) +
        '-' +
        _date.getDate()
      return _date
    },
    submitOrder () {
      const that = this
      let prules = ''
      let orderBookList = getCookie('order_book_list')
      let rules = document.querySelector('#rules')

      if (rules != null && rules.checked) {
        prules = '1'
      } else {
        prules = '0'
      }

      if (orderBookList != null) {
        orderBookList = orderBookList.replace(/"/g, '')
      }
      if (
        orderBookList + '' !== undefined &&
        orderBookList + '' !== '' &&
        (that.postHisId + '' === '' ||
          that.postHisId + '' === '-1' ||
          that.postHisId + '' === undefined)
      ) {
        let $Toast = new Toast()
        $Toast.open({ message: '请填写收货地址！' })
        return
      }
      let setting = {
        orderId: that.order.orderId + '',
        prules: prules,
        pvip: '1',
        buy_book_list: orderBookList,
        voucherIds: '',
        yqm: '0'
      }
      updateOrder(setting).then(res => {
        if (res.code + '' === '1') {
          gotoUrl('/payment/confirmOrder.html')
        }
      })
    },
    clickChecked (cenId) {
      const that = this
      let currentCen = document.querySelector('#' + cenId)
      let currentChk = document.querySelector('#' + cenId + ' .chk')
      let currentIpt = document.querySelector(
        '#' + cenId + " input[name='myvoucher']"
      )
      let vouchers = document.querySelectorAll(
        "input[name='myvoucher']:checked"
      )
      let checked = false
      if (currentChk.className.indexOf('isvalid') + '' !== '-1') {
        if (currentIpt.checked === true) {
          currentChk.classList.remove('j')
          currentCen.classList.remove('tj')
          currentIpt.checked = false
          vouchers = document.querySelectorAll(
            "input[name='myvoucher']:checked"
          )
        } else {
          currentChk.classList.add('j')
          currentCen.classList.add('tj')
          currentIpt.checked = true
          vouchers = document.querySelectorAll(
            "input[name='myvoucher']:checked"
          )
        }
        if (document.querySelector('#checkbox_c1') != null) {
          document.querySelector('#checkbox_c1').checked = false
        }
        that.voucherName = '请选择优惠券！'
        that.voucherDate = ''
        if (vouchers != null && vouchers !== '' && vouchers.length > 0) {
          checked = true
          if (vouchers.length > 1) {
            that.voucherName = '您已选择' + vouchers.length + '张优惠券'
          } else {
            vouchers.forEach((item, index) => {
              that.voucherName = item.getAttribute('voucherName')
              that.voucherDate = item.getAttribute('voucherDate')
            })
          }
        }
        if (document.querySelector('#checkbox_c1') != null) {
          document.querySelector('#checkbox_c1').checked = checked
        }
        let voucherId = currentIpt.getAttribute('voucherId')
        setTimeout(() => {
          that.changeDiscount(voucherId)
        }, 10)
      }
    },
    showYHPop () {
      document.querySelector('.mask').style.display = 'block'
      document.querySelector('.yhqtk').style.display = 'block'
    },
    closeYHPop () {
      document.querySelector('.mask').style.display = 'none'
      document.querySelector('.yhqtk').style.display = 'none'
    },
    changeDiscount (type) {
      const that = this
      let discount = ''
      let discountKey = ''
      let rules = document.querySelector('#rules') // 优惠策略按钮
      if (rules != null && rules.checked) {
        discount = 'discount'
      } else {
        discount = ''
      }
      // 获取书籍及课程列表
      let orderCourseList = getCookie('order_course_list')
      let orderBookList = getCookie('order_book_list')
      if (orderCourseList != null) {
        orderCourseList = orderCourseList.replace(/"/g, '')
      }
      if (orderBookList != null) {
        orderBookList = orderBookList.replace(/"/g, '')
      }

      let voucherType = document.querySelector('#voucher' + type)
      if (rules != null && rules.checked) {
        that.isRules = true
      } else {
        that.isRules = false
      }

      if (type + '' !== '0') {
        if (voucherType.checked) {
          that.discountIds.push(parseInt(type))
        } else {
          that.discountIds.splice(that.discountIds.indexOf(parseInt(type)), 1)
        }
        discountKey = discount + '_' + that.discountIds
      } else {
        that.discountIds = []
        discountKey = discount + '_'
      }
      if (that.cacheMap[discountKey] !== undefined) {
        that.coupon = that.cacheMap[discountKey].couponList
        if (typeof that.coupon === 'string') {
          that.coupon = JSON.parse(that.coupon)
        }
        that.totalMoney = that.cacheMap[discountKey].totalMoney
        that.postMoney = that.cacheMap[discountKey].postMoney
        that.finalTotalMoney = that.cacheMap[discountKey].finalTotalMoney
      } else {
        // 优惠接口
        let discountSetting = {
          isRules: that.isRules + '',
          postMoney: that.order.postMoney + '',
          totalNum: that.order.productNum + '',
          chooseCoupon: that.discountIds.join(','),
          select_course_list: orderCourseList,
          free_list: null,
          buy_book_list: orderBookList
        }
        getSpecialDiscount(discountSetting).then(res => {
          that.cacheMap[discountKey] = res
          that.totalMoney = res.totalMoney
          that.postMoney = res.postMoney
          that.finalTotalMoney = res.finalTotalMoney
          that.coupon = JSON.parse(res.couponList)
        })
      }
      setTimeout(function () {
        for (let j = 0; j < that.discountIds.length; j++) {
          let thisObj = document.querySelector(
            '#voucher' + that.discountIds[j]
          )
          if (thisObj && !thisObj.checked) {
            thisObj.checked = true
            thisObj.parentNode('.chk').classList.add('j')
            thisObj.childNodes('.cen').classList.add('tj')
          }
        }
        if (that.discountIds.length <= 0) {
          if (document.querySelector('#checkbox_c1') != null) {
            document.querySelector('#checkbox_c1').checked = true
          }
          that.voucherName = '请选择优惠券！'
          that.voucherDate = ''
        }
      }, 10)
    },
    currency (num) {
      return currency(num)
    },
    limitTo (str, len) {
      return limitTo(str, len)
    },
    initOrderDetail () {
      const that = this
      let $Loading = new Loading()
      $Loading.open()
      let memberId = getCookie('username')
      let cdelInvoice = getCookie('cdelInvoice')

      // 获取书籍及课程列表
      let orderCourseList = getCookie('order_course_list')
      if (orderCourseList != null) {
        orderCourseList = orderCourseList.replace(/"/g, '')
      }
      let orderBookList = getCookie('order_book_list')
      if (orderBookList != null || orderBookList !== undefined) {
        orderBookList = orderBookList.replace(/"/g, '')
      }
      if (orderBookList + '' === '') {
        that.isShowAddress = false
      }

      let invoiceType = '3'
      let invoiceTypeVal = document.querySelector('#invoiceType')
      let invoiceflagVal = document.querySelector('#invoiceflag')
      if (cdelInvoice != null && cdelInvoice !== '') {
        cdelInvoice = JSON.parse(cdelInvoice)
        invoiceType = cdelInvoice.invoiceType
      }

      let rules = document.querySelector('#rules') // 优惠策略按钮
      // 订单详情接口
      let setting = {
        buy_book_list: orderBookList,
        select_course_list: orderCourseList,
        memberId: memberId,
        payStyle: '3',
        invoiceType: invoiceType
      }
      getOrderDetail(setting).then(res => {
        $Loading.close()
        // 商品信息、账户信息和优惠信息
        let discountResultList = JSON.parse(res.discountResultList)
        // 订单信息
        that.order = res.order
        that.hasRule = res.hasRule
        that.postMoney = that.order.postMoney
        that.productList = discountResultList[0].productList
        that.needMoney = res.needMoney
        if (discountResultList[0].couponList) {
          that.coupon = discountResultList[0].couponList
          that.needMoney = discountResultList[0].needMoney
        }
        if (rules != null && rules.checked === false) {
          that.productList =
            discountResultList[discountResultList.length - 1].productList
          if (discountResultList[discountResultList.length - 1].couponList) {
            that.coupon =
              discountResultList[discountResultList.length - 1].couponList
            that.needMoney =
              discountResultList[discountResultList.length - 1].needMoney
          }
        }
        let discountInitObj1 = {}
        let discountInitObj2 = {}

        discountInitObj1.couponList = discountResultList['0'].couponList
        discountInitObj1.totalMoney = that.needMoney.totalMoney
        discountInitObj1.finalTotalMoney =
          that.needMoney.totalMoneyAfterDiscount
        discountInitObj1.postMoney = that.postMoney

        discountInitObj2.couponList = discountResultList['1'].couponList
        discountInitObj2.totalMoney = that.needMoney.totalMoney
        discountInitObj2.finalTotalMoney =
          that.needMoney.totalMoneyAfterDiscount
        discountInitObj2.postMoney = that.postMoney

        that.cacheMap['discount_'] = discountInitObj1
        that.cacheMap['_'] = discountInitObj2
        that.totalMoney = that.needMoney.totalMoney
        that.finalTotalMoney = that.needMoney.totalMoneyAfterDiscount

        that.productList = that.productList.sort(compareSort('productType'))
        that.hasBook = res.hasBook
        that.defaultSendTypeName = res.defaultSendTypeName
        that.specialVoucher = res.specialVoucher
        that.postHisId = res.order.postHisId
        setCookie('invoiceType', JSON.stringify(res.invoiceType))
        setCookie('orderId', that.order.orderId)
        if (
          that.order.shopMemPostInfo !== undefined &&
          that.order.shopMemPostInfo + '' !== ''
        ) {
          that.isPostInfo = true
        }
        that.showInvoice = res.showInvoice
        if (cdelInvoice) {
          // cdelInvoice = JSON.parse(cdelInvoice)
          that.invoiceOrderId = cdelInvoice.orderId
          if (that.invoiceOrderId + '' === that.order.orderId + '') {
            that.invoiceCookieType = cdelInvoice.invoiceType
            invoiceTypeVal.value = cdelInvoice.invoiceType
            if (cdelInvoice.invoiceType + '' === '1' || cdelInvoice.invoiceType + '' === '4') {
              invoiceflagVal.value = 1
            }
            if (
              cdelInvoice.invoiceTypeStr != null &&
              cdelInvoice.invoiceTypeStr + '' !== ''
            ) {
              that.invoiceCookieTypeStr = cdelInvoice.invoiceTypeStr
            }
            that.invoiceCookieTitle = cdelInvoice.invoiceTitle
            that.invoiceCookieTypeStr2 = cdelInvoice.invoiceTypeStr2
            that.invoiceCookieTitle2 = cdelInvoice.invoiceTitle2
          }
        } else {
          invoiceTypeVal.value = 0
          invoiceflagVal.value = 2
          if (that.showInvoice === true) {
            that.invoiceCookieTypeStr = '暂无发票信息'
          }
        }
      })
    },
    gotoAddressManage () {
      const that = this
      gotoUrl(
        '/payment/addressManage.html?orderId=' +
          that.order.orderId +
          '&postHisId=' +
          that.postHisId +
          ''
      )
    },
    toInvoicePage () {
      const that = this
      gotoUrl(
        '/payment/invoiceInfo.html?orderId=' +
          that.order.orderId +
          '&postHisId=' +
          that.postHisId +
          ''
      )
    },
    trest (e) {
      let item = e.detail[0]
      this.readyArea = {
        province: { id: item['province'].id, name: item['province'].name },
        city: { id: item['city'].id, name: item['city'].name },
        area: { id: item['area'].id, name: item['area'].name }
      }
      this.$set(this.readyArea, item['area'].id, this.readyArea)
      this.flag = false
      this.flag = true
    },
    formatMobile (str) {
      return str.substr(0, 3) + '****' + str.substr(7)
    },
    savePostInfo () {
      const that = this
      let $Toast = new Toast()
      let $Loading = new Loading()
      // 收货人
      if (that.postInfo.fullName + '' === '') {
        $Toast.open({ message: '请输入收件人姓名！' })
        return
      }

      // 手机号码
      if (that.postInfo.mobile + '' === '') {
        $Toast.open({ message: '手机号码不能为空' })
        return
      } else {
        let mobilePhoneRegex = /^[0-9]{11}$/
        if (!mobilePhoneRegex.test(that.postInfo.mobile)) {
          $Toast.open({ message: '手机号码不正确' })
          that.postInfo.mobile = ''
          return
        }
      }

      // 邮编
      if (that.postInfo.zipcode + '' === '') {
        $Toast.open({ message: '请填邮政编码' })
        return
      } else {
        let szReg = /^[0-9][0-9]{5}$/
        if (!szReg.test(that.postInfo.zipcode)) {
          $Toast.open({ message: '请填正确的邮政编码' })
          that.postInfo.zipcode = ''
          return
        }
      }

      // 邮箱
      if (that.postInfo.email + '' === '') {
        $Toast.open({ message: '请填邮箱' })
        return
      } else {
        let szReg = /^([a-zA-Z0-9]+[_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!szReg.test(that.postInfo.email)) {
          $Toast.open({ message: '邮箱不正确' })
          that.postInfo.email = ''
          return
        }
      }

      // 所在地区
      if (
        that.readyArea.province.name + '' === '' ||
        that.readyArea.city.name + '' === '' ||
        that.readyArea.area.name + '' === ''
      ) {
        $Toast.open({ message: '请选择您所在的地区' })
        return
      }

      const containSpecial = function (s) {
        let containSpecial = RegExp(
          /[( )(~)(!)(@)(#) ($)(%)(^)(&)(*)(()())(\-)(_)(+)(=) ([)(\])({)(})(|)(\\)(;)(:)(')(")(,)(.)(/) (<)(>)(?)()]+/
        )
        return containSpecial.test(s)
      }
      // 详细地址
      if (that.postInfo.address + '' === '') {
        $Toast.open({ message: '详细地址不能为空' })
        return
      } else {
        if (containSpecial(that.postInfo.address)) {
          $Toast.open({ message: '详细地址不正确！' })
          that.postInfo.address = ''
          return
        }
      }

      // 保存

      $Loading.open()
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
      }
      updatePostInfoInvoiceChangeOrder(setting).then(res => {
        $Loading.close()
        if (res.success + '' === '1') {
          that.initOrderDetail()
        } else {
          $Toast.open({
            message: '保存失败'
          })
        }
      })
    }
  }
}
</script>
