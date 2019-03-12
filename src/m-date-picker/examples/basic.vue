<template>
	<div class="vcm-date-picker-basic">
		<vcm-date-picker 
			v-model="value"
			mode="datetime"
		/>
		<vcm-date-picker 
			v-model="value"
			mode="time"
		>
			<h2 slot-scope="it">
				{{ it.label }}
			</h2>
		</vcm-date-picker>
		<h3 @click="handleClick">点击直接调用</h3>

		<h2>表单</h2>
		<vc-form
			ref="form"
			:show-message="false"
			:model="formValidate" 
			:rules="ruleValidate" 
		>
			<vc-form-item prop="timeV" @on-form-change="handleChange">
				<vcm-date-picker
					v-model="formValidate.timeV"
					mode="datetime"
				/>
			</vc-form-item>
			<div @click="handleSubmit">提交表单</div>
		</vc-form >
	</div>
</template>
<script>
import Form from '../../form';
import Input from '../../input';
import Message from '../../message';
import MToast from '../../m-toast/index';
import MDatePicker from '../m-date-picker';
import { cloneDeep } from '../../utils/index';

export default {
	name: "vcm-date-picker-basic",
	components: {
		'vcm-date-picker': MDatePicker,
		'vc-form': Form,
		'vc-form-item': Form.Item
	},
	data() {
		return {
			show: false,
			value: new Date(),
			formValidate: {
				timeV: undefined,
			},
			ruleValidate: {
				timeV: [
					{ 
						required: true, 
						type: 'object',
						message: '请选择时间', 
						trigger: 'change' 
					}
				],
			}
		};
	},
	computed: {
	},
	mounted() {
		
	},
	methods: {
		handleClick() {
			MDatePicker.popup({
				mode: 'datetime'
			}).then((res) => {
				MToast.info(res.label.join('-'));
			}).catch(() => {
			});
		},
		handleChange(...value) {
			console.log(value);
		},
		handleSubmit(name) {
			this.$refs.form.validate((valid) => {
				if (valid) {
					MToast.info('Success!');
				} else {
					MToast.info('请先选择时间!');
				}
			});
		},
	},
};

</script>

<style>
.vcm-date-picker-basic .vcm-date-picker{
	display: flex;
	height: 44px;
	background: white;
	border-bottom: 1px solid #e7e7e7;
	justify-content: center;
	align-items: center;
}
</style>