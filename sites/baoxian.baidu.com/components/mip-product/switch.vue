<template>
    <label class="mint-switch">
        <input
            class="mint-switch-input"
            :disabled="disabled"
            @change="$emit('change', currentValue)"
            type="checkbox"
            v-model="currentValue"
        >
        <span class="mint-switch-core"></span>
        <!-- <div class="mint-switch-label">
            {{label}}
        </div> -->
  </label>
</template>

<script>
import _ from 'lodash';
/**
 * mt-switch
 * @module components/switch
 * @desc 切换按钮
 * @param {boolean} [value] - 绑定值，支持双向绑定
 * @param {slot} - 显示内容
 *
 * @example
 * <mt-switch v-model="value"></mt-switch>
 */
export default {
    name: 'mt-switch',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        options: Array,
        disabled: {
           type: Boolean,
            default: false
        }
    },
    data() {
      return {
          label: this.value ?
              _.find(this.options, (o) => o.value === true).text :
              _.find(this.options, (o) => o.value === false).text
      }
    },
    computed: {
        currentValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
                this.label = value ?
                    _.find(this.options, (o) => o.value === true).text :
                    _.find(this.options, (o) => o.value === false).text;
            }
        }
    }
};
</script>

<style lang="less" src="./switch.less"></style>
