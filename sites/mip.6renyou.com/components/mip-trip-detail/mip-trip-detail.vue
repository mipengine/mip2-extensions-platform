<style>
.day-hd1{}
.day-hd1:after{
    background: url(/img/trip/i-arr-up.png) no-repeat;
    background-size: 14px 8px;
}
</style>

<template>
        <div class="trip-detail">
            <!-- 顶部图 -->
            <div class="topic-image">
                <ul class="banner-wrap">
                    <li class="banner-slider">
                        <img :src="cover" alt="">
                    </li>        
                </ul>
                <div class="topic-info-top">
                    <h2 class="topic-title">{{title}}</h2>
                    <div class="topic-info">
                        <div class="topic-inf2">
                            <span>{{days}}天</span>
                            <span>{{from_city_name}}出发</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 行程亮点 -->
            <div class="trip-commont">
                <div class="trip-commont-hd"><span>行程亮点</span></div>
                <div class="poi-special">
                    <p v-for="it in feature">{{it}}</p>
                </div>
            </div>
            <!-- 特色景点 -->
            <div class="trip-commont">
                <div class="trip-commont-hd"><span>特色景点</span></div>
                <div class="specialSpotList">
                    <ul class="clearfix">
                        <li v-for="(item, index) in popular_sight" v-show="index < 4 || showMoreSight">
                            <a :href="'/sight/1/' + item.id" mip-link>
                                <div class="sp-img">
                                    <img :src="item.cover" width="100%" alt="">
                                    <span class="cy">{{item.city_name}}</span>
                                </div>
                                <div class="t1"><p>{{item.name}}</p></div>
                            </a>
                        </li>
                    </ul>
                    <div class="spec-more">
                        <a href="javascript:void(0);" @click="showMore" v-show="showMoreSight == false" class="btn-specMore">更多特色景点<i class="ic-poi"></i></a>
                        <a href="javascript:void(0);" @click="closeMore" v-show="showMoreSight == true" class="btn-specMore">收起特色景点<i class="ic-poi ic-flod"></i></a><!-- 收起 -->
                    </div>
                </div>
            </div>
            <!-- 行程概览 -->
            <div class="trip-commont trip-review">
                <div class="trip-commont-hd">
                    <span>行程概览</span>
                    <!-- 展开收起 -->
                    <div class="trip-opr">
                        <div class="checkbox">
                            <input type="checkbox" @click="toggleStatus(-1)">
                            <label></label>
                        </div>
                    </div>
                </div>
                <div class="trip-content" style="margin-bottom:60px;">
                    <!-- DAY --> 
                    <div class="day-content-item" v-for="(item, index) in day_list">
                        <div class="day-hd" :class="{'day-hd1': item.status}" @click="toggleStatus(index)">
                            <div class="day-inf">
                                <span class="day-number">{{item.day}}</span>
                            </div>
                            <div class="day-city-list">
                        	      {{item.city_list.join(' → ')}}
                            </div>
                        </div>
                        <div class="day-bd" v-show="!item.status">
                            <div v-for="sight in item.data" v-show="item.data.length > 0">
                            <!-- 景点 -->
                                <div class="day-item day-item-arrow" v-if="sight.type == 'sight'" @click="showSightDetail(sight.poi_id)">
                                    <i class="itrip itrip-spot"></i>
                                    <div class="day-item-cont spot-inf">
                                        <div class="day-img">
                                            <img :src="sight.cover" alt="">
                                        </div>
                                        <div class="day-item-title">
                                            <p>{{sight.name}}</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- 活动 -->
                                <div class="day-item day-item-arrow" v-if="sight.type == 'show'"  @click="showShowDetail(sight.poi_id)">
                                    <i class="itrip itrip-activity"></i>
                                    <div class="day-item-cont activity-inf">
                                        <div class="day-img">
                                            <img :src="sight.cover" alt="">
                                        </div>
                                        <div class="day-item-title">
                                            <p>{{sight.name}}</p>
                                        </div>
                                    </div>
                                </div>
                               
                                <!-- 备注 -->
                                <div class="day-item day-remark" v-if="item.desc != ''">
                                    <i class="itrip itrip-remark"></i>
                                    <div class="day-item-cont remark-inf">
                                        {{item.desc}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- DAY  END -->
                </div>
            </div>
        </div> 

</template>

<script>
    import axios from 'axios';

	export default {
		data () {
			return {
                title: '',
                feature: [],
                popular_sight: [],
                day_list: [],
                days: 0,
                cover: '',
                from_city_name: '',
                showMoreSight: false,
                allStatus: true,
            };	
		},
        props: ["tripid"],
        mounted () {
            axios.get('https://m.6renyou.com/mip_service/get_trip_detail?id=' + this.tripid).then(resp => {
                resp = resp.data;
                if(!resp || resp == null)return;
                this.title = resp.title;
                this.feature = resp.feature;
                this.popular_sight = resp.popular_sight;
                
                this.day_list = resp.day_list.map(d => {
                    d.status = true;
                    return d;
                });
                this.days = resp.days;
                this.cover = resp.cover;
                this.from_city_name = resp.from_city_name;
            }).catch(err => {
                console.log(err.message);
            });
        },
		methods: {
		    showMore () {
                this.showMoreSight = true;
            },
            closeMore () {
                this.showMoreSight = false;
            },
            toggleStatus (index) {
                let list = this.day_list;
                if(index > -1){
                    list[index].status = !list[index].status;
                }else{
                    this.allStatus = !this.allStatus;
                    list = list.map(l => {
                        l.status = this.allStatus;
                        return l;
                    });
                }
                this.day_list = list;
            },
            showSightDetail (poi) {
                MIP.viewer.open('/sight/1/' + poi);
            },
            showShowDetail (poi) {
                MIP.viewer.open('/sight/2/' + poi);
            },
		}
	};
</script>
