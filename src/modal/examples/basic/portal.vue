<template>
	<vc-modal
		ref="target"
		v-model="visible"
		title="title2"
		@ok="handleOk"
		@cancel="handleCancel"
	>
		<p v-for="i in items" :key="i"> 
			每2秒后高度随机变化 {{ data }} 
		</p>
	</vc-modal>
</template>

<script>
import Modal from '../..';
import PortalCtor from '../../../portal/index';

const wrapper = {
	name: "vc-tpl-basic",
	components: {
		'vc-modal': Modal
	},
	props: {
		data: Object
	},
	data() {
		return {
			items: [1],
			visible: false
		};
	},
	computed: {
		
	},
	mounted() {
		this.visible = true;
		this.timer = setInterval(() => {
			this.items = Array.from({ length: Math.ceil(Math.random() * 30) + 20 }, (e, i) => i);

			this.$refs.target.resetOrigin();
		}, 2000);
	},
	destroyed() {
		clearInterval(this.timer);
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
export default wrapper;

export const Portal = new PortalCtor(wrapper, {});
</script>
