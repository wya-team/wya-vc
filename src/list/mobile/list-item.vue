<template>
	<div :class="classes" @click="handleLinkTo">
		<div :style="{ width: labelWidth }">
			<slot name="label">
				{{ label }}
			</slot>
		</div>
		<div class="vcm-list-item__right">
			<slot >
				{{ extra }}
			</slot>
			<vc-icon v-if="arrow" type="right" class="vcm-list-item__icon" />
		</div>
	</div>
</template>

<script>
import Icon from '../../icon/index';

const HTTP_REGEX = /[a-zA-z]+:\/\/[^\s]*/;

export default {
	name: 'vcm-list-item',
	components: {
		'vc-icon': Icon
	},
	inject: {
		list: {
			from: 'list',
			default: undefined
		}
	},
	props: {
		label: String,
		width: {
			type: Number | String,
			default: ''
		},
		extra: String,
		// 带不带箭头
		arrow: {
			type: Boolean,
			default: false
		},
		// 多行
		multipleLine: {
			type: Boolean,
			default: false
		},
		to: String | Object,
		routeMethod: {
			type: String,
			default: 'push',
			validator: (val) => /(push|replace)/.test(val)
		}
	},
	data() {
		return {
		};
	},
	computed: {
		classes() {
			let classNames = 'vcm-list-item';
			if (!this.list) {
				classNames += ' vcm-list-item--alone';
			}
			classNames += this.multipleLine ? ' vcm-list-item--multi' : ' vcm-list-item--line';
			return classNames;
		},
		labelWidth() {
			let width = this.width || (this.list && this.list.labelWidth);
			return typeof width === 'string' ? width : width + 'px';
		}
	},
	watch: {
		
	},
	created() {
		
	},
	methods: {
		handleLinkTo() {
			if (this.to) {
				if (typeof to === 'string' && HTTP_REGEX.test(to)) {
					window.open(to);
				} else {
					this.$router && this.$router[this.routeMethod](to);
				}
			}
		}
	},
};
</script>

<style lang="scss">
@import '../../style/index.scss';

@include block(vcm-list-item) {
	@include commonBorder1PX(bottom);
	display: flex;
	font-size: 16px;
	color: #000;
	background-color: #fff;
	padding-top: 12px;
	padding-bottom: 12px;
	// 单行
	@include modifier(line) {
		align-items: center;
		justify-content: space-between;
	}
	// 换行
	@include modifier(multi) {
		flex-direction: column;
	}
	@include modifier(alone) {
		@include pseudo(after) {
			display: none
		}
		padding-top: unset;
		padding-bottom: unset;
	}
	@include element(right) {
	}
	@include element(icon) {
		color: #828282;
		font-size: 13px;
		margin-left: 5px;
	}
	&:last-child:after {
		display: none
	}
}
</style>
