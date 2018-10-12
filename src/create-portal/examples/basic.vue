<template>
	<div>
		<div @click="handleClickWithBefore">
			点我(带延迟)
		</div>
		<div @click="handleClick">
			点我(不带延迟)
		</div>
	</div>
</template>
<script>
import { PModal, PModalWithBefore } from './basic/modal';

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
		handleClickWithBefore() {
			PModalWithBefore.popup({
				data: { s: 1 }
			}).then((res) => {
				console.log(res);
			}).catch((res) => {
				console.log(res);
			});
		},
		handleClick() {
			PModal.popup({
				data: { s: 1 }
			}).then((res) => {
				console.log(res);
			}).catch((res) => {
				console.log(res);
			});
		}
	}
};
</script>
