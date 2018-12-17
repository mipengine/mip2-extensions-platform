<template>
  <div
    v-if="apiurl">
    <mip-fixed
      :class="{'show': showFloat,'float_sbox': true}"
      type="bottom">
      <div class="selbox_icon">
        <div class="title"><span/></div>
        <ul class="clear layer">
          <li
            v-for="(item, key) in xz"
            :key="key"
            :class="{cur: item[5]}"
            @click="chooseXZ(key)">
            <em><mip-img :src="getIcon(key + 1, 'xz', 0)"/><i/></em>
            <span>{{ item[1] }}</span>
          </li>
        </ul>
      </div>
    </mip-fixed>
    <mip-fixed
      :class="{'show': showFloat,'m_layer': true}"
      type="bottom"
      @click="hideFloat"/>
  </div>
</template>
<style scoped>
.m_layer{opacity:0;z-index:-1 !important;transition: opacity .4s,z-index .4s;}
.float_sbox{bottom: -10rem;-webkit-transition: all .4s;transition: all .4s;}
.m_layer.show{opacity: 1;z-index: 999 !important;}
.float_sbox.show{bottom: 0;}
</style>
<script>
import Swiper from '../../common/swiper.js'
import * as reData from '../../common/basedata.js'
import MobileSelect from '../../common/mobileSelect.js'
export default {
  props: {
    apiurl: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      showFloat: false,
      ysdata: '',
      xz: [
        ['aries', '白羊', '3.21-4.19', '热情活力', 2, 0],
        ['taurus', '金牛', '4.20-5.20', '稳健固执', 3, 0],
        ['gemini', '双子', '5.21-6.21', '花心多变', 4, 0],
        ['cancer', '巨蟹', '6.22-7.22', '敏感柔情', 5, 0],
        ['leo', '狮子', '7.23-8.22', '骄傲威严', 14, 0],
        ['virgo', '处女', '8.23-9.22', '完美理性', 15, 0],
        ['libra', '天秤', '9.23-10.23', '公平和谐', 16, 0],
        ['scorpio', '天蝎', '10.24-11.22', '神秘敏锐', 17, 0],
        ['sagittarius', '射手', '11.23-12.21', '自由乐观', 18, 0],
        ['capricorn', '摩羯', '12.22-1.19', '执著现实', 19, 0],
        ['aquarius', '水瓶', '1.20-2.18', '自由博爱', 20, 0],
        ['pisces', '双鱼', '2.19-3.20', '浪漫梦幻', 21, 0]
      ],
      CB: '',
      LB: '',
      card: [],
      scard: [],
      otherLi: '',
      ico: {
        'xz': ['https://mip.xzw.com/static/public/images/prot_icon/xz/a/[id].png'],
        'sx': ['https://mip.xzw.com/static/public/images/prot_icon/sx/a/[id].png']
      },
      rem: (MIP.viewport.getWidth() > 640 ? 640 : MIP.viewport.getWidth()) / 10,
      marginLeft: [0.7, 4.2, 0, 4.6, 1, 4.8, 0.8, 4.8, 2.8]
    }
  },
  created () {
    const that = this
    // 星座卡片效果
    that.CB = new Swiper('.card_box', {
      pagination: {
        el: '.swiper-pagination'
      },
      slidesPerView: 1.3,
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 30,
      grabCursor: true
    })
    that.LB = new Swiper('#otherastro_swiper', {slidesPerView: 4})
    const url = that.apiurl
    const curconste = that.getConste()
    const curconsteId = String(curconste.id)
    const cardlist = localStorage.getItem('cardlist') || ''
    let defcd = ''
    let cardck = ''
    that.scard = [curconsteId]
    that.card = that.scard
    if (cardlist) {
      cardck = cardlist.split(',')
      that.card = cardck
      if (!that.in_array(curconsteId, cardck)) {
        that.card = [curconsteId].concat(cardck)
      }
      defcd = localStorage.getItem('default_card') || that.card[0]
    }
    that.renderSelectFloat(1)
    that.otherXZ()
    that.setpAddicon()
    if (url) {
      fetch(url).then(function (response) {
        return response.json()
      }).then(function (ysdata) {
        that.ysdata = ysdata
        that.otherstar(ysdata)
        for (let i = 0; i < that.card.length; i++) {
          const cardid = that.card[i]
          that.addStarCard(ysdata, parseInt(cardid), i === 0 ? 1 : 0)
        }
        if (defcd) that.setDefcard(defcd, 0)
      })
    }
  },
  mounted () {
    const that = this
    // 用生日查询
    const birthAstro = document.getElementById('birth_astro')
    if (birthAstro) {
      this.initPicker()
      birthAstro.addEventListener('click', function () {
        that.picker.show()
      })
    }
    // 卡片操作 - 显示浮层
    const addcard = document.getElementById('addcard')
    if (addcard) {
      addcard.addEventListener('click', function () {
        that.showFloat = true
      })
    }
    // 更多星座运势
    that.LB = new Swiper('#otherastro_swiper', {
      slidesPerView: 4
    })
    // 详情页
    const lday = document.getElementById('lday_swiper')
    if (lday) {
      const B = document.getElementById('curMon')
      const C = lday.querySelectorAll('li')
      C[C.length - 1].classList.add('cur')
      const myswiperM = new Swiper('#lday_swiper', {
        slidesPerView: 6,
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        freeModeSticky: true,
        initialSlide: C.length - 1,
        on: {
          init: function () {
            that.showMonth(B, C, this.activeIndex)
          },
          sliderMove: function () {
            that.showMonth(B, C, this.activeIndex)
          },
          slideChangeTransitionEnd: function () {
            that.showMonth(B, C, this.activeIndex)
          }
        }
      })
      myswiperM.slideTo(C.length - 1, 300, false)
    }
    const M = document.getElementById('more_fortune')
    if (M) {
      M.addEventListener('click', function () {
        const event = MIP.util.event.create('MouseEvents')
        event.initEvent('click', true, true)
        document.querySelectorAll('.title')[0].dispatchEvent(event)
      })
    }
    // 运势信息动画效果
    const forindex = document.querySelectorAll('.for_index')
    if (forindex[0]) that.initIndex(forindex)
    // date_tab动画效果
    let A = document.querySelectorAll('.date_tab')[0]
    if (A) {
      MIP.viewport.on('scroll', function () {
        const _t = MIP.viewport.getScrollTop()
        if (_t > 10) {
          A.setAttribute('style', 'transition-delay: 0s;')
          A.classList.add('show')
        } else {
          A.setAttribute('style', 'transition-delay: .3s;')
          A.classList.remove('show')
        }
      })
    }
  },
  methods: {
    initPicker: function () {
      const that = this
      const bdata = reData.f('date', [], [1936, 2100])
      this.picker = new MobileSelect({
        trigger: '#birth_astro',
        title: '',
        type: 'date',
        wheels: [{data: bdata.data}],
        position: bdata.position,
        triggerDisplayData: false,
        callback (curIndexArr, curValue) {
          let val = []
          for (let i = 0; i < curValue.length; i++) {
            val.push(curValue[i].value)
          }
          const month = val[1].split('月')
          const day = val[2].split('日')
          const birthAstro = document.getElementById('birth_astro')
          const birth = birthAstro.querySelectorAll('span')
          birth[0].innerHTML = val.join('')
          const a = that.getConste([month[0], day[0]])
          const url = that.get_urlroute('fortune/' + a.a)
          location.href = url
        }
      })
    },
    isNull: function (arg1) {
      return !arg1 && arg1 !== 0 && typeof arg1 !== 'boolean' ? 1 : false
    },
    in_array: function (search, array, index) {
      for (let i in array) {
        if (array[i] === search) {
          return index ? parseInt(i) + 1 : true
        }
      }
      return false
    },
    getConste: function (d) {
      const D = [[9, 19], [10, 18], [11, 20], [0, 19], [1, 20], [2, 21], [3, 22], [4, 22], [5, 22], [6, 23], [7, 22], [8, 21]]
      if (typeof (d) === 'string') {
        const a = d.match(/(\d{4})-(\d{1, 2})-(\d{1, 2})/i) || d.match(/(\d{1, 2})-(\d{1, 2})/i)
        if (a) d = a.length > 3 ? a.slice(2, 4) : a.slice(1, 3)
      } else if (this.isNull(d)) {
        const N = new Date()
        d = [N.getMonth() + 1, N.getDate()]
      }
      const F = d[0] - (d[1] <= D[d[0] - 1][1] ? 1 : 0)
      const E = (F - 3 + 12) % 12
      let N = this.xz[E]
      const K = {
        id: E + 1,
        a: N[0],
        n: N[1],
        d: N[2],
        r: N[3]
      }
      return K
    },
    get_urlroute: function (v, cp, rule) {
      if (!rule) rule = '/[u]/'
      let url = rule.replace('[u]', v)
      if (cp) {
        url += (url.indexOf('?') > 0 ? '&' : '?') + 'cp=[cp]'
      }
      return url
    },
    getIcon: function (id, tid, sid) {
      if (!tid) return
      if (!id) id = 0
      let icon = this.ico[tid]
      if (!this.isNull(sid)) icon = icon[sid]
      return icon.replace(/\[id\]/i, id)
    },
    addStarCard: function (ysdata, id, index) {
      // 新增卡片
      if (!id) return false
      const dat = ysdata[id - 1]
      const xzattr = this.xz[id - 1]
      const str = '<div id="swiper' + id + '" class="swiper-slide li_card' + (index ? ' index_card' : '') + '" data-id="' + id + '">' +
        '<i class="card_default"></i>' +
        '<i class="card_close"></i>' +
        '<a href="' + this.get_urlroute('fortune/' + (this.xz[id - 1][0])) + '">' +
        '<img src="' + this.getIcon(id, 'xz', 0) + '">' +
        '<strong>' + xzattr[1] + '座</strong>' +
        '<small>' + xzattr[2] + '</small>' +
        '<h3><em></em>' + dat.desc + '<em></em></h3>' +
        '<span>综合评星：<em class="m_star m_star_2"><em style="width:' + (dat.star * 0.5) + 'rem"></em></em></span>' +
        '<p>' + dat.cont + '</p>' +
        '<b>查看详情</b>' +
        '</a></div>'
      this.CB.appendSlide(str)
      this.CB.update()
      this.cardHandle(id)
    },
    hideFloat: function () {
      this.showFloat = false
    },
    renderSelectFloat: function (v) {
      for (let i = 0; i < this.xz.length; i++) {
        for (let j = 0; j < this.card.length; j++) {
          if (parseInt(this.card[j]) === i + 1) this.xz[i][5] = v
        }
      }
    },
    setDefcard: function (d, sp) {
      let id = parseInt(d)
      if (window.localStorage) localStorage.setItem('default_card', d)
      const cardbox = document.querySelectorAll('.card_box')
      const licard = cardbox[0].querySelectorAll('.li_card')
      let index = false
      for (let i = 0; i < licard.length; i++) {
        licard[i].classList.remove('li_defcard')
        const attrId = parseInt(licard[i].getAttribute('data-id'))
        if (attrId > 0 && attrId === id) {
          index = i
          licard[i].classList.add('li_defcard')
          licard[i].classList.remove('index_card')
        }
      }
      this.CB.slideTo(index, !isNaN(sp) ? sp : 500)
    },
    otherstar: function (ysdata) {
      const otherastro = document.getElementById('otherastro_swiper')
      const otherLi = otherastro.querySelectorAll('li')
      for (let i = 0; i < ysdata.length; i++) {
        const I = otherLi[i].querySelectorAll('i')
        I[0].style.width = parseInt(ysdata[i].star) * 10 + 'px'
      }
    },
    otherXZ: function () {
      const otherastro = document.getElementById('otherastro_swiper')
      if (otherastro) {
        const otherLi = otherastro.querySelectorAll('li')
        for (let i = 0; i < otherLi.length; i++) {
          otherLi[i].style.display = 'block'
        }
        for (let j = 0; j < this.card.length; j++) {
          const index = this.card[j] - 1
          otherLi[index].style.display = 'none'
        }
        this.LB.update()
      }
    },
    setpAddicon: function () {
      const addcard = document.getElementById('addcard')
      if (addcard) {
        const l = this.scard[0] === this.card[0] ? 6 : 5
        if (this.card.length >= l) {
          addcard.style.display = 'none'
        } else {
          addcard.style.display = 'inline'
        }
      }
    },
    addStorage: function (id) {
      if (this.in_array(String(id), this.card)) return false
      this.card.push(String(id))
      if (window.localStorage) localStorage.setItem('cardlist', this.card)
    },
    removeStorage: function (id) {
      let tmp = []
      for (let i = 0; i < this.card.length; i++) {
        if (parseInt(id) !== parseInt(this.card[i])) tmp.push(this.card[i])
      }
      this.card = tmp
      if (window.localStorage) localStorage.setItem('cardlist', this.card)
    },
    chooseXZ: function (key) {
      this.showFloat = false
      const id = key + 1
      if (this.in_array(String(id), this.card)) {
        return false
      }
      this.xz[key][5] = 1
      this.addStorage(id)
      this.addStarCard(this.ysdata, key + 1)
      this.setDefcard(id)
      this.otherXZ()
      this.LB.update()
      this.setpAddicon()
    },
    cardHandle: function (id) {
      const that = this
      // 卡片操作
      const obj = document.getElementById('swiper' + id)
      const defaultcard = obj.querySelectorAll('.card_default')
      defaultcard[0].addEventListener('click', function () {
        that.setDefcard(id)
      })
      const closecard = obj.querySelectorAll('.card_close')
      closecard[0].addEventListener('click', function (e) {
        const i = that.in_array(String(id), that.card, true) - 1
        that.xz[id - 1][5] = 0
        that.CB.removeSlide(i)
        that.CB.update()
        that.removeStorage(id)
        that.setpAddicon()
        that.otherXZ()
        that.LB.update()
      })
    },
    showMonth: function (B, C, s) {
      const mv = C[s + 4].getAttribute('data-mv')
      B.innerHTML = mv
    },
    initIndex: function (index) {
      const span = index[0].querySelectorAll('span')
      const h = Math.min((Math.ceil(span.length / 2) * 1.5), 5.6)
      index[0].setAttribute('style', 'height: ' + h + 'rem')
      const s = h * this.rem / (span.length / 2) - 5
      for (let i = 0; i < span.length; i++) {
        const t = s * Math.floor(i / 2) + Math.random() * 10 + (i % 2 * 16)
        const l = this.marginLeft[i] * this.rem + (20 - Math.random() * 20)
        span[i].setAttribute('style', 'margin-top: ' + t + 'px; margin-left: ' + l + 'px')
      }
    }
  }
}
</script>
