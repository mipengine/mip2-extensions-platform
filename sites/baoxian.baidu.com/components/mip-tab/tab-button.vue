<template>
    <div
        @click="tab"
        class="tab"
        :class="tabname == $parent.current? 'active' : ''"
        :style="{width: tabwidth, maxWidth: tabMaxWidth}"
    >
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "c-tab-button",
    props: {
        tabwidth: String,
        tabMaxWidth: String,
        tabname: String,
        tabdata: String,
        labelTop: String,
        labelBottom: String,
        index: Number,
        pane: Object
    },
    mounted() {
        this.$parent.updateTab(this);
    },
    methods: {
        tab () {
            // 重复点击判断
            // if (this.tabname === this.$parent.current) {
            //     return;
            // }
            this.$parent.changeCurrent(this.tabname, this);
        }
    }
}
</script>
