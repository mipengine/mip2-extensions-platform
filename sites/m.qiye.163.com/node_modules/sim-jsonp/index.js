function initResponse() {
    window.response = {
        execute: function (txt) {
            if (this.callback) {
                var obj = {
                    "responseText": txt
                };
                this.callback(obj);
            }
            //
            XMLHttp.running = false;
            this.callback = null;
        },
        callback: null
    };
}

const XMLHttp = {
    running: false,
    sendReq: function (url, callback, encodeUrl) {
        //
        if (this.running) {
            return;
        }
        this.running = true;

        var head = document.getElementsByTagName("head")[0] || document.documentElement,
            script = document.createElement("script");
        script.type = "text/javascript";
        response.callback = callback;
        url = url.replace(/([^\?]+\?[^\?]+)\?(\.*)/, "$1&$2");
        if (encodeUrl) {
            url = encodeURI(url);
        }
        script.src = url;

        head.insertBefore(script, head.firstChild);

        //delete the node after 10 seconds
        setTimeout(function () {
            head.removeChild(script);
        }, 10000);
    }
};

const Utils = {
    XMLHttp: XMLHttp,
    initResponse: initResponse
};

module.exports = Utils;