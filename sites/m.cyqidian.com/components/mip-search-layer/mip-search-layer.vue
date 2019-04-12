<template>
  <div>
    <header class="cymip-header sidebar-header">
      <span
        class="cymip-hd-goback"
        @click="$emit('close')"
      />
      <div class="cymip-search">
        <mip-form
          url="/"
          method="get"
          class="search-form"
        >
          <input
            type="text"
            class="search-input"
            name="key"
            value
            placeholder="输入您想要找的项目"
          >
          <input
            type="button"
            class="search-button"
            name
            value="搜索"
          >
        </mip-form>
      </div>
    </header>
    <section class="sidebar-body">
      <div class="hot-keyword">
        <h3 class="hotkey-title">热门搜索</h3>
        <div class="hotkey-list">
          <a
            v-for="(item,i) in items"
            :href="item.action"
            :title="item.name"
            :key="i"
            class=""
            data-type="mip"
          >{{ item.name }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  }
}
</script>
