<template>
	<div>
		<input v-model="msg" type="text">
		<br>
		<vcm-clipboard 
			:value="msg" 
			tag="span"
			@before="handleBefore"
			@after="handleAfter"
		>
			复制
		</vcm-clipboard>
		<br>
		<br>
		<br>
		<vcm-clipboard :value="msg">简洁版复制</vcm-clipboard>
	</div>
</template>
<script>
import MToast from '../../toast';
import Clipboard from '../index.m';

export default {
	name: "vcm-clipboard-basic",
	components: {
		"vcm-clipboard": Clipboard
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
