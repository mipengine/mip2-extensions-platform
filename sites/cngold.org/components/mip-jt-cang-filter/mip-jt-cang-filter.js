export default class MIPJtCangFilter extends MIP.CustomElement {
  build () {
    let url = this.element.getAttribute('url')// 藏品种类
    let list = this.element.getAttribute('list')// 筛选条件对应id
    let chosedBox = this.element.getAttribute('chosed-box')// 已选条件容器

    // 根据id获取元素
    function $ (str) {
      return document.getElementById(str)
    }
    // 子元素多于三个时只显示三个
    function showLimit (eles) {
      for (let i = 0; i < eles.length; i++) {
        if (i > 2) {
          eles[i].style.display = 'none'
        }
      }
    }
    // 显示所有子元素
    function showAll (eles) {
      for (let i = 0; i < eles.length; i++) {
        eles[i].style.display = 'block'
      }
    }

    // 点击筛选显示选择弹窗
    $('show_chose').onclick = function () {
      let chosedLi = $(chosedBox).children
      for (let j = 0; j < chosedLi.length; j++) {
        chosedLi[j].style.display = 'block'
      }
      $('chose_box').style.display = 'block'
    }
    // 阻止冒泡
    $('choseCon_box').onclick = function (e) {
      e.stopPropagation()
    }
    // 点击关闭弹窗
    $('chose_box').onclick = function () {
      this.style.display = 'none'
    }

    // 筛选条件限制显示个数
    let clickUls = document.getElementsByClassName('city_select')
    for (let i = 0; i < clickUls.length; i++) {
      showLimit(clickUls[i].children)
    }
    // 点击展开或收起条件
    let showAlls = document.getElementsByClassName('show_all')
    for (let i = 0; i < showAlls.length; i++) {
      showAlls[i].addEventListener('click', function () {
        let ul = this.parentNode.nextElementSibling
        let lis = ul.children
        if (lis[lis.length - 1].style.display === 'none') {
          showAll(lis)
        } else {
          showLimit(lis)
        }
      })
    }
    // 条件的点击与显示
    let index = 0
    for (let i = 0; i < clickUls.length; i++) {
      let clickLis = clickUls[i].children
      for (let j = 0; j < clickLis.length; j++) {
        clickLis[j].addEventListener('click', function () {
          let inner = this.innerHTML
          let link = this.getAttribute('id')
          // 防止出现重复条件
          let chosedLi = $(chosedBox).children
          for (let n = 0; n < chosedLi.length; n++) {
            let idStr = chosedLi[n].getAttribute('id')
            if (idStr.substring(0, idStr.indexOf('-')) === link.substring(0, link.indexOf('-'))) {
              chosedLi[n].parentNode.removeChild(chosedLi[n])
            }
          }
          this.setAttribute('data-flag', '1')
          this.setAttribute('data-index', index)

          let newHtml = document.createElement('li')
          newHtml.setAttribute('id', link)
          newHtml.setAttribute('data-index', index)
          newHtml.innerHTML = inner + '<i class="delete_icon"></i>'
          $(chosedBox).appendChild(newHtml)
          index++
        })
      }
    }
    // 已选条件的删除
    $(chosedBox).onclick = function (ev) {
      let e = ev || window.event
      let target = e.target || e.srcElement
      if (target.nodeName.toLowerCase() === 'li' || target.nodeName.toLowerCase() === 'i') {
        if (target.nodeName.toLowerCase() === 'i') {
          target = target.parentNode
        }
        let dataIndex = target.getAttribute('data-index')
        for (let i = 0; i < clickUls.length; i++) {
          let clickLis = clickUls[i].children
          for (let j = 0; j < clickLis.length; j++) {
            if (clickLis[j].getAttribute('data-index') === dataIndex) {
              clickLis[j].setAttribute('data-flag', '0')
            }
          }
        }
        $(chosedBox).removeChild(target)
      }
    }
    // 筛选
    function filter () {
      let n = 0
      let longs = list.split(',')
      let chosedLi = $(chosedBox).children
      for (let i = 0; i < longs.length; i++) {
        for (let j = 0; j < chosedLi.length; j++) {
          if (n < 1) {
            let idStr = chosedLi[j].getAttribute('id')
            if (parseInt(longs[i], 10) === parseInt(idStr.substring(0, idStr.indexOf('-')), 10)) {
              url += '_' + idStr.substring(idStr.indexOf('-') + 1)
              n++
            }
          }
        }
        if (n < 1) {
          url += '_0'
        }
        n = 0
      }
      url += '.html'
      url = 'https://m.cngold.org/cang/' + url
      MIP.viewer.open(url, { isMipLink: false, replace: false })
    }
    // 确定筛选
    $('btn_sure').onclick = function () {
      filter()
    }
  }
}
