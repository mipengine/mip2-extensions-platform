<style>

</style>

<template>
    <div class="six-ft-bar six-ft-btn">
        <a mip-link :href="'/order/submit/' + dest + '/' + days + '?tripid=' + tripid" class="ft-btn-submit">咨询旅行顾问</a>
    </div>
</template>

<script>
	export default {
		data () {
			return {};	
		},
        props: ['dest', 'days', 'tripid'],
		methods: {
			
		}
	};
</script>
