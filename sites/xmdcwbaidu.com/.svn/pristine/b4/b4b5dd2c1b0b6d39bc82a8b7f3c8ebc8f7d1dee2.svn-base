const Mdialog = function () {
}
Mdialog.prototype = {
  open: function (params, callback) {
    let self = this
    self.close()
    let html = `
<div class="mint-msgbox-wrapper" style="position: absolute; z-index: 2001;">
  <div class="mint-msgbox">
    <div class="mint-msgbox-header">
      <div class="mint-msgbox-title">${params.hasOwnProperty('title') && params.title ? params.title : '提示'}</div>
    </div>
    <div class="mint-msgbox-content">
      <div class="mint-msgbox-message">${params.message ? params.message : ''}</div>
    </div>
    <div class="mint-msgbox-btns">
      <button class="mint-msgbox-btn mint-msgbox-cancel" button-type="cancel" style="${params.hasOwnProperty('showCancelButton') && params.showCancelButton ? '' : 'display: none'}">取消</button>
      <button class="mint-msgbox-btn mint-msgbox-confirm" button-type="confirm">确定</button>
    </div>
  </div>
</div>
<div class="v-modal" style="z-index: 2000;"></div>
`.trim()
    document.body.insertAdjacentHTML('beforeend', html)
    // listen buttons click
    let dialogButtons = document.querySelectorAll('.mint-msgbox-btn')
    if (dialogButtons && dialogButtons.length > 0) {
      for (let ii = 0; ii < dialogButtons.length; ii++) {
        dialogButtons[ii].onclick = function () {
          if (callback) {
            callback(this.getAttribute('button-type'))
          }
          self.close()
        }
      }
    }
    self.prevent()
  },
  prevent: function () {
    if (!document.querySelector('.mint-msgbox-wrapper') && !document.querySelector('.v-modal')) return
    document.querySelector('.v-modal').addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
    document.querySelector('.mint-msgbox-wrapper').addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
  },
  close: function () {
    if (document.querySelector('.mint-msgbox-wrapper')) document.querySelector('.mint-msgbox-wrapper').parentNode.removeChild(document.querySelector('.mint-msgbox-wrapper'))
    if (document.querySelector('.v-modal')) document.querySelector('.v-modal').parentNode.removeChild(document.querySelector('.v-modal'))
    return true
  }
}

export {Mdialog}
