<template>
	<div>
		<input v-model="msg" type="text">
		<br>
		<vc-clipboard 
			:value="msg" 
			tag="span"
			@before="handleBefore"
			@after="handleAfter"
		>
			复制
		</vc-clipboard>
		<br>
		<br>
		<br>
		<vc-clipboard :value="msg">简洁版复制</vc-clipboard>
	</div>
</template>
<script>
import Message from '../../message';
import Clipboard from '..';

export default {
	name: "vc-clipboard-basic",
	components: {
		"vc-clipboard": Clipboard
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
			Message.success({
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
