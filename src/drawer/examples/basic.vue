<template>
	<div>
		<vc-button @click="handleDrawer">点击出现抽屉</vc-button>
		<vc-button @click="handleDrawer2">点击出现第二个抽屉</vc-button>
		<div style="height: 1000px"/>
		<vc-drawer
			v-model="visible"
			:height="500"
			placement="bottom"
			@cancel="handleCancel"
		>
			我是content1
		</vc-drawer>
		<vc-drawer
			v-model="visible2"
			:width="500"
			:mask="false"
			:scrollable="true"
		>
			<div>
				我是content2
			</div>
		</vc-drawer>
	</div>
</template>
<script>
import Drawer from '../drawer';
import Button from '../../button';

export default {
	name: "vc-tpl-basic",
	components: {
		'vc-drawer': Drawer,
		'vc-button': Button
	},
	data() {
		return {
			visible: false,
			visible2: false
		};
	},
	computed: {
		
	},
	methods: {
		handleDrawer() {
			this.visible = true;
		},
		handleDrawer2() {
			this.visible2 = true;
		},
		handleCancel() {
			console.log('关闭回调1');
		}
	}
};
</script>
