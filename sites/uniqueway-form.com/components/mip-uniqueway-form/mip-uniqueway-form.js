import './index.less'

export default class MIPExample extends MIP.CustomElement {
  build () {
    let button = this.element.getElementsByTagName('button')[0]
    let element = this.element
    let url = this.element.getElementsByTagName('mip-form')[0].getAttribute('url')
    let notice = element.getElementsByClassName('invalid')[0]
    button.onclick = function () {
      this.setAttribute('disabled', true)
      let submitButton = this
      let trackEvent = submitButton.getAttribute('data-track-event').split(',')
      trackEvent.unshift('_trackEvent')

      if (check(element, submitButton)) {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(check(element))
        }).then((response) => {
          response.json().then(data => {
            if (data.err === 0) {
              element.getElementsByClassName('notice-success-picture')[0].classList.remove('hide')
              window._hmt && window._hmt.push(trackEvent)
              this.removeAttribute('disabled')
            } else {
              notice.innerText = data.msg
              this.removeAttribute('disabled')
              window._hmt && window._hmt.push(['_trackEvent', 'submit_error', data.msg])
            }
          })
          notice.classList.add('notice-mesage')
          window._hmt && window._hmt.push(trackEvent)
          this.removeAttribute('disabled')
        }).catch(error => {
            window._hmt && window._hmt.push(['_trackEvent', 'submit_error', error])
            this.removeAttribute('disabled')
          })
      }
    }

    var check = function (element, submitButton) {
      let data = {}
      let form = element.getElementsByTagName('input')
      for (var i = 0; i < form.length; i++) {
        if (form[i].getAttribute('type') !== 'hidden') {
          let label = form[i].getAttribute('label')
          let value = form[i].value
          if (!value) {
            notice.innerText = label + '不能为空'
            notice.classList.add('notice-mesage')
            window._hmt && window._hmt.push(['_trackEvent', 'input_error', notice.innerText])
            submitButton.removeAttribute('disabled')
            setTimeout(() => {
              notice.innerText = ''
              notice.classList.remove('notice-mesage')
            }, 3000)
            console.log('submitButton', submitButton)
            return false
          }
          data[form[i].getAttribute('name')] = value
        }
        if (form[i].getAttribute('type') === 'hidden') {
          data[form[i].getAttribute('name')] = form[i].value
        }
      }
      return data
    }
  }
}
