<style>
.text-overflow{
    text-overflow: ellipsis;
    width:300px; 
    overflow:hidden;
    white-space: nowrap;
}
</style>

<template>
        <div class="index-trip-list">
        	<ul class="index-trip-ul">
                    <li class="tjtrip-li" v-for="item in list">
                        <a :href="item.href" mip-link>
                            <div class="tjtrip-img">
                                <img :src="item.cover" alt="">
                                <div class="tjtrip-days">
                                    <span class="tjtrip-day"><i>{{item.days}}</i>天</span>
                                </div>
                            </div>
                            <div class="tjtrip-btm">
                                <h2 class="tjtrip-title text-overflow">{{item.title}}</h2>
                                <p class="tjtrip-dest">{{item.tocity_name}}</p>
                            </div>
                        </a>
                    </li>
            </ul>
        </div>
 
</template>

<script>
    import Vue from 'vue';
    import axios from 'axios';
    import toast from 'vue-toasted';

    Vue.use(toast);
    let options = {
        position: 'bottom-center',
        duration: 2000,
    };

    let isLoaded = false;

    let page = 1, destName = '';

	export default {
		data () {
			return {
                list: [],
            };	
		},
        props: ['name'],
        mounted () {
            destName = this.name;
            if(!destName || destName == null || destName == ''){
                destName = '北美|日本|泰国|澳大利亚|加拿大';
            }

            this.load(this.start);
        },
		methods: {
		    load (cb) {
                if(isLoaded)return;
                axios.get('https://m.6renyou.com/mip_service/get_hot_trip_list?dest=' + destName + '&page=' + page).then(resp => {
                    resp = resp.data;
                    if(!resp || resp == null || resp.length == 0){
                        Vue.toasted.show('没有更多', options);
                        isLoaded = true;
                        return;
                    }
                    page++;
                    resp = resp.map(it => {
                        it.href = '/trip/' + it.id;
                        return it;
                    });
                    this.list = this.list.concat(resp);
                    if(cb)setTimeout(() => {cb.call(this);}, 1000);
                }).catch(err => {
                    console.log(err.message);
                });
            }, 	
            start () {
                let scrollHeight = MIP.viewport.getScrollHeight(),//document.documentElement.scrollHeight > document.body.scrollHeight ? document.documentElement.scrollHeight : document.body.scrollHeight,
                    scrollTop = MIP.viewport.getScrollTop(),//document.documentElement.scrollTop > document.body.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop,
                    clientHeight = MIP.viewport.getHeight();//document.documentElement.clientHeight < document.body.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;

                //console.log(scrollHeight, scrollTop, clientHeight, document.documentElement.clientHeight, document.body.clientHeight);
                if((scrollHeight == scrollTop + clientHeight) && (scrollTop != 0)){
                    //console.log('>>>>>>>>>');
                    this.load(this.start);
                }else{
                    if(!isLoaded){
                        setTimeout(this.start, 500);
                    }
                }
            },
		}
	};
</script>
