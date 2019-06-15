<template>
	<div>
		<input v-model="msg" type="text">
		<br>
		<vcm-copy 
			:value="msg" 
			tag="span"
			@before="handleBefore"
			@after="handleAfter"
		>
			复制
		</vcm-copy>
		<br>
		<br>
		<br>
		<vcm-copy :value="msg">简洁版复制</vcm-copy>
	</div>
</template>
<script>
import MToast from '../../toast';
import Copy from '../index.m';

export default {
	name: "vcm-copy-basic",
	components: {
		"vcm-copy": Copy
	},
	data() {
		return {
			msg: 'copy'
		};
	},
	computed: {
		
	},
	methods: {
		handleAfter(value) {
			MToast.info({
				content: `复制成功：${value}`
			});
			return value;
		},
		handleBefore(e, value) {
			return value;
		}
	}
};
</script>
