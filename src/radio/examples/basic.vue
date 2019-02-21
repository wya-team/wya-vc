<template>
	<div>
		<!-- single -->
		<vc-radio v-model="single" @change="handleChange">{{ single }}</vc-radio>

		<!-- group -->
		<vc-radio-group v-model="phone">
			<vc-radio label="apple">
				<span>Apple</span>
			</vc-radio>
			<vc-radio label="android">
				<span>Android</span>
			</vc-radio>
			<vc-radio label="windows">
				<span>Windows</span>
			</vc-radio>
		</vc-radio-group>
		<vc-radio-group v-model="animal" vertical>
			<vc-radio label="金斑蝶"/>
			<vc-radio label="爪哇犀牛"/>
			<vc-radio label="印度黑羚"/>
		</vc-radio-group>

		<vc-radio-group v-model="city" type="button" @change="handleChange">
			<vc-radio label="北京"/>
			<vc-radio label="上海" disabled/>
			<vc-radio label="深圳"/>
			<vc-radio label="杭州"/>
		</vc-radio-group>
	</div>
</template>
<script>
import Radio from '..';

export default {
	name: "vc-radio-basic",
	components: {
		'vc-radio': Radio,
		'vc-radio-group': Radio.Group
	},
	data() {
		return {
			single: false,
			phone: 'apple',
			animal: '爪哇犀牛',
			city: '北京'
		};
	},
	computed: {
		
	},
	updated() {
		console.log({
			single: this.single,
			phone: this.phone,
			animal: this.animal,
			city: this.city
		});
	},
	methods: {
		handleChange() {
			console.log(arguments[0]);
		}	
	}
};
</script>
