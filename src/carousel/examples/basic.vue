<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<div>
			<span>默认 Hover 指示器触发</span>
			<vc-carousel :height="150">
				<vc-carousel-item v-for="item in 4" :key="item">
					<h3>{{ item }}</h3>
				</vc-carousel-item>
			</vc-carousel>
		</div>
		<br>
		<br>
		<br>
		<div>
			<vc-carousel :t="4" type="card" height="200px">
				<vc-carousel-item v-for="item in 6" :key="item">
					<h3 class="medium">{{ item }}</h3>
				</vc-carousel-item>
			</vc-carousel>
		</div>
		<br>
		<br>
		<br>
		<div>
			<vc-carousel :autoplay="false" height="200px" direction="vertical">
				<vc-carousel-item v-for="item in 3" :key="item">
					<h3 class="medium">{{ item }}</h3>
				</vc-carousel-item>
			</vc-carousel>
		</div>
	</div>
</template>
<script>
import Carousel from '..';

export default {
	name: "vc-carousel-basic",
	components: {
		'vc-carousel': Carousel,
		'vc-carousel-item': Carousel.Item,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
	}
};
</script>
<style>
.vc-carousel-item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 150px;
	margin: 0;
}

.vc-carousel-item:nth-child(2n) {
	background-color: #99a9bf;
}

.vc-carousel-item:nth-child(2n+1) {
	background-color: #d3dce6;
}
</style>
