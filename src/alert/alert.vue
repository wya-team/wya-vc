<template>
	<vc-transtion-fade>
		<div
			v-if="isActive"
			:class="[`is-${type}`, {'has-icon': showIcon, 'has-desc': desc || $slots.desc}]"
			:style="containerStyle"
			class="vc-alert"
		>
			<vc-icon
				v-if="showIcon"
				:type="iconType"
				:style="iconStyle"
				class="vc-alert__icon"
			/>
			<div class="vc-alert__content">
				<div class="vc-alert__message">
					<div
						v-if="title"
						:style="titleStyle"
						v-html="title"
					/>
					<div v-else :style="titleStyle">
						<slot />
					</div>
					<div
						v-if="desc"
						:style="descStyle"
						v-html="desc"
					/>
					<div
						v-else-if="$slots.desc"
						:style="descStyle"
					>
						<slot name="desc" />
					</div>
				</div>
				<div v-if="closable" class="vc-alert__close" @click="handleClose">
					<slot name="close">
						<vc-icon type="close" />
					</slot>
				</div>
			</div>
		</div>
	</vc-transtion-fade>
</template>

<script>
import Icon from '../icon';
import Transition from '../transition';

// [color, borderColor, backgroundColor], -> CSS
const THEME_MAP = {
	info: ['#5495f6', '#91d5ff', '#e6f7ff'],
	success: ['#52c41a', '#b7eb8f', '#f6ffed'],
	error: ['#ed4014', '#ffb08f', '#fbe9e9'],
	warning: ['#ffbf00', '#ffe58f', '#fffbe6']
};
const THEME_KEY = Object.keys(THEME_MAP);

export default {
	name: 'vc-alert',
	components: {
		'vc-icon': Icon,
		'vc-transtion-fade': Transition.Fade
	},
	model: {
		prop: 'visible',
		event: 'visible-change'
	},
	props: {
		visible: {
			type: Boolean,
			default: true
		},
		type: {
			type: String,
			default: 'info',
			validator(value) {
				return THEME_KEY.includes(value);
			}
		},
		title: {
			type: String,
			default: ''
		},
		desc: {
			type: String,
			default: ''
		},
		icon: {
			type: String,
			default: ''
		},
		showIcon: {
			type: Boolean,
			default: true
		},
		closable: {
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
		containerStyle() {
			const [color, borderColor, backgroundColor] = THEME_MAP[this.type];
			return {
				borderColor,
				backgroundColor
			};
		},
		iconStyle() {
			const [color] = THEME_MAP[this.type];
			return {
				color
			};
		},

		titleStyle() {
			const [color] = THEME_MAP[this.type];
			return (this.desc || this.$slots.desc)
				? {
					marginBottom: '5px',
					fontSize: '14px',
					color
				}
				: {};
		},
		descStyle() {
			const [color] = THEME_MAP[this.type];
			return {
				color,
				opacity: '.7'
			};
		},
		iconType() {
			return this.icon || this.type;
		}
	},
	watch: {
		visible: {
			immediate: true,
			handler(v) {
				this.isActive = v;
			}
		}
	},
	methods: {
		handleClose() {
			this.isActive = false;

			this.$emit('close');
			this.$emit('visible-change', false);
		}
	}
};
</script>

<style lang="scss">
@import '../style/vars.scss';

$block: vc-alert;

@include block($block) {
	overflow: hidden;
	position: relative;
	padding: 4px 10px;
	font-size: 14px;
	border-width: 1px;
	border-style: solid;
	border-radius: 4px;
	color: #515151;
	min-height: 32px;
	@include element(icon) {
		position: absolute;
		left: 12px;
		top: 15px;
		transform: translate3d(0, -50%, 0);
		font-size: 16px;
	}
	@include when(icon, true) {
		padding-left: 38px;
	}
	@include when(desc, true) {
		padding-left: 50px;
		@include element(icon) {
			font-size: 28px;
		}
	}
	@include element(content) {
		display: flex;
	}
	@include element(message) {
		flex: 1;
		> em {
			margin: 0 3px;
			font-style: normal;
		}
	}
	@include element(close) {
		margin-left: 12px;
		cursor: pointer;
	}
	@include when(info) {
		@include element(message) {
			> em {
				color: #5495f6;
			}
		}
	}
	@include when(info) {
		@include element(message) {
			> em {
				color: #5495f6;
			}
		}
	}

	@include when(success) {
		@include element(message) {
			> em {
				color: #52c41a;
			}
		}
	}

	@include when(error) {
		@include element(message) {
			> em {
				color: #ed4014;
			}
		}
	}
	@include when(warning) {
		@include element(message) {
			> em {
				color: #faad14;
			}
		}
	}
}
</style>
