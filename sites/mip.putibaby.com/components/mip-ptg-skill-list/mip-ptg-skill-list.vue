
<template>
  <div class="root">

    <div
      v-for="cat in categories"
      :key="cat.title"
      class="part">
      <div class="sub_head">
        <p>{{ cat.title }}</p>
      </div>
      <div
        v-for="it in cat.children"
        :key="it.title"
        class="item">
        <p for="it.id">
          {{ it.title }}
        </p>
        <input
          :disabled="read_only"
          :checked="choiceDict[it.id]"
          type="checkbox"
          name="services"
          readonly="true"
          unselectable="on" >
      </div>
    </div>

  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}

* {
  margin: 0px;
  padding: 0px;
  width: 100%;
}

p {
  margin: 0px;
  padding: 0px;
  font-family: '黑体';
}

body {}

a {
  color: black !important;
  text-decoration: none !important;
}

a:checked {
  text-decoration: none !important;
}

a:visited {
  text-decoration: none !important;
}

a:hover {
  text-decoration: none !important;
}

.root {
  padding-bottom: 15px;
  background: #f2f2f2;
  font-size: 14px;
  position: relative;
  width: 100%;
  color: #666;
  font-family: '黑体';
}

.main_head {
  height: 20px;
  margin-bottom: 15px;
}

.main_head p {
  position: relative;
  width: 80%;
  left: 15px;
}

.part {
  position: relative;
  width: 100%;
}

.sub_head {
  height: 44px;
  line-height: 44px;
  background: #f4f4f4;
  color: #999;
}

.sub_head p {
  position: relative;
  width: 50%;
  left: 15px;
  font-family: '黑体';
}

.item {
  position: relative;
  height: 44px;
  line-height: 44px;
  background: #fff;
}

.item p {
  display: inline;
  position: relative;
  left: 15px;
  font-family: '黑体';
}

.item input {
  position: absolute;
  right: 15px;
  width: 22px;
  height: 22px;
  top: 10px;
}

.mbtn {
  -webkit-appearance: none;
  background: #afd03b;
  color: #fff;
  width: 89.3%;
  line-height: 3px;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px auto 10px auto;
  text-align: center;
  height: 47px;
  position: relative;
  left: 50%;
  margin-left: -44.65%;
  font-size: 18px;
  border-style: none;
}

.checked {
  /* background-image: url('/i/balance_checked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  top: 10px;
  right: 35px;
  position: absolute;
  z-index: 22;
}

.unchecked {
  /* background-image: url('/i/balance_unchecked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  top: 10px;
  right: 35px;
  position: absolute;
  z-index: 22;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  /* background: #f4f4f4 url('/i/checkbox_22px.png'); */
  border-radius: 50%;
  border-style: none;
}

input[type="checkbox"]:checked {
  background-position: -22px 0;
}
</style>

<script>
var API = {}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

API.wrapRet_ = function (api, opts, fn) {
  console.log('posting to ' + api)
  opts.mip_sid = API.sessionId || ''
  fetch(api, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opts)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(ret => {
      if (ret.success) fn(true, ret.data)
      else fn(false, ret.error)
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

export default {

  props: {
    src: {
      type: String,
      default: null
    },
    dataJsonstr: {
      type: String,
      default: null
    }
  },
  data () {
    var pdata = JSON.parse(this.dataJsonstr)
    console.log(pdata)
    var state = {}
    var data = pdata
    var wholeList = data.whole_list
    var myList = data.my_list
    // var readOnly = data.read_only

    // id => data mapping
    var wholeDict = {}
    wholeList.forEach(function (x) {
      x.children = []
      wholeDict[x.id] = x
    })
    wholeList.forEach(function (x) {
      var parent = wholeDict[x.parent]
      if (!parent) return
      parent.children.push(x)
    })

    // 分类
    var categories = []
    wholeList.forEach(function (x) {
      if (x.parent === 0) categories.push(x)
    })

    // 是否已经选择
    var choiceDict = {}
    myList.forEach(function (x) {
      choiceDict[x.skill_id] = true
    })
    wholeList.forEach(function (x) {
      var v = state[x.id]
      if (v === true) choiceDict[x.id] = true
      else if (v === false) choiceDict[x.id] = false
    })

    categories.sort(function (a, b) {
      return a.order - b.order
    })
    categories.map(function (c) {
      c.children.sort(function (a, b) {
        return a.order - b.order
      })
    })

    console.log(categories)

    return {
      whole_list: pdata.whole_list,
      my_list: pdata.my_list,
      read_only: pdata.read_only,
      categories: categories,
      choiceDict: choiceDict,
      state: state
    }
  },
  computed: {

  },
  beforeMount () {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is my first custom component !')
    console.log(this)
  },
  methods: {
    init () {
      console.log('should loading')
      console.log(this.dataJson)
    },
    load_data () {
      console.log('should set data')
    }

  }
}
</script>
