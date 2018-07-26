<template>
    <div class="insure-pay-result common-insur-fixed du-wing-blank-lg" v-if="pageRender && userLogin.isLogin">

        <div class="result-hd" v-if="policyState == 1 || policyState == 2">
            <div class="result-title">
                <p>投保成功</p>
                <p>恭喜您获得一份保障！</p>
            </div>
            <div class="result-tip">24小时内可在我的保单页查看投保详情<br />保单将会发送到投保人邮箱:{{holderInfoList.email}}
            </div>
        </div>

        <div class="result-hd" v-else>
            <div class="result-title">
                <p>投保处理中...</p>
            </div>
            <div class="result-tip">若投保成功，24小时内可在我的保单页查看投保详情；若投保失败，扣款资金将原路返回，如有疑问请<a v-bind:href="'tel:' + serviceTel">联系客服</a>
            </div>
        </div>

        <div class="result-bd">
            <div class="name">{{policyInfoList.productName}}</div>
            <div class="carrier">该产品由{{policyInfoList.carrier}}承保</div>
            <div class="list">
                <div class="item">
                    <div class="col-left">投保单号</div>
                    <div class="col-right">NO.{{orderInfo.orderNo}}</div>
                </div>
                <div class="item" v-if="insuredAmt != 0.00">
                    <div class="col-left">保障额度</div>
                    <div class="col-right">{{policyInfoList.insuredAmt}}元</div>
                </div>
                <div class="item">
                    <div class="col-left">保障期限</div>
                    <div class="col-right">{{policyInfoList.benefitDuration}}天</div>
                </div>
                <div class="item" v-if="address">
                    <div class="col-left">投保地区</div>
                    <div class="col-right">{{address.province}} {{address.city}} {{address.area}}</div>
                </div>
                <!-- 后期再加 -->
                <!-- <div class="item" v-if="policyInfoList.paymentModeDesc">
                    <div class="col-left">缴费期限</div>
                    <div class="col-right">{{policyInfoList.paymentModeDesc}}</div>
                </div> -->
                <div class="item">
                    <div class="col-left">投保人</div>
                    <div class="col-right">{{holderInfoList.fullName}}</div>
                </div>
                <div class="item" v-for="insured in insuredInfoList">
                    <div class="col-left">被保人</div>
                    <div class="col-right">{{insured.fullName}}</div>
                </div>
            </div>
            <div class="pay">
                <span>支付金额</span>
                <span class="orange">¥{{amount}}</span>
            </div>
        </div>

        <mip-fixed type="bottom" class="common-mip-footer-fixed">
            <a class="du-button du-button-large du-button-default" href="./index" data-type="mip">返回首页</a>
        </mip-fixed>

    </div>
</template>

<script>
import MtIndicator from 'mint-ui/lib/indicator';
import Common from '@/common/common';
import Request from '@/static/js/request';
import Store from '@/static/js/store';

export default {
    components: {
        MtIndicator
    },
    props: {
        userLogin: {
            type: Object,
            required: true,
            default: function () { return {} }
        }
    },
    data () {
        return {
            pageRender: false,
            serviceTel: Common.config.serviceTel,
            amount: null,
            orderInfo: null,
            insuredInfoList: null,
            policyInfoList: null,
            holderInfoList: null,
            policyState: null,//1或2显示成功，其他均为处理中
            address: null,
            insuredAmt: null
        }
    },
    created () {
        MtIndicator.open();
        // 移除订单session
        // 暂时不清除详情页缓存
        // Store.session.removeOrder();
    },
    methods: {
        initData () {
            let self = this;
            let applicationNoExt = Common.getParamValue('applicationNoExt');
            let spNo = Common.getParamValue('spNo');
            let tick = 3; // 轮询次数
            function checkResult () {
                Request({
                    url: Common.api.payResult,
                    data: {
                        applicationNoExt: applicationNoExt,
                        spNo: spNo
                    },
                    successCallback: function (res) {

                        let orderInfo = res.orderInfo;
                        let policyInfoList = orderInfo.policyInfoList && orderInfo.policyInfoList[0];

                        self.amount = orderInfo.amount;
                        self.policyInfoList = policyInfoList;

                        self.orderInfo = orderInfo;
                        self.policyState = policyInfoList && Number(policyInfoList.policyState);
                        self.holderInfoList = policyInfoList && policyInfoList.holderInfoList[0];
                        self.insuredInfoList = policyInfoList && policyInfoList.insuredInfoList;
                        self.address = policyInfoList && policyInfoList.address && policyInfoList.address[0];
                        self.insuredAmt = policyInfoList && Number(policyInfoList.insuredAmt);

                        if(self.policyState === 1 || self.policyState === 2) {
                            // 轮询结束
                            console.log('轮询结束')
                            self.pageRender = true;
                            clearInterval(loopTimer);
                            MtIndicator.close();
                        } else if(res.isLogin === 0) {
                            // 登录
                        }
                    },
                    errorCallback: function (error) {
                        console.log(error)
                    }
                });
            }
            // 第一次查询结果
            checkResult();
            // 每3秒请求一次
            let loopTimer = setInterval(()=>{
                tick--;
                if(tick > 0){
                    checkResult();
                }else if(tick == 0){
                    // 轮询结束
                    console.log('轮询结束')
                    self.pageRender = true;
                    clearInterval(loopTimer);
                    MtIndicator.close();
                }
            }, 3000);
        }
    },
    watch: {
        'userLogin.isLogin' () {
            this.initData();
        }
    }
}
</script>

<!-- <style lang="less" src="./mip-pay-result.less" scoped></style> -->
<style lang="less" src="./mip-pay-result.less"></style>
