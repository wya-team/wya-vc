<template>
	<div>
		<vc-color-picker v-model="color1" />
		<vc-color-picker v-model="color3" :colors="predefine" alpha />
	</div>
</template>
<script>
import ColorPicker from '../color-picker';

export default {
	name: "vc-color-picker-basic",
	components: {
		'vc-color-picker': ColorPicker,
	},
	data() {
		return {
			color1: '#19be6b',
			color2: '',
			color3: '', // rgb(19, 206, 102)
			predefine: [
				'#ff4500',
				'#ff8c00',
				'#ffd700',
				'#90ee90',
				'#00ced1',
				'#1e90ff',
				'#c71585',
				'rgba(255, 69, 0, 0.68)',
				'rgb(255, 120, 0)',
				'hsv(51, 100, 98)',
				'hsva(120, 40, 94, 0.5)',
				'hsl(181, 100%, 37%)',
				'hsla(209, 100%, 56%, 0.1)',
				'hsla(209, 100%, 56%, 0.73)'
			]
		};
	},
	computed: {
		
	},
	created() {
		// this.changePre();
	},
	methods: {
		changePre() {
			setTimeout(() => {
				this.predefine = ['#311B92', '#512DA8', '#673AB7', '#9575CD', '#D1C4E9'];
			}, 5000);
		}
	}
};
</script>
