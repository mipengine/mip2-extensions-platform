const Mloading = function () {
}
Mloading.prototype = {
  open: function (text) {
    let self = this
    self.close()
    if (document.querySelector('.mint-indicator')) return
    let html = `<div class="mint-indicator">
  <div class="mint-indicator-wrapper" style="padding: 20px;">
    <span class="mint-indicator-spin">
      <div class="mint-spinner-snake"
           style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 32px; width: 32px;">
      </div>
    </span>
    ${text ? `<span class="mint-indicator-text">${text}</span>` : ''}
  </div>
  <div class="mint-indicator-mask"></div>
</div>`.trim()
    document.body.insertAdjacentHTML('beforeend', html)
    // listen buttons click
    self.prevent()
  },
  prevent: function () {
    document.querySelector('.mint-indicator').addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
    document.querySelector('.mint-indicator-mask').addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
  },
  close: function () {
    if (document.querySelector('.mint-indicator')) {
      document.querySelector('.mint-indicator').parentNode.removeChild(document.querySelector('.mint-indicator'))
    }
    setTimeout(() => {
      if (document.querySelector('.mint-toast')) {
        document.querySelector('.mint-toast').parentNode.removeChild(document.querySelector('.mint-toast'))
      }
    }, 10)
    // setTimeout(()=>{
    //   if (document.querySelector('.mint-toast')) {
    //     document.querySelector('.mint-toast').parentNode.removeChild(document.querySelector('.mint-toast'))
    //   }
    // },20)
  }
}

export {Mloading}
