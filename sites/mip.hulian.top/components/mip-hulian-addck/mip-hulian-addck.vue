<script>
export default {
  mounted () {
  let vm = this
    this.$on('addck', function (event, params) {
      vm.addck(params)
    })
  },
  methods: {
    addck(params) {
      let parameobj = JSON.parse(params);
      document.cookie = parameobj.type+'ck='+ params;
    }
  }
}
</script>
