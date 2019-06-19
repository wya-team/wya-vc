<template>
	<div style="padding: 20px; background: #f3f3f3">
		<vc-input />

		<div>
			<vc-input-number 
				v-model="formValidate.value" 
				:precision="0" 
				:min="-10"
				:disabled="disabled"
				clearable
			/>
			<br>
			<vc-input
				v-model="value"
				:disabled="disabled"
				style="width: 200px;"
				clearable
				search
				enter-txt="搜索"
				placeholder="显示placeholder"
				@change="handleChange"
				@focus="handleFocus"
				@blur="handleBlur"
				@enter="handleEnter"
			/>
			<span>22</span>
			<br><br><br><br>
			<div>
				<vc-input 
					v-model="value"
					:precision="2"
					:disabled="disabled"
					afloat
					style="width: 200px;"
					placeholder="显示placeholder"
					@change="handleChange"
					@focus="handleFocus"
					@blur="handleBlur"
					@enter="handleEnter"
				>
					<p slot="append" style="background: red">icon</p>
				</vc-input>
			</div>
			<vc-input 
				v-model="value1"
				:disabled="disabled"
				style="margin-top: 10px;"
				placeholder="被禁用的input"
			/>
			<br>
			<br>
			<br>
			<br>
			<vc-form
				ref="form"
				:model="formValidate" 
				:rules="ruleValidate"
				@submit.native.prevent
			>
				<vc-form-item prop="value">
					<vc-input 
						v-model="formValidate.value" 
						:disabled="disabled"
						clearable
						append="rmb"
					/>
				</vc-form-item>
				<vc-form-item prop="value">
					<vc-input-number 
						v-model="formValidate.value" 
						:disabled="disabled"
						clearable
						prepend="rmb"
					/>
				</vc-form-item>
				<vc-form-item>
					<div @click="handleSubmit">Submit</div>
				</vc-form-item>
			</vc-form>

			<br>
			<br>
			<br>
			<br>
			<vc-input-search 
				v-model="value1" 
				:disabled="disabled"
				clearable
			/>
			<br>
			<br>
			<vc-input-search 
				v-model="value1" 
				:disabled="disabled"
				enter-txt="搜索" 
				clearable
			/>
			<br>
			<br>
			<vc-input-number 
				v-model="formValidate.value"
				:disabled="disabled" 
				:precision="2"
				style="width: 80px" 
				prepend="rmb"
			/>
		</div>
		<br>
		<br>
		<br>
		<br>
		<vc-button @click="disabled = !disabled">切换disabled: {{ disabled }}</vc-button>
	</div>
</template>
<script>
import Input from '..';
import Form from '../../form';
import Button from '../../button';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-input': Input,
		'vc-input-number': Input.Number,
		'vc-input-search': Input.Search,
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-button': Button,
	},
	data() {
		return {
			disabled: false,
			value: '',
			value1: 11,
			textvalue: '',
			formValidate: {
				value: '',
			},
			ruleValidate: {
				value: [{
					required: true,
					trigger: 'change'
				}]
			}
		};
	},
	computed: {
		
	},
	mounted() {
		setTimeout(() => {
			this.formValidate.value = 0;
			this.value1 = 0;
		}, 3000);
	},
	methods: {
		handleChange() {
			console.log(this.value);
		},
		handleFocus() {
			console.log('聚焦的回调');
		},
		handleBlur() {
			console.log('失焦的回调');
		},
		handleEnter() {
			console.log('回车键的回调');
		},
		handleSubmit() {
			this.$refs.form.validate().then((res) => {

			}).catch((res) => {
				console.log(res, this.formValidate);
			});
		}
	}
};
</script>
