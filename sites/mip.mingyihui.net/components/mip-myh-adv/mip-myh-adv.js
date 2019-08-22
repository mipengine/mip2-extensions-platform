import './index.less'

const { templates, util } = MIP

const log = util.log('mip-myh-adv')
export default class MIPMYHAdv extends MIP.CustomElement {
  build () {
    // 在这里注册 say 事件的监听
    this.addEventAction('click', (event, adSign) => {
      let adSignVal = adSign + ',' + this.postData['userid'] + ',' + this.postExtParams['referer'] + ',' + (new Date()).getTime()
      setCookie('_adv_invite', adSignVal)
      this.faKey(adSign, 1)
    })
  }
  connectedCallback () {
    this.inner_cpnt = this.element.getAttribute('inner-cpnt') || 'div'
    this.cpnt_attrs = this.element.getAttribute('cpnt-attrs') || '{}'
    this.cpnt_attrs = util.jsonParse(this.cpnt_attrs)
    this.src = this.element.getAttribute('src') || ''
    this.data_post = this.element.getAttribute('data-post') || '{}'
    this.data_post_extParams = this.element.getAttribute('data-post-extParams') || '{}'
    this.postData = util.jsonParse(this.data_post)
    this.postExtParams = util.jsonParse(this.data_post_extParams)
    if (!this.postExtParams['referer']) {
      this.postExtParams['referer'] = 'mip'
    }
    if (!this.postExtParams['data_type']) {
      this.postExtParams['data_type'] = 'json'
    }
    if (!this.postExtParams['site']) {
      this.postExtParams['site'] = 'mingyihui'
    }
    this.postExtParams['url'] = document.head.baseURI
    if (!this.postData['userid']) {
      this.postData['userid'] = getCookie('mingyihuiuserid')
    }
    if (!this.postData['userid']) {
      this.postData['userid'] = 0
    }

    // console.log(JSON.stringify(this.postExtParams))
    // console.log(util.jsonParse(this.data_post),document)
  }
  /**
   * 构造元素，只会运行一次
   *
   * @override
  */
  firstInviewCallback () {
    this.container = document.createElement('div')
    let { element, container } = this

    // this.applyFillContent(container)
    element.appendChild(container)

    if (!container.hasAttribute('role')) {
      container.setAttribute('role', 'list')
    }
    // 异步获取数据
    if (!this.src) {
      log.error(this.element, 'mip-myh-adv 的 src 属性不能为空')
      return
    }
    getIP().then(da => {
      this.postExtParams['ip'] = da.ip
      this.postData['ext_params'] = JSON.stringify(this.postExtParams)
      postData(this.src, this.postData)
        .then(data => {
        // console.log(data);
          if (!data.errcode && data.data) {
            let templateData = this.restructTemplateData(data.data)
            this.renderTemplate(templateData)
          }
        }) // JSON-string from `response.json()` call
        .catch(error => console.error(error))
    })
  }

  restructTemplateData (data) {
    let returnData = []
    if (data.adv_list.length === 0) return returnData
    data.adv_list.forEach(adv => {
      this.faKey(adv['sign'], 0)
        let ad_contents = []
        adv.ad_contents.forEach(ad_content=>{
          if (ad_contents.length === 0) {
            ad_contents=ad_content
            ad_contents['ad_name'] = adv['ad_name']
            ad_contents['ad_sign'] = adv['sign']
            ad_contents['lists']=[]
          } else {
            ad_contents['lists'].push(ad_content)
          }
        })
      returnData.push(ad_contents)
    })
    // console.log(returnData)
    return returnData
  }

  faKey (adSign, mode) {
    let keyName = this.postExtParams['referer'] + 'Adv_' + adSign + (mode === 0 ? '_View' : '_Click')
    let statUrl = 'https://www.mingyihui.net/api/stat/statKey2/' + keyName + '/0/' + this.postData['userid']
    return fetch(statUrl, {
    })
  }
  /**
   * renderTemplate 获取模板
   *
   * @param {Object} data 渲染数据
  */
  renderTemplate (data) {
    if (!data || !(data instanceof Array)) {
      log.error(this.element, data, '数据不符合规范')
      return
    }
    templates
      .render(this.element, data)
      .then(html => {
        this.render(html)
      })
  }

  /**
   * render dom 渲染函数
   *
   * @param {Array} htmls html 对象数组
   *
   * */
  render (htmls) {
    let fragment = document.createElement(this.inner_cpnt)
    for (let key in this.cpnt_attrs) {
      fragment.setAttribute(key, this.cpnt_attrs[key])
    }
    htmls.forEach(html => {
      let node = document.createElement('div')
      node.innerHTML = html
      node.setAttribute('role', 'listitem')
      fragment.appendChild(node)
    })
    this.container.appendChild(fragment)
  }
}

function postData (url = '', data = {}) {
  // Default options are marked with *
  let pdata = 'adpp_id=' + data['adpp_id'] + '&userid=' + data['userid'] + '&ext_params=' + data['ext_params']
  return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'omit', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: pdata // body data type must match "Content-Type" header
  })
    .then(response => response.json()) // parses JSON response into native JavaScript objects
}

function getCookie (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}
// 写cookies
function setCookie (name, value) {
  let Days = 30
  let exp = new Date()
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + value + ';expires=' + exp.toGMTString() + ';domain=.mingyihui.net'
}
function getIP () {
  return fetch('https://api.ipify.org?format=json', {
  })
    .then(response => response.json())
}
