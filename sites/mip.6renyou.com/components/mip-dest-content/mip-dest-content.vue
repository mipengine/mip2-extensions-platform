<style>

</style>

<template>
        <div class="dest-content">
        	<div class="dest-box">
        		<ul class="dest-list clearfix">
        			<li class="list" v-for="item in destination">
        				<a :href="host + '/dest/' + item.name" mip-link>
	        				<div class="dest-img">
	        					<mip-img :src="item.img" />
	        				</div>
	        				<span class="dest-name">{{item.name}}</span>
        				</a>
        			</li>
        		</ul>
        	</div>
        </div>

</template>

<script>
    import img_na from '@/static/img/index/dest-na.jpg';
    import img_sa from '@/static/img/index/dest-sa.jpg';
    import img_europe from '@/static/img/index/dest-europe.jpg';
    import img_australia from '@/static/img/index/dest-australia.jpg';
    import img_thailand from '@/static/img/index/dest-thailand.jpg';
    import img_singapore from '@/static/img/index/dest-singapore.jpg';
    import img_japan from '@/static/img/index/dest-japan.jpg';
    import img_taiwan from '@/static/img/index/dest-taiwan.jpg';

	export default {
        props: ['host'],
		data () {
			return {
                destination: [{
                    name: '北美',
                    img: img_na,
                },{
                    name: '南美',
                    img: img_sa,
                },{
                    name: '欧洲',
                    img: img_europe,,
                },{
                    name: '澳洲',
                    img: img_australia,
                },{
                    name: '泰国',
                    img: img_thailand,
                },{
                    name: '新加坡',
                    img: img_singapore,
                },{
                    name: '日本',
                    img: img_japan,
                },{
                    name: '台湾',
                    img: img_taiwan,
                }],
            };	
		},
		methods: {
		}
	};
</script>
