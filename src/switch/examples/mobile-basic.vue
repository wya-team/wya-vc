<template>
	<div>
		<vcm-switch v-model="single" @change="handleChange" />

		<vcm-switch :value="true" loading />
		<vcm-switch :value="false" loading size="small" />
		
		<vcm-switch size="large" />
		<vcm-switch />
		<vcm-switch size="small" />

		<vcm-switch>
			<span slot="open">开</span>
			<span slot="close">关</span>
		</vcm-switch>
		<br><br>
		<vcm-switch size="large">
			<span slot="open">开启</span>
			<span slot="close">关闭</span>
		</vcm-switch>
		<vcm-switch size="large">
			<span slot="open">ON</span>
			<span slot="close">OFF</span>
		</vcm-switch>
	</div>
</template>
<script>
import MSwitch from '../index.m';

export default {
	name: "vcm-switch-basic",
	components: {
		'vcm-switch': MSwitch
	},
	data() {
		return {
			single: false
		};
	},
	computed: {
		
	},
	methods: {
		handleChange(status) {
			console.log({
				single: this.single,
				other: arguments[0]
			});
		}
	}
};
</script>
