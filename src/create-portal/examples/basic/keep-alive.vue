<template>
	<i-drawer 
		v-model="visible" 
		:mask="false" 
		:closable="true"
		:width="width"
		placement="right"
		class="g-drawer"
		@on-close="handleCancel"
	>
		<div v-if="!loading">{{ data }} </div>
		<i-spin v-if="loading"/>
		<div @click="handleCancel">取消</div>
		<div @click="handleOk">确定</div>
	</i-drawer>
</template>

<script>
import { Drawer, Spin } from 'iview';
import CreatePortal from '../../index';

const config = {
	name: "vc-tpl-basic-keep-alive",
	components: {
		'i-drawer': Drawer,
		'i-spin': Spin,
	},
	props: {
		data: Object,
	},
	data() {
		return {
			width: window.innerWidth / 2,
			visible: false,
			loading: false,
		};
	},
	computed: {
		
	},
	mounted() {
		this.visible = true;
	},
	methods: {
		loadData(opts = {}) {
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
			}, 3000);
		},
		handleOk() {
			this.visible = false;
			this.$emit('sure');
		},
		handleCancel() {
			this.visible = false;
			this.$emit('close');
		}
	}
};

export default config;

export const KeepAliveWithBefore = CreatePortal({
	keepAlive: true,
	onBefore() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, 1000);
		});
	}
}, config);

export const KeepAlive = CreatePortal({ keepAlive: true }, config);
</script>
