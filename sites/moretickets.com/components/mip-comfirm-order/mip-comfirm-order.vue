<template>
  <div class="payment-page2">
    <div class="main-content">
      <div class="show-description">
        <div style="position:relative;padding-top:5px">
          <div class="show-source color-gray">
            本票由<span>{{ show.sellerName }}</span>提供
          </div>
          <span
            style="font-size:12px;position:absolute;right:0;top:5px;color:rgb(170,170,170)"
            @click="showCompensatePop()"><i style="font-size: 10px; font-style: normal; background-color: #ccc;color: #fff; border-radius: 50%;width: 12px;height: 12px;position: absolute;left: -15px;top: 2px;text-align: center;">?</i>退款及赔付规则</span>
        </div>
        <div class="show-detail">
          <div class="text-detail">
            <div class="name">{{ show.showName }}</div>
            <div class="time">{{ pageData.sessionName }}</div>
            <div class="place">{{ show.venueName }}</div>
          </div>
          <img
            :src="show.poster"
            class="show-img" >
        </div>
        <div class="ticket-detail">
          <div>
            <span class="qty">{{ pageData.ticketSeatPlanName || orderFormData.originalPrice }}</span>
            <span v-if="!pageData.ticketSeatPlanName">票面</span>
          </div>
          <div>
            <span class="qty">{{ orderFormData.count }}</span>
            {{ pageData.ticketUnitCNName }}
          </div>
        </div>
        <div
          class="ticket-comments-backup"
          ng-class="{'hide-content': !isTicketCommentOveflow()}">
          {{ pageData.ticketComments }}
        </div>
      </div>
      <div class="delivery">
        <div class="justify-row content-row">
          <div class="label">取票方式</div>
          <div class="delivery-means">
            <div
              v-for="(d,index) in deliveries"
              v-show="(show[d.attrName] && d.attrName!=='support_venue') || (show[d.attrName] && d.attrName==='support_venue' && !show['support_eticket'])"
              :class="{active: selectedDeliver.text===d.text}"
              :key="index"
              class="delivery-item"
              @click="changeDelivery(d)">
              <div class="delivery-name">{{ d.text }}</div>
            </div>
          </div>
        </div>
        <!--快递-->
        <div v-show="'快递送票'===selectedDeliver.text">
          <div class="justify-row content-row address">
            <div
              v-if="!address.locationOID"
              class="label">收货地址</div>
            <div
              v-if="!address.locationOID"
              class="link-label"
              @click="showAddrList()">添加地址</div>
            <div
              v-if="address.locationOID"
              class="nav-next-page"
              @click="showAddrList()">
              <div class="client-detail" >
                <span
                  v-if="address.isDefault"
                  class="default-mark">默认</span>
                <span class="client-name">{{ address.clientName }}</span>
                <span class="client-number">{{ address.cellphone }}</span>
              </div>
              <div class="address-detail">
                <span class="main-address">{{ address.location.province+address.location.city+address.location.district }}</span>
                <span class="detail">{{ address.detailAddress }}</span>
              </div>
            </div>
          </div>
          <div class="justify-row content-row">
            <div class="label">配送方式</div>
            <div
              v-show="selectedExpress && !selectedExpress.areaOID"
              class="placeholder">填写地址后可选</div>
            <div
              v-show="selectedExpress && selectedExpress.areaOID"
              class="shipment">
              <div
                v-for="(e,index) in expresses"
                :class="{selected: selectedExpress.areaOID === e.areaOID}"
                :key="index"
                class="shipment-item"
                @click="selectExpress(e)">
                {{ e.expressName }} &nbsp;{{ e.deliverFee }}元
              </div>
            </div>
          </div>
          <div
            v-if="needIdCard"
            class="justify-row content-row">
            <div class="label">取票人身份证</div>
            <input
              :class="{'no-content': !ownerInfo.idCardNum}"
              v-model="ownerInfo.idCardNum"
              class="manual-input"
              placeholder="该节目需要提供身份证号">
          </div>
        </div>
        <!--现场-->
        <div v-show="'现场取票'===selectedDeliver.text">
          <div class="justify-row content-row">
            <div class="label">取票人姓名</div>
            <input
              v-model="ownerInfo.userName"
              :class="{'no-content': !ownerInfo.userName}"
              class="manual-input"
              placeholder="请输入取票人姓名">
          </div>
          <div class="justify-row content-row">
            <div class="label">取票人手机号</div>
            <input
              v-model="ownerInfo.telphone"
              :class="{'no-content': !ownerInfo.telphone}"
              class="manual-input"
              placeholder="请输入取票人手机号">
          </div>
          <div
            v-if="needIdCard"
            class="justify-row content-row">
            <div class="label">取票人身份证</div>
            <input
              v-model="ownerInfo.idCardNum"
              :class="{'no-content': !ownerInfo.idCardNum}"
              class="manual-input"
              placeholder="该节目需要提供身份证号">
          </div>
          <div class="ticket-pickup-tip">
            <div class="row-noinput">
              <div class="label">取票时间:</div>
              <div class="content">演出开场前1小时（若临近演出开场下单，须在下单后等待30分钟至1小时取票）</div>
            </div>
            <div class="row-noinput">
              <div class="label">取票地点:</div>
              <div class="content">演出场馆</div>
            </div>
            <div class="row-noinput">
              <div class="label">取票说明:</div>
              <div class="content">
                <div>具体取票信息以收到的摩天轮短信通知为准。客服热线<a
                  class="hot-line"
                  href="tel:021-54679162">021-54679162</a></div>
              </div>
            </div>
          </div>
        </div>
        <!--上门-->
        <div v-show="'上门自取'===selectedDeliver.text">
          <div class="justify-row content-row">
            <div class="label">取票人姓名</div>
            <input
              v-model="ownerInfo.userName"
              :class="{'no-content': !ownerInfo.userName}"
              class="manual-input"
              placeholder="请输入取票人姓名">
          </div>
          <div class="justify-row content-row">
            <div class="label">取票人手机号</div>
            <input
              v-model="ownerInfo.telphone"
              :class="{'no-content': !ownerInfo.telphone}"
              class="manual-input"
              placeholder="请输入取票人手机号">
          </div>
          <div
            v-if="needIdCard"
            class="justify-row content-row">
            <div class="label">取票人身份证</div>
            <input
              v-model="ownerInfo.idCardNum"
              :class="{'no-content': !ownerInfo.idCardNum}"
              class="manual-input"
              placeholder="该节目需要提供身份证号">
          </div>
          <div class="ticket-pickup-tip">
            <div class="row-noinput">
              <div class="label">取票时间:</div>
              <div class="content">{{ show.offlineTime }}</div>
            </div>
            <div class="row-noinput">
              <div class="label">取票地点:</div>
              <div class="content">{{ show.offlineAddress }}</div>
            </div>
            <div class="row-noinput">
              <div class="label">取票说明:</div>
              <div class="content">
                <div>请收到含取票码的短信后再上门取票。客服热线<a
                  class="hot-line"
                  href="tel:021-54679162">021-54679162</a></div>
              </div>
            </div>
          </div>
        </div>
        <!--电子票-->
        <div v-show="'电子票'===selectedDeliver.text">
          <div class="justify-row content-row">
            <div class="label">取票人姓名</div>
            <input
              v-model="ownerInfo.userName"
              :class="{'no-content': !ownerInfo.userName}"
              class="manual-input"
              placeholder="请输入取票人姓名">
          </div>
          <div class="justify-row content-row">
            <div class="label">取票人手机号</div>
            <input
              v-model="ownerInfo.telphone"
              :class="{'no-content': !ownerInfo.telphone}"
              class="manual-input"
              placeholder="请输入取票人手机号">
          </div>
          <div
            v-if="needIdCard"
            class="justify-row content-row">
            <div class="label">取票人身份证</div>
            <input
              v-model="ownerInfo.idCardNum"
              :class="{'no-content': !ownerInfo.idCardNum}"
              class="manual-input"
              placeholder="该节目需要提供身份证号">
          </div>
          <div class="ticket-pickup-tip">
            <div class="row-noinput">
              <div class="label">取票说明:</div>
              <div class="content">
                <div>支付成功后，请凭电子票短信中的提示入场（实际入场方式以现场为准）。客服热线
                  <a
                    class="hot-line"
                    href="tel:021-54679162">021-54679162</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="show.supportCoupon"
        class="coupon">
        <div
          class="justify-row nav-next-page content-row no-border"
          @click="showCouponList()">
          <div class="label">抵用券</div>
          <div
            v-if="discount"
            class="discount">
            <span class="number">立减{{ discount }}元</span>
          </div>
          <!-- <div class="discount" v-if="!discount">不支持抵用券</div> -->
          <!-- <div class="discount" ng-if="allCoupons.length===0">无可用抵用券</div>-->
          <div
            v-if="!discount"
            class="discount">不使用抵用券</div>
            <!--<div class="discount" ng-if="!show.supportCoupon">不支持优惠券</div> -->
        </div>
      </div>
      <div
        v-if="show.supportComments || show.support_comments"
        class="coupon">
        <div class="row-input">
          <div class="label">给摩天轮留言</div>
          <input
            v-model="ownerInfo.remark"
            class="manual-input"
            placeholder="选填">
        </div>
      </div>
      <div class="tips">
        <div>购票须知: </div>
        <div>根据演出火爆情况，摩天轮可能会将您所选的快递送票、上门自取等取票方式调整为现场取票（已支付的快递费会退还），敬请谅解。现场无票全额退赔。</div>
      </div>
    </div>
    <mip-fixed
      type="bottom"
      still>
      <div class="footer">
        <div class="agreement-row">
          我已阅读<a
            class="agreement-link"
            @click="showAgreeBox()">《第三方商品平台交易服务协议》</a>
        </div>
        <div class="footer-text">
          <div class="monney">
            <i
              v-show="show.priceItems && show.priceItems.length>0"
              class="questionIcon"
              @click="orderFeeFlag = true">!</i>
            合计: <span class="total">{{ getAmount }}</span>
            <span class="word">元</span>
            <div class="word">不支持无理由退换货</div>
          </div>
          <div
            class="submit-btn"
            @click="comfirmOrder()">提交订单</div>
        </div>
      </div>
    </mip-fixed>
    <!-- 订单协议  -->
    <div v-show="agreeBoxFlag">
      <div class="pop_filter_bg"/>
      <div class="pop_box">
        <div
          v-injectHtml="orderAgreementData"
          id="userOrderAgreement"
          style=" height: 230px;width: 100% ;border: none; margin: 0;overflow: scroll;color: #000; text-align: left;line-height:24px;padding: 15px;">
          加载协议中
        </div>
        <div
          style="width: 150px;height: 30px;background: #F2593F;font-size: 12px; color: #FFF; text-align: center;line-height: 30px; margin: 0 auto;margin-top: 10px"
          @click.stop="agreeBoxFlag=false">同意协议</div>
      </div>
    </div>
    <!-- 退款及赔付规则  -->
    <div v-show="showCompensate">
      <div class="pop_filter_bg"/>
      <div class="pop_box">
        <div
          id="userOrderAgreement"
          style=" height: 230px;width: 100% ;border: none; margin: 0;overflow: scroll;color: #000; text-align: left;line-height:24px;padding: 15px;"
          v-html="compensateRules.agreementContent">
          加载协议中
        </div>
        <div
          style="width: 150px;height: 30px;background: #F2593F;font-size: 12px; color: #FFF; text-align: center;line-height: 30px; margin: 0 auto;margin-top: 10px"
          @click.stop="showCompensate=false">确定</div>
      </div>
    </div>
    <!--订单明细-->
    <div
      v-if="orderFeeFlag"
      class="pop"/>
    <div
      v-if="orderFeeFlag"
      class="pop-content">
      <div class="header">订单明细</div>
      <div class="box">
        <div
          v-for="(priceItem,index) in show.priceItems"
          :key="index"
          class="price-item clearfix">
          {{ priceItem.priceItemName }}<note
            v-if="priceItem.comments"
            notecontent = "priceItem.comments" />
          <span class="font2 space1">{{ priceItem.priceItemVal }}元</span>
        </div>
        <div
          v-if="discount"
          class="price-item clearfix">
          抵用券<span class="font2 space1">-{{ discount }}元</span>
        </div>
        <div
          v-if="selectedExpress && selectedExpress.deliverFee>0 && delivery==='express'"
          class="price-item clearfix">
          快递费<span class="font2 space1">{{ selectedExpress.deliverFee }}元</span>
        </div>
        <div class="price-item clearfix">
          合计<span
            class="font2 space1"
            style="color:rgb(253,104,87)">{{ getAmount }}元</span>
        </div>
      </div>
      <div
        class="close"
        @click="orderFeeFlag = false" >确定</div>
    </div>
    <div
      v-show="toastmsg"
      class="toast-msg">
      {{ toastmsg }}
    </div>
  </div>
</template>

<style scoped lang="less">
@main-color: #ff1d41;
@dark-font: #323038;
@normal-font: #494949;
@light-font: #aaa;
@normal-border: 1px solid #e4e4e4;
@medium-font: #95949d;
#agree_order_content {
    background: #ececec;
    padding: 10px;
    font-size: 10px;
}
.nav-next-page {
    position: relative;
}
.nav-next-page:before {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 8px;
    height: 8px;
    transform-origin: 50% 0;
    border-left: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
    transform: rotate(-135deg) translateY(-50%);
}
li, ol, ul {
    list-style: none outside none;
}
.box-pack(@pack){
    -moz-box-pack: @pack;
    -webkit-box-pack: @pack;
    box-pack: @pack;
}
.box-align(@align){
    -moz-box-align: @align;
    -webkit-box-align: @align;
    box-align: @align;
}
.page-header{
    height: 5rem;
    width: 100%;
    line-height: 5rem;
    position: relative;
    .back-icon{
        height: 100%;
        width: 10%;
        min-width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
        .box-pack(center);
        .box-align(center);
        position: absolute;
        left: 0;
    }
    .header-text{
        width: 100%;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1.6rem;
        text-indent: 3rem;
        // padding-top: 0.2rem;
        &.center{
            text-indent: 0;
        }
        &.right{
          float: right;
          margin-right: 1.8rem;
          width: auto;
          text-indent: 0;
        }
    }
}
.pop_filter_bg{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-width: 1190px;
  z-index: 9990;
  background: #000;
  filter: Alpha(opacity=50);
  -moz-opacity: .5;
  opacity: .5;
}

.pop_box{
  position: absolute;
  padding-top: 10px;
  left: 0;
  top: 40px;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  width: 90%;
  height: 300px;
  line-height: 40px;
  font-size: 1.4rem;
  text-align: center;
  color: #fff;
  background-color: #FFF;
  z-index: 9991;
  -webkit-transition: opacity 1s;
  transition: opacity 1s;
  -webkit-border-radius: 4px;
  border-radius: 4px
}
.pop{
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 9990;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    // filter: Alpha(opacity=80);
    // -moz-opacity: 0.8;
    // opacity: 0.8;
}
.pop_cancel{
    position:absolute;
    left: 50%;
    top: 200px;
    z-index: 9995;
    width: 28rem;
    font-size: 1.6rem;
    text-align: center;
    border-radius: 4px;
    background-color: #fff;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    .cancel_title{
        overflow: hidden;
        height: 60px;
        line-height: 60px;
        color: #000;
        border-bottom: 1px solid #e4e4e4;
    }
    .switch_title{
        padding: 20px 10px;
        color: #000;
        border-bottom: 1px solid #e4e4e4;
    }
    .cancel_result{
        overflow: hidden;
        line-height: 45px;
        a{
            float: left;
            width: 50%;
            color: #db5252;
        }
        a:last-child{
            border-left:1px solid #e4e4e4;
        }
    }
}
.no-border{
  border:0 !important;
}
.toast-msg {
  width: 180px;
  padding: 15px 10px;
  line-height: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1000;
  font-size:1.4rem;
}
.questionIcon {
    display: inline-block;
    font-style: normal;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #aaa;
    color: #fff;
    background-color: #ccc;
    font-size: 1.2rem;
    text-align: center;
    margin: 2px;
    line-height: 12px;
    position: relative;
    text-indent: 0;
    z-index: 5990;
}
.box-orient(@orient){
    -moz-box-orient: @orient;
    -webkit-box-orient: @orient;
    box-orient: @orient;
}
.box-flex(@flex){
    -moz-box-flex: @flex;
    -webkit-box-flex: @flex;
    box-flex: @flex;
    flex: @flex;
    display: block;
}
.box-pack(@pack){
    -moz-box-pack: @pack;
    -webkit-box-pack: @pack;
    box-pack: @pack;
}
.fs(@px){
    font-size: unit(@px/10,rem)
}
.w(@px){
    width: unit(@px/10,rem)
}
.h(@px){
    height: unit(@px/10,rem)
}
.lh(@px){
    line-height: unit(@px/10,rem)
}
.b-r(@px){
    border-radius: unit(@px/10,rem)
}
.mt(@px){
    margin-top: unit(@px/10,rem)
}
.mr(@px){
    margin-right: unit(@px/10,rem)
}
.mb(@px){
    margin-bottom: unit(@px/10,rem)
}
.ml(@px){
    margin-left: unit(@px/10,rem)
}
.pt(@px){
    padding-top: unit(@px/10,rem)
}
.pr(@px){
    padding-right: unit(@px/10,rem)
}
.pb(@px){
    padding-bottom: unit(@px/10,rem)
}
.pl(@px){
    padding-left: unit(@px/10,rem)
}
.t(@px){
    top: unit(@px/10,rem)
}
.b(@px){
    bottom: unit(@px/10,rem)
}
.l(@px){
    left: unit(@px/10,rem)
}
.r(@px){
    right: unit(@px/10,rem)
}
.agree_main{
  font-size: 10px;
}
.payment-page2{
    color: @normal-font;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: 1.2rem;
    input, textarea, a {
        -webkit-tap-highlight-color: transparent;
        -webkit-appearance: none;
    }
    .user-credit{
      display: flex;
      align-items: center;
      .info-icon{
        margin-left: 0.4rem;
        margin-right: 1.8rem;
      }
    }
    .popup-title{
      width: 100%;
      text-align: center;
      font-size: 1.6rem;
      color: @dark-font;
      padding: 1.8rem 0;
    }
    .popup-inner-content{
      height: 12rem;
      overflow-x: hidden;
      overflow-y: auto;
      padding:0 1.8rem;
      line-height: 2.2rem;
    }
    .justify-row{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .content-row{
      height: 6rem;
      .label{
        line-height: 2rem;
        color: @dark-font;
        font-size: 1.5rem;
      }
      .link-label{
        color: @main-color;
        font-size: 1.4rem;
      }
      border-bottom: @normal-border;
      &.no-border{
        border: none;
      }
    }
    .page-header {
         border-bottom: 1px solid rgb(228,228,228);
    }
    .layout-row{
        padding: 1.5rem 0;
        width: 100%;
        border-bottom: @normal-border;
    }
    .box-orient(vertical);

    .manual-input{
        display: block;
        outline: none;
        border: none;
        text-align: right;
        &.no-content{
          color: @medium-font;
        }
    }
    .hot-line{
        color: rgb(16, 142, 233);
        padding: 0 0.5rem;
    }
    .question {
        .ml(2);
        .mr(5);
        display: inline-block;
        .w(15);
        .h(15);
        background: url(~@/static/icon/question-icon.png) no-repeat;
        background-size: 15px 15px;
    }
    .pre-btn-icon{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 2rem;
        background:rgb(204,204,204);
        position: relative;
        margin-right: 1rem;
        margin-left: 0.4rem;
        &:before{
            content: "";
            position: absolute;
            height: 2px;
            background:rgb(255,255,255);
            left: 25%;
            top: 50%;
            width: 50%;
            transform: translateY(-50%);
        }
        &:after{
            content: "";
            position: absolute;
            width: 2px;
            background: rgb(255,255,255);
            left: 50%;
            top: 25%;
            height: 50%;
            transform: translateX(-50%);
        }
    }
    .btn-text{
        color: rgb(119,119,119);
        font-size: 1.4rem;
    }
    .main-content{
        .mt(5);
        background-color: rgb(242,242,242);
        .box-flex(1);
        overflow-y: auto;
        .selected-icon,.unselected-icon{
            background: url(~@/static/icon/mtl_sprites_624.png);
            background-size: 300px 200px;
            position: absolute;
            right: 2rem;
            width: 22px;
            height: 22px;
            top: 50%;
            transform: translateY(-50%);
            background-color: #fff;
            border-radius: 22px;
        }
        .selected-icon{
            background-position: 0px -50px;
        }
        .unselected-icon{
            background-position: 0px -80px;
        }
        .ticket-client-detail{
            .pt(10);
            .pb(10);
            // border-bottom: 1rem solid #efefef;
        }
        .show-description{
            background-color: rgb(255,255,255);
            padding: 0 1.5rem;
            .ticket-comments-backup{
              padding:0 0 1.5rem 0;
              color: @medium-font;
              margin-top: -1rem;
              &.hide-content{
                height: 0px;
                overflow: hidden;
                opacity: 0;
              }
            }
            .ticket-detail{
              .justify-row;
              padding: 1.5rem 0;
              color: #000;
              font-size: 1.3rem;
              white-space: nowrap;
              .ticket-comments{
                color: @medium-font;
                padding: 0 1rem;
                flex: 1;
                overflow: hidden;
                .ticket-comments-inner{
                  white-space: nowrap;
                  &.hide-content{
                    opacity: 0;
                  }
                }
              }
              .qty{
                color: @main-color;
                font-weight: bold;
                font-size: 2rem;
                padding-right: 0.5rem;
              }
            }
            .show-source {
                .fs(12);
            }
            .show-detail{
                padding: 1.8rem 0;
                display: flex;
                border-bottom: @normal-border;
                .show-img {
                    .w(90);
                    .h(120);
                    .b-r(4);
                }
                .text-detail{
                    flex: 1;
                    padding-right: 1.5rem;
                    line-height: 2.4rem;
                    .name{
                        font-weight: bold;
                        overflow: hidden;
                        color: #000;
                        font-size: 1.6rem;
                    }
                    .time, .zone, .place {
                        line-height: 2rem;
                        color: @medium-font;
                        font-size: 1.3rem;
                    }
                    .zone{
                      color: #000;
                    }
                }
            }
        }
        .delivery{
          margin-top: 1rem;
          background: #fff;
          padding: 0 1.8rem;
          .address{
            width: 100%;
            padding: 1.8rem 0;
            height: auto;
            .nav-next-page{
              width: 100%;
              position: relative;
              &:before {
                content: '';
                position: absolute;
                right: 0;
                top: 50%;
                width: 8px;
                height: 8px;
                transform-origin: 50% 0;
                border-left: 1px solid #d8d8d8;
                border-bottom: 1px solid #d8d8d8;
                transform: rotate(-135deg) translateY(-50%);
              }
            }
            .client-detail{
              color: @dark-font;
              font-size: 1.5rem;
              line-height: 2rem;
            }
            .address-detail{
              font-size: 1.4rem;
              color: @medium-font;
              padding-right: 3rem;
            }
            .default-mark {
              background: #ff1d41;
              color: #fff;
              font-size: 1.2rem;
              border-radius: 2px;
              padding: 0 .4rem;
              height: 2rem;
              line-height: 2rem;
            }
          }
          .ticket-pickup-tip{
            padding: 1.8rem 0;
          }
          .delivery-means{
            display: flex;
            border-right: none;
            .delivery-item{
              width: 7rem;
              height: 3rem;
              line-height: 3rem;
              color: @dark-font;
              text-align: center;
              font-size: 1.3rem;
              border-radius: 2px;
              border: 1px solid #eaeaeb;
              margin-left: 0.9rem;
              &.disabled{
                display: none;
              }
              &.active{
                border: 1px solid @main-color;
                color: @main-color;
              }
            }
          }
          .shipment{
            display: flex;
            .shipment-item{
              padding: 0.6rem 0.9rem;
              color: @dark-font;
              border: @normal-border;
              border-radius: 2px;
              margin-right: 0.9rem;
              &:last-child{
                margin-right: 0;
              }
              &.selected{
                border-color: @main-color;
                color: @main-color;
              }
            }
          }
        }
        .coupon {
            margin-top: 1rem;
            background-color: #fff;
            padding: 0 1.5rem;
            .discount{
              padding-right: 1rem;
              .number{
                color: @main-color;
                font-size: 1.4rem;
              }
            }
        }
        .tips {
            padding: 0 1.5rem;
            margin-top: 1rem;
            padding-bottom: 2rem;
            font-size: 1.3rem;
            line-height: 2rem;
            color: #68676c;
        }
        .row-input {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .pt(5);
            .pb(5);
            .fs(14);
            &.no-border{
                border-bottom: none;
            }
            .box-pack(justify);
            .label{
                .w(100);
            }
            input.manual-input {
                flex:1;
                border: 1px solid rgb(228,228,228);
                .b-r(4);
                text-align: left;
                .pl(10);
                .lh(36);
            }
            :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color: rgb(204,204,204); opacity:1;
            }

            ::-moz-placeholder { /* Mozilla Firefox 19+ */
                color: rgb(204,204,204);;opacity:1;
            }

            input:-ms-input-placeholder{
                color: rgb(204,204,204);;opacity:1;
            }

            input::-webkit-input-placeholder{
                color: rgb(204,204,204);;opacity:1;
            }
        }
        .row-noinput {
            display: flex;
            .label{
                .mr(5);
            }
            .content {
                flex: 1
            }
            .pt(5);
            .fs(12);
            // .color-gray();
        }
        .agreement-row{
            .selected-icon,.unselected-icon{
                left: 2rem;
            }
            position: relative;
            background-color: #efefef;
            padding: 1rem;
            margin: 0 -2rem;
            .agreement-text{
                padding-left: 4rem;
            }
        }
    }
    .agreement-link{
        color: #00A6FF;
        padding: 0 1rem;
        // text-decoration: underline;
    }

    .seller-name{
        color: #ccc;
        text-align: center;
        line-height: 4rem;
        margin: 0 -2rem;
        border-top: @normal-border;
    }
    .footer{
        // height: 5rem;
        // min-height: 5rem;
        // flex-basis: 5rem;
        // line-height: 5rem;
        // position: relative;
        background-color: #fff;
        .pt(2);
        .agreement-row {
            .lh(30);
            .fs(12);
            .pl(10);
            // .color-gray();
            border-bottom: 1px solid rgb(228,228,228,0,5);
            border-top: 1px solid rgb(228,228,228,0.5);
        }
        .footer-text{
            display: flex;
            align-items: center;
            text-align: center;
            padding: 0.9rem 1.8rem;
            .fs(14);
            .total{
               .fs(20);
                color: @main-color;
                padding: 0 0.5rem;
            }
            .monney {
                flex: 1;
                padding-right: 1rem;
                text-align: right;
                .word {
                    font-size: 1.2rem;
                    color: @medium-font;
                }
            }
            .submit-btn{
              font-weight: bold;
              width: 14.4rem;
              height: 4.4rem;
              line-height: 4.4rem;
              border-radius: 2px;
              font-size: 1.6rem;
              color: #fff;
              text-align: center;
              background-image: linear-gradient(287deg, #ff1d41, #ee0e87);
            }
        }

    }
    .pop {
        position: absolute;
        left: 0px;
        top: 0px;
        bottom: 0px;
        z-index: 9990;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        // filter: alpha(opacity=30);
        // -moz-opacity: 0.8;
        // opacity: 0.8;
    }
    .pop-content{
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 9999;
            width: 100%;
            background-color: #fff;
            color: #666;
            .price-item {
              font-size: 12px;
              color: rgb( 73,73,73);
              line-height: 20px;
              margin-bottom: 5px;
              text-indent: -5em;
              padding-left: 5em;
              .font2{
                float:right;
                text-align: right;
                color: rgb(51,21,17);
              }
            }
            .header {
                .pt(30);
                .fs(16);
                text-align: center;
                color: rgb(51,21,17);
            }
            .box {
                .mt(30);
                .mb(60);
                padding: 0 1.5rem;
                .fs(12);
                color: rgb(119,119,119);
                .lh(18);
            }
            .close{
                width: 100%;
                height: 5rem;
                line-height: 5rem;
                font-size: 1.6rem;
                color: #fff;
                text-align: center;
                background-color: @main-color;
                background-image: linear-gradient(to right, rgb( 239, 104, 86), rgb( 255, 49, 101));
            }
        }
}

</style>

<script>
import { httpGet, httpPost } from '@/common/httpUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil.js'
import * as adapterStorageUtil from '@/common/adapterStorageUtil'
import { templateCompile } from '@/common/urlUtil'
export default {
  directives: {
    injectHtml: {
      // 指令的定义
      update: function (el, binding, vnode) {
        let orderAgreementData = binding.value
        if (orderAgreementData && orderAgreementData.agreementTemplate) {
          agreeCallback(orderAgreementData)
        }
        function agreeCallback (agreeData) {
          el.innerHTML = agreeData.agreementTemplate
          let idsNameMap = {
            'agree_name': 'agreementName',
            'agree_showName': 'showName',
            'agree_seatPlanComments': 'seatPlanCommentsStr',
            'agree_qty': 'agreeQty',
            'agree_userCellphone': 'userCellphone',
            'agree_sellerName': 'sellerName',
            'agree_noTicketCompensatePrice': 'noTicketCompensatePrice',
            'agree_venueNoTicketCompensatePrice': 'venueNoTicketCompensatePrice'
          }
          let seatPlanCommentsStr = ''
          if (agreeData.seatPlanName) {
            seatPlanCommentsStr = agreeData.seatPlanName
          } else if (agreeData.originalPrice) {
            seatPlanCommentsStr = agreeData.originalPrice + '票面'
          }
          if (agreeData.seatPlanComments) {
            seatPlanCommentsStr += '(' + agreeData.seatPlanComments + ')'
          }
          agreeData.seatPlanCommentsStr = seatPlanCommentsStr

          let showBuyCountLimitStr = ''
          let curUnit = (agreeData && agreeData.seatPlanUnit && agreeData.seatPlanUnit.displayName) || ''
          if (agreeData && agreeData.showBuyCountLimit) {
            showBuyCountLimitStr = '(限购' + agreeData.showBuyCountLimit + curUnit + ')'
          }
          let agreeQty = agreeData.qty + curUnit + showBuyCountLimitStr
          agreeData.agreeQty = agreeQty
          let nodeList = el.getElementsByTagName('span')
          for (const item of nodeList) {
            if (item.id !== '' && idsNameMap[item.id] !== '') {
              item.innerText = agreeData[idsNameMap[item.id]]
            }
          }
          let nodeList2 = el.getElementsByTagName('li')
          for (const item of nodeList2) {
            item.style.listStyleType = 'none'
          }
          let nodeList3 = el.getElementsByTagName('div')
          for (const item of nodeList3) {
            if (item.className === 'agree_main') {
              item.style.fontSize = '10px'
            }
            if (item.id === 'agree_order_content') {
              item.style.background = '#ececec'
              item.style.padding = '10px'
              item.style.fontSize = '10px'
            }
          }
          let nodeList4 = el.getElementsByTagName('p')
          for (const item of nodeList4) {
            if (item.id === 'agree_name') {
              item.style.textAlign = 'center'
              item.style.fontWeight = '700'
              item.style.fontSize = '16px'
              item.innerText = agreeData[idsNameMap[item.id]]
            }
          }
        }
      }
    }
  },
  // components:[mipToast],
  props: {
    prefixUrl: {
      type: String,
      default: ''
    },
    preOrderUrl: {
      type: String,
      default: ''
    },
    orderUrl: {
      type: String,
      default: ''
    },
    deliverTemplateUrl: {
      type: String,
      default: ''
    },
    addressPageUrl: {
      type: String,
      default: ''
    },
    addressUrl: {
      type: String,
      default: ''
    },
    nextUrl: {
      type: String,
      default: ''
    },
    payUrl: {
      type: String,
      default: ''
    },
    lastUrl: {
      type: String,
      default: ''
    },
    loginUrl: {
      type: String,
      default: ''
    },
    refundUrl: {
      type: String,
      default: ''
    },
    couponPageUrl: {
      type: String,
      default: ''
    },
    orderAgreementUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      compensateRules: {},
      orderFormData: {

      },
      pageData: {
      },
      toastmsg: '',
      show: {

      },
      address: {
        location: {}
      },
      ownerInfo: {

      },
      priceItem: {},
      orderToken: '',
      deliverMap: {
        express: { text: '快递送票', attrName: 'support_express', name: 'express' },
        venue: { text: '现场取票', attrName: 'support_venue', name: 'venue' },
        onsite: { text: '上门自取', attrName: 'support_onsite', name: 'onsite' },
        eticket: { text: '电子票', attrName: 'support_eticket', name: 'eticket' }
      },
      selectedExpress: {},
      expresses: [],
      selectedDeliver: {},
      deliveries: [
        { text: '快递送票', attrName: 'support_express', name: 'express' },
        { text: '现场取票', attrName: 'support_venue', name: 'venue' },
        { text: '上门自取', attrName: 'support_onsite', name: 'onsite' },
        { text: '电子票', attrName: 'support_eticket', name: 'eticket' }
      ],
      totalAmount: 0,
      finalAmount: 0,
      orderFeeFlag: false,
      orderPending: true,
      showCompensate: false,
      agreeBoxFlag: false,
      discount: 0,
      coupon: '',
      awardPoint: 0,
      delivery: '',
      agreement_id: '',
      orderAgreementData: {}
    }
  },
  computed: {
    getAmount () {
      return parseInt(this.totalAmount || 0) + parseInt(this.delivery === 'express' && this.selectedExpress && this.selectedExpress.deliverFee > 0 ? this.selectedExpress.deliverFee : 0) - parseInt(this.discount || 0)
    }
  },
  mounted () {
    sessionStorageUtil.syncSessionData()
    let me = this
    this.prefixUrl && sessionStorageUtil.set('prefix', this.prefixUrl)
    this.ownerInfo.userName = adapterStorageUtil.get('ownerName')
    this.ownerInfo.cellphone = adapterStorageUtil.get('telphone')

    // 获取预下单数据,预订单拆单费和订单总额分别传
    this.orderFormData = {
      showOID: adapterStorageUtil.get('showOID'),
      sessionOID: adapterStorageUtil.get('sessionID'),
      originalPrice: adapterStorageUtil.get('ticketOriginalPrice'),
      compensatedPrice: adapterStorageUtil.get('seller_compensatedPrice'),
      ticketSaleOID: adapterStorageUtil.get('seller_ticketOID'),
      totalSalePrice: adapterStorageUtil.get('seller_totalSalePrice') || 0, // 不含拆单费的票面总售价
      token: adapterStorageUtil.get('token'),
      count: adapterStorageUtil.get('count') || 0,
      userOID: '000' // 目前不传入实际ID了
    }

    this.pageData = {
      ticketOriginalOID: adapterStorageUtil.get('ticketOriginalOID'),
      sessionName: adapterStorageUtil.get('sessionName'),
      ticketSeatPlanName: adapterStorageUtil.get('ticketOriginalName'),
      ticketComments: adapterStorageUtil.get('ticketComments'),
      ticketUnitCNName: adapterStorageUtil.get('ticketUnitCNName')
    }

    this.getPreOrder(this.orderFormData)

    let ticketSalePrice = this.orderFormData.totalSalePrice
    let compensatedPrice = this.orderFormData.compensatedPrice

    this.totalAmount = parseInt(ticketSalePrice) + parseInt(compensatedPrice || 0)

    // 在页面切换，也就是 <iframe> 展现/隐藏时，会在页面中触发切换事件
    window.addEventListener('show-page', () => {
      if (sessionStorageUtil.get('selected_addr')) {
        me.address = sessionStorageUtil.get('selected_addr')
        me.loadDeliverFeeTemplate(me.show.showOID, me.address.locationOID)
      }
      if (sessionStorageUtil.get('selected_coupon')) {
        let selectedCoupon = sessionStorageUtil.get('selected_coupon')
        if (!selectedCoupon.noUse) {
          me.selectedCouponId = sessionStorageUtil.get('selected_coupon').couponOID || me.selectedCouponId || ''
          me.discount = sessionStorageUtil.get('selected_coupon').discount || me.discount || ''
        } else {
          me.selectedCouponId = ''
          me.discount = 0
        }
      }
    })
    // 在页面切换，也就是 <iframe> 展现/隐藏时，会在页面中触发切换事件
    window.addEventListener('hide-page', () => {
      me.toastCallback = null
    })
  },
  methods: {
    // 下单后清空存储
    cleanData () {
      adapterStorageUtil.remove('ticketComments')
      adapterStorageUtil.remove('ticketOriginalName')
      adapterStorageUtil.remove('ticketUnitCNName')
      adapterStorageUtil.remove('seller_name')
    },
    getPreOrder (orderFormData) {
      let me = this
      let { showOID, userOID, totalSalePrice, compensatedPrice, originalPrice, sessionOID, token, ticketSaleOID, count } = this.orderFormData
      let locationCityOIDQuery = MIP.getData('#locationCityOID') ? `locationCityOID=${MIP.getData('#locationCityOID')}` : ''
      let fetchUrl = templateCompile(this.preOrderUrl, { showOID, userOID, totalSalePrice, compensatedPrice, originalPrice, sessionOID, token, ticketSaleOID, count, locationCityOIDQuery })
      httpGet(fetchUrl)
        .then(function (data) {
          if (data.statusCode === 1005) {
            me.lastUrl && sessionStorageUtil.set('login_back_url', me.lastUrl)
            me.loginUrl && MIP.viewer.open(me.loginUrl, {replace: true})
          } else if (data.statusCode === 200 && data.result && data.result.data) {
            me.orderToken = data.result.token
            // 用户协议相关数据
            let preData = data.result.data
            let agreementData = preData.agreement || {}
            me.agreement_url = agreementData.agreementUrl || ''
            me.agreement_id = agreementData.orderAgreementOID
            // me.showAgree();
            me.sellerCertificationsAuthStatus = preData.sellerCertificationsAuthStatus || {}
            me.sellerOID = preData.sellerOID
            // 身份证字段 接口获取
            me.needIdCard = preData.isGuaranteed || false
            let show = me.show = preData
            // 首选取票方式
            if (show.supportExpress || show.support_express) {
              me.delivery = 'express'
              me.getDefaultAddress()
            } else if (show.support_eticket || show.supportEticket) {
              me.delivery = 'eticket'
            } else if (show.supportVenue || show.support_venue) {
              me.delivery = 'venue'
            } else if (show.supportOnsite || show.support_onsite) {
              me.delivery = 'onsite'
            }
            // 当前取票方式
            me.selectedDeliver = me.deliverMap[me.delivery]
            // 当前优惠券信息
            me.selectedCouponId = show.cash_couponOID || show.couponOID
            if (show.cash_couponOID) {
              me.discount = show.cash_discount
              me.coupon = 'Cash'
            } else if (show.couponOID) {
              me.discount = show.discount
              me.coupon = 'Reduction'
            }
          } else {
            me.toast(data.comments || '下单异常', function () {
              MIP.viewer.page.back()
            })
          }
        }).catch(function (err) {
          me.toast(err.message || '订单服务异常,请联系客服')
        })
    },
    toast (msg, callback) {
      let me = this
      if (msg !== '') {
        let timeout = 5000
        me.toastmsg = msg + (typeof callback === 'function' ? ' 5s后自动跳转' : '')
        me.toastCallback = setTimeout(() => {
          me.toastmsg = ''
          typeof callback === 'function' && callback()
        }, timeout)
      }
    },
    findAvailabeItem (list, prop, value) {
      if (typeof (value) !== 'function') {
        let _val = value
        value = function (v) {
          return (!!_val && v === _val) || (!_val && v)
        }
      }
      if (list && prop) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (value(item[prop])) {
            return item
          }
        };
      }
      return null
    },
    formatSession: function (session) {
      let sessionName = session.sessionName
      if (sessionName.indexOf('星期') > -1) {
        sessionName = sessionName.replace(/星期/, '周')
      }
      let sessionStr = sessionName
      let tagNum = 0
      session.showStatus && session.showStatus.code === 2 && tagNum++ // 预售
      session.supportSeatPicking && tagNum++ // 可选座
      let strArray = sessionName.split(' ')
      if (sessionName.indexOf('星期') > -1 || sessionName.indexOf('周') > -1) {
        if (strArray.length === 3) { // yyyy-mm-dd 星期/周x hh:mm
          if (tagNum > 0) { // 有标签
            sessionStr = strArray[0] + '<br>' + strArray[1] + ' ' + strArray[2]
          } else { // 无标签
            sessionStr = strArray[0] + ' ' + strArray[1] + '<br>' + strArray[2]
          }
        }
      } else {
        if (strArray.length === 2) {
          sessionStr = strArray[0] + '<br>' + strArray[1]
        } else if (strArray.length === 3) {
          sessionStr = strArray[0] + '<br>' + strArray[1] + ' ' + strArray[2]
        }
      }
      return {
        sessionStr: sessionStr,
        tagClass: 'tag-' + tagNum
      }
      // if(session.isPermanent){
      //   return session.sessionName;
      // }
      // return sessionName && sessionName.replace(/(\d{4}-\d{2}-\d{2})(.*)/i,"$1<br>$2");
    },
    minus () {
      if (this.count > 1) {
        this.count--
      }
    },
    plus () {
      if (this.count < this.ticketMaxBuyCount) {
        this.count++
      }
    },
    tips () {
      return ['演出详情仅供参考，具体信息以主办方公布信息及现场为准，请准时到场以免错过演出。',
        '鉴于文体演出票品特殊性（具有时效性、唯一性等特征），一旦用户与卖家达成有效订单代表交易协议生效，用户不能主动要求取消交易（因演出活动被取消或延期除外）。',
        '鉴于票品的不可复制性与稀缺性，本平台对每个演出（活动）均设有限购数量，平台有权无理由取消任何用户超过限购数量的交易，平台识别同一用户的方式包括但不限于同一注册手机号、同一收货手机号、同一快递地址、同一付款账户、同一下单设备等。',
        '本平台尽最大努力促使卖家对交易协议的履行，如果卖家付票过程中发生问题，本平台可寻求其它卖家提供更高票面或相同票面更好位置票品代替，否则，平台将全额退款并按订单上约定的赔付方式与金额向用户进行赔付，详细规则请见<常见问题-无票赔付>。']
    },
    getDefaultAddress () {
      let _self = this
      let fetchUrl = templateCompile(this.addressUrl)
      httpGet(fetchUrl)
        .then(function (data) {
          if (data && data.statusCode === 200) {
            _self.ownerAddressList = data.result.data || []
            if (_self.ownerAddressList.length > 0) {
              let defaultAddressList = _self.ownerAddressList.filter(function (item) {
                return item.isDefault
              })
              if (defaultAddressList && defaultAddressList.length > 0) {
                _self.address = defaultAddressList[0]
                _self.loadDeliverFeeTemplate(_self.show.showOID, _self.address.locationOID)
              }
            }
          }
          _self.pay = data.result.data
        }).catch(function (err) {
          console.log(err)
        })
    },
    loadDeliverFeeTemplate (showOID, locationOID) {
      let _self = this
      if (!showOID || !locationOID) return
      let fetchURL = templateCompile(this.deliverTemplateUrl, {showOID, locationOID})
      httpGet(fetchURL)
        .then(function (data) {
          if (data && data.result && data.statusCode === 200) {
            _self.expresses = data.result.data || []
            if (_self.expresses.length > 0) {
              let defaultExpressList = _self.expresses.filter(function (item) {
                return item.defaultExpress
              })
              if (defaultExpressList && defaultExpressList.length > 0) {
                _self.selectedExpress = defaultExpressList[0]
              }
            }
          }
          _self.pay = data.result.data
        }).catch(function (err) {
          console.log(err)
        })
    },
    comfirmOrder () {
      let me = this
      if (!me.orderToken) {
        return
      }
      if (this.delivery === 'express' && (!this.address.clientName || !this.address.cellphone)) {
        me.toast('请完善收货人信息')
        return
      } else if (this.delivery !== 'express' && (!this.ownerInfo.userName || !/\d{10}/.test(this.ownerInfo.telphone))) {
        me.toast('请完善取票人信息')
        return
      }
      if (this.needIdCard && !/\d{18}/.test(this.ownerInfo.idCardNum)) {
        me.toast('请填写有效身份证信息')
        return
      }
      if (this.delivery === 'express' && this.address.clientName && this.address.cellphone) {
        this.ownerInfo.userName = this.address.clientName
        this.ownerInfo.telphone = this.address.cellphone
      }
      adapterStorageUtil.set('ownerName', this.ownerInfo.userName)
      adapterStorageUtil.set('telphone', this.ownerInfo.telphone)

      let postData = Object.assign({}, this.getOrderSessionInfo())

      if (this.selectedCouponId) postData.coupon = this.selectedCouponId
      if (this.delivery === 'express') {
        postData.deliver = 2
        postData.deliver_fee = this.selectedExpress.deliverFee // 快递费
        postData.express = this.selectedExpress.expressCode
        postData.province = this.address.locationOID.substr(0, 2)
        postData.city = this.address.locationOID.substr(2, 2)
        postData.district = this.address.locationOID.substr(4, 2)
        postData.address = this.address.detailAddress
      } else {
        postData.deliver = this.delivery === 'venue' || this.delivery === 'eticket' ? 4 : 1
      }
      postData.comments = this.ownerInfo.remark || ''
      postData.receiver = this.ownerInfo.userName
      postData.cellphone = this.ownerInfo.telphone
      // 身份证号码
      if (this.needIdCard) postData.identity = this.ownerInfo.idCardNum
      if (this.getAmount === 0) postData.payment = 7
      postData.awardPoint = 0
      postData.source = 'mip'
      postData.user = '000'
      postData.total = String(this.getAmount) // 实际需要支付的总金额
      postData.orderAgreementOID = this.agreement_id
      postData.udid = adapterStorageUtil.get('device_uuid')

      let locationCityOIDQuery = MIP.getData('#locationCityOID') ? `locationCityOID=${MIP.getData('#locationCityOID')}` : ''
      let orderToken = me.orderToken
      let fetchUrl = templateCompile(this.orderUrl, {orderToken, locationCityOIDQuery})
      me.toast('系统正在处理订单请求，请稍后')
      if (me.orderPending) {
        httpPost(fetchUrl, postData)
          .then(function (data) {
            me.orderPending = false
            me.cleanData()
            if (data && data.statusCode === 200) {
              me.orderData = data.result.data || {}
              if (me.getAmount === 0) { // 货到付款及金额等于0的时候不需要付款直接去订单详情页
                me.nextUrl && MIP.viewer.open(`${me.nextUrl}#orderOID=${me.orderData.orderOID}`, {replace: true})
              } else {
                me.payUrl && MIP.viewer.open(`${me.payUrl}#transactionOID=${me.orderData.transaction.transactionOID}`, {replace: true})
              }
            } else if (data.comments !== '') {
              me.toast(data.comments, function () {
                MIP.viewer.page.back()
              })
            }
          }).catch(function (err) {
            me.orderPending = true
            if (err && err.message) {
              me.toast('下单失败,请稍后再试')
            }
          })
      }
    },
    getOrderSessionInfo () {
      return {
        show: this.orderFormData.showOID,
        session: this.orderFormData.sessionOID,
        compensatedPrice: this.orderFormData.compensatedPrice,
        price: this.orderFormData.totalSalePrice, // price字段不包含拆单费
        qty: this.orderFormData.count,
        seat_plan: this.pageData.ticketOriginalOID,
        ticketOID: this.orderFormData.ticketSaleOID
      }
    },
    getOrderExpressDeliverInfo () {

    },
    showAddrList () {
      let addressPageUrl = this.addressPageUrl
      if (this.address && this.address.locationOID) {
        addressPageUrl += '#addressOID=' + this.address.addressOID
      }
      this.addressPageUrl && MIP.viewer.open(addressPageUrl)
    },
    showCouponList () {
      let couponPageUrl = this.couponPageUrl
      if (this.selectedCouponId) {
        couponPageUrl += '#couponOID=' + this.selectedCouponId
      }
      this.couponPageUrl && MIP.viewer.open(couponPageUrl)
    },
    getOrderDiscount () {
      return {
        awardPoint: 0

      }
    },
    showCompensatePop () {
      let me = this
      me.showCompensate = true
      // me.compensateRules.agreementContent ="<p style=\"text-align:center;font-size:14px;font-weight:bold\"> 票品退款及赔付规则</p><p style=\"font-size:14px;font-weight:bold\">退款规则</p><p style=\"font-size: 12px;line-height:1.5\">鉴于文体演出票品特殊性（具有时效性、唯一性等特征），一旦票品售出概不支持无理由退换，由于用户自身原因要求退款的，按如下规则进行退款</p><p>&nbsp;</p><table  width=\"100%\"  style='border-collapse:collapse;font-size:12px'><tbody><tr class=\"firstRow\"><td valign=\"middle\" style=\"width:80px;border:1px solid #000;padding:5px 10px;\" align=\"center\" ><span ><strong>订单状态</strong></span></td><td valign=\"top\" style=\"font-size: 12px;border:1px solid #000;padding:5px 10px;\"><span >待配票（卖家尚未接单）</span></td></tr><tr><td valign=\"middle\" style=\"width:80px;border:1px solid #000;padding:5px 10px;\" align=\"center\" ><span ><strong>规则</strong></span></td><td valign=\"top\" style=\"font-size: 12px;border:1px solid #000;padding:5px 10px;\"><span >可直接申请退款，不收取任何手续费</span></td></tr></tbody></table><p>&nbsp;</p><table width=\"100%\" style=\"border-collapse:collapse;font-size:12px\"><tbody><tr class=\"firstRow\"><td valign=\"middle\" style=\"width:80px;border:1px solid #000;padding:5px 10px;\" align=\"center\"><span><strong>订单状态</strong></span></td><td valign=\"top\" style=\"font-size: 12px;border:1px solid #000;padding:5px 10px;\"><span>配票中（卖家已接单，已超出预计发货时间）</span></td></tr><tr><td valign=\"middle\" style=\"width:80px;border:1px solid #000;padding:5px 10px;\" align=\"center\"><span><strong>规则</strong></span></td><td valign=\"top\" style=\"font-size: 12px;border:1px solid #000;padding:5px 10px;\"><span>用户可在相应订单的订单详情页中申请“48小时内不发货则自动退款”，若卖家无法在用户提交申请后的48小时内发货，我们将自动为用户办理退款手续，且不收取任何手续费。</span></td></tr></tbody></table><p>&nbsp;</p><table width=\"100%\"  style='border-collapse:collapse;font-size:12px'><tbody><tr class=\"firstRow\"><td valign=\"middle\" style=\"width:80px;border:1px solid #000;padding:5px 10px;\" align=\"center\" ><span ><strong>订单状态</strong></span></td><td valign=\"top\" style=\"font-size: 12px;border:1px solid #000;padding:5px 10px;\" ><p><span style=\"font-size: 12px;\">配票中（卖家已接单，未超出预计发货时间）</span></p><p><span style=\"font-size: 12px;\">待收票（包括：票品已寄出、待上门取票、待现场取票）</span></p><p><span style=\" font-size: 12px;\">交易完成（用户已收到票）</span></p></td></tr><tr><td valign=\"middle\" style=\"width:80px;border:1px solid #000;padding:5px 10px;\" align=\"center\" ><span ><strong>规则</strong></span></td><td valign=\"top\" style=\"font-size: 12px;border:1px solid #000;padding:5px 10px;\" ><p><span style=\"  font-size: 12px;\">1、距离演出开始日期≥90天</span></p><p><span style=\"  font-size: 12px;\">收取订单实际支付金额（快递费除外）10%的退票手续费</span></p><p><span style=\"  font-size: 12px;\">2、距离演出开始日期≥60天＜90天</span></p><p><span style=\"  font-size: 12px;\">收取订单实际支付金额（快递费除外）15%的退票手续费</span></p><p><span style=\"  font-size: 12px;\">3、距离演出开始日期≥30天＜60天，且下单时演出未开票（预售订单）</span></p><p><span style=\"  font-size: 12px;\">收取订单实际支付金额（快递费除外）15%的退票手续费</span></p><p><span style=\"  font-size: 12px;\">4、距离演出开始日期≥30天＜60天，且下单时演出已开票（普通订单）</span></p><p><span style=\"  font-size: 12px;\">收取订单实际支付金额（快递费除外）30%的退票手续费</span></p><p><span style=\"font-size: 12px;\">5、距离演出开始日期≥10天&lt;30天&nbsp;</span></p><p><span style=\"font-size: 12px;\">收取订单实际支付金额（快递费除外）60%的手续费</span></p><p><span style=\"font-size: 12px;\">6、距离演出开始日期≥3天&lt;10天</span></p><p><span style=\" font-size: 12px;\">收取订单实际支付金额（快递费除外）90%的手续费</span></p><p><span style=\"font-size: 12px;\">7、距离演出开始日期&lt;3天</span></p><p><span style=\"font-size: 12px;\">不支持退换货</span></p></td></tr><tr><td valign=\"middle\" style=\"width:80px;border:1px solid #000;padding:5px 10px;\" align=\"center\" ><span ><strong>备注</strong></span></td><td valign=\"top\" style=\"border:1px solid #000;padding:5px 10px;\" ><p><span style=\"  font-size: 12px;\">1、若订单已发货，需先将票券寄回，平台收到票券后，按以上规则操作退款；规则涉及距离开演前日期以平台收到票券日期为准。</span></p><p><span style=\"  font-size: 12px;\">2、若订单使用抵用券，平台会返还已使用的抵用券，抵用券有效期不变。</span></p><p><span style=\"  font-size: 12px;\">3、非纸质类的电子票，暂不支持退换货。</span></p></td></tr></tbody></table><p>&nbsp;</p><p style=\"font-size:14px;font-weight:bold\">无票赔付规则</p><p style=\"font-size: 12px;line-height:1.5\">经摩天轮核实确认是由于卖家原因，导致用户最终无法获得所订票品，按如下规则进行赔付</p><p>&nbsp;</p><table width=\"100%\"  style='border-collapse:collapse;font-size:12px'><tbody><tr class=\"firstRow\"><td valign=\"middle\" style=\"border:1px solid #000;padding:5px 10px;\" align=\"center\"><p><span ><strong><span >赔付条件</span></strong></span></p></td><td valign=\"middle\" style=\"border:1px solid #000;padding:5px 10px;\" align=\"center\" ><span ><strong><span >赔付规则</span></strong></span></td></tr><tr><td valign=\"top\" style=\"border:1px solid #000;padding:5px 10px;\"><p><span >卖家未接单</span></p><p><span >提前通知无法提供用户票品</span></p></td><td valign=\"top\" style=\"border:1px solid #000;padding:5px 10px;\" ><p><span >订单退款，并赔付订单金额20%的抵用券</span></p></td></tr><tr><td valign=\"top\" style=\"border:1px solid #000;padding:5px 10px;\"><p><span >卖家已接单</span></p><p><span >提前通知无法提供用户票品（非现场无票）</span></p></td><td valign=\"top\" style=\"border:1px solid #000;padding:5px 10px;\" ><p><span >订单退款，并赔付订单金额40%的抵用券</span></p></td></tr><tr><td valign=\"top\" style=\"border:1px solid #000;padding:5px 10px;\"><p><span >卖家已接单</span></p><p><span >演出现场无法提供用户票品（现场无票）</span></p></td><td valign=\"top\" style=\"border:1px solid #000;padding:5px 10px;\" ><p><span >订单退款，并赔付订单金额100%的现金</span></p></td></tr></tbody></table><p style=\"line-height:1.5;font-size:12px\">        备注：<br>        1、订单赔付金额中不包括快递费部分。<br>        2、现金赔付部分，用户可通过在线或电话客服预留收款支付宝账号。</p>";
      me.refundUrl && httpGet(me.refundUrl)
        .then(function (data) {
          if (data.statusCode === 200) {
            me.compensateRules = (data.result && data.result.data) || {}
          }
        })
        .catch(function () {

        })
    },
    changeDelivery (d) {
      this.selectedDeliver = d
      this.delivery = d.name
    },
    selectExpress (express) {
      this.selectedExpress = express
    },
    showAgreeBox () {
      let me = this
      me.agreeBoxFlag = true
      if (me.orderAgreementData && !me.orderAgreementData.agreementTemplate) {
        let agreementOID = me.agreement_id
        let url = me.orderAgreementUrl
        let fetchUrl = templateCompile(url, {agreementOID})
        agreementOID && httpGet(fetchUrl)
          .then(function (data) {
            if (data && data.statusCode === 200) {
              let agreeData = (data && data.result && data.result.data) || {}
              me.orderAgreementData = agreeData
            }
          })
          .catch(function () {

          })
      }
    }
  }
}
</script>
