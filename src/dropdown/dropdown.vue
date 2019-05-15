<template>
	<vc-popover
		v-bind="$attrs"
		v-model="isActive"
		:placement="placement"
		:trigger="trigger"
		:arrow="arrow"
		:portal-class-name="['is-padding-none', portalClassName]"
		class="vc-dropdown"
		@ready="$emit('ready')"
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
			isActive: false
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
		}
	},
	created() {
		this.dropdownId = getUid('dropdown');
	},
	methods: {
		handleClose() {
			this.$emit('visible-change', false);
			this.$emit('close');
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';
$block: vc-dropdown;

@include block($block) {
	display: inline-block;
}
</style>