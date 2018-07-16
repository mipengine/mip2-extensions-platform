<template>
    <div class="s4s-page">
        <div class="s4s-select-car">
          <a data-type="mip" ref="carInfo" href="carInfo.html"></a>
             <a data-type="mip" ref="violation" href="violation.html"></a>
          <div  v-if="!!list.length">
            <div class="list" v-for="(car, index) in list" :key="car.Id">
                <div class="bd">
                   <mip-img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree_empty.png" v-show="isSelected != index" width="25" height="25" @click="selected(index)" ></mip-img>
                    <mip-img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree.png" v-show="isSelected == index" width="25" height="25" @click="selected(index)" ></mip-img>
                    <div class="bd-fl">
                        <span class="car-no"  @click="selected(index)" >{{ car.CarNo }}</span>
                        <span @click="editCar(car)" class="car-info-edit orange"  >编辑</span>
                        <span @click="delCar(car)" class="car-info-edit blue"  >删除</span>
                    </div>
                     <!-- <mip-img class="s4s-option-out" @click="selected(car, index)" :src="isSelected == index ? 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree.png' : './https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree_empty.png'" ></mip-img> -->
                </div>
            </div>
          </div>
           
            <div class="s4s-car-add" @click="gotoCar">
                <mip-img width="50" height="50" src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/add.png" ></mip-img>
                <p>点击添加爱车</p>
            </div>
            <div v-if="list.length > 0" class="s4s-set-default" @click="setDefault"> 查询选中车辆违章 </div>
        </div>
        <div class="s4s-confirm" v-if="showConfirm">
            <div class="s4s-confirm-body">
                <!-- <div class="s4s-confirm-title">提示</div> -->
                <div class="s4s-confirm-content">确认删除此车辆？</div>
                <div class="s4s-confirm-btn">
                    <span @click="cancelBtn">取消</span>
                    <span @click="confirmBtn" style="color: #108EE9;">确认</span>
                </div>
            </div>
            <div class="s4s-mask"></div>
        </div>
    </div>
</template>

<script>
import util from "../../common/util";

export default {
  data() {
    return {
      list: [],
      isSelected: 0,
      showConfirm: false,
      car: {},
      delCarNo:'',
    };
  },
  mounted() {
    this.user = {
      Tel: window.localStorage.UserTel || window.UserTel || ""
    };
    // if (!this.user.Tel) {

    // }
    this.getCar();
  },
  methods: {
    selected(index) {
      this.isSelected = index;
    },
    // 删除爱车
    delCar(car) {
      let self = this;
      this.showConfirm = true;
      this.delCarNo = car.CarNo
    },
    // 添加车辆
    gotoCar() {
      // MIP.viewer.open("carInfo.html");
      MIP.setData({
        '#changeCarData':{
          "car_id":'',
          "provice": '',
          "car_no": '',
          "vin": '',
          "engine":'',
        }
      })
      this.$refs.carInfo.click()
    },
    // 设为默认
    setDefault() {
      let car = this.list[this.isSelected];
      MIP.setData({
        '#globalData':{
          "provice": car.CarNo.substring(0,1),
          "car_no": car.CarNo.substring(1,7),
          "vin": car.ClassNo,
          "engine": car.EngineNo,
        }
      })
      // MIP.viewer.open("violation.html");
      this.$refs.violation.click()
    },
    cancelBtn(){
      this.showConfirm = false;
    },
    // 删除车辆
    confirmBtn() {
      let param = {
        carno: this.delCarNo
      };
      let self = this;
      util.fetchData("v2/car/vio_del", param).then(res => {
        if (res.code == 0) {
          this.showConfirm = false;
          util.toast("删除成功");
          self.getCar();
        }
      });
    },
    editCar(car){
      console.log(car)
      MIP.setData({
        '#changeCarData':{
          "car_id":car.Id+'',
          "provice": car.CarNo.substring(0,1),
          "car_no": car.CarNo.substring(1,7),
          "vin": car.ClassNo,
          "engine": car.EngineNo,
        }
      })
      // MIP.viewer.open("carInfo.html");
      this.$refs.carInfo.click();
    },
    // 获取车辆
    getCar() {
      let self = this;
      util
        .fetchData("v2/car/user_car_list")
        .then(res => {
          if (res.code == 0) {
            self.list = res.data?res.data:[];
          }else{
            util.toast(res.msg)
          }
        })
        .catch(e => {
          console.log(e);
          throw new Error(e);
        });
    }
  }
};
</script>

<style scoped>
.list {
  background: #fff;
  -webkit-box-shadow: 0 0.01rem 0.03rem 0 #d3dce6;
  box-shadow: 0 0.01rem 0.03rem 0 #d3dce6;
  border-radius: 0.04rem;
}

.bd {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: 19px 15px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
}

.bd-fl {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  overflow: hidden;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin-left: 15px;
}

.car-info-edit {
  padding: 4px 10px;
}
.car-info-edit.orange {
  border: 1px solid #FF7B00;
  margin-right: 15px;
  color:#FF7B00;
}
.car-info-edit.blue {
  border: 1px solid #4F7EFF;
    color:#4F7EFF;
}
.car-no {
  font-size:15px;
  font-weight: 500;
  flex: 1;
  color: #1f2d3d;
}

.s4s-set-default {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  background-image: linear-gradient(40deg, #FF7C00 0%, #FE5A00 100%);
  color: #fff;
}

.s4s-car-add {
  background: #fff;
  border-radius: 4px;
  padding: 20px 0;
  margin-top: 15px;
  text-align: center;
}

.s4s-car-add p {
  color: #666666;
  font-size: 14px;
  padding-top:15px;
}
.s4s-select-car {
  padding-bottom: 0.6rem;
}

.s4s-confirm-body {
  width: 76%;
  position: fixed;
  left: 50%;
  top: 50%;
  background: #fff;
  border-radius:4px;
  z-index: 9999;
  margin-left: -38%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.s4s-confirm-title {
  text-align: center;
  padding-top: 20px;
}
.s4s-confirm-content {
  font-size: 16px;
  color: #888;
  text-align: center;
  padding: 25px;
}
.s4s-confirm-btn {
  height: 45px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  border-top: 1px rgba(0, 0, 0, 0.1) solid;
  font-size: 15px;
}
.s4s-confirm-btn span {
  line-height: 45px;
  border-right: 1px rgba(0, 0, 0, 0.1) solid;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-pack: center;
  justify-content: center;
}
.s4s-confirm-btn span:last-child {
  border-right: 0;
}
.s4s-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}
</style>
