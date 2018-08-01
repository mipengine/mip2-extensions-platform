<style scoped>

</style>

<template>
  <div class="index-form-content">
    <div class="index-order-wrap">
      <div class="index-form-box r8">
        <div class="index-form-list">
          <ul class="index-form-ul">
            <li class="index-forms-item">
              <span class="form-label">目的地</span>
              <div class="form-bd">
                <input
                  v-model="destName"
                  name=""
                  type="text"
                  class="ipt-text"
                  placeholder="请填写目的地">
              </div>
            </li>
            <li class="index-forms-item">
              <span class="form-label">出行天数</span>
              <div class="form-bd">
                <div class="fn-view">
                  <div class="fn-math">
                    <span
                      class="s1"
                      @click="remove"/>
                    <input
                      v-model="days"
                      name=""
                      class="s2 lc-number"
                      type="numeber">
                    <span
                      class="s3"
                      @click="add"/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="index-actions">

          <button
            class="index-btn"
            @click="jump">咨询旅行顾问</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toast from '../../common/toast'

let options = {
  position: 'top-center',
  duration: 2000
}

export default {
  props: {
    'currentDest': {
      type: String,
      default: ''
    },
    'host': {
      type: String,
      required: true
    }
  },
  data () {
    return {
      destName: '',
      days: 6
    }
  },
  mounted () {
    if (this.currentDest && this.currentDest !== null && this.currentDest !== '') {
      this.destName = this.currentDest
    }
  },
  methods: {
    remove () {
      if (this.days <= 3) return
      this.days--
    },
    add () {
      this.days++
    },
    jump () {
      if (this.days < 3) {
        toast.show('天数不能小于三天', options)
        return
      }
      if (this.destName === '') {
        toast.show('您还未填写目的地', options)
        return
      }
      MIP.viewer.open(this.host + '/order/submit/' + this.destName + '/' + this.days)
    }

  }
}
</script>
