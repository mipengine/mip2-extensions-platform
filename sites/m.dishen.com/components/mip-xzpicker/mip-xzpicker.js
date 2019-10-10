import './index.less'
// 星座选择控件
function xzPicker(options) {
    var defaults = {
        index: 5, //高亮位置
        startX: 0, //起始坐标x
        startY: 0, //起始坐标y
        storeY: 0, //保存y坐标
        scrollY: !1,
        astro: [{
                index: '1',
                name: '白羊座',
                date: '3日21日-4月20日',
                value: 'aries'
            },
            {
                index: '2',
                name: '金牛座',
                date: '4月20日-5月20日',
                value: 'taurus'
            },
            {
                index: '3',
                name: '双子座',
                date: '5月21日-6月21日',
                value: 'gemini'
            },
            {
                index: '4',
                name: '巨蟹座',
                date: '6月22日-7月22日',
                value: 'cancer'
            },
            {
                index: '5',
                name: '狮子座',
                date: '7月23日-8月22日',
                value: 'leo'
            },
            {
                index: '6',
                name: '处女座',
                date: '8月23日-9月22日',
                value: 'virgo'
            },
            {
                index: '7',
                name: '天秤座',
                date: '9月23日-10月23日',
                value: 'libra'
            },
            {
                index: '8',
                name: '天蝎座',
                date: '10月24日-11月22日',
                value: 'scorpio'
            },
            {
                index: '9',
                name: '射手座',
                date: '11月23日-12月21日',
                value: 'sagittarius'
            },
            {
                index: '10',
                name: '摩羯座',
                date: '12月22日-1月19日',
                value: 'capricorn'
            },
            {
                index: '11',
                name: '水瓶座',
                date: '1月20日-2月18日',
                value: 'aquarius'
            },
            {
                index: '12',
                name: '双鱼座',
                date: '2月19日-3月20日',
                value: 'pisces'
            }
        ],
        callback: function(data) { {
                var AJAXurl = options.fetchUrl + "?girlCaturl=" + data.girl.index + "&boyCaturl=" + data.boy.index + "";
                fetch(AJAXurl).then(function(res) {
                    return res.json()
                }).then(function(data) {
                    if (data.code == 200) {

                        if (!!options.href) {
                            var href = options.href.replace("_val_", "" + data.pair_id);
                            window.location.href = href;
                        }
                    } else {
                        console.log(data.msg);
                    }
                }).catch(function(ex) {
                    // 捕获 parse的异常
                    console.log('parsing failed', ex)
                });
            }
        }
    };
    this.params = defaults
}
xzPicker.prototype = {
    createHTML: function() {
        var listStr = '';
        for (var i = 0; i < this.params.astro.length; i++) {
            listStr += ' <li><span class="pic xz-icon_' + (i + 1) + '"></span><div class="tit">' + this.params.astro[i].name + '</div></li>';
        }
        var html =
            '<div class="xz-picker-inner">' +
            '<div class="xz-picker-head">' +
            '<h3 class="title">选择星座</h3>' +
            '<a class="close"></a>' +
            '</div>' +
            '<div class="xz-picker-body">' +
            '<div class="picker-columns">' +
            '<div class="picker-column">' +
            '<div class="picker-name">女生</div>' +
            '<div class="picker-list picker-girl-list">' +
            '<ul>' + listStr + '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="picker-column">' +
            '<div class="picker-name">男生</div>' +
            '<div class="picker-list picker-boy-list">' +
            '<ul>' + listStr + '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="picker-ctrl">' +
            '<a class="btn btn-pair"><span class="btn-text">开始配对</span></a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="xz-selector-overlay"></div>';
        this.pickerEl = document.createElement("div");
        this.pickerEl.className = "xz-picker on";
        this.pickerEl.id = "xzPicker";
        this.pickerEl.innerHTML = html;
        document.body.appendChild(this.pickerEl);
    },
    events: function() {
        var _self = this;
        var pickerList = _self.pickerEl.querySelectorAll('.picker-list');
        var pickerScroll1 = new xzScroll().init(pickerList[0]);
        var pickerScroll2 = new xzScroll().init(pickerList[1]);
        _self.pickerEl.querySelector('.close').addEventListener('click', function() {
            _self.pickerEl.classList.remove('on')
        })
        _self.pickerEl.querySelector('.xz-selector-overlay').addEventListener('click', function() {
            _self.pickerEl.classList.remove('on')
        })
        _self.pickerEl.querySelector('.btn-pair').addEventListener('click', function() {
            var girlIndex = _self.pickerEl.querySelector('.picker-girl-list').getAttribute('data-index');
            var boyIndex = _self.pickerEl.querySelector('.picker-boy-list').getAttribute('data-index');
            var girlData = _self.params.astro[girlIndex];
            var boyData = _self.params.astro[boyIndex];
            _self.params.callback({
                girl: girlData,
                boy: boyData
            })
        })
    },
    init: function(el) {
        this.trigger = el;
        var that = this;
        this.trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (that.pickerEl == undefined) {
                that.createHTML();
                that.events();
            } else {
                that.pickerEl.classList.add("on");
            }
        });
    }
}
// 星座选择滚动scroll
function xzScroll(options) {
    var defaults = {
        index: 5,
        startX: 0, // 记录起始位置
        startY: 0, // 记录起始位置
        scrollY: 0,
        offsetY: 0, // 当前滑动偏移量
        recordY: 0, // 记录滑动后conBox偏移量
        timestamp: 0,
        speed: 400
    }
    this.params = defaults;
}
xzScroll.prototype = {
    init: function(el) {
        var _self = this
        _self.dom = el
        _self.params.list = el.querySelector('ul')
        _self.params.items = el.querySelectorAll('li')
        _self.params.itemHeight = _self.params.items[0].offsetHeight
        _self.params.scrollHeight = _self.params.list.offsetHeight - el.offsetHeight // 可滚动的高度
        if (_self.params.index) {
            _self.params.offsetY = -_self.params.index * _self.params.itemHeight;
            _self.params.recordY = _self.params.offsetY;
            _self.params.list.style["transform"] = 'translate(0,' + _self.params.offsetY + 'px)';
            el.setAttribute('data-index', _self.params.index);
        }
        this.bindEvents();
    },
    bindEvents: function() {
        var _self = this
        function correctOffsetY(_offsetY) {
            // 超出容器左边界
            if (-_offsetY <= 0) {
                _offsetY = Math.pow(_offsetY, 0.8);
            }
            // 超出容器右边界
            else if (-_offsetY >= _self.params.scrollHeight) {
                _offsetY = -_self.params.scrollHeight - Math.pow(-_offsetY - _self.params.scrollHeight, 0.8);
            }
            return _offsetY;
        }
        _self.params.list.addEventListener('touchstart', function(e) {
            _self.params.startX = e.touches[0].pageX;
            _self.params.startY = e.touches[0].pageY;
            _self.params.scrollY = undefined;
            _self.params.timestamp = new Date().getTime();
        }, false)
        _self.params.list.addEventListener("touchmove", function(e) {
            var distX = e.touches[0].pageX - _self.params.startX;
            var distY = e.touches[0].pageY - _self.params.startY;
            if (typeof _self.params.scrollY == 'undefined') {
                _self.params.scrollY = Math.abs(distX) < Math.abs(distY);
            }
            if (_self.params.scrollY) {
                e.preventDefault();
                // 当前滑动偏移
                _self.params.offsetY = distY + _self.params.recordY;
                // 偏移限定纠正
                _self.params.offsetY = correctOffsetY(_self.params.offsetY);
                _self.params.list.style["transform"] = 'translate(0,' + _self.params.offsetY + 'px)';
            }
        }, false);
        // 释放触摸，回滚
        _self.params.list.addEventListener('touchend', function(e) {
            var s = e.changedTouches[0].pageY - _self.params.startY,
                t = new Date().getTime() - _self.params.timestamp,
                v = Math.abs(s) / t;
            if (v > 0.3) {
                if (s > 0) {
                    _self.params.offsetY -= v * _self.params.offsetY * 1.2;
                } else {
                    _self.params.offsetY += v * _self.params.offsetY * 1.2;
                }
            }
            if (_self.params.offsetY > 0) {
                _self.params.index = 0;
                _self.params.recordY = 0;
                _self.params.offsetY = 0;
                doAnimation();
                // _self.params.list.style["transform"] = 'translate(0,0px)';
            } else if (-_self.params.offsetY > _self.params.scrollHeight) {
                _self.params.index = _self.params.items.length - 1;
                _self.params.recordY = -_self.params.scrollHeight;
                _self.params.offsetY = -_self.params.scrollHeight;
                // _self.params.list.style["transform"] = 'translate(0,-' + _self.params.scrollHeight + 'px)';
                doAnimation();
            } else {
                var count = parseInt((_self.params.offsetY - _self.params.itemHeight / 2) / _self.params.itemHeight);
                _self.params.index = Math.abs(count);
                _self.params.offsetY = count * _self.params.itemHeight;
                _self.params.recordY = _self.params.offsetY;
                // _self.params.list.style["transform"] = 'translate(0,' + _self.params.offsetY + 'px)';
                doAnimation();
            }
            _self.dom.setAttribute('data-index', _self.params.index);
        }, false);
        //缓动动画 dir:步长 差值
        function doMove(obj, dir, target) {
            var obj = obj || _self.params.list;
            var dir = dir || 15;
            var target = _self.params.offsetY;
            var curY = parseInt(obj.style["transform"].split(',')[1].replace('px)', ''));
            dir = curY < target ? dir : -dir;
            clearInterval(obj.timer);
            obj.timer = setInterval(function() {
                var speed = parseInt(obj.style["transform"].split(',')[1].replace('px)', '')) + dir;
                if (dir > 0 && speed > target || dir < 0 && speed < target) {
                    speed = target;
                }
                obj.style["transform"] = 'translate(0,' + speed + 'px)';
                if (speed == target) {
                    clearInterval(obj.timer);
                }
            }, 10);
        }
        //缓动动画
        function doAnimation() {
            var curY = parseInt(_self.params.list.style["transform"].split(',')[1].replace('px)', ''));
            runAnimation(curY, _self.params.offsetY, 300, function(value) {
                _self.params.list.style["transform"] = 'translate(0,' + value + 'px)';
            });
        }
    }
}
// 对运动方法进行封装
var runAnimation = function(from, to, duration, callback) {
    var options = {
        duration: duration || 300,
        callback: callback || null
    };
    // requestAnimationFrame的兼容处理
    if (!window.requestAnimationFrame) {
        requestAnimationFrame = function(fn) {
            setTimeout(fn, 17);
        };
    }
    // 算法需要的几个变量
    var start = 0;
    // during根据设置的总时间计算
    var during = Math.ceil(options.duration / 17);
    /*
     * t: current time（当前时间）；
     * b: beginning value（初始值）；
     * c: change in value（变化量）；
     * d: duration（持续时间）。
     * you can visit 'http://easings.net/zh-cn' to get effect
     */
    var fnGetValue = function(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    }
    // 运动
    var step = function() {
        // 当前的运动位置
        var value = fnGetValue(start, from, to - from, during);
        // 时间递增
        start++;
        // 如果还没有运动到位，继续
        if (start <= during) {
            options.callback(value);
            requestAnimationFrame(step);
        } else {
            // 动画结束，这里可以插入回调...
            options.callback(to, true);
        }
    };
    // 开始执行动画
    step();
};
export default class MIPXzpicker extends MIP.CustomElement {
    build() {
        let el = this.element
        let fetchUrl = el.getAttribute("fetch-url");
        let href = el.getAttribute("data-href")
        let picker = new xzPicker({
            fetchUrl: fetchUrl,
            href: href
        })
        picker.init(this.element)
    }
}
