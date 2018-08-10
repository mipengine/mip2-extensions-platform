<template>
	<div class="cardslider">
		<div class="cardslider-panel" v-for="(card,index) in relatedKeywords" :key="index">
			<div class="cardslider-panel_container">
				<h3>感兴趣的{{card.title}}</h3>
				<div class="panel_container-tags">
					  <div class="container-tag" v-for="(word,index2) in card.words" :key="index2">
						  <a :href="word.href">{{word.name}}</a>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
	.cardslider{
		display: flex;
		flex-direction: row;
		background-color: #fff;
		padding-left: 10px;
		overflow-y: hidden;
		overflow-x: scroll;
		transform: translate3d(0,0,0);
		-webkit-overflow-scrolling: touch;

		.cardslider-panel{
			flex-shrink: 0;
			padding: 12px 10px 12px 0;
			.cardslider-panel_container{
				display: flex;
				flex-direction: column;
				border: 1px solid #C5C5C5;
				width: 216px;
				height: 100%;
        padding: 9px 8px;
        box-sizing: border-box;
				h3 {
					font-size: 17px;
					color: #222;
					margin-bottom: 12px;
				}

				.panel_container-tags{
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: space-between;

					.container-tag{
						width: 76px;
						height: 28px;
						line-height: 28px;
						border: 1px solid #BFBFBF;
						border-radius: 32px;
						color: #222;
						font-size: 12px;
						margin-bottom: 12px;
						text-align: center;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding: 0 10px;
					}
				}
			}
		}
}
</style>
<script>
export default {
  props:["relatedKeywords"],
  mounted () {
    console.log('This is my first custom component !')
  }
}
</script>
