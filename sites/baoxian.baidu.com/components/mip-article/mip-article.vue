<template>
    <div class="insur-article du-wing-blank-lg" v-if="pageRender">

        <div class="article">
            <div class="article-bd">
                <div class="article-row" v-html="articleContent"></div>
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
        title: String
    },
    data () {
        return {
            pageRender: false,
            articleContent: null,
            articleTitle: ''
        }
    },

    created () {
        MtIndicator.open();
        this.initData();
    },

    methods: {
        initData () {

            let self = this;
            let id = Common.getParamValue('id');
            let itemId = Common.getParamValue('itemId');
            let type = Common.getParamValue('type');
            let url = Common.api.cms;
            if (itemId) {
                // 项目api
                url += '/project/' + itemId + '/' + type + '/' + id;
            } else {
                // 普通api
                url += '/static/api/' + id;
            }
            Request({
                url:  url + '.json',
                successCallback: function (res) {
                    self.pageRender = true;
                    self.articleContent = res.content;
                    self.articleTitle = res.title;
                    MIP.setData({title: res.title});
                },
                errorCallback: function (error) {
                    console.log(error)
                },
                completeCallback: function() {
                    MtIndicator.close();
                }
            });
        }
    }
}
</script>

<style lang="less" src="./mip-article.less" scoped></style>