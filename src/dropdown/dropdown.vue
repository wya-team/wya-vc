<template>
	<vc-popover
		v-bind="$attrs"
		:visible="isActive"
		:placement="placement"
		:trigger="trigger"
		:arrow="arrow"
		:portal-class-name="['is-padding-none', portalClassName]"
		class="vc-dropdown"
		@ready="$emit('ready')"
		@close="$emit('close')"
		@visible-change="handleChange"
	>
		<slot />
		<template #content>
			<slot name="list" />
		</template>
	</vc-popover>
</template>
<script>
import { pick } from 'lodash';
import Popover from "../popover/index";
import { getUid } from '../utils/index';

export default {
	name: "vc-dropdown",
	components: {
		'vc-popover': Popover
	},
	inheritAttrs: false,
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		...pick(Popover.props, [
			'visible',
			'portalClassName'
		]),
		placement: {
			type: String,
			default: 'bottom'
		},
		trigger: {
			type: String,
			default: 'hover'
		},
		arrow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isActive: ''
		};
	},
	computed: {
		
	},
	watch: {
		visible: {
			immediate: true,
			handler(v, old) {
				this.isActive = v;
			}
		},
		isActive(v) {
			// ..
		}
	},
	created() {
		this.dropdownId = getUid('dropdown');
	},
	methods: {
		handleChange(v) {
			this.isActive = v;

			this.sync();
		},
		close() {
			this.isActive = false;

			this.sync();
		},
		/**
		 * v-model 同步, 外部的数据改变时不会触发
		 */
		sync() {
			this.$emit('visible-change', this.isActive);
		}
	}
};
</script>
<style lang="scss">
@import '../style/vars.scss';
$block: vc-dropdown;

@include block($block) {
	display: inline-block;
}
</style>