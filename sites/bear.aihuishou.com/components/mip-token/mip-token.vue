
<script>
export default {
  props: {
    'mip-click-token': {
      type: String,
      default: '',
      require: true
    }
  },
  data: () => ({}),
  mounted () {
    const inquiryKey = this.getParamsString('key')
    const token = this['mip-click-token']
    window.location.replace(
      `https://neon.aihuishou.com/boot/xzh/trade/${inquiryKey}?miptoken=${token}`
    )
  },
  methods: {
    getParamsString: function (name) {
      const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      if (window.location.hash.split('?', 2).length <= 1) {
        return null
      }
      const r = window.location.hash.split('?', 2)[1].match(reg)
      if (r != null) return r[2]
      return null
    }
  }
}
</script>
