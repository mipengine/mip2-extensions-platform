<template>
  <div>
    <div class="bdline">
      <span class="car-file">为您推荐相似车辆</span>
    </div>
  </div>
</template>
<script>
import { requestFun } from '../../common/utils/reqUtils'
export default {
  data () {
    return {}
  },
  mounted () {
    let param = {
      carid: '45358654'
    }
    requestFun('/ajax/car/get_similar_carlist', {
      method: 'POST',
      param: param
    })
      .then(res => {

      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style scoped>
.bdline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.01rem solid #f1f1f1;
  border-left: 0.04rem solid rgb(248, 93, 0);
}
.car-file {
  font-size: 0.34rem;
  height: 1.1rem;
  line-height: 1.1rem;
  color: #333333;
  font-weight: bold;
  margin-left: 0.36rem;
}
</style>
