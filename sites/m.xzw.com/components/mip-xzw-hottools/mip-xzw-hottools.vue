<script>
export default {
  data: function () {
    return {
      CXD: [
        ['麦玲玲运程', '1.png', ['http://pro.xzw.com/mllyuncheng/index.html?channel=swxzw&ctrl=0'], 0],
        ['深度占星分析', '2.png', ['http://pro.xzw.com/gerenzhanxing/index.html?channel=swxzw&ctrl=0'], 1],
        ['八字合婚', '5.png', ['http://pro.xzw.com/newhehun/wlindex.html?channel=swxzw'], 1],
        ['八字命格详批', '6.png', ['http://pro.xzw.com/forecastbazijingpibundle/wlindex.html?channel=swxzw'], 0],
        ['八字姻缘', '7.png', ['http://pro.xzw.com/baziyinyuan/wlindex.html?channel=swxzw'], 0],
        ['前世今生', '10.png', ['http://pro.xzw.com/forecastlunhuishubundle/wlindex.html?channel=swxzw'], 0],
        ['一生财运', '12.png', ['http://pro.xzw.com/yishengcaiyun/wlindex.html?channel=swxzw'], 0],
        ['恋爱桃花', '13.png', ['http://pro.xzw.com/forecastlianaitaohuabundle/index.html?channel=swxzw'], 2],
        ['爱情配对', '14.png', ['https://pro.xzw.com/lianaipeidui/wlindex.html?channel=swxzw'], 0],
        ['三世书', '15.png', ['https://pro.xzw.com/forecastsanshishubundle/wlindex.html?channel=swxzw'], 0],
        ['爱情塔罗', '16.png', ['https://pro.xzw.com/forecasttaluobundle/wlindex.html?channel=swxzw'], 0],
        ['姓名详批', '17.png', ['https://pro.xzw.com/xingmingxiangpi/wlindex.html?channel=swxzw '], 0],
        ['人工八字精批', '11.png', ['http://jmvip.xzw.com/zt/bazi/wap/'], 0],
        ['桃花宝典', '18.png', ['http://jmvip.xzw.com/zt/taohua/wap/'], 0],
        ['婚姻运势', '19.png', ['http://jmvip.xzw.com/zt/hunyin/wap/'], 0],
        ['事业运预测', '4.png', ['http://jmvip.xzw.com/zt/shiye/wap/'], 0],
        ['财运预测', '3.png', ['http://jmvip.xzw.com/zt/caiyun/web/'], 2],
        ['大师解梦', '8.png', ['http://jmvip.xzw.com/'], 2],
        ['在线择日', '9.png', ['http://jmvip.xzw.com/zt/zeri/wap/'], 1]
      ]
    }
  },
  mounted () {
    const that = this
    const D = document.querySelectorAll('.hot_tool')
    const ob = 'ul'
    const sb = 'li'
    const A = D[0].querySelectorAll(ob)
    const B = A[0].querySelectorAll(sb)
    const num = 2
    const max = 4
    let str = ''
    if (B.length) setpIconQueue(max)
    that.CXD.sort(function (a, b) {
      return Math.random() > 0.5 ? -1 : 1
    })
    for (let i = 0; i < num; i++) {
      const X = that.CXD[i]
      const CX_URL = X[2][Math.floor(Math.random() * X[2].length)]
      str += '<' + sb + '><a href="' + CX_URL + '" target="_blank"><em><img src="/static/public/images/tool/vip/' + X[1] + '"></em><span>' + X[0] + '</span></a></' + sb + '>'
    }
    A[0].innerHTML += str
    setpIconQueue(max)
    function setpIconQueue (n) {
      let BL = A[0].querySelectorAll(sb)
      BL.forEach(function (node) {
        let length = BL.length
        let randNumPos = parseInt(Math.random() * (length - 2))
        A[0].insertBefore(node, BL[randNumPos])
        node.style.display = 'block'
      })
      BL = A[0].querySelectorAll(sb)
      for (let i = n; i < BL.length; i++) {
        if (BL[i]) {
          A[0].removeChild(BL[i])
        }
      }
    }
  }
}
</script>
