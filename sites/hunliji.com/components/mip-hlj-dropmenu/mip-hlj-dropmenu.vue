<template>
  <div class="dropdown" id="j_dropdown" v-show="show">
    <div class="dropdown__mask" id="j_dropdownMask"></div>
    <div class="dropdown__list">

      <div class="dropdown__list__row" v-for="(row, i) of menuList" :key="i">
        <a class="dropdown__item" v-for="(col, j) of row" :key="j" :href="col.href">
          <div class="dropdown__item__icon">
            <img :src="col.img" alt="">
          </div>
          <div class="dropdown__item__txt">{{col.text}}</div>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    cid: Number,
    menuList: Array
  },
  data: function() {
    return {
      show: false
    }
  },
  mounted () {

  },
  created() {
    this.$element.customElement.addEventAction('toggle', () => {
      this.show = !!!this.show
    })
  }
}
</script>

<style lang="less">
.dropmenu-pd-warp .dropdown {
  top: 44px;
}

.dropdown {
  position: fixed;
  z-index: 2;
  left: 0;
  top: 114PX;
  bottom: 0;
  width: 100%;
  display: block;
  &__mask {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.55;
  }
  &__list {
    position: relative;
    z-index: 2;
    padding: 5PX 10PX 14PX;
    background: #fff;
    &__row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
  &__item {
    margin-bottom: 10PX;
    &__icon {
      width: 78PX;
      height: 50PX;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &__txt {
      font-size: 12PX;
      line-height: 1;
      text-align: center;
      color: #333;
    }
  }
}

@media (max-width: 320PX) {
  .dropdown__list {
    padding: 5PX 4PX 14PX;
  }
}
</style>

