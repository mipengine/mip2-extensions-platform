export default class MIPJtCangPostal extends MIP.CustomElement {
  build () {
    let pageNo = 1// 存储当前展示的页数
    let totalPage = this.element.getAttribute('total-page')
    let listId = this.element.getAttribute('list-id')
    let initcodes = this.element.getAttribute('init-codes')
    let pageBtns = this.element.getAttribute('page-btns')
    let tipsId = this.element.getAttribute('tips-id')

    // 定义$函数--通过类名获取元素
    function $ (str) {
      return document.getElementsByClassName(str)
    }
    // 内容填充
    function textWrite (eles, html) {
      if (eles) {
        for (let i = 0; i < eles.length; i++) {
          eles[i].innerHTML = html
        }
      }
    }
    // 格式化数据
    function format (s, n) {
      n = n > 0 && n <= 20 ? n : 2
      s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
      let l = s.split('.')[0].split('').reverse()
      let r = s.split('.')[1]
      let t = ''
      for (let i = 0; i < l.length; i++) {
        t += l[i]
      }
      return t.split('').reverse().join('') + '.' + r
    }
    // 类名处理
    function classWrite (eles, method, className) {
      if (method === 'add') {
        for (let i = 0; i < eles.length; i++) {
          eles[i].classList.add(className)
        }
      } else if (method === 'remove') {
        for (let i = 0; i < eles.length; i++) {
          eles[i].classList.remove(className)
        }
      }
    }
    // 弹窗提示
    function alertTips (msg) {
      if (msg) {
        document.getElementById(tipsId).innerHTML = msg
        document.getElementById(tipsId).style.display = 'block'
        setTimeout(function () {
          document.getElementById(tipsId).style.display = 'none'
        }, 2000)
      }
    }
    // 获取行情数据
    function getQuote (codes) {
      let fetchUrl = 'https://api.jijinhao.net/quoteCenter/realTime.htm?codes=' + codes
      fetch(fetchUrl).then(function (res) {
        return res.text()
      }).then(function (result) {
        result = JSON.parse(result.split('=')[1])
        let codeArr = codes.split(',')
        for (let i = 0; i < codeArr.length; i++) {
          let data = result[codeArr[i]]
          if (data !== undefined) {
            let flag = false
            if (data.q80 !== undefined && !isNaN(data.q80)) {
              textWrite($(codeArr[i] + 'q80'), format(data.q80, 2) + '%')
              if (data.q80 > 0) {
                flag = true
              }
            } else {
              textWrite($(codeArr[i] + 'q80'), '-')
            }

            if (data.q63 !== undefined) {
              textWrite($(codeArr[i] + 'q63'), format(data.q63, 2))
            } else {
              textWrite($(codeArr[i] + 'q63'), '-')
            }

            if (flag) {
              classWrite($(codeArr[i] + 'q63'), 'add', 'red')
              classWrite($(codeArr[i] + 'q80'), 'add', 'red')
            } else {
              classWrite($(codeArr[i] + 'q63'), 'add', 'green')
              classWrite($(codeArr[i] + 'q80'), 'add', 'green')
            }
          }
        }
      })
    }
    // 翻页
    function pageTurn (direction) {
      let nextPage = pageNo + direction
      // 判断是否为第一页或最后一页
      if (nextPage <= 0) {
        alertTips('已经是第一页了！')
        return
      } else if (nextPage > totalPage) {
        alertTips('已经是最后一页了！')
        return
      }
      let qouteCodes = ''
      let data = {}
      data.pageNo = nextPage

      let fetchUrl = 'https://m.cngold.org/cang/m_ajax_ybkhq.html'
      fetch(fetchUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'pageNo=' + nextPage
      }).then(function (res) {
        return res.json()
      }).then(function (result) {
        if (result.data) {
          let list = result.data
          if (list.length > 0) {
            let html = ''
            for (let i = 0; i < list.length; i++) {
              if (qouteCodes !== undefined && qouteCodes.length > 0) {
                qouteCodes += ','
              }
              if (list[i].quoteCode !== undefined && list[i].quoteCode.length > 0) {
                qouteCodes += list[i].quoteCode
              }
              html += '<dl class="clearfix mglr30 ybk_quote_tr">' +
                '<dd class="w26">' +
                '<a href="https://m.cngold.org/cang/m_ybkhq_' + list[i].id + '_' + list[i].code +
                '.html" title="' + list[i].shortName + '">' + list[i].shortName +
                '</a></dd>' + '<dd>' +
                '<a href="https://m.cngold.org/cang/m_wjshq_' + list[i].exchangeId +
                '.html" title="' + list[i].exchangeShortName + '">' + list[i].exchangeShortName + '</a>' +
                '</dd>' +
                '<dd class="' + list[i].quoteCode + 'q63"></dd>' +
                '<dd class="' + list[i].quoteCode + 'q80"></dd>' +
                '</dl>'
            }
            document.getElementById(listId).innerHTML = html
            getQuote(qouteCodes)// 获取行情数据
            pageNo = nextPage// 当前页设置
          }
        }
      })
    }

    // 页面初始化
    if (initcodes) {
      getQuote(initcodes)
    }
    if (pageBtns) {
      let prev = document.getElementById(pageBtns.split(',')[0])
      let next = document.getElementById(pageBtns.split(',')[1])
      prev.addEventListener('click', function () {
        pageTurn(-1)
      })
      next.addEventListener('click', function () {
        pageTurn(1)
      })
    }
  }
}
