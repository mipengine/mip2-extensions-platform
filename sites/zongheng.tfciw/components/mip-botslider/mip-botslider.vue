<template>
  <mip-fixed
    type="bottom">
    <mip-botslider-inner :datalistprops="datalistprops"/>
  </mip-fixed>
</template>
<script>
import mipBotsliderInner from './mip-botslider-inner'
export default {
  components: {
    mipBotsliderInner
  },
  props: {
    datalistprops: {
      type: Array,
      default () {
        return [
          {
            'icon': 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bcf219beb2096b63951456026d5aec21/6d81800a19d8bc3e0781d85b8e8ba61ea9d34592.jpg',
            'name': '斗破苍穹',
            'content': '下载更多精彩小说',
            'iosHref': '#ios',
            'androidHref': '#android'
          },
          {
            'icon': 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bcf219beb2096b63951456026d5aec21/6d81800a19d8bc3e0781d85b8e8ba61ea9d34592.jpg',
            'name': '剑来',
            'content': '下载更多精彩小说',
            'iosHref': '#ios',
            'androidHref': '#android'
          },
          {
            'icon': 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bcf219beb2096b63951456026d5aec21/6d81800a19d8bc3e0781d85b8e8ba61ea9d34592.jpg',
            'name': '神墓',
            'content': '下载更多精彩小说',
            'iosHref': '#ios',
            'androidHref': '#android'
          },
          {
            'icon': 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bcf219beb2096b63951456026d5aec21/6d81800a19d8bc3e0781d85b8e8ba61ea9d34592.jpg',
            'name': '雪中悍刀行',
            'content': '下载更多精彩小说',
            'iosHref': '#ios',
            'androidHref': '#android'
          }
        ]
      }
    }
  },
  prerenderAllowed () {
    return true
  }
}
</script>
