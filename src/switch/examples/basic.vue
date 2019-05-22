<template>
	<div>
		<vc-switch v-model="single" open="开" close="关" @change="handleChange"/>

		<vc-switch :value="true" loading />
		<vc-switch :value="false" loading size="small" />
		
		<vc-switch size="large" />
		<vc-switch />
		<vc-switch size="small" />

		<vc-switch>
			<span slot="open">开</span>
			<span slot="close">关</span>
		</vc-switch>
		<br><br>
		<vc-switch size="large">
			<span slot="open">开启</span>
			<span slot="close">关闭</span>
		</vc-switch>
		<vc-switch size="large">
			<span slot="open">ON</span>
			<span slot="close">OFF</span>
		</vc-switch>
	</div>
</template>
<script>
import Switch from '..';

export default {
	name: "vc-switch-basic",
	components: {
		'vc-switch': Switch
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
