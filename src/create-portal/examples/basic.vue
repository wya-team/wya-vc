<template>
	<div @click="handleClick">
		点我
	</div>
</template>
<script>
import { Modal } from './basic/modal';

export default {
	name: "vc-tpl-basic",
	components: {
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick() {
			Modal.popup({

			}).then((res) => {

			}).catch((res) => {
				console.log(res);
			});
		}
	}
};
</script>
