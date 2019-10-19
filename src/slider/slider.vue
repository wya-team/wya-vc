<template>
	<div :class="classes">	
		<div
			ref="slider"
			:class="{'is-clickable': clickable}"
			class="vc-slider__wrapper"
			@click.self="handleSliderClick"
		>
			<template v-if="showStops">
				<div
					v-for="item in stops"
					:key="item"
					:style="{ 'left': item + '%' }"
					class="vc-slider__stop"
					@click.self="handleSliderClick"
				/>
			</template>
			<div
				:style="barStyle"
				class="vc-slider__bar"
				@click.self="handleSliderClick"
			/>
			<div
				:style="{left: minPosition + '%'}"
				class="vc-slider__btn-wrapper"
				@touchstart="handlePointerDown($event, 'min')"
				@mousedown="handlePointerDown($event, 'min')">
				<vc-popover
					ref="minTooltip"
					:visible="minVisible && !!tipFormat(currentValue[0])"
					:always="showTip === 'always'"
					:portal="false"
					trigger="focus"
					placement="top"
					theme="dark"
				>
					<div
						ref="minPoint"
						:class="minButtonClasses"
						tabindex="0"
						@focus="handleFocus($event, 'min')"
						@blur="handleBlur($event, 'min')"
						@mouseenter="handleEnter($event, 'min')"
						@mouseleave="handleLeave($event, 'min')"
					/>
					<template #content>
						{{ tipFormat(currentValue[0]) }}
					</template>
				</vc-popover>
			</div>
			<div
				v-if="range"
				:style="{left: maxPosition + '%'}"
				class="vc-slider__btn-wrapper"
				@touchstart="handlePointerDown($event, 'max')"
				@mousedown="handlePointerDown($event, 'max')">
				<vc-popover
					ref="maxTooltip"
					:visible="maxVisible && !!tipFormat(currentValue[1])"
					:always="showTip === 'always'"
					:portal="false"
					trigger="focus"
					placement="top"
					theme="dark"
				>
					<div
						ref="maxPoint"
						:class="maxButtonClasses"
						tabindex="0"
						@focus="handleFocus($event, 'max')"
						@blur="handleBlur($event, 'max')"
						@mouseenter="handleEnter($event, 'max')"
						@mouseleave="handleLeave($event, 'max')"
					/>
					<template #content>
						{{ tipFormat(currentValue[1]) }}
					</template>
				</vc-popover>
			</div>
		</div>
		<vc-input-number
			v-if="!range && showInput"
			:min="min"
			:max="max"
			:step="step"
			:value="String(currentValue[0])"
			:disabled="disabled"
			@input="handleInputChange" 
		/>
	</div>
</template>
<script>
import InputNumber from '../input/input-number';
import Popover from '../popover/index';
import Extends from '../extends';
import { Resize } from '../utils/index';

export default {
	name: 'vc-slider',
	components: {
		'vc-input-number': InputNumber,
		'vc-popover': Popover
	},
	mixins: [...Extends.mixins(['emitter'])],
	props: {
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			default: 100
		},
		step: {
			type: Number,
			default: 1
		},
		range: {
			type: Boolean,
			default: false
		},
		value: {
			type: [Number, Array],
			default: 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
		// 是否可以通过点击来移动点
		clickable: {
			type: Boolean,
			default: true
		},
		showStops: {
			type: Boolean,
			default: false
		},
		tipFormat: {
			type: Function,
			default(val) {
				return `${val}`;
			}
		},
		showInput: Boolean,
		showTip: {
			type: String,
			default: 'hover',
			validator: (value) => /^(hover|always|never)$/.test(value)
		},
	},
	data() {
		let val = this.checkLimits(this.value instanceof Array ? this.value : [this.value]);
		return {
			currentValue: val,
			dragging: false,
			pointerDown: '',
			startX: 0,
			currentX: 0,
			startPos: 0,
			sliderWidth: 0,
			minVisible: this.showTip === 'always',
			maxVisible: this.showTip === 'always',
		};
	},
	computed: {
		classes() {
			return [
				'vc-slider',
				{

					'is-slider-input': this.showInput && !this.range,
					'is-slider-disabled': this.disabled
				}
			];
		},
		valueRange() {
			return this.max - this.min;
		},
		minButtonClasses() {
			return [
				'vc-slider__button',
				{ 'is-dragging': this.pointerDown === 'min' }
			];
		},
		maxButtonClasses() {
			return [
				'vc-slider__button',
				{ 'is-dragging': this.pointerDown === 'max' }
			];
		},
		minPosition() {
			return (this.currentValue[0] - this.min) / this.valueRange * 100;
		},
		maxPosition() {
			return (this.currentValue[1] - this.min) / this.valueRange * 100;
		},
		barStyle() {
			const style = {
				width: (this.currentValue[0] - this.min) / this.valueRange * 100 + '%'
			};
			if (this.range) {
				style.left = (this.currentValue[0] - this.min) / this.valueRange * 100 + '%';
				style.width = (this.currentValue[1] - this.currentValue[0]) / this.valueRange * 100 + '%';
			}
			return style;
		},
		// 分割点的left 百分比
		stops() {
			let stopCount = this.valueRange / this.step;
			let result = [];
			let stepWidth = this.step / this.valueRange * 100;
			for (let i = 1; i < stopCount; i++) {
				result.push(i * stepWidth);
			}
			return result;
		},
	},
	watch: {
		value(val) {
			val = this.checkLimits(Array.isArray(val) ? val : [val]);
			if ((val[0] !== this.currentValue[0] || val[1] !== this.currentValue[1])) {
				this.currentValue = val;
			}
		}
	},
	mounted() {
		Resize.on(this.$refs.slider, this.handleSetSliderWidth);
	},
	destroyed() {
		Resize.off(this.$refs.slider, this.handleSetSliderWidth);
	},
	methods: {
		// get
		getPointerX(e) {
			return e.type.indexOf('touch') !== -1 ? e.touches[0].clientX : e.clientX;
		},
		getOffset(pos) {
			let step = this.step.toString();
			let offset = pos % step;
			if (step < 1) {
				let multiple = 1;
				let m;
				try {
					m = step.split('.')[1].length;
				} catch (e) {
					m = 0;
				}
				multiple = 10 ** m;
				// 获取小数点位数，避免经度丢失
				offset = ((pos * multiple) % (step * multiple)) / multiple;
			}
			return offset;
		},
		checkLimits([min, max]) {
			min = Math.max(this.min, min);
			min = Math.min(this.max, min);
			max = Math.max(this.min, min, max);
			max = Math.min(this.max, max);
			return [min, max];
		},
		// handle
		handleInputChange(value) {
			let minValue = Number(value || this.min);
			value = value === 0 ? 0 : minValue > this.max ? this.max : minValue;
			this.currentValue = [value, this.currentValue[1]];
		},
		handleSliderClick(event) {
			if (this.disabled || !this.clickable) return;
			const currentX = this.getPointerX(event);
			const sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;
			let newPos = ((currentX - sliderOffsetLeft) / this.sliderWidth * this.valueRange) + this.min;
			let regularNewPos = newPos / this.valueRange * 100;
			if (!this.range || regularNewPos <= this.minPosition) {
				this.changeButtonPosition(newPos, 'min');
			} else if (regularNewPos >= this.maxPosition) {
				this.changeButtonPosition(newPos, 'max');
			} else {
				let type = ((newPos - this.firstPosition) <= (this.secondPosition - newPos)) ? 'min' : 'max';
				this.changeButtonPosition(newPos, type);
			}
		},
		handlePointerDown(e, type) {
			if (this.disabled) return;
			// e.preventDefault();
			this.pointerDown = type;
			this.handlePointerDragStart(e);

			window.addEventListener('mousemove', this.handlePointerDrag);
			window.addEventListener('touchmove', this.handlePointerDrag);
			window.addEventListener('mouseup', this.handlePointerDragEnd);
			window.addEventListener('touchend', this.handlePointerDragEnd);
		},
		handlePointerDragStart(e) {
			this.dragging = false;
			this.startX = this.getPointerX(e);
			this.startPos = (this[`${this.pointerDown}Position`] * this.valueRange / 100) + this.min;
		},
		handlePointerDrag(e) {
			this.dragging = true;
			this.currentX = this.getPointerX(e);
			const diff = (this.currentX - this.startX) / this.sliderWidth * this.valueRange;
			this.changeButtonPosition(this.startPos + diff);
		},
		handlePointerDragEnd() {
			if (this.dragging) {
				this.dragging = false;
				this[`${this.pointerDown}Visible`] = false;
				this.$refs[`${this.pointerDown}Point`].blur();
				this.sync('change');
			}
			this.pointerDown = '';

			window.removeEventListener('mousemove', this.handlePointerDrag);
			window.removeEventListener('touchmove', this.handlePointerDrag);
			window.removeEventListener('mouseup', this.handlePointerDragEnd);
			window.removeEventListener('touchend', this.handlePointerDragEnd);
		},
		changeButtonPosition(newPos, forceType) {
			const type = forceType || this.pointerDown;
			const index = type === 'min' ? 0 : 1;
			if (type === 'min') {
				newPos = this.checkLimits([newPos, this.max])[0];
			} else {
				newPos = this.checkLimits([this.min, newPos])[1];
			}
			const offset = this.getOffset(newPos);
			const value = this.currentValue;
			value[index] = newPos - offset;
			// 判断左右是否相等，否则会出现左边大于右边的情况
			if (this.range) {
				if (type === 'min' && value[0] > value[1]) value[1] = value[0];
				if (type === 'max' && value[0] > value[1]) value[0] = value[1];
			}
			this.reset([...value]);
			this.sync('input');
		},
		handleFocus(event, type) {
			this[`${this.pointerDown}Visible`] = this.showTip !== 'never';
		},
		handleBlur(event, type) {
			this[`${this.pointerDown}Visible`] = this.showTip === 'always';
		},
		handleEnter(event, type) {
			!this.pointerDown && (this[`${type}Visible`] = this.showTip !== 'never');
		},
		handleLeave(event, type) {
			!this.pointerDown && (this[`${type}Visible`] = this.showTip === 'always');
		},
		handleSetSliderWidth() {
			this.sliderWidth = this.$refs.slider.getBoundingClientRect().width;
		},
		sync(type) {
			const value = this.range ? this.currentValue : this.currentValue[0];
			this.$emit(type, value, this.reset);
			this.dispatch('vc-form-item', `form-${type === 'change' ? 'blur' : 'change'}`, value);
		},
		reset(value) {
			value = this.checkLimits(Array.isArray(value) ? value : [value]);
			this.currentValue = value;
		}
	}
};
</script>
<style lang="scss">
@import '../style/index.scss';

$block: vc-slider;
@include block($block) {
	position: relative;
	z-index: 1;
	line-height: normal;
	@include element(wrapper) {
		width: 100%;
		height: 4px;
		margin: 16px 0;
		background-color: #e8eaec;
		border-radius: 3px;
		vertical-align: middle;
		position: relative;
		@include when(clickable) {
			cursor: pointer;
		}
	}
	@include element(bar) {
		height: 4px;
		background: #57a3f3;
		border-radius: 3px;
		position: absolute;
	}
	@include element(btn-wrapper) {
		width: 12px;
		height: 12px;
		text-align: center;
		background-color: transparent;
		position: absolute;
		top: -4px;
		transform: translateX(-50%);
	}
	@include element(button) {
		width: 12px;
		height: 12px;
		border: 2px solid #57a3f3;
		border-radius: 50%;
		background-color: #fff;
		transition: all .2s linear;
		outline: 0;
		&:hover {
			border-color: #2d8cf0;
			transform: scale(1.5);
			cursor: grab;
		}
		@include when(dragging) {
			border-color: #2d8cf0;
			transform: scale(1.5);
			cursor: grab;
			&:hover {
				cursor: grabbing;
			}
		}
	}
	@include element(stop) {
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: #ccc;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}
	@include when(slider-disabled) {
		cursor: not-allowed;
		.vc-slider__wrapper {
			background-color: #ccc;
			cursor: not-allowed;
		}
		.vc-slider__bar {
			background-color: #ccc;
		}

		.vc-slider__button {
			border-color: #ccc;
			&:hover {
				border-color: #ccc;
				cursor: not-allowed;
			}
		}
	}
	@include when(slider-input) {
		position: relative;
		.vc-slider__wrapper {
			width: auto;
			margin-right: 100px;
		}
		.vc-input-number {
			position: absolute;
			top: -12px;
			right: 0;
			width: 80px;
		}
	}
}
</style>