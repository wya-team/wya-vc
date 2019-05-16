<template>
	<div>
		<vc-checkbox v-model="single">{{ single }}</vc-checkbox>
		<vc-checkbox-group v-model="social">
			<vc-checkbox label="twitter">
				<span>Twitter</span>
			</vc-checkbox>
			<vc-checkbox label="facebook">
				<span>Facebook</span>
			</vc-checkbox>
			<vc-checkbox label="github" disabled>
				<span>Github</span>
			</vc-checkbox>
			<vc-checkbox label="snapchat" disabled>
				<span>Snapchat</span>
			</vc-checkbox>
		</vc-checkbox-group>
		<vc-checkbox-group v-model="fruit">
			<vc-checkbox label="香蕉"/>
			<vc-checkbox label="苹果"/>
			<vc-checkbox label="西瓜"/>
		</vc-checkbox-group>

		<!-- indeterminate -->
		<div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
			<vc-checkbox
				:indeterminate="indeterminate"
				:value="checkAll"
				@click.prevent.native="handleCheckAll"
			>全选</vc-checkbox>
		</div>
		<vc-checkbox-group v-model="checkAllGroup" @change="handleChange">
			<vc-checkbox label="香蕉"/>
			<vc-checkbox label="苹果"/>
			<vc-checkbox label="西瓜"/>
		</vc-checkbox-group>
	</div>
</template>
<script>
import Checkbox from '..';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-checkbox': Checkbox,
		'vc-checkbox-group': Checkbox.Group,
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
