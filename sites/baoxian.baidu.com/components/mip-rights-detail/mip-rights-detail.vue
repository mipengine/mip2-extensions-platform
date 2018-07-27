<template>
    <div class="insur-rights-detail" v-if="pageRender">
        <tab class="bottom" theme="classic" :currentName="tabNameTop" @tabchange="tabBottomchange" ref="tabBox">
            <tab-panel v-for="item in itemRightsInfoList" :tabname="'tab-' + item.rightsId" :label="item.insurAmountDesc">
                <div class="rights-card" v-for="detail in item.itemRightsDetailList">
                    <div class="card-hd">
                        <span class="card-title">{{detail.detailTitle}}</span>
                        <span class="card-desc">{{detail.detailDesc}}</span>
                    </div>
                    <div class="card-bd">
                        {{detail.detailSummary}}
                    </div>
                </div>
            </tab-panel>
        </tab>
    </div>
</template>

<script>
import MtIndicator from 'mint-ui/lib/indicator';
import {Tab, TabPanel} from '@/components/mip-tab';
import Request from '@/static/js/request';
import Common from '@/common/common';
export default {
    components: {Tab, TabPanel, MtIndicator},
    data () {
        return {
            pageRender: false,
            itemRightsInfoList: [],
            tabNameTop: ""
        }
    },
    created() {
        MtIndicator.open();
        this.initData();
    },
    methods: {
        initData () {
            let self = this;
            let itemId = Common.getParamValue('itemId');
            let rightsId = Common.getParamValue('tab');
            Request({
                url: Common.api.rightsDetail,
                data: {
                    itemId: itemId
                },
                successCallback: function (res) {
                    self.tabNameTop = 'tab-' + rightsId;
                    self.pageRender = true;
                    self.itemRightsInfoList = res.itemRightsInfoList;
                    if (self.itemRightsInfoList.length > 1) {
                        self.$nextTick(()=>{
                            self.$refs.tabBox.scrollToView('.active', 0);
                        });
                    }
                },
                errorCallback: function (error) {
                    console.log(error)
                },
                completeCallback: function() {
                    MtIndicator.close();
                }
            });
        },
        tabBottomchange (tab) {
            this.tabNameTop = tab.tabname;
        }
    }
}
</script>

<style lang="less" src="./mip-rights-detail.less"></style>
