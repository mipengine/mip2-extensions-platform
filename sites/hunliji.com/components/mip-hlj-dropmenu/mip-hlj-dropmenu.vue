<template>
  <div class="dropdown" id="j_dropdown">
    <div class="dropdown__mask" id="j_dropdownMask"></div>
    <div class="dropdown__list">
      <div class="dropdown__list__row">
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qg4st6dk1q4640jvks4v.png" alt="">
          </div>
          <div class="dropdown__item__txt">首页</div>
        </a>
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qhccrf1fnk8ds11emf52.png" alt="">
          </div>
          <div class="dropdown__item__txt">找商家</div>
        </a>
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qg132d1s28fdeqi51ia94o.png" alt="">
          </div>
          <div class="dropdown__item__txt">案例</div>
        </a>
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qgl86b4rsltfug1r9u50.png" alt="">
          </div>
          <div class="dropdown__item__txt">套餐</div>
        </a>
      </div>
      <div class="dropdown__list__row">
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qgfaq441i0p1d2l1b7a4t.png" alt="">
          </div>
          <div class="dropdown__item__txt">结婚请柬</div>
        </a>
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qg12bm1fsb16421k0d1i6k4r.png" alt="">
          </div>
          <div class="dropdown__item__txt">婚宴酒店</div>
        </a>
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qg1gfbs517di14n31t1g4s.png" alt="">
          </div>
          <div class="dropdown__item__txt">结婚美图</div>
        </a>
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qg1lg9a1tb9716sspff4p.png" alt="">
          </div>
          <div class="dropdown__item__txt">结婚百科</div>
        </a>
      </div>
      <div class="dropdown__list__row">
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qg1rdi1d2r7dp15lsip4q.png" alt="">
          </div>
          <div class="dropdown__item__txt">结婚用品</div>
        </a>
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qh184h8vr1gqugojmt351.png" alt="">
          </div>
          <div class="dropdown__item__txt">问答</div>
        </a>
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckf135qglcrdv91jg91jng18804u.png" alt="">
          </div>
          <div class="dropdown__item__txt">婚礼视频</div>
        </a>
        <a class="dropdown__item">
          <div class="dropdown__item__icon">
            <img src="https://qnm.hunliji.com/o_1ckotf1pk1ookqai1oh0tq41s7h7.png" alt="">
          </div>
          <div class="dropdown__item__txt">新娘社区</div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
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

<script>
export default {
  mounted () {
    console.log('This is my first custom component !')
  }
}
</script>
