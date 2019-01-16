<template>
	<div class="v-tpl-basic">
		<i-button @click="handleClickWithBefore">
			点我(带延迟)
		</i-button>
		<i-button @click="handleClick">
			点我(不带延迟)
		</i-button>
		<i-button @click="handleClickVcModal">
			点我(不带延迟,vc-modal)
		</i-button>
		<i-button @click="handleKeepAliveWithBefore">
			点我(带延迟)(keep-alive)
		</i-button>
		<i-button @click="handleKeepAlive">
			点我(不带延迟)(keep-alive)
		</i-button>
		<i-button @click="handleClean">
			销毁
		</i-button>
	</div>
</template>
<script>
import { Button } from 'iview';
import { PModal, PModalWithBefore } from './basic/modal';
import { VCPModal } from './basic/vc-modal';
import { KeepAlive, KeepAliveWithBefore } from './basic/keep-alive';
import { VcInstance } from '../../vc/index';

export default {
	name: "vc-tpl-basic",
	components: {
		'i-button': Button
	},
	data() {
		return {
		};
	},
	computed: {
		
	},
	methods: {
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
		handleClickVcModal() {
			VCPModal.popup({
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