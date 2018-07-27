<template>
    <div class="c-tab-wrapper" :class="theme">
        <div class="tab-nav" v-if="panes.length !== 1">
            <div class="nav" ref="nav">
                <div
                    class="tabs"
                    ref="tabs"
                    :style="{maxWidth: tabsMaxWidth}"
                >
                    <tab-button
                        v-for="pane in panes"
                        :tabname="pane.tabname"
                        :tabdata="pane.tabdata"
                        :props="pane"
                        :index="index"
                        :tabwidth="tabwidth"
                        :tabMaxWidth="tabMaxWidth"
                        >
                            <a v-if="theme == 'modern'">
                                <div class="top common-text-truncate">
                                    <span class="number">{{pane.$attrs.labelTop}}</span>
                                    <span>元起</span>
                                </div>
                                <div class="bottom common-text-truncate">
                                    {{pane.$attrs.labelBottom}}
                                </div>
                            </a>
                            <a v-else class="common-text-truncate">
                                {{pane.$attrs.label}}
                            </a>
                    </tab-button>
                </div>
            </div>
        </div>
        <div class="c-tab-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';
import TabButton from './tab-button.vue';

export default {
    name: 'c-tab',
    componentName: 'c-tab',
    components: {TabButton},
    props: {
        theme: {
            type: String,
            default: 'modern'
        },
        currentName: String
    },
    data () {
        return {
            panes: [],
            initialOffset: ''
        }
    },
    computed: {
        current () {
            return this.currentName;
        },
        tabsMaxWidth() {
            let size = this.panes.length;
            return size <= 3 ? '100%' : 'initial';
        },
        tabwidth() {
            let size = this.panes.length;
            return size <= 3 ? (100 / size) + '%': '';
        },
        tabMaxWidth() {
            let size = this.panes.length;
            return size <= 3 ? 'initial' : '2.1rem';
        }
    },
    methods: {
        changeCurrent (current, tab) {
            this.scrollToView(tab.$el);
            this.$emit('tabchange', tab);
        },
        addPanes(pane) {
            this.panes.push(pane);
        },
        updateTab(tab) {
            this.initialOffset = this.$refs.tabs.querySelector('.tab').offsetLeft;
        },
        // 如果tab没有完全显示，则滚动到可视区域
        scrollToView(tab, speed = 'normal') {
            let winWidth = $(window).width();
            let tabWidth = $(tab).outerWidth();
            let offsetLeft = $(tab).offset().left;
            let nav = $(this.$refs.nav);
            if ((offsetLeft < this.initialOffset) || (offsetLeft > winWidth - tabWidth)) {
                nav.animate({
                    'scrollLeft': nav.scrollLeft() + offsetLeft - this.initialOffset
                }, speed);
            }
        }
    }
}
</script>
