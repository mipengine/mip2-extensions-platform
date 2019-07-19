/**
 * @file mip-ppkao-login 组件
 * @author
 */
export default class MIPExample extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = this.element
      let mipLogin = $(ele)
      let login = mipLogin.find('.login')
      let touxiang = mipLogin.find('.touxiang')
      $(document).ready(function () {
        $.ajax({
          type: 'get',
          url: '//newapi.ppkao.com/api/UserPowerApi/UserIsLogin?UserID=ppkao&UserToken=ppkao&Source=mip',
          dataType: 'jsonp',
          contentType: 'application/x-www-form-urlencodedcharset=utf-8',
          jsonp: 'callback',
          jsonpCallback: 'callback',
          async: false,
          success: function (data) {
            if (data.name === '1') {
              window.sessionStorage.setItem('UserIsLoginKey', data.name)
              window.sessionStorage.setItem('UserIsLoginusername', data.username)
              window.sessionStorage.setItem('UserIsLoginUserFace', data.UserFace)
              login.hide()
              touxiang.show()
              touxiang.find('mip-img').attr({
                src: window.sessionStorage.getItem('UserIsLoginUserFace')
              })
            } else {
              if (data.name === '3') {
                window.sessionStorage.setItem('GetUserIPKey', '0')
                login.show()
                touxiang.hide()
              }
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            login.show()
            touxiang.hide()
          }
        })
      })
    }
    return customElement
  }
}
