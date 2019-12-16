<template>
	<component :is="tag" class="vc-text">
		<span v-if="showText">
			{{ endIndex > 0 ? `${value.slice(0, endIndex)}${suffix}` : value }}
		</span>
		<div
			ref="hide"
			:style="{
				minHeight: `${lineHeight * line}px`,
				textIndent: `${indent}px`,
				...padding
			}"
			class="vc-text__hide"
		/>
	</component>
</template>
<script>
import { $ } from '@wya/utils';
import { Resize } from '../utils/resize';

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
			lineHeight: 0,
			padding: {},
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
		this.lineHeight = parseInt($(this.$el).getStyle('line-height'), 10);
		this.padding = {
			paddingTop: $(this.$el).getStyle('paddingTop'),
			paddingLeft: $(this.$el).getStyle('paddingLeft'),
			paddingRight: $(this.$el).getStyle('paddingRight'),
			paddingBottom: $(this.$el).getStyle('paddingBottom'),
		};
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
			const { suffix } = this;
			this.endIndex = 0;
			if (this.line === 0) {
				this.showText = true;
				return;
			}
			let el = this.$refs.hide;
			el.innerText = suffix;

			// 操作DOM
			this.value.split('').forEach((item, i) => {
				// 后缀必须放入后面计算，前面会造成问题
				let old = el.innerText;
				old = old.substring(0, old.length - suffix.length);
				el.innerText = old + item + suffix;

				let { paddingBottom, paddingTop } = this.padding;
				let h = parseInt(paddingBottom, 10) + parseInt(paddingTop, 10);

				// TODO: 是否考虑边框的情况
				if (el.clientHeight - h > this.lineHeight * this.line && this.endIndex === 0) {
					this.endIndex = i;
				}
			});
			this.showText = true;
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
	&__hide {
		position: absolute;
		word-break: break-all;
		width: 100%;
		overflow: auto;
		opacity: 0;
		z-index: -1;
	}
	span {
		word-break: break-all;
		display: block;
	}
}
</style>
