export default class MIPAsyncForm extends MIP.CustomElement {
  build () {
    this.addEventAction('send', (e) => {
      // 补全基础属性
      let url = this.element.getAttribute('url') || window.location.href
      let method = this.element.getAttribute('method') || 'get'
      if (url.length === 0) {
        url = window.location.href
      }
      if (method.length === 0 || (method.toLowerCase() !== 'post' && method.toLowerCase() !== 'get')) {
        method = 'get'
      }
      // 验证表单数据
      if (this.validateFormData()) {
        // 获取表单数据
        let data = this.getFormData()
        // 组装数据
        let datastr = '?'
        for (let key in data) {
          if (typeof (data[key]) === 'object') {
            for (let i = 0; i < data[key].length; i++) {
              datastr += key + '[' + i + ']' + '=' + data[key][i] + '&'
            }
          } else {
            datastr += key + '=' + data[key] + '&'
          }
        }
        datastr = datastr.replace(/&$/, '')

        // 发送数据
        fetch(url + datastr, { method: method.toLowerCase() }).then(function (response) {
          // 整个fetch信息
          return response.json()
        }).then((function (element) {
          return function (json) {
            // 在此处进行接收数据之后的操作
            if (json.ret) {
              // 触发请求失败事件
              MIP.viewer.eventAction.execute('formfailure', element, json.msg, typeof (json.data) === 'object' ? json.data : {})
            } else {
              // 触发请求成功事件
              MIP.viewer.eventAction.execute('formsuccess', element, json.msg, typeof (json.data) === 'object' ? json.data : {})
            }
          }
        })(this.element)).catch((function (element) {
          return function (ex) {
            // 此处是数据请求错误后的处理
            // 触发请求错误事件
            MIP.viewer.eventAction.execute('formerror', element, ex)
          }
        })(this.element))
      }
    })
  }
  validateFormData () {
    let elements = this.element.querySelectorAll('input[type="checkbox"]:enabled , input[type="password"]:enabled , input[type="radio"]:enabled , input[type="text"]:enabled , select:enabled , textarea:enabled')
    for (let i = 0; i < elements.length; i++) {
      if (typeof (elements[i].getAttribute('required')) !== 'string') {
        continue
      }
      if (elements[i].tagName.toLowerCase() === 'input') {
        if (elements[i].type === 'radio') {
          let radios = this.element.querySelectorAll('input[name="' + elements[i].name + '"]')
          let checked = false
          for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
              checked = true
            }
          }
          if (!checked) {
            return false
          }
        } else if (elements[i].type === 'checkbox') {
          let checkboxs = this.element.querySelectorAll('input[name="' + elements[i].name + '"]')
          let checkboxsCount = 0
          for (let j = 0; j < checkboxs.length; j++) {
            if (checkboxs[j].checked) {
              checkboxsCount++
            }
          }
          if (checkboxsCount === 0) {
            return false
          }
        } else {
          if (elements[i].value.trim().length === 0) {
            elements[i].focus()
            return false
          }
        }
      } else {
        if (elements[i].value.trim().length === 0) {
          elements[i].focus()
          return false
        }
      }
    }
    return true
  }
  getFormData () {
    let elements = this.element.querySelectorAll('input:enabled , select:enabled , textarea:enabled')
    let data = {}
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].tagName.toLowerCase() === 'input') {
        if (elements[i].type === 'radio') {
          let radios = this.element.querySelectorAll('input[name="' + elements[i].name + '"]')
          for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
              data[elements[i].name] = radios[j].value
            }
          }
        } else if (elements[i].type === 'checkbox') {
          let checkboxs = this.element.querySelectorAll('input[name="' + elements[i].name + '"]')
          if (checkboxs.length > 1) {
            let arrayName = elements[i].name.replace('[]', [])
            if (typeof (data[arrayName]) === 'undefined') {
              data[arrayName] = []
            }
            for (let j = 0; j < checkboxs.length; j++) {
              if (checkboxs[j].checked) {
                data[arrayName].push(checkboxs[j].value)
              }
            }
          } else if (checkboxs.length === 1 && elements[i].checked) {
            data[elements[i].name] = elements[i].value
          }
        } else {
          data[elements[i].name] = elements[i].value
        }
      } else {
        data[elements[i].name] = elements[i].value
      }
    }
    let newData = {}
    for (let i in data) {
      if (typeof (data[i]) === 'object') {
        newData[i] = this.unique(data[i])
      } else {
        newData[i] = data[i]
      }
    }
    return newData
  }
  unique (array) {
    let temp = []
    for (let i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) === -1) {
        temp.push(array[i])
      }
    }
    return temp
  }
}
