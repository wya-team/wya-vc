<template>
	<div>
		<input v-model="msg" type="text">
		<br>
		<vc-copy 
			:value="msg" 
			tag="span"
			@before="handleBefore"
			@after="handleAfter"
		>
			复制
		</vc-copy>
		<br>
		<br>
		<br>
		<vc-copy :value="msg">简洁版复制</vc-copy>
	</div>
</template>
<script>
import Message from '../../message';
import Copy from '../copy';

export default {
	name: "vc-copy-basic",
	components: {
		"vc-copy": Copy
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
