<template>
  <div
    v-if="name == 'nick'"
    class="item nickinput">
    <input
      name="nick"
      type="text"
      validatetype="must"
      placeholder="昵称"
    >
  </div>
  <div
    v-else-if="name == 'date'"
    class="item dateinput"
  >
    <input
      :value="dateVal"
      name="date"
      type="hidden"
      validatetype="must"
    >
    <span
      v-if="dateString"
      class="notempty">{{ dateString }}</span>
    <span v-else>{{ labeltext }}</span>
  </div>
  <div
    v-else-if="name == 'time'"
    class="item timeinput"
  >
    <input
      :value="timeString"
      name="time"
      type="hidden"
      validatetype="must"
    >
    <span
      v-if="timeString"
      class="notempty">{{ timeString }}</span>
    <span v-else>出生时间</span>
  </div>
  <div
    v-else-if="name == 'place'"
    class="item placeinput"
  >
    <input
      :value="placeVal"
      name="place"
      type="hidden"
      validatetype="must"
    >
    <span
      v-if="placeString"
      class="notempty">{{ placeString }}</span>
    <span v-else>出生地点</span>
  </div>
  <div
    v-else-if="name == 'xzpairboy'"
    class="boy fl"
  >
    <dt class="head"><mip-img :src="xzsrc"/></dt>
    <dd class="xz name">男：{{ xzname }}</dd>
    <input
      :value="xzid"
      name="boy"
      type="hidden"
      validatetype="must">
  </div>
  <div
    v-else-if="name == 'xzpairgril'"
    class="girl fl"
  >
    <dt class="head"><mip-img :src="xzsrc2"/></dt>
    <dd class="xz name">女：{{ xzname2 }}</dd>
    <input
      :value="xzid2"
      name="girl"
      type="hidden"
      validatetype="must">
  </div>
  <div
    v-else-if="name == 'sxpairboy'"
    class="item boy fl">
    <dt class="head"><mip-img :src="sxsrc"/></dt>
    <dd class="name">男：{{ sxname }}</dd>
    <input
      :value="sxid"
      name="boy"
      type="hidden"
      validatetype="must">
  </div>
  <div
    v-else-if="name == 'sxpairgril'"
    class="item girl fr">
    <dt class="head"><mip-img :src="sxsrc2"/></dt>
    <dd class="name">女：{{ sxname2 }}</dd>
    <input
      :value="sxid2"
      name="girl"
      type="hidden"
      validatetype="must">
  </div>
  <div
    v-else-if="name == 'xxpairgirl'"
    class="item girl">
    <div class="inpbox sel_blood">
      <input
        :value="xxnamestr"
        name="girl"
        type="hidden"
        validatetype="must">
      <span class="inp_xx">
        <label>女生：</label>
        <em v-if="!xxnamestr">请选择血型</em>
        <em
          v-else
          class="notempty">{{ xxname }}</em>
      </span>
    </div>
  </div>
  <div
    v-else-if="name == 'xxpairboy'"
    class="item boy">
    <div class="inpbox sel_blood2">
      <input
        :value="xxnamestr2"
        name="boy"
        type="hidden"
        validatetype="must">
      <span class="inp_xx">
        <label>男生：</label>
        <em v-if="!xxnamestr2">请选择血型</em>
        <em
          v-else
          class="notempty">{{ xxname2 }}</em>
      </span>
    </div>
  </div>
</template>

<style scoped>
.xz.name{font-size: 0.44rem;width: auto;}
</style>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      labeltext: '出生日期',
      dateString: '',
      dateVal: '',
      timeString: '',
      placeString: '',
      xz: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
      xzid: '1',
      xzname: '白羊座',
      xzsrc: '../static/public/images/prot_icon/xz/a/1.png',
      xzid2: '1',
      xzname2: '白羊座',
      xzsrc2: '../static/public/images/prot_icon/xz/a/1.png',
      sx: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
      sxid: '1',
      sxname: '鼠',
      sxsrc: '../static/public/images/prot_icon/sx/a/1.png',
      sxid2: '1',
      sxname2: '鼠',
      sxsrc2: '../static/public/images/prot_icon/sx/a/1.png',
      xx: ['A', 'B', 'O', 'AB'],
      xxname: '',
      xxnamestr: '',
      xxname2: '',
      xxnamestr2: ''
    }
  },
  mounted () {
    let _this = this
    if (_this.label) {
      _this.labeltext = _this.label
    }
    _this.$on('pickerChange', (date) => {
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      _this.dateVal = year + '/' + month + '/' + day
      _this.dateString = year + '年' + month + '月' + day + '日'
    })
    _this.$on('pickerChangeTime', (time) => {
      _this.timeString = time
    })
    _this.$on('pickerChangePlace', (arr) => {
      _this.placeVal = (arr[0] + ',' + arr[1])
      _this.placeString = arr[0] + ', ' + arr[1]
    })
    _this.$on('pickerChangexzPairBoy', (arr2) => {
      let _id = _this.returnId(arr2[0], _this.xz)
      _this.xzid = _id
      _this.xzname = arr2[0]
      _this.xzsrc = '../static/public/images/prot_icon/xz/a/' + _id + '.png'
    })
    _this.$on('pickerChangexzPairGril', (arr2) => {
      let _id = _this.returnId(arr2[0], _this.xz)
      _this.xzid2 = _id
      _this.xzname2 = arr2[0]
      _this.xzsrc2 = '../static/public/images/prot_icon/xz/a/' + _id + '.png'
    })
    _this.$on('pickerChangesxPairBoy', (arr2) => {
      let _id = _this.returnId(arr2[0], _this.sx)
      _this.sxid = _id
      _this.sxname = arr2[0]
      _this.sxsrc = '../static/public/images/prot_icon/sx/a/' + _id + '.png'
    })
    _this.$on('pickerChangesxPairGril', (arr2) => {
      let _id = _this.returnId(arr2[0], _this.sx)
      _this.sxid2 = _id
      _this.sxname2 = arr2[0]
      _this.sxsrc2 = '../static/public/images/prot_icon/sx/a/' + _id + '.png'
    })
    _this.$on('pickerChangexxPairGril', (arr2) => {
      _this.xxname = arr2[0] + '型'
      _this.xxnamestr = arr2[0]
    })
    _this.$on('pickerChangexxPairBoy', (arr2) => {
      _this.xxname2 = arr2[0] + '型'
      _this.xxnamestr2 = arr2[0]
    })
    let submit = document.getElementById('submit')
    let submit2 = document.getElementById('submit2')
    let pt = document.getElementById('pt')
    let jz = document.getElementById('jz')
    let a = submit.querySelectorAll('a')
    let href = a[0].getAttribute('url')
    if (submit2) {
      submit2.addEventListener('click', function () {
        let a2 = submit2.querySelectorAll('a')
        let href2 = a2[0].getAttribute('url')
        let input2 = jz.querySelectorAll('input')
        if (!_this.returnQuery(input2)) {
          _this.tip()
          return false
        }
        let url = href2 + '?' + _this.returnQuery(input2)
        a2[0].setAttribute('href', url)
      })
    }
    submit.addEventListener('click', function () {
      let input = document.querySelectorAll('input')
      if (submit2) {
        input = pt.querySelectorAll('input')
      }
      if (!_this.returnQuery(input)) {
        _this.tip()
        return false
      }
      let url = href + '?' + _this.returnQuery(input)
      a[0].setAttribute('href', url)
    })
  },
  methods: {
    returnId: function (val, arr) {
      let id = ''
      for (let i = 0; i < arr.length; i++) {
        if (val === arr[i]) {
          id = i + 1
        }
      }
      return id
    },
    returnQuery: function (input) {
      let querys = ''
      let q = true
      for (let i = 0; i < input.length; i++) {
        let name = input[i].getAttribute('name')
        let value = input[i].value
        if (value == null || value === '') {
          q = false
        }
        let and = '&'
        if (i === input.length - 1) {
          and = ''
        }
        if (name === 'nick') {
          querys += ''
        } else if (name === 'place') {
          let _v = encodeURI(encodeURI(value))
          querys += name + '=' + _v + and
        } else {
          querys += name + '=' + value + and
        }
      }
      return q === true ? querys : ''
    },
    tip: function () {
      let body = document.querySelectorAll('body')
      let tip = document.getElementById('tip')
      if (!tip) {
        body[0].insertAdjacentHTML('afterbegin', '<div id="tip" class="tip"><span>请输入完整的信息</span></div>')
      } else {
        setInterval(function () {
          tip.remove()
        }, 3000)
      }
    }
  }
}
</script>
