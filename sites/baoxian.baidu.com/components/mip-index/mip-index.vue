<template>
<div class="insur-index" v-if="pageRender">

    <div class="index-top">
        <div class="slogan du-wing-blank-lg">
            <h2 class="slogan-name">{{ appName }}</h2>
            <p class="slogan-sub">为您精选好保险</p>
        </div>
        <a data-type="mip" href="./my-policy" class="du-button du-button-mini du-button-hollow-default policy-button">我的保单</a>
    </div>

    <div class="index-carousel du-wing-blank-lg du-white-space-lg">
        <div
            v-for="item in topItemInfos"
            v-bind:class="['carousel-item', { 'carousel-item-active': item.activity==='1' }]"
            v-bind:key="item.index">
            <div class="carousel-tag">
                <!-- activityPromoTag -->
                <span class="common-tag-solid common-tag-red common-tag-1" v-if="item.activity==='1' && item.activityPromoTag">{{ item.activityPromoTag }}</span>

                <!-- promoTag -->
                <span class="common-tag-solid common-tag-red2 common-tag-2" v-if="item.activity==='1'">{{ item.promoTag }}</span>
                <span class="common-tag-solid common-tag-red2 common-tag-2" v-else>特别甄选</span>

                <!-- itemDesc -->
                <span class="common-tag-solid common-tag-soil2 common-tag-3">{{ item.itemDesc }}</span>
            </div>

            <div class="carousel-name">{{ item.itemSimpleName }}</div>
            <div class="carousel-type" v-html="formatType(item.itemTag)"></div>
            <div class="carousel-button du-button du-button-default" @click="goProduct(item.itemId)">立即查看</div>
        </div>
    </div>

    <div class="index-banner du-wing-blank-lg du-white-space-lg" v-if="false">
        <div class="index-hd common-hd">投保头条</div>
        <div class="index-bd">
            <div
                v-for="item in bannerInfos"
                class="banner-item">
                <img class="index-banner-img" v-bind:src="item.bannerPhotoUrl" />
            </div>
        </div>
    </div>

    <div class="index-list du-wing-blank-lg du-white-space-lg">
        <div class="index-hd common-hd">最热保险</div>
        <div class="index-bd">
            <div class="pic-list common-pic-list">
                <div
                    v-for="item in itemInfos"
                        v-bind:class="['pic-item', { 'pic-item-active': item.activity==='1' }]" @click="goProduct(item.itemId)">
                    <div class="pic-item-hd">
                        <img
                        v-bind:src="item.mainPicUrl" />
                    </div>
                    <div class="pic-item-bd">
                        <div class="pic-item-name">{{ item.itemSimpleName }}</div>
                        <div class="pic-item-type du-white-space-mn common-text-truncate" v-html="formatType(item.itemTag)"></div>
                        <div class="pic-item-tag du-white-space-sm">
                            <!-- activityPromoTag -->
                            <span class="common-tag-solid common-tag-red common-tag-1" v-if="item.activity==='1' && item.activityPromoTag">{{ item.activityPromoTag }}</span>

                            <!-- promoTag -->
                            <span class="common-tag-solid common-tag-red2 common-tag-2" v-if="item.activity==='1'">{{ item.promoTag }}</span>

                            <!-- itemDesc -->
                            <span class="common-tag-solid common-tag-soil2 common-tag-3">{{ item.itemDesc }}</span>
                        </div>

                        <div class="pic-item-amount" v-if="item.discountAmount">
                            <span class="pic-item-number">{{ item.discountAmount }}</span>
                            <span class="pic-item-text">元起</span>
                            <span class="pic-item-text common-strike">{{ item.firstInsurAmount }}元</span>
                        </div>
                        <div class="pic-item-amount" v-else>
                            <span class="pic-item-number">{{ item.firstInsurAmount }}</span>
                            <span class="pic-item-text">元起</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="common-footer">
        <div class="brand-name" v-bind:title="appName"></div>
        <div class="brand-detail">严选优质保险产品服务</div>
    </div>

</div>
</template>

<script>
import MtIndicator from 'mint-ui/lib/indicator';
import Common from '@/common/common';
import Request from '@/static/js/request';

export default {
    components: {MtIndicator},
    data () {
        return {
            pageRender: false,
            topItemInfos: [],
            itemInfos: [],
            bannerInfos: [],
            appName: Common.config.appName
        };
    },
    prerenderAllowed () {
        return true
    },
    created () {
        MtIndicator.open();
        this.initData();
    },
    methods: {
        initData () {
            let self = this;
            Request({
                url: Common.api.homepage,
                data: {},
                successCallback: function (res) {
                    self.pageRender = true;
                    self.topItemInfos = res.topItemInfos;
                    self.itemInfos = res.itemInfos;
                    self.bannerInfos = res.bannerInfos;
                },
                errorCallback: function (error) {
                    console.log(error)
                },
                completeCallback: function() {
                    MtIndicator.close();
                }
            });
        },
        goProduct (itemId) {
            Common.navigate('product', {
                'itemId': itemId
            });
        },
        formatType(str) {
            return str.split('|').map( n=> '<span class="common-type-item">' + n + '</span>').join('');
        }
    }
}
</script>

<style lang="less" src="./mip-index.less" scoped></style>