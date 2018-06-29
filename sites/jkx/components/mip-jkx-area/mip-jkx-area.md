# `mip-jkx-area`

## 说明

极客修省市区列表

## 示例

<div class="Mask" v-show="areadata.show" ref="mask">
      <div class="over">
          <div class="cancel" @click="close" ></div>
          <div class="select" @touchmove.stop>
            <div class="btn">
              <span>请选择地区</span>
              <a @click="close">取消</a>
            </div>
            <div class="area1">
              <div class="province">
                <ul>
                  <li v-for="(item,index) in proList" class="pro" @touchmove.stop @click.stop="choosepro(item)" :class="{on:area.proId==item.id}" :key="index">省列表</li>
                </ul>
              </div>
              <div class="city">
                <div>
                  <div v-for="(item,index) in cityList" class="city_a" @touchmove.stop @click.stop="chooseCity(item)" :class="{cityOn:cityId==item.id}" :key="index">市列表
                    <ul class="district" v-if="area.cityId==item.id">
                      <li v-for="(item,index) in  districtList" class="city_b" @click.stop="choosedis(item)" :class="{disOn:area.disId==item.id}"  :key="index">区列表</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

## 属性

属性说明
