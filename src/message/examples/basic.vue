<template>
	<div>
		<vc-button :wait="0" @click="handleClick('success')">
			成功的提示
		</vc-button>
		<vc-button :wait="0" @click="handleClick('error')">
			错误的提示
		</vc-button>
		<vc-button :wait="0" @click="handleClick('warn')">
			警告的提示
		</vc-button>
		<vc-button :wait="0" @click="handleClick('loading')">
			加载中提示
		</vc-button>
		<vc-button :wait="0" @click="handleClickClose('info')">
			手动关闭的提示
		</vc-button>
		<vc-button :wait="0" @click="handleClickrender">
			根据render函数渲染
		</vc-button>
	</div>
</template>
<script>
import Message from '..';
import Button from '../../button';

window.Message = Message;

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
				Message.success('成功的提示', 1, function () {
					console.log('回调');
				});
			} else if (type === 'error') {
				Message.error({
					content: '33333',
					mask: false,
					duration: 0
				});
			} else if (type === 'warn') {
				Message.warning('测试警告的提示');
			} else if (type === 'loading') {
				Message.loading('正在加载中', 1);
			}
		},
		handleClickClose() {
			Message.info('可关闭的提示', 3, {
				closable: true,
				duration: 0,
				top: 100
			});
		},
		handleClickrender() {
			Message.info({
				content: h => {
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
