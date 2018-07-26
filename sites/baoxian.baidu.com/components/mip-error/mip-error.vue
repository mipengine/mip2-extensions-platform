<template>
    <div class="insur-error du-wing-blank-lg">
        <div class="error">
            <div class="error-bd du-white-space-md">
                <div class="iconimg icon-network du-white-space-md"></div>
                <div class="error-title du-white-space-sm">{{ title }}</div>
                <div class="error-desc">{{ desc }}</div>
            </div>
            <div class="error-act">
                <a class="error-button du-button du-button-default" @click="handleReload" href="javascript:void(0)">{{ button }}</a>
            </div>
        </div>
    </div>
</template>

<script>
import Common from '@/common/common';
export default {

    data () {
        return {
            title: '',
            desc: '',
            button: ''
        }
    },

    created () {
        this.initData();
    },

    methods: {

        initData () {
            let self = this;
            let type = Common.getParamValue('type');
            if (type === 'sys') {
                self.title = Common.config.systemError;
                self.desc = '';
                self.button = '重新加载';
            } else {
                self.title = Common.config.networkError;
                self.desc = Common.config.networkError2;
                self.button = '重新加载';
            }
        },

        handleReload() {
            // 获取跳转的url
            let url = Common.getParamValue('url');
            if (url === null) {
                url = Common.router.index
            }
            Common.replace(url);
        }
    }
}
</script>

<style lang="less" src="./mip-error.less" scoped></style>
