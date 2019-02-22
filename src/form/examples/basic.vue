<template>
	<vc-form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
		<vc-form-item
			v-for="(item, index) in formDynamic.items"
			v-if="item.status"
			:key="index"
			:label="'Item ' + item.index"
			:prop="'items.' + index + '.value'"
			:rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}"
		>
			<input v-model="item.value" type="text" placeholder="Enter something..." >
			<span @click="handleRemove(index)">Delete</span>
		</vc-form-item>
		<vc-form-item>
			<div type="dashed" long icon="md-add" @click="handleAdd">Add item</div>
		</vc-form-item>
		<vc-form-item>
			<div type="primary" @click="handleSubmit('formDynamic')">Submit</div>
			<div style="margin-left: 8px" @click="handleReset('formDynamic')">Reset</div>
		</vc-form-item>
	</vc-form>
</template>
<script>
import Form from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-form': Form,
		'vc-form-item': Form.Item,
	},
	data() {
		return {
			index: 1,
			formDynamic: {
				items: [
					{
						value: '',
						index: 1,
						status: 1
					}
				]
			}
		};
	},
	computed: {
		
	},
	methods: {
		handleSubmit(name) {
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.$Message.success('Success!');
				} else {
					this.$Message.error('Fail!');
				}
			});
		},
		handleReset(name) {
			this.$refs[name].resetFields();
		},
		handleAdd() {
			this.index++;
			this.formDynamic.items.push({
				value: '',
				index: this.index,
				status: 1
			});
		},
		handleRemove(index) {
			this.formDynamic.items[index].status = 0;
		}
	}
};
</script>
