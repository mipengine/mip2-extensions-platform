<template>
    <div class="insur-health-notice common-insur-fixed du-wing-blank-lg" v-if="pageRender">
        <div class="article">
            <div class="du-white-space-lg">
                <div class="h1">请阅读健康告知</div>
                <h5 class="h5">请仔细阅读以下内容，关系到您的投保结果</h5>
            </div>
            <div class="article-row">
                <h2 class="h2">被保险人健康告知</h2>
                <div v-html="healthNotice"></div>
            </div>
            <div class="article-act"><a class="du-button du-button-hollow-danger" @click="handleContact" href="javascript:void(0)"><b class="iconimg icon-earphone"></b>咨询客服</a></div>
        </div>

        <mip-fixed type="bottom" class="common-mip-footer-fixed">
            <a class="du-button du-button-large du-button-hollow-danger" @click="handleProblem" href="javascript:void(0)">有部分情况</a>
            <a class="du-button du-button-large du-button-default" @click="handlePay" href="javascript:void(0)">确认无以上问题</a>
        </mip-fixed>

    </div>
</template>

<script>
import MtIndicator from 'mint-ui/lib/indicator';
import MtMessageBox from 'mint-ui/lib/message-box';

import Common from '@/common/common';
import Pay from '@/static/js/pay';
import Request from '@/static/js/request';
import Store from '@/static/js/store';

export default {
    components: {
        MtIndicator,
        MtMessageBox
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
            healthNotice: null,
            spName: '',
            serviceTelNo: ''
        }
    },
    created () {
        MtIndicator.open();
        this.initData();
    },
    methods: {
        initData () {
            let self = this;
            let itemId = Number(Common.getParamValue('itemId')) || '0';
            Request({
                url: Common.api.healthNotice,
                data: {
                    itemId: itemId
                },
                successCallback: function (res) {
                    self.pageRender = true;
                    self.healthNotice = res.healthNotice;
                    self.spName = res.spName;
                    self.serviceTelNo = res.serviceTelNo;
                    self.$nextTick(() => {
                        // 解决fixed闪现(SF环境预览)
                        window.MIP.viewer.fixedElement.init();
                    });
                },
                errorCallback: function (error) {
                    console.log(error)
                },
                completeCallback: function() {
                    MtIndicator.close();
                }
            });
        },
        handleContact () {
            let self = this;
            MtMessageBox({
                title: ' ',
                message: `即将为您拨打<br /><strong>${self.spName}电话</strong>`,
                showCancelButton: true
            }).then(action => {
                if (action==='confirm') {
                    Common.setTel(self.serviceTelNo);
                }
            })
        },
        handleProblem () {
            MtMessageBox({
                title: ' ',
                confirmButtonText: '我知道了',
                message: '抱歉，被保险人没有通过健康测试<br />暂时无法投保'
            });
        },
        handlePay  () {
            if (!this.userLogin.isLogin) {
                this.$emit('handleLogin', {});
            } else {
                Pay.bind(this)();
            }
        }
    }
}
</script>

<style lang="less" src="./mip-health-notice.less"></style>
