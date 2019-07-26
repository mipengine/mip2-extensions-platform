import './index.less'

export default class MIP53public extends MIP.CustomElement {
  build () {
    // var hrefs = 'https://mip.53.com.cn?hmsr=baidu&hmpl=&hmcu=&hmkw=&hmci='
    var hrefs = window.location.href
    var IsTuiguang = this.getParamArgs(hrefs,'hmsr')
    localStorage.setItem("IsTuiguang", IsTuiguang)
  }
  //获取链接中包含的hmsr参数
  getParamArgs(parms, parmName) {
    var argIndex = parms.indexOf("?");
    var arg = parms.substring(argIndex + 1);
    var valArg = "";
    var args = arg.split("&");
    for (var i = 0; i < args.length; i++) {
        var str = args[i];
        var arg = str.split("=");
        if (arg.length <= 1) continue;
        if (arg[0] == parmName)
            valArg = arg[1];
    }
    return valArg;
  }

}
