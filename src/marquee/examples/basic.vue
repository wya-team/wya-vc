<!-- 仅展示最基本的用法 -->
<template>
	<div style="padding: 20px">
		<vc-marquee style="background: #f7f7f7" content="222" />
		<br>
		<vc-marquee style="background: #f7f7f7">
			仅展示最基本的用法仅展示最基本的用法仅展示最基本的用法仅展示最基本的用法仅展示最基本的用法仅展示最基本的用法
		</vc-marquee>
		<br>
		<vc-carousel 
			:height="18" 
			:draggable="false" 
			:t="1" 
			vertical 
			style="background: #f7f7f7">
			<vc-carousel-item v-for="item in 3" :key="item">
				<h3>{{ item }}</h3>
			</vc-carousel-item>
		</vc-carousel>
	</div>
</template>
<script>
import Marquee from '..';
import Carousel from '../../carousel';

export default {
	name: "vc-marquee-basic",
	components: {
		'vc-marquee': Marquee,
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
