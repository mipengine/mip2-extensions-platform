<template>
  <div
    class="mip-cy-analytics"
    @click="clickHandler">
    <slot/>
  </div>
</template>

<style scoped>
.mip-cy-analytics{
  margin: 0;
}
</style>

<script>
const url = 'https://m.chunyuyisheng.com/stat/h5/event_analyse/data_upload/'
export default {
  props: {
    type: {
      type: String,
      default: 'load'
    },
    key: {
      type: String || Array,
      default: () => {
        return []
      }
    },
    segmentation: {
      type: Object || Array,
      default: () => {
        return {}
      }
    },
    href: {
      type: String,
      default: ''
    }
  },
  mounted () {
    const that = this
    const type = that.type
    if (type === 'load') {
      that.send()
    }
  },
  methods: {
    clickHandler () {
      const that = this
      const href = that.href
      const type = that.type
      if (type === 'click') {
        that.send()
        if (href) {
          window.location.href = href
          window.parent.location.href = href // 在iframe里面
        }
      }
    },
    send () {
      const that = this
      const events = []
      let key = that.key
      let segmentation = that.segmentation
      const kType = Object.prototype.toString.call(key)
      const sType = Object.prototype.toString.call(segmentation)
      if (kType === '[object String]' ||
        (kType === '[object Array]' && kType.length)) {
        if (kType === '[object String]') key = [key]
        if (sType === '[object Object]') segmentation = [segmentation]
        const len = key.length
        for (let i = 0; i < len; i++) {
          events.push({
            key: key[i],
            segmentation: segmentation[i] || {}
          })
        }

        fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          body: `events=${JSON.stringify(events)}`
        })
      }
    }
  }
}
</script>
