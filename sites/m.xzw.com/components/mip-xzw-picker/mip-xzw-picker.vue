<script>
import * as reData from '../../common/basedata.js'
import MobileSelect from '../../common/mobileSelect.js'

export default {
  props: {
    config: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      picker: []
    }
  },
  mounted () {
    const _this = this
    for (let i = 0; i < _this.config.length; i++) {
      const config = _this.config[i]
      let picker = document.getElementById(config.id)
      if (config.input) {
        picker.insertAdjacentHTML('afterbegin', config.input)
      } else {
        _this.initPicker(config, i, picker)
        picker.addEventListener('click', function () {
          _this.picker[i].show()
        })
      }
    }
    // 表单提交
    const submit = document.getElementById('submit')
    const submit2 = document.getElementById('submit2')
    const end = submit2 ? 1 : _this.config.length
    submit.addEventListener('click', function () {
      _this.submitForm(submit, 0, end)
    })
    if (submit2) {
      submit2.addEventListener('click', function () {
        _this.submitForm(submit2, 1, _this.config.length)
      })
    }
  },
  methods: {
    is_leap: function (year) {
      return (year % 100 === 0 ? (year % 400 === 0 ? 1 : 0) : (year % 4 === 0 ? 1 : 0))
    },
    inArray: function (arr, item) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
          return true
        }
      }
      return false
    },
    initPicker: function (config, i, picker) {
      const _this = this
      let _wheels = []
      let _position = []
      const _region = config.region || ''
      _position = config.position
      if (config.type === 'date' || config.type === 'date2' || config.type === 'place') {
        let bdata = reData.f(config.type, config.position, _region)
        _position = bdata.position
        _wheels = [{data: bdata.data}]
      } else if (config.type === 'time') {
        let bdata = reData.f(config.type, config.position)
        _position = bdata.position
        _wheels = [{data: bdata.data[0]}, {data: bdata.data[1]}]
      } else {
        _wheels = [{data: config.data}]
      }
      _this.picker[i] = new MobileSelect({
        trigger: '#' + config.id,
        title: '',
        wheels: _wheels,
        position: _position,
        triggerDisplayData: false,
        callback (curIndexArr, curValue) {
          let text = picker.querySelectorAll('.text')
          text[0].classList.add('notempty')
          let _html = ''
          let _val = ''
          const unit = config.unit || ''
          for (let i = 0; i < curValue.length; i++) {
            let _value = curValue[i].value || curValue[i]
            const and = config.and && i < curValue.length - 1 ? config.and : ''
            if (config.type === 'place') {
              _html += _value + and
              _value = encodeURI(encodeURI(_value))
            } else {
              _html += _value
            }
            _val += (unit ? _value.slice(0, -1) : _value) + and
          }
          text[0].innerHTML = _html
          _this.config[i].value = _val
        }
      })
    },
    submitForm: function (object, start, end) {
      const _this = this
      let url = object.getAttribute('url')
      let query = ''
      let and = '&'
      let input = document.querySelectorAll('input')
      if (input.length > 0) {
        for (let i = 0; i < input.length; i++) {
          if (input[i].value) {
            if (i === input.length - 1) { and = '' }
            query += input[i].name + '=' + input[i].value + and
          }
        }
      }
      for (let i = 0; i < _this.config.length; i++) {
        if (i >= start && i < end && _this.config[i].value) {
          if (i === input.length - 1) { and = '' }
          const _value = _this.config[i].value
          query += _this.config[i].name + '=' + _value + and
        }
      }
      if (!query) {
        _this.tip()
        return false
      }
      object.setAttribute('href', url + '?' + query)
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
