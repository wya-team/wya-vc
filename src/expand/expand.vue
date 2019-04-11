<template>
	<vc-transition-collapse>
		<component v-show="isActive" :is="tag">
			<slot />
		</component>
	</vc-transition-collapse>
</template>

<script>
import { VcInstance } from '../vc/index';
import Transition from '../transition/index';

export default {
	name: "vc-expand",
	components: {
		'vc-transition-collapse': Transition.Collapse
	},
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		visible: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isActive: this.visible
		};
	},
	computed: {
		
	},
	methods: {
		/**
		 * 外部调用
		 */
		toggle() {
			this.isActive = !this.isActive;
			this.$emit('visible-change', this.isActive);

			VcInstance.emit('vc-expand', { visible: this.isActive });
		}
	}
};
</script>
