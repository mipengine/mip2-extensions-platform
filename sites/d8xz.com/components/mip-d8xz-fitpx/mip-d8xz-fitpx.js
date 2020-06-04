import './index.less'

export default class MIPD8xzFitpx extends MIP.CustomElement {
  build () {
    "use strict";
    const pageStartTime = +new Date;
    ~ function(e) {
      function t() {
        const t = screen.width > 0 && (e.innerWidth >= screen.width || 0 == e.innerWidth) ? screen.width : e.innerWidth;
        a && (t = screen.width);
        const i = t > u ? w : t / (u / 100);
        i = i > h ? i : h, document.documentElement.style.fontSize = i + "px"
      }
      const i, n = e.navigator.userAgent,
        a = n.match(/iphone/i),
        o = n.match(/yixin/i),
        c = n.match(/Mb2345/i),
        r = n.match(/mso_app/i),
        s = n.match(/sogoumobilebrowser/gi),
        m = n.match(/liebaofast/i),
        d = n.match(/GNBR/i),
        u = document.documentElement.dataset.dw || 750,
        h = 42,
        w = 100;
      e.addEventListener("resize", function() {
        clearTimeout(i), i = setTimeout(t, 300)
      }, !1), e.addEventListener("pageshow", function(e) {
        e.persisted && (clearTimeout(i), i = setTimeout(t, 300))
      }, !1), o || c || r || s || m || d ? setTimeout(function() {
        t()
      }, 500) : t()
    }(window);
  }
}
