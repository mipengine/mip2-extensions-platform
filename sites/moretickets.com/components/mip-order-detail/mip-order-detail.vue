<template>
  <div>
    <div
      ng-if="!showCompensate&&!showOrderTrack&&!showCommentContent && !showCommentForm"
      class="vbox order-detail">
      <div class="main_wap row-row" >
        <div class="cell">
          <div class="cell-inner" >
            <div class="section">
              <div class="order-header">
                <p
                  ng-click="showOrderTrackPop()"
                  class="order-header-title">
                  {{ order.orderStatusTitle || order.orderStatus.displayName }}
                  <svg-icon
                    width="7"
                    height="12"
                    type="right-arrow"
                    stroke="2"/>
                </p>
                <p
                  v-if="isSuccess() && order.deliverMethod.code===4 && order.venueTicketCommentOID"
                  style="margin:15px auto;font-size:12px;"
                  ng-click="showCommentContentPop()">查看我的评价></p>
              </div>
              <div class="order-operations">
                <p
                  v-if="!isUnPaid()&&!isOnDelivery()"
                  class="order-operation-text">{{ order.orderStatusDesc||orderStatusDesc }}</p>
                <!--支付倒计时-->
                <p
                  v-if="isUnPaid()"
                  class="order-operation-text">
                  请在
                  <span class="counting-wrapper">
                    <span class="counting-time">{{ reserveTimeFormat.minute }}</span>:<span class="counting-time">{{ reserveTimeFormat.second }}</span>
                  </span>
                  内完成付款，逾期将取消订单
                </p>
                <div
                  v-if="order.deliverMethod.name==='venue'&&isOnDelivery()"
                  class="order-operation-text">
                  <p>时间: 演出开唱前1小时</p>
                  <p>地点: 演出场馆</p>
                  <p>说明：具体取票方式以演出开始前一天收到的短信为准</p>
                </div>
                <div
                  v-if="order.deliverMethod.name==='Offline'&&isOnDelivery()"
                  class="order-operation-text">
                  <p>时间: {{ order.offlineTime }}</p>
                  <p>地点: {{ order.offlineAddress }}</p>
                  <p>说明：请在收到含取票码的短信后再上门取票</p>
                </div>
                <div
                  v-if="order.deliverMethod.name==='Express'&&isOnDelivery()"
                  class="order-operation-text">
                  <p>姓名: {{ order.receiver }}</p>
                  <p>电话: {{ order.cellphone }}</p>
                  <p>地址：{{ (order.locationName||"") + (order.address||"") }}</p>
                </div>
                <div
                  v-if="order.deliverMethod.name==='eticket'&&isOnDelivery()"
                  class="order-operation-text">
                  <p>请于演出当天扫码验票或凭姓名手机号入场（以现场为准）</p>
                </div>
                <div
                  class="order-buttons-wrapper"
                  ng-hide="order.orderStatus.code===2 || order.orderStatus.code===20 || order.orderStatus.code===8 || (isSuccess() && order.deliverMethod.code===4 && order.supportVenueTicketComment && order.venueTicketCommentOID)">
                  <!-- 评价 -->
                  <!-- <div class="order-btn" ng-click="showCommentFormPop()" v-if="isSuccess() && order.deliverMethod.code===4 && order.supportVenueTicketComment && !order.venueTicketCommentOID">取票评价</div> -->
                  <!-- 催票钮框 -->
                  <!-- <div class="order-btn" ng-class="{disabled: !cuipiao_btn.isEnabled()}" ng-if="cuipiao_btn.getButtonText()" ng-click="cuipiao_btn.isEnabled()&&doOverdueSubmit()">cuipiao_btn.getButtonText()</div> -->
                  <!-- 待付 || 补拆单费-->
                  <div v-if="isUnPaid()||(isCompensating&&order.additionalOffer>0)">
                    <div
                      class="order-btn"
                      @click="cancel=true">取消订单</div>
                    <div
                      class="order-btn positive"
                      @click="saveOrder()">立即支付</div>
                  </div>
                  <!-- <div ng-if="refund_btn.refoundable()" class="order-btn" ng-click="refund_win_flag=true">申请退款</div> -->
                  <!-- <div ng-if='order.items[0].supportVenueHelp' class='order-btn help' ng-click='getHelp(order.orderOID)'>现场求助</div> -->
                  <!-- <a ng-if="isOnDelivery() && order.deliverMethod.name === 'eticket'" class="order-btn eticket" v-bind:href="'/order/eticket/'+order.orderOID">查看电子票</a> -->
                  <!-- <div ng-if='shoupiao_btn.isEnabled()&&!shoupiao_btn.operated()' class='order-btn positive' ng-click='confirmTicket()'>shoupiao_btn.getButtonText()</div> -->
                </div>
                <!-- 订单逾期 -->
                <div
                  v-if="overdue"
                  class="show-reminder">
                  <p v-if="!overdue.isCompensated()">
                    逾期时长：<span class="overdue-time">overdue.getOverdueTime()</span>
                  </p>
                  <p v-if="overdue.isCompensated()">
                    您已获得逾期补偿：<span class="overdue-money">overdue.compensateMoney()</span>元现金券
                  </p>
                  <p v-if="!overdue.isCompensated()">
                    您将在订单完成后获得逾期补偿：<span class="overdue-money">overdue.compensateMoney()</span>元现金券
                  </p>
                </div>
                <div
                  v-if="false"
                  class="show-reminder"
                  ng-if="overdue_refund_btn.refoundText()==='REFOUNDTEXT_1'">
                  抱歉，您的订单未能按时发货，我们还在努力协调卖家尽快为您发货。如果您不愿意再多等，也可以申请"48小时内不发货则自动退款"
                  <span
                    ng-click="overdueRefund()"
                    class="refund-link">
                    立即申请
                    <svg-icon
                      width="5"
                      height="9"
                      type="right-arrow"
                      color="#323038"
                      stroke="1"/>
                  </span>
                </div>
                <div
                  v-if="false"
                  class="show-reminder"
                  ng-if="false && overdue_refund_btn.refoundText()==='REFOUNDTEXT_2'">
                  您已申请了"48小时内不发货则自动退款"。
                  <span ng-if="overdue_refund_btn.getTime()"><br>申请时间： overdue_refund_btn.getTime()</span>
                  <span ng-if="!overdue_refund_btn.getTime()">我们还在努力协调卖家尽快在48小时内为您发货。</span>
                </div>
                <div
                  v-if="displayPresellTip"
                  class="show-reminder"
                  ng-click="showOnsaleShowTip()">
                  <div class="operation-link">
                    <svg-icon
                      width="5"
                      height="9"
                      type="right-arrow"
                      color="#95949d;"
                      stroke="1"/>
                  </div>
                  <div class="onsale-state">预售节目重要提醒</div>
                </div>
                <div
                  v-if="lastExpressInfo&&lastExpressInfo.time"
                  class="show-reminder express">
                  <div
                    class="express-display"
                    ng-click="goExpressDetail()">
                    <div class="express">
                      <div
                        class="express-info"
                        ng-bind-html="lastExpressInfo.status"/>
                      <div class="express-time">lastExpressInfo.time</div>
                    </div>
                    <div class="operation-link">
                      <svg-icon
                        width="5"
                        height="9"
                        type="right-arrow"
                        color="#95949d;"
                        stroke="1"/>
                    </div>
                  </div>
                </div>
                <div
                  v-if="lastExpressInfo.noMessage"
                  class="show-reminder express">
                  没有快递信息
                </div>
              </div>
              <div class="blank_area"/>
              <div
                v-if="qrcontent&&isOnDelivery()"
                class="order-operations">
                <div class="qrconde-contaner">
                  <mtlqrcode
                    id="qupiaoQR"
                    qrcontent="qrcontent"/>
                </div>
                <div
                  v-if="order.smsCode"
                  class="smscode-contaner">
                  <div class="smscode-box">
                    <label>取票码:</label>
                    <div class="smscode">{{ order.smsCode }}</div>
                  </div>
                </div>
                <div
                  v-if="order.deliverMethod.name!=='Offline'"
                  class="show-reminder">
                  二维码仅在取票时使用，建议妥善保存。<br>
                  本票品由卖家提供现场取票服务
                </div>
                <div
                  v-if="order.deliverMethod.name==='Offline'"
                  class="show-reminder">
                  二维码仅在取票时使用，建议妥善保存
                </div>
              </div>
              <div
                v-if="qrcontent&&isOnDelivery()"
                class="blank_area"/>
              <div class="order-show-detail">
                <div class="seller">
                  <span>票品提供:</span>
                  <span class="seller-name">{{ order.ticket.sellerName }}</span>
                  <div
                    v-show="order.ticket.sellerName"
                    ng-click="toCertification()"
                    class="certi_icon_box">
                    <div class="ok_icon">&nbsp;</div>
                    <i/>
                    <div class="text">资质认证</div>
                  </div>
                  <span
                    class="rules"
                    @click="clickRules()"><i>!</i>退赔规则</span>
                </div>
                <i class="blank_line"/>
                <div
                  class="show-link"
                  ng-click="toShowDetail()">
                  <mip-img
                    :src="order.show.posterURL"
                    class="poster"/>
                  <div class="show-detail">
                    <div class="show-title">{{ order.show.showName }}</div>
                    <div class="show-desc light">{{ order.show.sessionName }}</div>
                    <div class="show-desc light">{{ order.show.venueAddress }}</div>
                    <div class="show-desc">{{ order.ticket.zoneName }}</div>
                  </div>
                </div>
                <i class="blank_line"/>
                <div class="show-ticket-row">
                  <div
                    v-if="!order.seatPlanName"
                    class="ticket-info">
                    <span class="number">{{ order.originalPrice }}</span>票面
                  </div>
                  <div
                    v-if="order.seatPlanName"
                    class="ticket-info">
                    <span class="number">{{ order.seatPlanName }}</span>
                  </div>
                  <div class="ticket-info">
                    <span class="number">{{ order.qty }}</span>
                    {{ order.seatPlanUnit.displayName }}
                  </div>
                  <div class="place-holder"/>
                  <div
                    v-if="order.originalPriceComment"
                    class="ticket-comment">{{ order.originalPriceComment }}</div>
                </div>
              </div>
              <order-show
                detail="orderDetail"
                click-rules="showCompensatePop()"/>
              <div class="blank_area"/>
              <div class="layout1">
                <div class="section_title "><span >取票信息</span></div>
                <i class="blank_line"/>
                <div class="row-item">
                  取票方式  <span class="font2 space1">{{ order.deliverMethod&&(order.deliverMethod.name==='Express'?"快递送票":order.deliverMethod.displayName) }}</span>
                </div>
                <div v-if="order.deliverMethod.name==='Offline'">
                  <div class="row-item">
                    时间 <span class="font2 space1">{{ order.offlineTime }}</span>
                  </div>
                  <div class="row-item clearfix">
                    地点 <span class="font2 space1">{{ order.offlineAddress }}</span>
                  </div>
                  <div class="row-item clearfix">
                    说明 <span class="font2 space1">请收到含取票码的短信后再上门取票</span>
                  </div>
                </div>
                <div v-if="order.deliverMethod.name==='venue'">
                  <div class="row-item">
                    时间 <span class="font2 space1">演出开场前1小时</span>
                  </div>
                  <div class="row-item clearfix">
                    地点 <span class="font2 space1">演出场馆</span>
                  </div>
                  <div class="row-item clearfix">
                    说明 <span class="font2 space1">具体取票方式以演出开始前一天收到的短信为准</span>
                  </div>

                </div>
                <div v-if="order.deliverMethod.name==='eticket'">
                  <div class="row-item">
                    时间<span class="font2 space1">演出开场前1小时</span>
                  </div>
                  <div class="row-item">
                    地点<span class="font2 space1">演出场馆</span>
                  </div>
                  <div class="row-item">
                    说明<span class="font2 space1">根据商家短信提示入场</span>
                  </div>
                </div>
                <div v-if="order.deliverMethod.name!='Express'">
                  <i
                    class="blank_line"
                    style="margin-bottom: 5px"/>
                  <div class="row-item">取票人姓名<span class="font2 space1">{{ order.receiver }}</span></div>
                  <div class="row-item">取票人手机<span class="font2 space1">{{ order.cellphone }}</span></div>
                  <div
                    v-if="!!order.identity"
                    class="row-item">取票人身份证<span class="font2 space1">{{ order.identity }}</span></div>
                </div>
                <div v-if="order.deliverMethod.name==='Express'">
                  <i class="blank_line"/>
                  <div class="row-item">收票人姓名<span class="font2 space1">{{ order.receiver }}</span></div>
                  <div class="row-item">收票人手机<span class="font2 space1">{{ order.cellphone }}</span></div>
                  <div class="row-item clearfix">
                    收票人地址<span class="font2 space1">{{ (order.locationName||"") + (order.address||"") }}</span>
                  </div>
                  <i class="blank_line"/>
                  <div
                    v-if="!!order.identity"
                    class="row-item">收票人身份证<span class="font2 space1">{{ order.identity }}</span></div>
                </div>
              </div>
            </div>
            <div class="blank_area"/>
            <div class="layout1">
              <div class="section_title">订单明细</div>
              <i class="blank_line"/>
              <div
                v-for="(priceItem,index) in order.priceItems"
                :key="index"
                class="row-item">{{ priceItem.priceItemName }}<note
                  v-if="priceItem.comments"
                  notecontent = "priceItem.comments" /><span class="font2">{{ priceItem.priceItemVal }}元</span></div>
              <div
                v-if="order.deliverFee>0"
                class="row-item">快递费<span class="font2">{{ order.deliverFee }}元</span></div>
              <div
                v-if="order.discount>0"
                class="row-item">优惠券<span class="font2">-{{ order.discount }}元</span></div>
              <div
                v-if="order.usedPoint.deduction>0"
                class="row-item">摩力值抵扣<span class="font2">-{{ order.usedPoint.deduction }}元</span></div>
              <div class="row-item">合计<span class="font2">{{ order.total||0 }}元</span></div>
              <i class="blank_line"/>
              <div
                v-if="order.payTotal>0"
                class="row-item"
                style="font-size:14px;color:rgb(253,104,87);">实付金额<span class="font3">{{ order.payTotal||0 }}元</span></div>
              <div
                v-if="order.orderStatus.code===1"
                class="row-item"
                style="font-size:14px;color:rgb(253,104,87);">待付金额<span class="font3">{{ order.total||0 }}元</span></div>
              <div
                v-if="order.orderStatus.code===12"
                class="row-item"
                style="font-size:14px;color:rgb(253,104,87);">待补金额<span class="font3">{{ order.additionalOffer||0 }}元</span></div>
              <div
                v-if="order.orderStatus.code===14||order.orderStatus.code===8"
                class="row-item"
                style="font-size:14px;color:rgb(253,104,87);">待退金额<span class="font3">{{ order.refund||0 }}元</span></div>
            </div>
            <div
              v-if="order.earnedPoint.point"
              class="blank_area"/>
            <div
              v-if="false && order.earnedPoint.point"
              class="layout1">
              <div class="row-item">
                摩力值
                <span
                  v-if="!isSuccess()"
                  class="font2">交易成功后将获得{{ order.earnedPoint.point }}摩力值</span>
                <span
                  v-if="isSuccess()"
                  class="font2">已获得{{ order.earnedPoint.point }}摩力值</span>
              </div>
            </div>
            <div class="blank_area"/>
            <div class="layout1">
              <div class="section_title ">订单信息</div>
              <i class="blank_line"/>
              <div class="row-item">订单编号<span class="font2">{{ order.orderNumber }}</span></div>
              <div class="row-item">下单时间<span class="font2">{{ order.orderCreateTime }}</span></div>
              <div
                v-if="order.comments"
                class="row-item ">备注留言<span class="font2 space1">{{ order.comments }}</span></div>
            </div>
            <div class="blank_area"/>
            <!--取消 退款 成功-->
            <div
              v-if="false && [2,9,6].indexOf(order.orderStatus.code)>-1"
              class="delete-btn-title "
              @click="deleteOrder()">删除订单</div>
          </div>
        </div>
      </div>
    </div>
    <!-- v-if="order.orderStatus.name!='Unpaid' && !order.isPurchaseOrderOverdue && order.orderStatus.name!='Compensating'" -->
    <div
      v-if="!showCompensate"
      class="operation"
      style="background-color:#fff;text-align: center;" >
      <a
        id="udeskClone"
        class="tac"
        href="tel://400-636-2266"><span style="color:rgb(170,170,170);font-weight:bold;letter-spacing:0.1em;">咨询投诉</span></a>
    </div>

    <div
      v-if="!!cancel"
      class="pop"
      @click="cancel=false"/>
    <div
      v-if="!!cancel"
      class="pop_cancel">
      <div class="cancel_title">
        确定取消这个订单么?
      </div>
      <div class="cancel_result">
        <a
          id="confirm_no"
          @click="cancel=false" >取消</a>
        <a
          id="confirm_yes"
          @click="cancelOrder();cancel=false" >确定</a>
      </div>
    </div>
    <div
      v-if="false"
      v-show="refund_win_flag"
      class="refund_win"
      ng-click="refund_win_flag=false">
      <div class="pop"/>
      <div class="pop_cancel" >
        <div class="win_title_box"> 确认要申请退款么？ </div>
        <div class="control_box">
          <a
            class="left_btn"
            ng-click="postRequireRefund();" >确认申请</a>
          <a
            class="right_btn"
            ng-click="refund_win_flag=false" >再考虑下</a>
        </div>
      </div>
    </div>

    <!-- 取票码弹出框 -->
    <div
      v-show="smsWin_flag"
      v-if="false">
      <div class="pop_filter_bg"/>
      <div
        class="pop_box"
        style="width:280px;height:216px;color:#777777;font-size:12px;padding-top:28px;line-height:1em;margin-top:50%; transform:translateY(-50%);">
        <div style="width:100%;height:100%;">
          <span style="font-size: 16px;color:rgb(73,73,73);line-height:16px;">您的数字码为</span>
          <div style="width:200px;margin:20px auto 6px;background:rgb(228,228,228) ;height: 44px;color:rgb(170,170,170);line-height:44px;font-size:22px;font-weight:bold;letter-spacing:0.1em;">
            {{ order.smsCode }}
          </div>
          <div style=" font-size:12px;line-height: 12px;">
            如有疑问，请联系我们的客服
            <div style="color:#108EE9;margin-top:6px;">getCustomerPhone()</div>
          </div>
          <div
            ng-click="smsWin_flag = false"
            style="width:100%;height:45px;line-height:45px;font-size:14px;border-top:1px solid rgb(228,228,228);color:rgb(119,119,119);position:absolute;left:0;bottom:0">
            关闭
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="false"
      v-show="smsConfirmFlag"
      ng-click="smsConfirmFlag=false">
      <div class="pop" />
      <div
        class="pop_cancel"
        style="width:30rem" >
        <div style="height:73px;vertical-align: middle;padding:28px 0;font-size:14px;color:rgb(73,73,73);border-bottom:1px solid rgb(228,228,228)">
          数字码仅在取票时使用，请不要发送给他人。<br>
        </div>
        <div class="cancel_result">
          <a
            id="confirm_yes"
            ng-click="smsWin_flag=true"
            style="color:rgb(119,119,119)">确认查看</a>
          <a
            id="confirm_no"
            ng-click="smsConfirmFlag=false" >取消</a>

        </div>
      </div>
    </div>
    <!-- 服务评价 -->
    <div
      v-if="showCommentForm"
      class="comment-component ">
      <div class="page-header">
        <div
          class="back-icon"
          ng-click="hideCommentFormPop()"><div class="left-back-icon"/></div>
        <div
          class="header-text ng-binding center comment-title "
          ng-class="{center: contentCenter}">服务评价</div>
      </div>
      <div class="comment-wrap">
        <div class="comment-subtitle ">请对现场卖家的服务进行评价</div>
        <div class="comment-tip">{{ starTip }}</div>
        <ul class="comment-star clearboth">
          <li
            v-for="(i,index) in [1,2,3,4,5]"
            :key="index"
            ng-click="checkStar(index)">
            <img
              v-if="starNum < index"
              src="~@/static/icon/star.png" >
            <img
              v-if="starNum >= index"
              src="~@/static/icon/star_active.png" >
          </li>
        </ul>
        <div
          v-if="labelOID===2"
          class="comment-lables clearboth">
          <span
            v-for="(item,index) in satisfied"
            :key="index"
            ng-click="checkLables(item.labelOID)"
            ng-class="{'active':!!isCheck[item.labelOID]}" >{{ item.labelName }}</span>
        </div>
        <div
          v-if="labelOID===1"
          class="comment-lables clearboth">
          <span
            v-for="(item,index) in best"
            :key="index"
            ng-click="checkLables(item.labelOID)"
            ng-class="{'active':!!isCheck[item.labelOID]}">{{ item.labelName }}</span>
        </div>
        <div
          v-if="labelOID===3"
          class="comment-lables clearboth">
          <span
            v-for="(item,index) in disappoint"
            :key="index"
            ng-click="checkLables(item.labelOID)"
            ng-class="{'active':!!isCheck[item.labelOID]}">{{ item.labelName }}</span>
        </div>
        <div class="comment-content-wrapper" ><textarea
          ng-change="isWrite()"
          ng-model="orderComment.content"
          name="content"
          placeholder="还有想说的写在这里哦"/></div>
        <div
          class="comment-submit-btn"
          ng-class="{'comment-submit-btn-hui':!isReadyToSubmit()}"
          ng-click="submitcomment()">提交</div>

      </div>
    </div>
    <!-- 我的评价 -->
    <div
      v-if="showCommentContent"
      class="comment-component">
      <div class="page-header">
        <div
          class="back-icon"
          ng-click="hideCommentContentPop()"><div class="left-back-icon"/></div>
        <div
          class="header-text ng-binding center  comment-title"
          ng-class="{center: contentCenter}">我的评价</div>
      </div>
      <div class="comment-wrap">
        <div class="comment-tip">{{ orderComment.labelName }}</div>
        <ul class="comment-star clearboth">
          <li
            v-for="(i,index) in [1,2,3,4,5]"
            :key="index">
            <img
              v-if="getStar(orderComment.grade, orderComment.labelOID) < index"
              src="~@/static/icon/star.png" >
            <img
              v-if="getStar(orderComment.grade, orderComment.labelOID) >= index"
              src="~@/static/icon/star_active.png" >
          </li>
        </ul>
        <div class="comment-lables clearboth">
          <span
            v-for="(item,index) in orderComment.subLabels"
            :key="index"
            class="active">{{ item.labelName }}</span>
        </div>
        <div
          v-if="orderComment.comments"
          class="comment-content">{{ orderComment.comments }}</div>
        <div class="comment-content-tip">
          <img
            src="~@/static/icon/thank_comment.png"
            width="105"
            alt="感谢评论"
            style="margin-bottom:20px;">
          <div class="main-tip">感谢您的评价</div>
          <div class="second-tip">您的支持，是我们最大的动力</div>
        </div>
      </div>
    </div>

    <!-- 订单追踪  -->
    <div
      v-if="showOrderTrack"
      class="comment-component">
      <div class="page-header">
        <div
          class="back-icon"
          ng-click="hideOrderTrackPop()"><div class="left-back-icon"/></div>
        <div
          class="header-text ng-binding center  comment-title"
          ng-class="{center: contentCenter}">订单跟踪</div>
      </div>
      <div class="comment-wrap">
        <ul class="order-track-ul">
          <li
            v-for="(item,index) in orderTrack"
            :key="index">
            <!-- <img v-if='!item.isCurrent' src="../~@/static/icon/gray_point.png" >
                <img v-if='item.isCurrent' class="activeimg" src="../~@/static/icon/red_point.png" > -->
            <div ng-class="{'color_gray2':item.isNext,'activep':item.isCurrent}">{{ item.trackName }}<span
              v-if="item.extention"
              ng-click="showLogisticsPop(order)">{{ item.extention }}</span>
              <p
                v-if="!item.isNext"
                class="color_gray">{{ item.trackTime }}</p>
              <i ng-class="{'border-left-dashed':item.isNext,'border-left-none':$index===orderTrack.length-1}"/>
            </div>

          </li>
        </ul>
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

    <div
      v-if="loginloading"
      class="pop">
      <div class="loading"/>
    </div>

    <div
      v-if="!!orderCommetsFlag"
      class="pop" >
      <div class="pop_cancel">
        <div
          class="cancel_title "
          style="height:auto;line-height:30px;padding:15px 0;">
          您还有未提交的评价，确定要退出吗<br>
          (退出后您已填写的评价不会保存)
        </div>
        <div class="cancel_result">
          <a
            id="confirm_no"
            ng-click="hideDetailCancelBox()" >退出</a>
          <a
            id="confirm_yes"
            ng-click="cancelOrderComment()" >继续评价</a>
        </div>
      </div>
    </div>

    <!-- 现场求助问题 -->
    <div
      v-show="help_flag&&onlineQuestions.length"
      v-if="false">
      <div class="pop_filter_bg" />
      <div
        class="pop_box_1"
        style="height:410px;">
        <span class="pop_box_closebtn"><img
          src="~@/static/icon/close.png"
          ng-click="help_flag=false;"></span>
        <div style="width:100%;">
          <p class="pop_box_title4" >您好，请问遇到什么问题了？</p>
          <div
            v-for="(item,index) in onlineQuestions"
            :id="item.categoryOID"
            :key="index"
            class="pop_box_problem"
            ng-class="{'active':selecteditem===item}"
            ng-click="getHelpInfo(item)">
            {{ item.categoryName }}
          </div>
          <div class="pop_box_bottom_info" >
            <p>遇到其他问题？请主动联系我们</p>
            <p>服务热线：<a
              style="color:#3385ff"
              href="tel:400">400</a></p>
            <p>工作时间：周一至周日9:00-21:00</p>
          </div>
        </div>

      </div>
    </div>
    <!-- 联系不上卖家 -->
    <div
      v-show="problem_flag"
      v-if="false">
      <div class="pop_filter_bg"/>
      <div
        class="pop_box_1"
        style="height:410px;">
        <span class="pop_box_closebtn"><img
          src="~@/static/icon/close.png"
          ng-click="closeAllFlag()"></span>
        <div style="width:100%;">
          <p class="pop_box_title4" >{{ selecteditem.categoryName }}</p>
          <i
            class="pop_box_back"
            ng-click="problem_flag=false;"/>
          <div class="pop_box_title5">
            {{ selecteditem.description }}
          </div>
          <div style="margin:0 auto;">
            <img
              src="~@/static/icon/sellerbusy.png"
              width="230px"
              heigt="178px;">
          </div>
          <div class="pop_box_bottom" >
            仍然需要帮助？<span ng-click="getHelpInfoTo(selecteditem)">联系我们</span>
          </div>
        </div>

      </div>
    </div>
    <!-- 求助成功/已求助 -->
    <div
      v-show="success_flag"
      v-if="false">
      <div
        class="pop_filter_bg"
        ng-click="help_flag=false;"/>
      <div
        class="pop_box_1"
        style="height:410px;">
        <span class="pop_box_closebtn"><img
          src="~@/static/icon/close.png"
          ng-click="closeAllFlag()"></span>
        <div style="width:100%;">
          <p
            v-show="helpcode===200"
            class="pop_box_title4">求助成功</p>
          <p
            v-show="helpcode===515"
            class="pop_box_title4">您已经求助过啦</p>
          <div
            v-show="helpcode===200"
            class="pop_box_title5">
            您的求助已收到，我们会立即核实并在第一时间电话回复您，请耐心等待，造成不便敬请谅解。
          </div>
          <div
            v-show="helpcode===515"
            class="pop_box_title5">
            我们已经收到您的求助，目前正在核实中，完成后将会第一时间电话回复您，还请耐心等待。
          </div>
          <div style="margin:0 auto;">
            <img
              v-show="helpcode===200"
              src="~@/static/icon/helpsuccess.png"
              width="230px"
              heigt="178px;">
            <img
              v-show="helpcode===515"
              src="~@/static/icon/helped.png"
              width="230px"
              heigt="178px;">
          </div>
          <div
            class="pop_box_surebtn"
            ng-click="closeAllFlag()">
            知道了
          </div>
        </div>
      </div>
    </div>
    <!--预售演出文案-->
    <!-- <bottom-popup switch="displayPresaleShowTip">
  <div class="presale-show-tip">
    <div class="tip-title">预售中</div>
    <div class="tip-content">演出正式开票后，预售订单将优先配票。由于预售票品可能受主办方及场馆情况的影响，若出现预订票面取消的情况，摩天轮承诺会全额退款并补贴订单实付金额10%的现金券（限所预订的节目使用）。</div>
  </div>
</bottom-popup> -->
  </div>
</template>

<style scoped lang="less">
@main-color: #ff1d41;
@dark-font: #323038;
@normal-font: #494949;
@light-font: #aaa;
@normal-border: 1px solid #e4e4e4;
@medium-font: #95949d;
.order-show-detail{
  padding: 0 15px;
  padding-top: 15px;
  overflow: hidden;
  background-color: #fff;
  .seller{
    line-height: 1.6rem;
    color: @dark-font;
    font-size: 1.3rem;
    .seller-name{
      color: #3385ff;
    }
  }
  .show-title{
    font-size: 1.6rem;
    font-weight: bold;
    color: #000;
  }
  .poster{
    float: right;
    width: 6rem;
    height: auto;
    margin-left: 1rem;
  }
  .show-link{
    display: block;
    overflow: hidden;
  }
  .show-desc{
    color: @dark-font;
    font-size: 1.3rem;
    line-height: 2rem;
    &.light{
      color: @medium-font;
    }
  }
  .show-ticket-row{
    text-align: justify;
    color: #000;
    font-size: 1.3rem;
    .ticket-info{
      display: inline-block;
      .number{
        color: @main-color;
        font-size: 2rem;
      }
    }
    .place-holder{
      padding-left: 100%;
      display: inline-block;
    }
    .ticket-comment{
      color: #777;
      font-size: 1.2rem;
      display: block;
      padding-bottom: 1.5rem;
    }
  }
  .rules {
    float: right;
    color: @medium-font;
    i {
      font-style: normal;
      width: 1.3rem;
      height: 1.3rem;
      line-height: 1.3rem;
      border-radius: 1.3rem;
      background: @medium-font;
      display: inline-block;
      text-align: center;
      font-size: 1.3rem;
      color: #fff;
      margin-right: 0.5rem;
    }
  }
}
.certi_icon_box{
  display:inline-block;
  border:1px solid #3385ff;
  font-size: 12px;
  text-align: center;
  color: #3385ff;
  position:relative;
  vertical-align: text-top;
  .ok_icon{
    width:13px;
    text-align:center;
    background: #3385ff;
    display: inline-block;
    position:absolute;
    left:-1px;
    top:0;
  }
  i{
    font-style: normal;
    position: absolute;
    left: 8px;
    top: 3px;
    width: 3px;
    height: 8px;
    -webkit-transform-origin: 50% 0;
    transform-origin: 50% 0;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    -webkit-transform: rotate(-135deg);
    transform: rotate(45deg);
  }
  .text{
    padding-right: 2px;
    padding-left: 2px;
    border-left: 1px solid #108ee9;
    margin-left: 12px;
  }
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
  top: 20%;
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
.sprites-icon{
    background-repeat: no-repeat;
    background-size: 450px 300px;
    width: 3rem;
    height: 3rem;
    background-image: url(~@/static/icon/mtl_sprites_624.png);
    display: inline-block;
}
.layout1{
    padding: 2rem;
    background-color: #fff;
}
.layout2{
    padding: 15px 0;
    margin:0 15px;
}
.row-item{
    font-size: 13px;
    color:rgba(50,48,56,1);
    line-height: 2rem;
    margin-bottom: 2rem;
    text-indent: -5em;
    padding-left: 5em;
}
.layout1 .row-item:last-child{
    margin-bottom: 0px;
}
.row-item .font1{
    color: #000;
}
.tac{
    text-align: center;
}
.service{
    width: 20px;
    height: 23px;
    display: inline-block;
    text-align: center;
    background: url('data:image/png;base64,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') no-repeat ;
    vertical-align: text-bottom;
    margin-right: 5px;
    background-size: 100% 100%;

}
.row-item .space1{
    text-indent: 2em;
    display: inline-block;
}
.row-item .font2{
    color:rgba(149,148,157,1);
    float: right;
    text-indent: 0;
    text-align: right;
}
.row-item .font3{
    color: #F2593F;
    float: right;
    text-indent: 0;
}
.font4{

    font-size: 12px;
    vertical-align: top;
    color: #797979;
}
.row-item .fr{
    float: right;
    text-indent: 0;
}
.bottom{
    height: 50px;
    line-height: 50px;
    width: 100%;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
    padding-top: 12px;
}
.nodes{
    text-align: center;
}
.nodes:before,.nodes:after{
    overflow: hidden;
    display: table;
    content:' ';
    clear:both;
}
.node{
    display: inline-block;
    width: 33px;
    font-size: 14px;
    margin-right: 30px;
    position: relative;
}
.node:last-child{
   margin-right: 0;
}
.circle_bot {
    z-index: 2;
    position: relative;
    background-color: #eee;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-left: 10px;
    border: 4px solid #eee;
    margin-bottom: 5px;
}
.line{
    position:absolute;
    border-bottom:2px solid #eee;
    width: 60px;
    left: -45px;
    top: 6px;
}
.node.active{
    color: #F2593F;
}
.node.active .circle_bot{
    border: 2px solid #F2593F;
    background-color: #F2593F;
    box-shadow: 0 0 0 3px rgba(253,104,87,.46);
}
.node.active .line{
    border-bottom:2px solid #F2593F;
}
.close-order{
    font-size: 14px;
}
.location-icon{
    .sprites-icon;
    background-position: -215px -175px;
    width: 2rem;
    height: 2rem;
    vertical-align: text-bottom;
}
.icon-tip{
    .sprites-icon;
    background-position: -690px -364px;
    background-size: 900px 600px;
    width: 2rem;
    height: 2rem;
    vertical-align: text-bottom;
}
.status{
    font-size: 14px;
    color: #51BBE0;
    line-height: 36px;
    background: #F6F6FB;
    margin: 0 15px;
    padding-left: 10px;
}
.layout1:before,.layout1:after{
    display: table;
    content:'';
    overflow: hidden;
    clear:both;
}
.layout1 img{
    float: right;
    border-radius: 5px;
}
.layout1 .show-detail .font1{
    font-size: 14px;color: #000000;
    line-height: 20px;
    margin-bottom: 5px;
}
.layout1 .show-detail .font2{
    font-size: 12px;color: #AAAAAA;
    line-height: 17px;
    margin-bottom: 2px;
}
.operation{
    overflow: hidden;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 15;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: right;
    padding: 0 15px;
    font-size: 14px;
    border-top: 1px solid #e4e4e4;
    box-shadow: 1px 1px 5px #ccc;
}
a.btn-cancel{
    width: 75px;
    height: 32px;
    line-height: 32px;
    color: #797979;
    border:1px solid #e4e4e4;
    display: inline-block;
    border-radius: 3px;
    text-align: center;
    font-size: 14px;
    margin-right: 10px;
}
a.btn-pay{
    width: 75px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    font-size: 14px;
    border:1px solid #F2593F;
    display: inline-block;
    border-radius: 3px;
    text-align: center;
    background-color: #F2593F;
}
.fl{
    float: left;
}
.fr{
    float: right;
}
.blank_area{
  background:#F6F6F7;
  height: 10px;
}
.blank_line{
  border-top: 0.05rem solid rgba(234,234,235,1);
  height: 1px;
  display: block;
  margin: 2rem 0;
}

.section_title{
  font-size:  14px;
  font-weight: bold;
  color:rgba(0,0,0,1);
  text-align: left;
}
.delete-btn-title{
  text-align: center;
  font-size:  16px;
  color:#FF1D41;
  padding:10px 0;
  margin-bottom:10px;
  background-color: #fff;
}
.b_top_gray{
  border-top:1px solid rgb( 228,228,228);
}

.b_bottom_gray{
  border-bottom:1px solid rgb( 228,228,228);
}
.wuliu_icon{
  font-weight: 200;
  display:inline-block;
  width:50px;
  height:16px;
  line-height: 16px;
  font-size:1rem;
  margin-left:4px;text-align:center;border-radius:2px;color:#FFF;background: linear-gradient(to right,rgb(239,104,86), rgb(255,49,101))

}
.v_center{
  position:absolute;top:50%; -webkit-transform:translateY(-50%);transform:translateY(-50%);
}
.car_icon{
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAhCAYAAACfiCi5AAAAAXNSR0IArs4c6QAAAxhJREFUWAntmE1oE1EQx/OxMaAePJTtyYOgFAzEpBtRQWj9KN48SQ9e9CB4EES0UlCESvFQUPBgb3rtoYp4EQ+V0IMKbfN1UmKoRQUhkoMY20Ihib+JG3iuu2timsaFDAwzOzNv3vzfe7NvE386nb7j8/nGarXaNmRHyO/3b5D4rmEYNzd7ggAJO1q8FGwuzthmFy/5Ap1cebXgTs0jO+Bp6gHo9vb1dqDbO6BtdQGZTOYIb6RJ5m1l7jx3yEW7WltJYje+ZRvFn4JPtDhwCOC3BwcHv1jHeakHDliLl2cvAYh6GkC1Wu3tgN0ObqVtoFAohK0TeqkHtNXV1f1eBuCrVCqnU6lUSAWx5feAOnmrOvfHBD+OrvAj7FkgEHgMoDkvHaE6XkDsgs9T/HPAvPUcAHXXALLX0wAEjOcBNNPEKwBN0jRfuQ119OPwHvi/IDcAazTJOF+A08hao1rOnZ8vw0vIKWzbG/ZuSScAa6z4wXg8nqfY67y2RilwAJbnWUDdy2azSXZkCVvbIFigKgsyHQwGn5Ivx7NO7kPYbsH7sDmSbQ/IykvxFP5SVho24J2mnBK7+CXOMXPzjjJ5hxKJxGWGbPB6PEfxBvxC13X5gJtxS2UHYEWODSt9jYHDDoOHxS9x+KVH2qGrDF7ghpWL6TX6fYqXot+VSqWj/f39F1iogtMEdgCSDJAzL8fGjUbNuKRb0F98y6z8Q/LcIO6MJbYPQDPFYnEHfvkJaksCoKx6CC6az3Lm3ajuV+LdYsVXn4f470rgougcobOKTVX76MUReEE1KnpZmjhO8+xuGNE/mXoeaTTsNlL8vlAo9IiVmrPx/2Yi5rMYwuHwg/X19UXm0Sjso9gApQNC1D+I46TTb4VcLnfM6pScGlu4jEPYSrMY3ACI3xeNRj8ghJuiSCQi/1S/UoMpXt5mI6qtoQN0CYCCbr5hU6VdD9T98qpEmVeDFX3e9Cumf1c1TRunSAFmpSes/hurUX12BEDCCv/FnERK8jT8w5Tjpr2iJmpHj8ViWVb6MDnmmOMb8j1yAunUG7h+0U/eSSwucHkeLQAAAABJRU5ErkJggg===');
  background-size: 100% 100%;
  height: 14px;
  width: 20px;    margin-left: 10px;
}
.blank_btn,.urge_btn{
  font-size: 14px;
  background:#FFF;border:1px solid rgb(204,204,204);border-radius:4px;line-height:34px;height:34px;display:inline-block;width:140px;
}
.pay_fill_btn{
  border: none;border-radius: 4px;
  background: linear-gradient(to right,rgb(239,104,86), rgb(255,49,101));
  line-height: 34px;color: #FFF;height: 34px;padding: 0 40px;display: inline-block;
  min-width: 180px;
  font-size: 14px;
}
.qr_note_box{
    width: 100%;
    padding: 0.5rem 0;
    line-height: 18px;
    background-color: #fffdea;
    text-align: left;
    color: #ff9300;
    font-size: 12px;
    margin-bottom: -20px;
    margin-top: 20px;
    display: flex;
    .note_icon{
      width:15px;
      height:15px;
      display:inline-block;
      // background: url(../~@/static/icon/qr_note.png) center center no-repeat;
      background-size: 100% 100%;
      margin: 0 8px 0 15px;
    }
}

.rmb_icon{
  width:12px;
  height:12px;
  display:inline-block;
  border-radius:12px;
  line-height:12px;
  color:rgb(170,170,170);
  font-size:0.8rem;
  border: 1px solid rgb(170,170,170);
  text-align:center;
  margin-right:3px;
}

.refund_btn_text{
  display: inline-block;
  margin-top: 1.5rem;
  text-align:center;
  position:relative;
   &:after{
        right: -10px;
        top: 4px;
        position: absolute;
        display: block;
        content: "";
        width: 4px;
        height: 4px;
        border-right: 1px solid rgb(216,216,216);
        border-bottom: 1px solid rgb(216,216,216);
        transform: rotateZ(-45deg);
      }
}

.refund_win{
  color:rgb(119,119,119);
  .win_title_box{
    overflow: hidden;
    height: 92px;
    line-height: 92px;
    color: #000;

    border-bottom: 1px solid rgb(228,228,228);
  }
  .control_box{
    display:flex;
    height: 46px;
    line-height: 46px;
    justify-content: center;
    align-items: center;
    .left_btn,.right_btn{
      flex:1;
      align-items:center;
    }
    .right_btn{
      color: rgb(253,104,87);
      border-left:1px solid rgb(228,228,228);
    }

  }

}

.m_r15{margin-right: 15px;}
.urge_btn.disabled{
  color: rgb(170,170,170);
  border:1px solid rgb(170,170,170);
}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}

.cms_close_btn {
  width: 30px;height: 30px; position: absolute;top: 100px;left: 50%; font-size: 26px;
  padding-bottom: 13px;transform: translateX(-50%);background-size: 100% 100%;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo5MDUyMzIxYy02NTVlLTQyYTMtOTljZS1kYTY5Nzg5MTdhMWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjA1NTI5NTIwREVCMTFFNkJGNTFEMkM1NENBRjBBQTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjA1NTI5NTEwREVCMTFFNkJGNTFEMkM1NENBRjBBQTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1OGRhNjYzNS0zMjQ3LTQ1ZWItYTEzZS1mOGZkYTA3MmY3ZWIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1Mjc4MmFjZC01NjU1LTExNzktODU2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)
}

.triangle-down {
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 5px solid rgb(255,252,233);
  position:absolute;
  bottom: 15px;
  left: 0px;
  display: none;
//rgb(255,252,233)
}
 .questionIcon{
   display: inline-block;
   font-style: normal;
   width: 12px;
   height: 12px;
   border-radius: 50%;
   border: 1px solid #aaa;
   color: #FFF;
   background-color: rgb(204,204,204);
   font-size: 1.2rem;
   text-align: center;
   margin: 2px;
   line-height: 12px;
   position: relative;
   text-indent: 0;
   z-index: 5990;

}
 .noteTextBox{
  width:250px;
  position: absolute;
  background: rgb(255,252,233);
  border-radius: 3px;
  color:rgb(119,119,119);
  bottom: 20px;
  left: -15px;
  text-indent: 0;
  text-align:left;
  box-shadow: 1px 1px 5px #ccc;
  padding: 10px;
  font-size: 1rem;
  display: none;

}
 .active .noteTextBox, .active .triangle-down{
   display: inline-block;
 }

.item_icon{
  width: 14px;
  height: 16px;
  display: inline-block;
  background-size: 100% 100%;
  vertical-align: middle;
  margin-right: 6px;
}

.locat_icon{
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAwCAYAAABnjuimAAAAAXNSR0IArs4c6QAABL9JREFUWAnNmUtoXFUYxzOTScxjIVQNRjsuVMQYQpJJFLUtanFhS6tCcCVFJXXjohspiI+FCK4UBREUjA+KYhGx9Y0oiiAWm0ki1VZ0mVanAy6KxhIzmfH3v+ZeTu/c17kzk5kDZ853vvP/vvO/33ndOTfT1UCan58vZDKZvbi4njxcq9WGqV8hl8i/I/+BqPwL9Y+mp6cX1JYmZWyNFhcXb6xWqw/S8d3YbrW0Pw35D8lvFAqFeRvbxESXlpauW19ffxaCMzYdRGDf6+7ufmJycvK3CIzXFEuU4R0A/Rz5YXLOs2yOUCG6rw4NDR3M5/Pno1xGEoXkVRgfJU9EOWm0DbJFonvPxMTEmTBf2bAG5uI2HBynvaUk1T/TaapSqRxnet0UxicwoiLJgvkKBxeFGbZIf57g7Jiamir6/dcR1XArkpAc8oM3qb7c09MzPT4+Xjb7u2DoNxbO0TaSFLf82tra+3DpCSVKg1Z3y+ekSSBE3o7+KbPNG3rtk0zon2ls9hZk9pdYZvqt5HK5q90p4A29NvNOIamnYfoNErjH3SdzIqpjEaI/uMpOKYnqKlG9lqiediKqs7tTyJk8tD0S1fukc4ii0AtGp6bdIpZhGyhQ1m2wNqwZIp61Nkc5Nzg4qAXZtbKyMopuFt0spbdobfwKi/2/DP+WHMJeHNnam/gSPvZxmnxpKpGPKS8sLBzG/yHky33tiarY9jL8d2jo9dKbKkGwls1m9/Fu6Sfp+VObMMJ6SksBsteI6LClnQfHwVwUSRcojLBuPUV5iYg6fx1SGGv+JO7cBhvA5dKGIuounADHdSobrN+Yh3QimnpF+h22sF7NMndKaTvQFpTU1gYb4LOkoU9NlIecDXAaqLLB+h0w9KWsfvwNSevYzrJP3hmHF0bYOFxYO0d8SUN/KgwQp8c2g5NDUWTVJoywcf7C2jmZTmWKxeLNOPk+DJRET7RwEXyEYr8/iY8wDL7L7MPD6iHLU5coLwsDt1MP0Tc5nh/SHK1C8tN2konqG34fq12rvouz+HWVHZhKzO/PxMshyhz4FrnjokoAn+YG8B+PqATSY5oG/4sd8fsrF2ivuUyciKoC8xMUb7kN7S4JmgJXcXl4RKXo6+s7QLHkNrarhOCLrPQPzP7rNmH+31/JG/UxQFtN4CbKRyA545+GF0RUZHT1xyTeg/jXJpJzuoKcbg/v95NUY11EHQt+OARuYWvQHrbF1bWyhNzJ3t7enWNjY2eD+gklKjBkb4Ds54j5IONm6RTJgYGBXSMjI3+G+awbehPI/nqSK8Bb9bSmvsnyFyzinVEk1V8kUQF0nQLZ7Yjfqd7k9A7+9oyOjv4d5zdy6E3j5eXl/nK5/C7vBc26VXme1X2Q0Ur0NzoxUZGGZDevha8gpn512yD2KCRfMAMRJ1sRdZ1xDfQM8pNuPWkJyVWwD0DycFIbF5eKqIwh+wgdv0SUY+f5Rmfn+ERzL+f3Nxt1qyI1UfXC9jUD0bfJcV9PtCB3sTB/smJngBsiKj9cAt/OJfARxIsNv6Z4ApK7tXuYSls56bCF+tVQcuTeBkBfkf3paxQ7GiUppw0TlRMOhh+J2jbET8j6vrlKfrm/v/8uXh/PCdNo+g932q845adUmwAAAABJRU5ErkJggg===");
}
.human_icon{
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAtCAYAAADYxvnjAAAAAXNSR0IArs4c6QAAA8hJREFUWAndmc9rE0EUx80mqRY9NCSngkgEka3SkDR4EQUP4kGoih4U/InSv6AgLWKpVQ/Sc4uiKFrEg6IGPHipIHgQ8oMWNEjAaBERbImH2h/56fets7KR7O6bzSYVF5aZzHvvM9++ndmdmXrWNXlls9ng8vLyoWq12g+U6vF4uglZq9W+osgqipLo7Ox8rqrqArU7vTxOA2dmZjaWy+VBxA9C1CYrDsQvwj7u8/nGI5HITytfM5sjobOzs1uLxWIC0B1mYJP2dx0dHf29vb0fTeymzdJCkcntpVLpDYhBU6q1YcHv9+9GZj9Yu9VbpYQikwGIfItHva0eI/cLQyGHsbsrGo3+4EYqXEfyw+O+1qxI4hCjUqlcpzr3Ymc0k8kQ/D3APi7cxq/s9Xp7kNWcjZ9mZmcUr5+ziHBLJHXuE0yq215soSAdtqXJO7CZLKG5XG49xlWPvA7rCGIS29rrt5UldGlpSfvacICyPlw2SyheSQFZAVx/LpslFO899tuBK1D347JZQnXoWpb/ndBSC7PJYrMyiuXZt1YJ5bJZQrEs+w6hKy0QuyLYtmiWUMzMGkjTtjR5h2nBto1kCRWUp7Y0eQc2ky00GAxOQcecvBbTiDnBNHUwGthCw+EwjdEhY3CT9SHBZGHYQokWj8cfophkka2dJgXL2stglf40YsXjS6fTD1AeN3DYVUyeR7FY7BTKMjsIjlIZJTB10NfXdwLVYdRXqY1zCd9hipUVSXzpjBpFIbNbsEofRcdHkeGGe3vYFmF7gs3cCDL52RgvU29KqN5RPp/fUCgU9uG3CuHa2hXCtJOSQCDwSmbS6EzXSuzvd8rCnMTofTjKKB75eWTuNh5rFqBbeLRTmMXzOtRYJpPJEPxOom0AfioyfQFD4I7Rh1OXEoqOPKlU6jQ6von633udebTn0f4JJX1yw6iHUYaMQmAron0Ak+q+8DOaTessoQAr2NcfQHkFd9yUJmGAyCTuy9jXv0RZtQu1FCoOw84Bcgb3ZjuYQ/sXxN3D4dldq8OzhkLxeFUE38B9EBls6ONQlGmYGAYvUF7EGKYTmbqrTgSJwkQZQXkJXt46z/b9qEDsVYgdFeK1nv8Ixez0w/AYIunkeM0vaElAyzG8TbStivETOvGviKQsCS0Tesa0jCKbdAbEXsTqwW0qjyCrzxQop6yOtalTJ92MkUZ6ge9B5bUTQrtiMF73Ukb3t6tDp/2QRoXUOgW0K07LKDpr2ZGii39IN02kukWDi3A3USES2uUmsUWsLvrnQRpjoEV897C/AGXHTaH8sJdgAAAAAElFTkSuQmCC");
}
.comment-component{
    background-color:#fff;
    height: 100%;
    .comment-title{
        box-shadow: 1px 1px 5px #ccc;
        background-color: #ffffff;
        height: 50px;
        line-height: 50px;
        padding-top: 0;
    }
    .comment-wrap{
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        overflow: auto;
        padding-bottom: 120px;
    }
    .comment-content-wrapper{
        margin:0 30px 0;
        height:160px;
        textarea{
            height:100%;width:100%;resize: none;padding:15px;
            border: 0;
            border-radius: 4px;
            background-color:#f7f7f7;
        }
        textarea:-moz-placeholder{
            color:#ccc;
        }
        textarea:-ms-input-placeholder{
            color: #ccc;
        }
        textarea::-webkit-input-placeholder{
            color: #ccc;
        }
    }
    .comment-content{
        padding:15px;
        background-color: #fff;
        overflow: scroll;
        font-size: 14px;
        line-height: 22px;
        color: #494949;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin:0 30px;
        min-height: 115px;
    }
    .comment-content-tip{
        padding:20px;
        background-color: #fff;
        overflow: scroll;
        font-size: 14px;
        line-height: 22px;
        color: #95949d;
        margin-top:15px;
        text-align: center;
        .main-tip{
            font-size: 20px;
            letter-spacing: -0.2px;
            color: #323038;
        }
        .second-tip{
            font-size: 14px;
            letter-spacing: -0.1px;
            color: #777777;margin-top:10px;
        }
    }
    .comment-submit-btn{
        margin:40px 30px;
        height: 50px;
        line-height:50px;
        border-radius: 4px;
        background-image: linear-gradient(99deg, #fe8240, #fd3789);
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.2px;
        text-align: center;
        color: #ffffff;

    }
    .comment-submit-btn-hui{
        background:#ccc;
    }
    .comment-subtitle{
        font-size: 14px;
        text-align: left;
        color: #331511;
        margin: 20px;
    }
    .comment-tip {
        text-align: center;
        color: #aaa;
        padding-top: 10px;
    }
    .comment-star {
        text-align: center;
        width: 60%;
        margin: 10px 20% 20px 20%;
        li {
            float: left;
            width: 20%;
            text-align: center;
            img {
                width: 100%;
            }
      }
    }
    .comment-expression {
        text-align: center;
        margin: 40px 75px 25px;
        li{
            float: left;
            width: 33%;
            text-align: center;
            color:#aaa;
        }
    }
    .clearboth:before,.clearboth:after{
        clear:both;
        content: '';
        display: table;
        visibility: hidden;
    }
    .img40{
        width:40px;
        height: 40px;
        display: block;
        margin: 0 auto 10px;
    }
    .comment-lables{
        margin: 0 30px 15px;
        span{
            margin:0 15px 15px 0;
            padding: 5px 12px;
            color:#777;
            border:1px solid #ccc;
            border-radius: 4px;
            font-size:14px;
            display: block;
            float: left;

        }
        span.active{
            color:#fd6857;
            border:1px solid #fd6857;
        }
    }
    .comment-result{
        margin: 40px auto 25px;
        text-align: center;
        p{
            color:#aaa;
        }
    }
    .order-track-ul{
        margin: 40px 0 0 28px;
        font-size: 14px;
        color: #323038;

        li{
            position: relative;
            // border-left: 1px solid #eaeaeb;

            img{
                width:6px ;
                height:6px ;
                position: absolute;
                top:8px;
                left: -4px;
                z-index: 1
            }
            div{
                // position: absolute;
                // top: -7px;
                // left:25px;
                margin:0  25px;
                padding-bottom: 40px;
                span{
                    color: #576bff;
                    margin-left :5px;
                }
                i{
                    display: block;
                    height: 100%;
                    position: absolute;
                    top:8px;
                    left:-1px;
                    width: 1px;
                    border-left: 1px solid #eaeaeb;
                }
                .border-left-none{
                    border:1px solid transparent;

                }
                .border-left-dashed{
                    border-left:1px dashed #eaeaeb;

                }
            }

            .activeimg{
                width:12px;
                height: 12px;
                top:6px;
                left: -7px;
            }
            .activep{
                color:#ff1d41;
                font-size: 16px;
                font-weight: bold;
            }
            .color_gray{
                color:#95949d ;
                top: 12px;
                font-weight: normal;
                font-size: 14px;
            }
            .color_gray2{
                color: #95949d;
            }
        }

    }
}
.order-overdue{
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.7rem;
  font-size: 1.2rem;
  .order-overdue-text{
    color: #68676c;
  }
  .overdue-compensation{
    padding: 1rem 0;
    color: @medium-font;
  }
  .overdue-money{
    color: @main-color;
  }
  .overdue-btn{
    cursor: pointer;
    width: 14rem;
    border-radius: 4px;
    color: @medium-font;
    font-size: 1.4rem;
    border: @normal-border;
    height: 3.4rem;
    line-height: 3.4rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }
}
.venue-online-btn-splitor{
  width: 1rem;
  display:inline-block;
}
.venue-online-btn{
  display:inline-block;
  font-size:13px;
  width: 11rem;
  height: 3.2rem;
  line-height: 3.2rem;
  border-radius:3px;
  margin:2rem auto 0;
  text-align: center;
  color:#fff;
}
.venue-online-confirm{
  .venue-online-btn;
  background-color: @main-color;
}
.venue-online-help{
  .venue-online-btn;
  background-color:#3385FF;
}
.pop_box_1{
    position: absolute;
    left: 0;
    top: 20%;
    right: 0;
    bottom: 0;
    margin: 0 auto;
    text-align: center;
    background-color: #FFF;
    z-index: 9991;
    -webkit-transition: opacity 1s;
    transition: opacity 1s;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    width:300px;
    color:#777777;
    font-size:12px;
    padding-top:28px;
    line-height:1em;
    margin-top:50%;
    transform:translateY(-50%);
    .pop_box_closebtn{
        position: absolute;
        width: 1.1rem;
        height: 1.1rem;
        right: 1rem;
        top: 1rem;
        img{
          width: 100%;
          height: 100%;
        }
    }
    .pop_box_title{
      font-size: 16px;
      color:#000;
      line-height:17px;
    }
    .pop_box_title2{
      color:#68676c;
      font-size:13px;
      line-height:1.5;
      margin:25px auto;
      width:148px;
    }
    .pop_box_qrcode{
      width:148px;
      height:148px;
      background:#ececec;
      margin:15px auto;
    }
    .pop_box_smscode_c{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 90px;
      .pop_bx_smscode{
        color:rgb(16,142,233);
        margin-left:5px;
      }
    }

    .pop_box_qrcode_info{
      width:100%;
      height:70px;
      padding:18px 36px;
      line-height:1.5;
      font-size:12px;
      background-color:#f6f6f7;
      color:#68676c;
      position:absolute;
      left:0;
      bottom:0;
      border-radius:0 0 4px 4px;
    }
    .pop_box_title3{
      font-size: 16px;
      color:rgb(73,73,73);
      line-height:16px;
    }
    .pop_box_smscode_info{
      width:200px;
      margin:20px auto 6px;
      background:rgb(228,228,228) ;
      height: 44px;
      color:rgb(170,170,170);
      line-height:44px;
      font-size:22px;
      font-weight:bold;
      letter-spacing:0.1em;
    }
    .pop_box_close{
      width:100%;
      height:45px;
      line-height:45px;
      font-size:14px;
      border-top:1px solid rgb(228,228,228);
      color:rgb(119,119,119);
      position:absolute;
      left:0;
      bottom:0;
    }
    .pop_box_title4{
      font-size: 18px;
      color:#000;
      margin-bottom:30px;
    }
    .pop_box_problem{
      width:230px;
      height:46px;
      border-radius:2px;
      border:1px solid #eaeaea;
      margin:0 auto;
      line-height:46px;
      font-size:15px;
      color:#323038;
      margin-bottom:10px;
      text-align: left;
      padding-left: 30px;
    }
    .active{
      color:#fff;
      background-color:#3385ff;
      border-color:#3385ff;
    }
    .pop_box_bottom_info{
      width:100%;
      height:auto;
      padding:18px 36px;
      line-height:1.5;
      font-size:12px;
      background-color:#f6f6f7;
      color:#68676c;
      position:absolute;
      left:0;
      bottom:0;
      border-radius:0 0 4px 4px;
    }
    .pop_box_back{
      position:absolute;
      top:28px;
      left:36px;
      color:#000;
      display: inline-block;
      width: 11px;
      height:11px;
      border-left:solid 1px #000;
      border-top:solid 1px #000;
      -webkit-transform:rotate(-45deg);
      transform:rotate(-45deg);
    }

    .pop_box_title5{
      font-size:15px;
      color:#68676c;
      width:230px;
      margin:0 auto;
      line-height:1.5;
      margin-bottom:20px;
      text-align:left;
    }
    .pop_box_bottom{
      width:100%;
      height:56px;
      border-radius:2px;
      background-color:#f6f6f7;
      color:#68676c;
      line-height:56px;
      margin:0 auto;
      font-size:15px;
      position:absolute;
      bottom:0;
      left:0;
      span{
        color:#3385ff;
        text-decoration:underline;
        margin-left:50px;
      }
    }
    .pop_box_surebtn{
      width:265px;
      height:44px;
      border-radius:2px;
      background-color:#3385ff;
      text-align:center;
      color:#fff;
      line-height:44px;
      margin:0 auto;
      font-size:16px;
      position:absolute;
      bottom:18px;
      left:50%;
      transform:translateX(-50%);
    }
}
.pop_cancel_title{
    height:73px;
    vertical-align: middle;
    padding:28px 0;
    font-size:14px;
    color:rgb(73,73,73);
    border-bottom:1px solid rgb(228,228,228);
}
.order-header{
  padding: 1.8rem 1.8rem 1.8rem 1.8rem;
  background:linear-gradient(135deg,rgba(122,157,175,1),rgba(66,113,135,1));
  color: #fff;
  .order-header-title{
    font-size: 2.6rem;
    line-height: 4rem;
  }
  .order-header-desc{
    line-height: 2rem;
    font-size: 1.3rem;
  }
  .counting-time{
    padding: 0.1rem 0.2rem;
    display: inline-block;
    color: @main-color;
    background: #fff;
    margin:0 0.2rem;
  }
}
.order-operations{
  padding:0 1.8rem;
  background: #fff;
  padding-top:2rem;
  padding-bottom:1.8rem;
  .order-operation-text{
    color: @medium-font;
    font-size: 1.3rem;
    line-height: 2rem;
    .counting-wrapper{
      padding: 0 0.2rem;
      display: inline-block;
    }
    .counting-time{
      width: 2rem;
      height: 2rem;
      background-image: linear-gradient(#7A9DAF,#427187);
      color: #fff;
      text-align: center;
      line-height: 2rem;
      display: inline-block;
      margin: 0 0.2rem;
    }
  }
  .order-buttons-wrapper{
    border-top: 1px solid #EAEAEB;
    margin-top: 1.8rem;
  }
  .height-holder{
    height: 1.8rem;
    &:first-child{
      height: 0;
    }
  }
  .refund-link{
    color: #3385ff;
    cursor: pointer;
  }
  .order-btn{
    border-radius: 2px;
    padding: 0.5rem 1rem;
    border: solid 0.5px #eaeaeb;
    color: @dark-font;
    font-size: 1.4rem;
    display: inline-block;
    margin: 1.8rem 1rem 0 0;
    &.help,
    &.eticket{
      border: solid 1px #3385ff;
      color: #3385ff;
    }
    &.disabled{
      color: @medium-font;
    }
    &.positive{
      color: @main-color;
      border-color: @main-color;
    }
  }
}
.order-detail{
  padding-bottom: 5rem;
  background-color: #F6F6F7;
  .qrconde-contaner{
    margin-bottom: 2rem;
    text-align: center;
  }
  .smscode-contaner{
    text-align: center;
    margin-bottom: 1.8rem;
  }
  .smscode-box{
    padding: 1rem 2rem;
    border-radius: 3px;
    border: solid 1px #eaeaeb;
    display: inline-block;
    label{
      font-size: 1.6rem;
      color: @medium-font;
      display: inline-block;
      vertical-align: middle;
    }
    .smscode{
      font-size: 1.8rem;
      color: @dark-font;
      display: inline-block;
      vertical-align: middle;
      letter-spacing: 0.3rem;
    }
  }

  .show-reminder{
    width: 100%;
    line-height: 2rem;
    margin-top: 1.8rem;
    padding:1rem 1.5rem;
    border-radius: 5px;
    background-color: #fffad8;
    border: solid 0.5px #f9e8a3;
    font-size: 1.3rem;
    &.express{
      margin-top: 1.8rem;
    }
    .onsale-state{
      color: @dark-font;
    }
    .express-display{
      display: flex;
      align-items: center;
      .express{
        flex: 1;
      }
      .express-info{
        color: @dark-font;
      }
      .express-time{
        color: @medium-font;
      }
    }
    .operation-link{
      cursor: pointer;
      float: right;
    }
  }
}
</style>

<script>
import { httpGet, httpPut } from '@/common/httpUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil.js'
import { templateCompile } from '@/common/urlUtil'
// const ORDER_STATUS_PAID = 4
const ORDER_STATUS_UNPAID = 1
const ORDER_STATUS_CANCELED = 2
const ORDER_STATUS_SUCCEEDED = 6
const ORDER_STATUS_DELIVERY = 5
const ORDER_STATUS_COMPENSATING = 12
export default {
  props: {
    'prefixUrl': {
      type: String,
      default: ''
    },
    orderUrl: {
      type: String,
      default: ''
    },
    reserveTimeUrl: {
      type: String,
      default: ''
    },
    orderPayStatusUrl: {
      type: String,
      default: ''
    },
    systemPropertiesUrl: {
      type: String,
      default: ''
    },
    operationsUrl: {
      type: String,
      default: ''
    },
    loginUrl: {
      type: String,
      default: ''
    },
    payUrl: {
      type: String,
      default: ''
    },
    cancelOrderUrl: {
      type: String,
      default: ''
    },
    refundUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      order: {
        orderStatus: {},
        orderStatusTitle: '',
        earnedPoint: {},
        usedPoint: {},
        deliverMethod: {},
        express: {},
        priceItems: [],
        ticket: {},
        seatPlanUnit: {},
        show: {}
      },
      lastExpressInfo: {},
      best: [],
      satisfied: [],
      disappoint: [],
      orderComment: {},
      selecteditem: {},
      reserveTimeFormat: {},
      cancel: false,
      showCompensate: false,
      compensateRules: {}
    }
  },
  computed: {
    getCode () {
      return this.order.orderStatus.code
    }
  },
  mounted () {
    sessionStorageUtil.syncSessionData()
    console.log('呈现详情')
    this.prefixUrl && sessionStorageUtil.set('prefix', this.prefixUrl)
    this.loadOrder(MIP.hash.get('orderOID'))
  },
  methods: {
    clickRules () {
      let me = this
      me.showCompensate = true
      me.refundUrl && httpGet(me.refundUrl)
        .then(function (data) {
          if (data.statusCode === 200) {
            me.compensateRules = (data.result && data.result.data) || {}
          }
        })
        .catch(function () {

        })
    },
    getReserveFormat (clTime) {
      let minute = parseInt(clTime / (60 * 1000))
      let leftMinuteTime = clTime % (60 * 1000)
      let second = parseInt(leftMinuteTime / 1000)

      if (second < 10) {
        second = '0' + second
      }
      if (minute < 10) {
        minute = '0' + minute
      }
      return {minute: minute, second: second}
    },
    loadOrder (orderOID) {
      let me = this
      let fetchUrl = templateCompile(this.orderUrl, { orderOID })
      httpGet(fetchUrl)
        .then(function (data) {
          if (data.result && data.result.data) {
            me.order = data.result.data
            if (me.order && me.order.items && me.order.items.length > 0) {
              me.order.ticket = me.order.items[0].ticket
              me.order.show = me.order.items[0]
              me.order.seatPlanUnit = me.order.items[0].seatPlanUnit
            }
            me.transactions = data.result.data.transactions
            if (me.transactions && me.transactions.length > 0) {
              me.payTransaction = me.transactions[0]// .transactionStatus.name;
              if (me.payTransaction.transactionStatus.code === 1) { // unpaid
                me.loadReserveTimeFormat(me.payTransaction.transactionOID)
              }
            }
          } else {
            this.loginUrl && MIP.viewer.open(this.loginUrl)
          }
        }).catch(function (err) {
          console.log(err)
        })
    },
    loadReserveTimeFormat (transactionOID) {
      let me = this
      let fetchUrl = templateCompile(this.reserveTimeUrl, {transactionOID})
      httpGet(fetchUrl)
        .then(function (data) {
          if (data.result && data.result.data && data.result.time > 0) {
            me.payCountDownTime = data.result.time
            me.reserveTimeFormat = me.getReserveFormat(data.result.time)
            me.setPayCountDown()
          } else {
            me.reserveTimeFormat = '00:00'
          }
        }).catch(function (err) {
          console.log(err)
        })
    },
    loadOrderPayStatus (orderOID) {
      let me = this
      let fetchUrl = templateCompile(me.orderPayStatusUrl, {orderOID})
      httpGet(fetchUrl)
        .then(function (data) {
          if (data.result && data.result.data) {
            console.log(data.result.data)
          }
        }).catch(function (err) {
          console.log(err)
        })
    },
    setPayCountDown () {
      let me = this
      let PayCountDown = setInterval(function () {
        if (me.payCountDownTime >= 1000) {
          me.payCountDownTime -= 1000
          me.reserveTimeFormat = me.getReserveFormat(me.payCountDownTime)
        } else {
          me.loadOrderPayStatus(me.order.orderOID)
          clearInterval(PayCountDown)
        }
      }, 1000)
    },
    loadOperation (orderOID) {
      let me = this
      let fetchUrl = templateCompile(this.operationsUrl, { orderOID })
      httpGet(fetchUrl)
        .then(function (data) {
          if (data.result && data.result.data) {
            me.order = data.result.data
          }
        }).catch(function (err) {
          console.log(err)
        })
    },
    isSuccess () {
      return this.getCode === ORDER_STATUS_SUCCEEDED
    },
    isCancelled () {
      return this.getCode === ORDER_STATUS_CANCELED
    },
    isUnPaid () {
      return this.getCode === ORDER_STATUS_UNPAID
    },
    isOnDelivery () {
      return this.getCode === ORDER_STATUS_DELIVERY
    },
    isCompensating () {
      return this.getCode === ORDER_STATUS_COMPENSATING
    },
    saveOrder () {
      this.payUrl && MIP.viewer.open(`${this.payUrl}#transactionOID=${this.payTransaction.transactionOID}`)
    },
    cancelOrder () {
      let me = this
      let orderOID = me.order.orderOID
      let fetchUrl = templateCompile(this.cancelOrderUrl, { orderOID })
      httpPut(fetchUrl)
        .then(function (data) {
          if (data.statusCode === 200) {
            me.loadOrder(MIP.hash.get('orderOID'))
          }
        }).catch(function (err) {
          console.log(err)
        })
    },
    deleteOrder () {
      let me = this
      let orderOID = me.order.orderOID
      let fetchUrl = templateCompile(this.cancelOrderUrl, { orderOID }).replace('/cancel', '/hidden')
      httpPut(fetchUrl)
        .then(function (data) {
          if (data.statusCode === 200) {
            me.loadOrder(MIP.hash.get('orderOID'))
          }
        }).catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
