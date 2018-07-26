<template>
	<div class="insur-policy-detail common-insur-fixed du-wing-blank-lg" v-if="pageRender && policy && userLogin.isLogin">

        <div class="row detail-top">
            <div class="logo" v-if="policy.spLogo"><img src="policy.spLogo" /></div>
            <div class="space" v-else></div>
            <div class="title">{{policy.itemSimpleName}}</div>
            <div class="sort-no">NO.{{policy.policyNo}}</div>
            <div class="unit">该保单由{{policy.spName}}承保</div>
            <div class="status iconimg icon-effecting" v-if="policy.state === 1"></div>
            <div class="status iconimg icon-guarantee" v-else-if="policy.state === 2"></div>
            <div class="status iconimg icon-invalid" v-else-if="policy.state === 3"></div>
            <div class="status iconimg icon-retreat" v-else-if="policy.state === 7"></div>
            <div class="status iconimg icon-revoke" v-else-if="policy.state === 18"></div>
        </div>

        <div class="row detail-bx">
            <div class="detail-hd">投保方案</div>
            <div class="detail-bd">
                <div class="du-item">
                    <div class="du-item-bd">保障期限</div>
                    <div class="du-item-ft">{{policy.validateTime}}～{{policy.expireTime}}</div>
                </div>
                <div class="du-item">
                    <div class="du-item-bd">保费金额</div>
                    <div class="du-item-ft orange">{{policy.payAmount}}元</div>
                </div>
            </div>

            <div class="common-policy-tip" v-if="policy.activityText">
                <span class="iconimg icon-zeng"></span>
                <span class="tip-text common-text-truncate">{{policy.activityText}}</span>
                <i class="icon-arrow-right"></i>
            </div>

        </div>

        <div class="row detail-bx">
            <div class="detail-hd">投保人</div>
            <div class="detail-bd">

                <div class="du-item">
                    <div class="du-item-bd">姓名</div>
                    <div class="du-item-ft orange">{{holderInfoList.holderName}}</div>
                </div>

                <div class="du-item">
                    <div class="du-item-bd">证件类型</div>
                    <div class="du-item-ft">{{holderInfoList.holderCertType}}</div>
                </div>

                <div class="du-item">
                    <div class="du-item-bd">证件号码</div>
                    <div class="du-item-ft">{{holderInfoList.holderCertNo}}</div>
                </div>

                <div class="du-item">
                    <div class="du-item-bd">手机号码</div>
                    <div class="du-item-ft">{{holderInfoList.holderMobile}}</div>
                </div>

                <div class="du-item">
                    <div class="du-item-bd">电子邮件</div>
                    <div class="du-item-ft">{{holderInfoList.holderEmail}}</div>
                </div>

            </div>
        </div>

        <div class="row detail-bx">
            <div class="detail-insured" v-for="(item, index) in firstInsureInfo" :key="item.insuredCertNo">
                <div class="detail-hd" v-if="insuredInfoList.length == 1">被保险人</div>
                <div class="detail-hd" v-else>被保险人{{index + 1}}</div>
                <div class="detail-bd">

                    <div class="du-item">
                        <div class="du-item-bd">与投保人关系</div>
                        <div class="du-item-ft">{{item.relation}}</div>
                    </div>
                    <div class="du-item">
                        <div class="du-item-bd">姓名</div>
                        <div class="du-item-ft orange">{{item.insuredName}}</div>
                    </div>
                    <div class="du-item">
                        <div class="du-item-bd">证件类型</div>
                        <div class="du-item-ft">{{item.insuredCertType}}</div>
                    </div>
                    <div class="du-item">
                        <div class="du-item-bd">证件号码</div>
                        <div class="du-item-ft">{{item.insuredCertNo}}</div>
                    </div>
                    <div class="du-item">
                        <div class="du-item-bd">手机号码</div>
                        <div class="du-item-ft">{{item.insuredMobile}}</div>
                    </div>
                    <div class="du-item">
                        <div class="du-item-bd">电子邮件</div>
                        <div class="du-item-ft">{{item.insuredEmail}}</div>
                    </div>
                    <div class="du-item">
                        <div class="du-item-bd">受益人类型</div>
                        <div class="du-item-ft">{{item.beneficiaryType}}</div>
                    </div>

                </div>
                <div class="detail-ft" v-if="insuredInfoList.length > 1 && !isShowRemainInsured" @click="handleShowRemainInsured">
                    <div class="extend">展开其余{{insuredInfoList.length - 1}}个被保险人信息</div>
                </div>
            </div>
        </div>

        <div class="row detail-bx" v-if="Array.isArray(remark) && (remark.length > 0)">
            <div class="detail-hd">其他信息</div>
            <div class="detail-bd">
                <div class="du-item" v-for="item in remark">
                    <div class="du-item-bd">{{item.key}}</div>
                    <div class="du-item-ft">{{item.value}}</div>
                </div>
            </div>
        </div>

        <div class="row row-special detail-bx">
            <div class="detail-bd">
                <div class="du-item" @click="goGuide(itemId)">
                    <div class="du-item-bd">理赔指引</div>
                    <div class="du-item-ft"><span class="icon-arrow-right" title="查看"></span></div>
                </div>
                <div class="du-item" @click="goProduct(itemId)" v-if="Number(isNewPrdFlag) !== 2">
                    <div class="du-item-bd">产品详情</div>
                    <div class="du-item-ft"><span class="icon-arrow-right" title="查看"></span></div>
                </div>
            </div>
        </div>

        <div class="query-policy">
            <a class="du-button du-button-hollow-danger" v-if="policy.hasPolicyDownload === '1'" @click="policyDownload(itemId, policy.policyNoExt, isNewPrdFlag)" href="javascript:void(0)">查看电子保单</a>
            <div class="special-tips" v-else>
                电子保单可以到您投保时填写的电子邮箱中查看，详询保险公司客服：<span class="number"><a :href="'tel:' + policy.spTel">{{policy.spTel}}</a></span>
            </div>
        </div>

        <mip-fixed type="bottom" class="common-mip-footer-fixed">
            <div class="du-button du-button-large du-button-default" @click="goIndex" href="javascript:void(0)">再次购买</div>
        </mip-fixed>

	</div>
</template>

<script>
import MtMessageBox from 'mint-ui/lib/message-box';
import MtIndicator from 'mint-ui/lib/indicator';
import Common from '@/common/common';
import Request from '@/static/js/request';
export default {
    components: {
        MtMessageBox,
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
            policy: null,
            holderInfoList: null,
            insuredInfoList: [],
            firstInsureInfo: [],
            remainInsured: [],
            isShowRemainInsured: false,
            remark: [],
            isNewPrdFlag: null,
            itemId: null
        }
    },
    created () {
        MtIndicator.open();
    },
    methods: {
        initData () {
            let self = this;
            let policyNoExt = Common.getParamValue('policyNoExt');
            let spNo = Common.getParamValue('spNo');
            let isNewPrdFlag = Common.getParamValue('isNewPrdFlag');
            Request({
                url: Common.api.policyDetail,
                data: {
                    policyNoExt: policyNoExt,
                    spNo: spNo,
                    isNewPrdFlag: isNewPrdFlag
                },
                successCallback: function (res) {
                    self.pageRender = true;
                    self.policy = res.bean;

                    self.isNewPrdFlag = res.bean.isNewPrdFlag;
                    self.holderInfoList = res.bean.holderInfoList[0];
                    self.insuredInfoList = res.bean.insuredInfoList;
                    self.firstInsureInfo = res.bean.insuredInfoList.slice(0,1);
                    self.remainInsured = res.bean.insuredInfoList.slice(1);
                    self.remark = res.bean.remark;
                    self.itemId = res.bean.itemId;
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
        goIndex () {
            Common.navigate('index');
        },
        goProduct (itemId) {
            Common.navigate('product', {
                'itemId': itemId
            });
        },
        goGuide (itemId) {
            Common.navigate('guide', {
                'itemId': itemId
            });
        },
        handleShowRemainInsured () {
            let self = this;
            self.isShowRemainInsured = true;
            self.firstInsureInfo = self.insuredInfoList;
        },
        policyDownload (itemId, policyNoExt, isNewPrdFlag) {
            Request({
                url: Common.api.policyDownload,
                data: {
                    itemId: itemId,
                    // 兼容后端老版本
                    policyNo: policyNoExt,
                    isNewPrdFlag: isNewPrdFlag
                },
                successCallback: function (res) {
                    if (res.insureUrl === null || res.insureUrl === '') {
                        MtMessageBox({
                            title: ' ',
                            message: '保险公司24小时内生成电子保单，请稍后再试！'
                        });
                    } else {
                        location.href = res.insureUrl;
                    }
                },
                errorCallback: function (error) {
                    console.log(error)
                }
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
<style lang="less" src="./mip-policy-detail.less" scoped></style>
