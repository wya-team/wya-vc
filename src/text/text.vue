<template>
	<component :is="tag" class="vc-text">
		<span v-if="showText">
			{{ endIndex > 0 ? `${value.slice(0, endIndex)}${suffix}` : value }}
		</span>
	</component>
</template>
<script>
import { Resize } from '../utils/resize';
import { getFitIndex } from './utils';

export default {
	name: 'vc-text',
	components: { },
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
		}
	},
	data() {
		return {
			showText: false,
			endIndex: 0,
		};
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
				this.showText = true;
			} else {
				this.endIndex = getFitIndex({
					el: this.$el,
					line, 
					value, 
					suffix,
					indent
				});
				this.showText = true;
			}
			
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
