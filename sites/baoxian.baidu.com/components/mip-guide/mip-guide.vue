<template>
    <div class="insur-guide common-insur-fixed" v-if="pageRender">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="guide-hd">如需进行理赔<br />请仔细阅读以下内容</div>
                </div>
            </div>
            <div class="row row-last">
                <div class="col-12 guide-bd" v-html="guideContent"></div>
            </div>
        </div>

        <mip-fixed type="bottom" class="common-mip-footer-fixed">
            <a class="du-button du-button-large du-button-hollow-danger" @click="handleContact" href="javascript:void(0)"><b class="iconimg icon-earphone-orange"></b>联系保险公司</a>
        </mip-fixed>

    </div>
</template>

<script>
import MtIndicator from 'mint-ui/lib/indicator';
import MtMessageBox from 'mint-ui/lib/message-box';
import Common from '@/common/common';
import Request from '@/static/js/request';
export default {
    components: {
        MtMessageBox,
        MtIndicator
    },
    data () {
        return {
            pageRender: false,
            guideContent: null,
            spName: '',
            phone: ''
        }
    },
    created () {
        MtIndicator.open();
        this.initData();
    },
    methods: {
        initData () {
            let self = this;
            let itemId = Common.getParamValue('itemId');
            Request({
                url: Common.api.claimGuide,
                data: {
                    itemId: itemId
                },
                successCallback: function (res) {
                    self.pageRender = true;
                    self.guideContent = res.claimGuide;
                    self.spName = res.spName;
                    self.phone = res.phone;
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
                    Common.setTel(self.phone);
                }
            })
        }
    }
}
</script>

<style lang="less" src="./mip-guide.less"></style>