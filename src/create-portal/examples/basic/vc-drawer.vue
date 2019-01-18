<template>
	<vc-drawer
		v-model="visible"
		title="title"
		@cancel="handleCancel"
	>
		<p> {{ data }} </p>
	</vc-drawer>
</template>

<script>
import Drawer from '../../../drawer/drawer';
import CreatePortal from '../../index';

const config = {
	name: "vc-tpl-basic",
	components: {
		'vc-drawer': Drawer
	},
	props: {
		data: Object
	},
	data() {
		return {
			visible: false
		};
	},
	computed: {
		
	},
	mounted() {
		this.visible = true;
	},
	methods: {
		handleOk() {
			/**
			 * v-model会默认被触发，要由该组件控制，给组件i-modal传值 loading: true
			 */
			// this.visible = false;
			this.$emit('sure');
		},
		handleCancel() {
			// this.visible = false;
			this.$emit('close');
		}
	}
};
export default config;

export const PModalWithBefore = CreatePortal({
	onBefore() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, 1000);
		});
	}
}, config);

export const VCPDrawer = CreatePortal({}, config);
</script>
