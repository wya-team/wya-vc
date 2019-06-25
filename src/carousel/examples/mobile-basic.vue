<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<div>
			<vcm-carousel :height="150" :autoplay="true">
				<vcm-carousel-item v-for="item in 4" :key="item">
					<h3>{{ item }}</h3>
				</vcm-carousel-item>
			</vcm-carousel>
		</div>
		<br>
		<br>
		<br>
		<div>
			<vcm-carousel :t="4" :height="200" type="card">
				<vcm-carousel-item v-for="item in 6" :key="item">
					<h3 class="medium">{{ item }}</h3>
				</vcm-carousel-item>
			</vcm-carousel>
		</div>
		<br>
		<br>
		<br>
		<div>
			<vcm-carousel :autoplay="false" :height="200" vertical>
				<vcm-carousel-item v-for="item in 3" :key="item">
					<h3 class="medium">{{ item }}</h3>
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
.vcm-carousel-item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 150px;
	margin: 0;
}

.vcm-carousel-item:nth-child(2n) {
	background-color: #99a9bf;
}

.vcm-carousel-item:nth-child(2n+1) {
	background-color: #d3dce6;
}
</style>
