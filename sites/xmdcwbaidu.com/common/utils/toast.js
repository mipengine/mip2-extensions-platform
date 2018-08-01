const Mtoast = function () {
}
Mtoast.prototype = {
  open: function (params) {
    let self = this
    self.close()
    if (document.querySelector('.mint-toast')) return
    let html = `<div class="mint-toast is-placemiddle" style="padding: 10px;z-index: 3001">
  <span class="mint-toast-text" style="padding-top: 0px;">${params.message ? params.message : ''}</span>
</div>`.trim()
    document.body.insertAdjacentHTML('beforeend', html)
    // listen buttons click
    self.prevent()
    setTimeout(() => {
      self.close()
    }, params.hasOwnProperty('duration') ? params.duration : 1500)
  },
  prevent: function () {
    document.querySelector('.mint-toast').addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
  },
  close: function () {
    if (document.querySelector('.mint-toast')) {
      document.querySelector('.mint-toast').parentNode.removeChild(document.querySelector('.mint-toast'))
    }
  }
}

export {Mtoast}
