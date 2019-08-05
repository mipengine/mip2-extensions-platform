export default class MIPJtXianhuoFilter extends MIP.CustomElement {
  build () {
    // 存储初始筛选条件---重置时使用
    let oldCateIds = this.element.getAttribute('cate-Ids')
    let oldProvinceId = this.element.getAttribute('province-id')
    let oldCityId = this.element.getAttribute('city-id')
    let oldPrefix = this.element.getAttribute('prefix')
    // 存储筛选条件---确认筛选时使用
    let newCateIds = oldCateIds
    let newProvinceId = oldProvinceId
    let newCityId = oldCityId
    let newPrefix = oldPrefix

    // 定义$函数
    function $ (str) {
      return document.getElementById(str)
    }
    // 根据id隐藏多个元素
    function hideEles () {
      for (let i = 0; i < arguments.length; i++) {
        if ($(arguments[i])) { // 判断是否存在该元素
          $(arguments[i]).style.display = 'none'
        }
      }
    }
    // 根据id显示多个元素
    function showEles () {
      for (let i = 0; i < arguments.length; i++) {
        if ($(arguments[i])) {
          $(arguments[i]).style.display = 'block'
        }
      }
    }
    // 根据id隐藏兄弟节点（包括它自己）
    function hideSib (ele) {
      let sib = $(ele).parentNode.children
      for (let i = 0; i < sib.length; i++) {
        sib[i].style.display = 'none'
      }
    }
    // 判断元素是否为空,为空返回false
    function checkEmpty (id) {
      if (id !== undefined && id !== null && id !== '' && id !== 0) {
        return true
      } else {
        return false
      }
    }
    // 在元素之后插入新元素
    function insertAfter (newElement, targentElement) {
      let parent = targentElement.parentNode
      if (parent.lastChild === targentElement) {
        parent.appendChild(newElement)
      } else {
        parent.insertBefore(newElement, targentElement.nextSibling)
      }
    }
    // 左侧选中状态切换
    function handoverTab (id) {
      let lis = $('left_tab').children[0].children
      for (let i = 0; i < lis.length; i++) {
        if (lis[i].getAttribute('id') === id) {
          lis[i].classList.add('on')
        } else {
          lis[i].classList.remove('on')
        }
      }
    }
    // 新增种类绑定点击事件
    function bindClick (id, fn) {
      if ($(id)) {
        let pro = $(id).children
        for (let i = 0; i < pro.length; i++) {
          pro[i].addEventListener('click', function () {
            for (let j = 0; j < pro.length; j++) {
              pro[j].classList.remove('on')
            }
            pro[i].classList.add('on')
            if (fn) {
              let proId = pro[i].getAttribute('data-value').split('-')
              fn(...proId)
            }
          })
        }
      }
    }

    // 顶级分类
    function filterPrefix (prefix, subId, isReset) {
      newPrefix = prefix

      hideEles('kindIndex', 'kindLi', 'cityIndex', 'cityLi', 'provinceIndex', 'provincesLi')
      for (let i = 0; i <= 3; i++) {
        hideEles('cateIndex' + i, 'cateLi' + i)
      }

      if (prefix.length > 0) {
        filterCate(-1, -1, subId, isReset)
        if (prefix === 'farm') {
          showEles('cityLi', 'provincesLi')
        }
      } else {
        newPrefix = ''
      }
    }
    // 分类
    function filterCate (cateId, index, subId, isReset) {
      index = parseInt(index, 10)
      subId = parseInt(subId, 10)
      // 获取选中分类
      let prefix = newPrefix
      // 新选择的分类Id
      let tempCateIds = []
      // 已选择的分类ID 1-2-3
      let cateIds = newCateIds.split('-')
      // 设置当前选择的id
      if (index <= cateIds.length && index !== -1) {
        cateIds[index] = cateId
      }
      for (let i = 0; i <= index; i++) {
        tempCateIds[i] = cateIds[i]
      }
      let tempCateIdStrs = tempCateIds[0] ? tempCateIds[0] : ''
      for (let i = 1; i < tempCateIds.length; i++) {
        if (tempCateIds[i] === 0) continue
        tempCateIdStrs += '-' + tempCateIds[i]
      }
      // 设置分类id
      newCateIds = tempCateIdStrs
      if (checkEmpty(tempCateIdStrs)) {
        tempCateIdStrs = '_' + tempCateIdStrs
      } else {
        tempCateIdStrs = ''
      }
      if (index !== 2) {
        hideEles('kindIndex', 'kindLi')
        for (let i = index + 1; i <= 3; i++) {
          hideEles('cateIndex' + i, 'cateLi' + i)
        }
      }

      // 列表
      if (!checkEmpty(cateId) || index === 2) {
        if (index === 2) {
          handoverTab('cateLi' + index)
          hideSib('cateIndex' + index)
          showEles('cateIndex' + index, 'cateLi' + index)
        }
      } else {
        let fetchUrl = 'https://m.cngold.org/xianhuo/m_more_hq_' + prefix + tempCateIdStrs + '.html'
        fetch(fetchUrl).then(function (res) {
          return res.json()
        }).then(function (data) {
          if (data.flag) {
            // 种类时
            if (data.data.models.kinds && data.data.models.kinds.length > 0) {
              let temp = ''
              let newEle
              let cateIndex = index + 1
              if (!$('kindIndex')) {
                newEle = document.createElement('dl')
                newEle.setAttribute('id', 'kindIndex')
              }
              if (isReset && oldCateIds.split('-').length === 2) {
                temp += '<dd data-value="0-不限' + '">不限</dd>'
              } else {
                temp += '<dd class="on" data-value="0-不限' + '">不限</dd>'
              }

              let kind = data.data.models.kinds
              for (let i = 0; i < kind.length; i++) {
                if (kind[i].selected === 1) {
                  temp += '<dd class="on" data-value="' + kind[i].kindId + '-' + kind[i].kindName + '">' + kind[i].kindName + '</dd>'
                } else {
                  temp += '<dd data-value="' + kind[i].kindId + '-' + kind[i].kindName + '">' + kind[i].kindName + '</dd>'
                }
              }

              if (!$('kindIndex')) {
                newEle.innerHTML = temp
                insertAfter(newEle, $('cateIndex' + index))
              } else {
                $('kindIndex').innerHTML = temp
              }

              if (!$('kindLi')) {
                let newLi = document.createElement('li')
                newLi.setAttribute('id', 'kindLi')
                newLi.innerHTML = data.data.models.selectCategorys[cateIndex].name
                insertAfter(newLi, $('cateLi' + index))
              } else {
                $('kindLi').innerHTML = data.data.models.selectCategorys[cateIndex].name
              }

              bindClick('kindIndex', filterKind)
              handoverTab('kindLi')
              hideSib('kindIndex')
              showEles('kindIndex', 'kindLi')
            } else {
              // 一般情况
              if (data.data.models.categorys && data.data.models.categorys.length > 0) {
                let temp = ''
                let newdl
                let cateIndex = index + 1
                if (!$('cateIndex' + cateIndex)) {
                  newdl = document.createElement('dl')
                  newdl.setAttribute('id', 'cateIndex' + cateIndex)
                }
                if (subId) {
                  temp += '<dd data-value=0-' + cateIndex + '">不限</dd>'
                } else {
                  temp += '<dd class="on" data-value=0-' + cateIndex + '">不限</dd>'
                }

                let kind = data.data.models.categorys
                for (let i = 0; i < kind.length; i++) {
                  if (kind[i].selected === 1 || subId === kind[i].id) {
                    temp += '<dd data-value=' + kind[i].id + '-' + cateIndex + '" class="on">' + kind[i].name + '</dd>'
                  } else {
                    temp += '<dd data-value=' + kind[i].id + '-' + cateIndex + '>' + kind[i].name + '</dd>'
                  }
                }

                if (!$('cateIndex' + cateIndex)) {
                  newdl.innerHTML = temp
                  if ($('kindIndex')) {
                    insertAfter(newdl, $('kindIndex'))
                  } else {
                    insertAfter(newdl, $('cateIndex' + index))
                  }
                } else {
                  $('cateIndex' + cateIndex).innerHTML = temp
                }

                if (!$('cateLi' + cateIndex)) {
                  let newLi = document.createElement('li')
                  newLi.setAttribute('id', 'cateLi' + cateIndex)
                  newLi.innerHTML = data.data.models.selectCategorys[cateIndex].name
                  if ($('kindLi')) {
                    insertAfter(newLi, $('kindLi'))
                  } else {
                    insertAfter(newLi, $('cateLi' + index))
                  }
                } else {
                  $('cateLi' + cateIndex).innerHTML = data.data.models.selectCategorys[cateIndex].name
                }

                bindClick('cateIndex' + cateIndex, filterCate)
                handoverTab('cateLi' + (index + 1))
                hideSib('cateIndex' + (index + 1))
                showEles('cateIndex' + (index + 1), 'cateLi' + (index + 1))
              } else {
                hideEles('cateIndex' + (index + 1), 'cateLi' + (index + 1))
              }
            }
          }
        })
      }
    }

    // 种类
    function filterKind (kindId, kindName, cateId, isReset) {
      // 分类
      let prefix = newPrefix
      console.log(newCateIds)
      // 已选择的分类ID 1-2-3
      let cateIds = newCateIds

      let tempCateIds = cateIds.split('-')
      let tempCateIdStrs = tempCateIds[0] ? tempCateIds[0] : ''
      for (let i = 1; i < tempCateIds.length; i++) {
        if (tempCateIds[i] === 0 || i >= 2) continue
        tempCateIdStrs += '-' + tempCateIds[i]
      }

      let index = 2
      hideEles('cateIndex' + index, 'cateLi' + index)

      // 列表
      let fetchUrl = 'https://m.cmgold.org/xianhuo/m_more_hq_' + prefix + '_' + tempCateIdStrs + '.html'
      fetch(fetchUrl).then(function (res) {
        return res.json()
      }).then(function (data) {
        if (data.flag) {
          if (data.data.models.categorys && data.data.models.categorys.length > 0) {
            let temp = ''
            let cateIndex = index
            let newdl
            if (!$('cateIndex' + cateIndex)) {
              newdl = document.createElement('dl')
              newdl.setAttribute('id', 'cateIndex')
            }
            if (!cateId) {
              temp += '<dd class="on" data-value="0-' + cateIndex + '">不限</dd>'
            } else {
              temp += '<dd data-value="0-' + cateIndex + '">不限</dd>'
            }

            let flag = false
            let kind = data.data.models.categorys
            for (let i = 0; i < kind.length; i++) {
              if (kind[i].kindId === kindId || kindId === 0) {
                if (kind[i].selected === 1 || cateId === kind[i].id) {
                  temp += '<dd data-value="' + kind[i].id + '-' + cateIndex + '" class="on">' + kind[i].name + '</dd>'
                } else {
                  temp += '<dd data-value="' + kind[i].id + '-' + cateIndex + '">' + kind[i].name + '</dd>'
                }
                flag = true
              }
            }
            if (flag) {
              if (!$('cateIndex' + index)) {
                insertAfter(newdl, $('kindIndex'))
              } else {
                $('cateIndex' + index).innerHTML = temp
              }

              if (!$('cateLi' + index)) {
                let newLi = document.createElement('li')
                newLi.setAttribute('id', 'cateLi' + index)
                newLi.innerHTML = kindName
                insertAfter(newLi, $('kindLi'))
              } else {
                $('cateLi' + index).innerHTML = kindName
              }

              bindClick('cateIndex', filterCate)
              handoverTab('cateLi' + index)
              hideSib('cateIndex' + index)
              showEles('cateIndex' + index, 'cateLi' + index)
            }
          }
        }
      })
    }
    // 省份
    function filterProvince (provinceId, cityId, isReset) {
      if (!checkEmpty(provinceId)) {
        hideEles('cityIndex', 'cityLi')
      } else {
        let fetchUrl = 'https://m.cngold.org/xianhuo/m_more_province' + provinceId + '-city0.html'
        fetch(fetchUrl).then(function (res) {
          return res.json()
        }).then(function (data) {
          if (data.flag) {
            if (data.data.models.cities && data.data.models.cities.length > 0) {
              let temp = ''
              let newdl
              if (!$('cityIndex')) {
                newdl = document.createElement('dl')
                newdl.setAttribute('id', 'cityIndex')
              }
              if ((!data.data.models.cityRegion || data.data.models.cityRegion.id === 0) && !cityId) {
                temp += '<dd class="on" >不限</dd>'
              } else {
                temp += '<dd>不限</dd>'
              }

              let c = data.data.models.cities
              for (let i = 0; i < c.length; i++) {
                if (i !== 0) {
                  if (c[i].selected || c[i].id === cityId) {
                    temp += '<dd data-value="' + c[i].id + '" class="on">' +
                      c[i].dataName + '</dd>'
                  } else {
                    temp += '<dd data-value="' + c[i].id + '" >' +
                      c[i].dataName + '</dd>'
                  }
                }
              }

              if (!$('cityIndex')) {
                newdl.innerHTML = temp
                insertAfter(newdl, $('provinceIndex'))
              } else {
                $('cityIndex').innerHTML = temp
              }

              if (!$('cityLi')) {
                let newLi = document.createElement('li')
                newLi.setAttribute('id', 'cityLi')
                newLi.innerHTML = data.data.models.provinceRegion.dataName
                insertAfter(newLi, $('provincesLi'))
              } else {
                $('cityLi').innerHTML = data.data.models.provinceRegion.dataName
              }

              bindClick('cityIndex', filterCity)
              handoverTab('cityLi')
              hideSib('cityIndex')
              showEles('cityIndex', 'cityLi')
            }
          }
        })
        // 设置省份id
        newProvinceId = provinceId
        newCityId = 0
        showEles('cityLi')
        hideEles('cityIndex')
      }
    }

    // 城市
    function filterCity (cityId, isReset) {
      // 设置城市ID
      newCityId = cityId
    }
    // 重置
    function resetCate () {
      if (oldCateIds === newCateIds && oldPrefix === newPrefix && oldProvinceId === newProvinceId && newCityId === oldCityId) return

      let cateIds = oldCateIds.split('-')
      // 重置顶级分类
      let subId = null
      if (cateIds && cateIds[0] && cateIds[0] !== '') {
        subId = cateIds[0]
      }
      filterPrefix(oldPrefix, subId, true)
      let e = $('prefixIndex').children
      for (let i = 0; i < e.length; i++) {
        if (e[i].getAttribute('data-value') === oldPrefix) {
          e[i].classList.add('on')
        } else {
          e[i].classList.remove('on')
        }
      }

      // 重置二级及以下分类，已选择的分类Id 1-2-3
      for (let i = 0; i < cateIds.length; i++) {
        let subId
        if (i + 1 < cateIds.length) {
          subId = cateIds[i + 1]
        }
        // 金属
        if (oldPrefix === 'metal' && i === 2) {
          // 重置种类
          setTimeout(() => {
            filterKind(0, '不限', cateIds[i], true)
          }, 50)
        }
        setTimeout(() => {
          filterCate(cateIds[i], i, subId, true)
        }, 100)
      }
      // 重置地区
      // 省
      if (oldPrefix === 'farm') {
        filterProvince(oldProvinceId, oldCityId, true)
        let a = $('provinceIndex').children
        for (let i = 0; i < a.length; i++) {
          let value = a[i].getAttribute('data-value')
          if (value === oldProvinceId) {
            a[i].classList.add('on')
          } else {
            a[i].classList.remove('on')
          }
        }
        // 市
        filterCity(oldCityId, true)
      }
    }

    // 确认
    function confirmCate () {
      let p
      let c
      let param = ''
      let cateIds = newCateIds
      let prefix = newPrefix

      if (prefix && prefix !== '') {
        if (prefix === 'farm') {
          p = newProvinceId
          c = newCityId
          param += '_province' + p
          param += '-city' + c
        }
        if (cateIds && cateIds.trim().length > 0 && cateIds !== '0') {
          param += '_' + cateIds
        }
        let newLink = 'https://m.cngold.org/xianhuo/m_hq_' +
          prefix + param + '.html'
        MIP.viewer.open(newLink, { isMipLink: false, replace: false })
      } else {
        let newLink = 'https://m.cngold.org/xianhuo/m_hangqing.html'
        MIP.viewer.open(newLink, { isMipLink: false, replace: false })
      }
    }

    // 地区筛选绑定点击事件
    bindClick('provinceIndex', filterProvince)
    // 顶级分类绑定点击事件
    bindClick('prefixIndex', filterPrefix)
    // 分类绑定点击事件
    for (let i = 0; i < 5; i++) {
      bindClick('cateIndex' + i, filterCate)
    }

    // 初始化状态
    let lastFlag = false
    let lastIndex = this.element.getAttribute('last-index')
    // 确认筛选
    $('confirm').addEventListener('click', function () {
      confirmCate()
    })
    // 重置
    $('reset').addEventListener('click', function () {
      resetCate()
    })

    let hdlis = $('left_tab').children[0].children
    let bddl = $('right_con').children[0].children

    // 初始化tab选中状态
    for (let i = 0; i < hdlis.length; i++) {
      if (hdlis[i].getAttribute('class') && hdlis[i].getAttribute('class').indexOf('lastc') > -1) {
        hdlis[i].classList.remove('lastc')
        handoverTab(hdlis[i].getAttribute('id'))

        for (let j = 0; j < bddl.length; j++) {
          bddl[j].style.display = 'none'
        }
        bddl[i].style.display = 'block'
        lastFlag = true
      }
    }
    if (!lastFlag) {
      handoverTab(hdlis[lastIndex].getAttribute('id'))
      for (let j = 0; j < bddl.length; j++) {
        bddl[j].style.display = 'none'
      }
      bddl[lastIndex].style.display = 'block'
    }
    // 去除右侧多余选中类名
    for (let n = 0; n < bddl.length; n++) {
      let dd = bddl[n].getElementsByClassName('on')
      if (dd.length > 1) {
        for (let m = 0; m < dd.length; m++) {
          if (dd[m].innerHTML.indexOf('不限') > -1) {
            dd[m].classList.remove('on')
          }
        }
      }
    }

    // 左侧绑定点击事件--事件委托
    $('left_tab').onclick = function (ev) {
      let e = ev || window.event
      let target = e.target || e.srcElement
      if (target.nodeName.toLowerCase() === 'li') {
        let choseId = 0
        for (let j = 0; j < hdlis.length; j++) {
          hdlis[j].classList.remove('on')
          if (hdlis[j].getAttribute('id') === target.getAttribute('id')) {
            choseId = j
          }
        }
        target.classList.add('on')
        for (let j = 0; j < bddl.length; j++) {
          bddl[j].style.display = 'none'
        }
        bddl[choseId].style.display = 'block'
      }
    }
  }
}
