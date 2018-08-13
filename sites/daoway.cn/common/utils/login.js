


export default {
    codelogin:function(code){
        let that = this;
        let url = '/daoway/rest/users/login_mip';
        fetch(url, {
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            body:"code="+code,
        }).then(function (res) {
            if (res && res.status == "200") {
                return res.json();
            }
        }).then(function (text) {
            if(text.status == "ok"){
                localStorage.setItem('userId',text.data.userId);
                base.userId = text.data.text;
                that.userId = text.data.text;
                console.log(text.data);
               /* var cookie = text.header['Set-Cookie'];
                var token = cookie.split(";")[0];
                localStorage.setItem('token',token);*/
            }else {
                that.warn.show = true;
                that.warn.texts = text.msg;
            }
        }).catch(function (error) {
            console.log(error)
        });

    }
}