<template>
	<div :class="classes" class="vcm-list-item" @click="handleLinkTo">
		<div :style="[labelStyle]">
			<slot name="label">
				{{ label }}
			</slot>
		</div>
		<div class="vcm-list-item__content">
			<div class="vcm-list-item__extra">
				<slot name="extra">
					{{ extra }}
				</slot>
			</div>
			<vc-icon 
				v-if="arrow" 
				:type="icon" 
				class="vcm-list-item__icon" 
			/>
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
		},
		/**
		 * 表单情况下
		 */
		form: {
			from: 'form',
			default: undefined
		}
	},
	props: {
		label: String,
		labelWidth: {
			type: Number | String,
			default: ''
		},
		extra: String,
		arrow: {
			type: String | Boolean,
			default: 'right',
		},
		// 多行
		multiple: {
			type: Boolean,
			default: false
		},
		to: String | Object,
		method: {
			type: String,
			default: 'push',
			validator: v => /^(push|replace|go|back|forward)$/.test(v)
		}
	},
	data() {
		return {
		};
	},
	computed: {
		classes() {
			/**
			 * form/list特殊处理
			 */
			let hasForm = !!this.form;
			let hasList = !!this.list;
			return {
				'vcm-list-item--alone': !hasList || hasForm,
				'vcm-list-item--multi': this.multiple,
				'vcm-list-item--line': !this.multiple,
			};
		},
		labelStyle() {
			const labelWidth = this.labelWidth === 0 || this.labelWidth ? this.labelWidth : (this.list && this.list.labelWidth);
			return {
				width: labelWidth > 0 ? `${labelWidth}px` : 'auto'
			};
		},
		icon() {
			return typeof arrow === 'string' ? arrow : 'right';
		}
	},
	watch: {
		
	},
	created() {
		console.log(this.form);
	},
	methods: {
		handleLinkTo(e) {
			if (this.to) {
				if (typeof to === 'string' && HTTP_REGEX.test(to)) {
					window.open(to);
				} else {
					this.$router && this.$router[this.method](to);
				}
			} else {
				this.$emit('click', e);
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
	line-height: 24px;
	background: #fff;
	color: #000;
	padding-top: 12px;
	padding-bottom: 12px;
	padding-right: 12px;
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
		padding-right: unset;
	}
	@include element(content) {
		display: flex;
		align-items: center;
	}
	@include element(extra) {
		color: #828282;
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
