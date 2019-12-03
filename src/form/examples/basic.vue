<template>
	<vc-form 
		ref="formValidate" 
		:model="formValidate" 
		:rules="ruleValidate"
		:label-width="96"
		style="padding-left: 56px; margin-top: 21px"
		@submit.native.prevent
	>
		<vc-form-item prop="input" label="input：">
			<vc-input v-model="formValidate.input" style="width: 300px" />
		</vc-form-item>
		<vc-form-item prop="array" label="array：">
			<vc-array v-model="formValidate.array" />
		</vc-form-item>
		<vc-form-item prop="array" label="水果：">
			<vc-checkbox-group>
				<vc-checkbox label="香蕉"/>
				<vc-checkbox label="苹果"/>
				<vc-checkbox label="西瓜"/>
			</vc-checkbox-group>
		</vc-form-item>
		<vc-form-item prop="array" label="水果：">
			<vc-checkbox label="香蕉"/>
		</vc-form-item>
		<vc-form-item prop="animal" label="动物：">
			<vc-checkbox label="香蕉"/>
			<vc-form-item>
				<vc-radio-group v-model="formValidate.animal" vertical>
					<vc-radio label="金斑蝶"/>
					<vc-radio label="爪哇犀牛"/>
					<vc-radio label="印度黑羚"/>
				</vc-radio-group>
			</vc-form-item>
		</vc-form-item>
		<vc-form-item prop="animal" label="动物：">
			<vc-radio-group v-model="formValidate.animal" vertical>
				<vc-radio label="金斑蝶"/>
				<vc-radio label="爪哇犀牛"/>
				<vc-radio label="印度黑羚"/>
			</vc-radio-group>
		</vc-form-item>
		<vc-form-item prop="animal" label="动物：">
			<vc-radio-group v-model="formValidate.animal">
				<vc-radio label="金斑蝶"/>
				<vc-radio label="爪哇犀牛"/>
				<vc-radio label="印度黑羚"/>
			</vc-radio-group>
		</vc-form-item>
		<vc-form-item prop="animal" label="动物：">
			<vc-radio label="金斑蝶"/>
		</vc-form-item>
		<vc-form-item
			v-for="(item, index) in formValidate.items"
			v-if="item.status"
			:key="index"
			:label="'Item ' + item.index + '：'"
			:prop="'items.' + index + '.value'"
			:rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'change'}"
		>
			<vc-tpl v-model="item.value" type="text" placeholder="Enter something..." >
				<span @click="handleRemove(index)">Delete</span>
			</vc-tpl>
		</vc-form-item>
		<vc-form-item>
			<div @click="handleAdd">Add item</div>
		</vc-form-item>
		<vc-form-item>
			<vc-button type="primary" @click="handleSubmit('formValidate')">Submit</vc-button>
			<vc-button style="margin-left: 8px" @click="handleReset('formValidate')">Reset</vc-button>
			<vc-button style="margin-left: 8px" @click="handleOnly('formValidate')">Only</vc-button>
			<vc-button style="margin-left: 8px" @click="handleShow">Popop</vc-button>
		</vc-form-item>
	</vc-form>
</template>
<script>
import { FormPopup } from './popup/form.vue';
import Form from '..';
import Tpl from './basic/tpl'; // 可以使用trigger
import FakeArray from './basic/array'; // 可以使用trigger
import Input from '../../input';
import Button from '../../button';
import Checkbox from "../../checkbox";
import Radio from "../../radio";

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-form': Form,
		'vc-form-item': Form.Item,
		'vc-tpl': Tpl,
		'vc-array': FakeArray,
		'vc-input': Input,
		'vc-button': Button,
		'vc-checkbox-group': Checkbox.Group,
		'vc-checkbox': Checkbox,
		'vc-radio-group': Radio.Group,
		'vc-radio': Radio,
	},
	data() {
		return {
			index: 1,
			formValidate: {
				array: [],
				items: [
					{
						value: '',
						index: 1,
						status: 1
					}
				]
			},
			ruleValidate: {
				items: {

				},
				array: [{
					required: true
				}]
			},
		};
	},
	computed: {
		
	},
	methods: {
		handleShow() {
			FormPopup.popup({

			}).then(res => {

			}).catch(err => {

			});
		},
		handleSubmit(name) {

			this.$refs[name].validate(() => {}).then((res) => {

			}).catch((res) => {
				console.log(res, this.formValidate);
			});
		},

		handleOnly(name) {
			this.$refs[name].validateField('items.0.value', { scroll: true }).then(() => {

			}).catch((error) => {
				console.log(error);
			});
		},

		handleReset(name) {
			this.$refs[name].resetFields();
		},

		handleAdd() {
			this.index++;
			this.formValidate.items.push({
				value: '',
				index: this.index,
				status: 1
			});
		},

		handleRemove(index) {
			this.formValidate.items[index].status = 0;
		}
	}
};
</script>
