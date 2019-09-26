import './index.less'

export default class MIPTabar extends MIP.CustomElement {
  build () {
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper');
    wrapper.innerHTML = `
       <mip-fixed type="bottom">
     <div class="fixed-bottom">
     <a href="tel:400-008-2585">
      <div class="fixed-bottom-box">
          <mip-img src="" width="23" height="23"></mip-img>
          <span>电话咨询</span>
      </div>
      </a>
       <div class="fixed-bottom-box" on="tap:weixin.toggle" tabindex="0" id="btn-open">
         <mip-img src="" width="23" height="23"></mip-img>
         <span>微信咨询</span>
       </div>
        <div class="fixed-bottom-box">
          <mip-img src="" width="23" height="23"></mip-img>
          <!--<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=781558368&site=qq&menu=yes">-->
          <span>在线咨询</span>
          <!--</a>-->
        </div>
         <div class="fixed-bottom-box" on="tap:top.scrollTo(duration=500,position='center')">
           <mip-img src="" width="23" height="23"></mip-img>
           <span>返回顶部</span>
         </div>
     </div>
    </mip-fixed>
     <mip-lightbox id="weixin" layout="nodisplay" class="mip-hidden">
      <div class="lightbox">
       <mip-img src="http://chjweb.oss-cn-beijing.aliyuncs.com/chjweb/905586-5d53b0469767c.jpg" width="150" height="150"></mip-img>
       <p>李经理微信号:bandengli211</p>
       <button on="tap:weixin.toggle" class="buttonS">关闭</button>
      </div>
    </mip-lightbox>
    `
    this.element.appendChild(wrapper)
  }
}
