import './index.less'
import { astro } from './astro-data'
import XzScroll from './XzScroll'
// 星座选择控件
class XzPicker {
  constructor (options) {
    let defaults = {
      index: 5, // 高亮位置
      startX: 0, // 起始坐标x
      startY: 0, // 起始坐标y
      storeY: 0, // 保存y坐标
      scrollY: !1,
      astro: astro,
      callback: function (data) {
        {
          let AJAXurl = options.fetchUrl + '?girlCaturl=' + data.girl.index + '&boyCaturl=' + data.boy.index + ''
          fetch(AJAXurl).then(function (res) {
            return res.json()
          }).then(function (data) {
            if (data.code === 200) {
              if (options.href) {
                let href = options.href.replace('_val_', '' + data.pair_id)
                window.location.href = href
              }
            } else {
              console.log(data.msg)
            }
          }).catch(function (ex) {
            // 捕获 parse的异常
            console.log('parsing failed', ex)
          })
        }
      }
    }
    this.params = defaults
  }
  createHTML () {
    let listStr = ''
    for (let i = 0; i < this.params.astro.length; i++) {
      listStr += ' <li><span class="pic astro-icon icon' + (i + 1) + '"></span><div class="tit">' + this.params.astro[i].name + '</div></li>'
    }
    let html =
            '<div class="xz-picker-inner">' +
            '<div class="xz-picker-head">' +
            '<h3 class="title">选择星座</h3>' +
            '<a class="close"></a>' +
            '</div>' +
            '<div class="xz-picker-body">' +
            '<div class="picker-columns">' +
            '<div class="picker-column">' +
            '<div class="picker-name">女生</div>' +
            '<div class="picker-list picker-girl-list">' +
            '<ul>' + listStr + '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="picker-column">' +
            '<div class="picker-name">男生</div>' +
            '<div class="picker-list picker-boy-list">' +
            '<ul>' + listStr + '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="picker-ctrl">' +
            '<a class="btn btn-pair"><span class="btn-text">开始配对</span></a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="xz-selector-overlay"></div>'
    this.pickerEl = document.createElement('div')
    this.pickerEl.className = 'mip-dishen-xzpicker on'
    this.pickerEl.id = 'xzPicker'
    this.pickerEl.innerHTML = html
    document.body.appendChild(this.pickerEl)
  }
  events () {
    let _self = this
    let pickerList = _self.pickerEl.querySelectorAll('.picker-list')
    new XzScroll().init(pickerList[0])
    new XzScroll().init(pickerList[1])
    _self.pickerEl.querySelector('.close').addEventListener('click', function () {
      _self.pickerEl.classList.remove('on')
    })
    _self.pickerEl.querySelector('.xz-selector-overlay').addEventListener('click', function () {
      _self.pickerEl.classList.remove('on')
    })
    _self.pickerEl.querySelector('.btn-pair').addEventListener('click', function () {
      let girlIndex = _self.pickerEl.querySelector('.picker-girl-list').getAttribute('data-index')
      let boyIndex = _self.pickerEl.querySelector('.picker-boy-list').getAttribute('data-index')
      let girlData = _self.params.astro[girlIndex]
      let boyData = _self.params.astro[boyIndex]
      _self.params.callback({
        girl: girlData,
        boy: boyData
      })
    })
  }
  init (el) {
    this.trigger = el
    let that = this
    this.trigger.addEventListener('click', function (e) {
      e.stopPropagation()
      if (that.pickerEl === undefined) {
        that.createHTML()
        that.events()
      } else {
        that.pickerEl.classList.add('on')
      }
    })
  }
}

export default class MIPXzpicker extends MIP.CustomElement {
  build () {
    let el = this.element
    let fetchUrl = el.getAttribute('fetch-url')
    let href = el.getAttribute('data-href')
    let picker = new XzPicker({
      fetchUrl: fetchUrl,
      href: href
    })
    picker.init(this.element)
  }
}
