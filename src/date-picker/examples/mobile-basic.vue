<template>
	<div>
		<div class="vcm-date-picker-basic">
			<vcm-date-picker 
				v-model="value"
				mode="datetime"
			/>
			<vcm-date-picker 
				v-model="valueEmpty"
				mode="datetime"
				extra="空值测试"
				title="2"
			/>
			<vcm-date-picker 
				v-model="value"
				:arrow="false"
				mode="time"
			>
				<template #default="it">
					<h2>
						{{ it.label }}
					</h2>
				</template>
			</vcm-date-picker>
		</div>
		<br>
		<br>
		<br>
		<h3 @click="handleClick">点击直接调用</h3>
		<br>
		<br>
		<!-- 表单 -->
		<h2>表单</h2>
		<vcm-form
			ref="form"
			:show-message="true"
			:model="formValidate" 
			:rules="ruleValidate"
			@submit.native.prevent
		>
			<vcm-form-item prop="timeV" label="日期选择">
				<vcm-date-picker
					v-model="formValidate.timeV"
					:min-date="value"
					mode="datetime"
				/>
			</vcm-form-item>
			<vcm-form-item>
				<vcm-button @click="handleSubmit">
					提交表单
				</vcm-button>
			</vcm-form-item>
		</vcm-form >
		<vcm-date-picker-view v-model="valueView" @change="handleChange"/>
	</div>
</template>
<script>
import { cloneDeep } from 'lodash';
import Form from '../../form/index.m';
import Input from '../../input/index.m';
import Button from '../../button/index.m';
import Message from '../../message';
import Toast from '../../toast/index';
import MDatePicker from '../index.m';

export default {
	name: "vcm-date-picker-basic",
	components: {
		'vcm-date-picker': MDatePicker,
		'vcm-date-picker-view': MDatePicker.View,
		'vcm-form': Form,
		'vcm-form-item': Form.Item,
		'vcm-button': Button
	},
	data() {
		return {
			show: false,
			value: new Date(),
			valueEmpty: undefined,
			valueView: new Date(),
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
		setTimeout(() => {
			this.valueEmpty = new Date('2020');
		}, 3000);

		setTimeout(() => {
			this.valueEmpty = new Date('2020');
		}, 6000);

		setTimeout(() => {
			this.valueEmpty = undefined;
		}, 9000);
	},
	methods: {
		handleClick() {
			MDatePicker.open({
				mode: 'datetime',
				onOk: () => {
					Toast.info(res.label.join('-'));
				}
			});
		},
		handleChange(value) {
			console.log(value);
		},
		handleSubmit(name) {
			this.$refs.form.validate()
				.then(() => {
					Toast.info('Success!');
				}).catch(() => {

				});
		},
	},
};

</script>
