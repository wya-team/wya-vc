<template>
	<div class="v-tpl-basic">
		<vc-button @click="handleClickWithBefore">
			点我(带延迟)
		</vc-button>
		<vc-button @click="handleClick">
			点我(不带延迟)
		</vc-button>
		<vc-button @click="handleKeepAliveWithBefore">
			点我(带延迟)(keep-alive)
		</vc-button>
		<vc-button @click="handleKeepAlive">
			点我(不带延迟)(keep-alive)
		</vc-button>
		<vc-button @click="handleClean">
			销毁
		</vc-button>

		<vc-button 
			@click="handleTestingStart"
		>压力测试</vc-button>
		<vc-button 
			@click="handleTestingEnd"
		>结束测试</vc-button>
	</div>
</template>
<script>
import Button from '../../button';
import Message from '../../message';
import { PModal, PModalWithBefore } from './basic/modal';
import { KeepAlive, KeepAliveWithBefore } from './basic/keep-alive';
import { VcInstance } from '../../vc/index';

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
		handleTestingStart() {
			clearInterval(this.timer);
			this.timer = setInterval(() => {
				Message.info(Math.random().toString(), { mask: false });
			}, 50);
			// Message.info(Math.random().toString(), { mask: false, duration: 110000 });
		},
		handleTestingEnd() {
			clearInterval(this.timer);
		},
		handleClickWithBefore() {
			PModalWithBefore.popup({
				data: { s: 1 }
			}).then((res) => {
				console.log(res, 'sure');
			}).catch((res) => {
				console.log(res, 'close');
			});
		},
		handleClick() {
			PModal.popup({
				data: { s: 1 }
			}).then((res) => {
				console.log(res, 'sure');
			}).catch((res) => {
				console.log(res, 'close');
			});
		},
		handleKeepAliveWithBefore() {
			KeepAliveWithBefore.popup({
				data: { s: Math.random() }
			}).then((res) => {
				console.log(res, 'sure');
			}).catch((res) => {
				console.log(res, 'close');
			});
		},
		handleKeepAlive() {
			KeepAlive.popup({
				data: { s: Math.random() }
			}).then((res) => {
				console.log(res, 'sure');
			}).catch((res) => {
				console.log(res, 'close');
			});
		},
		handleClean() {
			// this.$vc.clean();
			VcInstance.clean('vc-tpl-basic-keep-alive');
		}
	}
};
</script>
<style>
.v-tpl-basic {
	padding: 20px;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	height: 400px;
	width: 200px
}
</style>