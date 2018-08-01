<template>
  <a
    class="mint-cell">
    <span
      v-if="isLink"
      class="mint-cell-mask"/>
    <div class="mint-cell-left">
      <slot name="left"/>
    </div>
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
        <slot name="icon">
          <i
            v-if="icon"
            :class="'mintui-' + icon"
            class="mintui"/>
        </slot>
        <slot name="title">
          <span
            class="mint-cell-text"
            v-text="title"/>
          <span
            v-if="label"
            class="mint-cell-label"
            v-text="label"/>
        </slot>
      </div>
      <div
        :class="{ 'is-link' : isLink }"
        class="mint-cell-value">
        <slot>
          <span v-text="value"/>
        </slot>
      </div>
      <i
        v-if="isLink"
        class="mint-cell-allow-right"/>
    </div>
    <div class="mint-cell-right">
      <slot name="right"/>
    </div>
  </a>
</template>

<script>
/**
 * mt-cell
 * @module components/cell
 * @desc 单元格
 * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .mintui-xxx）
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 *
 * @example
 * <mt-cell title="标题文字" icon="back" is-link value="描述文字"></mt-cell>
 * <mt-cell title="标题文字" icon="back">
 *   <div slot="value">描述文字啊哈</div>
 * </mt-cell>
 */
export default {
  name: 'MtCell',

  props: {
    to: {
      type: [String, Object],
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    isLink: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    // href () {
    //   if (this.to && !this.added && this.$router) {
    //     const resolved = this.$router.match(this.to)
    //     if (!resolved.matched.length) return this.to
    //
    //     this.$nextTick(() => {
    //       this.added = true
    //       this.$el.addEventListener('click', this.handleClick)
    //     })
    //     return resolved.fullPath || resolved.path
    //   }
    //   return this.to
    // }
  },

  methods: {
    handleClick ($event) {
      $event.preventDefault()
      this.$router.push(this.href)
    }
  }
}
</script>
