<template>
	<vc-transition-collapse :duration="{ enter: 0.2, leave: 0.2 }">
		<!-- 收起后 设置display: none -->
		<template v-if="!remove">
			<component :is="tag" v-show="isActive">
				<slot />
			</component>
		</template>
		<!-- 收起后将DOM移除 -->
		<template v-else>
			<component :is="tag" v-if="isActive">
				<slot />
			</component>
		</template>
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
		},
		remove: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			isActive: this.visible
		};
	},
	computed: {
		
	},
	watch: {
		visible: {
			immediate: true,
			handler(v, old) {
				this.isActive = v;
				/**
				 * [visible description]
				 * @type {[type]}
				 */
				VcInstance.emit('vc-expand', { visible: v });
			}
		}
	},
	methods: {
	}
};
</script>
