<template>
    <div class="panel" v-show="isShow">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "c-tab-panel",
    props: {
        tabname: String,
        tabdata: String
    },
    data () {
        return {
        }
    },
    mounted () {
        this.$parent.addPanes(this);
    },
    computed: {
        isShow () {
            return this.$parent.current == this.tabname;
        }
    },
    methods: {
    }
}
</script>
