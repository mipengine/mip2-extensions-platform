const { CustomElement, util } = MIP
const { jsonParse, dom, css } = util
export default class MIPMpc6Comment extends CustomElement {
  data () {
    return {
        id: this.element.getAttribute('id'),
        cid: this.element.getAttribute('cid'),
        url: this.element.getAttribute('url'),
        hasReply: this.element.getAttribute('hasReply')
    }
  }
  build () {
    let ele = this.element;
	let morepl = ele.querySelectorAll('#comment-more');
	let plbox = ele.querySelectorAll('.plbox')[0]
	let plbtn = ele.querySelectorAll('.plbtn')[0]
	let cancel = ele.querySelectorAll('#cancel')[0]
	// 更多评论
	ele.querySelectorAll('#comment-more input')[0].onclick = () => {
	    this.readComment()
	}
    // 读取评论	
    this.readComment()
	//显示评论
	plbtn.onclick = () => {
		css(plbtn, { display: 'none' })
	    css(plbox, { display: 'block' })
	     
	}
	//取消评论
	cancel.onclick = () => {
		css(plbox, { display: 'none' })
	    css(plbtn, { display: 'block' })
		document.getElementById('repid').value = '0'
	     
	}
  }

  /*
   *读取评论
   */
  readComment () {
	let _this = this
    let ul = document.getElementById('comment-list')
	let morepl = this.element.querySelectorAll('#comment-more');
    let oli = ul.getElementsByTagName('dl')
    let p = Math.floor(oli.length / 5 + 1)
	
    fetch(`${this.data().url}/e/extend/comments/?classid=${this.data().cid}&id=${this.data().id}&page=${p}`, {
      method: 'GET'
    }).then((responseText) => {
      return responseText.text()
    }).then((responseRes) => {
		let html = ''
		let data = jsonParse(responseRes);
		if (p >= data.pagenum) {
			console.log(p,data.pagenum);
		    morepl[0].innerHTML = '<p>没有更多评论了！</p>';
		};
		
		document.getElementById('plnum').innerText = data.num;
		if(data.num == 0) {
			data.list='<p class="nodp">还没有发布过评价</p>';
		}
		for (let i = 0; i < data.list.length; i++) {
			let list=data.list[i];
			html += '<dl><dt><span>'+list.saytime+'</span><b>'+list.plusername+'</b>['+list.sayip+']</dt><dd>'+list.saytext+'</dd><dd class="rep"><p><em><a href="javascript:;" data-id="'+list.id+'" class="up">支持</a> <i id="pldigg'+list.id+'1">'+list.zcnum+'</i></em><a  href="javascript:;" class="huifu" data-id="'+list.id+'">回复</a></p></dd></dl>';
		}
		oli.length === 0 ? ul.innerHTML = html : ul.innerHTML = ul.innerHTML + html
        this.pldigg()
		this.reply()
		
    })
  }

  /*
   *赞评论
   */
  pldigg () {
	  
	let _this = this
	let ctrl = document.getElementsByClassName('up')
	for (let i = 0; i < ctrl.length; i++) {
		ctrl[i].onclick = function () {
			let id = this.getAttribute('data-id')
			let pldiggid = '#pldigg'+id+'1';
			let pid = document.getElementById('pldigg'+id+'1')
			let num = Number(pid.innerText)
			fetch(`${_this.data().url}/e/extend/comments/?enews=DoForPlajax&plid=${id}&id=${_this.data().id}&classid=${_this.data().cid}&dopl=1&doajax=1`, {
			  method: 'GET'
			}).then((responseText) => {
			  return responseText.text()
			}).then((responseRes) => {
				let data = jsonParse(responseRes);
				console.log(data)
				if(data.status == 1) {
					pldigg[0].innerText = num + 1;
				} else {
					_this.cAlert(data.msg)
				}
			})
		}
	}
  }

  /*
   *回复评论
   */
  reply () {
	  
	let _this = this
	let ctrl = document.getElementsByClassName('huifu')
	let repid = document.getElementById('repid');
	let plbox = _this.element.querySelectorAll('.plbox')[0]
	let plbtn = _this.element.querySelectorAll('.plbtn')[0]
	for (let i = 0; i < ctrl.length; i++) {
		ctrl[i].onclick = function () {
			let id = this.getAttribute('data-id')
			repid.value=id
			css(plbtn, { display: 'none' })
			css(plbox, { display: 'block' })
			document.getElementById('saytext').focus()
		}
	}
  }
  
  /* 提示 
  */
 cAlert (msg) {
     if (document.getElementById('alert_tips')) {
       document.getElementById('alert_tips').parentNode.removeChild(document.getElementById('alert_tips'))
     }
     let cTips = dom.create(`<mip-fixed type="top" id="alert_tips" class="animated fadeIn">${msg}</mip-fixed>`)
     document.body.appendChild(cTips)
     setTimeout(() => {
       if (document.getElementById('alert_tips')) {
         document.getElementById('alert_tips').parentNode.removeChild(document.getElementById('alert_tips'))
       }
     }, 3000)
   }
}