export default class MIPJtHkstockSort extends MIP.CustomElement {
  build () {
    let kind = this.element.getAttribute('kind')
    let listId = this.element.getAttribute('list-id')
    let sortBtns = this.element.getAttribute('sort-btns')
    let cancelBtn = this.element.getAttribute('cancel-btn')

    let sortOrder = 8 // 排序标志
    // 点击排序
    let sortEles = document.getElementsByClassName(sortBtns)
    for (let i = 0; i < sortEles.length; i++) {
      sortEles[i].addEventListener('click', function () {
        if (this.getAttribute('class').indexOf('up') !== -1) {
          delClass(sortEles, ['up', 'down'])
          this.classList.remove('up')
          this.classList.add('down')
          let id = this.getAttribute('id')
          if (id === '70') {
            sortOrder = 6
          } else if (id === '80') {
            sortOrder = 8
          }
        } else if (this.getAttribute('class').indexOf('down') !== -1) {
          delClass(sortEles, ['up', 'down'])
          this.classList.remove('down')
          this.classList.add('up')
          let id = this.getAttribute('id')
          if (id === '70') {
            sortOrder = 5
          } else if (id === '80') {
            sortOrder = 7
          }
        } else {
          delClass(sortEles, ['up', 'down'])
          this.classList.add('down')
          let id = this.getAttribute('id')
          if (id === '70') {
            sortOrder = 6
          } else if (id === '80') {
            sortOrder = 8
          }
        }
        document.getElementById(cancelBtn).style.display = 'block'
        getSort(sortOrder)
      })
    }
    // 取消排序
    document.getElementById(cancelBtn).addEventListener('click', function () {
      delClass(sortEles, ['up', 'down'])
      sortOrder = 8
      getSort(sortOrder)
      this.style.display = 'none'
    })

    // 删除兄弟元素类名
    function delClass (eles) {
      if (eles.length) {
        for (let i = 0; i < eles.length; i++) {
          eles[i].classList.remove(...arguments[1])
        }
      }
    }
    // 获取排序后的数据
    function getSort (order) {
      let fetchUrl = `https://m.cngold.org//hkstock/m_ajax_${kind}_${order}_p1.html`
      fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        if (data.flag) {
          document.getElementById(listId).innerHTML = data.data
        }
      })
    }
  }
}
