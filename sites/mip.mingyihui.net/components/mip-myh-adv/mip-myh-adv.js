import './index.less'

const { CustomElement, templates, util } = MIP

const log = util.log('mip-myh-adv')
export default class MIPMYHAdv extends MIP.CustomElement {
    build () {
    }
    connectedCallback () {
        this.src = this.element.getAttribute('src') || ''
        this.data_post=this.element.getAttribute('data-post')||'{}'
        this.data_post_extParams=this.element.getAttribute('data-post-extParams')||'{}'
        this.postData=util.jsonParse(this.data_post)
        this.postExtParams=util.jsonParse(this.data_post_extParams)
        if(!this.postExtParams['referer']){
            this.postExtParams['referer']='mip'
        }
        if(!this.postExtParams['data_type']){
            this.postExtParams['data_type']='json'
        }
        if(!this.postExtParams['site']){
            this.postExtParams['site']='mingyihui'
        }
        this.postExtParams['url']=document.head.baseURI
        if(!this.postData['userid']){
            this.postData['userid']=getCookie('mingyihuiuserid');
        }
        if(!this.postData['userid']){
            this.postData['userid']=0;
        }

        // console.log(JSON.stringify(this.postExtParams))
        // console.log(util.jsonParse(this.data_post),document)
    }
    /**
     * 构造元素，只会运行一次
     *
     * @override
     */
    firstInviewCallback () {
        this.container = document.createElement('div');
        let { element, container } = this

        // this.applyFillContent(container)
        element.appendChild(container)

        if (!container.hasAttribute('role')) {
            container.setAttribute('role', 'list')
        }
        // 异步获取数据
        if (!this.src) {
            log.error(this.element, 'mip-myh-adv 的 src 属性不能为空')
            return
        }
        getIP().then(da=>{
            this.postExtParams['ip']=da.ip
        this.postData['ext_params']=JSON.stringify(this.postExtParams)
        postData(this.src, this.postData)
            .then(data =>{
            //console.log(data);
            if (!data.errcode && data.data) {
            templateData= this.restructTemplateData(data.data)
            this.renderTemplate(templateData)
        }
    }) // JSON-string from `response.json()` call
.catch(error => console.error(error));
});

}
restructTemplateData(data){
    let returnData=[];
    if(data.adv_list.length==0) return returnData;
    data.adv_list.forEach(adv=>{
        returnData.push(adv.ad_contents[0])
})
return returnData;
}
/**
 * renderTemplate 获取模板
 *
 * @param {Object} data 渲染数据
 */
renderTemplate (data) {
    if (!data || !(data instanceof Array)) {
        log.error(this.element, data, '数据不符合规范')
        return
    }
    templates
        .render(this.element, data)
        .then(html => {
        this.render(html)
})
}

/**
 * render dom 渲染函数
 *
 * @param {Array} htmls html 对象数组
 */
render (htmls) {
    let fragment = document.createDocumentFragment()
    htmls.forEach(html => {
        let node = document.createElement('div')
        node.innerHTML = html
    node.setAttribute('role', 'listitem')
    fragment.appendChild(node)
})
this.container.appendChild(fragment)
}
}


function postData(url = '', data = {}) {
    // Default options are marked with *
    pdata='adpp_id='+data['adpp_id']+'&userid='+data['userid']+'&ext_params='+data['ext_params']
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body:pdata, // body data type must match "Content-Type" header
    })
        .then(response => response.json()); // parses JSON response into native JavaScript objects
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//写cookies
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getIP() {
    return fetch('https://api.ipify.org?format=json', {
    })
        .then(response => response.json())
}

