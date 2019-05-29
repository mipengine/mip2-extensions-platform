/**
 * @file mip-tbs-alert 组件
 * @author jingjing
 */
import './mip-tbs-alert.less'
export default class MIPTbsalert extends MIP.CustomElement {
  build () {
    // 省份
    const province = [
      {
        id: 12,
        name: 'A 安徽'
      }, {
        id: 33,
        name: 'A 澳门'
      }, {
        id: 1,
        name: 'B 北京'
      }, {
        id: 22,
        name: 'C 重庆'
      }, {
        id: 13,
        name: 'F 福建'
      }, {
        id: 19,
        name: 'G 广东'
      }, {
        id: 20,
        name: 'G 广西'
      }, {
        id: 24,
        name: 'G 贵州'
      }, {
        id: 28,
        name: 'G 甘肃'
      }, {
        id: 3,
        name: 'H 河北'
      }, {
        id: 8,
        name: 'H 黑龙江'
      }, {
        id: 16,
        name: 'H 河南'
      }, {
        id: 17,
        name: 'H 湖北'
      }, {
        id: 18,
        name: 'H 湖南'
      }, {
        id: 21,
        name: 'H 海南'
      }, {
        id: 6,
        name: 'L 辽宁'
      }, {
        id: 7,
        name: 'J 吉林'
      }, {
        id: 10,
        name: 'J 江苏'
      }, {
        id: 14,
        name: 'J 江西'
      }, {
        id: 5,
        name: 'N 内蒙古'
      }, {
        id: 30,
        name: 'N 宁夏'
      }, {
        id: 29,
        name: 'Q 青海'
      }, {
        id: 4,
        name: 'S 山西'
      }, {
        id: 9,
        name: 'S 上海'
      }, {
        id: 15,
        name: 'S 山东'
      }, {
        id: 23,
        name: 'S 四川'
      }, {
        id: 27,
        name: 'S 陕西'
      }, {
        id: 2,
        name: 'T 天津'
      }, {
        id: 34,
        name: 'T 台湾'
      }, {
        id: 26,
        name: 'X 西藏'
      }, {
        id: 31,
        name: 'X 新疆'
      }, {
        id: 32,
        name: 'X 香港'
      }, {
        id: 25,
        name: 'Y 云南'
      }, {
        id: 11,
        name: 'Z 浙江'
      }
    ]
    // 当前所在省份
    let currentProvince = ''
    // 当前所在城市
    let currentCity = ''
    // 所有城市信息
    let allCity = []
    // 组合(省，市)信息
    let currentAddress = ''
    // 禁止表单多次提交 false--不能被请求
    let formsubmit = true
    let _this = this
    getCurrentCity()
    /*
     * 点击提交按钮， 表单提示方法
     * @param {"string"} type 类型
     * @param {"string"} content 内容
     */
    function tipsMess (type, content) {
      switch (type) {
        // 验证表单填写信息
        case 'checking':
          let globalForm = _this.element.querySelector('.global-form')
          let div = document.createElement('div')
          // 提示弹窗
          let tipsWindows = `<div class="tips-content"> ${content} </div>`
          div.innerHTML = tipsWindows
          globalForm.appendChild(div)
          setTimeout(function () {
            let tipsContent = _this.element.querySelector('.tips-content')
            tipsContent.parentElement.innerHTML = ''
          }, 500)
          break
          // 请求结果信息
        case 'result':
          break
        default:
          break
      }
    }
    /**
     * 获取用户所在城市信息的方法
     */
    function getCurrentCity () {
      fetch('https://www.tobosu.com/tapi/api/getIpCityInfo')
        .then(function (res) {
          return res.json()
        })
        .then(function (data) {
          // 若没有返回值，默认为11--浙江 宁波
          currentProvince = data.data.province_id ? data.data.province_id : 11
          currentCity = data.data.city_id ? data.data.city_id : 88
          // 获取当前所在城市昵称
          let provinceName = idChangeName(province, 'id', currentProvince, 'name')
          // 获取所有城市信息
          fetch('https://www.tobosu.com/tapi/Smallprogram/getCityData')
            .then(function (res) {
              return res.json()
            })
            .then(function (data) {
              allCity = data.cityData
              // 将当前城市信息写入input (可以不用这个input隐藏域--可删掉。)
              _this.element.querySelector('input[name="province"]').setAttribute('value', currentProvince)
              _this.element.querySelector('input[name="city"]').setAttribute('value', currentCity)
              for (let i = 0; i < allCity.length; i++) {
                if (allCity[i].city_id * 1 === currentCity * 1) {
                  _this.element.querySelector('input[name="citygrade"]').setAttribute('value', allCity[i].city_grade)
                }
              }
              // citygrade
              let cityName = idChangeName(data.cityData, 'city_id', currentCity, 'full_name')
              currentAddress = provinceName + ' ' + cityName
              document.getElementsByClassName('custom-province-city')[0].innerHTML = currentAddress
            }).catch(function () {})
        }).catch(function () {})
    }
    /*
     * 根据省份获取城市信息的方法
     * @param {"string"} proviceId 省份id
     * @returns {"array"} list 所在省城市信息列表
     */
    function setProvicegetCity (proviceId) {
      let list = []
      for (let i = 0; i < allCity.length; i++) {
        if (allCity[i].province_id === proviceId * 1) {
          list.push(allCity[i])
        }
      }
      return list
    }
    /*
     * 拼接省市昵称的方法
     * @param {"array"} dataSource 数据源
     * @param {"string"} mate 查找的字段
     * @param {"number"} targId 匹配值
     * @param {"string"} resName 返回的结果值
     * @returns {"string"} res 拼接后的昵称
     */
    function idChangeName (dataSource, mate, targId, resName) {
      let res = ''
      for (let i = 0; i < dataSource.length; i++) {
        if (dataSource[i][mate] === targId * 1) {
          res += dataSource[i][resName].replace(/[A-Z]/, '').replace(/^\s+|\s+$/g, '')
        }
      }
      return res
    }
    /*
     * 格式化表单提交的方法
     * @param {"object"} obj 转换对象
     * @returns {"string"} PARAMS_ARRAY.join 格式化后的结果内容
     */
    function joinRequestParams (obj) {
      const PARAMS_ARRAY = []
      // 拼接参数
      Object.keys(obj).forEach(function (key) {
        PARAMS_ARRAY.push(key + '=' + obj[key])
      })
      return PARAMS_ARRAY.join('&')
    }
    /*
     * 表单提交成功后,渲染报价的方法
     * @returns {"object"}  报价对象内容
     */
    function renderData () {
      // 金钱
      let money = 0
      // 装修方式
      let zxType = _this.element.querySelectorAll('input[name="zx_type"]').length > 0 ? _this.element.querySelector('input[name="zx_type"]').value : 1
      // 城市等级 citygrade
      let citygrade = _this.element.querySelector('input[name="citygrade"]').value
      // 面积
      let housearea = _this.element.querySelector('.house').length > 0 ? _this.element.querySelector('.house').value : 1
      // 装修程度
      let decdegree = _this.element.querySelectorAll('input[name="decdegree"]').length > 0 ? _this.element.querySelector('input[name="decdegree"]').value : 2
      // 根据装修方式，城市等级得出基本价格
      // 全包
      if (zxType * 1 === 2) {
        switch (citygrade) {
          case 2:
            money = 860
            break
          case 3:
            money = 980
            break
          case 4:
            money = 1050
            break
          default:
            money = 750
            break
        }
      } else {
        // 半包
        switch (citygrade) {
          case 2:
            money = 440
            break
          case 3:
            money = 480
            break
          case 4:
            money = 550
            break
          default:
            money = 380
            break
        }
      }
      // 乘以面积
      money *= housearea
      // 乘以装修程度
      switch (decdegree) {
        case 1:
          money *= 0.78
          break
        case 3:
          money *= 1.58
          break
        default:
          money *= 1
          break
      }
      // 返回值
      return {
        total: money,
        material: Math.round(money * 2 / 5),
        manMake: Math.round(money * 3 / 5),
        design: housearea * 100,
        quality: 3500
      }
    }
    // 定义弹窗模板
    let mould = `
      <mip-fixed still class="global-window">
        <div class="global-inner" >
            <div class="top-close">
              <mip-img layout="responsive"  width="48" height="120" src="https://front.tobosu.com/static/mask/images/Q&A-home-folat-x-icon.png"></mip-img>
            </div>
            <div class="step-first">
              <div class="global-title clearfix">
                <div class="img-left-warp">
                  <mip-img layout="responsive"  width="289" height="237" src="https://front.tobosu.com/static/mask/images/float-02-image.png"></mip-img>
                </div>
                <div class="img-right-warp">
                  <span>装修要花多少钱</span>
                  <span>10秒估算|装修不花冤枉钱</span>
                </div>
              </div>
              <div class="global-form">
                <mip-form class="submit-form">
                    <div class="global-row">
                        <span>房屋所在地</span>
                        <span type="text"  class="custom-province-city"  >请选择您房屋所在的城市</span>
                        <input name="province" type="hidden" value="">
                        <input name="city" type="hidden" value="">
                        <input name="citygrade" type="hidden" value="">
                        <span class="right-arrow"></span>
                    </div>
                    <div class="global-row">
                        <span>房屋面积</span>
                        <input type="text" placeholder="请输入房屋面积" class="house"  maxLength="4" />
                        <span>㎡</span>
                    </div>
                    <div class="global-row">
                        <span>联系方式</span>
                        <input type="text" placeholder="输入手机号码 获取报价明细" class="call" />
                    </div>
                    <input type="hidden" name="comeurl" value="">
                    <input type="hidden" name="source" value="1547">
                    <button type="button" class="global-getBtn" data-ptag="10_1_1_3_1">免费获取报价明细</button>
                </mip-form>
              </div>
            </div>
            <div class="pop-num-result result hide">
                <span>您家的装修预算（半包）</span>
                <span><span class="total">998</span>元</span>
                <ul>
                    <li>
                        <span>材料费</span>
                        <span><span class="material">998</span>元</span>
                        <span></span>
                    </li>
                    <li>
                        <span>人工费</span>
                        <span><span class="manMake">998</span>元</span>
                        <span></span>
                    </li>
                    <li>
                        <span>设计费</span>
                        <span><span>0</span>元</span>
                        <span>立省<span class="design">998</span>元</span>
                    </li>
                    <li>
                        <span>质检费</span>
                        <span><span>0</span>元</span>
                        <span>立省<span class="quality">998</span>元</span>
                    </li>
                </ul>
                <div class="pop-publi-btn pop-public-btn">确定</div>
                <span>* 该报价为毛坯半包价，实际装修报价以量房为准</span>
                <span>* 报价有疑问？稍后土拨鼠装修管家将来电为您解答</span>
              </div>
            </div>
        </div>
      </mip-fixed>
    `
    // 缓存弹窗是否出现的时间
    if (localStorage.getItem('currentHours')) {
      // 如果有
      let localHours = localStorage.getItem('currentHours')
      // 获取现在时间
      let newHours = new Date().getTime()
      // 相差时间
      let disTime = newHours - localHours
      let oneHoursTime = 60 * 60 * 1000
      if (disTime >= oneHoursTime) {
        // 显示弹窗
        _this.element.innerHTML = mould
        // 更新时间
        localStorage.setItem('currentHours', newHours)
      } else {
        let timeOut = oneHoursTime - disTime
        setTimeout(function () {
          // 显示弹窗
          _this.element.innerHTML = mould
          // 更新时间
          let currentTime = new Date().getTime()
          localStorage.setItem('currentHours', currentTime)
        }, timeOut)
      }
    } else {
      // 如果没有，记录当前小时 存入毫秒单位
      let hours = new Date().getTime()
      localStorage.setItem('currentHours', hours)
      // 显示弹窗
      _this.element.innerHTML = mould
    }
    // 点击选择城市出现的弹窗
    if (_this.element.querySelector('.custom-province-city')) {
      let provincecity = _this.element.querySelector('.custom-province-city')
      provincecity.onclick = function () {
        let model = '<mip-fixed still>' +
                      '<div class="m-area-select-background">' +
                        '<div class="close-menu">' +
                          '点<br>击<br>此<br>处<br>收<br>起' +
                        '</div>' +
                      '</div>' +
                      '<div class="m-area-select-obj">' +
                        '<div class="area-select area-province">' +
                          '<ul class="area-select-province"></ul>' +
                        '</div>' +
                        '<div class="area-select area-city">' +
                          '<ul class="area-select-city">' +
                          '</ul>' +
                        '</div>' +
                      '</div>' +
                    '<mip-fixed>'
        let div = document.createElement('div')
        div.setAttribute('class', 'm-area-select2')
        div.innerHTML = model
        _this.element.appendChild(div)
        // 写入省信息
        let provinceHtml = ''
        let $par = _this.element.querySelector('.m-area-select2')
        // let $par = $('.m-area-select2')
        for (let i = 0, len = province.length; i < len; i++) {
          let nameArr = province[i]['name'].split(' ')
          provinceHtml += '<li value ="' + province[i]['id'] + '">' +
            '<span class = "initial">' + nameArr[0] + '</span>' + nameArr[1] +
          '</li>'
        }
        let selectProvince = _this.element.querySelector('.area-select-province')
        selectProvince.innerHTML = provinceHtml
        // 设置默认选中省份
        let provParent = selectProvince.querySelectorAll('li')
        for (let i = 0; i < provParent.length; i++) {
          if (provParent[i].getAttribute('value') * 1 === currentProvince * 1) {
            let _this = provParent[i]
            _this.classList.add('on')
          }
        }
        // 写入城市信息
        let checkProvince = selectProvince.querySelector('.on').getAttribute('value')
        let cityHtml = ''
        for (let j = 0; j < allCity.length; j++) {
          if (allCity[j].province_id === checkProvince * 1) {
            let val = allCity[j]['city_id']
            let datCity = allCity[j]['city_grade']
            let fullName = allCity[j]['full_name']
            cityHtml += '<li value="' + val + '" data-citygrade="' + datCity + '">' + fullName + '</li>'
          }
        }
        let selectCity = $par.querySelector('.area-select-city')
        selectCity.innerHTML = cityHtml
        // 设置默认选中城市 currentCity
        let cityList = selectCity.querySelectorAll('li')
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].getAttribute('value') * 1 === currentCity * 1) {
            let _this = cityList[i]
            _this.classList.add('on')
          }
        }
        // 点击获取触摸点
        let moveMark = false
        let startY = -1
        let originY = -1
        let time = 0
        let stopTime = 0
        let areaSelect = _this.element.querySelectorAll('.area-select')
        let li = ''
        for (let i = 0; i < areaSelect.length; i++) {
          areaSelect[i].addEventListener('touchstart', function (e) {
            let targetDom = e.target
            e.preventDefault()
            startY = e.targetTouches[0].pageY
            originY = e.targetTouches[0].pageY
            // 如果点到的是li下的div
            if (targetDom.getAttribute('class') === 'area-select-option') {
              li = targetDom.parentElement
            } else if (targetDom.parentElement.getAttribute('class') === 'area-select-option') {
              li = targetDom.parentElement.parentElement
            } else {
              li = targetDom
            }
            time++
            if (time > 20 && !li.classList.contains('area-background-tab')) {
              li.classList.add('area-background-tab')
            }
            stopTime = setInterval(function () {
              time++
              if (time > 20 && !li.classList.contains('area-background-tab')) {
                li.classList.add('area-background-tab')
              }
            }, 10)
          })
          // 下拉选项里面如果是上下滑动不触发点击
          areaSelect[i].addEventListener('touchmove', function (e) {
            // 当前触发事件的元素
            let classNames = e.currentTarget.classList[1]
            let select = _this.element.querySelector(`.${classNames}`)
            // 触发元素下的ul
            let ul = select.querySelector('ul')
            // 移动后的Y坐标
            let moveY = e.targetTouches[0].pageY
            // 移动的位置 ++↑  --↓
            let move = startY - moveY
            // 当前作为窗口的高度
            let heightSelect = select.clientHeight
            // 窗口里面内容的高度
            let heightUl = ul.clientHeight
            // 两个容器高度差就是ul最大移动距离
            let height = heightSelect - heightUl
            let transform = ul.style.transform.replace(/^translateY\(|,\s*|\)$/gi, '').split('px')
            let top = transform[0]
            if (moveY !== startY) {
              moveMark = true
              // 将当前移动的坐标覆盖开始值
              startY = moveY
            }
            if (Math.abs(startY - originY) >= 4) {
              clearInterval(stopTime)
            }
            if (height < 0) {
              // 高度差大于0则说明窗口里面内容不用移动
              if (e.targetTouches[0].clientY <= -1 && top <= height) {
                ul.classList.add('transition-select')
                ul.style.webkitTransform = 'translateY(' + height + 'px)'
                ul.style.transform = 'translateY(' + height + 'px)'
                ul.setAttribute('top', height)
                // ul.classList.remove('transition-select')
                setTimeout(function () {
                  ul.classList.remove('transition-select')
                }, 500)
                return
              }
              // 如果移动后top大于0则为0   移动后top小于高度差说明移动到最大距离
              let m = (top - move) >= 86 ? 86 : (top - move) <= (height - 86) ? (height - 86) : (top - move)
              ul.setAttribute('top', m)
              ul.style.webkitTransform = 'translateY(' + m + 'px)'
              ul.style.transform = 'translateY(' + m + 'px)'
            }
          })
          // 触摸离开
          areaSelect[i].addEventListener('touchend', function (e) {
            // 如果是上下滑动不执行后续动作
            let __this = this
            time = 0
            clearInterval(stopTime)
            let classNames = e.currentTarget.classList[1]
            let select = _this.element.querySelector(`.${classNames}`)
            let ul = select.querySelector('ul')
            let height = __this.clientHeight - ul.clientHeight
            ul.classList.add('transition-select')
            if (ul.getAttribute('top') >= 0) {
              ul.style.webkitTransform = 'translateY(0px)'
              ul.style.transform = 'translateY(0px)'
              ul.setAttribute('top', 0)
            } else if (ul.getAttribute('top') <= height) {
              ul.style.webkitTransform = 'translateY(' + height + 'px)'
              ul.style.transform = 'translateY(' + height + 'px)'
              ul.setAttribute('top', height)
            }
            setTimeout(function () {
              ul.classList.remove('transition-select')
            }, 500)
            if (e.currentTarget.classList.contains('area-background-tab')) {
              e.currentTarget.classList.remove('area-background-tab')
            }
            // $(e.currentTarget).find('.area-background-tab').removeClass('area-background-tab')
            if (moveMark && Math.abs(startY - originY) >= 4) {
              moveMark = false
              return
            }
            // 点击省份
            if (li.parentElement.classList.contains('area-select-province')) {
              currentProvince = li.getAttribute('value')
              li.parentElement.querySelector('.on').classList.remove('on')
              li.classList.add('on')
              // 重新获取城市 province_id
              let newList = setProvicegetCity(currentProvince)
              // 根据选择渲染城市信息
              let newCityHtml = ''
              for (let j = 0; j < newList.length; j++) {
                let cityId = newList[j]['city_id']
                let cityGrade = newList[j]['city_grade']
                let fullName = newList[j]['full_name']
                newCityHtml += '<li value="' + cityId + '" data-citygrade="' + cityGrade + '" >' + fullName + '</li>'
              }
              let selectCity = _this.element.querySelector('.area-select-city')
              selectCity.style.webkitTransform = 'translateY(0)'
              selectCity.innerHTML = newCityHtml
            }
            // 点击城市
            if (li.parentElement.classList.contains('area-select-city')) {
              currentCity = li.getAttribute('value')
              li.parentElement.querySelector('.on') && li.parentElement.querySelector('.on').classList.remove('on')
              li.classList.add('on')
              let selectObj = $par.querySelector('.m-area-select-obj')
              selectObj.style.left = '100%'
              $par.parentElement.removeChild(_this.element.querySelector('.m-area-select2'))
              // 回写信息
              _this.element.querySelector('input[name="province"]').setAttribute('value', currentProvince)
              _this.element.querySelector('input[name="city"]').setAttribute('value', currentCity)
              _this.element.querySelector('input[name="citygrade"]').setAttribute('value', li.getAttribute('data-citygrade'))
              let provinceName = idChangeName(province, 'id', currentProvince, 'name')
              let cityName = idChangeName(allCity, 'city_id', currentCity, 'full_name')
              currentAddress = provinceName + ' ' + cityName
              _this.element.querySelector('.custom-province-city').innerHTML = currentAddress
            }
          })
        }
        _this.element.querySelector('.m-area-select-background') && _this.element.querySelector('.m-area-select-background').addEventListener('click', function () {
          _this.element.querySelector('.m-area-select-obj').style.left = '100%'
          _this.element.removeChild(_this.element.querySelector('.m-area-select2'))
        })
      }
    }
    // 关闭整个弹窗
    _this.element.querySelector('.top-close') && _this.element.querySelector('.top-close').addEventListener('click', function () {
      _this.element.style.display = 'none'
    })
    // 提交表单
    if (_this.element.querySelector('.global-getBtn')) {
      let globalForm = _this.element.querySelector('.global-getBtn')
      globalForm && globalForm.addEventListener('click', function () {
        // 组合数据
        // 获取房屋所在地
        let province = !_this.element.querySelector('input[name="province"]').getAttribute('value') === '' ? _this.element.querySelector('input[name="province"]').getAttribute('value') : currentProvince
        let city = !_this.element.querySelector('input[name="city"]').getAttribute('value') === '' ? _this.element.querySelector('input[name="city"]').getAttribute('value') : currentCity
        // 获取面积信息
        let houseArea = _this.element.querySelector('.house').value
        // 获取手机号
        let callres = _this.element.querySelector('.call').value
        let callReg = /^1[3-9][0-9]{9}$/
        let isNext = true
        // 验证
        // 房屋面积
        if (houseArea === '') {
          tipsMess('checking', '房屋面积不能为空')
          isNext = false
          return
        } else if (houseArea <= 0) {
          tipsMess('checking', '请输入正确的房屋面积')
          isNext = false
          return
        } else if (!callReg.test(callres)) {
          tipsMess('checking', '请输入正确的手机号码')
          isNext = false
          return
        }
        // 提交验证
        if (isNext) {
          let formdata = {
            province: province,
            city: city,
            cellphone: callres,
            comeurl: '',
            source: _this.element.querySelector('input[name=\'source\']').getAttribute('value'),
            pageTag: _this.element.querySelector('.global-getBtn').getAttribute('data-ptag'),
            houseArea: houseArea
          }
          _this.innerHTML = '提交中,请稍后'
          if (formsubmit === false) return
          fetch('https://www.tobosu.com//tapi/order/pub_order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors',
            body: joinRequestParams(formdata)
          }).then(function (res) {
            let result = renderData()
            // 写入报价信息
            _this.element.querySelector('.total').innerHTML = result.total
            _this.element.querySelector('.design').innerHTML = result.design
            _this.element.querySelector('.quality').innerHTML = result.quality
            _this.element.querySelector('.manMake').innerHTML = result.manMake
            _this.element.querySelector('.material').innerHTML = result.material
            return res.json()
          }).then(function (data) {
            formsubmit = true
            if (data.error_code === 0) {
              // 请求成功后，渲染报价明细
              _this.element.querySelector('.step-first').style.display = 'none'
              _this.element.querySelector('.result').style.display = 'block'
            } else {
              tipsMess('checking', data.msg)
            }
          })
          formsubmit = false
        }
      })
    }
    _this.element.querySelector('.pop-publi-btn') && _this.element.querySelector('.pop-publi-btn').addEventListener('click', function () {
      _this.element.style.display = 'none'
    })
  }
}
