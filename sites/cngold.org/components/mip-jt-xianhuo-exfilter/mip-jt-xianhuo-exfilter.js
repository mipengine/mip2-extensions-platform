export default class MIPJtXianhuoExfilter extends MIP.CustomElement {
  build () {
    let oldCityName = this.element.getAttribute('city-name') // 城市名称
    let oldProName = this.element.getAttribute('pro-name') // 省名
    let oldCityId = this.element.getAttribute('city-id') // 城市id
    let oldProId = this.element.getAttribute('pro-id') // 省id
    let seltypeId = this.element.getAttribute('seltype-id') // 类别

    let selCityId = 0 // 用于存放选择的城市id
    let selProId = 0 // 用于存放选择的省id

    // 定义$函数
    function $ (str) {
      return document.getElementById(str)
    }
    // 给定父元素id给子元素绑定事件
    function bindClick (id, fn) {
      let data = $(id).children
      for (let i = 0; i < data.length; i++) {
        data[i].addEventListener('click', function () {
          for (let j = 0; j < data.length; j++) {
            data[j].classList.remove('on')
          }
          data[i].classList.add('on')
          let params = data[i].getAttribute('data-value').split('-')
          fn(...params)
        })
      }
    }
    // 切换选中状态
    function handoverTab (id) {
      if ($(id)) {
        let lis = $(id).parentNode.children
        for (let i = 0; i < lis.length; i++) {
          if (lis[i].getAttribute('id') === id) {
            lis[i].classList.add('on')
          } else {
            lis[i].classList.remove('on')
          }
        }
      }
    }

    // 字母查询
    function getLetter (letter) {
      let fetchUrl = 'https://m.cngold.org/xianhuo/m_citys_firstletter.html?firstletter=' + letter
      fetch(fetchUrl).then((res) => {
        return res.json()
      }).then((data) => {
        if (data.flag) {
          let html = ''
          for (let i = 0; i < data.data.length; i++) {
            html += '<dd id="dd>' + data.data[i].id + '" data-value="' +
              data.data[i].id + '-' + data.data[i].parentId + '-' +
              data.data[i].dataName + '">' + data.data[i].dataName + '</dd>'
          }
          if (html === '') {
            $('res-box').style.display = 'none'
            $('nores-box').style.display = 'block'
          } else {
            $('res-box').style.display = 'block'
            $('nores-box').style.display = 'none'
          }
          $('hot-city').parentNode.style.display = 'none'
          $('citydl').innerHTML = html
          bindClick('citydl', selectCity)
        }
      })
    }

    // 城市查询
    function selectCity (cityid, provinceid, cityName) {
      selCityId = cityid
      selProId = provinceid
      handoverTab('dd' + cityid)
      // 设置当前已选择城市
      if (cityName && cityName !== '不限') {
        $('selectCity').innerHTML = cityName
      }
      if (cityid === '0') {
        $('selectCity').innerHTML = oldProName
      }
    }

    // 获取省下面的市
    function getCitys (provinceId, provinceName) {
      let fetchUrl = 'https://m.cngold.org/xianhuo/m_citys_provinceId.html?provinceId=' + provinceId
      fetch(fetchUrl).then((res) => {
        return res.json()
      }).then((data) => {
        if (data.flag) {
          let html = ''
          let id = data.data[0].id
          let pId = data.data[0].parentId
          for (let i = 0; i < data.data.length; i++) {
            html += '<dd id="dd' + data.data[i].id + '" data-value="' + data.data[i].id + '-' +
              data.data[i].parentId + '-' + data.data[i].dataName + '">' +
              data.data[i].dataName + '</dd>'
          }
          $('zimu').parentNode.style.display = 'none'
          $('hot-city').parentNode.style.display = 'none'
          $('citydl').innerHTML = html
          bindClick('citydl', selectCity)
          selectCity(id, pId, provinceName)
        }
      })
    }

    // 初始化
    // 1,字母的点击查询
    let zimu = $('zimu').children
    for (let i = 0; i < zimu.length; i++) {
      zimu[i].addEventListener('click', function () {
        for (let j = 0; j < zimu.length; j++) {
          zimu[j].classList.remove('on')
        }
        zimu[i].classList.add('on')
        $('hot-city').parentNode.style.display = 'none'
        $('area-filter').style.display = 'none'
        getLetter(zimu[i].innerHTML)
        $('res-box').style.display = 'block'
        $('nores-box').style.display = 'none'
      })
    }
    // 2，地区的点击
    let area = $('area-filter').getElementsByTagName('dd')
    for (let i = 0; i < area.length; i++) {
      area[i].addEventListener('click', function () {
        $('selectCity').innerHTML = this.innerHTML
        $('area-filter').style.display = 'none'
        let proid = this.getAttribute('province')
        getCitys(proid, this.innerHTML)
        $('res-box').style.display = 'block'
        $('nores-box').style.display = 'none'
      })
    }
    // 3,热门城市绑定点击事件
    bindClick('hot-city', selectCity)
    // 4，确认筛选
    $('confirm').addEventListener('click', function () {
      let cityId = selCityId
      let provinceid = selProId
      let selecttypeid = seltypeId
      let url = 'https://m.cngold.org/xianhuo/m_jiaoyisuo_province' +
        provinceid + '_city' + cityId + '_' + selecttypeid + '_v0.html'
      MIP.viewer.open(url, { isMipLink: false, replace: false })
    })
    // 5,重置
    $('reset').addEventListener('click', function () {
      $('res-box').style.display = 'none'
      $('nores-box').style.display = 'none'
      $('zimu').parentNode.style.display = 'block'
      $('hot-city').parentNode.style.display = 'block'
      $('area-filter').style.display = 'block'
      // 去除选中类名
      if ($('zimu').getElementsByClassName('on')[0]) {
        $('zimu').getElementsByClassName('on')[0].classList.remove('on')
      }
      if ($('hot-city').getElementsByClassName('on')[0]) {
        $('hot-city').getElementsByClassName('on')[0].classList.remove('on')
      }

      selCityId = oldCityId
      selProId = oldProId

      if (oldCityId && oldCityName) {
        $('selectCity').innerHTML = oldCityName
      } else if (oldProId) {
        $('selectCity').innerHTML = oldProName
      }
    })
  }
}
