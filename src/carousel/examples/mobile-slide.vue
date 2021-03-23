<!-- 仅展示最基本的用法 -->
<template>
	<div class="v-carousel-slide" style="padding: 10px;">
		<div style="background-color: white; padding: 10px 0">
			<vcm-carousel 
				:height="150" 
				:autoplay="false" 
				:indicator="true" 
				:loop="false" 
				dots="outside" 
			>
				<vcm-carousel-item 
					v-for="item in 4" 
					:key="item"
					:width="`calc(100% - 100px)`"
					:gutter="20"
				>
					<h3>{{ item }}</h3>
				</vcm-carousel-item>
			</vcm-carousel>
		</div>
	</div>
</template>
<script>
import MCarousel from '../index.m';

export default {
	name: "vcm-carousel-basic",
	components: {
		'vcm-carousel': MCarousel,
		'vcm-carousel-item': MCarousel.Item,
	}
};
</script>
<style lang="scss">
body {
	background: #f5f6fa;
}
.vcm-carousel-item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 150px;
	margin: 0;
}

.vcm-carousel-item:nth-child(2n) h3 {
	background-color: red;
}

.vcm-carousel-item:nth-child(2n+1) h3 {
	background-color: #d3dce6;
}

.v-carousel-slide {
	.vcm-carousel__dot.is-horizontal {
		padding: 8px 0;
	}

	// 指示器
	.vcm-carousel__button {
		width: 4px;
		height: 3px;
		border-radius: 0;
		margin: 0 2px;
	}

	.vcm-carousel__dots.is-outside button {
		background-color: #87A3F7;
	}

	.vcm-carousel__dot.is-active button {
		width: 10px;
	}
}
</style>
