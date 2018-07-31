window.onload = function(){
    var parallax = $('.parallax');
    parallax ? parallax.parallax() : '';
}
var idRule = '^(?:1[0-2]|[1-9])$';
var data = {};data.vc = 'com';
var changeLayer = $("#changeLayer");
var query = window.location.search.substring(1);
var imgsrc = [
    {a:'static/public/images/prot_icon/xz/a/', b:'static/public/images/prot_icon/xz/b/'},
    {a:'static/public/images/prot_icon/sx/a/', b:'static/public/images/prot_icon/sx/b/'}
];
//获取地址栏参数
$.getUrlParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
var xzw = {
    d: {
        'arr': ['今日','明日','本周','本月','今年','爱情'],
        'xz': [
            {'id': 0, 'name': '白羊座', 'aimg': imgsrc[0]['a']+'1.png', 'bimg': imgsrc[0]['b']+'1.png', 'date': '3.21-4.19', 'url': 'fate_info.html?1'},
            {'id': 1, 'name': '金牛座', 'aimg': imgsrc[0]['a']+'2.png', 'bimg': imgsrc[0]['b']+'2.png', 'date': '4.20-5.20', 'url': 'fate_info.html?2'},
            {'id': 2, 'name': '双子座', 'aimg': imgsrc[0]['a']+'3.png', 'bimg': imgsrc[0]['b']+'3.png', 'date': '5.21-6.21', 'url': 'fate_info.html?3'},
            {'id': 3, 'name': '巨蟹座', 'aimg': imgsrc[0]['a']+'4.png', 'bimg': imgsrc[0]['b']+'4.png', 'date': '6.22-7.22', 'url': 'fate_info.html?4'},
            {'id': 4, 'name': '狮子座', 'aimg': imgsrc[0]['a']+'5.png', 'bimg': imgsrc[0]['b']+'5.png', 'date': '7.23-8.22', 'url': 'fate_info.html?5'},
            {'id': 5, 'name': '处女座', 'aimg': imgsrc[0]['a']+'6.png', 'bimg': imgsrc[0]['b']+'6.png', 'date': '8.23-9.22', 'url': 'fate_info.html?6'},
            {'id': 6, 'name': '天秤座', 'aimg': imgsrc[0]['a']+'7.png', 'bimg': imgsrc[0]['b']+'7.png', 'date': '9.23-10.23', 'url': 'fate_info.html?7'},
            {'id': 7, 'name': '天蝎座', 'aimg': imgsrc[0]['a']+'8.png', 'bimg': imgsrc[0]['b']+'8.png', 'date': '10.24-11.22', 'url': 'fate_info.html?8'},
            {'id': 8, 'name': '射手座', 'aimg': imgsrc[0]['a']+'9.png', 'bimg': imgsrc[0]['b']+'9.png', 'date': '11.23-12.21', 'url': 'fate_info.html?9'},
            {'id': 9, 'name': '摩羯座', 'aimg': imgsrc[0]['a']+'10.png', 'bimg': imgsrc[0]['b']+'10.png', 'date': '12.22-1.19', 'url': 'fate_info.html?10'},
            {'id': 10, 'name': '水瓶座', 'aimg': imgsrc[0]['a']+'11.png', 'bimg': imgsrc[0]['b']+'11.png', 'date': '1.20-2.18', 'url': 'fate_info.html?11'},
            {'id': 11, 'name': '双鱼座', 'aimg': imgsrc[0]['a']+'12.png', 'bimg': imgsrc[0]['b']+'12.png', 'date': '2.19-3.20', 'url': 'fate_info.html?12'}
        ],
        'sx': [
            {'id': 0, 'name': '鼠', 'aimg': imgsrc[1]['a']+'1.png', 'bimg': imgsrc[1]['b']+'1.png', 'url': 'zodiac_info.html?1'},
            {'id': 1, 'name': '牛', 'aimg': imgsrc[1]['a']+'2.png', 'bimg': imgsrc[1]['b']+'2.png', 'url': 'zodiac_info.html?2'},
            {'id': 2, 'name': '虎', 'aimg': imgsrc[1]['a']+'3.png', 'bimg': imgsrc[1]['b']+'3.png', 'url': 'zodiac_info.html?3'},
            {'id': 3, 'name': '兔', 'aimg': imgsrc[1]['a']+'4.png', 'bimg': imgsrc[1]['b']+'4.png', 'url': 'zodiac_info.html?4'},
            {'id': 4, 'name': '龙', 'aimg': imgsrc[1]['a']+'5.png', 'bimg': imgsrc[1]['b']+'5.png',  'url': 'zodiac_info.html?5'},
            {'id': 5, 'name': '蛇', 'aimg': imgsrc[1]['a']+'6.png', 'bimg': imgsrc[1]['b']+'6.png',  'url': 'zodiac_info.html?6'},
            {'id': 6, 'name': '马', 'aimg': imgsrc[1]['a']+'7.png', 'bimg': imgsrc[1]['b']+'7.png',  'url': 'zodiac_info.html?7'},
            {'id': 7, 'name': '羊', 'aimg': imgsrc[1]['a']+'8.png', 'bimg': imgsrc[1]['b']+'8.png',  'url': 'zodiac_info.html?8'},
            {'id': 8, 'name': '猴', 'aimg': imgsrc[1]['a']+'9.png', 'bimg': imgsrc[1]['b']+'9.png',  'url': 'zodiac_info.html?9'},
            {'id': 9, 'name': '鸡', 'aimg': imgsrc[1]['a']+'10.png', 'bimg': imgsrc[1]['b']+'10.png',  'url': 'zodiac_info.html?10'},
            {'id': 10, 'name': '狗', 'aimg': imgsrc[1]['a']+'11.png', 'bimg': imgsrc[1]['b']+'11.png',  'url': 'zodiac_info.html?11'},
            {'id': 11, 'name': '猪', 'aimg': imgsrc[1]['a']+'12.png', 'bimg': imgsrc[1]['b']+'12.png',  'url': 'zodiac_info.html?12'}
        ]
    },
    ToUnicode:function(str){
        return escape(str).replace(/%/g,"\\").toLowerCase();
    },
    UnUnicode:function(str){
        return unescape(str.replace(/\\/g, "%"));
    },
    GetJson: function (url, data, fun) {
        var url = "http://api.xzw.com/com/json/"+url+"?callback=?";
        $.getJSON(url, data, function(result){
            if(result.code != 200){
                xzw.Dialog(result.message);
            }else {
                fun(result);
            }
        })
    },
    Render: function (tpl, data, obj) {
        tpl = tpl ? tpl : '#tpl';
        data = data ? data : xzw.d;
        obj = obj ? obj : '#layerBody';
        var _tpl = $(tpl).html();
        var _html = template(_tpl, data);
        $(obj).html(_html);
    },
    Dialog:function (tip) {
        var t = '<div id="tip" class="tip"><span>'+tip+'</span></div>';
        var objt = $('#tip');
        if(objt.length <= 0)
            $("html").append(t);
        if(objt.css('display') == 'none')
            objt.fadeIn();
        setTimeout(function(){
            var objt = $('#tip');
            objt.fadeOut();
        },2000)
    },
    CheckInput:function(btn) {
        var form = btn.closest('.form_item'), input = form.find('.require'), boolean = true;
        input.each(function(){
            if(!$(this).val()) {boolean = false; return false};
        });
        if(boolean == true){return true;}
    },
    AstroCx:function (obj) {
        var obj = $(obj), inputbtn = obj.find('.inputbtn'),
            dateinput = obj.find('.dateinput'),
            timeinput = obj.find('.timeinput'),
            placeinput = obj.find('.placeinput');
        var opt={};
        opt.default = {
            lang: 'zh',
            theme : 'ios',
            mode: 'scroller',
            minWidth: ['33.333333%'],
        }
        opt.date = {
            preset : 'date',
            dateFormat: 'yyyy-mm-dd',
            startYear: 1936,
            endYear: 2100,
            nowText: "今天",
            txtobj : 'span',
            returnSolar: 1
        };
        opt.time = {
            preset : 'time',
            showNow: true,
            txtobj : 'span',
            onSet : function(a){
                var val = a.valueText;
                $(this).attr('data-val', val);
                $('input', this).val(val);
                $('span', this).addClass('curr').html(val);
            }
        };
        opt.place = {
            txtobj : 'span'
        };
        dateinput.mobiscroll().solarPicker($.extend(opt['date'], opt['default']));
        timeinput.mobiscroll().time($.extend(opt['time'], opt['default']));
        placeinput.mobiscroll().place($.extend(opt['place'], opt['default']));
        inputbtn.click(function(e){
            var _this = $(e.target), id = _this.attr('id');
            var f = _this.closest('.form_item');
            if(!xzw.CheckInput(_this))
                xzw.Dialog('请填写完整表单');
            else{
                var d = f.find('.dateinput').attr('data-val');
                var reg = new RegExp("-","g");
                var q = d.replace(reg, "/");
                if(id == 'jz'){
                    var t = timeinput.attr('data-val');
                    var reg = new RegExp(":","g");
                    var time = t.replace(reg, "/");
                    var p = placeinput.attr('data-val');
                    var reg = new RegExp("、","g");
                    var place = p.replace(reg, ",");
                    place = xzw.ToUnicode(place);
                    q += '_'+time+'_'+place;
                }

                location.href = 'astrocx_info.html?q='+q;
            }
        })
    },
    AstroCxInfo: function () {
        var q = $.getUrlParam("q");
        if(q == null) {history.back();}
        var s = q.split('_');
        if(s.length <= 0 || s.length >= 4){history.back();}
        var s2 = s[0].split('/');
        var p = s2[0]+'年'+s2[1]+'月'+s2[2]+'日';
        var accurate = false;
        data.token = 'Lxnn6mRZ3qXvo6smQ';
        data.q = s[0];
        if(s.length > 1){
            var s3 = s[1].split('/');
            p += s3[0]+'时'+s3[1]+'分';
            var place = xzw.UnUnicode(s[2]);
            data.q += '_'+s[1]+'_'+place;
            accurate = true;
        }
        xzw.GetJson("cquery.js", data, function (result) {
            result.date = p;
            result.accurate = accurate;
            if(result.data[0].index == null) {
                xzw.Dialog("参数错误");
            }else{
                $.each(xzw.d['xz'], function (i, array) {
                    if(array.name == result.data[0].index[0]){
                        result.data[0].id = array.id + 1;
                    }
                    if(accurate == true){
                        if(array.name == result.data[1].index[0]){
                            result.data[1].id = array.id + 1;
                        }
                    }
                });
                xzw.Render(false, result, '#content');
                var xz_change = $('#xzChange');
                var item = xz_change.find('dl.item');
                var xzbody = xz_change.find('div.xzbody');
                item.click(function (e) {
                    var _this = $(this), cla = _this.attr('datatype');
                    item.removeClass('curr').eq(cla).addClass('curr');
                    xzbody.hide().eq(cla).show();
                })
            }
        })
    },
    CloseLayer: function () {
        changeLayer.children('.layerbg').fadeOut(100).end().children('.layerBox').animate({bottom: '-10.8rem'}, 500);
        setTimeout(function () {changeLayer.css('z-index', -1);},500);
    },
    ChangeLayer:function (btn, swiper, t) {
        var itemBoy = $("#itemBoy"),
            itemgirl = $("#itemgirl"),
            sure = $("#sure");
        btn = btn ? btn : "#changeBtn";
        btn = $(btn);
        var close = changeLayer.find('.close'),
            pair = changeLayer.find('input');
        var boySrc = itemBoy.find('img'),
            boyName = itemBoy.find('.name'),
            girlSrc = itemgirl.find('img'),
            girlname = itemgirl.find('.name');
        var boy = "#swiperboy", girl = "#swipergirl";
        var storage = window.Storage && window.localStorage && window.localStorage instanceof Storage;
        if(swiper == true){
            function initSwiper(obj, i){
                var object = new Swiper(obj, {
                    slidesPerView:3,
                    loop:true,
                    direction:'vertical',
                    centeredSlides : true,
                    initialSlide : i,
                    slideToClickedSlide : true
                });
                return object;
            }
            function imgSrc(t, n) {
                return "static/public/images/prot_icon/"+t+"/a/"+n+".png";
            }
            function index(v) {
                var it = v.split('&');
                var b = it[0], g = it[1];
                return [b,g];
            }
            function setParam(v) {
                var s = index(v);
                var src1 = imgSrc(t, s[0]);
                var src2 = imgSrc(t, s[1]);
                boySrc.attr('src', src1);
                girlSrc.attr('src', src2);
                pair.val(v);
                boyName.text(xzw.d[t][s[0]-1].name);
                girlname.text(xzw.d[t][s[1]-1].name);
            }
            if(storage&&localStorage.getItem(t)){
                pair.val(localStorage.getItem(t));
            }
            var v = pair.val();
            var s = index(v);
            var bswiper = initSwiper(boy, s[0]-1);
            var gswiper = initSwiper(girl, s[1]-1);
            setParam(v);
            sure.click(function(e){
                var b = bswiper.realIndex + 1, g = gswiper.realIndex + 1;
                var v2 = b+'&'+g;
                setParam(v2);
                xzw.CloseLayer();
                storage ? localStorage.setItem(t, v2) : '';
            })
        }
        btn.click(function(){
            changeLayer.css('z-index', 2).children('.layerbg').fadeIn(100).end().children('.layerBox').animate({bottom: 0}, 500);
        })
        close.click(function(){
            xzw.CloseLayer();
        })
    },
    pair: function (t) {
        var pairbtn = $('#pairbtn')
        xzw.Render(false,false, '#swiperboy .swiper-wrapper, #swipergirl .swiper-wrapper');
        xzw.ChangeLayer('#pairbox .head, #pairbox .name', true, t);
        pairbtn.click(function () {
            var p = changeLayer.find('input').val();
            pairbtn.attr('href', t+'pair_info.html?'+p);
        });
    },
    PairInfo: function (t) {
        var id = window.location.search.substring(1);
        id = id.split('&');
        if(id[0].match(idRule) == null || id[1].match(idRule) == null){
            history.back();
        }
        data.aid = id[0];
        data.bid = id[1];
        data.token = 'Lxnn6mbZpzSxqPGmJaKeKqPbHabwo2Cow';
        var url = 'shengxiao_pair.js';
        if(t == 'xz'){
            data.vc = 'Bixby';
            data.token = 'LSi0mmRoqDdvY3O3Q';
            url = 'pair.js';
        }
        xzw.GetJson(url, data, function (result) {
            result.data.aid = data.aid;
            result.data.bid = data.bid;
            xzw.Render(false, result, '#content');
        })
    },
    ViewInfo: function (t) {
        var id = query;
        var obj = '#changeDayLayer', changeDay = '#changeDay';
        if(id.match(idRule) == null){
            history.back();
        }
        xzw.Render(false,false,false);
        xzw.ChangeLayer(false, false, t);
        function getInfo(id, ld) {
            data.id = id;
            data.token = 'Lxnn6mbZpzSxqPGmJaKeKo';
            var url = 'shengxiao.js';
            var array = [];
            if(ld != 'sx'){
                data.ld = ld;
                data.token = 'Lxnn6mSoW3fyH642Y+Eb3E';
                url = 'fortune.js';
            }
            xzw.GetJson(url, data, function (result) {
                if(ld != 'sx'){
                    array = result.data[0];
                    array.id = id;
                    array.name = xzw.d.xz[id-1].name;
                    array.fate = xzw.d.arr[ld];
                    obj = '#changeDayLayer .info_box';
                }else{
                    array = result.data;
                    array.id = id;
                    array.name = array.index[0];
                    var obj = '#content';
                }
                xzw.Render('#tpl_info', array, obj);
            })
        }
        getInfo(id, t);
        if(t == 'xz'){
            var swiper = new Swiper(obj, {
                pagination: {
                    el: changeDay,
                    clickable: true,
                    renderBullet: function (index, className) {
                        return '<span class="' + className + '">' + xzw.d.arr[index] + '</span>';
                    }
                },
                on: {
                    slideChangeTransitionStart: function () {
                        var ld = this.activeIndex;
                        getInfo(id, ld);
                    }
                }
            });
        }
        var layerBody = $('#layerBody');
        var item = layerBody.find('.item');
        item.click(function (e) {
            id = item.index(this) + 1;
            var ld = t == 'xz' ? swiper.activeIndex : t;
            getInfo(id, ld);
            xzw.CloseLayer();
            var stateObject = {id: id};
            var newUrl = "/fate_info.html?" + id;
            if(t == 'sx'){
                newUrl = "/zodiac_info.html?" + id;
            }
            history.replaceState(stateObject, "", newUrl);
        })
    },
    Astrolabe:function (obj) {
        var obj = $(obj), inputbtn = obj.find('.inputbtn'),
            nickinput = obj.find(".nickinput input"),
            dateinput = obj.find('.dateinput'),
            timeinput = obj.find('.timeinput'),
            placeinput = obj.find('.placeinput');
        var opt={};
        opt.default = {
            lang: 'zh',
            theme : 'ios',
            mode: 'scroller',
            minWidth: ['33.333333%'],
        }
        opt.date = {
            preset : 'date',
            dateFormat: 'yyyy-mm-dd',
            startYear: 1936,
            endYear: 2100,
            nowText: "今天",
            txtobj : 'span',
            returnSolar: 1
        };
        opt.time = {
            preset : 'time',
            showNow: true,
            txtobj : 'span',
            onSet : function(a){
                var val = a.valueText;
                $(this).attr('data-val', val);
                $('input', this).val(val);
                $('span', this).addClass('curr').html(val);
            }
        };
        opt.place = {
            txtobj : 'span'
        };

        dateinput.mobiscroll().solarPicker($.extend(opt['date'], opt['default']));
        timeinput.mobiscroll().time($.extend(opt['time'], opt['default']));
        placeinput.mobiscroll().place($.extend(opt['place'], opt['default']));
        inputbtn.click(function(e){
            var _this = $(e.target), id = _this.attr('id');
            var f = _this.closest('.form_item');
            if(!xzw.CheckInput(_this))
                xzw.Dialog('请填写完整表单');
            else{
                var name = nickinput.val();
                var d = dateinput.attr('data-val');
                var t = timeinput.attr('data-val');
                var p = placeinput.attr('data-val');
                var reg = new RegExp("、","g");
                p = p.replace(reg, ",");
                p = xzw.ToUnicode(p);
                location.href = 'astrolabe_info.html?q='+d+'_'+t+'_'+p;
            }
        })
    },
    AstrolabeInfo:function () {
        var q = $.getUrlParam("q");
        if(q == null) {history.back();}
        var s = q.split('_');
        if(s.length != 3){history.back();}
        data.token = "Lxnn6mae3rPvoyblZignXE";
        data.date = s[0];
        data.time = s[1];
        data.place = xzw.UnUnicode(s[2]);
        xzw.GetJson("labe_uri.js", data, function (result) {
            var pan = result.data;
            if(pan == null){xzw.Dialog("参数错误");}
            else{
                var img = 'https://m.xzw.com/astrolabe/img-'+pan+'.png';
                $("#graphs").hide().html("<img src="+img+" />").fadeIn(300);
                $("#viewDesc").click(function () {
                    location.href = "https://m.xzw.com/astrolabe/s-"+pan+".html#p=1"
                });
            }
        })
    },
    cxjr: function (obj){
        var f = $(obj);
        var dateinput = f.find(".dateinput");
        var btn = f.find("#cx");
        dateinput.mobiscroll().date({
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            minWidth: ['33.333333%'],
            dateFormat: 'yyyy-mm-dd',
            startYear:1912,endYear:2029,
            onSet:function(d,t) {
                var ds=d.valueText.split('-');
                $('span',this).text(ds[0]+'年'+ds[1]+'月').addClass('notempty');
                $(this).attr('data-val', d.valueText);
            }
        });
        btn.click(function () {
            var d = dateinput.attr('data-val');
            console.log(d);
        })

    },
    cxjhjr: function (obj){
        var f = $(obj);
        var dateinput = f.find(".dateinput");
        var btn = f.find("#cx");
        dateinput.mobiscroll().date({
            theme: 'ios',
            lang: 'zh',
            display: 'bottom',
            minWidth: 100,
            dateFormat: 'yy-m',
            startYear:1912,endYear:2029,
            onSet:function(d,t) {
                var ds=d.valueText.split('-');
                $(this).attr('data-val', d.valueText);
                $('span',this).text(ds[0]+'年'+ds[1]+'月').addClass('notempty');
            }
        });
        btn.click(function () {
            var d = dateinput.attr('data-val');
            console.log(d);
        })
    },
    xxpair: function (ot) {
        var A=$('.'+ot.obj),B=$('#'+ot.obj);
        A.click(function(){
            $('#'+ot.obj+'_dummy').click();
        });
        B.mobiscroll().select({
            theme: 'ios',
            inputType: 'hidden',
            minWidth: 100,
            onSet: function(d,t){
                $('span',A).text((A.data('d')?A.data('d')+'：':'')+d.valueText.replace(/\((.*)\)/,'')).addClass('notempty');
                $('input.inp_val',A).val($('option:selected',B).val());
            }
        });
    }
}