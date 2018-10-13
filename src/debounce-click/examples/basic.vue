<template>
	<vc-debounce-click :tag="Button" @click="handleClick">
		点击
	</vc-debounce-click>
</template>
<script>
import { Button } from 'iview';
import DebounceClick from '../debounce-click';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-debounce-click': DebounceClick,
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	beforeCreate() {
		/**
		 * 这样不会被注册监听
		 */
		this.Button = Button;
	},
	methods: {
		handleClick(e) {
			console.log(e, new Date());
		}
	}
};
</script>
