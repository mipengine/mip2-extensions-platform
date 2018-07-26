<template>
    <div class="insur-product common-insur-fixed container" :class="{'activity': itemDetailInfo.activity == '1'}">
        <div v-if="pageRender">

            <div class="row pt-banner">
                <div class="col-12">
                    <div class="banner-mask full"></div>
                    <div class="banner-mask half"></div>
                    <div
                        class="banner"
                        :style="{backgroundImage: `url(${itemDetailInfo.detailPicUrl})`}"
                    >
                        <div class="btn btn-reverse summary">{{itemDetailInfo.memo}}</div>
                        <div class="title common-text-truncate">{{itemDetailInfo.itemSimpleName}}</div>
                        <div class="age">{{itemDetailInfo.ageRangeDesc}}</div>
                    </div>
                </div>
            </div>

            <div class="row pt-summary" v-if="itemDetailInfo.summaryMore">
                <div class="col-12">
                    <div class="summary common-text-truncate">
                        {{itemDetailInfo.summaryMore}}
                    </div>
                </div>
            </div>

            <div class="row pt-tags">
                <div class="col-12">
                    <div class="tags">
                        <div class="tag" v-for="tag in itemDetailInfo.tags">
                            <img src="https://baoxian.baidu.com/assets/cms/static/img/1-0/icon-checker-circle.png">
                            <span class="text common-text-truncate">{{tag}}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="itemDetailInfo.activity == '1'" class="row">
                <div class="col-12">
                    <div class="activity-wrapper js-activity" :data-url="itemDetailInfo.activityUrl">
                        <span v-if="itemDetailInfo.activityPromoTag" class="l">
                            {{itemDetailInfo.activityPromoTag}}
                        </span>
                        <span class="m common-text-truncate">{{itemDetailInfo.activityTitle}}</span>
                        <span class="r common-text-truncate">{{itemDetailInfo.activityDesc}}</span>
                        <i v-if="itemDetailInfo.activityUrl" class='icon-arrow-right-gold'></i>
                    </div>
                </div>
            </div>

            <div class="row pt-safeguard">
                <div class="col-12 col-top">
                    <div class="title">保障内容</div>
                </div>
                <div class="col-12">
                    <div v-if="itemRightsInfoLength == 1" class="sg-content">
                        <div v-for="item in itemDetailInfo.itemRightsInfoList">
                            <div v-for="list in item.itemRightsDetailList" class="item">
                                <div class="left">{{list.detailTitle}}</div>
                                <div class="right">{{list.detailDesc}}</div>
                            </div>
                            <a
                                class="view-details"
                                :data-id="itemDetailInfo.itemId"
                                :data-tab="item.rightsId"
                                @click="navigate('rights-detail', {itemId: itemId, tab: item.rightsId})"
                            >
                                <span>查看保障详情</span>
                                <i class="icon-arrow-right-orange"></i>
                            </a>
                        </div>
                    </div>
                    <tab v-else
                        class="top"
                        :currentName="tabName"
                        @tabchange="tabTopchange"
                        ref="tabTop"
                    >
                        <tab-panel
                            v-for="item in itemDetailInfo.itemRightsInfoList"
                            :tabname="'rights-' + item.rightsId"
                            :tabdata="{rightsCode: item.rightsCode, firstInsurAmount: item.firstInsurAmount}"
                            :labelTop="item.firstPremium"
                            :labelBottom="item.insurAmountDesc"
                        >
                            <div v-for="list in item.itemRightsDetailList" class="item">
                                <div class="left">{{list.detailTitle}}</div>
                                <div class="right">{{list.detailDesc}}</div>
                            </div>
                            <a
                                class="view-details js-page-rights"
                                :data-id="itemDetailInfo.itemId"
                                :data-tab="item.rightsId"
                                @click="navigate('rights-detail', {itemId: itemId, tab: item.rightsId})"
                            >
                                <span>查看保障详情</span>
                                <i class="icon-arrow-right-orange"></i>
                            </a>
                        </tab-panel>
                    </tab>
                </div>
            </div>

            <div class="row pt-form">
                <vue-form :state="formstate" @submit.prevent="onSubmit" ref='form'>
                    <fieldset class="filedset-holder">
                        <div class="f-title">投保人</div>
                        <div v-for="(field, index) in comboInfo" class="form-group">
                            <validate
                                v-if="comboInfo[index].type != 'radio'"
                                tag="div"
                                class="form-control"
                                :id="`a-combo-${comboInfo[index].name}`"
                            >
                                <label
                                    :for="'combo-' + comboInfo[index].name"
                                    class="form-label"
                                >
                                    {{comboInfo[index].label}}
                                </label>
                                <div
                                    v-if="comboInfo[index].type == 'text'"
                                    class="input-wrapper"
                                >
                                    <input
                                        v-if="field.name in insurHolderModel"
                                        v-model="insurHolderModel[field.name]"
                                        :type="field.name == 'email' ? 'email' : 'text'"
                                        :placeholder="comboInfo[index].placeholder"
                                        :id="'combo-' + comboInfo[index].name"
                                        :name="'combo-' + comboInfo[index].name"
                                        autocomplete="off"
                                        :maxlength="field.name == 'govtId' ? '18' : field.name == 'mobile' ? '11' : '50'"
                                        required
                                        chinese-validator
                                        idcode-validator
                                        mobile-validator
                                        @change="onChange()"
                                    >
                                    <input
                                        v-else
                                        v-model="insurOrderModel[field.name]"
                                        type="text"
                                        :placeholder="comboInfo[index].placeholder"
                                        :id="'combo-' + comboInfo[index].name"
                                        :name="'combo-' + comboInfo[index].name"
                                        :maxlength="field.name == 'govtId' ? '18' : field.name == 'mobile' ? '11' : '50'"
                                        autocomplete="off"
                                        required
                                        chinese-validator
                                        idcode-validator
                                        @change="onChange()"
                                    >
                                </div>
                                <div
                                    v-else-if="comboInfo[index].type == 'date'"
                                    class="input-wrapper date-wrapper"
                                >
                                    <span v-if="field.name in insurHolderModel">
                                        <span class="placeholder">
                                            {{insurHolderModel[field.name] | dateFormat(value)}}
                                        </span>
                                        <i class="icon-arrow-right"></i>
                                        <input
                                            v-model="insurHolderModel[field.name]"
                                            type="date"
                                            :min="date.min"
                                            :id="'combo-' + comboInfo[index].name"
                                            :ref="'combo-' + comboInfo[index].name"
                                            :name="'combo-' + comboInfo[index].name"
                                            required
                                            date-validator
                                            range-validator
                                            @change="onChange()"
                                        >
                                    </span>
                                    <span v-else>
                                        <span class="placeholder">
                                            {{insurOrderModel[field.name] | dateFormat(value)}}
                                        </span>
                                        <i class="icon-arrow-right"></i>
                                        <input
                                            v-model="insurOrderModel[field.name]"
                                            type="date"
                                            :min="date.min"
                                            :id="'combo-' + comboInfo[index].name"
                                            :ref="'combo-' + comboInfo[index].name"
                                            :name="'combo-' + comboInfo[index].name"
                                            required
                                            date-validator
                                            range-validator
                                            @change="onChange()"
                                        >
                                    </span>
                                </div>
                                <div
                                    v-if="comboInfo[index].type == 'select'"
                                    class="input-wrapper"
                                >
                                    <select
                                        v-if="field.name in insurHolderModel"
                                        v-model="insurHolderModel[field.name]"
                                        :id="'combo-' + comboInfo[index].name"
                                        :name="'combo-' + comboInfo[index].name"
                                        required
                                        @change="onChange()"
                                    >
                                        <option value="">请选择</option>
                                        <option
                                            v-for="option in comboInfo[index].options"
                                            v-html="option.text"
                                            :value="option.value"
                                        >
                                        </option>
                                    </select>
                                    <select
                                        v-else
                                        v-model="insurOrderModel[field.name]"
                                        :id="'combo-' + comboInfo[index].name"
                                        :name="'combo-' + comboInfo[index].name"
                                        required
                                        @change="onChange()"
                                    >
                                        <option value="">请选择</option>
                                        <option
                                            v-for="option in comboInfo[index].options"
                                            v-html="option.text"
                                            :value="option.value"
                                        >
                                        </option>
                                    </select>
                                </div>
                            </validate>
                            <field-messages
                                :name="'combo-' + comboInfo[index].name"
                                show="$dirty && $touched"
                            >
                                <div
                                    class="error-message"
                                    slot="required"
                                >
                                    请{{(comboInfo[index].type == 'text' ? '输入' : '选择') +comboInfo[index].label}}
                                </div>
                                <div
                                    class="error-message"
                                    slot="chinese-validator"
                                >
                                    请输入中文姓名
                                </div>
                                <div
                                    class="error-message"
                                    slot="mobile-validator"
                                >
                                    请输入正确的手机号
                                </div>
                                <div
                                    class="error-message"
                                    slot="email"
                                >
                                    请输入正确的电子邮箱
                                </div>
                                <div
                                    class="error-message"
                                    slot="idcode-validator"
                                >
                                    请输入正确的{{comboInfo[index].label}}
                                </div>
                                <div
                                    class="error-message"
                                    slot="date-validator"
                                >
                                    日期应大于今天
                                </div>
                                <div
                                    class="error-message"
                                    slot="range-validator"
                                >
                                    失效日期应大于等于生效日期
                                </div>
                            </field-messages>

                            <div
                                class="form-control"
                                v-if="comboInfo[index].type == 'radio'"
                            >
                                <label

                                    :for="'combo-' + comboInfo[index].name"
                                    class="form-label"
                                >
                                    {{comboInfo[index].label}}
                                </label>
                                <div
                                    class="input-wrapper"
                                >
                                    <mt-switch
                                        v-model="insurHolderModel[field.name]"
                                        :options="comboInfo[index].options"
                                        @change="onChange()"
                                    >
                                    </mt-switch>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="fieldset-insured">
                        <div class="f-title">被保人</div>
                        <div
                            v-for="(field, index) in insuredInfos" class="form-group"
                            v-if="field.type !== 'radio'"
                            v-show="(field.name == 'relWithHolder') || (insuredModel.relWithHolder != defaultRelation)"
                        >
                            <validate
                                tag="div"
                                class="form-control"
                                :id="`a-insured-${insuredInfos[index].name}`"
                            >
                                <label
                                    :for="'insured-' + insuredInfos[index].name"
                                    class="form-label"
                                >
                                    {{insuredInfos[index].label}}
                                </label>
                                <div
                                    v-if="insuredInfos[index].type == 'select'"
                                    class="input-wrapper"
                                >
                                    <select
                                        v-model="insuredModel[field.name]"
                                        :name="'insured-' + insuredInfos[index].name"
                                        required
                                        @change="onChange()"
                                    >
                                        <option
                                            v-for="option in insuredInfos[index].options"
                                            v-html="option.text"
                                            :value="option.value"
                                        >
                                        </option>
                                    </select>
                                </div>
                                <div
                                    v-if="insuredInfos[index].type == 'text'"
                                    class="input-wrapper"
                                >
                                    <input
                                        v-model="insuredModel[field.name]"
                                        type="text"
                                        :placeholder="insuredInfos[index].placeholder"
                                        :id="'insured-' + insuredInfos[index].name"
                                        :name="'insured-' + insuredInfos[index].name"
                                        :required="insuredModel.relWithHolder != defaultRelation"
                                        :maxlength="field.name == 'govtId' ? '18' : field.name == 'mobile' ? '11' : '50'"
                                        autocomplete="off"
                                        chinese-validator
                                        insured-validator
                                        idcode-validator
                                        @change="onChange()"
                                    >
                                </div>
                            </validate>
                            <field-messages
                                :name="'insured-' + insuredInfos[index].name"
                                show="$dirty && $touched"
                            >
                                <div
                                    slot="required"
                                    class="error-message"
                                >
                                    请输入{{insuredInfos[index].label}}
                                </div>
                                <div
                                    class="error-message"
                                    slot="chinese-validator"
                                >
                                    请输入中文姓名
                                </div>
                                <div
                                    class="error-message"
                                    slot="insured-validator"
                                >
                                    请输入{{insuredInfos[index].label}}
                                </div>
                                <div
                                    class="error-message"
                                    slot="idcode-validator"
                                >
                                    请输入正确的{{insuredInfos[index].label}}
                                </div>
                            </field-messages>
                        </div>
                    </fieldset>

                    <fieldset class="fieldset-extend">
                        <div v-for="(field, index) in extendInfo" class="form-group">
                            <validate
                                v-if="extendInfo[index].type != 'radio'"
                                tag="div"
                                class="form-control"
                                :id="`a-extend-${extendInfo[index].name}`"
                            >
                                <label
                                    :for="'extend-' + extendInfo[index].name"
                                    class="form-label"
                                >
                                    {{extendInfo[index].label}}
                                </label>
                                <div
                                    v-if="extendInfo[index].type == 'text'"
                                    class="input-wrapper"
                                >
                                    <input
                                        v-model="extendModel[field.name]"
                                        type="text"
                                        :placeholder="extendInfo[index].placeholder"
                                        :id="'extend-' + extendInfo[index].name"
                                        :name="'extend-' + extendInfo[index].name"
                                        autocomplete="off"
                                        required
                                        chinese-validator
                                        @change="onChange()"
                                    >
                                </div>
                            </validate>
                            <field-messages
                                :name="'extend-' + extendInfo[index].name"
                                show="$dirty && $touched"
                            >
                                <div
                                    class="error-message"
                                    slot="required"
                                >
                                    请输入{{extendInfo[index].label}}
                                </div>
                                <div
                                    class="error-message"
                                    slot="chinese-validator"
                                >
                                    请输入中文姓名
                                </div>
                            </field-messages>

                            <div
                                class="form-control"
                                v-if="extendInfo[index].type == 'radio'"
                            >
                                <label

                                    :for="'extend-' + extendInfo[index].name"
                                    class="form-label"
                                >
                                    {{extendInfo[index].label}}
                                </label>
                                <div
                                    class="input-wrapper"
                                >
                                    <mt-switch
                                        v-model="extendModel[field.name]"
                                        :options="extendInfo[index].options"
                                        @change="onChange()"
                                    >
                                    </mt-switch>
                                </div>
                            </div>
                        </div>
                        <div class="meta">*保险受益人为法定受益人</div>
                    </fieldset>

                    <fieldset>
                        <div class="agreements-wrapper">
                            <label class="label">
                                <label class="bx-label">
                                    <input v-model="agreed" @change="onChange()" type="checkbox" name="agreements" class="checkbox">
                                    <span class="checker"></span>
                                </label>
                                <span class="agreements-content" v-html="agreements.content"></span>
                            </label>
                        </div>
                    </fieldset>
                </vue-form>
            </div>

            <div class="row pt-tips">
                <div class="col-12">
                    <tab
                        class="bottom"
                        theme="classic"
                        :currentName="tabNameBottom"
                        @tabchange="tabBottomchange"
                        ref="tabBottom"
                    >
                        <tab-panel
                            class="panel-details"
                            tabname="tab-details"
                            label="产品介绍"
                        >
                            <img v-for="url in itemFaqList" :src="url">
                        </tab-panel>
                        <tab-panel
                            class="panel-notice article"
                            tabname="tab-notice"
                            label="投保须知"
                        >
                            <div class="article">
                                <div class="article-bd">
                                    <div class="article-row" v-html="itemDetailInfo.insureNotice"></div>
                                </div>
                            </div>
                        </tab-panel>
                        <tab-panel
                            class="panel-guide article"
                            tabname="tab-guide"
                            label="理赔指引"
                        >
                            <div class="article-bd">
                                <div class="article-row" v-html="itemDetailInfo.claimGuide"></div>
                            </div>
                        </tab-panel>
                    </tab>
                </div>
            </div>

            <mip-fixed type="bottom" class="product-footer common-mip-footer-fixed">
                <a class="advice" @click="advice()">
                    <img src="https://baoxian.bdstatic.com/assets/cms/static/img/1-0/icon-earphone.png">
                    <span>咨询</span>
                </a>
                <span class="premium">
                    <span class="amount">{{this.insurOrderModel.premium | premiumFormat}}</span>
                </span>
                <a class="insure" @click="onSubmit()">开始投保</a>
            </mip-fixed>
        </div>
        <div v-if="popupVisible">
            <mt-popup
                v-model="popupVisible"
                position="bottom"
            >
                <div class="popup-header">
                    <div class="title">保险条款</div>
                    <i class="icon-close" @click="popupVisible = false"></i>
                </div>
                <div class="agreements">
                    <a
                        v-for="agreement in agreements.list"
                        @click="navigate('article', {type: 'agreements', itemId: agreement.itemId, id: agreement.id})"
                        class="agreement"
                    >
                        <span class="l">{{agreement.name}}</span>
                        <span class="r"><i class="icon-arrow-right"></i></span>
                    </a>
                </div>
            </mt-popup>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import _ from 'lodash';
import moment from 'moment';
import VueForm from 'vue-form';
import VueScrollTo from 'vue-scrollto';

import common from '@/common/common';
import Store from '@/static/js/store';
import request from '@/static/js/request';
import Pay from '@/static/js/pay';
import idCodeValidator from '@/static/js/validator';
import {Tab, TabPanel} from '@/components/mip-tab';

import MtToast from 'mint-ui/lib/toast';
import MtIndicator from 'mint-ui/lib/indicator';
import MtMessageBox from 'mint-ui/lib/message-box';
import MtPopup from 'mint-ui/lib/popup';
import MtSwitch from './switch';

export default {
    components: {Tab, TabPanel, VueScrollTo, MtMessageBox, MtPopup, MtIndicator, MtSwitch},
    mixins: [
        new VueForm(
            {
              validators: {
                'chinese-validator': function (value, attrValue, vnode) {
                    let name = vnode.data.attrs.name.split('-')[1];
                    if (_.includes(['fullName', 'carOwnerName'], name)) {
                        var pattern = new RegExp('[^\u4e00-\u9fa5\.]', 'i');
                        return !pattern.test(value);
                    } else {
                        return true;
                    }
                },
                'idcode-validator': function (value, attrValue, vnode) {
                    if (vnode.data.attrs.name.indexOf('govtId') !== -1) {
                        return idCodeValidator(value);
                    } else {
                        return true;
                    }
                },
                'mobile-validator': function (value, attrValue, vnode) {
                    if (vnode.data.attrs.name.indexOf('mobile') !== -1) {
                        return /^1[3-9][0-9]{9}$/.test(value);
                    } else {
                        return true;
                    }
                },
                'date-validator': function (value, attrValue, vnode) {
                    return moment(value).isAfter(moment().format('YYYY-MM-DD'));
                },
                'range-validator': function (value, attrValue, vnode) {
                    if (vnode.data.attrs.name === 'combo-termDate') {
                        let effDate = vnode.context.insurOrderModel.effDate;
                        return !!!effDate || moment(value).isSameOrAfter(effDate);
                    } else {
                        return true;
                    }
                },
                'insured-validator': function (value, attrValue, vnode) {
                    return (vnode.context.insuredModel.relWithHolder == vnode.context.defaultRelation) ||
                        (value !== '');
                }
              }
            }
    )],
    props: {
        userLogin: {
            type: Object,
            required: true,
            default: function () { return {} }
        }
    },
    data() {
        this.itemId = Number(common.getQueryParam().itemId);
        let session = Store.session.getOrder(this.itemId);
        let min = moment().add(1, 'days').format('YYYY-MM-DD');
        return {
            pageRender: false,
            formstate: {},
            date: {
                min: min,
            },
            agreed: session && session.agreed || false,
            submitDisabled: false,
            popupVisible: false,
            insurHolderModel: {
                fullName: session && session.insurHolderInfo && session.insurHolderInfo.fullName || '',
                govtId: session && session.insurHolderInfo && session.insurHolderInfo.govtId || '',
                mobile: session && session.insurHolderInfo && session.insurHolderInfo.mobile || '',
                email: session && session.insurHolderInfo && session.insurHolderInfo.email || '',
            },
            insurOrderModel: {
                rightsCode: '',
                firstInsurAmount: '',
                premium: '--',
                insPeriod: session && session.insurOrderInfo && session.insurOrderInfo.insPeriod || '',
                effDate: session && session.insurOrderInfo && session.insurOrderInfo.effDate || min,
                termDate: session && session.insurOrderInfo && session.insurOrderInfo.termDate || min,
            },
            insuredModel: {
                relWithHolder: session && session.insuredInfos && session.insuredInfos[0].relWithHolder || '',
                fullName: session && session.insuredInfos && session.insuredInfos[0].fullName || '',
                govtId: session && session.insuredInfos && session.insuredInfos[0].govtId || '',
            },
            extendModel: {
                carOwnerName: session && session.extendInfo && session.extendInfo.carOwnerName || '',
                plateNumber: session && session.extendInfo && session.extendInfo.plateNumber || '',
                isHighRisk: session && session.extendInfo && session.extendInfo.isHighRisk || false,
            },
            itemDetailInfo: {},
            tabName: '',
            tabNameBottom: '',
            agreements: {
                content: '',
                list: []
            }
        };
    },
    prerenderAllowed () {
        return true
    },
    created() {
        let session = Store.session.getOrder(this.itemId);
        let self = this;
        MtIndicator.open();

        request({
            url: common.api.item,
            data: {
                itemId: this.itemId
            },
            successCallback: function (res) {
                self.pageRender = true;

                self.itemDetailInfo = res.itemDetailInfo;

                // 选项卡
                let firstRightsInfo = self.itemDetailInfo.itemRightsInfoList[0];
                self.insurOrderModel.rightsCode = firstRightsInfo.rightsCode;
                self.insurOrderModel.firstInsurAmount = String(firstRightsInfo.firstInsurAmount);
                self.tabName = session && session.tabName || 'rights-' + firstRightsInfo.rightsId;
                self.tabNameBottom = 'tab-details';
                self.$nextTick(() => {
                    self.$refs.tabTop && self.$refs.tabTop.scrollToView('.active', 0);
                });

                // 其他数据的格式化
                self.itemDetailInfo.tags = self.itemDetailInfo.uspTag.split('|');
                self.itemRightsInfoLength = self.itemDetailInfo.itemRightsInfoList.length;
                self.itemFaqList = self.itemDetailInfo.itemFaq.split('|');

                self.$nextTick(() => {
                    self.calcPremium();
                    // 解决fixed闪现(SF环境预览)
                    window.MIP.viewer.fixedElement.init();
                });

                self.getAgreements();
            },
            errorCallback: function (error) {
                console.log(error);
            },
            completeCallback: function() {
                MtIndicator.close();
            }
        });

        // 表单字段
        request({
            url: '/assets/cms/project/' + this.itemId + '/form-fields.json',
            successCallback: function (res) {
                self.fields = res.fields;

                // 投保人信息
                self.insurHolderInfo = self.fields.insurHolderInfo;

                // 保单信息
                self.insurOrderInfo = self.fields.insurOrderInfo;

                // 投保人、保单联合信息
                self.comboInfo = self.insurHolderInfo.concat(self.insurOrderInfo);

                // 被保人信息
                self.insuredInfos = self.fields.insuredInfos;

                // 被保人与投保人关系
                self.defaultRelation = self.insuredInfos.filter(function(item) {
                        return item.name === 'relWithHolder';
                    })[0].options[0].value;

                self.insuredModel.relWithHolder =
                    (session && session.insuredInfos && session.insuredInfos[0].relWithHolder) ||
                    self.defaultRelation;

                // 其他信息
                self.extendInfo = self.fields.extendInfo;
            }
        });
    },
    filters: {
        dateFormat(value) {
            return value ? value : '请选择';
        },
        premiumFormat(n) {
            return (typeof n === 'number' && '¥' + (n / 100).toFixed(2)) || '--';
        }
    },
    watch: {
        // 失效日期应大于等于生效日期
        'insurOrderModel.effDate': function (newValue, oldValue) {
            if (this.$refs['combo-termDate']) {
                this.$refs['combo-termDate'][0].min = newValue;
                if (moment(this.insurOrderModel.effDate).isAfter(this.insurOrderModel.termDate)) {
                    this.insurOrderModel.termDate = this.insurOrderModel.effDate;
                }
            }
        },
        'insuredModel.relWithHolder': function (newValue, oldValue) {
            if (newValue === this.defaultRelation) {
                this.insuredModel.fullName = '';
                this.insuredModel.govtId = '';

                if (this.formstate['insured-fullName']) {
                    this.formstate['insured-fullName'].$touched = false;
                }
                if (this.formstate['insured-govtId']) {
                    this.formstate['insured-govtId'].$touched = false;
                }
            }
        }
    },
    methods: {
        tabTopchange(tab) {
            this.tabName = tab.tabname;
            this.insurOrderModel.rightsCode = tab.tabdata.rightsCode;
            this.insurOrderModel.firstInsurAmount = String(tab.tabdata.firstInsurAmount);
            this.onChange();
        },
        tabBottomchange(tab) {
            this.tabNameBottom = tab.tabname;
        },
        navigate(name, params) {
            common.navigate(name, {
                ...params
            });
        },
        advice() {
            MtMessageBox({
                title: ' ',
                message: `即将为您拨打<br /><strong>${this.itemDetailInfo.serviceTeleNo}</strong>`,
                showCancelButton: true
            }).then(action => {
                if (action === 'confirm') {
                    common.setTel(this.itemDetailInfo.serviceTeleNo);
                }
            });
        },
        linkToArticle(className) {
            $('body').on('click', className, (e) => {
                e.preventDefault();
                let data = e.currentTarget.dataset;
                let params = {id: data.id};
                if (data.id !== 'protocol') {
                    params.itemId = this.itemId;
                    params.type = 'agreements';
                }
                this.navigate('article', params);
            });
        },
        showPopup(className) {
            $('body').on('click', className, (e) => {
                e.preventDefault();
                this.popupVisible = true;
            });
        },
        onChange() {
            let self = this;
            this.storeFormData();
            this.$nextTick(() => {
                this.calcPremium();
            });
        },
        // 保费试算
        calcPremium() {
            if(this.formstate.$valid) {
                let self = this;
                request({
                    method: 'post',
                    url: '/insurface/policy/pricing',
                    data: {
                        ...Store.session.getOrder(self.itemId)
                    },
                    successCallback: function (res) {
                        self.insurOrderModel.premium = Number(res.premium);
                        self.storeFormData();
                    },
                    errorCallback: function (error) {
                        console.log(error);
                    }
                });
            }
        },
        storeFormData(opts) {
            let data = Object.assign({}, {
                itemId: Number(this.itemId),
                tabName: this.tabName,
                insurHolderInfo: _.clone(this.insurHolderModel),
                insurOrderInfo: _.clone(this.insurOrderModel),
                insuredInfos: [_.clone(this.insuredModel)],
                extendInfo: _.clone(this.extendModel),
                agreed: this.agreed
            }, opts);

            data.insurOrderInfo.premium = Number(data.insurOrderInfo.premium);
            data.insurOrderInfo.insPeriod = Number(data.insurOrderInfo.insPeriod);

            Store.session.setOrder(this.itemId, data);
        },
        onSubmit() {
            if (this.submitDisabled) {
                return;
            }

            if(this.formstate.$invalid) {
                MtToast('请输入正确信息后投保');

                setTimeout(() => {
                    let array = [];
                    for (let key in this.formstate.$error) {
                        array.push(key);
                        if (this.formstate[key].$invalid) {
                            this.formstate[key].$touched = true;
                            this.formstate[key].$dirty = true;
                        }
                    }

                    let offset;
                    try {
                        offset = document.getElementsByClassName('mip-shell-header')[0].clientHeight;
                    } catch(e) {
                        offset = '';
                    }

                    // 滚动到第一个输入错误的元素
                    VueScrollTo.scrollTo('#a-' + array[0], 500, {
                        container: 'body',
                        easing: 'ease-in',
                        offset: -offset || -44,
                        x: false,
                        y: true
                    });
                }, 3000);
            } else if (!this.agreed) {
                let content = document.getElementsByClassName('agreements-content')[0];
                content = Array(...content.querySelectorAll('.js-link'));
                content = content.map((c) => {
                    let obj = {id: c.dataset.id, name: c.innerText};
                    if (obj.id !== 'protocol') {
                        obj.itemId = this.itemId;
                    }
                    return obj;
                });

                let agreements = this.agreements.list.map((a) => {
                    return {itemId: a.itemId, id: a.id, name: `《${a.name}》`};
                });
                agreements = content.concat(agreements);
                agreements = agreements.map((agreement) => {
                    return `
                        <a
                            class="mt-agreement"
                            data-item-id="${agreement.itemId}"
                            data-id="${agreement.id}"
                            data-type="agreements"
                        >
                            ${agreement.name}
                        </a>
                    `;
                }).join('');

                MtMessageBox({
                    title: ' ',
                    message: '确认接受' + agreements + '的全部内容',
                    showCancelButton: false
                }).then(action => {
                    if (action === 'confirm') {
                        this.agreed = true;
                        this.onSubmit();
                    }
                });

                this.$nextTick(() => {
                    Array(...document.getElementsByClassName("mt-agreement")).map((agreement) => {
                        agreement.addEventListener("click", (e) => {
                            let data = e.currentTarget.dataset;
                            let params = {id: data.id, type: data.type};
                            if (data.itemId && data.itemId !== 'undefined') {
                                params.itemId = data.itemId;
                            }
                            this.navigate('article', params);
                        });
                    });
                });
            } else if (!this.userLogin.isLogin) {
                this.$emit('handleLogin', {});
            } else {
                let self = this;
                this.submitDisabled = true;
                MtIndicator.open();

                let orderModel = Object.assign({}, this.insurOrderModel);
                orderModel.insPeriod = Number(orderModel.insPeriod);

                request({
                    method: 'post',
                    url: common.api.order,
                    data: {
                        ...Store.session.getOrder(self.itemId)
                    },
                    successCallback: function (res) {
                        self.storeFormData({
                            itemSimpleName: self.itemDetailInfo.itemSimpleName,
                            applicationNoExt: res.applicationNoExt,
                            orderNoExt: res.orderNoExt,
                            spNo: res.spNo
                        });
                        if (self.itemDetailInfo.healthNotice) {
                            self.navigate('health-notice', {itemId: self.itemId});
                        } else {
                            Pay.bind(self)();
                        }
                    },
                    errorCallback: function (res) {
                        let code = Number(res && res.resultCode);
                        switch(code) {
                            case 100023:
                                MtToast('请登录后再操作');
                                break;
                            case 100042:
                                MtToast('投保失败，请核对您的投保信息是否符合投保要求，或者联系保险公司客服');
                                break;
                            case 100043:
                                MtToast('投保失败，请稍后再试');
                                break;
                            case 100045:
                                MtToast('被保险人年龄大于等于18岁时不可由他人代为投保');
                                break;
                            default:
                                MtToast(common.config.systemError);
                        }
                        return true;
                    },
                    completeCallback: function () {
                        self.submitDisabled = false;
                        MtIndicator.close();
                    }
                });
            }
        },
        getAgreements() {
            let self = this;
            // 保险条款
            request({
                url: '/assets/cms/project/' + this.itemId + '/agreements.json',
                successCallback: (res) => {
                    self.agreements.content = res.content;
                    res.list.forEach((item) => item.itemId = self.itemId);
                    self.agreements.list.push(...res.list);
                    self.linkToArticle('.js-link');
                    self.showPopup('.js-popup');
                }
            });
        },
    }
};
</script>

<style lang="less" src="./mip-product.less"></style>
<style lang="less" src="./popup.less"></style>
