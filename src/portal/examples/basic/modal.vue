<template>
	<vc-modal
		v-model="visible"
		:loading="true"
		title="title"
		@ok="handleOk"
		@cancel="handleCancel"
	>
		<p> {{ data }} </p>
		<vc-basic />
	</vc-modal>
</template>

<script>
import Modal from '../../../modal/modal';
import Portal from '../../index';
import Basic from '../../../input/examples/basic.vue';

const wrapper = {
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
		// 聚焦代码
		this.$nextTick(() => {
			let $ = document.querySelector('input');
			let event = document.createEvent('HTMLEvents');
			event.initEvent('focus', true, true);
			$ && $.dispatchEvent(event);
			$ && $.focus();
		});
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
export default wrapper;

export const PModalWithBefore = new Portal(wrapper, {
	onBefore() {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, 1000);
		});
	}
});

export const PModal = new Portal(wrapper, {});
</script>
