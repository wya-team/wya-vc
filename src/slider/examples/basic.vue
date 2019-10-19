<template>
	<div style="padding: 20px">
		<p>基础用法</p>
		<vc-slider 
			ref="slider"
			:value="value1" 
			show-tip="always"
			@change="handleChange"
		/>
		<vc-slider v-model="value11" show-tip="never"/>
		<vc-slider v-model="value12" />
		<vc-slider v-model="value2" range/>
		<vc-slider v-model="value3" range disabled/>
		<p>离散值</p>
		<vc-slider v-model="value4" :step="10"/>
		<vc-slider v-model="value5" :step="10" range/>
		<p>显示中间断点</p>
		<vc-slider v-model="value6" :step="10" show-stops/>
		<vc-slider v-model="value7" :step="10" show-stops range/>
		<p>带有输入框</p>
		<vc-slider v-model="value8" show-input/>
		<p>自定义提示</p>
		<vc-slider v-model="value9" :tip-format="format"/>
		<vc-slider v-model="value10" :tip-format="hideFormat"/>
		<vc-form
			ref="form"
			:model="formValidate" 
			:rules="ruleValidate" 
			style="padding: 20px"
		>
			<vc-form-item prop="value" @on-form-change="handleFormChange">
				<vc-slider v-model="formValidate.value" :clickable="false"/>
			</vc-form-item>
			<div @click="handleSubmit">提交</div>
		</vc-form >
	</div>
</template>
<script>
import Slider from '..';
import Form from '../../form';

export default {
	name: "vc-slider-basic",
	components: {
		'vc-slider': Slider,
		'vc-form': Form,
		'vc-form-item': Form.Item,
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
			value10: 25,
			value11: 25,
			value12: 25,
			formValidate: {
				value: 25,
			},
			ruleValidate: {
				value: [
					{ 
						validator(rule, value, callback, source, options) {
							if (value < 25) {
								callback("价格不能低于25");
								return;
							}
							callback();
						},
						type: 'number', 
						trigger: 'change',
					}
				],
			}
		};
	},
	computed: {
		
	},
	updated() {
		// console.log(this.value1, this.value2, this.value3, this.value4, this.value5, this.value6, this.value7, this.value8, this.value9, this.value10);
	},
	methods: {
		handleChange(val, reset) {
			console.log(val);
			this.value1 = 25;
			reset(25);
		},
		handleFormChange(val) {
			console.log(val);
		},
		format(val) {
			return 'Progress: ' + val + '%';
		},
		hideFormat() {
			return null;
		},
		handleSubmit() {

		}
	}
};
</script>
