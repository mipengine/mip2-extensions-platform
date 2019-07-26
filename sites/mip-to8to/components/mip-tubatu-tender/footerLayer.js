import util from './../../common/util.js'
const fetchJsonp = require('fetch-jsonp')

class FooterLayer {
  constructor (art) {
    this.art = art
    this.closeBoxMove = false
    // 防重复提交标识
    this.repeatFlag = false
    this.moveObj = {
      isMove: false,
      startY: 0,
      endY: 0
    }
    this.autoShow = false
    this.slideTimes = 0
  }

  // 报错提示
  errorLayer (text) {
    let errorTime
    Array.prototype.forEach.call(document.querySelectorAll('.error-layer'), (item) => {
      item.remove()
    })
    const errNode = document.createElement('div')
    errNode.className = 'error-layer'
    errNode.innerHTML = text
    // let errstr = `<div class="error-layer">${text}</div>`
    // (errstr).appendTo('body')
    document.body.appendChild(errNode)

    // document.querySelector('.errorTips').style.display = 'block'

    clearInterval(errorTime || 0)
    errorTime = setTimeout(
      () => {
        Array.prototype.forEach.call(document.querySelectorAll('.error-layer'), (item) => {
          item.remove()
        })
      }, 2e3)
  }

  createGuid () {
    let a = ''
    let c = 1
    for (a = '', c = 1; c <= 32; c++) {
      let b = Math.floor(16 * Math.random()).toString(16)
      a = a + b
      if (c === 8 || c === 12 || c === 16 || c === 20) {
        a += ''
      }
    }
    return (a += Math.ceil(1E6 * Math.random()))
  }

  sjCheckForm (ptag, applyType) {
    const mfsjPhone = document.querySelector('.active-anim .common-phone').value
    const mfsjCity = document.querySelector('.active-anim .common-city').value || ''
    const addArr = mfsjCity.split(' ')
    let uuid = this.createGuid()

    if (mfsjCity.length === 0) {
      this.errorLayer('请输入城市')
      return false
    }
    if (mfsjPhone.length === 0) {
      this.errorLayer('请输入号码')
      return false
    }
    if (!(/^(1[3-9])\d{9}$/.test(mfsjPhone))) {
      this.errorLayer('请输入正确的手机号码')
      return false
    }
    const sendData = `shen=${addArr[0]}&city=${addArr[1]}&phone=${mfsjPhone}&ptag=${ptag}&apply_type=${applyType}&modeltype=6&not_send_mobile_msg=1&uuid=${uuid}`
    if (!this.repeatFlag) {
      this.repeatFlag = true
      fetchJsonp(`//to8tozb.to8to.com/zb/zb-index-get.php?${sendData}`, {
        jsonpCallbackFunction: 'jsonpCallback'
      })
        .then((response) => response.json())
        .then((res) => {
          this.repeatFlag = false
          if (res.status === 1) {
            document.querySelector('.common-phone').value = ''
            if (util.hasClass(document.querySelector('.active-anim'), 'lhb-form-box')) {
              window.location.href = 'https://m.to8to.com/tubatu/decouponLhbsuccess.html'
            } else {
              let mfsjLayer = document.querySelector('.mfsj-layer-box')
              if (!mfsjLayer) {
                mfsjLayer = document.createElement('div')
                mfsjLayer.className = 'mfsj-layer-box'
                const str = `<img src="//static.to8to.com/wap/static/images/decorate_learning/ico_succes.png">
                         <h2>预约成功</h2>
                         <p class="mfsj-kf-text tell-text">预约成功，稍后客服管家将致电与您确认您的预留信息</p>
                         <a href="javascript:void(0);" class="mfsj-close-box">好的</a>`
                mfsjLayer.innerHTML = str
                util.addClass(document.querySelector('.layerout'), 'layerout-z')
                document.body.appendChild(mfsjLayer)
                // 插入节点与绑定事件只执行一次
                document.body.querySelector('.mfsj-close-box').addEventListener('click', () => {
                  util.removeClass(document.querySelector('.layerout'), 'layerout-z')
                  document.querySelector('.mfsj-layer-box').style.display = 'none'
                  this.closeBox()
                })
              } else {
                util.addClass(document.querySelector('.layerout'), 'layerout-z')
                mfsjLayer.style.display = 'block'
              }
            }
          }
          if (res.status === 5) {
            // errorLayer('非常抱歉，您当前的城市' + addArr[1] + '尚未开通免费设计服务，敬请期待！');
            alert('当前城市未开通')
          }
          if (res.status === 3) {
            this.errorLayer('您的手机号码已重复申请超过5次')
          }
        }).catch((err) => {
          console.log(err)
        })
    }
  }

  resultZbBox (data) {
    const fruitHtml = document.createElement('div')
    fruitHtml.className = 't8s-alert-box'
    const str = `<div class="t8s-box">
                    <div class="alert-lay">
                        <div class="overlay-bd">
                            <a href="javascript:void(0);" class="t8s-alert-close" data-pg="">
                                <i class="t8s-alert-i" data-pg=""></i>
                            </a>
                            <div class="t8s-content-box">
                                <div class="t8s-fruit-price">
                                    <p class="column">您家的装修预算为</p>
                                    <p class="price-text-one">
                                        <span>${(data.to8to_totle_price / 10000).toFixed(1)}</span>
                                        <i>万元</i>
                                    </p>
                                </div>
                                <div class="t8s-price-list">
                                    <ul>
                                        <li class="tpl-li clearfix"><span class="t8s-budget-span">材料费：</span>
                                            <span><em>${data.to8to_cl_price}</em>元</span></li>
                                        <li class="tpl-li clearfix"><span class="t8s-budget-span">人工费： </span>
                                            <span><em>${data.to8to_rg_price}</em>元</span></li>
                                        <li class="tpl-li clearfix"><span class="t8s-budget-span">设计费：</span>
                                            <span><em>0</em>元<del class="to8to_zj">${data.normal_sj_price}元</del></li>
                                        <li class="tpl-li clearfix"><span class="t8s-budget-span">质检费：</span>
                                            <span><em>0</em>元<del class="to8to_zj">${data.normal_zj_price}元</del></li>
                                    </ul>
                                </div>
                                <div class="holiday-text-t6s">
                                    <p>*报价有疑问？稍后土巴兔将致电为您解答。</p>
                                    <p>*报价为毛坯半包价，实际以量房实测为准。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    fruitHtml.innerHTML = str
    document.body.appendChild(fruitHtml)

    // 关闭报价弹框
    document.body.querySelector('.t8s-alert-close i').addEventListener('click', (e) => {q
      document.querySelector('.t8s-alert-box').remove()
      this.closeBox()
    })
  }

  zxbjCheckform () {
    const quare = document.querySelector('#quare').value
    const phone = document.querySelector('#newphone').value
    const address = document.querySelector('#newcity').value || ''
    // const phone = document.querySelector('#newphone').value
    const addArr = address.split(' ')
    const ptag = document.querySelector('#zxbj_pg').value
    const fang = document.querySelector('#secshi').value
    const ting = document.querySelector('#secting').value
    const wei = document.querySelector('#secwei').value
    const chu = document.querySelector('#secchu').value
    const yangtai = document.querySelector('#secyangtai').value
    const oreafloat = /^\d{0,8}\.?(\d{1,2})?$/
    const uuid = this.createGuid()

    if (address.length < 2) {
      this.errorLayer('请选择您所在的城市')
      return false
    }
    if (quare === '') {
      this.errorLayer('请输入您的房屋面积')
      return false
    }
    if (!oreafloat.test(quare)) {
      this.errorLayer('房屋面积不能超过两位小数')
      return false
    }
    if ((quare < 5 && quare >= 0) || (quare > 1000)) {
      this.errorLayer('房屋面积必须在5-1000范围')
      return false
    }
    if (phone === '' || phone === undefined) {
      this.errorLayer('请输入您的手机号码')
      return false
    }
    const telRegexp = /^(1[3-9])\d{9}$/
    if (!telRegexp.test(phone)) {
      this.errorLayer('请输入正确的手机号码!')
      return false
    }

    const sendData = `ptag=${ptag}&square=${quare}&shen=${addArr[0]}&city=${addArr[1]}&shi=${fang}&ting=${ting}&phone=${phone}&wei=${wei}&yangtai=${yangtai}&chu=${chu}&modeltype=8&uuid=${uuid}&method=baojiaZb`

    if (!this.repeatFlag) {
      this.repeatFlag = true
      fetchJsonp(`//to8tozb.to8to.com/zb/zb-index-get.php?${sendData}`, {
        jsonpCallbackFunction: 'jsonpCallback'
      })
        .then((response) => response.json())
        .then((data) => {
          this.resultZbBox(data)
          document.querySelector('#quare').value = ''
          document.querySelector('#newphone').value = ''
          document.querySelector('#newcity').value = ''

          document.querySelector('#testshi').innerHTML = '1'
          document.querySelector('#testting').innerHTML = '1'
          document.querySelector('#testwei').innerHTML = '1'
          document.querySelector('#testyangtai').innerHTML = '1'

          this.repeatFlag = false
        })
    }
  }

  // 根据面积显示户型
  selectDoorModle (sValue, squareEle) {
    const huXingNumber = [
      [1, 1, 1, 1, 1], // 默认情况 室，厅，厨，卫，阳台
      [2, 1, 1, 1, 1], // 面积在 60 和 90 间
      [3, 2, 1, 2, 1], // 面积在 90 到 150 间
      [4, 2, 1, 2, 2] // 面积大于 150
    ]
    let huXingIndex = 0
    const square = parseFloat(sValue)
    if (isNaN(square) || squareEle.value === '') {
      return
    }
    const shiNode = document.querySelector('#secshi')
    const tingNode = document.querySelector('#secting')
    const chuNode = document.querySelector('#secchu')
    const weiNode = document.querySelector('#secwei')
    const yangTaiNode = document.querySelector('#secyangtai')

    const shiTest = document.querySelector('#testshi')
    const tingTest = document.querySelector('#testting')
    const weiTest = document.querySelector('#testwei')
    const yangTaiTest = document.querySelector('#testyangtai')

    if (square >= 60 && square < 90) {
      huXingIndex = 1
    } else if (square >= 90 && square < 150) {
      huXingIndex = 2
    } else if (square >= 150) {
      huXingIndex = 3
    }

    shiNode.value = huXingNumber[huXingIndex][0]
    tingNode.value = huXingNumber[huXingIndex][1]
    chuNode.value = huXingNumber[huXingIndex][2]
    weiNode.value = huXingNumber[huXingIndex][3]
    yangTaiNode.value = huXingNumber[huXingIndex][4]

    shiTest.innerText = huXingNumber[huXingIndex][0]
    tingTest.innerText = huXingNumber[huXingIndex][1]
    weiTest.innerText = huXingNumber[huXingIndex][3]
    yangTaiTest.innerText = huXingNumber[huXingIndex][4]
  }

  closeBox () {
    document.body.style.overflowY = 'initial'
    Array.prototype.forEach.call(document.querySelectorAll('.result-box'), (item) => {
      util.removeClass(item, 'active-anim')
    })
    document.querySelector('.layerout').style.display = ''
    Array.prototype.forEach.call(document.querySelectorAll('.bottom-form-btn-box li'), (item) => {
      util.removeClass(item, 'active')
    })
  }

  bottomTouchStart (e) {
    let Tthis = e.target
    if (!/li/i.test(Tthis.nodeName)) {
      Tthis = Tthis.parentElement
      if (!/li/i.test(Tthis.nodeName)) {
        Tthis = Tthis.parentElement
        if (!/li/i.test(Tthis.nodeName)) {
          Tthis = Tthis.parentElement
        }
      }
    }
    const index = parseFloat(Tthis.dataset.index)

    if (util.hasClass(Tthis, 'active')) {
      this.closeBox()
    } else {
      this.showCard(index)
    }
  }

  showCard (index) {
    Array.prototype.forEach.call(document.querySelectorAll('.bottom-form-btn-box li'), (item, i) => {
      if (i === index) {
        util.addClass(item, 'active')
      } else {
        util.removeClass(item, 'active')
      }
    })
    document.querySelector('.tab-bottom-form-box').style.display = 'block'
    document.querySelector('.layerout').style.display = 'block'
    document.body.style.overflowY = 'hidden'
    Array.prototype.forEach.call(document.querySelectorAll('.result-box'), (item, i) => {
      if (i === index) {
        util.addClass(item, 'active-anim')
      } else {
        util.removeClass(item, 'active-anim')
      }
    })
  }

  /**
   * 判断是否已设定该标识,返回类型布尔值,标识尚在有效期内,即已存在且未过期返回true,否则返回false
   * @param localStorage键名
   * @returns bool  是否存在该键名
   */
  isExist (name) {
    try {
      if (window.localStorage &&
        typeof window.localStorage.getItem(name) !== 'undefined' &&
        !Number.isNaN(parseFloat(window.localStorage.getItem(name))) &&
        parseFloat(window.localStorage.getItem(name)) > Date.now()) {
        return true
      }
      return false
    } catch (e) {
      // 浏览器禁用localStorage时
      return false
    }
  }

  /**
   * 写入localStorage的方法,其值 常用来做为标识当前标志是否已过期
   * @param localStorage 键名 localStorage[@param]
   * @param time,过期时间,缺省值为一天,最大为365天
   * @returns bool 设置是否成功
   */
  setFlag (name, time) {
    let expireDay = 1 // 缺省值
    if (!Number.isNaN(parseFloat(time) && time <= 365)) {
      expireDay = time
    }
    const expireTime = ((expireDay) * 24 * 60 * 60 * 1000) + Date.now()
    // 键名存在则写入
    if (name && window.localStorage) {
      try {
        // localStorage[name] = expireTime
        window.localStorage.setItem(name, expireTime)
        return true
      } catch (e) {
        return false
      }
    }
    return false
  }

  init () {
    if (!this.isExist('autoShow')) {
      this.autoShow = true
    }
    // 当出现键盘时，触碰屏幕取消键盘
    document.body.addEventListener('touchstart', () => {
      Array.prototype.forEach.call(document.querySelectorAll('input'), (item) => {
        item.blur()
      })
    })

    // 底部切换
    document.querySelector('.bottom-form-btn-box').addEventListener('touchstart', (e) => {
      let Tthis = e.target
      if (!/li/i.test(Tthis.nodeName)) {
        Tthis = Tthis.parentElement
        if (!/li/i.test(Tthis.nodeName)) {
          Tthis = Tthis.parentElement
          if (!/li/i.test(Tthis.nodeName)) {
            Tthis = Tthis.parentElement
          }
        }
      }
      const index = parseFloat(Tthis.dataset.index)

      if (util.hasClass(Tthis, 'active')) {
        this.closeBox()
      } else {
        this.showCard(index)
      }
    })

    // 关闭弹框
    let closeBoxMove = false
    document.querySelector('.layerout').addEventListener('touchstart', () => {
      closeBoxMove = false
    })
    document.querySelector('.layerout').addEventListener('touchmove', () => {
      closeBoxMove = false
    })
    document.querySelector('.layerout').addEventListener('touchend', (e) => {
      if (!closeBoxMove) {
        e.preventDefault()
        util.removeClass(document.querySelector('.layerout'), 'layerout-z')

        util.removeEle(document.querySelector('.mfsj-layer-box'))
        this.closeBox()
      }
    })

    document.querySelector('#sub_mfsj').addEventListener('click', () => {
      const ptag = document.querySelector('#mfsj_pg').value
      this.sjCheckForm(ptag, 21)
    })

    document.querySelector('#sub_lhb').addEventListener('click', () => {
      const ptag = document.querySelector('#lhb_pg').value
      this.sjCheckForm(ptag, 23)
    })

    document.querySelector('#sub_zxgs').addEventListener('click', () => {
      const ptag = document.querySelector('#zxgs_pg').value
      this.sjCheckForm(ptag, 23)
    })

    document.querySelector('#sub_zxfq').addEventListener('click', () => {
      const ptag = document.querySelector('#zxfq_pg').value
      this.sjCheckForm(ptag, 28)
    })

    document.querySelector('#sub_zxjb').addEventListener('click', () => {
      this.zxbjCheckform()
    })

    Array.prototype.forEach.call(document.querySelectorAll('.layerout, .tab-bottom-form-box'), (item) => {
      item.addEventListener('touchmove', (e) => {
        e.stopPropagation()
        e.preventDefault()
      })
    })

    document.querySelector('#quare').addEventListener('keyup', (e) => {
      this.selectDoorModle(e.target.value, e.target)
    })

    document.querySelector('#huxingInput_test').addEventListener('click', () => {
      // if (!clickFlag) {
      const shi = document.querySelector('#testshi').innerText
      const ting = document.querySelector('#testting').innerText
      const wei = document.querySelector('#testwei').innerText
      const yangtai = document.querySelector('#testyangtai').innerText

      const arr = ['室', '厅', '卫', '阳台']

      const huXingNode = document.createElement('div')
      huXingNode.className = 'layer-huxing'

      let html = `<div class="layer-content">
                    <span class="column">选择你家的户型</span>
                    <i class="cut-line"></i>
                    <div class="huxing-option">`

      for (let i = 0; i < 4; i++) {
        html += `<ul class="option${i}">`
        for (let j = 0; j < 5; j++) {
          if ((i === 0 && j === shi - 1) ||
            (i === 1 && j === ting - 1) ||
            (i === 2 && j === wei - 1) ||
            (i === 3 && j === yangtai - 1)) {
            html += `<li class="on" data-index="${j}">${(j + 1) + arr[i]}</li>`
          } else {
            html += `<li data-index="${j}">${(j + 1) + arr[i]}</li>`
          }
        }
        html += '</ul>'
      }
      html += `</div>
                    <input type="button" value="确定" id="submitHuxing_test"/>
                </div>`
      huXingNode.innerHTML = html
      document.body.appendChild(huXingNode)

      document.body.querySelector('#submitHuxing_test').addEventListener('click', (e) => {
        const shi = parseFloat(document.querySelector('.option0 .on').dataset.index) + 1
        const ting = parseFloat(document.querySelector('.option1 .on').dataset.index) + 1
        const wei = parseFloat(document.querySelector('.option2 .on').dataset.index) + 1
        const yangtai = parseFloat(document.querySelector('.option3 .on').dataset.index) + 1

        document.querySelector('#secshi').value = shi
        document.querySelector('#secting').value = ting
        document.querySelector('#secwei').value = wei
        document.querySelector('#secyangtai').value = yangtai

        document.querySelector('#testshi').innerText = shi
        document.querySelector('#testting').innerText = ting
        document.querySelector('#testwei').innerText = wei
        document.querySelector('#testyangtai').innerText = ting

        document.querySelector('.layer-huxing').remove()
        e.preventDefault()
      })

      document.body.querySelector('.huxing-option li').addEventListener('touchstart', (e) => {
        Array.prototype.forEach.call(document.querySelectorAll('.huxing-option li'), (item) => {
          util.removeClass(item, 'on')
        })
        util.addClass(e.target, 'on')
      })
    })

    document.body.addEventListener('touchstart', (e) => {
      document.querySelector('#quare').blur()
      this.moveObj.isMove = false
      if (e.changedTouches) {
        this.moveObj.startY = e.changedTouches[0].screenY
      }
    })

    document.body.addEventListener('touchmove', (e) => {
      this.moveObj.isMove = true
      if (e.changedTouches) {
        this.moveObj.endY = e.changedTouches[0].screenY
      }
    })

    document.body.addEventListener('touchend', () => {
      if (this.moveObj.isMove && this.moveObj.endY + 10 < this.moveObj.startY) {
        // 往上滑了一次
        if (this.autoShow) {
          this.slideTimes += 1
          if (this.slideTimes === 2) {
            // $('.btn-zxbj')[0].click()
            // 第二个卡片，免费报价上滑
            this.showCard(1)
            this.autoShow = false
            this.setFlag('autoShow', 1 / 24) // 1小时过期
          }
        }
      }
    })
  }
}

export default FooterLayer
