<template>
  <div class="dzgl clearfix">
    <div class="titbg">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
          <i class="dian abs"></i>选择地址</div>
      </div>
    </div>
    <div class="cen" v-for="(postInfo , index) in listPostInfo" :key="index">
      <div class="cen-t pr">
        <div class="rado abs">
          <input ref="address" type="radio" :checked="postHisId == postInfo.postHisId" name="adderss" :postHisId="postInfo.postHisId" :id="'rds_' + postInfo.postHisId" :cityId="postInfo.cityId" :provinceId="postInfo.provinceId">
          <label :for="'rds_' + postInfo.postHisId"></label>
        </div>
        <span v-text="postInfo.fullName"></span>
      </div>
      <div class="cen-b pr">
        <span v-if="postInfo.fullAddress != null">
          <span v-text="postInfo.fullAddress"></span>
        </span>
        <span v-else>
          <span v-text="postInfo.cityName"></span>
          <span v-text="postInfo.areaName"></span>
          <span v-text="postInfo.address"></span>
        </span>
        <button type="button" class="fd abs" @click="newOrUpdateAddress('editor',postInfo.postHisId)">编辑</button>
      </div>
    </div>
    <button type="button" class="han" @click="newOrUpdateAddress">新增地址</button>
    <button type="button" class="han" @click="updatePost">确定</button>
  </div>
</template>
<script>
import { getUrlParams, gotoUrl } from "../../common/utils/";
import { getAddressList, updatePostInfo } from "../../common/api";
import { Loading, Toast } from "../../common/utils/toast";
export default {
  data() {
    return {
      listPostInfo: [],
      postHisId: "",
      orderId: ""
    };
  },
  async mounted() {
    const that = this;
    let $Loading = new Loading();
    $Loading.open();
    let params = getUrlParams();
    let isFromInvoice = false;
    that.postHisId = params.postHisId;
    that.orderId = params.orderId;
    if (params.isFromInvoice) {
      isFromInvoice = params.isFromInvoice;
    }
    let setting = {
      orderId: params.orderId,
      postHisId: params.postHisId
    };
    await getAddressList(setting).then(res => {
      if (!isFromInvoice) {
        if (res.listPostInfo == null || res.listPostInfo.length == 0) {
          gotoUrl("/payment/submitOrder.html");
        }
      }
      $Loading.close();
      that.listPostInfo = res.listPostInfo;
    });
  },
  methods: {
    newOrUpdateAddress(type, postHisId) {
      if (type === "editor") {
        gotoUrl(
          "/payment/newOrUpAddress.html?type=1&orderId=" +
            this.orderId +
            "&postHisId=" +
            postHisId +
            ""
        );
      } else {
        gotoUrl("/payment/newOrUpAddress.html?type=0&orderId=" + this.orderId);
      }
    },
    updatePost() {
      let list = this.$refs["address"],
        num = 0,
        that = this;
     
      let $Toast = new Toast();
      let $Loading = new Loading();
      if(list==undefined){
        $Toast.open({
          message: "请新增地址！"
        });
        return;
      }
      $Loading.open();
      let len = list.length;
      let cityId = "",
        postHisId = "";
      list.forEach(item => {
        if (item.checked) {
          cityId = item.getAttribute("cityId");
          postHisId = item.getAttribute("postHisId");
        } else {
          num++;
        }
      });
      if (num === len) {
        $Toast.open({
          message: "请选择地址！"
        });
      } else {
        let setting = {
          orderId: that.orderId,
          postHisId: postHisId,
          cityId: cityId
        };
        updatePostInfo(setting).then(res => {
          $Loading.close();
          if (res != null) {
            gotoUrl("/payment/submitOrder.html");
          } else {
            $Toast.open({
              message: "选择失败！"
            });
          }
        });
      }
    }
  }
};
</script>
