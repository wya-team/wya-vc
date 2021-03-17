<template>
	<ul class="vc-rate" @mouseleave="handleMouseleave">
		<li 
			v-for="(item, index) in dataSource"
			:key="index"
			:class="{'is-not-last': index < count - 1, 'is-disabled': disabled, 'is-half': item.isHalf, 'is-full': item.isFull }"
			:style="{...iconStyle, 'color': item.color }" 
			class="vc-rate__star"
			@click="handleClick($event, item)"
			@mousemove="handleMouseMove($event, item)"
		>
			<div class="vc-rate__star--icon vc-rate__star--first">
				<span v-if="character">{{ character }}</span>
				<vc-icon v-else :type="icon" />
			</div>
			<div class="vc-rate__star--icon vc-rate__star--second">
				<span v-if="character">{{ character }}</span>
				<vc-icon v-else :type="icon" />
			</div>
		</li>
		<li v-if="tooltips.length" class="vc-rate__tips">
			<slot name="tip" :value="currentValue">
				{{ tooltips[Math.ceil(currentValue) - 1] }}
			</slot>
		</li>
	</ul>
</template>

<script>
import { DOM } from '@wya/utils';
import { eleInRegExp } from '../utils/index';
import Extends from '../extends';
import Icon from '../icon/index';

export default {
	name: 'vc-rate',
	components: {
		'vc-icon': Icon
	},
	mixins: [...Extends.mixins(['emitter'])],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		value: {
			type: Number,
			default: 0
		},
		// 星星的数量
		count: {
			type: Number,
			default: 5
		},
		color: { 
			type: String,
			default: '#16a3ff'
		},
		icon: {
			type: String,
			default: 'star'
		},
		// 自定义的字符串
		character: String,
		half: {
			type: Boolean,
			default: false
		},
		clearable: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		// 每项的提示
		tooltips: {
			type: Array,
			default: () => ([])
		},
		iconStyle: {
			type: Object,
			default: () => ({})
		},
	},
	data() {
		return {
			currentValue: 0,
			hoverValue: -1,
			isHover: false,
			dataSource: [],
		};
	},
	computed: {
		config() {
			return { count: this.count, value: this.isHover ? this.hoverValue : this.currentValue };
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.currentValue = this.half ? val : parseInt(val, 10);
			},
		},
		config: {
			immediate: true,
			handler(obj) {
				let { count, value } = obj;
				let array = [...Array(count).keys()].map((v) => v + 1);
				this.dataSource = array.map((v, index) => {
					// 0 < xx < 1 0.8也算一半
					let isHalf = this.half && v > value && (v - 1) < value;
					let isFull = v <= value;
					return {
						value: v,
						isFull,
						isHalf,
						color: isFull || isHalf ? this.color : ''
					};
				});
			}
		}
	},
	methods: {
		getClickSide(e) {
			let path = e.path || DOM.composedPath(e) || [];
			let isLeftSide = path.some(item => eleInRegExp(item, { className: /vc-rate__star--first/ }));
			let isRightSide = path.some(item => eleInRegExp(item, { className: /vc-rate__star--second/ }));
			if (isLeftSide) return 'left';
			if (isRightSide) return 'right';
			return false;
		},
		getValue(e, currentValue, item, clearable) {
			let { value, isHalf, isFull } = item;
			let clickSide = this.half && this.getClickSide(e);
			if (!clearable) {
				if (clickSide === 'left') {
					return value - 0.5;
				} else if (clickSide === 'right') {
					return value;
				} else { // half为false
					return value;
				}
			} else if (clearable) {
				if (clickSide === 'left') {
					let offset = 0.5;
					if (isHalf) offset = 1;
					else if (isFull) offset = 0.5;
					return value - offset;
				} else if (clickSide === 'right') {
					return value - (isFull ? 1 : 0);
				} else { // half为false
					return currentValue == value ? value - 1 : value;
				}
			}
		},
		handleMouseMove(e, item) {
			if (this.disabled) return;

			this.hoverValue = this.getValue(e, this.hoverValue, item, false);
			this.isHover = true;
		},
		handleMouseleave() {
			if (this.disabled) return;
			this.isHover = false;
			this.hoverValue = -1;
		},
		handleClick(e, item) {
			if (this.disabled) return;
			// hover状态下item是hover生成的item,里面的isFull和isHalf全部设为false，点击才会保持住
			if (this.isHover) {
				item.isHalf = false;
				item.isFull = false;
				this.isHover = false;
			}
			
			this.currentValue = this.getValue(e, this.currentValue, item, this.clearable);
			this.$emit('change', this.currentValue);
			this.dispatch('vc-form-item', 'form-change', this.currentValue);
		},
	}
};
</script>

<style lang="scss">
@import '../style/vars.scss';

@include block(vc-rate) {
	font-size: 16px;
    line-height: unset;
    list-style: none;
	@include element(star) {
		position: relative;
		display: inline-block;
		cursor: pointer;
		@include when(not-last) {
			margin-right: 8px;
		}
		@include when(half) {
			.vc-rate__star--first {
				opacity: 1;
			}
		}
		@include when(full) {
			.vc-rate__star--icon {
				color: inherit;
			}
		}
		@include when(disabled) {
			cursor: unset;
		}
		@include modifier(icon) {
			color: #f0f0f0;
			transition: all .3s;
			user-select: none;
		}
		@include modifier(first) {
			color: inherit;
			position: absolute;
			top: 0;
			left: 0;
			width: 50%;
			height: 100%;
			overflow: hidden;
			opacity: 0;
		}
		@include modifier(second) {
			
		}
	}
	@include element(tips) {
		font-size: 14px;
		margin: 0 8px;
		display: inline-block;
		color: #333333;
		box-sizing: border-box;
	}
}
</style>