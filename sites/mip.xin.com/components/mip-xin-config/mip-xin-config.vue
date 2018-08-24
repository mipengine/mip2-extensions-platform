<template>
  <div>
    <a :href="options">
      <div
        class="car-set-bottom"
        @click="openParams">
        <span class="lookParams" >{{ params }}</span>
        <span class="paramsArrow"/>
      </div>
    </a>
  </div>
</template>

<script>
import { clickPoint } from '../../common/utils/stastic.js'
import { getCarId, getLocalStorage, getDomain } from '../../common/utils/utils.js'
const pid = '/pages/detail'
export default {
  props: {
    params: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    imUrl: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      carid: '',
      options: ''
    }
  },
  mounted () {
    let imUrl = getLocalStorage('locationUrl')
      ? encodeURIComponent(`&imUrl=${this.imUrl}`)
      : encodeURIComponent(`?imUrl=${this.imUrl}`)
    this.options = this.imUrl ? `${getDomain()}${this.url}${imUrl}` : `${getDomain()}${this.url}`
    this.carid = getCarId()
  },
  methods: {
    openParams () {
      clickPoint(
        'collocation_more',
        {
          carid: this.carid
        },
        null,
        {
          pid: pid
        }
      )
    }
  }
}
</script>
<style scoped>
.car-set-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid rgba(241, 241, 241, 1);
  padding-bottom: 0.37rem;
  padding-top: 0.37rem;
  border-bottom: 0.18rem solid rgba(241, 241, 241, 1);
}
.lookParams {
  font-size: 0.26rem;
  text-align: center;
  margin-left: 0.04rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
}

.paramsArrow {
  width: 0.14rem;
  height: 0.14rem;
  transform: rotate(-315deg);
  border: solid #dbdada;
  border-width: 2px 2px 0 0;
}
</style>
