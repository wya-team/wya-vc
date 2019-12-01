<template>
	<div>
		<h2>常规使用</h2>
		<vc-color-picker v-model="color1" />
		<h2>Size</h2>
		<vc-color-picker v-model="color1" size="small" />
		<vc-color-picker v-model="color2" size="default" />
		<vc-color-picker v-model="color3" size="large" />
		<h2>透明度</h2>
		<vc-color-picker v-model="color4" alpha />
		<h2>支持色彩选择</h2>
		<vc-color-picker v-model="color5" :hue="false" />
		<h2>显示推荐的颜色预设</h2>
		<vc-color-picker v-model="color6" recommend />
		<h2>自定义颜色预选</h2>
		<vc-color-picker v-model="color7" :colors="predefine" />
		<h2>可输入色值</h2>
		<strong>十六进制：</strong>
		<vc-color-picker v-model="color8" :editable="false" />
		<br>
		<strong>rgba模式：</strong>
		<vc-color-picker v-model="color9" alpha />
		<h2>格式化</h2>
		<vc-color-picker v-model="color10" format="hsl" />
		<vc-color-picker v-model="color11" format="hsl" alpha/>
		<h2>事件</h2>
		<vc-color-picker 
			v-model="color1" 
			format="hsl"
			@change="handleChange"
			@color-change="handleColorChange"
			@visible-change="handleVisibleChange"
		/>
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
			color4: '', // rgb(19, 206, 102)
			color5: '', // rgb(19, 206, 102)
			color6: '', // rgb(19, 206, 102)
			color7: '', // rgb(19, 206, 102)
			color8: '', // rgb(19, 206, 102)
			color9: '', // rgb(19, 206, 102)
			color10: '', // rgb(19, 206, 102)
			color11: '', // rgb(19, 206, 102)
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
		},
		handleChange(v) {
			console.log('change', v);
		},
		handleColorChange(v) {
			console.log('color-change', v);
		},
		handleVisibleChange(v) {
			console.log('visible-change', v);
		},
	}
};
</script>
