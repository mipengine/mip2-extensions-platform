<template>
  <div />
</template>

<script>

export default {

  props: {
    siteId: {
      type: [String, Number],
      required: true
    }
  },

  // 提前渲染
  prerenderAllowed () {
    return true
  },

  mounted () {
    let id = this.siteId
    if (id) {
      // 获取第三方页面内的结构化数据，可能存在多个
      let els = document.querySelectorAll('script[type="application/ld+json"]')
      let config = {}

      // 页面上
      for (let el of els) {
        let jsonStr = el.textContent
        try {
          config = JSON.parse(jsonStr)
        } catch (e) {}
        // 如果存在一项具有appid（代表是熊掌号数据），就结束
        if (config.appid) {
          break
        }
      }

      // 从head部分获取页面描述
      let description
      let metaDesEl = document.querySelector('meta[name=description]')

      metaDesEl && (description = metaDesEl.getAttribute('content'))

      // 向SF发送事件通知
      window.MIP.viewer.sendMessage(
        'cambrian-header',
        {
          id: id,
          title: config.title || document.title,
          images: config.images,
          description: config.description || description
        }
      )
    }
  }
}
</script>
