


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
                localStorage.setItem('token',text.data.token);
            }else {
                that.warn.show = true;
                that.warn.texts = text.msg;
            }
        }).catch(function (error) {
            console.log(error)
        });

    }
}