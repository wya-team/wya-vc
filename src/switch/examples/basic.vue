<template>
	<div>
		<vc-switch v-model="single" open="开" close="关" @change="handleChange"/>

		<vc-switch :value="true" />
		<vc-switch :value="false" />
		
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

		<br>
		<br>
		<br>
		<br>
		
		<!-- 强制设置值 -->
		<vc-switch
			:value="value"
			@change="handleChangeValue"
		/>
	
		<!-- loading -->
		<vc-switch
			:v-model="value"
			@click="handleClick"
		/>
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
