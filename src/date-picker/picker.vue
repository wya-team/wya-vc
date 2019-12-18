<template>
	<vc-popover 
		v-bind="$attrs"
		v-model="isActive" 
		:arrow="arrow" 
		:trigger="trigger"
		:tag="tag"
		:placement="placement"
		:auto-width="false"
		:disabled="disabled"
		:portal-class-name="['is-padding-none', portalClassName]"
		:class="classes"
		class="vc-picker"
		animation="y"
		@mouseenter.native="isHover = true"
		@mouseleave.native="isHover = false"
		@ready="$emit('ready')"
		@close="$emit('close')"
		@visible-change="$emit('visible-change', isActive)"
	>
		<vc-input
			ref="input"
			:element-id="elementId"
			:readonly="true"
			:disabled="disabled"
			:value="visibleValue"
			:placeholder="placeholder || '请选择'"
			:allow-dispatch="false"
			class="vc-picker__input"
		>
			<!-- <template v-if="multiple && (currentValue && currentValue.length > 0)" #content>
				<div :class="classes" class="vc-picker__tags">
					<vc-tag 
						v-for="(item, index) in currentValue" 
						:key="item" 
						:closable="!disabled"
						@close="handleClose(item)"
					>
						{{ value[index] || '' }}
					</vc-tag>
				</div>
			</template> -->
			<template #append>
				<!-- down, up, clear -->
				<div class="vc-picker__append">
					<vc-icon
						:type="showClear ? 'clear' : 'date'"
						@click.stop="handleClear"
					/>
				</div>
			</template>
		</vc-input>
		<template #content>
			<!-- 要求value 需转成Date类型，panel内流通的都是Date, panel内的数据是否是数组 -->
			<component 
				:is="panel"
				:value="currentValue"
				:type="type"
				:confirm="isConfirm"
				:start-date="startDate"
				:focused-date="focusedDate"
				:split-panels="splitPanels"
				:show-time="showTime"
				:format="format"
				:multiple="multiple"
				v-bind="options" 
				@pick="handlePick"
				@clear="handleClear"
				@ok="handleOK"
			/>
		</template>
	</vc-popover>
</template>

<script>
import { pick, cloneDeep, debounce, isEqualWith } from 'lodash';
import { getpickeredData, getUid, getLabel } from '../utils/index';
import { DEFAULT_FORMATS } from './constants';
import { TYPE_VALUE_RESOLVER_MAP, getDayCountOfMonth, isEmpty } from './utils';
import { VcError } from '../vc/index';
import Extends from '../extends';
import Input from '../input/index';
import Popover from '../popover/index';
import Spin from '../spin/index';
import Tag from '../tag/index';
import Icon from '../icon/index';
import InputMixin from '../input/input-mixin';

export default {
	name: 'vc-picker',
	components: {
		'vc-input': Input,
		'vc-input-search': Input.Search,
		'vc-icon': Icon,
		'vc-popover': Popover,
		'vc-tag': Tag,
		'vc-spin': Spin,
	},
	mixins: [...Extends.mixins(['emitter'])],
	inheritAttrs: false,
	model: {
		prop: 'value',
		event: 'change'
	},
	props: {
		...pick(Popover.props, [
			'portalClassName'
		]),
		...pick(InputMixin.props, [
			'elementId', 
			'readonly', 
			'disabled', 
			'size', 
			'placeholder',
			'clearable'
		]),
		value: {
			type: [Date, Array, String],
			validator: (v) => {
				if (v instanceof Array) {
					return v.every((it) => it instanceof Date);
				}
				return !v || v instanceof Date;
			}
		},
		multiple: Boolean,
		trigger: {
			type: String,
			default: 'click'
		},
		tag: {
			type: String,
			default: 'div'
		},
		placement: {
			type: String,
			default: 'bottom-left'
		},
		arrow: {
			type: Boolean,
			default: false
		},
		confirm: {
			type: Boolean,
			default: false
		},
		format: String,
		separator: {
			type: String,
			default: ' - '
		},
		startDate: {
			type: Date
		},
		options: {
			type: Object,
			default: (v) => ({})
		},
		splitPanels: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			isHover: false,
			isActive: false,
			currentValue: '',
			focusedDate: null
		};
	},
	computed: {
		showClear() {
			let value = !this.multiple ? this.currentValue : this.currentValue.length > 0;
			let basic = this.clearable && !this.disabled && this.isHover;
			return value && basic;
		},
		classes() {
			return {
				'is-disabled': this.disabled
			};
		},
		isConfirm() {
			//  加上multiple
			return this.confirm || this.type === 'datetime' || this.type === 'datetimerange';
		},
		// 展示的value
		visibleValue() {
			return this.formatDate(this.currentValue);
		},
		showTime() {
			return ['datetime', 'datetimerange'].includes(this.type);
		},
		isRange() {
			return ['daterange', 'datetimerange'].includes(this.type);
		}
	},
	watch: {
		value: {
			immediate: true,
			handler(val) {
				if (isEmpty(val)) {
					val = this.isRange ? [null, null] : [];
				}
				this.focusedDate = val[0] || this.startDate || new Date();
				this.currentValue = val;
			}
		}
	},
	methods: {
		handlePick(value) {
			// 在panel上点击时，同步focusedDate
			this.focusedDate = value[0];

			if (!this.isConfirm) {
				this.handleOK(value);
			}
		},
		handleClear() {
			this.isActive = false;
			this.$emit('clear');
			this.$emit('change', '');
		},
		handleOK(value) {
			// ？？是否向外暴露confirm事件，在confirm=true时，内部选择日期是否显示在输入框上
			this.isActive = false;
			// TODO 格式化掉，接收value的时候在转回来
			this.$emit('change', value);
		},
		formatDate(value) {
			const format = DEFAULT_FORMATS[this.type];
			if (this.multiple) {
				const formatter = TYPE_VALUE_RESOLVER_MAP.multiple.formatter;
				return formatter(value, this.format || format, this.separator);
			} else {
				const { formatter } = (TYPE_VALUE_RESOLVER_MAP[this.type] || TYPE_VALUE_RESOLVER_MAP.default);
				return formatter(value, this.format || format, this.separator);
			}
		},
	}
};
</script>

<style lang='scss'>
@import '../style/index.scss';

$block: vc-picker;

@include block($block) {
	display: inline-block;
	position: relative;
	width: 100%;
	line-height: 1;
	@include element(input) {
		cursor: pointer;
		input {
			cursor: pointer;
		}
		.vc-input__append {
			z-index: 0;
		}
	}
	@include element(append) {
		color: #808695;
		padding: 0 10px 0 2px;
		position: relative;
		text-align: center;
		line-height: 28px;
		font-size: 12px;
		white-space: nowrap;
	}
	@include element(tags) {
		padding-left: 4px;
		.vc-tag {
			margin: 3px 4px 3px 0;
		}
	}

	@include element(search) {
		padding: 12px 8px;
	}
	@include element(options) {
		max-height: 220px;
		overflow: auto;
	}
	@include element(loading) {
		text-align: center;
		padding-bottom: 8px;
	}
}

</style>
