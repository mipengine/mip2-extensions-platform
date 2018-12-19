<template>
  <div class="s4s-page">
    <div class="s4s-select-car">
      <a
        ref="carInfo"
        data-type="mip"
        href="carInfo.html"/>
      <a
        ref="violation"
        data-type="mip"
        href="violation.html"/>
      <div class="list-container">
        <div v-if="!!list.length">
          <div
            v-for="(car, index) in list"
            :key="car.Id"
            class="list">
            <div class="bd">
              <mip-img
                v-show="isSelected != index"
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree_empty.png"
                width="22"
                height="22"
                @click="selected(index)" />
              <mip-img
                v-show="isSelected == index"
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree.png"
                width="22"
                height="22"
                @click="selected(index)" />
              <div class="bd-fl">
                <span
                  class="car-no"
                  @click="selected(index)" >{{ car.CarNo }}</span>
                <span
                  class="car-info-edit orange"
                  @click="editCar(car)" >编辑</span>
                <span
                  class="car-info-edit blue"
                  @click="delCar(car)" >删除</span>
              </div>
            <!-- <mip-img class="s4s-option-out" @click="selected(car, index)" :src="isSelected == index ? 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree.png' : './https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree_empty.png'" ></mip-img> -->
            </div>
          </div>
        </div>
      </div>

      <div
        class="s4s-car-add"
        @click="gotoCar">
        <mip-img
          width="50"
          height="50"
          src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/add.png" />
        <p>点击添加爱车</p>
      </div>
      <mip-fixed type="bottom">
        <div
          v-if="list.length > 0"
          class="s4s-set-default"
          @click="setDefault"> 查询选中车辆违章 </div>
      </mip-fixed>
      <mip-fixed type="top">
        <div
          v-if="showConfirm"
          class="s4s-confirm">
          <div class="s4s-confirm-body">
            <!-- <div class="s4s-confirm-title">提示</div> -->
            <div class="s4s-confirm-content">确认删除此车辆？</div>
            <div class="s4s-confirm-btn">
              <span @click="cancelBtn">取消</span>
              <span
                style="color: #108EE9;"
                @click="confirmBtn">确认</span>
            </div>
          </div>
          <div class="s4s-mask"/>
        </div>
      </mip-fixed>
    </div>

  </div>
</template>

<script>
import util from '../../common/util'

export default {
  data () {
    return {
      list: [],
      isSelected: 0,
      showConfirm: false,
      car: {},
      delCarNo: ''
    }
  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    this.getCar()
  },
  methods: {
    selected (index) {
      this.isSelected = index
    },
    // 删除爱车
    delCar (car) {
      // let self = this
      this.showConfirm = true
      this.delCarNo = car.CarNo
    },
    // 添加车辆
    gotoCar () {
      // MIP.viewer.open("carInfo.html");
      MIP.setData({
        '#changeCarData': {
          car_id: '',
          provice: '',
          car_no: '',
          vin: '',
          engine: ''
        }
      })
      this.$refs.carInfo.click()
    },
    // 设为默认
    setDefault () {
      let car = this.list[this.isSelected]
      MIP.setData({
        '#globalData': {
          provice: car.CarNo.substring(0, 1),
          car_no: car.CarNo.substring(1, 7),
          vin: car.ClassNo,
          engine: car.EngineNo
        }
      })
      // MIP.viewer.open("violation.html");
      this.$refs.violation.click()
    },
    cancelBtn () {
      this.showConfirm = false
    },
    // 删除车辆
    confirmBtn () {
      let param = {
        car_no: this.delCarNo
      }
      let self = this
      util.fetchData('v3/violation/car/del', param).then(res => {
        if (res.code === 0) {
          this.showConfirm = false
          util.toast('删除成功')
          self.getCar()
        }
      })
    },
    editCar (car) {
      MIP.setData({
        '#changeCarData': {
          car_id: car.Id + '',
          provice: car.CarNo.substring(0, 1),
          car_no: car.CarNo.substring(1, 7),
          vin: car.ClassNo,
          engine: car.EngineNo
        }
      })
      // MIP.viewer.open("carInfo.html");
      this.$refs.carInfo.click()
    },
    // 获取车辆
    getCar () {
      let self = this
      util
        .fetchData('v3/violation/car/list')
        .then(res => {
          if (res.code === 40000) {
          } else if (res.code === 0) {
            self.list = res.data ? res.data : []
            // 本地存储一波 保持本地localstorage为最新的
            try {
              let newLocalCarList = []
              self.list.forEach(car => {
                newLocalCarList.push({
                  carNo: car.CarNo,
                  engine: car.EngineNo,
                  vin: car.ClassNo,
                  car_type: car.CarType || ''
                })
              })
              window.localStorage.setItem(
                'localCarList',
                JSON.stringify(newLocalCarList)
              )
            } catch (error) {
              console.log(error)
              // util.toast('由于您处在无痕模式，不能存储您的爱车的记录')
            }
          } else {
            util.toast(res.msg)
          }
        })
        .catch(e => {
          throw new Error(e)
        })
    }
  }
}
</script>

<style scoped>
.list-container {
  background: #fff;
}
.list {
  background: #fff;
  /* border-radius: 0.04rem; */
  border-bottom: 0.01rem solid #eaeaea;
  margin: 0 0.15rem;
}
.list:last-child {
  border-bottom: none;
}

.bd {
  display: flex;
  padding: 0.18rem 0;
  align-items: center;
  overflow: hidden;
}

.bd-fl {
  display: flex;
  align-items: center;
  overflow: hidden;
  flex: 1;
  margin-left: 0.15rem;
}

.car-info-edit {
  padding: 0.04rem 0.1rem;
  border-radius: 0.01rem;
  font-size: 0.12rem;
}
.car-info-edit.orange {
  border: 0.01rem solid #ff7b00;
  margin-right: 0.1rem;
  color: #ff7b00;
}
.car-info-edit.blue {
  border: 0.01rem solid #4f7eff;
  color: #4f7eff;
}
.car-no {
  font-size: 0.15rem;
  font-weight: 500;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  color: #1f2d3d;
  font-weight: bold;
}

.s4s-set-default {
  width: 100%;
  height: 0.5rem;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.18rem;
  background-image: linear-gradient(40deg, #ff7c00 0%, #fe5a00 100%);
  color: #fff;
}

.s4s-car-add {
  background: #fff;
  border-radius: 0.04rem;
  padding: 0.2rem 0;
  margin-top: 0.15rem;
  text-align: center;
}

.s4s-car-add p {
  color: #666666;
  font-size: 0.14rem;
  padding-top: 0.1rem;
}
.s4s-select-car {
  padding-bottom: 0.6rem;
}
.s4s-confirm {
  height: 100vh;
}

.s4s-confirm-body {
  width: 76%;
  position: absolute;
  left: 50%;
  top: 50%;
  background: #fff;
  border-radius: 0.04rem;
  z-index: 9999;
  margin-left: -38%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.s4s-confirm-title {
  text-align: center;
  padding-top: 0.2rem;
}
.s4s-confirm-content {
  font-size: 0.16rem;
  color: #888;
  text-align: center;
  padding: 0.25rem;
}
.s4s-confirm-btn {
  height: 0.45rem;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  -webkit-box-align: center;
  border-top: 0.01rem rgba(0, 0, 0, 0.1) solid;
  font-size: 0.15rem;
}
.s4s-confirm-btn span {
  line-height: 0.45rem;
  border-right: 0.01rem rgba(0, 0, 0, 0.1) solid;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -moz-box-pack: center;
  -moz-box-pack: center;
  -webkit-box-pack: center;
}
.s4s-confirm-btn span:last-child {
  border-right: 0;
}
.s4s-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}
</style>
