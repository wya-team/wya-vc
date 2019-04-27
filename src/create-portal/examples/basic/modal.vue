<template>
	<vc-modal
		v-model="visible"
		:loading="true"
		title="title"
		@ok="handleOk"
		@cancel="handleCancel"
	>
		<p> {{ data }} </p>
		<vc-basic/>
	</vc-modal>
</template>

<script>
import Modal from '../../../modal/modal';
import CreatePortal from '../../index';
import Basic from '../../../input/examples/basic.vue';

const config = {
	name: "vc-tpl-basic",
	components: {
		'vc-modal': Modal,
		'vc-basic': Basic,
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
			console.log(2);
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

export const PModal = CreatePortal({}, config);
</script>
