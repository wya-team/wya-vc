<template>
	<div>
		<vc-button :wait="0" @click="handleClick('success')">成功的提示</vc-button>
		<vc-button :wait="0" @click="handleClick('error')">错误的提示</vc-button>
		<vc-button :wait="0" @click="handleClick('warn')">警告的提示</vc-button>
		<vc-button :wait="0" @click="handleClick('loading')">加载中提示</vc-button>
		<vc-button :wait="0" @click="handleClickClose('info')">手动关闭的提示</vc-button>
		<vc-button :wait="0" @click="handleClickrender">根据render函数渲染</vc-button>
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
				Message.success({
					content: '成功的提示',
				});
			} else if (type === 'error') {
				Message.error('测试错误的提示');
			} else if (type === 'warn') {
				Message.warn('测试警告的提示');
			} else if (type === 'loading') {
				Message.loading('正在加载中');
			}
		},
		handleClickClose() {
			Message.info({
				content: '可关闭的提示',
				closable: true,
				duration: 0,
			});
		},
		handleClickrender() {
			Message.info({
				duration: 10,
				render: h => {
					return h('span', [
						'This is created by ',
						h('a', 'render'),
						' function'
					]);
				}
			});
		}
	}
};
</script>
