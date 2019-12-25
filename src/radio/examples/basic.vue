<template>
	<div>
		<!-- single -->
		<vc-radio v-model="single" @change="handleChange">
			{{ single }}
		</vc-radio>

		<!-- group -->
		<vc-radio-group v-model="phone">
			<vc-radio label="apple" disabled>
				<span>Apple</span>
			</vc-radio>
			<vc-radio label="android">
				<span>Android</span>
			</vc-radio>
			<vc-radio label="windows">
				<span>Windows</span>
			</vc-radio>
		</vc-radio-group>
		<vc-radio-group v-model="animal" vertical>
			<vc-radio label="金斑蝶" />
			<vc-radio label="爪哇犀牛" />
			<vc-radio label="印度黑羚" />
		</vc-radio-group>

		<vc-radio-group v-model="city" type="button" @change="handleChange">
			<vc-radio label="北京" />
			<vc-radio label="上海" disabled />
			<vc-radio label="深圳" />
			<vc-radio label="杭州" />
		</vc-radio-group>
		<vc-form 
			ref="formValidate" 
			:model="formValidate" 
			:rules="ruleValidate"
			:label-width="96"
			style="padding-left: 56px; margin-top: 21px"
			@submit.native.prevent
		>
			<vc-form-item prop="animal" label="动物：">
				<vc-radio-group v-model="formValidate.animal">
					<vc-radio label="金斑蝶" />
					<vc-radio label="爪哇犀牛" />
					<vc-radio label="印度黑羚" />
				</vc-radio-group>
			</vc-form-item>
			<vc-form-item prop="animal" label="动物：">
				<vc-radio label="金斑蝶" />
			</vc-form-item>
			<vc-form-item prop="input" label="动物：">
				<vc-input style="width: 300px" />
			</vc-form-item>
		</vc-form>
	</div>
</template>
<script>
import Radio from '..';
import Form from '../../form/index';
import Input from '../../input/index';

export default {
	name: "vc-radio-basic",
	components: {
		'vc-radio': Radio,
		'vc-radio-group': Radio.Group,
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-input': Input,
	},
	data() {
		return {
			single: false,
			phone: 'apple',
			animal: '爪哇犀牛',
			city: '北京',
			formValidate: {
			},
			ruleValidate: {
				
			}
		};
	},
	computed: {
		
	},
	updated() {
		console.log({
			single: this.single,
			phone: this.phone,
			animal: this.animal,
			city: this.city
		});
	},
	methods: {
		handleChange() {
			console.log(arguments[0]);
		}	
	}
};
</script>
