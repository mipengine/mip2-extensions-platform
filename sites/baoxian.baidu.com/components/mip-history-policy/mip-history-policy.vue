<template>
<div class="insur-history-policy du-wing-blank-lg" v-if="pageRender && userLogin.isLogin">
    <div class="policy-bd" v-if="historyPolicy.length > 0">
        <div class="common-policy-item" v-for="item in historyPolicy" :key="item.orderNo">
            <div class="policy-item-inner" @click="goPolicyDetail(item.policyNoExt, item.spNo, item.isNewPrdFlag)">
                <div class="policy-item-bd">
                    <div class="title">{{item.itemSimpleName}}</div>
                    <div class="time">结束日期: {{item.expireTime}}</div>
                    <div class="status iconimg icon-invalid" v-if="item.state === 3"></div>
                    <div class="status iconimg icon-retreat" v-else-if="item.state === 7"></div>
                    <div class="status iconimg icon-revoke" v-else-if="item.state === 18"></div>
                </div>
                <div class="policy-sort-no">NO.{{item.policyNo}}</div>
                <div class="common-policy-tip" v-if="item.activityText">
                    <span class="iconimg icon-zeng"></span>
                    <span class="tip-text common-text-truncate">{{item.activityText}}</span>
                </div>
            </div>
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
    data () {
        return {
            pageRender: false,
            historyPolicy: []
        }
    },
    created () {
        MtIndicator.open();
    },
    methods: {
        initData () {
            let self = this;
            Request({
                url: Common.api.policy,
                data: {
                    isHistory: 'Y'
                },
                successCallback: function (res) {
                    self.pageRender = true;
                    self.historyPolicy = res.policyInfoViewDetailList;
                },
                errorCallback: function (error) {
                    console.log(error)
                },
                completeCallback: function() {
                    MtIndicator.close();
                }
            });
        },
        goPolicyDetail (policyNoExt ,spNo, isNewPrdFlag) {
            Common.navigate('policy-detail', {
                'policyNoExt': policyNoExt,
                'spNo': spNo,
                'isNewPrdFlag': isNewPrdFlag
            });
        }
    },
    watch: {
        'userLogin.isLogin' () {
            this.initData();
        }
    }
}
</script>

<style lang="less" src="./mip-history-policy.less" scoped></style>
