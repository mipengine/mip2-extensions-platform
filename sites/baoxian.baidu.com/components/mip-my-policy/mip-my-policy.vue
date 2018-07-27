<template>

    <div class="insur-my-policy du-wing-blank-lg" v-if="pageRender && userLogin.isLogin">

        <div class="policy-hd du-white-space-lg">
            <div class="now du-white-space-sm">当前保障</div>
            <div class="inform">订单支付成功后，保单将会在24小时内展现</div>
        </div>

        <div class="policy-empty" v-if="myPolicy && myPolicy.length == 0">
            <div class="iconimg icon-empty"></div>
            <div class="policy-empty-info du-white-space-md">当前暂无保单信息</div>
            <a class="du-button du-button-hollow-primary policy-empty-button" href="javascript:void(0)" @click="goIndex">去挑选其它保险</a>
        </div>

        <div class="policy-bd" v-else-if="myPolicy && myPolicy.length > 0">
            <div class="common-policy-item" v-for="item in myPolicy" :key="item.orderNo">
                <div class="policy-item-inner" @click="goPolicyDetail(item.policyNoExt, item.spNo, item.isNewPrdFlag)">
                    <div class="policy-item-bd">
                        <div class="title">{{item.itemSimpleName}}</div>
                        <div class="time">保障期限: {{item.validateTime}}～{{item.expireTime}}</div>
                        <div class="price">保费金额: {{item.payAmount}}元</div>
                        <div class="status iconimg icon-effecting" v-if="item.state === 1"></div>
                        <div class="status iconimg icon-guarantee" v-else-if="item.state === 2"></div>
                    </div>
                    <div class="policy-sort-no">NO.{{item.policyNo}}</div>
                    <div class="common-policy-tip" v-if="item.activityText">
                        <span class="iconimg icon-zeng"></span>
                        <span class="tip-text common-text-truncate">{{item.activityText}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-bind:class="['policy-query', { 'policy-query-fixed': myPolicy.length == 0 && hasHistory == '1'}]"
            v-if="hasHistory == '1'" >
            <div @click="goHistoryPolicy">
                <span>查看历史保单</span>
                <i class="icon-arrow-right"></i>
            </div>
        </div>

    </div>
</template>

<script>
import MtIndicator from 'mint-ui/lib/indicator';
import Common from '@/common/common';
import Request from '@/static/js/request';
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
    created () {
        MtIndicator.open();
    },
    data () {
        return {
            pageRender: false,
            hasHistory: 0,
            myPolicy: null
        }
    },
    methods: {
        initData () {
            let self = this;
            Request({
                url: Common.api.policy,
                data: {
                    isHistory: 'N'
                },
                successCallback: function (res) {
                    console.log('successCallback')
                    self.pageRender = true;
                    self.hasHistory = res.hasHistory;
                    self.myPolicy = res.policyInfoViewDetailList;
                },
                errorCallback: function (error) {
                    console.log(error)
                },
                completeCallback: function() {
                    MtIndicator.close();
                }
            });
        },
        goIndex () {
            Common.navigate('index');
        },
        goPolicyDetail (policyNoExt ,spNo, isNewPrdFlag) {
            Common.navigate('policy-detail', {
                'policyNoExt': policyNoExt,
                'spNo': spNo,
                'isNewPrdFlag': isNewPrdFlag
            });
        },
        goHistoryPolicy () {
            Common.navigate('history-policy');
        }
    },
    watch: {
        'userLogin.isLogin' () {
            this.initData();
        }
    }
}
</script>

<style lang="less" src="./mip-my-policy.less" scoped></style>