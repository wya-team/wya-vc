<template>
	<div style="padding: 20px">
		<p>基础用法</p>
		<vc-slider v-model="value1" show-tip="always"/>
		<vc-slider v-model="value1" show-tip="never"/>
		<vc-slider v-model="value1" />
		<vc-slider v-model="value2" range/>
		<vc-slider v-model="value3" range disabled/>
		<p>离散值</p>
		<vc-slider v-model="value4" :step="10"/>
		<vc-slider v-model="value5" :step="10" range/>
		<p>显示中间断点</p>
		<vc-slider v-model="value6" :step="10" show-stops/>
		<vc-slider v-model="value7" :step="10" show-stops range/>
		<p>自定义提示</p>
		<vc-slider v-model="value9" :tip-format="format"/>
		<vc-slider v-model="value10" :tip-format="hideFormat"/>
	</div>
</template>
<script>
import Slider from '..';

export default {
	name: "vc-slider-basic",
	components: {
		'vc-slider': Slider
	},
	data() {
		return {
			value1: 25,
			value2: [20, 50],
			value3: [20, 50],
			value4: 30,
			value5: [20, 50],
			value6: 30,
			value7: [20, 50],
			value8: 25,
			value9: 25,
			value10: 25
		};
	},
	computed: {
		
	},
	methods: {
		handleChange() {
			console.log(arguments[0]);
		},
		format(val) {
			return 'Progress: ' + val + '%';
		},
		hideFormat() {
			return null;
		}
	}
};
</script>
