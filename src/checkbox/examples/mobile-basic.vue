<template>
	<div>
		<vcm-checkbox v-model="single">
			{{ single }}
		</vcm-checkbox>
		<vcm-checkbox-group v-model="social">
			<vcm-checkbox label="twitter">
				<span>Twitter</span>
			</vcm-checkbox>
			<vcm-checkbox label="facebook">
				<span>Facebook</span>
			</vcm-checkbox>
			<vcm-checkbox label="github" disabled>
				<span>Github</span>
			</vcm-checkbox>
			<vcm-checkbox label="snapchat" disabled>
				<span>Snapchat</span>
			</vcm-checkbox>
		</vcm-checkbox-group>
		<vcm-checkbox-group v-model="fruit">
			<vcm-checkbox label="香蕉" />
			<vcm-checkbox label="苹果" />
			<vcm-checkbox label="西瓜" />
		</vcm-checkbox-group>

		<!-- indeterminate -->
		<div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
			<vcm-checkbox
				:indeterminate="indeterminate"
				:value="checkAll"
				@click.prevent.native="handleCheckAll"
			>
				全选
			</vcm-checkbox>
		</div>
		<vcm-checkbox-group v-model="checkAllGroup" @change="handleChange">
			<vcm-checkbox label="香蕉" />
			<vcm-checkbox label="苹果" />
			<vcm-checkbox label="西瓜" />
		</vcm-checkbox-group>
	</div>
</template>
<script>
import Checkbox from '../index.m';

export default {
	name: "vcm-tpl-basic",
	components: {
		'vcm-checkbox': Checkbox,
		'vcm-checkbox-group': Checkbox.Group,
	},
	data() {
		return {
			single: true,
			social: ['facebook', 'github'],
			fruit: ['苹果'],

			indeterminate: true,
			checkAll: false,
			checkAllGroup: ['香蕉', '西瓜']
		};
	},
	computed: {
		
	},
	updated() {
		console.log({
			single: this.single,
			social: this.social,
			fruit: this.fruit,
			checkAll: this.checkAll
		});
	},
	methods: {
		handleCheckAll() {
			if (this.indeterminate) {
				this.checkAll = false;
			} else {
				this.checkAll = !this.checkAll;
			}
			this.indeterminate = false;

			if (this.checkAll) {
				this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
			} else {
				this.checkAllGroup = [];
			}
		},
		handleChange(data) {
			if (data.length === 3) {
				this.indeterminate = false;
				this.checkAll = true;
			} else if (data.length > 0) {
				this.indeterminate = true;
				this.checkAll = false;
			} else {
				this.indeterminate = false;
				this.checkAll = false;
			}
		}
	}
};
</script>
