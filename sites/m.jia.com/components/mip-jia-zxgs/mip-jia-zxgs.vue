<template>
	<section class="other-section" :class="contentShow">
		<section class="other-fixed">
			<div class="other-tab">
				<span tjjj="click_m_zixun_new_gstab" class="tab-li" :class="{'cur':contentShow=='zxgs'}" @click="changeTab('zxgs')">装修公司</span>
				<span tjjj="click_m_zixun_new_wztab" :class="{'cur':contentShow=='article'}" @click="changeTab('article')" class="tab-li">文章</span>
				<span tjjj="click_m_zixun_new_altab" :class="{'cur':contentShow=='anli'}" @click="changeTab('anli')" class="tab-li">案例</span>
				<span tjjj="click_m_zixun_new_tutab" :class="{'cur':contentShow=='tuku'}" @click="changeTab('tuku')" class="tab-li">效果图</span>
			</div>
		</section>
		<div class="commonList zxgs-box">
			<section class="screen-outer" id="screenOuter">
				<div class="condition-screen">
					<nav class="menu-nav clearfix">
						<span class="nav-a whole-city" :class="{'active':zxgsArea,'in':!zxgsCityAreaText}"  @click="_setData({ zxgsArea: true, zxgsSort: false, zxgsFilter: false,scroll: 'screenOuter'})" tjjj="click_m_zx_list_quyu"><em></em><span>{{!zxgsCityAreaText?areaText:'区域'}}</span><i></i></span>
						<span class="nav-a sort" :class="{'active':zxgsSort,'in':zxgsSortText!='排序'}"  @click="_setData({ zxgsArea: false, zxgsSort: true, zxgsFilter: false,scroll: 'screenOuter'})" tjjj="click_m_zx_list_px"><em></em><span>{{zxgsSortText}}</span><i></i></span>
						<span class="nav-a screen" :class="{'active':zxgsFilter,'in':houseTag!=''||service!=''||tese!=''||genre!=''}"  @click="_setData({ zxgsArea: false, zxgsSort: false, zxgsFilter: true,scroll: 'screenOuter'})" tjjj="click_m_zx_list_shaixuan"><em></em><span>筛选</span><i></i></span>
					</nav>
					<div class="screen-option" :class="{'city':zxgsArea,'sort':zxgsSort,'filter':zxgsFilter}">
						<div class="factor-list city-list">
							<ul class="">
								<li :class="{'cur':areaText=='全城'}" @click="changeArea('全城','')"><span>全城</span></li>
								<li :class="{'cur':areaText==item.tag_name}" v-for="(item,index) in areaList"
									@click="changeArea(item.tag_name,item.tag_id)"><span>{{item.tag_name}}</span>
								</li>
							</ul>
						</div>
						<div class="factor-list sort-list">
							<ul class="zx-screening">
								<li v-for="(item,index) in sortList" :key="index" :data-type="item.type" :data-text="item.title" @click="sortTap($event)">
									<span :class="{'zx-span':item.icon}" tjjj="click_m_zx_list_px_zh">
									  <div class="first_screening">{{item.title}}</div>
									  <div class="zx_subtitle_text" v-if="item.tit">{{item.tit}}</div>
									  <div class="zx-sheji" v-if="item.icon">
										<div class="zx-persion">{{item.icon}}</div>
									  </div>
									</span>
								</li>
							</ul>
						</div>
						<div class="factor-list screen-list">
							<div class="y_new_list">
								<div class="condition condi-fwlx">
									<p>擅长房型</p>
									<ul class="clearfix">
										<li v-for="(item,index) in houseList" :class="{'cur':houseTag==item.tag}" :data-house-tag="item.tag" :data-area_num="item.area_num" @click="houseTap($event)"><span>{{item.text}}</span></li>
									</ul>
								</div>
								<div class="condition condi-zxfu">
									<p>装修服务</p>
									<ul class="clearfix">
										<li v-for="(item,index) in serviceList" :class="{'cur':service==item.tag}" :data-service="item.tag" @click="serviceTap($event)"><span>{{item.text}}</span></li>
									</ul>
								</div>
								<div class="condition condi-tsfu">
									<p>特色服务</p>
									<ul class="clearfix">
										<li v-for="(item,index) in teseList" :class="{'cur':tese==item.tag}" :data-tese="item.tag" @click="teseTap($event)"><span>{{item.text}}</span></li>
									</ul>
								</div>
								<div class="condition condi-fgph">
									<p>风格偏好</p>
									<ul class="clearfix">
										<li v-for="(item,index) in styleList" :class="{'cur':genre==item.text}" :data-genre="item.text" @click="styleTap($event)"><span>{{item.text}}</span></li>
									</ul>
								</div>
							</div>
							<div class="screen-op-btn clearfix">
								<span class="screen-reset" tjjj="click_m_zx_list_reset" @click="resetButton">重置</span>
								<span class="screen-ensure" tjjj="click_m_zx_list_submit" @click="confirmButton">确定</span>
							</div>
						</div>
					</div>
					<div class="nav-popmask" :class="{'show':zxgsArea||zxgsSort ||zxgsFilter}"  @click="_setData({ zxgsArea: false, zxgsSort: false, zxgsFilter: false})"></div>
				</div>
			</section>
			<section class="zxcompany-list">
				<div class="company-item" v-for="(item,index) in zxgsData" :key="index">
					<a class="y_layout" :href="`https://m.jia.com${item.detail_url}`">
						<div class="zx-template">
							<mip-img class="y_store_the_cover" :src="(item.pub_pictures && item.pub_pictures.url) || item.shop_logo"></mip-img>
							<div class="advertisemenTip" v-if="item.cpc_shop_top === 1">广告</div>
							<mip-img class="zx-video" v-if="item.video_photo === 1" src="https://mued3.jia.com/image/zx-new/zx-smallVideo.png"></mip-img>
						</div>
						<div class="zx_company_box">
							<div class="zx-ti zx-line">
								<span class="company-name">{{item.shop_name}}</span>
								<div v-if="item.is_toupai == 1"><i class="MEDALS"></i></div>
								<div v-if="item.is_city_toupai == 1"><i class="CITY_MEDALS"></i></div>
							</div>
							<div class="info-star clearfix">
								<div :class="`rate-star star${item.shop_evaluation_score.star}`"><i class="star-lit"></i></div>
								<span>设计<label>{{item.shop_evaluation_score.design_score}}</label>|</span><span>施工<label>{{item.shop_evaluation_score.construction_score}}</label>|</span><span>服务<label>{{item.shop_evaluation_score.services_score}}</label></span>
							</div>
							<div class="zx_type_money">
								<span>{{item.price_name}}&nbsp;{{item.price_value}}</span>
								<div class="seniorShopsIcon" v-if="item.category === 1"></div>
								<div class="AuthenticationIcon" v-if="item.category === 2"></div>
							</div>
							<div class="y_Thelabel">
								<div v-for="(a,b) in item.shop_service_tag">{{a}}</div>
							</div>
							<div class="zx-ranking zx-ti zx-describe" v-if="item.zhuangxiu_product_ico && item.zhuangxiu_product_ico.cuxiao === 1">
								<i class="topTen"></i>
								<span>{{item.zhuangxiu_product_ico.cuxiao_text}}</span>
							</div>
							<div class="zx-ranking zx-ti zx-describe" v-if="item.zhuangxiu_product_ico && item.zhuangxiu_product_ico.quan === 1">
								<i class="cu"></i>
								<span>{{item.zhuangxiu_product_ico.quan_text}}</span>
							</div>
						</div>
					</a>
				</div>
				<div class="zxgs-default" v-if="noData">
					<mip-img class="img" src="https://mued3.jia.com/image/mobile/zhuangxiu/hxt-default.png"></mip-img>
					<p>没有找到对应的装修公司<br>换个筛选条件试试</p>
					<span class="cleanr-screen" @click="resetButton">清除筛选条件</span>
				</div>
			</section>
		</div>
		<div class="commonList related-reading">
			<a v-for="(item,index) in articleData" :href="`${item.mip_url?item.mip_url:item.news_type == 'video'?'https://m.jia.com/zixun/video/${item.id}.html?source=wztcwz':'https://m.jia.com/zixun/article/${item.id}.html?source=wztcwz'}`" :class="`list_style list_style${item.img_style} ${item.news_type == 'video'?'video':''} clearfix bgTJJ`" once="0">
				<div :class="`list_style${item.img_style}_left`" v-if="item.img_style == 3">
					<h2 class="list_tit"><span class="list_subtit">{{item.title}}</span></h2>
					<div class="bottom_info">
						<div class="tip_info clearfix">
							<span class="tip pink" v-if="item.copyfrom == 4">荐</span>
							<span class="tip shipin" v-if="item.news_type == 'video'">视频</span>
							<span class="tip green" v-if="item.status == 'vr'">3D效果图</span>
							<span class="if_name">{{item.source}}</span>
							<span class="dot_icon"></span>
							<span class="num_if">阅读<label>{{item.views}}</label></span>
						</div>
					</div>
				</div>
				<h2 class="list_tit" v-if="item.img_style != 3">
					<span class="list_subtit">{{item.title}}</span>
				</h2>
				<ul class="imglist clearfix" v-if="item.img_arr">
					<li v-for="(voo,ind) in item.img_arr">
						<span class="imglist-a">
							<mip-img :src="voo"></mip-img>
						</span>
					</li>
				</ul>
				<div class="bottom_info" v-if="item.img_style != 3">
					<div class="tip_info clearfix">
						<span class="tip pink" v-if="item.copyfrom == 4">荐</span>
						<span class="tip blue" v-if="item.status == 'pic'">图片</span>
						<span class="if_name">{{item.source}}</span>
						<span class="dot_icon"></span>
						<span class="num_if">阅读<label>{{item.views}}</label></span>
					</div>
				</div>
			</a>
		</div>
		<div class="commonList anli-box clearfix">
			<a v-for="(item,index) in anliData" :href="`https://m.jia.com/zuimei/anli/detail-${item.id}/?source=wztcanli`" class="img-item-a bgTJJ" once="0">
				<div class="pic image-box">
					<mip-img :src="item.img_url"></mip-img>
				</div>
				<p class="d-title">{{item.title}}</p>
				<div class="info">
					<div class="photo">
						<mip-img :src="item.avatar"></mip-img>
					</div>
					<div class="personal-info">
						<p class="style">{{item.user_name}}</p>
						<p class="info-content">{{item.label}}</p>
					</div>
				</div>
			</a>
		</div>
		<div class="commonList tuku-list clearfix">
			<ul class="tuku-list-cont waterfall">
				<li class="list-item" v-for="(item,index) in tukuData">
					<a :href="`https://m.jia.com/tuku/gaoqing/${item.id}.html?source=wztcxgt`">
						<div class="cover-img">
							<mip-img :src="item.thumb"></mip-img>
							<div class="lable gg">{{item.img_num}}张</div>
						</div>
						<div class="list-info"><p class="list-title">{{item.title}}</p></div>
					</a>
				</li>
			</ul>
		</div>
		<div class="loadmore" v-if="loadFlag">
			<span class="icon">正在加载</span>
		</div>
		<div class="no-more" v-if="!loadMore">没有更多了~</div>
	</section>
</template>
<style scoped>

</style>
<script>
	const {viewport} = MIP;
export default {
	name: 'jiaZxgs',
	props:{
		articleId: {
			type: Number
		},
		anliLabel:{
			type: String,
			default :"全部"
		},
		tagId:{
			type:String,
			default :""
		}
	},
	data () {
		return {
			city:'',
			bufferHeightPx:10,
			"page":1,
			loadType:'zxgs',
			"timeout":100000,
			"contentShow": "zxgs",
			"zxgsArea": false,
			"zxgsSort": false,
			"zxgsFilter": false,
			"zxgsType":"total_score",
			"zxgsTag":"",
			"zxgsSjcn":"",
			"zxgsGenre":"",
			"zxgsPrice":"",
			"zxgsAreaNum":"",
			"zxgsCityAreaText":"区域",
			"zxgsSortText":"排序",
			"zxgsHouseType":"",
			"zxgsZxService":"",
			"zxgsTsService":"",
			"zxgsStyle":"",
			"areaText":"全城",
			"area":"",
			"houseTag":'',
			type:'total_score',
			service:'',
			tese:'',
			loadMore:true,
			noData:false,
			zxgsData:[],
			anliData:[],
			articleData:[],
			tukuData:[],
			genre:'',
			area_num:'',
			pageTotal:2,
			loadFlag:false,
			"sortList":[
				{
					type:"total_score",
					title:"综合排序",
					tit:"齐家平台综合智能排序",
					icon:""
				},
				{
					type:"design_score",
					title:"设计好评优先",
					tit:"",
					icon:"60%的用户选择"
				},
				{
					type:"construction_score",
					title:"施工好评优先",
					tit:"",
					icon:""
				},
				{
					type:"services_score",
					title:"服务态度好评优先",
					tit:"",
					icon:""
				},
				{
					type:"delivery_ontime_score",
					title:"准时完工好评优先",
					tit:"",
					icon:""
				},
				{
					type:"price_score",
					title:"预算准确好评优先",
					tit:"",
					icon:""
				},
				{
					type:"banbao_price_high",
					title:"高价优先",
					tit:"按装修公司每平米半包价格排序",
					icon:""
				},
				{
					type:"banbao_price_low",
					title:"低价优先",
					tit:"按装修公司每平米半包价格排序",
					icon:""
				},
				{
					type:"distance",
					title:"离我最近的门店",
					tit:"",
					icon:""
				},
			],
			houseList:[
				{
					tag:"20354",
					text:"小户型/一房",
					area_num:"45"
				},
				{
					tag:"20353",
					text:"两房",
					area_num:"75"
				},
				{
					tag:"20352",
					text:"三房",
					area_num:"105"
				},
				{
					tag:"20351",
					text:"四房",
					area_num:"140"
				},
				{
					tag:"20369",
					text:"Loft",
					area_num:"100"
				},
				{
					tag:"20349",
					text:"复式",
					area_num:"170"
				},
				{
					tag:"20348",
					text:"别墅",
					area_num:"325"
				},
				{
					tag:"20350",
					text:"大平层",
					area_num:"140"
				},
				{
					tag:"20356",
					text:"商铺装修",
					area_num:""
				},
				{
					tag:"20357",
					text:"办公空间",
					area_num:""
				}
			],
			serviceList:[
				{
					tag:"20340",
					text:"方案设计"
				},
				{
					tag:"20341",
					text:"半包装修"
				},
				{
					tag:"20342",
					text:"全包装修"
				},
				{
					tag:"20343",
					text:"全屋整装"
				},
				{
					tag:"20344",
					text:"局部装修"
				},
				{
					tag:"20345",
					text:"上门维修"
				},
				{
					tag:"20346",
					text:"软装设计"
				}
			],
			teseList:[
				{
					tag:"20359",
					text:"三维设计"
				},
				{
					tag:"20360",
					text:"样板房带看"
				},
				{
					tag:"20361",
					text:"超长质保期"
				},
				{
					tag:"20362",
					text:"装修分期"
				}
			],
			styleList:[
				{
					text:"现代"
				},
				{
					text:"美式"
				},
				{
					text:"欧式"
				},
				{
					text:"中式"
				},
				{
					text:"北欧"
				},
				{
					text:"混搭"
				},
				{
					text:"新古典"
				},
				{
					text:"简欧"
				},
				{
					text:"工业"
				},
				{
					text:"后现代"
				}
			]
		};
	},
	mounted :function(){
		let CustomStorage = MIP.util.customStorage
		this.storage = new CustomStorage(0);
		this.getCity();
		const that = this;
		viewport.on('scroll', function(){
			that.scrollListener();
		})
	},
	methods: {
		changeTab(tab){
			//'contentShow',zxgs,article,anli,tuku
			console.log(this.contentShow,tab);
			if(this.contentShow == tab) return;
			this.contentShow = tab;
			switch(tab){
				case 'zxgs':
					break;
				case 'article':
					if(this.articleData.length == 0){
						this.loadArticle(true);
					}
					break;
				case 'anli':
					if(this.anliData.length == 0){
						this.loadAnli(true);
					}
					break;
				case 'tuku':
					if(this.tukuData.length == 0){
						this.loadTuku(true);
					}
					break;
			}
		},
		_setData(str,value){
			var that = this;
			if( typeof str === 'object'){
				Object.keys(str).forEach(function(item){
					if(item !== 'scroll'){
						that[item] = str[item];
					}
				});
				if(str.scroll){
					const _hei = this.$element.querySelector(`#${str.scroll}`).offsetTop+1;
					MIP.viewport.setScrollTop(_hei);
				}
			}
			else{
				this[str] = value;
			}
		},
		getCity(){
			const that = this;
			let city = this.storage.get('city');
			if(city){
				city = JSON.parse(city);
				this.getCityArea(city.area_py);
				that.zxgsParams();
			}
			else{
				window.fetchJsonp('https://m.jia.com/city/getCurrentAreaNew', {
					jsonpCallback: 'callback',
					timeout: this.timeout
				}).then(function(res){
					return res.json();
				}).then(function(json){
					console.log(json);
					if (json.code > 0) {
						var city = JSON.stringify(json.result.site.area_info);
						that.storage.set('city', city);
						that.city = city;
						that.getCityArea(json.result.site.area_info.area_py);
						that.zxgsParams();
					}
				}).catch(function(err){
					console.log(err);
				});
			}
		},
		getCityArea(){
			const that = this;
			window.fetchJsonp('https://m.jia.com/zixunApi/zx_shop_list_district/?area_flag=shanghai', {
				jsonpCallback: 'callback',
				timeout: this.timeout
			}).then(function(res){
				return res.json();
			}).then(function(json){
				console.log(json);
				that.areaList = json;
			}).catch(function(err){
				console.log(err);
			});
		},
		changeArea(text,id){
			this.area = id;
			this.areaText = text;
			this.zxgsArea = false;
			this.zxgsSort = false;
			this.zxgsFilter = false;
			this.zxgsCityAreaText = '';
			console.log(text,id);
			this.zxgsParams(true);
		},
		sortTap(e){
			const {type,text} = e.currentTarget.dataset;
			console.log(type,text);
			this._setData({
				zxgsSortText:text, zxgsArea: false, zxgsSort: false, zxgsFilter: false,type:type
			});
			this.zxgsParams(true);
		},
		houseTap(e){
			const {houseTag,area_num} = e.currentTarget.dataset;
			console.log(houseTag,area_num);
			this._setData({
				houseTag:houseTag, area_num: area_num
			});
		},
		serviceTap(e){
			const {service} = e.currentTarget.dataset;
			console.log(service);
			this._setData({
				service:service
			});
		},
		teseTap(e){
			const {tese} = e.currentTarget.dataset;
			console.log(tese);
			this._setData({
				tese:tese
			});
		},
		styleTap(e){
			const {genre} = e.currentTarget.dataset;
			console.log(genre);
			this._setData({
				genre:genre
			});
		},
		sendAjax(obj){
			const that = this;
			if(that.loadFlag || !this.loadMore) return;
			that.loadFlag = true;
			window.fetchJsonp(obj.url, {
				jsonpCallback: 'callback',
				timeout: obj.timeout || that.timeout
			}).then(function(res){
				return res.json();
			}).then(function(json){
				obj.callback&&obj.callback(json);
				that.loadFlag = false;
			}).catch(function(err){
				console.log(err);
				that.loadFlag = false;
			});
		},
		reset(){
			this.page = 1;
			this.loadMore = true;
			this.noData = false;
			this.pageTotal = 2;
		},
		resetButton(){
			this._setData({
				houseTag: '', area_num: '', service: '',tese:'',genre:'',zxgsArea: false, zxgsSort: false, zxgsFilter: false,noData:false
			});
			this.zxgsParams(true);
		},
		confirmButton(){
			this._setData({
				zxgsArea: false, zxgsSort: false, zxgsFilter: false
			});
			this.zxgsParams(true);
		},
		scrollListener(){
			// 获取当前滚动条位置
			const currentScrollTop = viewport.getScrollTop();
			// 某些浏览器(安卓QQ)滚动时会隐藏头部但不触发resize,需要反复获取
			const wrapperHeight = viewport.getHeight();
			var scrollHeight = viewport.getScrollHeight();
			// 到底了
			if (currentScrollTop >= scrollHeight - wrapperHeight - this.bufferHeightPx && !this.loadFlag && this.loadMore && !this.noData) {
				this._scrollBottomFn()
			}
		},
		_scrollBottomFn(){
			const loadType = this.contentShow;
			const that = this;
			switch(loadType){
				case 'zxgs':
					this.zxgsParams();
					break;
				case 'article':
					this.loadArticle();
					break;
				case 'anli':
					this.loadAnli();
					break;
				case 'tuku':
					this.loadTuku();
					break;
			}
		},
		disposeTag(arr=[]) {
			let _arr = arr.concat(['免费设计', '免费量房', '免费报价']);
			_arr = _arr.slice(0, 3);
			/*let msg = '';
			_arr.forEach(function (item) {
				msg += '<div>' + item + '</div>';
			});*/
			return _arr;
		},
		zxgsParams(reset){
			if(reset){
				this.reset();
			}
			if(this.page > this.pageTotal){
				this.loadMore = false;
				return false;
			}
			const that = this;
			let page = this.page;
			let tag = `${this.houseTag?this.houseTag+'_':''}${this.service?this.service+'_':''}${this.tese?this.tese+'_':''}`;
			tag = tag.slice(0,-1);
			console.log(tag);
			let url = `https:\/\/m.jia.com/JiaZhuangxiu/ajax_shop_list_201907/?areaflag=${this.city}&page=${page}&lat1=''&lng1=''&type=${this.type}&tag=${tag}&area=${this.area}&action=page&genre=${this.genre}&price=''&area_num=${this.area_num}&extra_data=1&returns=ajax`;
			this.sendAjax({
				url:url,
				callback:function(a){
					if(reset){
						that.zxgsData = [];
					}
					if(!a.result){
						that.noData = true;
						return;
					}
					that.pageTotal = a.page_count || 0;
					console.log(a.result);
					let arr = a.result;
					arr.forEach(function(item){
						item.shop_service_tag = that.disposeTag(item.shop_service_tag);
						item['shop_evaluation_score']['star'] = item['shop_evaluation_score']['star'] / 5 * 100
					});
					that.zxgsData = that.zxgsData.concat(arr);
					that.page++;
				}
			});
		},
		loadArticle(reset){
			if(reset){
				this.reset();
			}
			if(!this.loadMore){
				return false;
			}
			const that = this;
			let page = this.page;
			let url = `https:\/\/m.jia.com/zixun/ajax_new_tuijian/?page=${this.page}&id=${this.articleId}&display=new_detail_data3&returns=ajax`;
			this.sendAjax({
				url:url,
				callback:function(a){
					if(reset){
						that.articleData = [];
					}
					if(!a.news || a.news.length == 0){
						this.loadMore = false;
						return;
					}
					console.log(a.news);
					let arr = a.news;
					that.articleData = that.articleData.concat(arr);
					that.page++;
				}
			});
		},
		loadAnli(reset){
			if(reset){
				this.reset();
			}
			if(this.page > this.pageTotal){
				this.loadMore = false;
				return false;
			}
			const that = this;
			let page = this.page;
			let url = `https:\/\/m.jia.com/JiaZhuangxiu/AjaxGetZmAnli/?page=${this.page}&label=${this.anliLabel}&type=data`;
			this.sendAjax({
				url:url,
				callback:function(a){
					if(reset){
						that.anliData = [];
					}
					that.pageTotal = a.page_count || 0;
					console.log(a.data);
					let arr = a.data;
					that.anliData = that.anliData.concat(arr);
					that.page++;
				}
			});
		},
		loadTuku(reset){
			if(reset){
				this.reset();
			}
			if(!this.loadMore){
				return false;
			}
			const that = this;
			let page = this.page;
			let url = `https:\/\/m.jia.com/new_tu/getListPage/?page=${this.page}&tagId=${this.tagId}`;
			this.sendAjax({
				url:url,
				callback:function(a){
					if(reset){
						that.tukuData = [];
					}
					if(!a || a.length == 0){
						this.loadMore = false;
						return;
					}
					console.log(a);
					let arr = a;
					that.tukuData = that.tukuData.concat(arr);
					that.page++;
				}
			});
		}
	}
};

</script>
