<template>
	<div 
		class="vc-select"
		@mouseenter="isHover = true"
		@mouseleave="isHover = false"
	>
		<vc-popover 
			v-model="visible" 
			:arrow="false" 
			:auto-width="true"
			:trigger="trigger"
			placement="bottom-left"
			portal-classes="is-padding-none"
			@ready="handleReady"
		>
			<vc-input
				ref="input"
				:element-id="elementId"
				:readonly="true"
				:disabled="disabled"
				:value="formatLabel"
				:placeholder="placeholder || '请选择'"
				class="vc-select__input"
				@click="visible = true"
			>
				<template v-if="max > 1 && (currentValue && currentValue.length > 0)" #content>
					<div>ss</div>
				</template>
				<template #append>
					<!-- down, up, clear -->
					<div class="vc-select__append">
						<vc-icon
							:type="showClear ? 'clear' : icon"
							class="vc-select__icon"
							@click="handleClear"
						/>
					</div>
				</template>
			</vc-input>
			<template #content>
				<slot />
			</template>
		</vc-popover>
	</div>
</template>

<script>
import { pick, cloneDeep } from 'lodash';
import { getSelectedData } from '../utils/index';
import emitter from '../extends/mixins/emitter'; // 表单验证
import Input from '../input/index';
import Popover from '../popover/index';
import Tag from '../tag/index';
import Icon from '../icon/index';
import InputMixin from '../input/input-mixin';
	
export default {
	name: 'vc-select',
	components: {
		'vc-input': Input,
		'vc-icon': Icon,
		'vc-popover': Popover,
		'vc-tag': Tag,
	},
	mixins: [emitter],
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...pick(InputMixin.props, [
			'elementId', 
			'readonly', 
			'disabled', 
			'value', 
			'size', 
			'placeholder',
			'clearable'
		]),
		trigger: {
			type: String,
			default: 'click'
		},
		extra: {
			type: String,
			default: ''
		},
		formatter: {
			type: Function,
			default: v => (v && v.join(''))
		},
		max: {
			type: Number,
			default: 1,
			validator: v => v >= 1,
		}
	},
	provide() {
		return { select: this };
	},
	data() {
		return {
			isHover: false,
			visible: false,
			currentValue: [],
			rebuildData: []
		};
	},
	computed: {
		icon() {
			return this.visible ? 'up' : 'down';
		},
		showClear() {
			return this.currentValue && this.currentValue.length && this.clearable && !this.disabled && this.isHover;
		},
		formatLabel() {
			return this.formatter(this.currentValue);
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(v) {
				this.currentValue = v instanceof Array ? [...v] : [v];
			}
		}
	},
	methods: {
		/**
		 * 初始化完成后格式化数据
		 */
		handleReady() {

		},
		handleClear(e) {
			if (!this.showClear) return;
			e.stopPropagation();

			this.$emit('change', '');
		},

		resetValue() {
			
		},

		/**
		 * 给子元素
		 */
		add(v) {
			this.$emit('change', this.max === 1 ? v : [this.currentValue, v]);
		}
	},
};
</script>

<style lang='scss'>
@import '../style/index.scss';

$block: vc-select;

@include block($block) {
	@include element(input) {
		.vc-input__append {
			z-index: 0;
		}
	}
	@include element(append) {
		cursor: pointer;
		color: #808695;
		padding: 0 10px;
		background: white !important;
		position: relative;
		text-align: center;
		line-height: 26px;
		font-size: 12px;
		white-space: nowrap;
	}
	@include element(icon) {
		transform: scale(0.8);
	}
}

</style>
