<template>
	<vcm-form 
		ref="formValidate" 
		:model="formValidate" 
		:rules="ruleValidate"
		:label-width="96"
		label-position="left"
		@submit.native.prevent 
	>	
		<vcm-form-item prop="input" label="input">
			<vcm-input v-model="formValidate.input" type="text" placeholder="Enter something..." clearable />
		</vcm-form-item>
		<vcm-form-item prop="array" label="array">
			<vcm-array v-model="formValidate.array" />
		</vcm-form-item>
		<vcm-form-item
			v-for="(item, index) in formValidate.items"
			v-if="item.status"
			:key="index"
			:label="'Item ' + item.index"
			:prop="'items.' + index + '.value'"
			:rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'change'}"
		>
			<vcm-tpl v-model="item.value" type="text" placeholder="Enter something..." >
				<span @click="handleRemove(index)">Delete</span>
			</vcm-tpl>
		</vcm-form-item>
		<vcm-form-item>
			<div @click="handleAdd">Add item</div>
		</vcm-form-item>
		<vcm-form-item>
			<vcm-button type="primary" @click="handleSubmit('formValidate')">Submit</vcm-button>
			<vcm-button style="margin-left: 8px" @click="handleReset('formValidate')">Reset</vcm-button>
		</vcm-form-item>
	</vcm-form>
</template>
<script>
import MForm from '../index.m';

import Tpl from './basic/tpl';
import FakeArray from './basic/array';
import MInput from '../../input/index.m';
import MToast from '../../toast/index.m';
import MButton from '../../button/index.m';

export default {
	name: "vcm-tpl-basic",
	components: {
		'vcm-form': MForm,
		'vcm-form-item': MForm.Item,
		'vcm-tpl': Tpl,
		'vcm-array': FakeArray,
		'vcm-input': MInput,
		'vcm-button': MButton,
	},
	data() {
		return {
			index: 1,
			formValidate: {
				input: '',
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
			}
		};
	},
	computed: {
		
	},
	methods: {
		handleSubmit(name) {
			this.$refs[name].validate().then((res) => {

			}).catch((res) => {
				console.log(res, this.formValidate);
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
