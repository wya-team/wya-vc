<template>
	<div>
		<div class="vcm-date-picker-basic">
			<vcm-date-picker 
				v-model="value"
				label="默认值：当前时间"
				mode="yearmonth"
				title="test"
			/>
			<vcm-date-picker 
				v-model="quarterValue"
				:min-date="new Date('2022')"
				label="季度选择"
				mode="quarter"
				title="test"
			/>
			<vcm-date-picker 
				v-model="defaultEmptyValue"
				mode="datetime"
				:min-date="new Date('2022/10/01')"
				extra="无初始值"
				title="无初始值"
			/>
			<!-- <vcm-date-picker 
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
			</vcm-date-picker> -->
		</div>
		<br>
		<br>
		<br>
		<h3 @click="handleClick">
			点击直接调用
		</h3>
		<br>
		<br>
		<!-- 表单 -->
		<h2>表单</h2>
		<!-- <vcm-form
			ref="form"
			:show-message="true"
			:model="formValidate" 
			:rules="ruleValidate"
			@submit.native.prevent
		>
			<vcm-form-item prop="start" label="开始时间">
				<vcm-date-picker
					v-model="formValidate.start"
					:max-date="formValidate.end"
					mode="datetime"
				/>
			</vcm-form-item>
			<vcm-form-item prop="start" label="结束时间">
				<vcm-date-picker
					v-model="formValidate.end"
					:min-date="formValidate.start"
					mode="datetime"
				/>
			</vcm-form-item>
			<vcm-form-item>
				<vcm-button @click="handleSubmit">
					提交表单
				</vcm-button>
			</vcm-form-item>
		</vcm-form>
		<vcm-date-picker-view v-model="valueView" @change="handleChange" /> -->
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
			quarterValue: [],
			valueEmpty: undefined,
			defaultEmptyValue: '',
			valueView: new Date(),
			formValidate: {
				start: undefined,
				end: undefined
			},
			ruleValidate: {
				start: [
					{ 
						required: true, 
						type: 'object',
						message: '请选择开始时间', 
						trigger: 'change' 
					}
				],
				end: [
					{ 
						required: true, 
						type: 'object',
						message: '请选择结束时间', 
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
				title: 'yes',
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
