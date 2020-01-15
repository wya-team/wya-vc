<template>
	<div>
		<h3>无图标</h3>
		<div style="margin-bottom: 12px">
			<vc-button :wait="0" @click="handleClick('open')">
				Normal
			</vc-button>
			<vc-button :wait="0" @click="handleClickTitle('open')">
				仅标题
			</vc-button>
		</div>
		<h3>有图标</h3>
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
			<vc-button :wait="0" @click="handleClickClose('info')">
				手动关闭的提示
			</vc-button>
			<vc-button :wait="0" @click="handleClickrender">
				根据render函数渲染
			</vc-button>
		</div>
	</div>
</template>
<script>
import Notice from '..';
import Button from '../../button';

window.Notice = Notice;

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
			if (type === 'open') {
				Notice.open({
					title: '这是标题',
					content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
					onClose() {
						console.log('回调');
					}
				});
			} else if (type === 'success') {
				Notice.success({
					content: '成功的提示',
					onClose() {
						console.log('回调');
					}
				});
			} else if (type === 'error') {
				Notice.error({
					content: '测试错误的提示',
					onClose() {
						console.log('回调2');
					}
				});
			} else if (type === 'warn') {
				Notice.warning({
					content: '测试警告的提示',
				});
			}
		},
		handleClickTitle(type) {
			if (type === 'open') {
				Notice.open({
					title: '这是标题',
					duration: 0,
					onClose() {
						console.log('回调');
					}
				});
			}
		},
		handleClickClose() {
			Notice.info({
				title: '标题一',
				content: '可关闭的提示',
				closable: true,
				duration: 0,
				onClose() {
					console.log('回调2');
				}
			});
		},
		handleClickrender() {
			Notice.info({
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
