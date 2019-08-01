import './index.less'

export default class MIPComponentLiuyan extends MIP.CustomElement {
  build () {
    this.submiting = false
    this.mask = this.element.querySelector('.mask')
    this.btnClose = this.element.querySelector('.close')
    this.formSelector = '.' + this.element.dataset.type
    this.isFreetalk = this.element.dataset.type === 'freetalk'
    this.fetchUrl = this.element.dataset.fetchurl

    this.mask.addEventListener('click', this.close)
    this.btnClose.addEventListener('click', this.close)
    this.addEventAction('open', function (_event, userid) {
      this.open(userid)
    })
    this.addEventAction('submit', function (event) {
      this.submit(event)
    })
  }

  open (userid) {
    let form = this.mask.querySelector(this.formSelector)
    if (!form) {
      let sForm = this.element.querySelector(this.formSelector)
      form = sForm.cloneNode(true)
      form.classList.remove('hidden')
      this.mask.appendChild(form)
      form.querySelector('.close').classList.remove('hidden')
    }
    if (userid) {
      form.querySelector('.UserID').value = userid
    }
    this.mask.style.display = 'block'
    let that = this
    setTimeout(function () {
      that.mask.classList.add('show')
    }, 20)
  }

  close (event) {
    let that = this
    if ((event.target === that) || event.target.classList.contains('close')) {
      that.classList.remove('show')
      setTimeout(function () {
        that.style.display = 'none'
      }, 300)
    }
  }

  getFormObjData (form) {
    let formData = {
      UserID: form.querySelector('[name=UserID]').value.trim(),
      Phone: form.querySelector('[name=Phone]').value.trim()
    }
    if (!this.isFreetalk) {
      let sexDom = form.querySelector('[name=Sex]:checked')
      formData.Sex = sexDom ? sexDom.value.trim() : '先生'
      formData.Name = form.querySelector('[name=Name]').value.trim()
      formData.Content = form.querySelector('[name=Content]').value.trim()
      formData.sourcepage = form.querySelector('[name=sourcepage]').value.trim()
    }
    return formData
  }

  toFormData (obj) {
    let formData = new FormData()
    for (let key in obj) {
      formData.append(key, obj[key])
    }
    return formData
  }

  checkForm (formData) {
    if (!this.isFreetalk && !formData.Name) {
      return '姓名不能为空'
    }
    if (!formData.Phone) {
      return '手机号码不能为空'
    } else {
      let reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/
      if (!reg.exec(formData.Phone)) {
        return '手机号码格式不正确'
      }
    }
  }

  submit (event) {
    let that = this
    if (that.submiting) {
      return
    }
    that.submiting = true
    let form = event.target.closest(that.formSelector)
    let formData = that.getFormObjData(form)
    let checkResult = that.checkForm(formData)
    if (checkResult) {
      that.openDialog(form, '全球品牌网(globrand)提示：', checkResult, true)
      that.submiting = false
      return
    }
    if (!formData.Content) {
      formData.Content = '对此项目很感兴趣，想加盟，请速与我联系'
    }

    fetch(that.fetchUrl, {
      method: 'POST',
      body: that.toFormData(formData)
    }).then(function (response) {
      return response.text()
    })

    that.submiting = false

    if (that.isFreetalk) {
      that.openDialog(form, '全球品牌网(globrand)提示：', '我们将稍后和您联系，请保持电话畅通！', true)
    } else {
      that.openDialog(form, '全球品牌网(globrand)提示：', '留言已成功提交，跟进留言回复进展需要关注公众号，微信ID：xiangmu114', false)
    }
  }

  openDialog (form, headInfo, contentInfo, isFreetalk) {
    let domDialog = document.createElement('div')
    domDialog.className = 'dialog'

    let domHead = document.createElement('div')
    domHead.className = 'dialog-head'
    domHead.innerText = headInfo
    domHead.addEventListener('click', function (event) {
      event.target.closest('.dialog').remove()
    })

    let domContent = document.createElement('div')
    domContent.className = 'dialog-content'

    if (isFreetalk) {
      let domInfo = document.createElement('p')
      domInfo.innerText = contentInfo
      domContent.appendChild(domInfo)
    } else {
      let domInfo = document.createElement('div')
      domInfo.innerText = contentInfo
      domInfo.className = 'tipmsg'
      domContent.appendChild(domInfo)

      let domWx = document.createElement('div')
      domWx.className = 'ewcode'
      domContent.appendChild(domWx)
    }

    domDialog.appendChild(domHead)
    domDialog.appendChild(domContent)

    if (form.parentElement.tagName === 'MIP-COMPONENT-LIUYAN') {
      if (form.nextElementSibling.className !== 'dialog') {
        form.after(domDialog)
      }
    } else {
      if (form.lastElementChild.className !== 'dialog') {
        form.appendChild(domDialog)
      }
    }
  }
}
