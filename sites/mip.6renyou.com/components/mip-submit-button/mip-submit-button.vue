<style scoped>

</style>

<template>
  <div class="six-ft-bar six-ft-btn">
    <a
      :href="'./order/submit/' + dest + '/' + days + '?tripid=' + tripid"
      mip-link
      class="ft-btn-submit">咨询旅行顾问</a>
  </div>
</template>

<script>
export default {
  props: {
    'dest': {
      type: String,
      required: true
    },
    'days': {
      type: Number,
      required: true
    },
    'tripid': {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  methods: {

  }
}
</script>
