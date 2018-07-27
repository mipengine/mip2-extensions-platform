/* eslint-disable */

/**
 * @file common.js
 * @author
 */

// 域名
const DOMAIN = location.protocol + '//' + location.host;

export default ({
    // 接口
    api: {
        // 产品详情查询
        "item": "/insurface/item",
        // 详情页下单
        "order": "/insurface/order/create",
        // 首页产品查询
        "homepage": "/insurface/item/homepage",
        // 保险分类所属产品
        "itemClass": "/insurface/item/class",
        // 保障详情
        "rightsDetail": "/insurface/rights/detail",
        // 我的保单
        "policy": "/insurface/policy",
        // 保单详情
        "policyDetail": "/insurface/policy/detail",
        // 保单下载
        "policyDownload": "/insurface/policy/download",
        // 保单试算
        "policyPricing": "/insurface/policy/pricing",
        // 订单结果
        "payResult": "/insurface/order/pay/result",
        // 理赔指引
        "claimGuide": "/insurface/claimGuide",
        // 健康告知
        "healthNotice": "/insurface/item/healthNotice",
        // cms资源
        "cms": "/assets/cms",
        // 支付宝+协议头
        "alipay":   DOMAIN + "/insurface/pay/alipay",
        // 微信+协议头
        "weixin":   DOMAIN + "/insurface/pay/weixin",
        // 百付宝+协议头
        "baifubao": DOMAIN + "/insurface/pay/baifubao",
        // 支付+协议头
        "redirectPay": DOMAIN + "/insurface/pay/redirect"
    },
    // 页面URL
    router: {
        // 首页
        "index": DOMAIN + "/mip/index",
        // 错误页
        "error": DOMAIN + "/mip/error",
        // 支付结果
        "payResult": DOMAIN + "/mip/pay-result"
    },
    config: {
        // APP名
        "appName": "度小满保险",
        // 系统文案
        "networkError": "哎呀！网络出问题了",
        "networkError2": "网络不给力，请您检查您的网络设置",
        "systemError": "系统繁忙，请稍后重试",
        "payError": "支付异常，请稍后重试",
        // 客服电话
        "serviceTel": 95055,
        // loginKey
        "loginKey": "mip-login-xzh:sessionId://baoxian.baidu.com/insurface/xiongzhang/login/state"
    },
    setHtmlRem () {
        let doc = document;
        let o = {};
        let htmls = doc.getElementsByTagName('html');
        let tid;
        o.html = htmls[0];
        o.widthProportion = function () {
            console.log('宽度:' + doc.body.clientWidth);
            let c = (doc.body.clientWidth || o.html.offsetWidth) / 750;
            return c > 1 ? 1 : c < 0.4 ? 0.4 : c;
        };
        o.changePage = function () {
            let length = htmls.length;
            let remValue = o.widthProportion() * 100;
            let rem = sessionStorage.getItem('rem');
            let tid;
            // 无rem且不是(入口页)
            if (rem !== null && !MIP.viewer.page.isRootPage) {
                for (let i = 0; i < length; i++) {
                    htmls[i].setAttribute('style', 'font-size:' + rem + 'px!important;height:100% !important');
                }
            } else {
                for (let j = 0; j < length; j++) {
                    htmls[j].setAttribute('style', 'font-size:' + remValue + 'px!important;height:100% !important');
                }
                sessionStorage.setItem('rem', remValue);
            }
        };
        o.changePage();
        window.addEventListener('resize', function () {
            clearTimeout(tid);
            tid = setTimeout(o.changePage, 300);
        }, false);
    },

    setTel (number) {
        setTimeout(function(){
            location.href='tel:' + number;
        },100);
    },

    /**
     * 获取参数值
     */
     getParamValue (paramName) {
        const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
        const r = window.location.search.substr(1).match(reg);
        if (r !== null) return decodeURIComponent(r[2]); return null;
    },

    /*
     * url查询字符串转换成参数对象
     *
     * @param {string} querystr url query字符串 开头不包含问号
     * @return {Object} 解析后生成的参数对象
     */
    urlParse (querystr) {
        if (!querystr) {
            return {};
        }
        if (typeof querystr === 'object' &&
            Object.getOwnPropertyNames(querystr).length === 0) {
            return {};
        }
        var i;
        var n;
        var arr = querystr.split('&');
        var obj = {};
        var tmp;
        var decode = decodeURIComponent;
        for (i = 0, n = arr.length; i < n; i++) {
            tmp = arr[i].split('=');
            obj[decode(tmp[0])] = decode(tmp[1]);
        }
        return obj;
    },

    /*
    * 获取url参数对象
    *
    * @return {Object} url参数对象
    */
    getQueryParam () {
        return this.urlParse(location.search.replace('?', ''));
    },

    setUrlParam (obj) {
        const params = [];

        Object.keys(obj).forEach((key) => {
            let value = obj[key]
            // 如果值为undefined我们将其置空
            if (typeof value === 'undefined') {
                value = '';
            }
            // 对于需要编码的文本（比如说中文）我们要进行编码
            params.push([key, encodeURIComponent(value)].join('='));
        });

        return params.join('&');
    },

    // 使用MIP2同步数据
    mipSetGlobalData (newVal) {
        try {
            MIP.setData({'#insurdata': newVal })
        } catch (e) {
        }
    },

    // 使用MIP2合并数据用于本地存储
    mipExtendData (oldVal, newVal) {
        return MIP.util.fn.extend({}, oldVal, newVal);
    },

    // assign跳转方法1
    navigate (target, param) {
        let oldUrl = location.href.split('?')[0];
        let oldLen = oldUrl.split('/').length;
        let baseUrl = oldUrl.split('/').slice(0, oldLen-1).join('/');
        let targetUrl = baseUrl + '/' + target;
            targetUrl = (typeof param == 'undefined') ? targetUrl : targetUrl + '?' + this.setUrlParam(param);
        this.assign(targetUrl);
    },

    // assign跳转方法2
    assign (url) {
        MIP.viewer.open(url, {
            isMipLink: true
        });
    },

    // replace跳转: 不会新增一条历史记录
    replace (url) {
        MIP.viewer.open(url, {
            isMipLink: true,
            replace: true
        });
    }

})
