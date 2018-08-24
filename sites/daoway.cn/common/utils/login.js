
export default {
  codelogin: function (code, redirectUri) {
    let url = '/daoway/rest/users/login_mip'
    fetch(url, {
      method: 'POST',
      headers: {'content-type': 'application/x-www-form-urlencoded'}, // "code="+code,
      body: 'code=' + code + '&redirectUri=' + redirectUri
    }).then(function (res) {
      return res.json()
    }).then(function (text) {
      console.log(text)
      if (text.status === 'ok') {
        localStorage.setItem('userId', text.data.userId)
        localStorage.setItem('token', text.data.token)
        if (text.data.token) {
          document.cookie = 'token=' + text.data.token + ';path=/'
        }
      } else {
        console.log('失败')
      }
    }).catch(function (error) {
      console.log(error)
    })
  }
}
