/* eslint-disable */
import './index.less'

// 全局公共img属性
let publicImgs = {}
function fRandom (under, over) {
    	switch (arguments.length) {
    		case 1:
    			return parseInt(Math.random() * under + 1)
    		case 2:
    			return parseInt(Math.random() * (over - under + 1) + under)
    		default: return 0
    	}
}
function imgIdList () {
    	let $that = document.querySelectorAll('.info-stream-img-list li')
    	if ($that.length == 0) {
    		return
    	}
    	let imglist = {}
    	for (let i = 0; i < $that.length; i++) {
    		let cid = $that[i].getAttribute('cid')
    		let imgStr = $that[i].getAttribute('value')
    		let imgArr = imgStr.split(',')
    		imglist[cid] = imgArr
    	}
    	return imglist
}

function imgPathFormt (imgId) {
    	return 'http://pic.iask.cn/fimg/' + imgId + '.jpg'
}

function hotTopInitImg () {
    	let imgs = document.querySelectorAll('.mip-hot-scroll mip-img')
    	for (let i = 0; i < imgs.length; i++) {
    		let cid = imgs[i].getAttribute('cid')
    		let imgArr = publicImgs[cid]
    		if (!imgArr) {
    			cid = '0'
    			imgArr = publicImgs[cid]
    		}
    		let index = fRandom(0, imgArr.length - 1)
    		let imgId = imgArr[index]
    		imgs[i].setAttribute('src', imgPathFormt(imgId))
    		imgArr.splice(index, 1)
    		publicImgs[cid] = imgArr
    	}
}

function relevantRecommendInitImg () {
    	let imgs = document.querySelectorAll('.mip-relevant-list mip-img')
    	for (let i = 0; i < imgs.length; i++) {
    		let cid = imgs[i].getAttribute('cid')
    		let imgid = imgs[i].getAttribute('imgid')
    		if (!imgid) {
    			let imgArr = publicImgs[cid]
    			if (!imgArr) {
    				cid = '0'
    				imgArr = publicImgs[cid]
    			}
    			let index = fRandom(0, imgArr.length - 1)
    			imgid = imgArr[index]
    			imgArr.splice(index, 1)
    			publicImgs[cid] = imgArr
    		} else {
    			let idArr = imgid.split(',')
    			let index = fRandom(0, idArr.length - 1)
        		imgid = idArr[index]
    		}
    		imgs[i].setAttribute('src', imgPathFormt(imgid))
    	}
}

// 换一换
function anotherChange (divClick, divTag, size) {
  let _click = document.querySelectorAll(divClick)[0]
  _click.addEventListener('click', function () {
    let $search = document.querySelectorAll(divTag)[0]
    for (let i = 0; i < $search.childNodes.length; i++) {
      let $tag = $search.childNodes[i]
      if (!$tag.localName) {
        continue
      }
      let className = $tag.className
      if (className.indexOf('show') > -1) {
        $tag.className = className.replace('show', 'hide')
        $search.appendChild($tag)
      }
    }
    let count = 0
    for (let i = 0; i < $search.childNodes.length; i++) {
      let $tag = $search.childNodes[i]
      if (!$tag.localName) {
        continue
      }
      if (count == size) {
        break
      }
      count++
      let className = $tag.className
      $tag.className = className.replace('hide', 'show')
    }
  })
}

function getScrollTop () {
  let scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}

function getClientHeight () {
  let clientHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
  }
  return clientHeight
}

function getScrollHeight () {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}

function isHidden (classDiv) {
  let _relevant = document.querySelectorAll('.mip-relevant-list li')
  let flag = false
  for (let i = 0; i < _relevant.length; i++) {
    if (!_relevant[i]) {
      continue
    }
    if (_relevant[i].className.indexOf('hide') > -1) {
      flag = true
      break
    }
  }
  return flag
}
function loadRecommendInfo () {
    	let a, b, c
    	a = window.screen.height // 浏览器窗口高度
  let luck = true
  window.addEventListener('scroll', function () {
    let loading = document.querySelectorAll('.mip-loading-more')[0]
		    let lodingHeight = !loading ? 0 : loading.offsetTop
    if (getScrollTop() + getClientHeight() >= lodingHeight && luck) {
      luck = false
      if (!isHidden('.mip-relevant-list li')) {
        document.querySelectorAll('.mip-loading-more')[0].className = 'hide'
        return
      }
      let _relevant = document.querySelectorAll('.mip-relevant-list li')
      let count = 0
      for (let i = 0; i < _relevant.length; i++) {
        if (!_relevant[i]) {
          continue
        }
        let className = _relevant[i].className
        if (className.indexOf('hide') > -1) {
          _relevant[i].className = className.replace('hide', 'show')
          count++
        }
        if (count == 5) {
          break
        }
      }
      luck = true
    }
  })
}

export default class MIPIaskDetail extends MIP.CustomElement {
  build () {
    let element = this.element

    // 初始化图片ID集合
    publicImgs = imgIdList()
    // 初始化热度top图片
    hotTopInitImg()
    // 初始化相关推荐图片
    relevantRecommendInitImg()
    // 热点检索换一换
    anotherChange('.hot-search-container .link-change', '.hot-search-container .hot-search-ul', 6)
    // 类似问题换一换
    anotherChange('.m-similar-container .link-change', '.m-similar-container .m-similar-list', 5)
    // 滚动加载相关推荐信息
    loadRecommendInfo()
  }
}
