<template>
	<div>
		<c-date-pick/>
	</div>
</template>
<script>
import CDatePick from '../m-date-picker.vue';

export default {
	name: "vc-pop-up-basic",
	components: {
		CDatePick
	},
	data() {
		return {
			show: false,
			date: ''
		};
	},
	computed: {

	},
	mounted() {

	},
	methods: {
		// based() {
		// 	this.show = true;
		// 	setTimeout(() => {
		// 		this.date = new Date();
		// 	}, 5000);
		// },
		// handleClose() {
		// 	this.show = false;
		// },
		// handleSure(v) {
		// 	console.log(v);
		// 	this.show = false;
		// }
	},
};

</script>
