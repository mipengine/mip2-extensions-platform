export default class MIPHtmlView extends MIP.CustomElement {
  firstInviewCallback() {
    let el = this.element
    let input = el.getAttribute('url')
    let body = new URLSearchParams(el.getAttribute('body'))
    let init = el.hasAttribute('init') ? JSON.parse(el.getAttribute('init')) : false
    let html = ''
    body.append('refurl', encodeURIComponent(document.referrer || ''))
    if (init) {
      if (init.method && (init.method === 'POST') && !init.body) {
        init.body = body
      }
    } else {
      init = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'error', // manual, *follow, error
        body: body
      }
    }
    (async () => {
      try {
        html = await fetch(input, init).then(function(res) {
          if (res.ok) {
            return res
          } else if (res.status === 401) {
            console.log('Oops! You are not authorized.')
            return Promise.reject(res.statusText)
          } else {
            console.log('Network response was not ok.')
            return Promise.reject(res.statusText)
          }
        }, function(e) {
          console.error(e)
          return Promise.reject(e)
        }).then(function(res) {
          const contentType = res.headers.get('content-type') || ''
          if (contentType.indexOf('text/html') !== -1) {
            return res.text()
          } else {
            return Promise.reject(new Error('response was not text/html'))
          }
        })
        el.innerHTML = html
      } catch (error) {
        console.error(error)
      }
    })()
  }
}
