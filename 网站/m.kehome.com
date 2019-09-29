//AJAX加载分页
$(function(){
    var page = curpage;
    $('.newslist').dropload({
        scrollArea : window,
		domDown : {
            domClass   : 'dropload-down',
            domRefresh : '<div class="dropload-refresh"></div>',
            domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
            domNoData  : '<div class="dropload-noData">已全部加载完</div>'
        },
        loadDownFn : function(me){
            page++;
            var result = '';
            $.ajax({
                type: 'GET',
				url: "/e/extend/ajaxlist.php",
				dataType: 'json',
				data:{"classid":classid,"tbname":'news',"line":'10',"days":'',"orderby":'newstime',"cache":"0","page":page}, 
                success: function(data){
                    var arrLen = data.length;
                    if(arrLen > 0){
                        for(var i=0; i<arrLen; i++){
							if( i==3 || i==6 || i==9){ ad = '';} else { ad ='';}	//每隔3行插入信息流广告
                            result += ad +  '<li class="item opacity"  data-id="' + data[i].id + '">' + data[i].listimg + '<div class="extra"><span class="cate">' + data[i].classname + '</span><span class="from">' + data[i].writer + '</span><span class="time"><time class="timeago" datetime="' + data[i].time + '.0"></time></span></div></li>';
                        }
                    }else{
                        me.lock();
                        me.noData();
                    }
					setTimeout(function(){  
                        $('#content_list').append(result);
						$(".timeago").timeago();
						original();
					},300);
                       me.resetload();
                },
                error: function(xhr, type){
                   // alert('Ajax error!');
                    me.resetload();
                }
            });
        }
    });
});
