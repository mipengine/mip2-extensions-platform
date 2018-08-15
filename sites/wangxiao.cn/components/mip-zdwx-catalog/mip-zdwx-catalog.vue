<template>
  <div class="header">
    <ul>
      <!-- 一级标题  firstTitle点击事件-->
      <li
        v-for="(item,index) in headerData"
        :key="index"
        class="catalog-title"
        @click.stop="firstTitle(index)">
        <div class="catalog-title-conetent">
          <span
            :class="{'catalog-item-icon-active':firstCurrentIndex==index}"
            class="catalog-item-icon"/>
          <span class="catalog-item-title">{{ item.className }}</span>
        </div>
        <span
          v-show="firstCurrentIndex==index&&lineTag"
          class="line"/>
        <!-- 二级标题  doThis点击事件-->
        <ul
          v-show="firstCurrentIndex==index">
          <!-- 循环二级菜单数据并使用.stop阻止冒泡 -->
          <li
            v-for="(item2,index2) in item.product"
            :key="index2"
            @click.stop="doThis(index2)">
            <div
              class="item-title-conetent"
              style="margin-top:0.5rem;">
              <span
                :class="{'item-item-icon-active':firstCurrentIndex==index&&index2==secondCurrentIndex}"
                class="item-item-icon"/>
              <span class="item-item-title">{{ item2.productName }}</span>
            </div>
            <ul v-show="firstCurrentIndex==index&&index2==secondCurrentIndex">
              <li
                v-for="(item3,index3) in item2.courseList"
                :key="index3">
                <span class="line"/>
                <div class="list-title-content">
                  <div>
                    <span style="display:inline-block;width: .8rem;height: .8rem;border-radius: 100%;margin-left: .8rem;background: #ff6a4a;"/>
                    <span class="list-item-title">{{ item3.courseName }}</span>
                  </div>
                  <p
                    v-show="item3.isShowBtn"
                    class="right-btn"
                    @click.stop="goStudy(item3)">{{ item3.btnText }}</p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import base from '../../common/base.js'
export default {
  data () {
    return {
      headerData: [],
      firstCurrentIndex: 0,
      secondCurrentIndex: 0,
      lineTag: true
    }
  },
  mounted () {
    let _this = this
    fetch(base.api.getGoodsCatalog, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: base.getQueryString('id'),
        token: base.getToken()
      })
    })
      .then(function (response) {
        // 获得后台实际返回的内容
        response.json().then(function (data) {
          if (data.data) {
            _this.headerData = data.data
          }
        })
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err)
      })
    this.$element.customElement.addEventAction('login', event => {
      fetch(base.api.getGoodsCatalog, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: base.getQueryString('id'),
          token: event.sessionId
        })
      })
        .then(function (response) {
          // 获得后台实际返回的内容
          response.json().then(function (data) {
            if (data.data) {
              _this.headerData = data.data
            }
          })
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    })
  },
  methods: {
    firstTitle (index) {
      this.firstCurrentIndex = index
      this.secondCurrentIndex = 0
      if (index === 0) {
        this.lineTag = true
      } else {
        this.lineTag = false
      }
    },
    doThis (index) {
      this.secondCurrentIndex = index
      if (index === 0) {
        this.lineTag = true
      } else {
        this.lineTag = false
      }
    },
    goStudy (item) {
      MIP.viewer.open(item.btnUrl, {isMipLink: false})
    }
  }
}
</script>
<style lang='less' scoped>
.catalog-title-conetent{
  color:#333;
}
.item-title-conetent{
  color:#233333;
}
.list-item-title{
  color:#666;
}
.catalog-title-conetent,.item-title-conetent{
  display: flex;
  align-items: center;
  margin-bottom: .5rem;
  .catalog-item-title {
    font-size: 1.6rem;
    padding-left: 1rem;
  }
  .item-item-title {
    font-size: 1.4rem;
    padding-left: 1rem;
  }
}
.catalog-item-icon {
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: 50%;
  display: inline-block;
  width: 2.2rem;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACg0lEQVRYw92Zv2sTYRjHP+9LB8WpHcVBBIsg3dxKyZrhhPwBGghYhJNS6qSDk4MOYgjCQbAQ0AyOHW7ImqFbtiJIA07O7WKwQ8g5vE9+NLlLL/E931w/kCkv7314ee597/m+in8g8r11oCC/LWAT2ABuyZAecAacAidAG2irIDxf9plqCUkNlIAKUATWFpyiD7SABnCkgnCQiXDkewp4ArwB7i+7QlN0gbdAUwVhZE048r2HQB3YtiQ6zTHwXAXh96sG6hSyz4BOhrLI3B151lwSV1hKoArsZygaRw04SCqRWGGR/YKpWRc0gXKcdFJJVB3KIs+uxv0xs8JSR58dyk6yq4LwMFFYdoMOcMO1qXABPJrcPUYlIXVbXyFZxKUubpeFMXWT5da1LNtMvE8KRsftD2ydYLfvgtbw66ct6S7wQAXhYLjCJWuyAC/fw+uatenErQTjkqjYnD0jKgBaPhGLrm1SUIx8b11jvmUX/UR0wRpQGArnhYLGdAp5YUtj2pq8sKkxPVhe2FCR76VqTUbcuWdvj323v/DhsvjuMBjAn978MTelab5q3GCh/hMAFfneb8ZtuR0+fDPSLx5bnRboaUxukBfONCbkyAunGpPI5IUTjYmP8kJ7KNx3bZKCPtDWEsy1XNukoKWC8Hz4PdxwbZOCBowPjiNMG2Kn6/j4yrRI9uiK47jNj3zvKSbtWUXKKgi/wuWuuYlJEVeNY3ED8hykAMgfe64tJ9ibzoxn3gzJsqz26EtSm87VYoWFAybqxgFNcZghVlhy2TJuVrpGQjYMKe44JH79RPYv4gWmZg/nDbp+lzIw2j12MGXStSjalTl30sjCdb5YTJD/71e3fwEu58VW/eDSNQAAAABJRU5ErkJggg==");
  height: 2.2rem;
}
.catalog-item-icon-active {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACTElEQVRYw92ZP0sjQRiHnxksDqzOwuoq4UQ47OxE0l6RIh/gEAJ3CAERyyusUliGICwEhYDkA1hskTaFXTo5OAxcZWWhzQkWwbWYd5M12Y2buOvs+ECqnew8DO/On98o3kBQK38GSvLbBNaBFWBZmjwAd8A1cAX0gJ7y/PtF+1QLSGqgAlSB78DSnK8YAl2gDVwoz3/KRTiolRXwAzgCvi46QhMMgDrQUZ4fZCYc1MrfgBawnZHoJJfAnvL8P6811ClkfwL9HGWRd/elr5kkjrCUQAM4yFE0jiZwmFQiscIie46pWRt0gN046aSSaFiURfpuxD2YGmGpo1OLslF+Kc8/SxSW2aAPfLJtKjwCW9HZY1QSUretAskiLi1xeymMqZs8p65F2SbyPSkYLbd/yW4Fy5oBsKE8/ykc4UqBZRG3CoxLomrbKAVVACVbxFvm33W9N0NgVWP2skWXRRxLobArlDTmpOAKmxpzrHGFdY05g7nCyhLjA2M6vqzB72Y23R8fwM2/ef6x/OqJo2iooFb+z7yjbI8HjckNXOFOY0IOV7jWmETGFa40Jj5yhV4oPLRtkoIh0NMSzHVt26Sgqzz/PpyH27ZtUtCG8Qb+AnMMKSoDcTTCEnnWbVvNoB7GstGluYNJEYvGpbgBLgcpAPJg37ZlhP3JzHhqtyZZVkb7xzfRnMzVYoWFQyJ1Y4GOOEwRKyy57C52RrpJQjYMKe44JH49If8P8RFTs2ezGn28SxkYzR47mDLJckUcyDt30sjCR75YTJB/96vbZ9aEs+IRSuv7AAAAAElFTkSuQmCC");
}
.header li{
  list-style:none;
}
.header {
  > ul {
    width: 100%;
    > li {
      width: 100%;
      cursor: pointer;
      > ul {
        width: 100%;
        li:last-of-type {
          padding-bottom: 2rem;
        }
      }
    }
    .catalog-title::before {
      width: 2rem;
      height: 2rem;
    }
  }
  .line {
    margin-left: 1.1rem;
    display: block;
    height: 4rem;
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABLCAYAAACx1u2DAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAFklEQVQY02P4Pyn4PxMDAwPDKEFHAgChhgN4umNNZQAAAABJRU5ErkJggg==");
    background-repeat: no-repeat;
    width: 2rem;
  }
}
.list-title-content{
  display:flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.4rem;
  >p{
    float: right;
    font-size: 1.1rem;
  }
}
.item-item-icon{
  margin-left: .4rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: 50%;
  display: inline-block;
  width: 1.6rem;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACg0lEQVRYw92Zv2sTYRjHP+9LB8WpHcVBBIsg3dxKyZrhhPwBGghYhJNS6qSDk4MOYgjCQbAQ0AyOHW7ImqFbtiJIA07O7WKwQ8g5vE9+NLlLL/E931w/kCkv7314ee597/m+in8g8r11oCC/LWAT2ABuyZAecAacAidAG2irIDxf9plqCUkNlIAKUATWFpyiD7SABnCkgnCQiXDkewp4ArwB7i+7QlN0gbdAUwVhZE048r2HQB3YtiQ6zTHwXAXh96sG6hSyz4BOhrLI3B151lwSV1hKoArsZygaRw04SCqRWGGR/YKpWRc0gXKcdFJJVB3KIs+uxv0xs8JSR58dyk6yq4LwMFFYdoMOcMO1qXABPJrcPUYlIXVbXyFZxKUubpeFMXWT5da1LNtMvE8KRsftD2ydYLfvgtbw66ct6S7wQAXhYLjCJWuyAC/fw+uatenErQTjkqjYnD0jKgBaPhGLrm1SUIx8b11jvmUX/UR0wRpQGArnhYLGdAp5YUtj2pq8sKkxPVhe2FCR76VqTUbcuWdvj323v/DhsvjuMBjAn978MTelab5q3GCh/hMAFfneb8ZtuR0+fDPSLx5bnRboaUxukBfONCbkyAunGpPI5IUTjYmP8kJ7KNx3bZKCPtDWEsy1XNukoKWC8Hz4PdxwbZOCBowPjiNMG2Kn6/j4yrRI9uiK47jNj3zvKSbtWUXKKgi/wuWuuYlJEVeNY3ED8hykAMgfe64tJ9ibzoxn3gzJsqz26EtSm87VYoWFAybqxgFNcZghVlhy2TJuVrpGQjYMKe44JH79RPYv4gWmZg/nDbp+lzIw2j12MGXStSjalTl30sjCdb5YTJD/71e3fwEu58VW/eDSNQAAAABJRU5ErkJggg==");
  height: 1.6rem;
}
.item-item-icon-active{
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAACTElEQVRYw92ZP0sjQRiHnxksDqzOwuoq4UQ47OxE0l6RIh/gEAJ3CAERyyusUliGICwEhYDkA1hskTaFXTo5OAxcZWWhzQkWwbWYd5M12Y2buOvs+ECqnew8DO/On98o3kBQK38GSvLbBNaBFWBZmjwAd8A1cAX0gJ7y/PtF+1QLSGqgAlSB78DSnK8YAl2gDVwoz3/KRTiolRXwAzgCvi46QhMMgDrQUZ4fZCYc1MrfgBawnZHoJJfAnvL8P6811ClkfwL9HGWRd/elr5kkjrCUQAM4yFE0jiZwmFQiscIie46pWRt0gN046aSSaFiURfpuxD2YGmGpo1OLslF+Kc8/SxSW2aAPfLJtKjwCW9HZY1QSUretAskiLi1xeymMqZs8p65F2SbyPSkYLbd/yW4Fy5oBsKE8/ykc4UqBZRG3CoxLomrbKAVVACVbxFvm33W9N0NgVWP2skWXRRxLobArlDTmpOAKmxpzrHGFdY05g7nCyhLjA2M6vqzB72Y23R8fwM2/ef6x/OqJo2iooFb+z7yjbI8HjckNXOFOY0IOV7jWmETGFa40Jj5yhV4oPLRtkoIh0NMSzHVt26Sgqzz/PpyH27ZtUtCG8Qb+AnMMKSoDcTTCEnnWbVvNoB7GstGluYNJEYvGpbgBLgcpAPJg37ZlhP3JzHhqtyZZVkb7xzfRnMzVYoWFQyJ1Y4GOOEwRKyy57C52RrpJQjYMKe44JH49If8P8RFTs2ezGn28SxkYzR47mDLJckUcyDt30sjCR75YTJB/96vbZ9aEs+IRSuv7AAAAAElFTkSuQmCC");
}
.list-item-title{
  font-size: 1.4rem;
  padding-left: 1rem;
}
a,img,button,input,textarea,div{-webkit-tap-highlight-color:rgba(255,255,255,0);}
.right-btn{
  padding: .2rem .4rem;
  border: 1px solid #e96847;
  color: #e96847;
  border-radius: 2.2rem;
}
</style>
