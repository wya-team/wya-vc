<template>
	<component :is="tag">
		<div style="position: relative" @click="handleToggle">
			<slot />
			<slot :is-expend="isActive" name="icon" />
		</div>
		<vc-expand v-model="isActive" :remove="$parent.remove">
			<div>
				<slot name="content" />
			</div>
		</vc-expand>
	</component>
</template>
<script>
import Icon from '../icon/index';
// import Transition from '../transition/index';
import Expand from '../expand/index';

export default {
	name: "vc-collapse-item",
	components: {
		'vc-icon': Icon,
		'vc-expand': Expand,
		// 'vc-transition-collapse': Transition.Collapse,
	},
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		name: {
			type: String
		},
	},
	data() {
		return {
			index: 0,
			isActive: false
		};
	},
	computed: {
		
	},
	methods: {
		handleToggle() {
			this.$parent.toggle({
				name: this.name || this.index,
				isActive: this.isActive
			});
		}
	}
};
</script>