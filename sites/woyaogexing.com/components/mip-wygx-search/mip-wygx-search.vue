<template>
  <div class="m-search">
    <form
      ref="form"
      action="https://m.woyaogexing.com/e/search/"
      method="post"
      class="m-search-form"
    >
      <div class="u-serch-side">
        <input
          :value="selected"
          type="hidden"
          name="classid"
          class="u-nsid">
        <input
          type="hidden"
          name="show"
          value="title">
        <span
          class="u-serch-class"
          @click="toggleMenu"
        >{{ menus[selected] }}</span>
        <i
          class="u-arrow"
          @click="toggleMenu"/>
        <div
          v-show="showMenu"
          class="u-class-list">
          <ul>
            <li
              v-for="(classname, classid) in menus"
              :key="classid"
              :data-classid="classid"
              @click="selectMenu(classid)"
            >{{ classname }}</li>
          </ul>
        </div>
      </div>
      <div class="u-serch-main">
        <input
          v-model="keyboard"
          class="u-serch-input"
          name="keyboard"
          @keyup.enter="submitSearch">
        <i
          class="u-serch-subtn"
          @click="submitSearch"/>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selected: 1,
      menus: {
        1: '签名',
        2: '网名',
        24: '头像',
        63: '分组',
        69: '皮肤',
        75: '说说',
        78: '日志',
        85: '图片',
        93: '壁纸',
        109: '表情'
      },
      showMenu: false,
      keyboard: ''
    }
  },
  created () {
    let classid = this.$element.getAttribute('classid') || 1
    this.selected = classid
  },
  methods: {
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    selectMenu (classid) {
      this.selected = classid
      this.showMenu = !this.showMenu
    },
    submitSearch () {
      if (this.keyboard === '') return
      this.$refs.form.submit()
    }
  }
}
</script>
<style lang="less" scoped>
mip-wygx-search {
  background-color: #fff;
  .m-search {
    padding: 12px 10px;
    flex-wrap: nowrap;
    background-color: #fff;
    overflow: initial;
  }
  form {
    width: 100%;
    display: flex;
    align-items: center;
  }
  .u-serch-side {
    position: relative;
    width: 20%;
    text-align: center;
    color: #333;
  }
  .u-serch-main {
    width: 80%;
  }
  .u-arrow {
    width: 14px;
    height: 14px;
    vertical-align: middle;
    display: inline-block;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAABWElEQVRIS+2UO3KDMBCGdyfJAWjhWAkF9IgyrwvoALFJLXq7kHMsaNXnMZsRgzwyEQ8BQxqrYhDaT9+vRQgbD9yYB1fg6on/e6R6A7Sy1kVN2xDzPC+IiIQQz2tAGWOFriOEeDEiBmhgjy3ofSm0hT1Z9RpoA4zj+CYIgqN+tMyKdmfesh2YXi+VUomU8uccKef8tq7rw1IoY2wPAPaRyDAMU875tyZfdKmGVlV1RMSHOaZjsD9A/WIutAsjolMURYkxMwLO/9AFJaJ9WZavrgPNsmyHiLopmtEHcxqaRVOhPrBBoJ5kjN0R0cE+U9uUMfYGAGdrbYaIqRDiq6+1R682FxQAdm1BL9ioodllD9SW+ACAZMhssGlccWgoAOjL4b4zPxk22dA27UC9YN5A00gtFJRSqZTy0+fuG22avniVUugLm2XoY+P6dpbhEugVuCQ959rNI/0FvJ7FHW/VRf8AAAAASUVORK5CYII=)
      no-repeat;
    margin-left: 4px;
    background-size: contain;
  }
  .u-class-list {
    position: absolute;
    left: 0;
    // bottom: 40px;
    width: 100%;
    background-color: #404a54;
    color: #fff;
    border-radius: 4px;
    overflow: hidden;
    // display: none;
  }
  .u-serch-main input {
    box-sizing: border-box;
    display: inline-block;
    outline: 0;
    border: 0;
    height: 20px;
    width: 88%;
  }
  .u-class-list li {
    line-height: 26px;
    cursor: pointer;
  }
  .u-serch-subtn {
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAD+0lEQVRYR8WXTYhbVRTH/+clL2rHYmZoR2jcuHCjgsVaEVSsooIrRUipH9WZMbkv4wciguDHIh1aqiiOmwnzzsvo2FHBzqKuRFBbi25ErVoquFN0mPgdBHUMZt6RE27Ka/rykkx1ena5955zfu983HtCOMtCg/gvl8vO0tLSFsdxRgH8A6DGzL8MYqPzbE8AY8wGEdnlOM5OEbkOwFCHkRqA9wC8xszvApBBgJIAyPM8T0T2ANAv7keOAXiUmT/q57CeiQUYGxvLZjKZNwDcFmNIQ/4jgAyALTERCQFMMfNUP9E4DcAYcwGADwBsjTivEdELqVRqsVKpfN9e15pYXl7eSkT3icgDAM6P6Mww88O9InEKQD6fTw0PD78D4GarqPl8bmhoaGp6enolyVihULjIcZxXIrp6/ElmfjZJ7xQAY8wT6jDifJyZX+31Fe19/YBsNrtARHfZtaaIbA+C4ItuNk4CGGM2AfgmEsZ9zPxMv84jEJmRkZGjInKNXXufmdsRPc1cFOApAPvsieP1ev3KxcXF1UEB9LzneZeIyAlbqLq0jZm1QxIBVOEye+IeZtYuWLMYY14HcLc18Dwza3rjAUql0mgYhtpaKnrDbWbm39fsHYAx5g4Ah9QGEX3m+/5VXQGKxeINRKStp/IJM199Js5Vd3x8fLPruj9ZO38xc+cN2tpq1YAxJg/goKU95Pv+nWcKYO022nWQTqc3ViqVPzrttgCKxeJOInrzfwD4G8A5ajcRwBhzI4DD/2UKbFv/3FcKCoXChY7j6KumEWmk0+lNceEaJC0DFaFNw8dE1Co+Itrl+34rJWsVY8wBALtVX0ReDILg8a5dYAvmaQB77aEv6/X6trVeRIVC4WLHcb5uFyARbfd9/9NEANs23wLYYA/uYebyoBHI5/OZbDZ7mIiutbpHmXlHNzudj1E0CiIiu4Mg0ButL7GP0cv6PFuFMAzDHdVq9cO+AOxzrBeSjl4qIRHtbTQa++fn57WlukqpVMqFYRjEDDHHXNe9dWZm5tfEFLQ3bSoU4tKIwnc6kKyurh6sVqvtK7u1XSqVLg/DcAzAgwDOi+g0tf3t789d170lDiJ2JJucnBxWZx3DRdu2tqtesS6AHACdoKKiQ8x+AF8B0E5IJUF0HUp13KrVag+JiBbiSF9FAJxwHOeR2dnZ1rtijLkfwFwSRM+xfGJiYmM6nb5XRPS61iHj3A4YHVKPiMiBXC73drlc1qH0pPSC6AkQNWaLdJSIWn9Mms3mD3Nzc7/1ik4cxMrKyvULCwt/DgTQy1HSfgzES8z82LoBKJzneTq+a01odxxh5pvWFcBCXBGG4e0i8la1Wj2+7gCdaTrrAP8C/Vl7MDcpjMgAAAAASUVORK5CYII=)
      no-repeat;
    background-size: contain;
    vertical-align: middle;
    cursor: pointer;
  }
}
</style>
