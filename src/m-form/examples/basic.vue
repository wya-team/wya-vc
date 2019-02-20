<template>
	<vcm-form
		ref="form"
		:model="form"
		:rules="ruleValidate"
		:label-width="50"
		@submit.native.prevent="handleSubmit"
	>
		<vcm-form-item
			label="邮箱"
			prop="mail"
		>
			<vcm-input
				v-model="form.mail"
				type="text"
			/>
		</vcm-form-item>
		<vcm-form-item
			label="姓名"
			prop="name"
		>
			<vcm-input
				v-model="form.name"
				type="text"
			/>
		</vcm-form-item>
		<vcm-form-item
			label="密码"
			prop="password"
		>
			<vcm-input
				v-model="form.password"
				type="password"
			/>
		</vcm-form-item>
		<vcm-form-item
			v-for="(item, index) in form.info"
			:key="index"
			:label="item.name"
			:rules="{
				required: item.require,
				message: 'Item ' + item.index +' 不能为空',
				trigger: 'blur'
			}"
			prop="password"
		>
			<vcm-input
				v-model="item.value"
				type="text"
			/>
		</vcm-form-item>
		<button type="submit">提交</button>
	</vcm-form>

</template>
<script>
import Form from '../index';
import Input from './basic/input';

export default {
	name: "vcm-aaa",
	components: {
		"vcm-form": Form,
		"vcm-form-item": Form.Item,
		'vcm-input': Input
	},
	data() {
		return {
			form: {
				mail: '',
				name: '',
				password: '',
				info: [{
					index: 0,
					name: "性别",
					require: false,
					value: ''
				},
				{
					index: 1,
					name: "年龄",
					require: true,
					value: ''
				}
				],
			},
			ruleValidate: {
				mail: [
					{ required: true, message: '邮箱不可以为空', trigger: 'blur' },
					{ type: 'email', message: '请输入正确的邮箱信息', trigger: 'blur' }
				],
				name: [
					{ required: true, message: '仅可输入小写字母', trigger: 'blur', pattern: /^[a-z]+$/ }
				],
				password: [
					{ required: true, message: '请输入密码' }
				]
			}
		};
	},
	computed: {

	},
	mounted() {

	},
	methods: {
		handleBlur() {
		},
		handleSubmit() {
			this.$refs.form.validate((res) => {
				console.log('res');
			}).catch(err => {
				console.log(err);
			});
		}
	},
};

</script>
<style>
</style>

