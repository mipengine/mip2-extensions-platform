export default class MIPJtExpertFilter extends MIP.CustomElement {
  build () {
    let type = this.element.getAttribute('type')
    let letter = this.element.getAttribute('letter')
    let kindId = this.element.getAttribute('kind-id')
    let gradeId = this.element.getAttribute('grade-id')

    // 初始化已选条件
    let kindChosed = this.element.querySelector('#kind-ul li.on span')
    let gradeChosed = this.element.querySelector('#grade-ul li.on span')
    let chosedHtml = ''
    if (kindChosed.innerHTML !== '全部') {
      chosedHtml += '<li><span>' + kindChosed.innerHTML + '</span><i data-value="0"></i></li>'
    }
    if (gradeChosed.innerHTML !== '全部') {
      chosedHtml += '<li><span>' + gradeChosed.innerHTML + '</span><i data-value="1"></i></li>'
    }
    if (chosedHtml !== '') {
      this.element.querySelector('.select-li ul').innerHTML = chosedHtml
      this.element.querySelector('.select-li').style.display = 'block'
    }

    // 删除已选条件
    let delLis = this.element.querySelector('.select-li ul')
    delLis.addEventListener('click', (ev) => {
      let e = ev || window.event
      let target = e.target || e.srcElement

      if (target.nodeName.toLowerCase() === 'i') {
        let temp = target.getAttribute('data-value')
        if (temp === '0') { // 业务属性重置
          let url = `https://m.cngold.org/${type}/m_sy_yw_dj${gradeId}_${letter}.html`
          MIP.viewer.open(url, { isMipLink: false, replace: false })
        } else if (temp === '1') { // 专家等级重置
          let url = `https://m.cngold.org/${type}/m_sy_yw${kindId}_dj_${letter}.html`
          MIP.viewer.open(url, { isMipLink: false, replace: false })
        }
      }
    })

    // 选择条件
    let kindLis = this.element.querySelectorAll('#kind-ul li')
    for (let i = 0; i < kindLis.length; i++) {
      kindLis[i].onclick = () => {
        this.removeClass(kindLis)
        kindLis[i].classList.add('on')
        searchCount(kindLis[i].querySelector('span').getAttribute('data-value'), '')
      }
    }
    let gradeLis = this.element.querySelectorAll('#grade-ul li')
    for (let i = 0; i < gradeLis.length; i++) {
      gradeLis[i].onclick = () => {
        this.removeClass(gradeLis)
        gradeLis[i].classList.add('on')
        searchCount('', gradeLis[i].querySelector('span').getAttribute('data-value'))
      }
    }
    // 确认
    this.element.querySelector('#confirm').onclick = () => {
      let url = `https://m.cngold.org/${type}/m_sy_yw${kindId}_dj${gradeId}_${letter}.html`
      MIP.viewer.open(url, { isMipLink: false, replace: false })
    }
    // 重置
    this.element.querySelector('#reset').onclick = () => {
      let kindId = this.element.querySelector('#kind-ul li.on')
      kindId.classList.remove('on')
      let gradeId = this.element.querySelector('#grade-ul li.on')
      gradeId.classList.remove('on')
      this.element.querySelector('#kind-ul li:first-child').classList.add('on')
      this.element.querySelector('#grade-ul li:first-child').classList.add('on')
      searchCount('-1', '-1')
    }

    let that = this
    // 查询专家数量
    function searchCount (sId, vId) {
      if (sId === '-1') {
        kindId = ''
      } else if (sId !== null && sId !== '') {
        kindId = sId
      }
      if (vId === '-1') {
        gradeId = ''
      } else if (vId === '0') {
        gradeId = vId
      } else if (vId !== null && vId !== '') {
        gradeId = vId
      }
      let fetchUrl = `https://m.cngold.org/${type}/m_sy_yw${kindId}_dj${gradeId}_${letter}_count.html`
      fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        return res.json()
      }).then((data) => {
        if (data.flag) {
          that.element.querySelector('#expert-count').innerHTML = data.data
        } else {
          that.alertTips(data.msg)
        }
      })
    }
  }
  // 移除所有子元素的选中类名
  removeClass (eles) {
    for (let i = 0; i < eles.length; i++) {
      eles[i].classList.remove('on')
    }
  }
  // 弹窗提示
  alertTips (msg) {
    if (msg) {
      this.element.querySelector('#sel-tips').innerHTML = msg
      this.element.querySelector('#sel-tips').style.display = 'block'
      setTimeout(() => {
        this.element.querySelector('#sel-tips').style.display = 'none'
      }, 2000)
    }
  }
}
