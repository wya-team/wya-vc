<template>
	<div>
		<vc-button :wait="0" @click="handleClick('success')">成功的提示</vc-button>
		<vc-button :wait="0" @click="handleClick('error')">错误的提示</vc-button>
		<vc-button :wait="0" @click="handleClick('warn')">警告的提示</vc-button>
		<vc-button :wait="0" @click="handleClick('loading')">加载中提示</vc-button>
		<vc-button :wait="0" @click="handleClickClose('info')">手动关闭的提示</vc-button>
	</div>
</template>
<script>
import Message from '../index';
import Button from '../../button';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-button': Button
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
		handleClick(type) {
			if (type === 'success') {
				Message.success('测试成功的提示');
			} else if (type === 'error') {
				Message.error('测试错误的提示');
			} else if (type === 'warn') {
				Message.warn('测试警告的提示');
			} else if (type === 'loading') {
				Message.loading('正在加载中');
			}
		},
		handleClickClose() {
			Message.info('可手动关闭');
		}
	}
};
</script>
