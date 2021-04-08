<template>
	<component 
		:is="tag"
		class="vc-text"
		:style="styles"
		@mouseover="handleMouseOver"
		@mouseout="handleMouseOut"
	>
		<vc-customer 
			v-if="isVisible"
			:value="endIndex > 0 ? `${value.slice(0, endIndex)}${suffix}` : value"
			:index="endIndex"
			:render="renderRow"
		/>
	</component>
</template>
<script>
import { Resize } from '../utils/resize';
import Customer from '../customer';
import { getFitIndex } from './utils';
import Popover from '../popover/index';

export default {
	name: 'vc-text',
	components: { 
		'vc-customer': Customer
	},
	props: {
		tag: {
			type: String,
			default: 'div'
		},
		value: {
			type: String,
			default: ''
		},
		line: {
			type: Number,
			default: 0
		},
		// TODO: 是否改为tail-indent来表示尾部缩进
		indent: {
			type: Number,
			default: 0
		},
		suffix: {
			type: String,
			default: '...'
		},
		placement: {
			type: String,
			default: 'top'
		},
		portalClassName: [Object, String, Array],
		portalStyle: Object,
		renderRow: {
			type: Function,
			// 函数式可以用于高亮显示
			default: (h, props, parent) => {
				const { value } = props;
				return h('span', {}, value);
			}
		}
	},
	data() {
		return {
			isVisible: false,
			endIndex: 0,
		};
	},
	computed: {
		styles() {
			return { cursor: this.endIndex === 0 ? 'unset' : 'pointer' };
		}
	},
	watch: {
		'value': 'calcPosition',
		'indent': 'calcPosition',
		'line': 'calcPosition',
	},
	created() {
		this.timer = null;
	},
	mounted() {
		setTimeout(this.calcPosition, 0);

		Resize.on(this.$el, this.handleResize);
	},
	beforeDestroy() {
		Resize.off(this.$el, this.handleResize);
		this.timer && clearTimeout(this.timer);
	},
	methods: {

		handleResize(immediate) {
			this.timer && clearTimeout(this.timer);
			this.timer = setTimeout(this.calcPosition, 50);
		},

		calcPosition() {
			const { suffix, line, value, indent } = this;
			if (line === 0) {
				this.endIndex = 0;
				this.isVisible = true;
			} else {
				this.endIndex = getFitIndex({
					el: this.$el,
					line, 
					value, 
					suffix,
					indent
				});
				this.isVisible = true;
			}

			this.$emit('clip', this.endIndex);
		},
		handleMouseOver(event) {
			if (this.endIndex > 0) {
				this.popperInstance = null;
				this.popperInstance = Popover.open({
					el: document.body,
					cName: 'vc-text-popover', // 确保不重复创建
					triggerEl: event.target,
					hover: true,
					theme: 'dark',
					placement: this.placement,
					portalClassName: this.portalClassName,
					portalStyle: this.portalStyle,
					content: this.value,
					alone: true
				});
			}
		},
		handleMouseOut() {
			this.popperInstance = null;
		}
	}
};
</script>
<style lang="scss">
.vc-text {
	position: relative;
	display: inline-block;
	word-break: break-all;
	width: 100%;
	span {
		word-break: break-all;
		display: block;
	}
}
</style>
