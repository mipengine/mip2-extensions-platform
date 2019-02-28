/**
 * @file mip-xsdetailheader 组件
 * @author chenyongle(cehnyongle@baidu.com)
 */

import arrowimg from "@/static/arrow_down.png"
import './mip-xsdetailheader.less'
const {CustomElement, util} = MIP
const css = util.css

export default class MipXsdetailheader extends CustomElement {
  build () {
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    let ele = this.element
    let title = ele.getAttribute('title') || ''
    let author = ele.getAttribute('author') || ''
    let cal = ele.getAttribute('cal') || ''
    let status = ele.getAttribute('status') || ''
    let imgsrc = ele.getAttribute('imgsrc') || ''
    let content = ele.getAttribute('content') || ''
    let calhref = ele.getAttribute('calhref') || ''
    let readhref = ele.getAttribute('readhref') || ''
    wrapper.innerHTML = `
      <p class="title">${title}</p>
      <div class="info_wrapper">
        <mip-img
          src="${imgsrc}"
          class="cover"
          width="122"
          height="162">
        </mip-img>
        <p class="author">
          <span class="h">作者：</span><span>${author}</span>
        </p>
        <p class="cal">
          <span class="h">分类：</span><span class="xsdetailcal">${cal}</span>
          <!-- <svg
            viewBox="25 25 50 50"
            class="circular">
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              class="path"/>
          </svg>
          <span class="xsdetailtag">西方魔幻</span> -->
        </p>
        <p class="status">
          <span class="h">状态：</span><span class="xsdetailstatus">${status}</span>
          <!-- <svg
            viewBox="25 25 50 50"
            class="circular">
            <circle
              cx="50"
              cy="50"
              r="20"
              fill="none"
              class="path"/>
          </svg>
          <span class="xsdetailcode">已完结</span> -->
        </p>
        <div class="rank_list">榜单：<span class="rank xsdetailrank">玄幻榜 NO.20</span></div>
      </div>
      <div class="btn_wrapper">
        <a
          href="${calhref}"
          class="show_cal"
          mip-link>查看目录</a>
        <a
          href="${readhref}"
          class="go_read"
          mip-link>全书免费阅读</a>
      </div>
      <div
        class="brief_wrapper">
        <div class="content_wrapper">
          ${content}
        </div>
        <span
          href="javascript:;"
          class="show_more">
          <mip-img
            src="${arrowimg}"
            width="14"
            height="14">
          </mip-img>
        </span>
      </div>
    `
    ele.appendChild(wrapper)
    let oContent = ele.querySelector('.content_wrapper')
    let oShowMoreImg = ele.querySelector('.show_more')
    let oSwitch = true
    if (oContent.clientHeight > 72) {
      css(oContent, {
        '-webkit-line-clamp': '3'
      })
    } else {
      css(oShowMoreImg, {
        'display': 'none'
      })
    }
    ele.querySelector('.brief_wrapper').addEventListener('click', () => {
      if (oSwitch) {
        css(oContent, {
          '-webkit-line-clamp': '99'
        })
        css(oShowMoreImg, {
          'transform': 'rotate(180deg)'
        })
        oSwitch = false
      } else {
        css(oContent, {
          '-webkit-line-clamp': '3'
        })
        css(oShowMoreImg, {
          'transform': 'rotate(0deg)'
        })
        oSwitch = true
      }
    }, false)
  }
}

