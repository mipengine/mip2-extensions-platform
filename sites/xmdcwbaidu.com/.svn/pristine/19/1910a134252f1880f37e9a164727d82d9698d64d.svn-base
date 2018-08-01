<template>
  <transition :name="currentTransition">
    <div
      v-if="currentValue"
      :class="[position ? 'mint-popup-' + position : '']"
      class="mint-popup"
      style="z-index: 2001">
      <slot/>
    </div>
  </transition>
</template>

<script type="text/babel">

export default {
  name: 'MtPopup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },

    modalFade: {
      type: Boolean,
      default: false
    },

    lockScroll: {
      type: Boolean,
      default: false
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },

    popupTransition: {
      type: String,
      default: 'popup-slide'
    },

    position: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      currentValue: false,
      currentTransition: this.popupTransition
    }
  },

  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },

    value (val) {
      this.currentValue = val
      if (val && this.modal) {
        this.showModal()
      }
      if (val && this.closeOnClickModal) {
        this.clickModalClose()
      }
      if (!val) {
        this.close()
      }
    }
  },

  beforeMount () {
    if (this.popupTransition !== 'popup-fade') {
      this.currentTransition = `popup-slide-${this.position}`
    }
  },

  mounted () {
    if (this.value) {
      this.open()
    }
  },
  methods: {
    open () {
      this.currentValue = true
    },
    showModal () {
      const html = `<div class="v-modal" style="z-index: 2000;"></div>`
      document.body.insertAdjacentHTML('beforeend', html)
      document.querySelector('.v-modal').addEventListener('touchmove', function (e) {
        e.preventDefault()
      })
    },
    clickModalClose () {
      const self = this
      const modal = document.querySelector('.v-modal')
      modal.addEventListener('click', function (e) {
        self.currentValue = false
        e.preventDefault()
        modal.parentNode.removeChild(modal)
        self.$emit('set-popup-value')
      })
    },
    close () {
      // if (document.querySelector('.mint-popup')) document.querySelector('.mint-popup').parentNode.removeChild(document.querySelector('.mint-popup'))
      if (document.querySelector('.v-modal')) {
        document.querySelector('.v-modal').parentNode.removeChild(document.querySelector('.v-modal'))
      }
      return true
    }
  }
}
</script>
