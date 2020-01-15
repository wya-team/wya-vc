<template>
	<div :class="{ 'is-border': border, 'is-shadow': shadow }" class="vc-card">
		<div v-if="title || $slots.title" class="vc-card__header">
			<slot name="title">
				<p v-if="title">
					<vc-icon v-if="icon" :type="icon" />
					<span>{{ title }}</span>
				</p>
			</slot>
		</div>
		<div v-if="$slots.extra" class="vc-card__extra">
			<slot name="extra" />
		</div>
		<div :style="`padding: ${padding}px`" class="vc-card__body">
			<slot />
		</div>
	</div>
</template>
<script>
import Icon from '../icon/index';

export default {
	name: 'vc-card',
	components: { 
		'vc-icon': Icon
	},
	props: {
		border: {
			type: Boolean,
			default: true
		},
		shadow: {
			type: Boolean,
			default: false
		},
		padding: {
			type: Number,
			default: 16
		},
		title: {
			type: String,
		},
		icon: {
			type: String,
		}
	},
	data() {
		return {
			showHead: true,
			showExtra: true
		};
	},
	computed: {
		
	},
	mounted() {
	}
};
</script>
<style lang="scss">
@import '../style/vars.scss';

$block: vc-card;

@include block($block) {
	background: #fff;
	border-radius: 4px;
	font-size: 14px;
	position: relative;
	transition: all .2s ease-in-out;
	&:hover {
		box-shadow: 0 1px 6px rgba(0,0,0,.2);
		&:after, &:before {
			border-color: #eee
		}
	}
	@include when(border) {
		@include commonBorder1PX('', #e8eaec);
	}
	@include when(shadow) {
		box-shadow: 0 1px 1px 0 rgba(0,0,0,.1)
	}
	@include element(header) {
		@include commonBorder1PX('bottom', #e8eaec);
		padding: 14px 16px;
		line-height: 1;
		p {
			display: inline-block;
			width: 100%;
			height: 20px;
			line-height: 20px;
			font-size: 14px;
			color: #17233d;
			font-weight: 700;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	
	@include element(extra) {
		position: absolute;
		right: 16px;
		top: 14px
	}
}
</style>