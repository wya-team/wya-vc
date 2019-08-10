<template>
	<div>
		<vcm-switch v-model="single" open="开" close="关" @change="handleChange"/>

		<vcm-switch :value="true" />
		<vcm-switch :value="false" />
		
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

		<br>
		<br>
		<br>
		<br>
		
		<!-- 强制设置值 -->
		<vcm-switch
			:value="value"
			@change="handleChangeValue"
		/>
	
		<!-- loading -->
		<vcm-switch
			:v-model="value"
			@click="handleClick"
		/>
	</div>
</template>
<script>
import Switch from '../index.m';

export default {
	name: "vcm-switch-basic",
	components: {
		'vcm-switch': Switch
	},
	data() {
		return {
			single: false,
			value: false,
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
		},

		/**
		 * 外部强制设置内部的值
		 */
		handleChangeValue(v, e, forceReset) {
			forceReset(this.value);
		},

		/**
		 * loading
		 */
		
		handleClick(e, next, forceReset) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
					callback();
				}, 300000);
			});
		}
	}
};
</script>
