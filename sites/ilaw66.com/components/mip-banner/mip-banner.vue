<template>
	<div class="wrapper">
		<mip-carousel autoplay defer="1000" layout="responsive" width="600" height="400" indicator indicatorId="mip-carousel-example">
			<mip-img src="https://www.mipengine.org/static/img/sample_01.jpg">
			</mip-img>
			<mip-img src="https://www.mipengine.org/static/img/sample_02.jpg">
			</mip-img>
			<mip-img src="https://www.mipengine.org/static/img/sample_03.jpg">
			</mip-img>
		</mip-carousel>
		<div class="mip-carousel-indicator-wrapper">
			<div class="mip-carousel-indicatorDot" id="mip-carousel-example">
				<div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>
				<div class="mip-carousel-indecator-item"></div>
				<div class="mip-carousel-indecator-item"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.wrapper {
		margin: 0 auto;
		text-align: center;
	}
</style>

<script>
	export default {
		mounted() {

		}
	}
</script>