import './index.less'

export default class MIPWstimesView extends MIP.CustomElement {
  build() {
    let type = this.element.getAttribute('type');
    let data = JSON.parse(this.element.getAttribute('data'));
    let size = JSON.parse(this.element.getAttribute('size'));
    let content = document.createElement('div');
    //文字
    if (type == 'text') {
      content.className = 'view-text';
      content.innerHTML = '<a href="' + data.href + '" class="adv-text dan">' + data.text + '</a>';
      this.element.appendChild(content);
    }
    //图片
    else if (type == 'image') {
      content.className = 'view-img';
      content.innerHTML = '<a href="' + data.href + '"><mip-img class="img" src="' + data.src + '" style="width:' + (size[0] / 375) * 100 + 'vw;height:' + (size[1] / 375) * 100 + 'vw"></mip-img></a>';
      this.element.appendChild(content);
    }
    // 图文
    else if (type == 'graphic') {
      content.className = 'view-graphic';
      content.innerHTML = '<a href="' + data.href + '" class="item"><div class="info"><h3 class="info-title shuang">' + data.title + '</h3><div class="info-about"><span>' + data.date + '</span><span>阅读(' + data.total + '+)</span></div></div><mip-img class="img" src="' + data.src + '"></mip-img></a>';
      this.element.appendChild(content);
    }
    //轮播
    else if (type == 'carousel') {
      content.className = 'view-carousel';
      let swiper_items = '';
      let dot_items = '';
      for (let i = 0; i < data.list.length; i++) {
        swiper_items += '<a  href="' + data.list[i].href + '"><mip-img class="img" src="' + data.list[i].src + '"></mip-img></a>';
        if (i == 0) {
          dot_items += '<div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>'
        } else {
          dot_items += '<div class="mip-carousel-indecator-item"></div>'
        }

      }
      content.innerHTML = '<mip-carousel layout="responsive" autoplay defer="6000" indicatorId="mip-carousel-dot" width="' + (size[0] / 375) * 100 + 'vw" height="' + (size[1] / 375) * 100 + 'vw">' + swiper_items + '</mip-carousel><div class="mip-carousel-indicator-wrapper"><div class="mip-carousel-indicatorDot" id="mip-carousel-dot">' + dot_items + '</div></div>'
      this.element.appendChild(content);
    }
  }
}
