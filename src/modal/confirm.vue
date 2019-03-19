<template>
	<vc-modal
		v-model="visible"
		:confirm="confirm"
		:title="title"
		:content="content"
		:mode="mode"
		:show-cancel="showCancel"
		:ok-text="okText"
		:cancel-text="cancelText"
		:mask-closable="maskClosable"
		:esc-closable="escClosable"
		:mask="mask"
		:size="size"
		:render="render"
		:styles="styles"
		:loading="loading"
		@ok="handleOk"
		@cancel="handleCancel"
	/>
</template>

<script>
import Modal from './modal';
import CreatePortal from '../create-portal/index';

const config = {
	name: "vc-tpl-basic",
	components: {
		'vc-modal': Modal
	},
	props: {
		title: {
			type: String,
			default: '',
		},
		content: {
			type: [String, Function],
			default: ''
		},
		render: {
			type: Function
		},
		mode: {
			type: String,
			default: '',
		},
		showCancel: {
			type: Boolean,
			default: true,
		},
		okText: {
			type: String,
			default: '确定'
		},
		cancelText: {
			type: String,
			default: '取消'
		},
		maskClosable: {
			type: Boolean,
			default: true
		},
		escClosable: {
			type: Boolean,
			default: true
		},
		mask: {
			type: Boolean,
			default: true,
		},
		size: {
			type: String,
			default: 'small'
		},
		styles: {
			type: Object
		},
		loading: {
			type: Boolean,
			default: false
		},
		ok: {
			type: Function
		}
	},
	data() {
		return {
			visible: false,
			confirm: true,
            
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
			if (this.loading) {
				if (this.ok()) {
					this.visible = false;
					this.$emit('sure');
				}
			} else {
				this.$emit('sure');
			}
		},
		handleCancel() {
			// this.visible = false;
			this.$emit('close');
		}
	}
};
export default config;

export const ModalConfirm = CreatePortal({}, config);
</script>
