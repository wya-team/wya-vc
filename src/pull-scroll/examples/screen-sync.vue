<template>
	<div style="padding: 40px">
		<vc-pull-scroll
			:scroll="false"
			:pull-up="true"
			:height="height"
			wrapper
			@pull-down-end="handlePre"
			@pull-up-end="handleNext"
		>
			<template #content>
				<div>{{ data }}</div>
			</template>
		</vc-pull-scroll>
	</div>
</template>
<script>
import { ajax } from '@wya/http';
import PullScroll from '..';

export default {
	name: "vc-pull-scroll-basic",
	components: {
		'vc-pull-scroll': PullScroll
	},
	data() {
		return {
			height: window.innerHeight - 80,
			data: 0
		};
	},
	computed: {
		
	},
	methods: {
		handleNext() {
			return new Promise((resolve) => {
				setTimeout(() => {
					this.data++;
					resolve();
				}, 3000);
			});
		},
		handlePre() {
			return new Promise((resolve) => {
				setTimeout(() => {
					this.data++;
					resolve();
				}, 3000);
			});
		}
	}

};
</script>
